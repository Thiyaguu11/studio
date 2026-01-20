"use client";

import { GoogleIcon } from "@/components/icons/google-icon";
import { YouTubeIcon } from "@/components/icons/youtube-icon";
import { GmailIcon } from "@/components/icons/gmail-icon";
import { ChatGptIcon } from "@/components/icons/chatgpt-icon";
import { GitHubIcon } from "@/components/icons/github-icon";

const quickLinks = [
  { name: "Google", url: "https://www.google.com", icon: GoogleIcon },
  { name: "YouTube", url: "https://www.youtube.com", icon: YouTubeIcon },
  { name: "Gmail", url: "https://mail.google.com", icon: GmailIcon },
  { name: "ChatGPT", url: "https://chat.openai.com", icon: ChatGptIcon },
  { name: "GitHub", url: "https://github.com", icon: GitHubIcon },
];

type QuickAccessProps = {
  onNavigate: (url: string) => void;
};

export function QuickAccess({ onNavigate }: QuickAccessProps) {
  return (
    <div className="grid grid-cols-5 gap-6">
      {quickLinks.map((link) => (
        <button
          key={link.name}
          onClick={() => onNavigate(link.url)}
          className="group flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-200 hover:bg-white/5"
          aria-label={`Open ${link.name}`}
        >
          <div className="flex items-center justify-center w-16 h-16 bg-card rounded-2xl border border-border shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg group-hover:border-primary/50">
            <link.icon className="w-8 h-8 text-foreground/90" />
          </div>
          <span className="text-sm font-medium text-foreground/80">{link.name}</span>
        </button>
      ))}
    </div>
  );
}
