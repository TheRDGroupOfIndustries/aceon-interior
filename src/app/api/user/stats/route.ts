import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
import Message from "@/models/message";
import EMIApplication from "@/models/EmiApplication";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    // Fetch counts for user-specific data
    const orderCount = await Order.countDocuments({ userId: userId });
    const messageCount = await Message.countDocuments({ email: user.email });
    const emiApplicationCount = await EMIApplication.countDocuments({ email: user.email });

    return NextResponse.json(
      {
        orders: orderCount,
        messages: messageCount,
        emiApplications: emiApplicationCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
