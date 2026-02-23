import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { isAuthenticated } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

type RouteContext = { params: Promise<{ section: string }> };

const validSections = ['personal', 'skills', 'stats', 'projects', 'journey', 'education'];

// GET section data
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { section } = await context.params;

    if (!validSections.includes(section)) {
      return NextResponse.json(
        { success: false, error: 'Invalid section' },
        { status: 400 }
      );
    }

    const db = await getDb();

    if (section === 'personal') {
      const data = await db.collection(section).findOne({});
      return NextResponse.json({ success: true, data });
    }

    const data = await db.collection(section).find({}).sort({ order: 1 }).toArray();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch section data' },
      { status: 500 }
    );
  }
}

// PUT to update section (for personal data or entire array section)
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { section } = await context.params;

    if (!validSections.includes(section)) {
      return NextResponse.json({ success: false, error: 'Invalid section' }, { status: 400 });
    }

    const body = await request.json();
    const db = await getDb();

    if (section === 'personal') {
      // Update personal data (upsert)
      const { _id, ...updateData } = body;
      await db.collection(section).updateOne(
        {},
        { $set: updateData },
        { upsert: true }
      );
    } else {
      // For array sections, update a single item by _id
      const { _id, ...updateData } = body;
      if (!_id) {
        return NextResponse.json({ success: false, error: 'Item _id is required' }, { status: 400 });
      }
      await db.collection(section).updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );
    }

    // Revalidate cache
    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0].message }, { status: 400 });
    }
    console.error('Error updating section:', error);
    return NextResponse.json({ success: false, error: 'Failed to update section' }, { status: 500 });
  }
}

// POST to add new item to array section
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { section } = await context.params;

    if (!validSections.includes(section) || section === 'personal') {
      return NextResponse.json({ success: false, error: 'Invalid section for POST' }, { status: 400 });
    }

    const body = await request.json();
    const db = await getDb();

    // Get the highest order number and add 1
    const lastItem = await db.collection(section).findOne({}, { sort: { order: -1 } });
    const newOrder = (lastItem?.order ?? -1) + 1;

    const result = await db.collection(section).insertOne({
      ...body,
      order: newOrder,
    });

    // Revalidate cache
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: 'Added successfully',
      data: { _id: result.insertedId.toString(), ...body, order: newOrder },
    });
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json({ success: false, error: 'Failed to add item' }, { status: 500 });
  }
}

// DELETE to remove item from array section
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { section } = await context.params;

    if (!validSections.includes(section) || section === 'personal') {
      return NextResponse.json({ success: false, error: 'Invalid section for DELETE' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Item id is required' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection(section).deleteOne({ _id: new ObjectId(id) });

    // Revalidate cache
    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete item' }, { status: 500 });
  }
}
