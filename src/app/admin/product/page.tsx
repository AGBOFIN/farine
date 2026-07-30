import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockSiteContent } from "@/lib/mock-data";
import { Save, Plus, Trash2 } from "lucide-react";

export default function AdminProductPage() {
  const product = mockSiteContent.product;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion du produit</h1>
          <p className="text-gray-600 mt-2">
            Modifiez les informations et les prix de la farine
          </p>
        </div>

        <div className="space-y-6">
          {/* Product Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Nom du produit</Label>
                <Input id="product-name" defaultValue={product.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  defaultValue={product.description}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Formats and Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Formats et tarifs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.formats.map((format, index) => (
                <div key={index} className="flex items-end space-x-4 p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`format-name-${index}`}>Nom du format</Label>
                    <Input
                      id={`format-name-${index}`}
                      defaultValue={format.name}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`format-weight-${index}`}>Poids</Label>
                    <Input
                      id={`format-weight-${index}`}
                      defaultValue={format.weight}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`format-price-${index}`}>Prix (FCFA)</Label>
                    <Input
                      id={`format-price-${index}`}
                      type="number"
                      defaultValue={format.price}
                    />
                  </div>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un format
              </Button>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images du produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-square border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="text-center">
                      <Plus className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Image {i}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Cliquez sur une case pour télécharger une image (JPG, PNG, WebP)
              </p>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-[#EAB308] hover:bg-[#D97706]">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800">
              <strong>Note :</strong> Les modifications sont actuellement simulées. Une fois l'API Laravel connectée, les modifications seront sauvegardées en base de données.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
