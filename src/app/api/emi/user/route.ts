import dbConnect from "@/lib/mongodb";
import EMIApplication from "@/models/EmiApplication";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// GET /api/emi/user - Get EMI applications for the current user
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("EMI User API - Session:", session?.user?.email);
    
    if (!session?.user?.email) {
      console.log("EMI User API - No session or email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const normalizedEmail = session.user.email.toLowerCase().trim();
    console.log("EMI User API - Searching for email:", normalizedEmail);

    // Get EMI applications for the current user only
    const emiApplications = await EMIApplication.find({ 
      email: normalizedEmail 
    }).sort({ createdAt: -1 });

    console.log("EMI User API - Found applications:", emiApplications.length, "for email:", normalizedEmail);
    
    // Also let's check if there are any EMI applications at all
    const allApplications = await EMIApplication.find({}).select('email fullName createdAt');
    console.log("EMI User API - All applications in DB:", allApplications.map(app => ({
      email: app.email,
      fullName: app.fullName,
      createdAt: app.createdAt
    })));

    return NextResponse.json({
      data: {
        applications: emiApplications,
        total: emiApplications.length,
      },
    });
  } catch (error) {
    console.error("Error fetching user EMI applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}