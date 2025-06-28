import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import ProductService from "../services/ProductService";

export default function useProducts(editingFlower?: Product) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [editingFlower]);

  async function fetchProducts() {
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function deleteProduct(id: number) {
    try {
      await ProductService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return {
    products,
    fetchProducts,
    deleteProduct,
  };
}
