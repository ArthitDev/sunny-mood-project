import { google } from 'googleapis';

// Initialize Google Sheets API
export const getGoogleSheetsClient = () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw new Error('Failed to initialize Google Sheets');
  }
};

export interface VisitorLog {
  timestamp: string;
  name: string;
  userAgent?: string;
  ip?: string;
}

// Add visitor to Google Sheets
export const addVisitorToSheet = async (visitor: VisitorLog) => {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID environment variable not set');
    }

    // Format timestamp to Thai locale
    const thaiTimestamp = new Date(visitor.timestamp).toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const values = [
      [thaiTimestamp, visitor.name, visitor.userAgent || '', visitor.ip || '']
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:D', // A=timestamp, B=name, C=userAgent, D=ip
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });

    console.log('✅ Visitor logged to Google Sheets:', visitor.name);
    return true;
  } catch (error) {
    console.error('❌ Error logging to Google Sheets:', error);
    throw error;
  }
};

// Get all visitors from Google Sheets
export const getVisitorsFromSheet = async () => {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID environment variable not set');
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A:D',
    });

    const rows = response.data.values || [];
    
    // Skip header row if exists, and reverse to get newest first
    const dataRows = rows.length > 0 && rows[0][0] === 'Timestamp' 
      ? rows.slice(1).reverse() 
      : rows.reverse();

    const visitors = dataRows.map((row, index) => ({
      id: index,
      timestamp: row[0] || '',
      name: row[1] || '',
      userAgent: row[2] || '',
      ip: row[3] || '',
      fullLine: `[${row[0]}] 💕 ${row[1]} มาอ่านดูใจของซัน`
    }));

    return {
      total: visitors.length,
      visitors
    };
  } catch (error) {
    console.error('❌ Error reading from Google Sheets:', error);
    throw error;
  }
};

// Initialize sheet with headers (run once)
export const initializeSheet = async () => {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID environment variable not set');
    }

    // Check if sheet already has headers
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:D1',
    });

    if (response.data.values && response.data.values.length > 0) {
      console.log('Sheet already initialized');
      return;
    }

    // Add headers
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'A1:D1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [['Timestamp', 'Name', 'User Agent', 'IP Address']],
      },
    });

    console.log('✅ Google Sheets initialized with headers');
  } catch (error) {
    console.error('❌ Error initializing sheet:', error);
    throw error;
  }
}; 