import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Product } from "../types/product";
import ProductService from "../services/ProductService";
import { Sparkles, X } from "lucide-react";

export function useEditProduct(
  flower?: Product,
  onDone?: () => void
) {
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    if (flower) {
      setFormData(flower);
    }
  }, [flower]);

  const resetForm = () => {
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    ProductService.updateProduct(formData as Product)
      .then(() => {
        onDone?.();
        toast.success("Product updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update product. Please try again and fill everything in.");
      });
  };

  return {
    formData,
    setFormData,
    resetForm,
    handleSubmit,
  };
}
