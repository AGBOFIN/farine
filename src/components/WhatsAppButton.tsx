import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink, whatsappMessages } from "@/lib/mock-data";

export default function WhatsAppButton({ message = whatsappMessages.order }: { message?: string }) {
  return (
    <a
      href={generateWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-lg transition-all hover:scale-110 hover:bg-[#128C7E] hover:shadow-xl"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
