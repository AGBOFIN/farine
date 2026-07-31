import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Clock, MapPin, Mail } from "lucide-react";
import { mockSiteContent, generateWhatsAppLink, whatsappMessages } from "@/lib/mock-data";

export default function Footer() {
  const contact = mockSiteContent.contact;

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Farine De La Capitale"
                className="h-12 w-auto object-contain"
              />
              <span className="font-bold text-lg">
                Farine De La Capitale
              </span>
            </Link>
            <p className="text-sm text-gray-600">
              La meilleure farine instantanée pour votre bouillie. 
              Produit 100% togolais, nutritif et délicieux.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-[#EAB308]">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-sm text-gray-600 hover:text-[#EAB308]">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/notre-farine" className="text-sm text-gray-600 hover:text-[#EAB308]">
                  Notre farine
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="text-sm text-gray-600 hover:text-[#EAB308]">
                  Ingrédients
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-[#EAB308]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-[#EAB308]" />
                <span className="text-sm text-gray-600">{contact.phone}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-[#EAB308]" />
                <span className="text-sm text-gray-600">{contact.address}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-[#EAB308]" />
                <span className="text-sm text-gray-600">{contact.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 text-[#EAB308]" />
                <span className="text-sm text-gray-600">{contact.hours}</span>
              </li>
            </ul>
          </div>

          {/* WhatsApp & Social */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Commandez maintenant</h3>
            <div className="space-y-3">
              <a
                href={generateWhatsAppLink(whatsappMessages.order)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 rounded-lg bg-[#25D366] px-4 py-3 text-white transition-colors hover:bg-[#128C7E]"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">Commander sur WhatsApp</span>
              </a>
              <a
                href={contact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span className="font-medium">Suivez-nous sur TikTok</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Farine De La Capitale. Tous droits réservés. Designed and developed by Moses Empire
          </p>
        </div>
      </div>
    </footer>
  );
}
