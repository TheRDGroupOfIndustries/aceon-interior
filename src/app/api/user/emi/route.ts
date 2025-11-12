import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from '@/lib/mongodb';
import EMIApplication from '@/models/EmiApplication';

export async function GET(request: NextRequest) {
  try {
    // Get session to verify user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    // Connect to database
    await dbConnect();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build filter object - only get applications for current user
    const filter = {
      email: session.user.email
    };

    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get applications with pagination for current user only
    const applications = await EMIApplication.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v') // Exclude version key
      .lean();

    // Get total count for pagination for current user
    const total = await EMIApplication.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Get status counts for current user
    const statusCounts = await EMIApplication.aggregate([
      { $match: filter }, // Filter by user email first
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
    console.error('Error fetching user EMI applications:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch your EMI applications' 
      },
      { status: 500 }
    );
  }
}