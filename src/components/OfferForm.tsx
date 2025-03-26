'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

type Offer = {
  id: string;
  name: string;
  description: string;
  price: number;
  min_orders: number;
  end_date?: string;
  image_url?: string;
};

type OfferFormProps = {
  initialData?: Offer;
};

export default function OfferForm({ initialData }: OfferFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price?.toString() || '',
    min_orders: initialData?.min_orders?.toString() || '',
    end_date: initialData?.end_date || '',
    image_url: initialData?.image_url || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const offerData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        min_orders: parseInt(formData.min_orders),
        end_date: formData.end_date || null,
        image_url: formData.image_url || null,
      };

      let error;

      if (initialData) {
        // Update existing offer
        const { error: updateError } = await supabase
          .from('offers')
          .update(offerData)
          .eq('id', initialData.id);
        error = updateError;
      } else {
        // Create new offer
        const { error: insertError } = await supabase
          .from('offers')
          .insert([offerData]);
        error = insertError;
      }

      if (error) throw error;

      router.push('/offers');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom de l'offre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Prix (€)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          required
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="min_orders" className="block text-sm font-medium text-gray-700">
          Nombre minimum de commandes
        </label>
        <input
          type="number"
          id="min_orders"
          name="min_orders"
          required
          min="1"
          value={formData.min_orders}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
          Date de fin (optionnel)
        </label>
        <input
          type="datetime-local"
          id="end_date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
          URL de l'image (optionnel)
        </label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? (initialData ? 'Modification...' : 'Création...') : (initialData ? 'Modifier l\'offre' : 'Créer l\'offre')}
        </button>
      </div>
    </form>
  );
} 