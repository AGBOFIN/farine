"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { mockSiteContent, generateWhatsAppLink, whatsappMessages } from "@/lib/mock-data";
import { ArrowRight, MessageCircle, Package } from "lucide-react";

export default function Home() {
  const hero = mockSiteContent.hero;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-green-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              >
                {hero.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-600 sm:text-xl"
              >
                {hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href={generateWhatsAppLink(whatsappMessages.order)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#128C7E]"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                
                <Link href="/notre-farine">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#EAB308] text-[#EAB308] hover:bg-[#EAB308] hover:text-white"
                  >
                    <Package className="mr-2 h-5 w-5" />
                    {hero.ctaSecondary}
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-[#16A34A]" />
                  <span>100% naturel</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-[#16A34A]" />
                  <span>Fabriqué au Togo</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-[#16A34A]" />
                  <span>Sans conservateurs</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-yellow-100 to-green-100 aspect-square lg:aspect-[4/3]">
                {/* Placeholder for hero image - bouillie */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-[#EAB308] opacity-20" />
                    <p className="text-gray-500 font-medium">Image de bouillie</p>
                    <p className="text-sm text-gray-400">Farine De La Capitale</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#EAB308] opacity-30" />
                <div className="absolute bottom-8 left-8 h-12 w-12 rounded-full bg-[#16A34A] opacity-20" />
                <div className="absolute top-1/2 right-8 h-6 w-6 rounded-full bg-[#DC2626] opacity-25" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Pourquoi choisir notre farine ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Un produit de qualité supérieure pour votre famille
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockSiteContent.features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAB308]">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link href="/pourquoi-nous-choisir">
              <Button variant="outline" size="lg" className="border-[#EAB308] text-[#EAB308] hover:bg-[#EAB308] hover:text-white">
                Découvrir tous nos avantages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
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
              Prêt à goûter la différence ?
            </h2>
            <p className="mt-4 text-lg text-yellow-100">
              Commandez maintenant et recevez votre farine instantanée chez vous
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
