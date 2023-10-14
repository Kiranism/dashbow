import { dbConnect } from "@/db/dbConfig";
import Category from "@/db/models/categoryModel";
import Product from "@/db/models/productModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    const { name, description, category, price, imgUrl } = await req.json();
    console.log(imgUrl, name);
    const categoryToBeAdded = await Category.findById(category);
    if (!imgUrl) {
      return NextResponse.json({ error: "Image doesn added" }, { status: 400 });
    }
    if (!categoryToBeAdded) {
      return NextResponse.json(
        { error: "Category doesn exist" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      description,
      imgUrl,
      price,
      category,
    });
    console.log(product);
    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
