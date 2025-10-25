import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import EMIApplication from "@/models/EmiApplication";
import Message from "@/models/message";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalMessages = await Message.countDocuments();
    const totalEmiApp = await EMIApplication.countDocuments();
    const totalCategory = await Category.countDocuments();

    const stats = {
      totalOrders,
      totalProducts,
      totalMessages,
      totalEmiApp,
      totalCategory,
    };

    return NextResponse.json(
      {
        success: true,
        data: stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
