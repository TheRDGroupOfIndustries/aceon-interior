import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { Types } from "mongoose";

// GET /api/order/[orderId] - Get a specific order
export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = await params;
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

    // Get the specific order, ensuring it belongs to the user
    const orders = await Order.aggregate([
      { $match: { _id: new Types.ObjectId(orderId), userId: user._id } },
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

    const order = orders.length > 0 ? orders[0] : null;

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/order/[orderId] - Update order status (admin only) or cancel order (user)
export async function PUT(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, status, reason } = body;

    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Find the order
    const order = await Order.findOne({
      _id: orderId,
      userId: user._id,
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Handle different actions
    if (action === "cancel") {
      // User can cancel their own order if it's in pending/processing status
      if (order.status === "cancelled") {
        return NextResponse.json(
          { success: false, message: "Order is already cancelled" },
          { status: 400 }
        );
      }

      if (order.status === "shipped" || order.status === "delivered") {
        return NextResponse.json(
          {
            success: false,
            message: "Cannot cancel shipped or delivered orders",
          },
          { status: 400 }
        );
      }

      order.status = "cancelled";
      order.cancelledAt = new Date();
      order.cancelReason = reason || "Cancelled by user";
    } else if (action === "update_status") {
      // Admin can update status
      if (user.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "Admin access required" },
          { status: 403 }
        );
      }

      if (!status) {
        return NextResponse.json(
          { success: false, message: "Status is required" },
          { status: 400 }
        );
      }

      const validStatuses = [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { success: false, message: "Invalid status" },
          { status: 400 }
        );
      }

      order.status = status;

      // Set timestamps based on status
      if (status === "shipped" && !order.shippedAt) {
        order.shippedAt = new Date();
      } else if (status === "delivered" && !order.deliveredAt) {
        order.deliveredAt = new Date();
      }
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action" },
        { status: 400 }
      );
    }

    await order.save();

    // Populate the updated order
    const updatedOrder = await Order.aggregate([
      { $match: { _id: new Types.ObjectId(order._id) } },
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

    // The aggregation returns an array, so take the first element

    return NextResponse.json({
      success: true,
      message: `Order ${action === "cancel" ? "cancelled" : "updated"} successfully`,
      data: updatedOrder[0],
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/order/[orderId] - Delete order (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
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

    // Only admin can delete orders
    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    // Find and delete the order
    const order = await Order.findByIdAndDelete(params.orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Remove order from user's orders array
    await User.findByIdAndUpdate(order.userId, {
      $pull: { orders: order._id },
    });

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
