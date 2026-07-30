import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockSiteContent } from "@/lib/mock-data";
import { Save } from "lucide-react";

export default function AdminContentPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion du contenu</h1>
          <p className="text-gray-600 mt-2">
            Modifiez les textes et descriptions du site
          </p>
        </div>

        <div className="space-y-6">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Section Hero (Accueil)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Titre principal</Label>
                <Input
                  id="hero-title"
                  defaultValue={mockSiteContent.hero.title}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Sous-titre</Label>
                <Textarea
                  id="hero-subtitle"
                  defaultValue={mockSiteContent.hero.subtitle}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-cta-primary">Bouton principal</Label>
                <Input
                  id="hero-cta-primary"
                  defaultValue={mockSiteContent.hero.ctaPrimary}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-cta-secondary">Bouton secondaire</Label>
                <Input
                  id="hero-cta-secondary"
                  defaultValue={mockSiteContent.hero.ctaSecondary}
                />
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>Section À propos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-history">Histoire</Label>
                <Textarea
                  id="about-history"
                  defaultValue={mockSiteContent.about.history}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-mission">Mission</Label>
                <Textarea
                  id="about-mission"
                  defaultValue={mockSiteContent.about.mission}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-quality">Qualité</Label>
                <Textarea
                  id="about-quality"
                  defaultValue={mockSiteContent.about.quality}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-hygiene">Hygiène</Label>
                <Textarea
                  id="about-hygiene"
                  defaultValue={mockSiteContent.about.hygiene}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-satisfaction">Satisfaction client</Label>
                <Textarea
                  id="about-satisfaction"
                  defaultValue={mockSiteContent.about.satisfaction}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Section */}
          <Card>
            <CardHeader>
              <CardTitle>Section Produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Nom du produit</Label>
                <Input
                  id="product-name"
                  defaultValue={mockSiteContent.product.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  defaultValue={mockSiteContent.product.description}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-[#EAB308] hover:bg-[#D97706]">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800">
              <strong>Note :</strong> Les modifications sont actuellement simulées. Une fois l'API Laravel connectée, les modifications seront sauvegardées en base de données.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
