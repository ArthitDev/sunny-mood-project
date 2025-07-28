import { google } from 'googleapis';

// Initialize Google Sheets API
export const getGoogleSheetsClient = () => {
  try {
    // ⚠️ TODO: แทนที่ส่วนนี้ด้วย private key จริงจากไฟล์ JSON ของ Google Service Account
    const HARDCODED_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+wmkj5mtzXlYi\niiaA4b/LZMbPwHYcVXAL1e2HTz5lYM3t+8bkY1dVqkMzxvaTXFyZwIVMJxcc5blR\n2wV+fItidrg6uVrXAkKA4lzgjxVRH2C1Pq9pZOMQUaLqMaZW4rbixCvQayU+zcpn\nxqVPz9XR4YMbYKTfX8orrxiLQRlLFgMME+XzKJW5WbPh8wAIzeg2H9tE6EVgsqwW\nRp7JAu0FYDLphFWKnuS9+yJKo0rcnlAHlcvPzw4C0f8MzloAApAgqb7txGDpxiOT\nmsuYpp68jDe6eXwYtDw26a++LmK7f5MbY9Tlb2ltqL9FGrVM4UOr9KIalB7P2g+v\n/exrcI2xAgMBAAECggEACNRvyJWwivW+mdEQXtI8RhBZT8nkSbPWeLTHfrY3QJrw\nU0wOiPk0dGKaA1w6AwiRIHyP6v5K+Idlam2fgasnCkjtpom4g8fu7z9zHkGfQmrX\n95HCDbhJ1qI5vtqLHR3XynO7RbWk8uUUkbTJJ4JqvsEgGAkDXrPU1Exxv9Xkw2P6\nBECR/9GVHtXFsuIh6neqY62QIPeBx4EpsyRFfZ69SPcCKmrervC8iLQ4hmaie2KB\nAKJQXK1w1bC/NAkzPGbzQ5G3bA855x5TYH0IHgHGegoh0q3ZReO2kXSC5ptGkFdy\nvtBsfN3sexy3WKDqGu25M55H0vdhv/9HWhmMVHU0wQKBgQD6aQBQy44Z4P55dGox\nP1c1xL+6oQ08kRWKw11WCkpOc76NXa0uNVBF3qbh0WQc9PjgmxMeFXG4tFaWVTZZ\naMpS2ljgjkDkIjWlx8bwQcLlP+/VCeXVnxC/AZ83Bv9GMqdnJy1TcaUA36dHCbcF\nx1uluItd7At8MBsg7o99RvEScQKBgQDDBIc2KbN1I0w7AAxggL6yyytuo7plr4Y+\nUqJYBflGXA/LlJUQJxsCGRkxFADPStd4xNWByc2o10EZi/en2MeY7M06OoR8yZIK\n3Ptr0NdPZ244aoeeSlbyRKiq1+bP+87S0nK+oY2Lg+OGidwkXye2YmJw4ce5bLF1\ne5IgTSpPQQKBgQCdXRkerR0K9FLXPqpxcm26037tqMIpur8/6dAg/ux9as1oB2OK\ns2RT1D0pki4I6IXymGGmOTGzMllrtfcmruzermrGC3+KHll6ahaB68Gv0cNFLSgr\nW//pGPrWWOZZVgHPmFYqpzNbXjHAOcGztvnIJjYm+uyoyY5y3ph70PY0cQKBgH+s\nAj0iVdtVLX3ezTuMbcwtmJSJWeliXReGD8RivMwkTy7vahs2Dsdz2Ps5ZkJPc/sb\nmc+rZxmnOnZYHN1k3V8vgDgjwULUz+iOvYbbJWpVg2Ip0/l8H6nh6y5VxETbTI7W\nuco1h64TvSwCKv4g0aXkiR/voEqzbwZDzOmaux1BAoGATcMlAXZ1XfbzMWwUQwWj\n8LHzKs0Z1OyjEYmqMqXzMr0LRBFjXc/Rnxx9sqbcKab3WfQ+5eI8+PL7DK1XdGoJ\niKysWAn5Bnl2z2Mel9haAE1VipE6apq8/SbJxGVqR57snK4mccqLbxQvPh0vpegT\nw0DDULFUnDaEtWSl+AwQsUo=\n-----END PRIVATE KEY-----\n`;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: HARDCODED_PRIVATE_KEY,
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