"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";
import { productsApi, authApi } from "@/lib/api";
import { Product } from "@/lib/api";
import { Package, Plus, Edit, Trash2, Loader2, X } from "lucide-react";

export default function AdminProductsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    weight: '',
    image_url: '',
    is_active: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        await authApi.getUser(token);
        setIsAuthenticated(true);
        await fetchProducts();
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (err) {
      if (err instanceof Error && err.message === 'Unauthorized') {
        router.push("/admin/login");
        return;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        is_active: formData.is_active,
      };

      if (editingProduct) {
        await productsApi.update(editingProduct.id, productData);
      } else {
        await productsApi.create(productData);
      }

      await fetchProducts();
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
    } catch (err) {
      alert("Erreur lors de la sauvegarde du produit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      weight: product.weight,
      image_url: product.image_url || '',
      is_active: product.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      await productsApi.delete(id);
      await fetchProducts();
    } catch (err) {
      alert("Erreur lors de la suppression du produit");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      weight: '',
      image_url: '',
      is_active: true,
    });
    setEditingProduct(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#EAB308]" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gérer les produits</h1>
            <p className="text-gray-600 mt-2">
              Ajoutez, modifiez ou supprimez les formats de farine
            </p>
          </div>
          {!showForm && (
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-[#EAB308] hover:bg-[#D97706]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau produit
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du produit *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Poids/Format *</Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="ex: 1kg, 500g"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Prix (FCFA) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL de l'image</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="is_active">Produit actif</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#EAB308] hover:bg-[#D97706]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      editingProduct ? 'Modifier' : 'Créer'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {products.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <Package className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                <p>Aucun produit trouvé</p>
                <p className="text-sm mt-2">Cliquez sur "Nouveau produit" pour commencer</p>
              </CardContent>
            </Card>
          ) : (
            products.map((product) => (
              <Card key={product.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-20 w-20 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.weight}</p>
                        <p className="text-lg font-bold text-[#EAB308] mt-1">
                          {product.price.toLocaleString()} FCFA
                        </p>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {product.description}
                        </p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs mt-2 ${
                          product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.is_active ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
