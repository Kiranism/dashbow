import { dbConnect } from "@/db/dbConfig";
import Category from "@/db/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();
    const category = await Category.create({ name, description });
    return NextResponse.json({
      message: "Category created successfully",
      success: true,
      category,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
