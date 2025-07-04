// hooks/useProductForm.ts
import { useState } from "react";
import { Save, X, Flower2, Sparkles } from "lucide-react";
import { Product } from "../types/product";
import ProductService from "../services/ProductService";
import { toast } from "react-toastify";

export function useProductForm(onDone: () => void) {
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [photos, setPhotos] = useState<File[]>([]);

  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoChange = (e: any) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files) as File[];
      setPhotos([...photos, ...newPhotos]);
    }
  };
  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const arrayBufferToBase64 = (buffer: BlobPart) => {
    return new Promise((resolve, reject) => {
      try {
        const blob = new Blob([buffer], { type: "application/octet-binary" });
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result) {
            const base64String = (reader.result as string).split(",")[1];
            resolve(base64String);
          } else {
            reject(new Error("FileReader result is null."));
          }
        };

        reader.onerror = (error) => {
          reject(new Error("Error reading ArrayBuffer as Base64: " + error));
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const photoPromises = photos.map((photo) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(photo);
          reader.onloadend = () => {
            if (reader.result !== null) {
              arrayBufferToBase64(reader.result).then(resolve).catch(reject);
            } else {
              reject(new Error("FileReader result is null."));
            }
          };
          reader.onerror = reject;
        });
      });

      const base64Strings = (await Promise.all(photoPromises)) as string[];

      const finalData: Product = {
        ...formData,
        photos: base64Strings,
      } as Product;

      await ProductService.createProduct(finalData);
      toast.success("Product created successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to create product. Please try again and fill everything in."
      );
    }
  };

  const resetForm = () => {
    setFormData({});
    onDone();
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    resetForm,
    photos,
    handlePhotoChange,
    removePhoto,
    arrayBufferToBase64,
  };
}
