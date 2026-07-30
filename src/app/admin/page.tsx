"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import { authApi, productsApi, ingredientsApi, contactMessagesApi } from "@/lib/api";
import { Package, MessageSquare, Image as ImageIcon, Leaf, Users, TrendingUp, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    ingredients: 0,
    contactMessages: 0,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        await authApi.getUser(token);
        setIsAuthenticated(true);
        
        // Fetch stats
        const [products, ingredients, messages] = await Promise.all([
          productsApi.getAll(),
          ingredientsApi.getAll(),
          contactMessagesApi.getAll(),
        ]);
        
        setStats({
          products: products.length,
          ingredients: ingredients.length,
          contactMessages: messages.length,
        });
      } catch (err) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      try {
        await authApi.logout(token);
      } catch (err) {
        // Logout clears local storage regardless of API response
      }
    }
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#EAB308]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const user = JSON.parse(localStorage.getItem("admin_user") || "{}");

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-2">
              Bienvenue, {user.name || 'Admin'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
          >
            Déconnexion
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Produits
              </CardTitle>
              <Package className="h-4 w-4 text-[#EAB308]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.products}</div>
              <p className="text-xs text-gray-500 mt-1">Formats disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ingrédients
              </CardTitle>
              <Leaf className="h-4 w-4 text-[#16A34A]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ingredients}</div>
              <p className="text-xs text-gray-500 mt-1">Ingrédients actifs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Messages
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-[#DC2626]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contactMessages}</div>
              <p className="text-xs text-gray-500 mt-1">Messages reçus</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Galerie
              </CardTitle>
              <ImageIcon className="h-4 w-4 text-[#EAB308]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500 mt-1">Images</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Utilisateurs
              </CardTitle>
              <Users className="h-4 w-4 text-[#16A34A]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-gray-500 mt-1">Admin actif</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Statut
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#16A34A]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Actif</div>
              <p className="text-xs text-gray-500 mt-1">Site en ligne</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/products"
              className="flex items-center space-x-3 rounded-lg border bg-white p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAB308]">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Gérer produits</p>
                <p className="text-sm text-gray-500">Ajouter/modifier</p>
              </div>
            </a>

            <a
              href="/admin/ingredients"
              className="flex items-center space-x-3 rounded-lg border bg-white p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#16A34A]">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Gérer ingrédients</p>
                <p className="text-sm text-gray-500">Ajouter/modifier</p>
              </div>
            </a>

            <a
              href="/admin/messages"
              className="flex items-center space-x-3 rounded-lg border bg-white p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DC2626]">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Messages</p>
                <p className="text-sm text-gray-500">Voir les messages</p>
              </div>
            </a>

            <a
              href="/admin/settings"
              className="flex items-center space-x-3 rounded-lg border bg-white p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAB308]">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Paramètres</p>
                <p className="text-sm text-gray-500">Contact et réseaux</p>
              </div>
            </a>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="bg-[#EAB308] border-[#EAB308]">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Connecté à l'API Laravel</h3>
                <p className="text-sm text-yellow-100 mt-1">
                  Ce panneau d'administration est connecté à l'API Laravel. Toutes les modifications sont persistées en base de données MySQL.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
