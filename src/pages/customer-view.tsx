"use client";

import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Heart, ShoppingCart, Search } from "lucide-react";
import useProducts from "../hooks/useProducts";
import FlowerCarousel from "./FlowerCarousel";

export default function CustomerView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // const [favorites, setFavorites] = useState<string[]>([])

  const { products, fetchProducts, currentPage, setCurrentPage, totalPages } =
    useProducts();

  useEffect(() => {
    fetchProducts( currentPage );
  }, [currentPage]);

  const categories = [
    "all",
    ...Array.from(new Set(products.map((flower) => flower.flower_category))),
  ];

  const filteredFlowers = products.filter((flower) => {
    const matchesSearch =
      flower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flower.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || flower.flower_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // const toggleFavorite = (flowerId: string) => {
  //   setFavorites((prev) => (prev.includes(flowerId) ? prev.filter((id) => id !== flowerId) : [...prev, flowerId]))
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search flowers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-slate-200 focus:border-blue-300"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48 bg-white/80 border-slate-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex justify-center items-center gap-6 mt-12 mb-12">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-6 py-2 rounded-xl text-white font-semibold transition-colors
      ${
        currentPage === 1
          ? "bg-slate-300 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500"
      }`}
          >
            ← Previous
          </Button>

          <span className="text-slate-600 font-medium text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className={`px-6 py-2 rounded-xl text-white font-semibold transition-colors
      ${
        currentPage === totalPages
          ? "bg-slate-300 cursor-not-allowed"
          : "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"
      }`}
          >
            Next →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlowers.map((flower) => (
            <Card
              key={flower.id}
              className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-white/50 overflow-hidden"
            >
              <div className="relative">
                <FlowerCarousel product={flower} />

                {/* <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-3 right-3 ${
                    favorites.includes(flower.id.toString())
                      ? "text-pink-500 bg-white/90"
                      : "text-slate-400 bg-white/70 hover:text-pink-500"
                  } backdrop-blur-sm`}
                  onClick={() => toggleFavorite(flower.id.toString())}
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(flower.id.toString()) ? "fill-current" : ""}`} />
                </Button> */}
                {flower.stock! <= 0 ? (
                  <Badge className="absolute top-3 left-3 bg-slate-500 text-white">
                    Out of Stock
                  </Badge>
                ) : (
                  <></>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-slate-700">
                    {flower.name}
                  </h3>
                  <span className="text-2xl font-bold text-slate-800">
                    ${flower.price}
                  </span>
                </div>

                <Badge
                  variant="secondary"
                  className="mb-3 bg-blue-100 text-blue-700"
                >
                  {flower.flower_category}
                </Badge>

                <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                  {flower.description}
                </p>

                {flower.meaning && (
                  <p className="text-xs text-slate-500 italic mb-4">
                    Meaning: {flower.meaning}
                  </p>
                )}
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white"
                  disabled={flower.stock <= 0 ? true : false}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {flower.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredFlowers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              No flowers found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
