import React from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "../data/site.js";

export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Bunyaad Holdings on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
