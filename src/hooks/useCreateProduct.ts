// hooks/useProductForm.ts
import { useState } from "react";
import { Save, X, Flower2, Sparkles } from "lucide-react";
import { Product } from "../types/product";
import ProductService from "../services/ProductService";
import { toast } from "react-toastify";

export function useProductForm(onDone: () => void) {
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    ProductService.createProduct(formData as Product).then
      (() => {
        toast.success("Product created successfully!");
        resetForm();
      })
      .catch(() => {
        toast.error("Failed to create product. Please try again and fill everything in.");
      });
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
  };
}
