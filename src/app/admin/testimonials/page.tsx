import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockTestimonials } from "@/lib/mock-data";
import { Save, Plus, Trash2, Edit, Check, X } from "lucide-react";

export default function AdminTestimonialsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des témoignages</h1>
            <p className="text-gray-600 mt-2">
              Modérez et gérez les avis clients
            </p>
          </div>
          <Button className="bg-[#EAB308] hover:bg-[#D97706]">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un témoignage
          </Button>
        </div>

        <div className="space-y-4">
          {mockTestimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{testimonial.name} - {testimonial.location}</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`testimonial-content-${testimonial.id}`}>Avis</Label>
                  <Textarea
                    id={`testimonial-content-${testimonial.id}`}
                    defaultValue={testimonial.content}
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`testimonial-name-${testimonial.id}`}>Nom</Label>
                    <Input
                      id={`testimonial-name-${testimonial.id}`}
                      defaultValue={testimonial.name}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`testimonial-location-${testimonial.id}`}>Localisation</Label>
                    <Input
                      id={`testimonial-location-${testimonial.id}`}
                      defaultValue={testimonial.location}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Statut :</span>
                  <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200">
                    <Check className="h-4 w-4 mr-1" />
                    Approuvé
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
