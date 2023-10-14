import Category from "@/db/models/categoryModel";
import { dbConnect } from "@/db/dbConfig";
import mongoose from "mongoose";
import { CategoryCol } from "../components/columns";
import { CategoryForm } from "./components/category-form";
dbConnect();
export default async function ProductAddPage({
  params,
}: {
  params: { categoryId: string };
}) {
  console.log(params);

  let formattedCategory;
  if (mongoose.isValidObjectId(params.categoryId)) {
    const category = await Category.findById(params.categoryId);
    formattedCategory = {
      id: category._id,
      name: category.name,
      description: category.description,
    } as CategoryCol;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={formattedCategory} />
      </div>
    </div>
  );
}