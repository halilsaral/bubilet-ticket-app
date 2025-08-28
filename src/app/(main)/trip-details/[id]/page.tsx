import { getTripById } from "@/src/services/apiClient";
import SeatSelector from "@/src/components/trips/SeatSelector";

// Next.js 15'te params Promise tipinde olmalı
export default async function TripDetailsPage({
  params,
}: {
  params: Promise<{
    id: string; // The [id] from the URL comes here.
  }>;
}) {
  // params'ı await ile çözümle
  const resolvedParams = await params;

  // We fetch the data for the specific trip using the id from the URL.
  const trip = await getTripById(resolvedParams.id);

  if (!trip) {
    return <div>Sefer bulunamadı.</div>;
  }

  // We pass the fetched trip data to the SeatSelector component.
  return (
    <div className="container mx-auto py-8">
      <SeatSelector initialTrip={trip} />
    </div>
  );
}
