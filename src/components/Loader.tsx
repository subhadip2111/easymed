import  { useState, useEffect } from 'react';
import { Search, Pill, Globe, ShoppingCart } from 'lucide-react';

export default function Loader() {
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [searchProgress, setSearchProgress] = useState(0);
  
  const platforms = [
    { name: 'Flipkart', color: 'text-blue-500', bg: 'bg-blue-100' },
    { name: '1mg', color: 'text-orange-500', bg: 'bg-orange-100' },
    { name: 'PharmEasy', color: 'text-teal-500', bg: 'bg-teal-100' },
    { name: 'Apollo 24|7', color: 'text-green-500', bg: 'bg-green-100' },
    { name: 'Blinkit', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { name: 'Netmeds', color: 'text-purple-500', bg: 'bg-purple-100' }
  ];

  useEffect(() => {
    const platformInterval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
    }, 1500);

    return () => clearInterval(platformInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setSearchProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center space-y-8 p-8">
        {/* AI Brain Animation */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Search className="w-12 h-12 text-blue-600 animate-bounce" />
          </div>
          {/* Orbiting Pills */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <Pill className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 text-red-500" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
            <Pill className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 text-green-500" />
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Globe className="w-6 h-6 animate-spin" style={{ animationDuration: '2s' }} />
            AI Searching for Medicines
          </h2>
          <p className="text-gray-600">Scanning top e-commerce platforms...</p>
        </div>

        {/* Platform Indicators */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className={`p-4 rounded-lg transition-all duration-300 ${
                index === currentPlatform
                  ? `${platform.bg} scale-110 shadow-lg ring-2 ring-offset-2 ${platform.color.replace('text-', 'ring-')}`
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <ShoppingCart className={`w-6 h-6 mx-auto mb-2 ${index === currentPlatform ? platform.color : 'text-gray-400'}`} />
              <p className={`text-xs font-semibold ${index === currentPlatform ? platform.color : 'text-gray-500'}`}>
                {platform.name}
              </p>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 relative"
              style={{ width: `${searchProgress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Searching on <span className={`font-semibold ${platforms[currentPlatform].color}`}>
              {platforms[currentPlatform].name}
            </span>
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}