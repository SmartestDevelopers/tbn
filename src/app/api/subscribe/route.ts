import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendMail } from '@/lib/mail';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
    }

    // Save to DB
    await prisma.subscriber.create({
      data: { email },
    });

    // Send Welcome Email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to The Global Notariat</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #0A2647 0%, #163E72 100%); padding: 40px 20px; text-align: center; }
    .logo { color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 2px; }
    .logo span { color: #C5A059; }
    .hero-image { width: 100%; height: 200px; object-fit: cover; background-color: #ddd; display: block; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
    .title { color: #0A2647; font-size: 24px; margin-bottom: 20px; font-weight: bold; }
    .text { color: #555555; margin-bottom: 25px; font-size: 16px; }
    .btn { display: inline-block; background-color: #C5A059; color: #0A2647; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; margin-top: 10px; }
    .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #8898aa; border-top: 1px solid #edf2f7; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">THE GLOBAL <span>NOTARIAT</span></div>
    </div>
    <div class="content">
      <div class="title">Welcome to Our Community!</div>
      <div class="text">
        Thank you for subscribing to The Global Notariat newsletter. We are thrilled to have you with us.
      </div>
      <div class="text">
        You will now receive updates about our latest notary services, industry insights, and special offers directly to your inbox.
      </div>
      <div class="text">
        Whether you need a Remote Online Notarization, Loan Signing, or Mobile Notary service, we are here to assist you 24/7.
      </div>
      <center><a href="https://theglobalnotariat.com" class="btn">Visit Website</a></center>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} The Global Notariat. All rights reserved.<br>
      Orlando, FL • USA
    </div>
  </div>
</body>
</html>
        `;

    await sendMail(
      email,
      'Welcome to The Global Notariat!',
      htmlContent,
    );

    return NextResponse.json({ message: 'Successfully subscribed' });
  } catch (error) {
    console.error('Subscribe Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
