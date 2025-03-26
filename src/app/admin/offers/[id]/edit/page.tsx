import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import OfferForm from '../../../../../components/OfferForm';

export default async function EditOfferPage({
  params,
}: {
  params: { id: string };
}) {
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

  const { data: offer, error } = await supabase
    .from('offers')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !offer) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Modifier l'offre
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Modifiez les détails de l'offre
            </p>
          </div>
        </div>

        <div className="mt-8">
          <OfferForm initialData={offer} />
        </div>
      </div>
    </div>
  );
} 