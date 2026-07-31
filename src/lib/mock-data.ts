// Mock data for Farine De La Capitale website
// All content in French with Togo context, prices in FCFA

import { LucideIcon, MapPin, Leaf, Heart, ShieldCheck, Star, Clock } from "lucide-react";

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    history: string;
    mission: string;
    quality: string;
    hygiene: string;
    satisfaction: string;
  };
  product: {
    name: string;
    description: string;
    formats: Array<{
      name: string;
      weight: string;
      price: number;
    }>;
  };
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
  contact: {
    phone: string;
    whatsapp: string;
    tiktok: string;
    address: string;
    hours: string;
    email: string;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  image: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'product' | 'logo' | 'poster' | 'photo';
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  content: string;
  date: string;
}

export interface TikTokVideo {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
}

export const mockSiteContent: SiteContent = {
  hero: {
    title: "La meilleure farine instantanée pour votre bouillie",
    subtitle: "Une farine nutritive, savoureuse et prête en quelques minutes, fabriquée à partir d'ingrédients soigneusement sélectionnés.",
    ctaPrimary: "Commander sur WhatsApp",
    ctaSecondary: "Découvrir nos produits",
  },
  about: {
    title: "À propos de Farine De La Capitale",
    history: "Fondée en 2020 à Lomé, Farine De La Capitale est née de la passion de partager le goût authentique de la cuisine togolaise. Notre entreprise familiale s'est développée grâce à l'engagement de nos artisans et à la confiance de nos clients.",
    mission: "Notre mission est de fournir aux familles togolaises une farine de qualité supérieure, facile à préparer et nutritive. Nous croyons que chaque enfant mérite une bouillie saine et délicieuse pour grandir fort.",
    quality: "La qualité est au cœur de tout ce que nous faisons. Nous sélectionnons rigoureusement nos ingrédients auprès de producteurs locaux et contrôlons chaque étape de la production pour garantir un produit d'excellence.",
    hygiene: "Nous respectons les normes d'hygiène les plus strictes. Notre installation de production est certifiée et régulièrement inspectée pour assurer la sécurité alimentaire de nos clients.",
    satisfaction: "La satisfaction de nos clients est notre priorité. Nous sommes fiers de servir des milliers de familles au Togo et nous nous engageons à améliorer continuellement nos produits.",
  },
  product: {
    name: "Farine Instantanée De La Capitale",
    description: "Notre farine instantanée est un mélange équilibré de céréales locales soigneusement sélectionnées. Prête en quelques minutes, elle offre une nutrition complète pour toute la famille. Sans conservateurs, sans additifs, 100% naturel.",
    formats: [
      { name: "Petit format", weight: "500g", price: 1500 },
      { name: "Format familial", weight: "1kg", price: 2500 },
      { name: "Grand format", weight: "2kg", price: 4500 },
      { name: "Format professionnel", weight: "5kg", price: 10000 },
    ],
  },
  features: [
    {
      id: "1",
      title: "Produit 100% local",
      description: "Nos ingrédients sont cultivés par des agriculteurs togolais, soutenant l'économie locale.",
      icon: MapPin,
    },
    {
      id: "2",
      title: "Ingrédients naturels",
      description: "Pas de conservateurs, pas d'additifs. Juste des ingrédients naturels et sains.",
      icon: Leaf,
    },
    {
      id: "3",
      title: "Riche en nutriments",
      description: "Un mélange équilibré de céréales pour une nutrition complète et équilibrée.",
      icon: Heart,
    },
    {
      id: "4",
      title: "Hygiène garantie",
      description: "Production suivant les normes d'hygiène les plus strictes.",
      icon: ShieldCheck,
    },
    {
      id: "5",
      title: "Goût exceptionnel",
      description: "Le goût authentique de la cuisine traditionnelle togolaise.",
      icon: Star,
    },
    {
      id: "6",
      title: "Préparation rapide",
      description: "Prête en quelques minutes, idéale pour les familles actives.",
      icon: Clock,
    },
  ],
  contact: {
    phone: "+228 98954986",
    whatsapp: "22898954986",
    tiktok: "https://www.tiktok.com/@laety340?_r=1&_t=ZN-98T9wPRmyTG",
    address: "Lomé, Togo",
    hours: "Lundi - Samedi: 8h00 - 18h00",
    email: "farinedelacapitale@gmail.com",
  },
};

export const mockIngredients: Ingredient[] = [
  {
    id: "1",
    name: "Maïs",
    description: "Le maïs est la base de notre farine, apportant douceur et énergie. Cultivé dans les régions du Plateau et des Maritime.",
    benefits: [
      "Riche en glucides pour l'énergie",
      "Source de fibres alimentaires",
      "Contient des vitamines B",
      "Sans gluten naturellement",
    ],
    image: "/images/ingredients/mais.jpg",
  },
  {
    id: "2",
    name: "Sorgho",
    description: "Le sorgho ajoute une texture unique et une richesse nutritionnelle exceptionnelle à notre mélange.",
    benefits: [
      "Riche en antioxydants",
      "Source de protéines végétales",
      "Faible indice glycémique",
      "Résistant à la sécheresse",
    ],
    image: "/images/ingredients/sorgho.jpg",
  },
  {
    id: "3",
    name: "Banane plantain",
    description: "La banane plantain séchée apporte potassium et une douceur naturelle à notre farine.",
    benefits: [
      "Riche en potassium",
      "Source de vitamine C",
      "Apporte des fibres",
      "Goût naturellement sucré",
    ],
    image: "/images/ingredients/banane.jpg",
  },
  {
    id: "4",
    name: "Soja",
    description: "Le soja enrichit notre farine en protéines de haute qualité pour une nutrition complète.",
    benefits: [
      "Excellente source de protéines",
      "Contient des isoflavones",
      "Riche en fer",
      "Bon pour les muscles",
    ],
    image: "/images/ingredients/soja.jpg",
  },
  {
    id: "5",
    name: "Mil",
    description: "Le mil perlé est une céréale traditionnelle africaine, riche en nutriments essentiels.",
    benefits: [
      "Très riche en fer",
      "Source de magnésium",
      "Sans gluten",
      "Digestion facile",
    ],
    image: "/images/ingredients/mil.jpg",
  },
];

export const mockGalleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Farine De La Capitale - Format 1kg",
    category: "product",
    image: "/images/gallery/product-1kg.jpg",
  },
  {
    id: "2",
    title: "Logo Farine De La Capitale",
    category: "logo",
    image: "/images/gallery/logo.jpg",
  },
  {
    id: "3",
    title: "Affiche promotionnelle",
    category: "poster",
    image: "/images/gallery/poster-1.jpg",
  },
  {
    id: "4",
    title: "Production artisanale",
    category: "photo",
    image: "/images/gallery/production.jpg",
  },
  {
    id: "5",
    title: "Ingrédients frais",
    category: "photo",
    image: "/images/gallery/ingredients.jpg",
  },
  {
    id: "6",
    title: "Bouillie prête",
    category: "photo",
    image: "/images/gallery/bouillie.jpg",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Awa K.",
    location: "Lomé",
    rating: 5,
    content: "Ma famille adore cette farine ! La bouillie est prête en 5 minutes et les enfants la demandent tous les matins. Merci Farine De La Capitale !",
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Kofi Mensah",
    location: "Kara",
    rating: 5,
    content: "Qualité exceptionnelle et prix très raisonnable. Je recommande vivement à toutes les familles togolaises.",
    date: "2024-01-10",
  },
  {
    id: "3",
    name: "Maman Adjara",
    location: "Sokodé",
    rating: 4,
    content: "Très bon produit, mes enfants ont repris du poids depuis qu'ils en mangent. Seul petit point : j'aimerais plus de points de vente.",
    date: "2024-01-05",
  },
  {
    id: "4",
    name: "Comlanvi",
    location: "Atakpamé",
    rating: 5,
    content: "Enfin une farine locale de qualité ! Le goût est authentique et la préparation est vraiment rapide. Bravo pour l'initiative.",
    date: "2023-12-28",
  },
];

export const mockTikTokVideos: TikTokVideo[] = [
  {
    id: "1",
    videoId: "7234567890123456789",
    title: "Comment préparer notre bouillie en 3 minutes",
    thumbnail: "/images/tiktok/video-1.jpg",
  },
  {
    id: "2",
    videoId: "7234567890123456790",
    title: "Visite de notre production à Lomé",
    thumbnail: "/images/tiktok/video-2.jpg",
  },
  {
    id: "3",
    videoId: "7234567890123456791",
    title: "Témoignage de nos clients",
    thumbnail: "/images/tiktok/video-3.jpg",
  },
];

// Helper function to generate WhatsApp links
export const generateWhatsAppLink = (message: string): string => {
  const phoneNumber = mockSiteContent.contact.whatsapp.replace(/\+/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

// Pre-defined WhatsApp messages
export const whatsappMessages = {
  order: "Bonjour, je souhaite commander votre farine instantanée. Pouvez-vous me donner plus d'informations sur les formats disponibles et les prix ?",
  info: "Bonjour, je voudrais plus d'informations sur vos produits Farine De La Capitale.",
  ingredient: "Bonjour, j'aimerais en savoir plus sur les ingrédients de votre farine.",
  bulk: "Bonjour, je suis intéressé par une commande en gros pour mon commerce.",
};
