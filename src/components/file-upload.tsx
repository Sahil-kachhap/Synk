"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { error } from "console";
import { FileIcon, X } from "lucide-react";
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

  if(value && fileType === "pdf"){
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="size-10 fill-indigo-100 stroke-indigo-400"/>
        <a href={value} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">{value}</a>
        <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm" type="button">
          <X className="size-4" />
        </button>
      </div>
    )
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
