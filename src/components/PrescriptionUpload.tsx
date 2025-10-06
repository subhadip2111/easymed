import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, FileText } from "lucide-react";
import prescriptionImage from "@/assets/prescription-upload.jpg";

interface PrescriptionUploadProps {
  onUpload: (file: File) => void;
  onClose: () => void;
}

export const PrescriptionUpload = ({ onUpload, onClose }: PrescriptionUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      setPreview(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-strong">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <CardTitle className="text-2xl">Upload Prescription</CardTitle>
        <CardDescription>
          Upload a photo of your prescription to find the medicines you need
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!preview ? (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={prescriptionImage}
                alt="Upload prescription"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg" />
            </div>
            <label
              htmlFor="prescription-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-smooth"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-10 w-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 10MB)</p>
              </div>
              <input
                id="prescription-upload"
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={preview}
                alt="Prescription preview"
                className="w-full h-96 object-contain rounded-lg bg-muted"
              />
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <FileText className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{selectedFile?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile!.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => {
                setSelectedFile(null);
                setPreview(null);
              }}>
                Remove
              </Button>
            </div>
            <Button onClick={handleUpload} className="w-full" size="lg" variant="hero">
              Analyze Prescription
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};