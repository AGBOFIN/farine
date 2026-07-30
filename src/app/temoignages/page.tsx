"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { mockTestimonials } from "@/lib/mock-data";
import { Star, MessageCircle } from "lucide-react";

export default function TestimonialsPage() {
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
              Témoignages de nos clients
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez ce que nos clients disent de notre farine
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#EAB308] transition-colors">
                  <CardContent className="pt-6">
                    {/* Rating */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-[#EAB308] text-[#EAB308]"
                        />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-gray-700 leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#EAB308] to-[#D97706]">
                        <span className="text-lg font-bold text-white">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
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
              Vous aussi, partagez votre expérience
            </h2>
            <p className="mt-4 text-lg text-yellow-100">
              Commandez notre farine et rejoignez nos clients satisfaits
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#EAB308] transition-colors hover:bg-gray-100"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Nous contacter
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
