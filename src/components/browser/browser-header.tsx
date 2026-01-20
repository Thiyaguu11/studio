"use client";

import type { FormEvent } from "react";
import type { Tab } from "./browser-window";
import { ArrowLeft, ArrowRight, RefreshCw, Lock, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type BrowserHeaderProps = {
  tabs: Tab[];
  activeTabId: string;
  activeTab: Tab | undefined;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onNewTab: () => void;
  onNavigate: (url: string) => void;
  onNavAction: (action: "back" | "forward" | "refresh") => void;
};

export function BrowserHeader({
  tabs,
  activeTabId,
  activeTab,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onNavigate,
  onNavAction,
}: BrowserHeaderProps) {
  const handleURLSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = new FormData(event.currentTarget).get("url") as string;
    if (url) {
      onNavigate(url);
    }
  };

  return (
    <header className="flex-shrink-0 rounded-t-lg overflow-hidden">
      {/* Tab Bar */}
      <div className="flex items-center bg-card-foreground/5 pl-2 pt-2">
        <div className="flex items-end -mb-px">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 max-w-[200px] h-10 px-3 border-b-2 cursor-pointer transition-colors relative group",
                  activeTabId === tab.id
                    ? "bg-background border-primary"
                    : "border-transparent hover:bg-background/50"
                )}
                style={{ borderTopLeftRadius: 'var(--radius)', borderTopRightRadius: 'var(--radius)'}}
              >
                <span className="truncate text-sm">{tab.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onCloseTab(tab.id); }}
                  className="ml-auto p-1 rounded-full hover:bg-muted-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  aria-label={`Close tab ${tab.title}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
        </div>
        <Button onClick={onNewTab} variant="ghost" size="icon" className="h-8 w-8 ml-1 self-end mb-1 flex-shrink-0" aria-label="New tab">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* URL Bar & Nav Controls */}
      <div className="flex items-center gap-2 p-2 bg-background">
        <Button onClick={() => onNavAction('back')} variant="ghost" size="icon" disabled={!activeTab || activeTab.historyIndex <= 0} aria-label="Back">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button onClick={() => onNavAction('forward')} variant="ghost" size="icon" disabled={!activeTab || activeTab.historyIndex >= activeTab.history.length - 1} aria-label="Forward">
          <ArrowRight className="w-5 h-5" />
        </Button>
        <Button onClick={() => onNavAction('refresh')} variant="ghost" size="icon" aria-label="Refresh">
          <RefreshCw className="w-5 h-5" />
        </Button>
        <form onSubmit={handleURLSubmit} className="flex-grow relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            key={activeTab?.id} 
            name="url"
            defaultValue={activeTab?.url === 'leafy://homepage' ? '' : activeTab?.url}
            placeholder="Search Google or type a URL"
            className="w-full h-10 pl-9 pr-4 font-code text-sm bg-card"
          />
        </form>
      </div>
    </header>
  );
}
