"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

export function SpotifyWidget() {
  return (
    <Card className="flex flex-col h-full bg-card/50 w-full">
      <CardHeader className="items-center">
        <CardTitle className="flex items-center gap-2">
          <Music />
          Spotify
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center text-center text-muted-foreground p-4">
        <div className="space-y-4">
            <div className="w-40 h-40 bg-muted rounded-md mx-auto flex items-center justify-center">
                <Music className="w-20 h-20 text-foreground/20"/>
            </div>
            <div>
                <p className="font-bold text-foreground">Song Title</p>
                <p className="text-sm">Artist Name</p>
            </div>
             <p className="text-xs px-4">This is a visual placeholder for a Spotify widget.</p>
        </div>
      </CardContent>
    </Card>
  );
}
