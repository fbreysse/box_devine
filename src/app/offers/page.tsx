import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OfferCard from '../../components/OfferCard';

export default async function OffersPage() {
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

  const { data: { session } } = await supabase.auth.getSession();
  const { data: profile } = session ? await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single() : { data: null };

  const isAdmin = profile?.role === 'admin';

  const { data: offers } = await supabase
    .from('offers')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Nos coffrets de vin
            </h2>
          </div>
          {isAdmin && (
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <a
                href="/admin/offers/new"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Nouvelle offre
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers?.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 