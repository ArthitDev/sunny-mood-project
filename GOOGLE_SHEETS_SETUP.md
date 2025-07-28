# 📊 Google Sheets Setup Guide

ขั้นตอนการติดตั้ง Google Sheets สำหรับ Visitor Logging

## 1. 🚀 Google Cloud Console Setup

### สร้าง Project และ Service Account
1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้าง Project ใหม่หรือเลือกที่มีอยู่
3. ไปที่ **APIs & Services > Library**
4. ค้นหาและ Enable **Google Sheets API**

### สร้าง Service Account
1. ไปที่ **APIs & Services > Credentials**
2. คลิก **Create Credentials > Service Account**
3. ตั้งชื่อ Service Account (เช่น `sheets-visitor-logger`)
4. Skip การกำหนด roles (ขั้นตอนถัดไป)
5. คลิก **Done**

### Download JSON Key
1. คลิกที่ Service Account ที่สร้างใหม่
2. ไปที่แท็บ **Keys**
3. คลิก **Add Key > Create New Key**
4. เลือก **JSON** และ Download
5. **เก็บไฟล์นี้ไว้อย่างปลอดภัย!**

## 2. 📋 Google Sheets Setup

### สร้าง Spreadsheet
1. ไปที่ [Google Sheets](https://sheets.google.com/)
2. สร้าง Spreadsheet ใหม่
3. ตั้งชื่อ (เช่น "Sunny Visitors Log")

### แชร์ให้ Service Account
1. คลิกปุ่ม **Share** 
2. ใส่ email ของ Service Account (จากไฟล์ JSON: `client_email`)
3. เลือก role **Editor**
4. คลิค **Send**

### Copy Sheet ID
จาก URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
Copy ส่วน `SHEET_ID_HERE`

## 3. ⚙️ Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์ root:

```bash
# Gemini API (ที่มีอยู่แล้ว)
GEMINI_API_KEY=your_existing_gemini_key

# Google Sheets Configuration
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_copied_sheet_id_here
```

### การกรอก Environment Variables:

**GOOGLE_SHEETS_CLIENT_EMAIL:**
- หาจากไฟล์ JSON ที่ download: `client_email`

**GOOGLE_SHEETS_PRIVATE_KEY:**
- หาจากไฟล์ JSON: `private_key`
- ⚠️ **สำคัญ:** ต้องใส่ quotes และ escape \n characters

**GOOGLE_SHEET_ID:**
- Copy จาก URL ของ Spreadsheet

## 4. 🧪 ทดสอบการทำงาน

### ทดสอบ Local
```bash
npm run dev
```

1. ไปที่ `http://localhost:3000`
2. กรอกชื่อและทดสอบ
3. ไปที่ `http://localhost:3000/admin` (รหัสผ่าน: `sunlovesyou`)
4. ตรวจสอบว่าข้อมูลปรากฏใน Google Sheets

### ตรวจสอบ Logs
- เปิด Developer Console ใน browser
- ดู Network tab สำหรับ API calls
- ตรวจสอบ Server logs สำหรับ errors

## 5. 🚀 Deployment

### Vercel
1. อัปโหลดโปรเจกต์ไป GitHub
2. Connect กับ Vercel
3. เพิ่ม Environment Variables ใน Vercel Dashboard:
   - `GEMINI_API_KEY`
   - `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `GOOGLE_SHEETS_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`

### Environment Variables ใน Production
⚠️ **อย่าลืม:**
- ไม่ commit `.env.local` ไป GitHub
- ใส่ Environment Variables ใน Deployment Platform
- ตรวจสอบว่า Service Account มี permissions

## 6. 📊 Google Sheets Structure

Spreadsheet จะมี columns:
- **A:** Timestamp (วันที่เวลา)
- **B:** Name (ชื่อผู้เยี่ยมชม)
- **C:** User Agent (browser info)
- **D:** IP Address (IP ของผู้ใช้)

## 7. 🔧 Troubleshooting

### ปัญหาที่พบบ่อย:

**"Failed to initialize Google Sheets"**
- ตรวจสอบ Environment Variables
- ตรวจสอบว่า Private Key format ถูกต้อง

**"Permission denied"**
- ตรวจสอบว่าแชร์ Spreadsheet ให้ Service Account แล้ว
- ตรวจสอบ Service Account email

**"Sheet not found"**
- ตรวจสอบ GOOGLE_SHEET_ID
- ตรวจสอบว่า Spreadsheet ยังมีอยู่

### Debug Mode
เพิ่มใน `.env.local`:
```bash
NODE_ENV=development
```

## 8. 🎉 เสร็จแล้ว!

ตอนนี้ระบบจะบันทึกผู้เยี่ยมชมลง Google Sheets อัตโนมัติ และสามารถดูได้ที่:
- **Admin Panel:** `your-domain.com/admin`
- **Google Sheets:** โดยตรงใน browser

---

### 💡 Tips:
- Google Sheets API มี rate limit แต่เพียงพอสำหรับการใช้งานปกติ
- ข้อมูลจะ sync แบบ real-time
- สามารถแก้ไขข้อมูลใน Google Sheets ได้โดยตรง
- ฟรี! ไม่มีค่าใช้จ่าย 