import { getTripById } from "@/src/services/apiClient";
import SeatSelector from "@/src/components/trips/SeatSelector";

type TripDetailsPageProps = {
  params: {
    id: string; // URL'deki [id] parametresi buraya gelir.
  };
};

export default async function TripDetailsPage({ params }: TripDetailsPageProps) {
  // URL'den gelen ID ile ilgili seferin verilerini çekiyoruz.
  const trip = await getTripById(params.id);

  if (!trip) {
    return <div>Sefer bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <SeatSelector initialTrip={trip} />
    </div>
  );
}