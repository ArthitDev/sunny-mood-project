import { NextRequest, NextResponse } from 'next/server';
import { addVisitorToSheet, getVisitorsFromSheet, initializeSheet } from '../../../../lib/googleSheets';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Get user info
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown';

    const visitor = {
      timestamp: new Date().toISOString(),
      name,
      userAgent,
      ip
    };
    
    await addVisitorToSheet(visitor);
    return NextResponse.json({ message: 'Logged successfully to Google Sheets' });
  } catch (error) {
    console.error('Error logging visitor:', error);
    return NextResponse.json({ 
      error: 'Failed to log visitor',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Initialize sheet if needed (first time)
    try {
      await initializeSheet();
    } catch (initError) {
      console.warn('Sheet initialization warning:', initError);
    }

    const data = await getVisitorsFromSheet();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading visitor log:', error);
    
    // Return fallback response
    return NextResponse.json({ 
      total: 0,
      visitors: [],
      message: 'ไม่สามารถอ่านข้อมูลจาก Google Sheets ได้',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 