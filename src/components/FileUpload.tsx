"use client";
import { UploadDropzone } from "@uploadthing/react";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange?: any;
  onRemove: (value: string) => void;
  value: string;
}

export default function FileUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  console.log("value=>", value);

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {!!value.length && (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove("")}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <Image
                fill
                className="object-cover"
                alt="Image"
                src={value || ""}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <UploadDropzone<OurFileRouter>
          className="bg-white py-2 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
          endpoint="imageUploader"
          config={{ mode: "auto" }}
          content={{
            allowedContent({ isUploading }) {
              if (isUploading)
                return (
                  <>
                    <p className="mt-2 text-sm text-slate-400 animate-pulse">
                      Img Uploading...
                    </p>
                  </>
                );
            },
          }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            if (res) {
              onChange(res[0]?.url);
            }
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
          onUploadBegin={(name) => {
            // Do something once upload begins
            console.log("Uploading: ", name);
          }}
        />
      </div>
    </div>
  );
}
