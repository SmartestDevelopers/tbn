import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendMail } from '@/lib/mail';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Save to Database
    const contact = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // 2. Send Notification Email
    await sendMail(
      process.env.MAIL_FROM_ADDRESS!,
      `New Contact Form: ${subject}`,
      `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background-color: #1a237e; background-image: linear-gradient(135deg, #0A2647 0%, #163E72 100%); padding: 30px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: bold; text-decoration: none; letter-spacing: 2px; }
    .logo span { color: #C5A059; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
    .label { font-size: 12px; text-transform: uppercase; color: #8898aa; font-weight: bold; margin-bottom: 5px; letter-spacing: 1px; }
    .value { font-size: 16px; margin-bottom: 25px; color: #1a237e; font-weight: 500; border-bottom: 1px solid #edf2f7; padding-bottom: 10px; }
    .message-box { background-color: #f8fafc; border-left: 4px solid #C5A059; padding: 20px; border-radius: 4px; margin-top: 20px; }
    .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #8898aa; border-top: 1px solid #edf2f7; }
    .button { display: inline-block; background-color: #C5A059; color: #0A2647; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div style="padding: 40px 0;">
    <div class="container">
      <div class="header">
        <div class="logo">THE GLOBAL <span>NOTARIAT</span></div>
      </div>
      <div class="content">
        <h2 style="color: #0A2647; margin-top: 0;">New Inquiry Received</h2>
        <p style="margin-bottom: 30px;">You have received a new message from the contact form on your website.</p>
        
        <div class="label">FULL NAME</div>
        <div class="value">${name}</div>
        
        <div class="label">EMAIL ADDRESS</div>
        <div class="value"><a href="mailto:${email}" style="color: #1a237e; text-decoration: none;">${email}</a></div>
        
        <div class="label">SUBJECT</div>
        <div class="value">${subject}</div>
        
        <div class="label">MESSAGE</div>
        <div class="message-box">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <div style="text-align: center;">
          <a href="mailto:${email}" class="button">Reply via Email</a>
        </div>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} The Global Notariat. All rights reserved.<br>
        Automated notification from TBN Website
      </div>
    </div>
  </div>
</body>
</html>
            `
    );

    return NextResponse.json({ success: true, id: contact.id });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
