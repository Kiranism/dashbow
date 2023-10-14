"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";

export type ProductCol = {
  _id: string;
  name: string;
  category: string;
  imgUrl: string;
  price: number;
  createdAt: string;
};

export const columns: ColumnDef<ProductCol>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "imgUrl",
    header: "Product Img",
    cell: ({ row }) => (
      <Image
        alt="productImg"
        width={200}
        height={200}
        src={row.original.imgUrl}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "category",
    header: "category",
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "actions",
  },
];
