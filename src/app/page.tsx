import { BrowserWindow } from '@/components/browser/browser-window';
import { AnalyticsWidget } from '@/components/widgets/analytics-widget';
import { SpotifyWidget } from '@/components/widgets/spotify-widget';

export default function Home() {
  return (
    <main className="p-4 lg:p-8 h-screen w-screen flex flex-row items-start gap-4 bg-background">
      <div className="w-[15%] h-full flex-shrink-0">
        <AnalyticsWidget />
      </div>
      <div className="flex-grow h-full">
        <BrowserWindow />
      </div>
      <div className="w-[15%] h-full flex-shrink-0">
        <SpotifyWidget />
      </div>
    </main>
  );
}
