import Product from "@/db/models/productModel";
import { ProductForm } from "./components/product-form";
import Category from "@/db/models/categoryModel";
import { dbConnect } from "@/db/dbConfig";
import mongoose from "mongoose";
import { ProductCol } from "../components/columns";
dbConnect();
export default async function ProductAddPage({
  params,
}: {
  params: { productId: string };
}) {
  console.log(params);
  const categories = await Category.find({}).lean();
  let product;
  if (mongoose.isValidObjectId(params.productId)) {
    product = await Product.findById(params.productId);
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm categories={categories} initialData={product} />
      </div>
    </div>
  );
}
