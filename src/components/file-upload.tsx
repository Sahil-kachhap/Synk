"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { error } from "console";
import { X } from "lucide-react";
import Image from "next/image";

const FileUpload = ({
  endpoint,
  value,
  onChange,
}: {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
}) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="size-20 relative">
        <Image
          fill
          src={value}
          alt="Uploaded Image"
          className="rounded-full object-cover"
        />
        <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" type="button">
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      className="hover:cursor-pointer"
    />
  );
};

export default FileUpload;
