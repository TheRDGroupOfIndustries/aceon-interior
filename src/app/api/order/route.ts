import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

// GET /api/order - Get all orders for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
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
    if (user.role == "admin") {
      orders = await Order.aggregate([
        {
          $lookup: {
            from: "products", // The collection name for products
            localField: "productId",
            foreignField: "_id",
            as: "productId",
          },
        },
        { $unwind: "$productId" },
        { $sort: { createdAt: -1 } },
      ]);
    } else {
      orders = await Order.aggregate([
        { $match: { userId: user._id } },
        {
          $lookup: {
            from: "products", // The collection name for products
            localField: "productId",
            foreignField: "_id",
            as: "productId",
          },
        },
        { $unwind: "$productId" },
        { $sort: { createdAt: -1 } },
      ]);
    }

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/order - Create a new order
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity, variant, address, paymentMethod, grandTotal } =
      body;

    // Validate required fields
    if (
      !productId ||
      !quantity ||
      !variant ||
      !address ||
      !paymentMethod ||
      !grandTotal
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
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

    // Create the order
    const order = await Order.create({
      productId,
      quantity,
      variant,
      address,
      paymentMethod,
      grandTotal,
      userId: user._id, // Add user reference
    });

    // Add order to user's orders array
    await User.findByIdAndUpdate(user._id, {
      $push: { orders: order._id },
    });

    // Populate the created order with product details
    const populatedOrder = await Order.aggregate([
      { $match: { _id: order._id } },
      {
        $lookup: {
          from: "products", // The collection name for products
          localField: "productId",
          foreignField: "_id",
          as: "productId",
        },
      },
      { $unwind: "$productId" },
    ]);
    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        data: populatedOrder[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
