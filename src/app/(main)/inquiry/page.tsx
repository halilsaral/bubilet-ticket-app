import { getTrips } from "@/src/services/apiClient";
import TripCard from "@/src/components/trips/TripCard";
import Link from "next/link";
import { Trip } from "@/src/lib/types";

type InquiryPageProps = {
  searchParams: {
    from?: string;
    to?: string;
    date?: string;
  };
};

export default async function InquiryPage({ searchParams }: InquiryPageProps) {
  const { from, to, date } = searchParams;

  if (!from || !to || !date) {
    return (
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-2xl font-bold text-white">
          Lütfen bir arama yapın.
        </h1>
        <Link
          href="/"
          className="text-rose-500 hover:text-rose-400 mt-4 inline-block"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  let trips: Trip[] = []; // Varsayılan olarak boş bir dizi tanımla
  try {
    const result = await getTrips(from, to, date);
    // Gelen sonucun bir dizi olduğundan emin ol, değilse boş dizi ata
    if (Array.isArray(result)) {
      trips = result;
    }
  } catch (error) {
    console.error("Seferler çekilirken hata oluştu:", error);
    // Hata durumunda da trips boş bir dizi olarak kalacak
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 px-4 md:px-0">
        <h1 className="text-3xl font-bold text-white">Arama Sonuçları</h1>
        <p className="text-white/70">
          <span className="font-semibold">{from}</span> →{" "}
          <span className="font-semibold">{to}</span> için{" "}
          <span className="font-semibold">{date}</span> tarihindeki seferler
        </p>
      </div>

      {trips.length > 0 ? (
        <div className="space-y-4">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-6 rounded-lg border border-white/10 bg-gray-900/80 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white">
            Uygun Sefer Bulunamadı
          </h2>
          <p className="text-white/60 mt-2">
            Aradığınız kriterlere uygun bir sefer bulunamadı. Lütfen farklı bir
            tarih veya güzergah deneyin.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block bg-rose-600 text-white font-bold py-2 px-4 rounded-md hover:bg-rose-500 transition-colors"
          >
            Yeni Arama Yap
          </Link>
        </div>
      )}
    </div>
  );
}
