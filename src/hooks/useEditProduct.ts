import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Product } from "../types/product";
import ProductService from "../services/ProductService";
import { Sparkles, X } from "lucide-react";

export function useEditProduct(flower?: Product, onDone?: () => void) {
  const [formData, setFormData] = useState<Partial<Product>>({});
const [existingPhotos, setExistingPhotos] = useState<string[]>(flower?.photos ?? []);
const [newPhotos, setNewPhotos] = useState<File[]>([]);


  useEffect(() => {
    if (flower) {
      setFormData(flower);
    }
  }, [flower]);

const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);
    setNewPhotos((prev) => [...prev, ...files]);
  }
};

const removeExistingPhoto = (index: number) => {
  setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
};

const removeNewPhoto = (index: number) => {
  setNewPhotos((prev) => prev.filter((_, i) => i !== index));
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

  const resetForm = () => {
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const photoPromises = newPhotos.map((file) => {
      return new Promise<string>((resolve: any, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
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

    const base64NewPhotos = await Promise.all(photoPromises);
    const finalPhotos = [...existingPhotos, ...base64NewPhotos];

    if (formData.id === undefined) {
      throw new Error("Product id is required for updating the product.");
    }
    const finalData: Product = {
      ...(formData as Product),
      id: formData.id,
      photos: finalPhotos,
    };

    const response = await ProductService.updateProduct(finalData);

    console.log("Update Response:", finalData);
    // onDone?.();
    // toast.success("Product updated successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update product. Please try again.");
  }
};


  return {
    formData,
    setFormData,
    resetForm,
    handleSubmit,
    handlePhotoChange,
    arrayBufferToBase64,
    existingPhotos,
    newPhotos,
    removeExistingPhoto,
    removeNewPhoto,
  };
}
