// Run with: npx tsx src/scripts/seed.ts
import * as dotenv from 'dotenv';
import * as path from 'path';
import { MongoClient } from 'mongodb';

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Initial portfolio data (from the existing portfolio.ts)
const personalData = {
  name: "Deepanshu Sharma",
  firstName: "DEEPANSHU",
  lastName: "SHARMA",
  title: "Full Stack Developer & AI Innovator",
  email: "sharmadeepanshu1005@gmail.com",
  location: "India",
  about: "I am an enthusiastic Full-Stack Web Developer pursuing B.Tech in AI & ML, dedicated to building scalable, reliable, and user-focused web applications. I have worked as a Full Stack Developer at Bolofy, CodTech IT Solutions, and 999Logistics, where I contributed to end-to-end development, improved system performance, and built real-time, production-ready applications across multiple domains.\n\nMy expertise lies in React.js, Node.js, AWS, and MongoDB, with a strong focus on writing clean, maintainable code and solving complex engineering problems. I've built several impactful projects, including Resuneo, an AI-powered ATS and job-finding platform; SuperIntern.in, a student-company matching system; BudgetBuddy, a voice-controlled expense tracker; and a full-stack Employee Management Web App with automated workflows.\n\nI excel in fast-moving team environments and constantly explore new technologies to stay ahead in modern web development. My goal is to contribute to meaningful, innovative products while continuously sharpening my skills as a dependable and versatile software engineer.",
  socialLinks: {
    github: "https://github.com/deepanshu921372",
    linkedin: "https://www.linkedin.com/in/deepanshusharma921372/",
    twitter: "https://twitter.com/deepanshu921372",
  },
  resumeUrl: "https://drive.google.com/file/d/1mFGp63PdvVyxAVP9AH-h7LDoGUTUC1KS/view?usp=sharing",
};

const skillsData = [
  { icon: "⚛️", title: "Frontend Mastery", description: "React.js, Next.js, TypeScript, Redux, Context API, Tailwind CSS, Material UI, Framer Motion", span: { col: 2, row: 2 }, order: 0 },
  { icon: "🚀", title: "Backend Power", description: "Node.js, Express.js, REST APIs, JWT, OAuth, WebSockets (Socket.io)", order: 1 },
  { icon: "🗄️", title: "Databases & ORMs", description: "PostgreSQL, MySQL, MongoDB, Firebase Firestore, Prisma, Sequelize, Mongoose", order: 2 },
  { icon: "🤖", title: "AI & Integrations", description: "OpenAI API, Groq SDK, OpenRouter, Puppeteer, Stripe, Razorpay, Cashfree, Google APIs, Cloudinary, Firebase Admin", span: { col: 2 }, order: 3 },
  { icon: "☁️", title: "Cloud & DevOps", description: "AWS (EC2, S3), Docker, Docker Compose, Nginx, CI/CD (GitHub Actions), Vercel, Render, DigitalOcean", order: 4 },
  { icon: "🎨", title: "Design & UI", description: "Tailwind CSS, Material-UI, Figma, Spline 3D", order: 5 },
  { icon: "⚙️", title: "Tools & Workflow", description: "Git, GitHub, Postman, VS Code, n8n workflows", order: 6 },
  { icon: "📱", title: "Real-time Apps", description: "WebRTC, Socket.io, WebSockets - Live connections", order: 7 },
  { icon: "🔧", title: "API & Integration", description: "REST API, Firebase Auth, Cloudinary, Speech Recognition API", order: 8 },
  { icon: "💻", title: "Languages", description: "JavaScript, TypeScript, Python, C++, SQL", order: 9 },
  { icon: "🌐", title: "Full Stack", description: "End-to-end development from concept to deployment with MERN stack", span: { col: 2 }, order: 10 },
];

const statsData = [
  { number: 30, label: "Projects", order: 0 },
  { number: 15, label: "Hackathons", order: 1 },
  { number: 500, label: "K+ Code Lines", order: 2 },
  { number: 5, label: "Awards", order: 3 },
];

const projectsData = [
  { number: "01", emoji: "📄", title: "Resuneo", description: "AI-powered resume ATS analyzer and smart job finder that helps job seekers optimize their resumes, find matching jobs across 4 platforms, generate tailored cover letters, and track applications—all with transparent scoring and AI assistance powered by Claude 3.5 Sonnet.", technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS v4", "Vite", "Firebase Auth", "Cloudinary", "OpenRouter API", "Claude 3.5 Sonnet", "Razorpay", "Recharts", "Puppeteer", "Framer Motion"], image: "/resuneo.png", githubLink: "https://github.com/deepanshu921372/Resuneo", liveLink: "https://resuneo.netlify.app", order: 0 },
  { number: "02", emoji: "🤖", title: "MedMind", description: "MedMind is an AI-powered medical document platform with OCR, chatbot-based query answering, and maps integration, enabling secure upload, management, and quick access to prescriptions, lab reports, and nearby healthcare services.", technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Firebase", "Cloudinary", "Tesseract.js", "Groq SDK", "OpenAI API", "Python OCR Services"], image: "/medmind.png", githubLink: "https://github.com/deepanshu921372/MedMind", liveLink: "https://drive.google.com/file/d/13Dqx5TEnv2uGckZ5BnBayEcYLxD6pmV5/view", order: 1 },
  { number: "03", emoji: "💼", title: "SuperIntern.in", description: "A fully responsive platform connecting students with companies for internships and freelance opportunities. Features job listings, applications, company dashboards, and seamless user experience.", technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Firebase", "Cloudinary", "Postman API", "Hostinger", "Netlify"], image: "/superintern.png", githubLink: "https://github.com/SuperrrIntern/superintern", liveLink: "https://superintern.in", order: 2 },
  { number: "04", emoji: "👔", title: "Employee Management Web App", description: "Streamlined employee registration with unique ID card generation using Material-UI, React.js, Node.js, Postman, MongoDB, and Amazon S3.", technologies: ["React", "Material-UI", "Amazon Web Services (AWS)", "Postman API", "MongoDB", "Node.js"], image: "/ems.jpeg", githubLink: "https://github.com/deepanshu921372/999-manager-app-id-card", liveLink: "https://admin.999logistics.in", order: 3 },
  { number: "05", emoji: "💰", title: "BudgetBuddy", description: "BudgetBuddy is a smart, voice-powered finance tracker that helps you manage income and expenses hands-free. Just say 'Add transaction' and speak your details — no typing needed! It features real-time charts, voice navigation, secure login, and works seamlessly across devices.", technologies: ["React.js", "Zustand", "TailwindCSS", "Node.js", "Express", "Firebase Auth", "MongoDB", "Chart.js", "Speech Recognition API", "XLSX"], image: "/budget.png", githubLink: "https://github.com/deepanshu921372/BudgetBuddy", liveLink: "https://budgettbuddy.netlify.app", order: 4 },
  { number: "06", emoji: "🏥", title: "DeeCare HMS", description: "DeeCare is a fully responsive Hospital Management System built using MongoDB, Express.js, React, Node.js, and Cloudinary. It streamlines appointment booking, doctor management, and admin control to enhance hospital operations.", technologies: ["React.js", "Tailwind CSS", "Express.js", "MongoDB", "Node.js", "API Development", "Netlify", "Render", "Cloudinary"], image: "/deecare.jpeg", githubLink: "https://github.com/deepanshu921372/HMS_Frontend_And_Admin", liveLink: "https://deecare-hms.netlify.app", order: 5 },
  { number: "07", emoji: "📚", title: "Book Heaven", description: "An e-commerce platform where users can purchase books and admins can manage inventory. Features include user authentication, shopping cart, and order management.", technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Tailwind CSS", "REST API"], image: "/book.jpeg", githubLink: "https://github.com/deepanshu921372/bookheaven", liveLink: "https://bookheavenstore.netlify.app", order: 6 },
  { number: "08", emoji: "👗", title: "FamStyle | Clothing Store", description: "A modern clothing e-commerce platform with seamless shopping experience and admin inventory management system.", technologies: ["Next.js", "MongoDB", "Tailwind CSS", "React.js", "Node.js", "API Development"], image: "/cloth.jpeg", githubLink: "https://github.com/deepanshu921372/e-commerce", liveLink: "https://famstyle.vercel.app", order: 7 },
  { number: "09", emoji: "🤖", title: "Virtual Assistant Nova", description: "Created Virtual Assistant Nova, a web-based application that lets users interact with a smart voice assistant using natural language. Built with HTML, CSS, and JavaScript, Nova answers questions and opens websites.", technologies: ["HTML5", "Cascading Style Sheets (CSS)", "JavaScript", "Spline"], image: "/nova.jpeg", githubLink: "https://github.com/deepanshu921372/VirtualAssistant", liveLink: "https://virtualassistantnova.netlify.app", order: 8 },
];

const journeyData = [
  { icon: "💼", title: "Full Stack Developer @ RoamMyWay", description: "Nov 2025 - Present - Redesigned UI, built lead-generation flow, contributing to Romaya AI Trip Planner", order: 0 },
  { icon: "⚛️", title: "Full Stack Developer @ Bolofy AI Solutions", description: "Mar 2025 - Present - Built SuperIntern (1,000+ users), developing SheetsProjects SaaS platform", order: 1 },
  { icon: "🚀", title: "Full-stack Developer Intern @ CodeTech IT Solutions", description: "Dec 2024 - Jan 2025 - Built real-time collaborative editor with WebSockets", order: 2 },
  { icon: "☁️", title: "Full Stack Developer @ Rastaa.AI", description: "Apr 2024 - Jul 2024 - Redesigned admin dashboard, integrated backend APIs, optimized frontend performance", order: 3 },
  { icon: "🎓", title: "B.Tech AI & ML @ VIPS", description: "2023 - Present - Vivekananda Institute of Professional Studies, New Delhi. GPA: 8.4", order: 4 },
  { icon: "📖", title: "Secondary & Senior Secondary @ Basava International", description: "2019 - 2023 - Completed with 92% in 10th and 87% in 12th grade", order: 5 },
  { icon: "🏆", title: "Hackathon Wins", description: "Multiple wins in Repo Sprint, Git Clash & more competitions", order: 6 },
  { icon: "🌟", title: "Platform Launches", description: "Deployed multiple production apps serving real users", order: 7 },
];

const educationData = [
  { degree: "Bachelor of Technology in Artificial Intelligence & Machine Learning", institution: "Vivekanand Institute of Professional Studies", location: "New Delhi, India", duration: "2023 - Present", description: "College has been the most important experience for me. VIPS provided me with ample opportunities to explore various domains and a talented peer group that never failed to inspire me", order: 0 },
  { degree: "Secondary Education (10th) & Senior Secondary Education (12th)", institution: "Basava International School", location: "New Delhi, India", duration: "2019 - 2023", description: "Completed with 92% marks in 10th and 87% marks in 12th.", order: 1 },
];

async function seed() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Error: MONGODB_URI environment variable is not set');
    console.log('\nPlease set your MongoDB connection string in .env.local:');
    console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio\n');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('portfolio');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      db.collection('personal').deleteMany({}),
      db.collection('skills').deleteMany({}),
      db.collection('stats').deleteMany({}),
      db.collection('projects').deleteMany({}),
      db.collection('journey').deleteMany({}),
      db.collection('education').deleteMany({}),
    ]);

    // Insert new data
    console.log('Inserting new data...');
    await Promise.all([
      db.collection('personal').insertOne(personalData),
      db.collection('skills').insertMany(skillsData),
      db.collection('stats').insertMany(statsData),
      db.collection('projects').insertMany(projectsData),
      db.collection('journey').insertMany(journeyData),
      db.collection('education').insertMany(educationData),
    ]);

    console.log('Database seeded successfully!');
    console.log('\nCollections created:');
    console.log('- personal (1 document)');
    console.log(`- skills (${skillsData.length} documents)`);
    console.log(`- stats (${statsData.length} documents)`);
    console.log(`- projects (${projectsData.length} documents)`);
    console.log(`- journey (${journeyData.length} documents)`);
    console.log(`- education (${educationData.length} documents)`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDisconnected from MongoDB');
  }
}

seed();
