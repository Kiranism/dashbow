import { dbConnect } from "@/db/dbConfig";
import User from "@/db/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    //check if user exists, checking with username bcs its unique.
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "User doesnt exists" },
        { status: 400 }
      );
    }

    // check if password is correct

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);

    //   create token data

    const tokenData = {
      id: user._id,
      username: user.username,
    };
    //   create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
