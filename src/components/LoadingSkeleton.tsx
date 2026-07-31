import { Loader2 } from "lucide-react";

export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border-2 rounded-lg p-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function IngredientSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="border-2 rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingSpinner({ message = "Démarrage du serveur en cours, veuillez patienter quelques secondes..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-[#EAB308]" />
      <p className="text-gray-600 text-lg">{message}</p>
      <p className="text-gray-400 text-sm">Le serveur peut prendre jusqu'à 50 secondes pour se réveiller</p>
    </div>
  );
}
