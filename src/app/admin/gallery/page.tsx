import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockGalleryImages } from "@/lib/mock-data";
import { Save, Plus, Trash2, Upload } from "lucide-react";

export default function AdminGalleryPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion de la galerie</h1>
            <p className="text-gray-600 mt-2">
              Ajoutez ou supprimez des images de la galerie
            </p>
          </div>
          <Button className="bg-[#EAB308] hover:bg-[#D97706]">
            <Upload className="mr-2 h-4 w-4" />
            Télécharger des images
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGalleryImages.map((image) => (
            <Card key={image.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Image Preview */}
                  <div className="relative aspect-square bg-gradient-to-br from-yellow-100 to-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Image placeholder</span>
                  </div>

                  {/* Image Details */}
                  <div className="space-y-2">
                    <Label htmlFor={`image-title-${image.id}`}>Titre</Label>
                    <Input
                      id={`image-title-${image.id}`}
                      defaultValue={image.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`image-category-${image.id}`}>Catégorie</Label>
                    <Input
                      id={`image-category-${image.id}`}
                      defaultValue={image.category}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      Modifier
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Image Card */}
          <Card className="border-2 border-dashed">
            <CardContent className="pt-6 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Ajouter une nouvelle image
                </p>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </CardContent>
          </Card>
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
