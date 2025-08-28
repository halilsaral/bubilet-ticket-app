import { getTripById } from "@/src/services/apiClient";
import SeatSelector from "@/src/components/trips/SeatSelector";

export default async function TripDetailsPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
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
