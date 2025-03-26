import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="w-full max-w-5xl px-4 mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Bienvenue chez Devine
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Découvrez nos coffrets de vin sélectionnés avec soin
          </p>
          <div className="mt-10">
            <a
              href="/offers"
              className="px-6 py-3 text-base font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Voir nos offres
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 