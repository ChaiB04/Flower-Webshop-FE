import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Save, X, Flower2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductService from "../services/ProductService";
import { toast } from "react-toastify";

export default function CreateProduct({ onDone }: { onDone: () => void }) {
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {}, [formData]);

  const resetForm = () => {
    setFormData({});
    onDone();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
      ProductService.createProduct(formData as Product).then
      (() => {
        toast.success("Product created successfully!", {
          icon: <Sparkles className="h-5 w-5 text-purple-500" />,
        });
        resetForm();
      })
      .catch((error) => {
        toast.error("Failed to create product. Please try again and fill everything in.", {
          icon: <X className="h-5 w-5 text-red-500" />,
        });
      });
  };

  return (
    <div className="min-h-screen mb-10">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/70  border-white/50 rounded-3xl overflow-hidden">
          {/* Header Section */}
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-slate-700 flex items-center gap-2">
              <Flower2 className="h-6 w-6 text-purple-500" />
              Enter Product Details
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-purple-100 pb-2">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-slate-600 font-medium"
                    >
                      Flower Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g., Pink Hydrangea"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="flower_category"
                      className="text-slate-600 font-medium"
                    >
                      Flower Type
                    </Label>
                    <Input
                      id="flower_category"
                      placeholder="e.g., Hydrangeas, Roses, Tulips"
                      value={formData.flower_category || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          flower_category: e.target.value,
                        })
                      }
                      required
                      className="bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="product_category"
                      className="text-slate-600 font-medium"
                    >
                      Product Type
                    </Label>
                    <Select
                      value={formData.product_category || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, product_category: value })
                      }
                      required
                    >
                      <SelectTrigger className="bg-white/80 border-purple-200 focus:border-purple-400 rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border-purple-200 rounded-xl">
                        <SelectItem
                          value="BOUQUET"
                          className="focus:bg-purple-50"
                        >
                          🌹 Bouquet
                        </SelectItem>
                        <SelectItem
                          value="SINGLE_FLOWER"
                          className="focus:bg-purple-50"
                        >
                          🌸 Single Flower
                        </SelectItem>
                        <SelectItem
                          value="ACCESSORY"
                          className="focus:bg-purple-50"
                        >
                          ✨ Accessory
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-slate-600 font-medium"
                    >
                      Price ($)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="24.99"
                      value={formData.price || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number.parseFloat(e.target.value),
                        })
                      }
                      required
                      className="bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="stock"
                      className="text-slate-600 font-medium"
                    >
                      Stock Quantity
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      step="1"
                      placeholder="10"
                      value={formData.stock || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: Number.parseFloat(e.target.value),
                        })
                      }
                      required
                      className="bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-purple-100 pb-2">
                  Description & Meaning
                </h3>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-slate-600 font-medium"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the beauty and characteristics of this flower..."
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={4}
                    className="bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="meaning"
                    className="text-slate-600 font-medium"
                  >
                    Symbolic Meaning
                  </Label>
                  <Input
                    id="meaning"
                    placeholder="e.g., Love and sincerity, Honor and remembrance"
                    value={formData.meaning || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, meaning: e.target.value })
                    }
                    className="bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl"
                  />
                  <p className="text-xs text-slate-500 italic">
                    What emotions or messages does this flower convey?
                  </p>
                </div>
              </div>

              {/* Media & Settings Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-purple-100 pb-2">
                  Pictures & Settings
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="image"
                      className="text-slate-600 font-medium"
                    >
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/flower-image.jpg"
                      // value={formData.image || ""}
                      // onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl"
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                      <Switch
                        id="archived"
                        checked={!!formData.archived}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, archived: checked })
                        }
                        className="data-[state=checked]:bg-purple-400"
                      />
                      <Label
                        htmlFor="archived"
                        className="text-slate-600 font-medium cursor-pointer"
                      >
                        Archive Product
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-6 border-t border-purple-100">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Flower
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
