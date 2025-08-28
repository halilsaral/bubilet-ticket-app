import { getTripById } from "@/src/services/apiClient";
import SeatSelector from "@/src/components/trips/SeatSelector";

// We define the props directly in the function signature.
export default async function TripDetailsPage({
  params,
}: {
  params: {
    id: string; // The [id] from the URL comes here.
  };
}) {
  // We fetch the data for the specific trip using the id from the URL.
  const trip = await getTripById(params.id);

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
