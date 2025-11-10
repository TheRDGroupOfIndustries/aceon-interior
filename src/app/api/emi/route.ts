import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import EMIApplication from '@/models/EmiApplication';

// Calculate EMI function
function calculateEMI(principal: number, tenure: number, interestRate: number = 12): number {
  const monthlyRate = interestRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
               (Math.pow(1 + monthlyRate, tenure) - 1);
  return Math.round(emi);
}

export async function POST(request: NextRequest) {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      interiorPackage,
      totalAmount,
      emiTenure,
      downPayment = 0,
      monthlyIncome,
      employmentType,
      bankDetails,
      agreeTerms,
      agreeCreditCheck,
    } = await request.json();

    // Validate required fields
    const requiredFields = {
      fullName,
      email,
      phoneNumber,
      interiorPackage,
      totalAmount,
      emiTenure,
      monthlyIncome,
      employmentType,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate consent
    if (!agreeTerms || !agreeCreditCheck) {
      return NextResponse.json(
        { error: 'You must agree to both terms and conditions and credit check' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Calculate EMI
    const principal = totalAmount - downPayment;
    const calculatedEMI = calculateEMI(principal, emiTenure);

    // Save application to database
    const normalizedEmail = email.trim().toLowerCase();
    console.log('EMI Application - Saving with email:', normalizedEmail);
    
    const application = await EMIApplication.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      phoneNumber: phoneNumber.trim(),
      interiorPackage: interiorPackage.trim(),
      totalAmount: Number(totalAmount),
      emiTenure: Number(emiTenure),
      downPayment: Number(downPayment) || 0,
      calculatedEMI,
      monthlyIncome: Number(monthlyIncome),
      employmentType,
      bankDetails: bankDetails?.trim(),
      agreeTerms,
      agreeCreditCheck,
    });
    
    console.log('EMI Application - Saved successfully with ID:', application._id);

    // Create transporter for emails
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
      subject: `New EMI Application from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A97C51;">New EMI Application Received</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 4px solid #A97C51;">
            <h3 style="color: #333; margin-top: 0;">Personal Information</h3>
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            
            <h3 style="color: #333; margin-top: 20px;">Loan Details</h3>
            <p><strong>Interior Package:</strong> ${interiorPackage}</p>
            <p><strong>Total Amount:</strong> ₹${totalAmount.toLocaleString()}</p>
            <p><strong>Down Payment:</strong> ₹${downPayment.toLocaleString()}</p>
            <p><strong>EMI Tenure:</strong> ${emiTenure} months</p>
            <p><strong>Calculated EMI:</strong> ₹${calculatedEMI.toLocaleString()}/month</p>
            
            <h3 style="color: #333; margin-top: 20px;">Financial Information</h3>
            <p><strong>Monthly Income:</strong> ₹${monthlyIncome.toLocaleString()}</p>
            <p><strong>Employment Type:</strong> ${employmentType}</p>
            ${bankDetails ? `<p><strong>Bank Details:</strong> ${bankDetails}</p>` : ''}
            
            <p style="margin-top: 15px; font-size: 12px; color: #666;">
              <strong>Application ID:</strong> ${application._id}<br>
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    };

    // Email to Applicant
    const applicantMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'EMI Application Received - Aceon Interio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A97C51;">EMI Application Received</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 4px solid #A97C51;">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Thank you for submitting your EMI application for your interior project. We have received your details and our team will review your application shortly.</p>
            
            <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 5px;">
              <h4 style="color: #333; margin-top: 0;">Application Summary:</h4>
              <p><strong>Package:</strong> ${interiorPackage}</p>
              <p><strong>Total Amount:</strong> ₹${totalAmount.toLocaleString()}</p>
              <p><strong>Down Payment:</strong> ₹${downPayment.toLocaleString()}</p>
              <p><strong>EMI Tenure:</strong> ${emiTenure} months</p>
              <p><strong>Monthly EMI:</strong> ₹${calculatedEMI.toLocaleString()}</p>
            </div>

            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our finance team will review your application</li>
              <li>We may contact you for additional information</li>
              <li>You will receive a decision within 2-3 business days</li>
              <li>Once approved, we'll schedule a consultation</li>
            </ul>

            <p style="margin-top: 15px; font-size: 12px; color: #666;">
              <strong>Reference ID:</strong> ${application._id}<br>
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #A97C51; color: white; border-radius: 10px; text-align: center;">
            <p style="margin: 0; font-size: 16px;">
              <strong>Let's start shaping your dream space together!</strong>
            </p>
          </div>
          
          <p style="margin-top: 20px; color: #666; font-size: 12px; text-align: center;">
            This is an automated response. Please do not reply to this email.<br>
            For queries, contact: care@aceoninterio.com | +91 99197 55066
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(applicantMailOptions)
    ]);

    return NextResponse.json(
      { 
        message: 'EMI application submitted successfully',
        applicationId: application._id,
        calculatedEMI,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing EMI application:', error);
    
    return NextResponse.json(
      { error: 'Failed to process your application. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: Record<string, string> = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get applications with pagination
    const applications = await EMIApplication.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v') // Exclude version key
      .lean();

    // Get total count for pagination
    const total = await EMIApplication.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Get status counts for filters
    const statusCounts = await EMIApplication.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format status counts
    const statusStats = {
      pending: 0,
      approved: 0,
      rejected: 0,
      under_review: 0,
      total: total
    };

    statusCounts.forEach((stat: { _id: string; count: number }) => {
      statusStats[stat._id as keyof typeof statusStats] = stat.count;
    });

    return NextResponse.json({
      success: true,
      data: {
        applications,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        },
        filters: {
          status: statusStats
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching EMI applications:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch applications' 
      },
      { status: 500 }
    );
  }
}

// Optional: Add PUT endpoint to update application status
export async function PUT(request: NextRequest) {
  try {
    const { applicationId, status, adminNotes } = await request.json();

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'under_review'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedApplication = await EMIApplication.findByIdAndUpdate(
      applicationId,
      {
        status,
        ...(adminNotes && { adminNotes }),
        updatedAt: new Date()
      },
      { new: true }
    ).select('-__v');

    if (!updatedApplication) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Send status update email to applicant (optional)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const statusUpdateEmail = {
      from: process.env.SMTP_USER,
      to: updatedApplication.email,
      subject: `EMI Application Update - ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A97C51;">EMI Application Status Update</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 4px solid #A97C51;">
            <p>Dear <strong>${updatedApplication.fullName}</strong>,</p>
            <p>Your EMI application has been <strong>${status}</strong>.</p>
            
            ${adminNotes ? `
            <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 5px;">
              <p><strong>Admin Notes:</strong> ${adminNotes}</p>
            </div>
            ` : ''}
            
            <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 5px;">
              <h4 style="color: #333; margin-top: 0;">Application Details:</h4>
              <p><strong>Reference ID:</strong> ${updatedApplication._id}</p>
              <p><strong>Package:</strong> ${updatedApplication.interiorPackage}</p>
              <p><strong>Total Amount:</strong> ₹${updatedApplication.totalAmount.toLocaleString()}</p>
              <p><strong>Monthly EMI:</strong> ₹${updatedApplication.calculatedEMI.toLocaleString()}</p>
            </div>

            <p style="margin-top: 15px; font-size: 12px; color: #666;">
              <strong>Updated:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <p style="margin-top: 20px; color: #666; font-size: 12px; text-align: center;">
            For queries, contact: care@aceoninterio.com | +91 99197 55066
          </p>
        </div>
      `,
    };

    // Send status update email
    await transporter.sendMail(statusUpdateEmail);

    return NextResponse.json({
      success: true,
      message: 'Application status updated successfully',
      data: updatedApplication
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating application status:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update application status' 
      },
      { status: 500 }
    );
  }
}