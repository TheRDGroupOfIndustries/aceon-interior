import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import Message, { IMessage } from '@/models/message';

export async function POST(request: NextRequest) {
  try {
    const { name, email, number, address, description } = await request.json();


    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Name, email, and description are required fields' },
        { status: 400 }
      );
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

 
    await dbConnect();

   
    const savedMessage: IMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      number: number?.trim(),
      address: address?.trim(),
      description: description.trim(),
    });

   
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to Admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'arpitkukrety7@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A97C51;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 4px solid #A97C51;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${number || 'Not provided'}</p>
            <p><strong>Address:</strong> ${address || 'Not provided'}</p>
            <p><strong>Description:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">${description}</p>
            <p style="margin-top: 10px; font-size: 12px; color: #666;">
              <strong>Submission ID:</strong> ${savedMessage._id}<br>
              <strong>Received:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            This email was sent from your website contact form.
          </p>
        </div>
      `,
    };

    // Email to Sender (Confirmation)
    const senderMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting Aceon Interio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A97C51;">Thank You for Contacting Aceon Interio!</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 4px solid #A97C51;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to us. We have received your message and will get back to you within 24-48 hours.</p>
            
            <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 5px;">
              <p style="margin: 0;"><strong>Your Message:</strong></p>
              <p style="margin: 10px 0 0 0; font-style: italic;">"${description}"</p>
            </div>

            <p><strong>Our Contact Information:</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li>📞 Phone: +91 99197 55066</li>
              <li>📧 Email: care@aceoninterio.com</li>
              <li>👤 Contact Person: Ankit Sandiliya</li>
            </ul>

            <p style="margin-top: 15px; font-size: 12px; color: #666;">
              <strong>Reference ID:</strong> ${savedMessage._id}<br>
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #A97C51; color: white; border-radius: 10px; text-align: center;">
            <p style="margin: 0; font-size: 16px;">
              <strong>Let's start shaping your dream space together!</strong>
            </p>
          </div>
          
          <p style="margin-top: 20px; color: #666; font-size: 12px; text-align: center;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(senderMailOptions)
    ]);

    return NextResponse.json(
      { 
        message: 'Message saved and emails sent successfully',
        messageId: savedMessage._id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    
 
    if (error instanceof Error && error.message.includes('E11000')) {
      return NextResponse.json(
        { error: 'It seems you have already submitted this message. Please wait while we process your request.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process your message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint to retrieve messages (for admin panel)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Message.countDocuments();

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}