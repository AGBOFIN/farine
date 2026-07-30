import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Farine De La Capitale - La meilleure farine instantanée pour votre bouillie",
  description: "Une farine nutritive, savoureuse et prête en quelques minutes, fabriquée à partir d'ingrédients soigneusement sélectionnés au Togo.",
  keywords: ["farine", "bouillie", "Togo", "farine instantanée", "maïs", "sorgho", "nutrition"],
  openGraph: {
    title: "Farine De La Capitale - La meilleure farine instantanée pour votre bouillie",
    description: "Une farine nutritive, savoureuse et prête en quelques minutes, fabriquée à partir d'ingrédients soigneusement sélectionnés au Togo.",
    type: "website",
    locale: "fr_TG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
