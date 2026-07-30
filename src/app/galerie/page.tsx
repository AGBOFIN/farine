"use client";

import { motion } from "framer-motion";
import { mockGalleryImages } from "@/lib/mock-data";
import { Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
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
              Notre galerie
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez nos produits, notre production et notre entreprise en images
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGalleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <div className="relative aspect-square bg-gradient-to-br from-yellow-100 to-green-100">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-[#EAB308] opacity-30" />
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
                      {image.category}
                    </span>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <ImageIcon className="mx-auto h-16 w-16 text-[#EAB308] mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Notre histoire en images
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Cette galerie présente notre farine, notre processus de production artisanale,
              et les moments qui font de Farine De La Capitale une entreprise fière de ses racines togolaises.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
