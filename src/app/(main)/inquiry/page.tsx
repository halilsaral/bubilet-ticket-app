import { getTrips } from "@/src/services/apiClient";
import TripCard from "@/src/components/trips/TripCard";
import Link from "next/link";
import { Trip } from "@/src/lib/types";

// Server Component'ler `searchParams` prop'unu alabilir.
// Bu, URL'deki "?from=...&to=..." gibi parametreleri içerir.
type InquiryPageProps = {
  searchParams: {
    from?: string;
    to?: string;
    date?: string;
  };
};

export default async function InquiryPage({ searchParams }: InquiryPageProps) {
  const { from, to, date } = searchParams;

  // URL'de parametre yoksa veya eksikse, kullanıcıyı bilgilendir.
  if (!from || !to || !date) {
    return (
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-2xl font-bold">Lütfen bir arama yapın.</h1>
        <Link
          href="/"
          className="text-indigo-600 hover:underline mt-4 inline-block"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  // API'den veriyi çekiyoruz.
  const trips: Trip[] = await getTrips(from, to, date);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Arama Sonuçları</h1>
          <p className="text-gray-600">
            <span className="font-semibold">{from}</span> →{" "}
            <span className="font-semibold">{to}</span> için{" "}
            <span className="font-semibold">{date}</span> tarihindeki seferler
          </p>
        </div>

        {trips.length > 0 ? (
          // Sefer bulunduysa listele
          <div className="space-y-4">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          // Sefer bulunamadıysa mesaj göster
          <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Uygun Sefer Bulunamadı
            </h2>
            <p className="text-gray-500 mt-2">
              Aradığınız kriterlere uygun bir sefer bulunamadı. Lütfen farklı
              bir tarih veya güzergah deneyin.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
            >
              Yeni Arama Yap
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
