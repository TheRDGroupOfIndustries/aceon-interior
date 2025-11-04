import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/message";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { messageId, reply } = await request.json();

    if (!messageId || !reply) {
      return NextResponse.json(
        { error: "Message ID and reply are required" },
        { status: 400 }
      );
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { reply },
      { new: true }
    );

    if (!updatedMessage) {
      return NextResponse.json(
        { error: "Message not found or could not be updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Reply added successfully", data: updatedMessage },
      { status: 200 }
    );

  } catch (error) {
    
    console.error("Error updating message reply:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
