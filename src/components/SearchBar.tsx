import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Upload } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onUploadPrescription: () => void;
}

export const SearchBar = ({ onSearch, onUploadPrescription }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for medicines by name or composition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-base shadow-medium border-border focus:border-primary"
          />
        </div>
        <Button type="submit" variant="hero" size="lg" className="sm:w-auto w-full">
          <Search className="h-5 w-5" />
          Search
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onUploadPrescription}
          className="sm:w-auto w-full"
        >
          <Upload className="h-5 w-5" />
          Upload Prescription
        </Button>
      </form>
    </div>
  );
};