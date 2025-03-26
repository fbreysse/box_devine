import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getOffers() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: offers, error } = await supabase
    .from('offers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching offers:', error);
    return [];
  }

  return offers;
}

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos coffrets de vin</h1>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300"
            >
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 