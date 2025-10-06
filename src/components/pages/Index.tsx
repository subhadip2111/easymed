import { useState } from "react";
// import { SearchBar } from "@/components/SearchBar";
// import { MedicineCard } from "@/components/MedicineCard";
// import { PrescriptionUpload } from "@/components/PrescriptionUpload";
import { Pill } from "lucide-react";
import heroImage from "@/assets/hero-pharmacy.jpg";
import { Footer } from "../Footer";
import { useToast } from "../hooks/use-toast";
import { AdSection } from "../AdSection";
import { MedicineCard } from "../MedicineCard";
import { SearchBar } from "../SearchBar";
import { PrescriptionUpload } from "../PrescriptionUpload";
import { ReviewsSection } from "../ReviewsSection";

interface Medicine {
  name: string;
  composition: string;
  buyLinks: Array<{
    site: string;
    title: string;
    url: string;
    price: string;
  }>;
}

const Index = () => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [similarMedicines, setSimilarMedicines] = useState<Medicine[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  const handleSearch = (query: string) => {
    // Mock data - in real app, this would be an API call
    const mockResults: Medicine[] = [
      {
        name: "Paracetamol 500mg",
        composition: "Paracetamol (500mg)",
        buyLinks: [
          {
            site: "PharmEasy",
            title: "Paracetamol Tablet - Strip of 15",
            url: "https://pharmeasy.in",
            price: "₹15.00",
          },
          {
            site: "1mg",
            title: "Dolo 650 Tablet",
            url: "https://1mg.com",
            price: "₹18.50",
          },
          {
            site: "Netmeds",
            title: "Paracetamol 500mg - 15 Tablets",
            url: "https://netmeds.com",
            price: "₹16.20",
          },
        ],
      },
    ];

    const mockSimilar: Medicine[] = [
      {
        name: "Crocin 500mg",
        composition: "Paracetamol (500mg)",
        buyLinks: [
          {
            site: "PharmEasy",
            title: "Crocin Pain Relief Tablet",
            url: "https://pharmeasy.in",
            price: "₹17.00",
          },
          {
            site: "Apollo Pharmacy",
            title: "Crocin 500 Tablet",
            url: "https://apollopharmacy.in",
            price: "₹16.50",
          },
        ],
      },
      {
        name: "Calpol 500mg",
        composition: "Paracetamol (500mg)",
        buyLinks: [
          {
            site: "1mg",
            title: "Calpol 500mg Tablet",
            url: "https://1mg.com",
            price: "₹19.00",
          },
        ],
      },
    ];

    setSearchResults(mockResults);
    setSimilarMedicines(mockSimilar);

    toast({
      title: "Search Complete",
      description: `Found ${mockResults.length} result(s) for "${query}"`,
    });
  };

  const handleUploadPrescription = () => {
    setShowUpload(true);
  };

  const handlePrescriptionSubmit = (file: File) => {
    // Mock prescription processing
    toast({
      title: "Prescription Uploaded",
      description: "Analyzing your prescription...",
    });

    setTimeout(() => {
      handleSearch("prescription medicines");
      setShowUpload(false);
      toast({
        title: "Analysis Complete",
        description: "Found medicines from your prescription",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Pill className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">EasyMed</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Pharmacy"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Medicines at the Best Price
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Search for medicines, compare prices across pharmacies, and find similar alternatives
            with the same composition.
          </p>
          
          {!showUpload ? (
            <SearchBar onSearch={handleSearch} onUploadPrescription={handleUploadPrescription} />
          ) : (
            <PrescriptionUpload
              onUpload={handlePrescriptionSubmit}
              onClose={() => setShowUpload(false)}
            />
          )}
        </div>
      </section>

      {/* Results Section */}
      {searchResults.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6">Search Results</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {searchResults.map((medicine, index) => (
                <MedicineCard key={index} {...medicine} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Similar Medicines Section */}
      {similarMedicines.length > 0 && (
        <section className="py-12 px-4 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-2">Similar Medicines</h3>
            <p className="text-muted-foreground mb-6">
              These medicines have the same composition and can be used as alternatives
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              {similarMedicines.map((medicine, index) => (
                <MedicineCard key={index} {...medicine} isSimilar />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ad Section */}
      <AdSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
