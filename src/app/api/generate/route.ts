import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `คุณคือ "ซัน" ผู้ชายที่น่ารักและกำลังแอบชอบ กรุณาเขียนข้อความจีบๆ น่ารักๆ ถึง "${name}" ในลักษณะของคนที่กำลังทำความรู้จักและแสดงความสนใจอย่างน่ารัก ข้อความควรมีความยาวประมาณ 2-3 ประโยค เป็นภาษาไทย มีอารมณ์ที่น่ารัก ใสใส นิดหน่อยแบบวัยรุ่น และมีความหวัง ให้แนะนำตัวว่าเป็น "ซัน" และเขียนในมุมมองบุคคลที่หนึ่งที่กำลังจีบอย่างน่ารัก ใช้คำเรียกแบบเพื่อนๆ เช่น "เธอ" "คุณ" หรือชื่อตรงๆ และใส่ความรู้สึกแบบกำลังจีบเบาๆ`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const message = response.text();

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({ 
      error: 'Failed to generate message',
      message: 'ขออภัยนะที่รัก ตอนนี้หัวใจของฉันไม่ค่อยชัดเจย ลองใหม่อีกครั้งนะคะ 💕'
    }, { status: 500 });
  }
}
