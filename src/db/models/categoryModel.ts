import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      unique: true,
    },
    description: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.categories || mongoose.model("categories", categorySchema);

export default Category;
