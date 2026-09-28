"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const phoneNumber = "919211420420";
  const defaultMessage = encodeURIComponent(
    "Hello Jivan Dhara Organisation, I would like to know more about membership and social activities."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Jivan Dhara Organisation on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
    >
      <MessageCircle className="w-7 h-7 fill-white/20" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold px-0 group-hover:px-2 group-hover:pl-2">
        Chat on WhatsApp
      </span>
    </a>
  );
}
