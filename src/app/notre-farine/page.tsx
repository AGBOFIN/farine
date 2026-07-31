"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink, whatsappMessages } from "@/lib/mock-data";
import { productsApi, Product } from "@/lib/api";
import { MessageCircle, Package, Check, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingSpinner, ProductSkeleton } from "@/components/LoadingSkeleton";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les produits. Veuillez vérifier votre connexion ou réessayer.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const mainProduct = products.find(p => p.is_active) || products[0];
  const formats = products.filter(p => p.is_active);

  if (loading) {
    return <LoadingSpinner message="Chargement de nos produits..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <p className="text-gray-600 text-sm mb-6">
            Le serveur peut prendre quelques secondes pour démarrer. Veuillez réessayer.
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              {mainProduct?.name || 'Farine De La Capitale'}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez notre farine instantanée de qualité supérieure
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-yellow-100 to-green-100 aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Package className="mx-auto h-32 w-32 text-[#EAB308] opacity-30 mb-4" />
                    <p className="text-gray-500 font-medium">Farine De La Capitale</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-yellow-50 to-green-50 aspect-square"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="h-8 w-8 text-[#EAB308] opacity-30" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {mainProduct?.name || 'Farine De La Capitale'}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {mainProduct?.description || 'Notre farine instantanée est un mélange équilibré de céréales locales soigneusement sélectionnées.'}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-[#16A34A]" />
                  <span className="text-gray-700">100% ingrédients naturels</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-[#16A34A]" />
                  <span className="text-gray-700">Sans conservateurs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-[#16A34A]" />
                  <span className="text-gray-700">Préparation en 5 minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-[#16A34A]" />
                  <span className="text-gray-700">Riche en nutriments essentiels</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-[#16A34A]" />
                  <span className="text-gray-700">Produit local togolais</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={generateWhatsAppLink(whatsappMessages.order)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#128C7E]"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Commander sur WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Nos formats</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choisissez le format adapté à vos besoins
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {formats.map((format, index) => (
              <motion.div
                key={format.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#EAB308] transition-colors">
                  <CardHeader>
                    <CardTitle className="text-center text-xl">{format.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#EAB308]">
                        {format.price.toLocaleString()} FCFA
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{format.weight}</div>
                    </div>
                    <a
                      href={generateWhatsAppLink(
                        `Bonjour, je souhaite commander ${format.name} (${format.weight}) de votre farine instantanée.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-[#EAB308] text-[#EAB308] hover:bg-[#EAB308] hover:text-white"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Commander
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#EAB308]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Prêt à commander ?
            </h2>
            <p className="mt-4 text-lg text-yellow-100">
              Contactez-nous sur WhatsApp pour passer votre commande
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <a
                href={generateWhatsAppLink(whatsappMessages.order)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#EAB308] transition-colors hover:bg-gray-100"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Commander sur WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
