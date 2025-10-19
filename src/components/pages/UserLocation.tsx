import { useEffect, useState } from "react";
import { MapPin, Loader } from "lucide-react";

export default function HeaderLocation() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check for cached location first - show immediately if available
    const cachedLocation = localStorage.getItem("locationName");
    const cachedTimestamp = localStorage.getItem("locationTimestamp");
    const cacheAge = cachedTimestamp ? Date.now() - parseInt(cachedTimestamp) : Infinity;
    
    // Use cached location if less than 1 hour old
    if (cachedLocation && cacheAge < 3600000) {
      setLocation(cachedLocation);
      setLoading(false);
      return; // Don't fetch new location if we have recent cache
    }

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError(true);
      setLoading(false);
      return;
    }

    // Set a manual timeout as backup (20 seconds)
    const timeoutId = setTimeout(() => {
      setError(true);
      setLoading(false);
      console.log("Manual timeout: Location request took too long");
    }, 20000);

    // Options compatible with all browsers - use cached position if available
    const options = {
      enableHighAccuracy: false, // Better for battery and faster
      timeout: 15000, // 15 seconds timeout (increased for slow connections)
      maximumAge: 600000 // Accept cached position up to 10 minutes old
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeoutId); // Clear manual timeout
        const { latitude, longitude } = position.coords;

        try {
          // Add User-Agent header for better OpenStreetMap compatibility
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
            {
              headers: {
                'Accept': 'application/json',
              }
            }
          );

          // Check if response is ok
          if (!response.ok) {
            throw new Error('Failed to fetch location');
          }

          const data = await response.json();

          if (data && data.address) {
            // Show city and state for compact display
            const city = data.address.city || 
                        data.address.town || 
                        data.address.village || 
                        data.address.municipality || 
                        data.address.county || "";
            const state = data.address.state || 
                         data.address.province || 
                         data.address.region || "";
            
            const locationText = city && state 
              ? `${city}, ${state}` 
              : city || data.address.country || "Location detected";
            
            setLocation(locationText);
            
            // Store in localStorage
            try {
              localStorage.setItem("locationName", locationText);
              localStorage.setItem("locationCoords", JSON.stringify({ latitude, longitude }));
              localStorage.setItem("locationTimestamp", Date.now().toString());
            } catch (storageError) {
              // Handle storage quota exceeded or other storage errors
              console.warn("Could not save location to localStorage:", storageError);
            }
          }
        } catch (err) {
          console.error("Error fetching location:", err);
          
          // If API fails but we have coords, still save them
          if (latitude && longitude) {
            const fallbackLocation = "Your Location";
            setLocation(fallbackLocation);
            try {
              localStorage.setItem("locationName", fallbackLocation);
              localStorage.setItem("locationCoords", JSON.stringify({ latitude, longitude }));
              localStorage.setItem("locationTimestamp", Date.now().toString());
            } catch (e) {
              console.warn("Storage error:", e);
            }
          } else {
            setError(true);
          }
        } finally {
          setLoading(false);
          clearTimeout(timeoutId);
        }
      },
      (err) => {
        clearTimeout(timeoutId); // Clear manual timeout
        console.error("Geolocation error:", err);
        // Check error code for better handling
        switch (err.code) {
          case err.PERMISSION_DENIED:
            console.log("User denied location permission");
            break;
          case err.POSITION_UNAVAILABLE:
            console.log("Location information unavailable");
            break;
          case err.TIMEOUT:
            console.log("Location request timed out");
            break;
          default:
            console.log("Unknown location error");
        }
        setError(true);
        setLoading(false);
      },
      options
    );

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-gray-800">MediFind</span>
          </div>

          <HeaderLocation />

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