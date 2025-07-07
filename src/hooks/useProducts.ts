import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import ProductService from "../services/ProductService";

export default function useProducts(editingFlower?: Product) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [editingFlower]);

  async function fetchProducts( page : number) {
    try {
      const data = await ProductService.getProducts(page);
      setProducts(data.content);
      setTotalPages(data.totalPages);
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
    currentPage,
    setCurrentPage,
    totalPages
  };
}
