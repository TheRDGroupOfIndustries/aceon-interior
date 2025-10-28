import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/order - Get all orders for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const status = searchParams.get("status");
    console.log(status, page, limit);

    if (!session?.user?.email || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Get all orders for this user, populated with product details
    let orders;
    const aggregationPipeline: any = [
      { $match: status === "all" ? {} : { status } },
      {
        $lookup: {
          from: "products", // The collection name for products
          localField: "productId",
          foreignField: "_id",
          as: "productId",
        },
      },
      {
        $lookup: {
          from: "users", // The collection name for users
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: "$productId" },
      { $unwind: "$userId" },
      { $sort: { createdAt: -1 } }, // Sort by creation date, newest first
    ];

    // Apply pagination if page and limit are provided
    if (page && limit && Number(page) > 0 && Number(limit) > 0) {
      aggregationPipeline.push({ $skip: (Number(page) - 1) * Number(limit) });
    }
    orders = await Order.aggregate(aggregationPipeline as any).limit(
      Number(limit)
    );

    return NextResponse.json({
      success: true,
      data: orders,
      total: await Order.countDocuments(status === "all" ? {} : { status }),
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
