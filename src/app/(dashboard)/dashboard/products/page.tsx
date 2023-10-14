import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/MainNav";
import { UserList } from "@/components/UserList";
import { DataTable } from "../../../../components/ui/data-table";
import { ProductCol, columns } from "./components/columns";
import Product from "@/db/models/productModel";
import Category from "@/db/models/categoryModel";
import { dbConnect } from "@/db/dbConfig";
import { ProductsClient } from "./components/client";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

dbConnect();

export default async function ProductPage() {
  const data = await Product.find({}).lean();
  console.log(data);

  const formattedProducts: ProductCol[] = data.map((item) => ({
    _id: String(item._id),
    name: item.name,
    category: String(item.category),
    price: item.price,
    imgUrl: item.imgUrl,
    createdAt: item.createdAt,
  }));
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </>
  );
}
