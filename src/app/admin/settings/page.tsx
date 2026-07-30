import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockSiteContent } from "@/lib/mock-data";
import { Save, Phone, MessageCircle, MapPin, Mail, Clock, MessageSquare } from "lucide-react";

export default function AdminSettingsPage() {
  const contact = mockSiteContent.contact;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-2">
            Configurez les informations de contact et les réseaux sociaux
          </p>
        </div>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-[#EAB308]" />
                Informations de contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Numéro de téléphone</Label>
                <Input
                  id="contact-phone"
                  defaultValue={contact.phone}
                  placeholder="+228 XX XX XX XX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-whatsapp">Numéro WhatsApp</Label>
                <Input
                  id="contact-whatsapp"
                  defaultValue={contact.whatsapp}
                  placeholder="+228XXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  defaultValue={contact.email}
                  placeholder="contact@exemple.tg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-address">Adresse</Label>
                <Textarea
                  id="contact-address"
                  defaultValue={contact.address}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-hours">Horaires d'ouverture</Label>
                <Input
                  id="contact-hours"
                  defaultValue={contact.hours}
                  placeholder="Lundi - Samedi: 8h00 - 18h00"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-gray-900" />
                Réseaux sociaux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social-tiktok">Profil TikTok</Label>
                <Input
                  id="social-tiktok"
                  defaultValue={contact.tiktok}
                  placeholder="https://www.tiktok.com/@votrecompte"
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Paramètres SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">Titre du site</Label>
                <Input
                  id="seo-title"
                  defaultValue="Farine De La Capitale - La meilleure farine instantanée pour votre bouillie"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-description">Meta description</Label>
                <Textarea
                  id="seo-description"
                  defaultValue="Une farine nutritive, savoureuse et prête en quelques minutes, fabriquée à partir d'ingrédients soigneusement sélectionnés au Togo."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-keywords">Mots-clés (séparés par des virgules)</Label>
                <Input
                  id="seo-keywords"
                  defaultValue="farine, bouillie, Togo, farine instantanée, maïs, sorgho, nutrition"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-[#EAB308] hover:bg-[#D97706]">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les paramètres
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
