"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { mockSiteContent } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export default function WhyChooseUsPage() {
  const features = mockSiteContent.features;

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
              Pourquoi choisir Farine De La Capitale ?
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez les avantages qui font de notre farine le choix idéal pour votre famille
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#EAB308] transition-all hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAB308] to-[#D97706]">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
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
              Prêt à découvrir la différence ?
            </h2>
            <p className="mt-4 text-lg text-yellow-100">
              Commandez notre farine instantanée et goûtez à la qualité
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <a
                href="/notre-farine"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#EAB308] transition-colors hover:bg-gray-100"
              >
                Découvrir notre farine
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
