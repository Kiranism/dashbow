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
import { CategoryCol } from "./components/columns";
import Product from "@/db/models/productModel";
import Category from "@/db/models/categoryModel";
import { dbConnect } from "@/db/dbConfig";
import { CategoryClient } from "./components/client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};
export const dynamic = "force-dynamic";

dbConnect();

export default async function CategoryPage() {
  const data = await Category.find({}).lean();
  console.log(data);

  const formattedCategory: CategoryCol[] = data.map((item) => ({
    id: String(item._id),
    name: item.name,
    description: item.description,
  }));
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategory} />
      </div>
    </>
  );
}
