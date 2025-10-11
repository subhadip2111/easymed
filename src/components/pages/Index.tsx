import { useState } from "react";
import { Search, Upload, Pill, ExternalLink, ShoppingCart, AlertCircle } from "lucide-react";
import { searchMedicines } from "../../apis/medicineApis";
import Loader from "../Loader";
import { AdSection } from "../AdSection";
import { ReviewsSection } from "../ReviewsSection";
import { Footer } from "../Footer";
interface BuyLink {
  site: string;
  title: string;
  url: string;
  snippet: string;
  price: string;
}

interface Medicine {
  name: string;
  description: string;
  composition: string[];
  sideEffects: string[];
  buyLinks: BuyLink[];
  alternatives: string[];
}

interface ApiResponse {
  query: string;
  primaryMedicine: Medicine;
  similarMedicines: Medicine[];
  disclaimer: string;
  retrievedAt: string;
}

export default function MedicineSearchApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const data = await searchMedicines(searchQuery)
      setApiData(data);
    } catch (err) {
      setError("Failed to fetch medicine data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };
if(isLoading){
  return (
    <>
    <Loader/>
    </>
  )
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Pill className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">EasyMed</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Medicines at the Best Price
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Compare prices across pharmacies and find similar alternatives
          </p>

          <div className="flex gap-2 max-w-2xl mx-auto mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for medicines (e.g., paracetamol, aspirin)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          <button className="flex items-center gap-2 mx-auto text-blue-600 hover:text-blue-700" onClick={() => alert('Upload feature coming soon!')}>
            <Upload className="h-4 w-4"  />
            Upload Prescription
          </button>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        </div>
      )}

      {/* Results Section */}
      {apiData && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-yellow-800">{apiData.disclaimer}</p>
          </div>

          {/* Primary Medicine */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Results for "{apiData.query}"
            </h3>
            <MedicineCard medicine={apiData.primaryMedicine} isPrimary />
          </div>

          {/* Similar Medicines */}
          {apiData.similarMedicines.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Similar Medicines</h3>
              <p className="text-gray-600 mb-6">
                These medicines have similar compositions and can be used as alternatives
              </p>
              <div className="grid lg:grid-cols-2 gap-6">
                {apiData.similarMedicines.map((medicine, index) => (
                  <MedicineCard key={index} medicine={medicine} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
       <AdSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />  
    </div>
  );
}

function MedicineCard({ medicine, isPrimary = false }: { medicine: Medicine; isPrimary?: boolean }) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border ${isPrimary ? 'border-blue-300' : 'border-gray-200'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-xl font-bold text-gray-900">{medicine.name}</h4>
            {medicine.description && (
              <p className="text-sm text-gray-600 mt-1">{medicine.description}</p>
            )}
          </div>
          {isPrimary && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              Primary Result
            </span>
          )}
        </div>

        {/* Alternatives */}
        {medicine.alternatives.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Alternative Names:</p>
            <div className="flex flex-wrap gap-2">
              {medicine.alternatives.slice(0, 6).map((alt, idx) => (
                <span key={idx} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700">
                  {alt}
                </span>
              ))}
              {medicine.alternatives.length > 6 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{medicine.alternatives.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Buy Links */}
        {medicine.buyLinks.length > 0 ? (
          <div>
            <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Where to Buy ({medicine.buyLinks.length} options)
            </h5>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {medicine.buyLinks.map((link, idx) => (
                <BuyLinkItem key={idx} link={link} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No buying options available</p>
        )}
      </div>
    </div>
  );
}

function BuyLinkItem({ link }: { link: BuyLink }) {
  const isAvailable = link.price !== "Not Available" && link.price !== "Not specified";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-blue-600 text-sm">{link.site}</span>
            <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-blue-600" />
          </div>
          <p className="text-sm text-gray-700 truncate">{link.title}</p>
          {link.snippet && link.snippet !== "No current offer" && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
              {link.snippet}
            </span>
          )}
        </div>
        <div className="text-right">
          {isAvailable ? (
            <span className="font-bold text-lg text-gray-900">{link.price}</span>
          ) : (
            <span className="text-sm text-gray-500">{link.price}</span>
          )}
        </div>
      </div>
    </a>
    
  );
}