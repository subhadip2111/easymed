import { useEffect, useRef, useState } from "react";
import { Search, Upload, Pill, AlertCircle, X, Check } from "lucide-react";
import { bulkSearchMedicinesThroughtInternet, searchMedicines, uploadPrescriptionAndgetAnalisisData } from "../../apis/medicineApis";
// import Loader from "../Loader";
import { MedicineCard } from "./MedicineCard";
import { BulkMedicineCard } from "./BulkMedicineCard";
import { AdSection } from "../AdSection";
import { ReviewsSection } from "../ReviewsSection";
import { Footer } from "../Footer";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import UserLocation from "./UserLocation";
// import SnakeGame from "./DragonRunGame";
import { MedicineSearchSkeleton } from "../SceletonLoader";
import { RatingReviewPopup } from "./RatingReview";
import MedLinkrCarousel from "../SwipperBanner";
import BlogSection from "../BlogSection";

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
  comparisonSummary:string | null;
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [extractedMedicines, setExtractedMedicines] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bulkResults, setBulkResults] = useState<BulkMedicine[]>([]);
  const [isUploadMode, setIsUploadMode] = useState(false);
  const [displayedSummary, setDisplayedSummary] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
 const [showGameModal, setShowGameModal] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState(0);
const [showRatingPopup, setShowRatingPopup] = useState(false);


   useEffect(() => {
    if (isLoading) {
      setLoadingTimer(0);
      setShowGameModal(false);
      
      const timer = setTimeout(() => {
        setShowGameModal(true);
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    } else {
      setShowGameModal(false);
      setLoadingTimer(0);
    }
  }, [isLoading]);

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
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userInfo= localStorage.getItem('user');
    console.log("userInfo",userInfo)
    setAccessToken(token);
  }, []);

  // Typing animation effect for AI summary
  useEffect(() => {
    if (apiData?.comparisonSummary) {
      setIsTyping(true);
      setDisplayedSummary("");
      const fullText = apiData.comparisonSummary;
      let index = 0;

      const typingInterval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedSummary(fullText.substring(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 20); // Adjust speed here (lower = faster)

      return () => clearInterval(typingInterval);
    }
  }, [apiData?.comparisonSummary]);


  const checkAuth = () => {
    if (!accessToken) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };
  
  const handleSearch = async () => {
    if (!checkAuth()) return;

    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const locationName = localStorage.getItem("locationName");
      const data = await searchMedicines(searchQuery,locationName || "");
      data.query = searchQuery;
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
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setApiData(null);
    setBulkResults([]);
    setSearchQuery("");
  };
  


   if (isLoading ) {
    return <MedicineSearchSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Pill className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MedLinkr
            </h1>
            <UserLocation/>

          </div>

          {accessToken && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </header>
       {isLoading && showGameModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-scale-in">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Pill className="h-8 w-8 text-blue-600 animate-bounce" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Searching for Best Prices...
                </h2>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-blue-800 font-medium">
                   This is taking a bit longer than usual
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  We're searching the internet for the best medicine prices and alternatives
                </p>
              </div>
              <p className="text-lg text-gray-700 mb-2">
                Meanwhile, refresh your mind with a quick game! 🎮
              </p>
            </div>

            <MedicineSearchSkeleton/>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <p>Fetching results in background...</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!accessToken ? (
        // Login Required Screen
        <section className="py-16 px-4 min-h-[80vh] flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative mb-8 inline-block">
              <Pill className="h-24 w-24 text-primary mx-auto" />
              <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full animate-pulse" />
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MedLinkr
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Your trusted platform to find medicines at the best prices, compare options, and upload prescriptions effortlessly
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-border mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Sign in to get started</h3>

              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-border rounded-xl hover:bg-muted/50 transition-all hover:shadow-lg hover:scale-105 active:scale-95 group mb-6"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-foreground font-semibold text-lg group-hover:text-primary transition-colors">
                  Continue with Google
                </span>
              </button>

              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/60 backdrop-blur rounded-xl p-6 border border-border">
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-2">Search Medicines</h4>
                <p className="text-sm text-muted-foreground">Find any medicine and compare prices across multiple pharmacies</p>
              </div>

              <div className="bg-white/60 backdrop-blur rounded-xl p-6 border border-border">
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-2">Upload Prescription</h4>
                <p className="text-sm text-muted-foreground">Upload your prescription and get instant medicine recommendations</p>
              </div>

              <div className="bg-white/60 backdrop-blur rounded-xl p-6 border border-border">
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-2">Find Alternatives</h4>
                <p className="text-sm text-muted-foreground">Discover affordable alternatives with similar composition</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Hero Section - Only shown when logged in */}
          <section className="py-16 px-4">
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

              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
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
                <Upload className="h-5 w-5" />
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
        </>
      )}

      {/* Error Message - Only shown when logged in */}
      {accessToken && error && (
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700 shadow-md">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Results Section - Only shown when logged in */}
      {accessToken && apiData && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 mb-10 shadow-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 font-medium leading-relaxed">{apiData.disclaimer}</p>
            </div>
          </div>

          {/* AI Summary Box with Typing Animation */}
          {apiData.comparisonSummary && (
            <div className="mb-12 relative overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 animate-gradient-shift opacity-60" />
              
              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-blue-300/50 rounded-3xl p-8 shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-2xl" />
                
                <div className="relative flex items-start gap-4">
                  {/* AI Icon with pulse animation */}
                  <div className="relative flex-shrink-0">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-3 shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    {isTyping && (
                      <div className="absolute inset-0 bg-blue-400 rounded-2xl animate-ping opacity-20" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Search  Analysis
                      </h3>
                      {isTyping && (
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                        {displayedSummary}
                        {isTyping && (
                          <span className="inline-block w-0.5 h-5 bg-blue-600 ml-1 animate-pulse" />
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom shine effect */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
              </div>
            </div>
          )}

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-8">
              Results for "<span className="text-primary">{apiData.query}</span>"
            </h3>
            <MedicineCard medicine={apiData.primaryMedicine} isPrimary />
          </div>

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

      {/* Confirmation Modal - Only shown when logged in */}
      {accessToken && showConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
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

      {/* Bulk Results - Only shown when logged in */}
      {accessToken && bulkResults.length > 0 && isUploadMode && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
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

      <BlogSection/>
<button
  onClick={() => setShowRatingPopup(true)}
  className="fixed bottom-6 left-6 z-30 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all font-semibold"
>
  Rate Us ⭐
</button>

<RatingReviewPopup isOpen={showRatingPopup} onClose={() => setShowRatingPopup(false)} />      <ReviewsSection />
      <Footer />

      {/* Custom animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(5%, -5%); }
          50% { transform: translate(-5%, 5%); }
          75% { transform: translate(5%, 5%); }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}


function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const handleGoogleLogin = async (e) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    console.log("Initiating Google login...", result);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    await localStorage.setItem('user', JSON.stringify(result.user));


    console.log("Google credential:", credential);
    const accessToken = credential?.accessToken;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    onClose()
    window.location.reload();

  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Pill className="h-10 w-10 text-primary" />
                <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Welcome to Medlinkr</h2>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors hover:rotate-90 duration-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center mb-8">
            <p className="text-muted-foreground text-lg mb-2">
              Sign in to access all features
            </p>
            <p className="text-sm text-muted-foreground">
              Search medicines, upload prescriptions, and compare prices
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-border rounded-xl hover:bg-muted/50 transition-all hover:shadow-lg hover:scale-105 active:scale-95 group"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-foreground font-semibold text-lg group-hover:text-primary transition-colors">
              Continue with Google
            </span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}