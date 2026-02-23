import { NextResponse } from 'next/server';
import { getPortfolioData } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '@/lib/auth';

// GET all portfolio data
export async function GET() {
  try {
    const data = await getPortfolioData();

    return NextResponse.json({
      success: true,
      data,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}

// POST to trigger revalidation
export async function POST() {
  try {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Revalidate the home page
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: 'Cache revalidated successfully',
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
