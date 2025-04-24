"use client";
import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { UploadIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useMessages from "@/lib/hooks/useMessages";

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { showMessage } = useMessages();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        handleFile(file);
      }
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (image) {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("image", image);

      fetch("/api/profile/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setIsSubmitting(false);

          showMessage(data?.success, "success");

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error("Error uploading image:", error);

          showMessage("Failed to upload image", "error");
        });
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!image) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="container mx-auto max-w-xl py-10 px-4">
      <div className="flex flex-col gap-4">
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 h-80 flex flex-col items-center justify-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : image
              ? "border-primary"
              : "border-gray-300 hover:border-primary"
          } ${!image ? "cursor-pointer" : ""}`}
          onDragOver={!image ? handleDragOver : undefined}
          onDragLeave={!image ? handleDragLeave : undefined}
          onDrop={!image ? handleDrop : undefined}
          onClick={handleClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept="image/*"
            className="hidden"
          />

          {preview ? (
            <>
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={handleCancel}
                  className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Cancel"
                >
                  <XCircleIcon className="h-6 w-6 text-gray-700" />
                </button>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  width={200}
                  height={200}
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </>
          ) : (
            <>
              <UploadIcon className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center">
                Drag & drop an image here, or click to select
              </p>
            </>
          )}
        </div>

        <Button
          className="w-full"
          onClick={handleSave}
          disabled={!image || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Image"}
        </Button>
      </div>
    </div>
  );
}
