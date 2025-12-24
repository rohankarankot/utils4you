"use client";

import React from "react";
import { Share2, Twitter, Facebook, Linkedin, MessageCircle } from "lucide-react";

export default function SocialShare({ title, url }: { title: string; url: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <MessageCircle size={18} />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-green-500",
    },
    {
      name: "Twitter",
      icon: <Twitter size={18} />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-sky-400",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-blue-600",
    },
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-700",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-8 border-y border-slate-100 dark:border-slate-800 my-8">
      <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
        <Share2 size={20} className="text-blue-600" />
        <span>Tell your friends about OmniTools!</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-full text-sm font-medium transition-all ${link.color} hover:text-white group`}
          >
            <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
