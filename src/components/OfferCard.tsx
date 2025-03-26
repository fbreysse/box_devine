'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

type Offer = {
  id: string;
  name: string;
  description: string;
  price: number;
  min_orders: number;
  end_date?: string;
  image_url?: string;
};

type OfferCardProps = {
  offer: Offer;
  isAdmin: boolean;
};

export default function OfferCard({ offer, isAdmin }: OfferCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleEdit = () => {
    router.push(`/admin/offers/${offer.id}/edit`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', offer.id);

      if (error) throw error;

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
      {offer.image_url && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={offer.image_url}
            alt={offer.name}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {offer.name}
        </h2>
        <p className="text-gray-600 mb-4">{offer.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold text-gray-900">{offer.price}€</p>
            <p className="text-sm text-gray-500">
              Min. {offer.min_orders} commandes
            </p>
          </div>
          {offer.end_date && (
            <p className="text-sm text-gray-500">
              Jusqu'au {new Date(offer.end_date).toLocaleDateString()}
            </p>
          )}
        </div>

        {isAdmin && (
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleEdit}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Modifier
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isDeleting ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-2 text-red-600 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
} 