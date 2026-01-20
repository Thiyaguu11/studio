"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BrowserHeader } from "./browser-header";
import { BrowserContent } from "./browser-content";

export type Tab = {
  id: string;
  title: string;
  url: string;
  history: string[];
  historyIndex: number;
};

const HOME_URL = "leafy://homepage";

const createNewTab = (url: string = HOME_URL): Tab => {
  const id = crypto.randomUUID();
  let title = "New Tab";
  if (url !== HOME_URL) {
      try {
        title = new URL(url).hostname.replace('www.', '');
      } catch {
        title = "Loading...";
      }
  }

  return {
    id,
    title,
    url,
    history: [url],
    historyIndex: 0,
  };
};

export function BrowserWindow() {
  const [tabs, setTabs] = useState<Tab[]>([createNewTab()]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const handleAddTab = (url?: string) => {
    const newTab = createNewTab(url);
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleRemoveTab = (tabIdToRemove: string) => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabIdToRemove);
    const newTabs = tabs.filter((tab) => tab.id !== tabIdToRemove);
    if (newTabs.length === 0) {
      const newTab = createNewTab();
      setTabs([newTab]);
      setActiveTabId(newTab.id);
      return;
    }
    setTabs(newTabs);

    if (activeTabId === tabIdToRemove) {
      const newActiveIndex = Math.max(0, tabIndex - 1);
      setActiveTabId(newTabs[newActiveIndex].id);
    }
  };

  const updateTab = (tabId: string, updates: Partial<Tab>) => {
    setTabs(tabs.map(tab => tab.id === tabId ? { ...tab, ...updates } : tab));
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return string.includes('.');
    } catch (_) {
      return false;
    }
  };

  const handleNavigate = (input: string) => {
    if (!activeTab) return;
    
    let url: string;
    if (isValidUrl(input)) {
        url = input.startsWith('http') ? input : `https://${input}`;
    } else {
        url = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
    }

    const newHistory = activeTab.history.slice(0, activeTab.historyIndex + 1);
    newHistory.push(url);

    updateTab(activeTab.id, { 
      url, 
      title: new URL(url).hostname.replace('www.', '') || "Loading...", 
      history: newHistory,
      historyIndex: newHistory.length - 1
    });
  };
  
  const handleNavAction = (action: 'back' | 'forward' | 'refresh') => {
    if (!activeTab) return;

    switch(action) {
      case 'back':
        if (activeTab.historyIndex > 0) {
          const newIndex = activeTab.historyIndex - 1;
          updateTab(activeTab.id, { url: activeTab.history[newIndex], historyIndex: newIndex });
        }
        break;
      case 'forward':
        if (activeTab.historyIndex < activeTab.history.length - 1) {
          const newIndex = activeTab.historyIndex + 1;
          updateTab(activeTab.id, { url: activeTab.history[newIndex], historyIndex: newIndex });
        }
        break;
      case 'refresh':
        if (iframeRef.current) {
          // Setting the src to itself forces a reload
          iframeRef.current.src = activeTab.url;
        }
        break;
    }
  };

  return (
    <Card className="flex flex-col h-full w-full bg-card shadow-2xl overflow-hidden">
      <CardContent className="p-0 flex-grow relative bg-background">
        {tabs.map(tab => (
            <BrowserContent 
                key={tab.id}
                tab={tab}
                isActive={tab.id === activeTabId}
                onNavigate={(url) => handleAddTab(url)}
                iframeRef={iframeRef}
                onTitleChange={(newTitle) => updateTab(tab.id, { title: newTitle })}
            />
        ))}
      </CardContent>
      <BrowserHeader
        tabs={tabs}
        activeTabId={activeTabId}
        activeTab={activeTab}
        onSelectTab={setActiveTabId}
        onCloseTab={handleRemoveTab}
        onNewTab={() => handleAddTab()}
        onNavigate={handleNavigate}
        onNavAction={handleNavAction}
      />
    </Card>
  );
}
