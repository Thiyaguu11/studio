import { BrowserWindow } from '@/components/browser/browser-window';

export default function Home() {
  return (
    <main className="p-4 lg:p-8 h-screen w-screen flex flex-col items-center justify-center bg-background">
      <BrowserWindow />
    </main>
  );
}
