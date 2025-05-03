'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full">
      <Image
        src="/images/hero-bg.jpg"
        alt="Restaurant interior with delicious food"
        fill
        priority
        className="object-cover brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Fresh. Fast. Delivered.
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl px-4">
          Experience the finest cuisine crafted with passion and served with excellence
        </p>
        <Link
          href="/menu"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
        >
          See Menu
        </Link>
      </div>
    </section>
  );
} 