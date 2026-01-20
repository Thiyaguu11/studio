"use client";

const quickLinks = [
  { name: "Google", url: "https://www.google.com" },
  { name: "YouTube", url: "https://www.youtube.com" },
  { name: "Gmail", url: "https://mail.google.com" },
  { name: "ChatGPT", url: "https://chat.openai.com" },
  { name: "GitHub", url: "https://github.com" },
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
          className="group flex items-center justify-center px-6 py-3 bg-card rounded-lg border border-border shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary hover:shadow-primary/20"
          aria-label={`Open ${link.name}`}
        >
          <span className="text-base font-medium text-foreground/90 transition-colors group-hover:text-foreground group-hover:text-glow">{link.name}</span>
        </button>
      ))}
    </div>
  );
}
