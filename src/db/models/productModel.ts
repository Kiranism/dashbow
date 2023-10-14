import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
    },
    category: {
      ref: "Category",
      required: true,
      type: mongoose.Types.ObjectId,
    },
    description: {
      required: true,
      type: String,
    },
    price: {
      default: 0,
      type: Number,
    },
    imgUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
