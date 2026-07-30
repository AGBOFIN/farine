"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/AdminLayout";
import { ingredientsApi, authApi } from "@/lib/api";
import { Ingredient } from "@/lib/api";
import { Leaf, Plus, Edit, Trash2, Loader2, X } from "lucide-react";

export default function AdminIngredientsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: [''],
    image_url: '',
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
        await fetchIngredients();
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetchIngredients = async () => {
    try {
      const data = await ingredientsApi.getAll();
      setIngredients(data);
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
      const ingredientData = {
        ...formData,
        benefits: formData.benefits.filter(b => b.trim() !== ''),
      };

      if (editingIngredient) {
        await ingredientsApi.update(editingIngredient.id, ingredientData);
      } else {
        await ingredientsApi.create(ingredientData);
      }

      await fetchIngredients();
      setShowForm(false);
      setEditingIngredient(null);
      resetForm();
    } catch (err) {
      alert("Erreur lors de la sauvegarde de l'ingrédient");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setFormData({
      name: ingredient.name,
      description: ingredient.description,
      benefits: ingredient.benefits.length > 0 ? ingredient.benefits : [''],
      image_url: ingredient.image_url || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet ingrédient ?")) return;

    try {
      await ingredientsApi.delete(id);
      await fetchIngredients();
    } catch (err) {
      alert("Erreur lors de la suppression de l'ingrédient");
    }
  };

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: newBenefits.length > 0 ? newBenefits : [''] });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      benefits: [''],
      image_url: '',
    });
    setEditingIngredient(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#16A34A]" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gérer les ingrédients</h1>
            <p className="text-gray-600 mt-2">
              Ajoutez, modifiez ou supprimez les ingrédients
            </p>
          </div>
          {!showForm && (
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-[#16A34A] hover:bg-[#15803d]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvel ingrédient
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {editingIngredient ? 'Modifier l\'ingrédient' : 'Nouvel ingrédient'}
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
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de l'ingrédient *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label> Bienfaits nutritionnels</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addBenefit}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        placeholder="ex: Riche en protéines"
                      />
                      {formData.benefits.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeBenefit(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
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
                    className="bg-[#16A34A] hover:bg-[#15803d]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      editingIngredient ? 'Modifier' : 'Créer'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {ingredients.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <Leaf className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                <p>Aucun ingrédient trouvé</p>
                <p className="text-sm mt-2">Cliquez sur "Nouvel ingrédient" pour commencer</p>
              </CardContent>
            </Card>
          ) : (
            ingredients.map((ingredient) => (
              <Card key={ingredient.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {ingredient.image_url && (
                        <img
                          src={ingredient.image_url}
                          alt={ingredient.name}
                          className="h-20 w-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{ingredient.name}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {ingredient.description}
                        </p>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Bienfaits :</p>
                          <div className="flex flex-wrap gap-1">
                            {ingredient.benefits.map((benefit, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(ingredient)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(ingredient.id)}
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
