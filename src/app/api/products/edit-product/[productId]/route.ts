import { dbConnect } from "@/db/dbConfig";
import Category from "@/db/models/categoryModel";
import Product from "@/db/models/productModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { name, description, category, price, imgUrl } = await req.json();
    const productId = params.productId;
    let product;
    if (mongoose.isValidObjectId(params.productId)) {
      product = await Product.findById(productId);
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product doesnt exist" },
        { status: 400 }
      );
    }

    const categoryToBeAdded = await Category.findById(category);

    if (!categoryToBeAdded) {
      return NextResponse.json(
        { error: "Category doesnt exist" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name,
          description,
          imgUrl,
          price,
          category,
        },
      },
      { new: true }
    );
    console.log(product);
    return NextResponse.json({
      message: "Product Updated successfully",
      success: true,
      updatedProduct,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const productId = params.productId;
    let product;
    if (mongoose.isValidObjectId(params.productId)) {
      product = await Product.findOneAndDelete({
        _id: productId,
      });
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product doesnt exist" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
      success: true,
      product,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
