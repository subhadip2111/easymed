import { useEffect, useState } from "react";
import { MapPin, Loader2, AlertCircle } from "lucide-react";

export default function UserLocation() {
  const [locationName, setLocationName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await response.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              data.address.country;
              localStorage.setItem("locationName",city);

            setLocationName(city);
            setLoading(false);
          } catch (err) {
            setError("Failed to fetch location");
            setLoading(false);
          }
        },
        (err) => {
          setError("Location unavailable");
          setLoading(false);
        }
      );
    } else {
      setError("Not supported");
      setLoading(false);
    }
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full shadow-sm">
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
          <span className="text-sm text-gray-600">Locating...</span>
        </>
      ) : error ? (
        <>
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-600">{error}</span>
        </>
      ) : (
        <>
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">{locationName}</span>
        </>
      )}
    </div>
  );
}