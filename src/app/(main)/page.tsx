import TripSearchForm from "@/src/components/trips/TripSearchForm";

export default function HomePage() {
  return (
    <div className="container mx-auto mt-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Hayalindeki Yolculuğa Biletini Al
        </h1>
        <p className="mt-4 text-lg leading-6 text-gray-600">
          Türkiye'nin dört bir yanına konforlu ve güvenli seyahat imkanı.
        </p>
      </div>

      <TripSearchForm />
    </div>
  );
}
