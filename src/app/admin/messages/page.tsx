"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { contactMessagesApi, authApi } from "@/lib/api";
import { ContactMessage } from "@/lib/api";
import { MessageSquare, Mail, Phone, Check, Trash2, Loader2, Eye } from "lucide-react";

export default function AdminMessagesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

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
        await fetchMessages();
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetchMessages = async () => {
    try {
      const data = await contactMessagesApi.getAll();
      setMessages(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } catch (err) {
      if (err instanceof Error && err.message === 'Unauthorized') {
        router.push("/admin/login");
        return;
      }
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await contactMessagesApi.update(id, { is_read: true });
      await fetchMessages();
    } catch (err) {
      alert("Erreur lors du marquage du message comme lu");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;

    try {
      await contactMessagesApi.delete(id);
      await fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      alert("Erreur lors de la suppression du message");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#DC2626]" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages reçus</h1>
          <p className="text-gray-600 mt-2">
            Consultez et gérez les messages de contact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-4">
            {messages.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-gray-500">
                  <MessageSquare className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                  <p>Aucun message</p>
                  <p className="text-sm mt-2">Les messages de contact apparaîtront ici</p>
                </CardContent>
              </Card>
            ) : (
              messages.map((message) => (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id ? 'border-[#EAB308] bg-yellow-50' : 'hover:bg-gray-50'
                  } ${!message.is_read ? 'border-l-4 border-l-[#EAB308]' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {!message.is_read && (
                            <span className="h-2 w-2 rounded-full bg-[#EAB308]" />
                          )}
                          <h3 className="font-semibold text-gray-900 truncate">
                            {message.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {message.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDate(message.created_at)}
                        </p>
                      </div>
                      {!message.is_read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(message.id);
                          }}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {!selectedMessage.is_read && (
                          <span className="h-2 w-2 rounded-full bg-[#EAB308]" />
                        )}
                        <span>{selectedMessage.name}</span>
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(selectedMessage.created_at)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!selectedMessage.is_read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsRead(selectedMessage.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Marquer comme lu
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{selectedMessage.email}</span>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{selectedMessage.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Message</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full ${
                      selectedMessage.is_read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedMessage.is_read ? 'Lu' : 'Non lu'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center text-gray-500">
                  <Eye className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                  <p>Sélectionnez un message pour voir les détails</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
