"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { QuickAccess } from "./quick-access";
import { Button } from "../ui/button";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "Good Morning, Thiyagu";
  if (hour < 12) return "Good Morning, Thiyagu";
  if (hour < 18) return "Good Afternoon, Thiyagu";
  return "Good Evening, Thiyagu";
};

export function HomePage({ onNavigate }: { onNavigate: (url: string) => void }) {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    setGreeting(getGreeting());
    update();
    
    const timer = setInterval(update, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("search") as string;
    if (query) {
      onNavigate(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex flex-col h-full text-foreground p-8">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="text-9xl font-bold">{time}</div>
        <h1 className="text-5xl font-bold mt-4 mb-8 text-glow">{greeting}</h1>
        <QuickAccess onNavigate={onNavigate}/>
      </div>
      <div className="w-full max-w-2xl mx-auto flex-shrink-0 pb-4">
        <form onSubmit={handleSearchSubmit} className="w-full relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            name="search"
            type="search"
            autoFocus
            placeholder="Search Google"
            className="w-full h-16 pl-14 pr-6 text-lg rounded-full bg-card border-2 focus:border-primary focus:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-shadow"
          />
           <Button type="submit" className="sr-only">Search</Button>
        </form>
      </div>
    </div>
  );
}
