"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ingredientsApi, Ingredient } from "@/lib/api";
import { Check, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingSpinner, IngredientSkeleton } from "@/components/LoadingSkeleton";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await ingredientsApi.getAll();
        setIngredients(data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les ingrédients après plusieurs tentatives. Le serveur est peut-être en maintenance. Veuillez réessayer dans quelques instants.");
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Démarrage du serveur en cours, veuillez patienter quelques secondes..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <p className="text-gray-600 text-sm mb-6">
            Le système a automatiquement réessayé 3 fois. Si le problème persiste, le serveur est peut-être en maintenance.
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Réessayer manuellement
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Nos ingrédients naturels
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez les ingrédients de qualité qui composent notre farine
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {ingredients.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Aucun ingrédient disponible pour le moment.</p>
              <p className="text-gray-400 text-sm mt-2">Les données sont en cours de chargement...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ingredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#16A34A] transition-colors overflow-hidden">
                  {/* Ingredient Image */}
                  <div className="relative h-48 bg-gradient-to-br from-yellow-100 to-green-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="h-16 w-16 text-[#EAB308] opacity-30" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">
                        {ingredient.name}
                      </h3>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg">{ingredient.name}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{ingredient.description}</p>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Bienfaits nutritionnels :
                      </h4>
                      <ul className="space-y-2">
                        {ingredient.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start space-x-2 text-sm text-gray-600"
                          >
                            <Check className="h-4 w-4 text-[#16A34A] mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Leaf className="mx-auto h-16 w-16 text-[#16A34A] mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ingrédients 100% naturels
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Tous nos ingrédients sont soigneusement sélectionnés auprès de producteurs locaux togolais.
              Nous nous engageons à n'utiliser que des ingrédients naturels, sans conservateurs ni additifs,
              pour garantir une farine de la plus haute qualité pour votre famille.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
