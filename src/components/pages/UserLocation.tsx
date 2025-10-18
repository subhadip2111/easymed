import { useEffect, useState } from "react";
import { MapPin, Loader, Navigation } from "lucide-react";

export default function HeaderLocation() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(true);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();

          if (data && data.address) {
            console.log(data);
            console.log(data.address.display_name);
            // Show city and state for compact display
            const city = data.address.city || data.address.town || data.address.village || "";
            const state = data.address.state || "";
            setLocation(city && state ? `${city}, ${state}` : data.display_name);
            localStorage.setItem("locationName",location );
          }
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError(true);
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
        <Loader className="w-4 h-4 text-gray-500 animate-spin" />
        <span className="text-sm text-gray-600">Locating...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
        <MapPin className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">Location unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-100 hover:shadow-md transition-shadow duration-200">
      <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
      <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
        {location}
      </span>
    </div>
  );
}

// Example Header Component showing how to use it
function ExampleHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-gray-800">MediFind</span>
          </div>

          {/* Location Component */}
          <HeaderLocation />

          {/* Right side navigation */}
          <nav className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Search
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}