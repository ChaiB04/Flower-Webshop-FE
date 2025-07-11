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
import { Save, X, Edit3, Flower2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductService from "../services/ProductService";
import { on } from "events";
import { start } from "repl";
import { toast } from "react-toastify";
import { useEditProduct } from "../hooks/useEditProduct";

interface AdminViewProps {
  flower?: Product;
  setStartEdit: React.Dispatch<React.SetStateAction<boolean>>;
  startEdit?: boolean;
  onDone?: () => void; // Callback to reload products after edit
}

export default function EditProduct({
  flower,
  setStartEdit,
  startEdit,
  onDone = () => {},
}: AdminViewProps) {
  const {
    formData,
    setFormData,
    resetForm,
    handleSubmit,
    handlePhotoChange,
    existingPhotos,
    newPhotos,
    removeExistingPhoto,
    removeNewPhoto,
  } = useEditProduct(flower, onDone);

  return (
    <div>
      <Card className="bg-white/70 border-purple-100 border-2 border-t-0 rounded-b-xl rounded-t-none ">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-700 border-b border-purple-100 pb-2">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-600 font-medium">
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
                    defaultValue={formData.product_category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, product_category: value })
                    }
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
                  <Label htmlFor="price" className="text-slate-600 font-medium">
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
                  <Label htmlFor="stock" className="text-slate-600 font-medium">
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
                <Label htmlFor="meaning" className="text-slate-600 font-medium">
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
                Media & Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="cursor-pointer text-purple-600 hover:underline font-medium">Photos</Label>

                  {/* Photo Upload Section */}
                   <div className="border border-dashed border-purple-200 rounded-xl p-6 bg-purple-50/30 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <span className="text-3xl">📷</span>
                        <p className="text-sm text-slate-500">
                          Drag & drop photos here or
                        </p>
                        <Label className="cursor-pointer text-purple-600 hover:underline font-medium">
                          Browse Files
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </Label>
                      </div>
                    </div>

                  {/* Preview Section */}
                  <div className="flex flex-wrap gap-4">
                    {existingPhotos.map((photo, index) => (
                      <div key={`existing-${index}`} className="relative group overflow-hidden rounded-xl border border-purple-200 bg-white shadow-sm">
                        <img
                          src={`data:image/jpeg;base64,${photo}`}
                          alt={`Existing Flower ${index}`}
                              className="w-full h-32 object-cover rounded-xl"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute top-1 right-1 text-red-500 bg-white/80 backdrop-blur-sm hover:bg-white"
                          onClick={() => removeExistingPhoto(index)}
                        >
                          ✕
                        </Button>
                        
                      </div>
                    ))}

                  
                    {newPhotos.map((file, index) => (
                      <div
                        key={`new-${index}`}
                        className="relative group overflow-hidden rounded-xl border border-purple-200 bg-white shadow-sm"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New Flower ${index}`}
                          className="w-full h-32 object-cover rounded-xl"
                        />

                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute top-1 right-1 text-red-500 bg-white/80 backdrop-blur-sm hover:bg-white"
                          onClick={() => removeNewPhoto(index)}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Archive Status */}
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
                    <p className="text-xs text-slate-500 italic">
                      Toggle to archive or unarchive this flower. Archived
                      flowers will not appear in the store.
                    </p>
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
                Update Flower
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm;
                  startEdit ? setStartEdit(false) : setStartEdit(true);
                }}
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
  );
}
