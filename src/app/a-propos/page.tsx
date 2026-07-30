"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { mockSiteContent } from "@/lib/mock-data";
import { Heart, ShieldCheck, Award, Users } from "lucide-react";

export default function AboutPage() {
  const about = mockSiteContent.about;

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
              {about.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez notre histoire et notre engagement envers la qualité
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-yellow-100 to-green-100 aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-[#EAB308] opacity-20" />
                    <p className="text-gray-500 font-medium">Notre histoire</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Notre histoire</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {about.history}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Heart className="mx-auto h-16 w-16 text-[#DC2626] mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {about.mission}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Nos valeurs</h2>
            <p className="mt-4 text-lg text-gray-600">
              Ce qui guide notre engagement chaque jour
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full border-t-4 border-t-[#EAB308]">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-[#EAB308] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Qualité</h3>
                  <p className="text-gray-600">{about.quality}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-t-4 border-t-[#16A34A]">
                <CardContent className="pt-6">
                  <ShieldCheck className="h-12 w-12 text-[#16A34A] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Hygiène</h3>
                  <p className="text-gray-600">{about.hygiene}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full border-t-4 border-t-[#DC2626]">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-[#DC2626] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Satisfaction</h3>
                  <p className="text-gray-600">{about.satisfaction}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full border-t-4 border-t-[#EAB308]">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-[#EAB308] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Passion</h3>
                  <p className="text-gray-600">
                    Notre passion pour la cuisine togolaise se retrouve dans chaque sachet de farine que nous produisons.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
