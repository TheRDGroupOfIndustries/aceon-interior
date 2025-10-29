import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await dbConnect();

    const existing = await User.findOne({ email });

    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    if (existing) {
      // If the user exists but has no password (created via Google), attach password
      if (!existing.password) {
        existing.password = hashed;
        existing.name = existing.name || name;
        await existing.save();
        return NextResponse.json({
          ok: true,
          message: "Password set for existing user",
        });
      } else {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 }
        );
      }
    }

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user",
    });

    return NextResponse.json({ ok: true, userId: user._id.toString() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
