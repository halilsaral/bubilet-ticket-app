import TripSearchForm from "@/src/components/trips/TripSearchForm";

export default function HomePage() {
  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Hayalindeki Yolculuğa Biletini Al
      </h1>
      <p className="mt-4 text-lg leading-6 text-white/70">
        Türkiye&apos;nin dört bir yanına konforlu ve güvenli seyahat imkanı.
      </p>

      <div className="mt-10">
        <TripSearchForm />
      </div>
    </div>
  );
}
