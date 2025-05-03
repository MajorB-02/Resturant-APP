import Hero from '@/components/Hero';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <>
      <Hero />
      <Analytics />
    </>
  );
}
