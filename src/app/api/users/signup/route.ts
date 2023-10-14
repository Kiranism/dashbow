import { dbConnect } from "@/db/dbConfig";
import User from "@/db/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    //check if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    console.log("savedUser", savedUser);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
