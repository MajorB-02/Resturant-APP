'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  validUntil: string;
  code: string;
  discount: string;
}

const initialPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Early Bird Special',
    description: 'Get 20% off your bill when dining between 4 PM and 6 PM',
    image: '/promotions/early-bird.jpg',
    validUntil: '2024-03-31',
    code: 'EARLY20',
    discount: '20% OFF'
  },
  {
    id: '2',
    title: 'Weekend Brunch',
    description: 'Enjoy our special brunch menu with complimentary mimosa',
    image: '/promotions/brunch.jpg',
    validUntil: '2024-12-31',
    code: 'BRUNCH',
    discount: 'FREE DRINK'
  },
  {
    id: '3',
    title: 'Family Feast',
    description: 'Order any 4 main courses and get a free dessert platter',
    image: '/promotions/family.jpg',
    validUntil: '2024-06-30',
    code: 'FAMILY',
    discount: 'FREE DESSERT'
  }
];

export default function Promotions() {
  const [promotions] = useState<Promotion[]>(initialPromotions);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isValidPromotion = (validUntil: string) => {
    return new Date(validUntil) > new Date();
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full">
                  {promo.discount}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Valid until: {new Date(promo.validUntil).toLocaleDateString()}
                    </p>
                    {!isValidPromotion(promo.validUntil) && (
                      <p className="text-red-600 text-sm mt-1">Expired</p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(promo.code)}
                    disabled={!isValidPromotion(promo.validUntil)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      isValidPromotion(promo.validUntil)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {copiedCode === promo.code ? 'Copied!' : `Use ${promo.code}`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            * All promotions are subject to availability and cannot be combined with other offers.
          </p>
        </div>
      </div>
    </div>
  );
} 