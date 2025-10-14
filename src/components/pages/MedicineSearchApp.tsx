import { useRef, useState } from "react";
import { Search, Upload, Pill, AlertCircle, X, Check } from "lucide-react";
import { bulkSearchMedicinesThroughtInternet, searchMedicines, uploadPrescriptionAndgetAnalisisData } from "../../apis/medicineApis";
import Loader from "../Loader";
import { MedicineCard } from "./MedicineCard";
import { BulkMedicineCard } from "./BulkMedicineCard";
import { AdSection } from "../AdSection";
import { ReviewsSection } from "../ReviewsSection";
import { Footer } from "../Footer";


interface BuyLink {
  site: string;
  title: string;
  url: string;
  snippet: string | null;
  price: string | null;
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

interface BulkMedicine {
  buyLinks: BuyLink[];
  alternativeNames: string[];
}

export default function MedicineSearchApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [extractedMedicines, setExtractedMedicines] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bulkResults, setBulkResults] = useState<BulkMedicine[]>([]);
  const [isUploadMode, setIsUploadMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file (JPG, PNG, etc.)");
      return;
    }

    setUploadedImage(file);
    setIsLoading(true);
    setError("");
    setApiData(null);
    setBulkResults([]);

    try {
      const response = await uploadPrescription(file);

      if (response.statusCode === 200 && response.analisedMed) {
        setExtractedMedicines(response.analisedMed);
        setShowConfirmation(true);
        setIsUploadMode(true);
      } else {
        setError("Failed to extract medicines from the prescription image.");
      }
    } catch (err) {
      setError("Failed to process prescription image. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmExtraction = async () => {
    if (extractedMedicines.length === 0) return;

    setIsLoading(true);
    setShowConfirmation(false);
    setError("");

    try {
      const results = await bulkSearchMedicines(extractedMedicines);
      setBulkResults(results);
    } catch (err) {
      setError("Failed to fetch medicine details. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelExtraction = () => {
    setShowConfirmation(false);
    setExtractedMedicines([]);
    setUploadedImage(null);
    setIsUploadMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const data = await searchMedicines(searchQuery);
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

  const uploadPrescription = async (file: File): Promise<{ statusCode: number; message: string; analisedMed: string[] }> => {
    const data = await uploadPrescriptionAndgetAnalisisData(file);
    return {
      statusCode: 200,
      message: "Successfully extracted and parsed medicines from prescription.",
      analisedMed: data.analisedMed
    };
  };

  const bulkSearchMedicines = async (medicines: string[]): Promise<BulkMedicine[]> => {
    const data = await bulkSearchMedicinesThroughtInternet(medicines);
    return data;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="relative">
            <Pill className="h-8 w-8 text-primary animate-float" />
            <div className="absolute inset-0 blur-xl bg-primary/20 animate-glow rounded-full" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            EasyMed
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 animate-fade-in-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Your Medicines at the{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Best Price
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Compare prices across pharmacies and discover affordable alternatives instantly
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6 animate-scale-in">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search for medicines (e.g., paracetamol, aspirin)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-4 border-2 border-border bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm hover:shadow-md"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all hover:scale-105 active:scale-95"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          <button 
            className="flex items-center gap-2 mx-auto text-primary hover:text-secondary font-medium transition-all hover:gap-3 group"
            onClick={handleUploadClick}
          >
            <Upload className="h-5 w-5 group-hover:animate-float" />
            Upload Prescription
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 mb-8 animate-slide-up">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700 shadow-md">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Results Section */}
      {apiData && (
        <div className="max-w-7xl mx-auto px-4 pb-16 animate-fade-in-up">
          {/* Disclaimer */}
          <div className="bg-gradient-to-r from-warning/10 to-warning/5 border-2 border-warning/30 rounded-xl p-5 mb-10 shadow-md">
            <p className="text-sm text-warning-foreground font-medium">{apiData.disclaimer}</p>
          </div>

          {/* Primary Medicine */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-8">
              Results for "<span className="text-primary">{apiData.query}</span>"
            </h3>
            <MedicineCard medicine={apiData.primaryMedicine} isPrimary />
          </div>

          {/* Similar Medicines */}
          {apiData.similarMedicines.length > 0 && (
            <div>
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-2">Similar Medicines</h3>
                <p className="text-muted-foreground text-lg">
                  These medicines have similar compositions and can be used as alternatives
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                {apiData.similarMedicines.map((medicine, index) => (
                  <MedicineCard key={index} medicine={medicine} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-scale-in">
            <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">Extracted Medicines from Prescription</h3>
                <button 
                  onClick={handleCancelExtraction} 
                  className="text-muted-foreground hover:text-foreground transition-colors hover:rotate-90 duration-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                We found <span className="font-bold text-primary">{extractedMedicines.length}</span> medicine(s) in your prescription. Please confirm to search for details.
              </p>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {extractedMedicines.map((med, idx) => (
                  <div 
                    key={idx} 
                    className="px-4 py-3 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl text-sm font-semibold text-foreground hover:shadow-md transition-all hover:scale-105"
                  >
                    {med}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t bg-muted/30 flex gap-3 justify-end">
              <button
                onClick={handleCancelExtraction}
                className="px-6 py-3 border-2 border-border rounded-xl hover:bg-muted font-semibold transition-all hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExtraction}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/30 font-semibold transition-all hover:scale-105 flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Confirm & Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Results */}
      {bulkResults.length > 0 && isUploadMode && (
        <div className="max-w-7xl mx-auto px-4 pb-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-success/10 to-success/5 border-2 border-success/30 rounded-xl p-5 mb-10 shadow-md">
            <p className="text-sm text-success-foreground font-semibold flex items-center gap-2">
              <Check className="h-5 w-5" />
              Successfully retrieved details for {bulkResults.length} medicine(s) from your prescription
            </p>
          </div>

          <h3 className="text-3xl font-bold text-foreground mb-8">
            Medicines from Your Prescription
          </h3>

          <div className="grid lg:grid-cols-2 gap-6">
            {bulkResults.map((medicine, index) => (
              <BulkMedicineCard
                key={index}
                medicine={medicine}
                medicineName={extractedMedicines[index]}
              />
            ))}
          </div>
        </div>
      )}

      <AdSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
}
