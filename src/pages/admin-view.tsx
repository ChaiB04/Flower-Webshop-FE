"use client";

import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Plus, Edit, Trash2, MoreHorizontalIcon } from "lucide-react";
import CreateProduct from "./create-product";
import EditProduct from "./edit-product";
import ProductService from "../services/ProductService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import useProducts from "../hooks/useProducts";

export default function AdminView() {
const [editingFlower, setEditingFlower] = useState<Product | undefined>();
const { products, fetchProducts, deleteProduct } = useProducts(editingFlower);

  const [startAdd, setStartAdd] = useState(false);
  const [startEdit, setStartEdit] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [editingFlower]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Admin Dashboard
            </h2>
            <p className="text-slate-600">Manage your flower inventory</p>
          </div>
          {startAdd ? (
            <Button
              onClick={
                startAdd ? () => setStartAdd(false) : () => setStartAdd(true)
              }
              className="border-purple-200 border-2 text-purple-600 hover:bg-purple-50 px-8 py-3  bg-white/80"
            >
              <MoreHorizontalIcon />
              Adding New Product
            </Button>
          ) : (
            <Button
              onClick={
                startAdd ? () => setStartAdd(false) : () => setStartAdd(true)
              }
              className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          )}
        </div>

        {/* Add Flower Form */}
        {startAdd && (
          <CreateProduct
            onDone={() => {
              setStartAdd(false);
              fetchProducts();
            }}
          />
        )}

        {/* Products Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/50">
          <CardHeader>
            <CardTitle className="text-slate-700">Flower Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2">Image</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Category</th>
                    <th className="text-left py-3 px-2">Price</th>
                    <th className="text-left py-3 px-2">Stock</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((flower) => [
                    <tr
                      key={`${flower.id}-main`}
                      className="border-b border-slate-100 hover:bg-slate-50/50"
                    >
                      <td className="py-3 px-2">
                        <img
                          src="/logo.png"
                          alt="Site logo"
                          width={60}
                          height={60}
                          loading="lazy"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-slate-700">
                            {flower.name}
                          </p>
                          <p className="text-sm text-slate-500 truncate max-w-xs">
                            {flower.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700"
                        >
                          {flower.flower_category}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 font-semibold text-slate-700">
                        ${flower.price}
                      </td>
                      <td className="py-3 px-2">
                        <Badge
                          variant={flower.stock > 0 ? "default" : "destructive"}
                          className={
                            flower.stock > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-700 text-gray-100"
                          }
                        >
                          {flower.stock > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </td>
                       <td className="py-3 px-2">
                        <Badge
                          variant={flower.archived ? "default" : "destructive"}
                          className={
                            flower.archived 
                              ? "bg-gray-700 text-gray-100"
                              : "bg-green-100 text-green-700"
                          }
                        >
                          {flower.archived ? "Archived" : "Active"}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex space-x-2">
                          {startEdit ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={
                                startEdit
                                  ? () => setStartEdit(false)
                                  : () => setStartEdit(true)
                              }
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (
                                  startEdit &&
                                  editingFlower?.id === flower.id
                                ) {
                                  setStartEdit(false);
                                  setEditingFlower(undefined);
                                } else {
                                  setEditingFlower(flower);
                                  setStartEdit(true);
                                }
                              }}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white/90 backdrop-blur-sm border-white/50">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. It will
                                  permanently delete this flower from your
                                  inventory.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700"
                                  onClick={() => deleteProduct(flower.id)}
                                >
                                  Yes, delete it
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>,

                    startEdit && editingFlower?.id === flower.id ? (
                      <tr key={`${flower.id}-edit`}>
                        <td colSpan={6}>
                          <EditProduct
                            flower={flower}
                            setStartEdit={setStartEdit}
                            startEdit={startEdit}
                            onDone={() => {
                              fetchProducts(); // reload updated list
                            }}
                          />
                        </td>
                      </tr>
                    ) : null,
                  ])}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
