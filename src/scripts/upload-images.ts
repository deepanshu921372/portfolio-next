// Run with: npx tsx src/scripts/upload-images.ts
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { MongoClient } from 'mongodb';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

// Map of local image paths to their files
const imageFiles = [
  { localPath: '/resuneo.png', file: 'resuneo.png' },
  { localPath: '/medmind.png', file: 'medmind.png' },
  { localPath: '/superintern.png', file: 'superintern.png' },
  { localPath: '/ems.jpeg', file: 'ems.jpeg' },
  { localPath: '/budget.png', file: 'budget.png' },
  { localPath: '/deecare.jpeg', file: 'deecare.jpeg' },
  { localPath: '/book.jpeg', file: 'book.jpeg' },
  { localPath: '/cloth.jpeg', file: 'cloth.jpeg' },
  { localPath: '/nova.jpeg', file: 'nova.jpeg' },
];

function generateSignature(timestamp: number, folder: string, publicId: string): string {
  const str = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  return crypto.createHash('sha1').update(str).digest('hex');
}

async function uploadToCloudinary(filePath: string, fileName: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), 'public', fileName);

    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${fullPath}`);
      return null;
    }

    const fileBuffer = fs.readFileSync(fullPath);
    const base64 = fileBuffer.toString('base64');
    const mimeType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';
    const dataUri = `data:${mimeType};base64,${base64}`;

    const timestamp = Math.round(Date.now() / 1000);
    const publicId = fileName.split('.')[0]; // Use filename without extension as public_id
    const signature = generateSignature(timestamp, 'portfolio', publicId);

    const formData = new FormData();
    formData.append('file', dataUri);
    formData.append('api_key', CLOUDINARY_API_KEY!);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('folder', 'portfolio');
    formData.append('public_id', publicId);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    if (result.secure_url) {
      console.log(`✓ Uploaded ${fileName} -> ${result.secure_url}`);
      return result.secure_url;
    } else {
      console.error(`✗ Failed to upload ${fileName}:`, result.error?.message);
      return null;
    }
  } catch (error) {
    console.error(`✗ Error uploading ${fileName}:`, error);
    return null;
  }
}

async function main() {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error('Missing Cloudinary credentials in .env');
    process.exit(1);
  }

  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
  }

  console.log('Starting image upload to Cloudinary...\n');

  // Upload all images and create mapping
  const urlMapping: { [key: string]: string } = {};

  for (const img of imageFiles) {
    const cloudinaryUrl = await uploadToCloudinary(img.localPath, img.file);
    if (cloudinaryUrl) {
      urlMapping[img.localPath] = cloudinaryUrl;
    }
  }

  console.log('\n--- URL Mapping ---');
  console.log(urlMapping);

  // Update MongoDB
  console.log('\nUpdating MongoDB...');

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('portfolio');
    const projectsCollection = db.collection('projects');

    // Get all projects
    const projects = await projectsCollection.find({}).toArray();

    for (const project of projects) {
      const localPath = project.image;
      if (urlMapping[localPath]) {
        await projectsCollection.updateOne(
          { _id: project._id },
          { $set: { image: urlMapping[localPath] } }
        );
        console.log(`✓ Updated project "${project.title}" with Cloudinary URL`);
      }
    }

    console.log('\nDone! All images uploaded and database updated.');
  } finally {
    await client.close();
  }
}

main().catch(console.error);
