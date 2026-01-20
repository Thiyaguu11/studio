"use client";

import type { RefObject } from "react";
import type { Tab } from "./browser-window";
import { HomePage } from "./homepage";
import { cn } from "@/lib/utils";

type BrowserContentProps = {
  tab: Tab;
  isActive: boolean;
  onNavigate: (url: string) => void;
  iframeRef: RefObject<HTMLIFrameElement>;
  onTitleChange: (newTitle: string) => void;
};

export function BrowserContent({ tab, isActive, onNavigate, iframeRef, onTitleChange }: BrowserContentProps) {
  const handleLoad = () => {
    try {
        if(iframeRef.current && iframeRef.current.contentWindow) {
            const newTitle = iframeRef.current.contentWindow.document.title;
            if (newTitle && newTitle !== tab.title) {
                onTitleChange(newTitle);
            }
        }
    } catch (e) {
        // Cross-origin error, ignore
        console.warn("Could not access iframe title due to cross-origin policy.");
    }
  };
    
  if (tab.url === "leafy://homepage") {
    return (
      <div className={cn("h-full w-full bg-background", isActive ? "block" : "hidden")}>
        <HomePage onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <iframe
      ref={isActive ? iframeRef : null}
      src={tab.url}
      title={tab.title}
      onLoad={handleLoad}
      className={cn("w-full h-full border-0 bg-white", isActive ? "block" : "hidden")}
    />
  );
}
