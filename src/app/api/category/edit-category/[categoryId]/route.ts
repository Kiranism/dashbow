import { dbConnect } from "@/db/dbConfig";
import Category from "@/db/models/categoryModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { name, description } = await req.json();
    const categoryId = params.categoryId;
    let category;
    if (mongoose.isValidObjectId(params.categoryId)) {
      category = await Category.findById(categoryId);
    }

    if (!category) {
      return NextResponse.json(
        { error: "category doesnt exist" },
        { status: 400 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name,
          description,
        },
      },
      { new: true }
    );
    console.log(updatedCategory);
    return NextResponse.json({
      message: "Category Updated successfully",
      success: true,
      updatedCategory,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const categoryId = params.categoryId;
    let category;
    if (mongoose.isValidObjectId(params.categoryId)) {
      category = await Category.findOneAndDelete({
        _id: categoryId,
      });
    }

    if (!category) {
      return NextResponse.json(
        { error: "category doesnt exist" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Category deleted successfully",
      success: true,
      category,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
