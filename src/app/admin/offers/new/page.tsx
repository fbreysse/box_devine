import OfferForm from '../../../../components/OfferForm';

export default function NewOfferPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Nouvelle offre
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Créez une nouvelle offre de coffret de vin
            </p>
          </div>
        </div>

        <div className="mt-8">
          <OfferForm />
        </div>
      </div>
    </div>
  );
} 