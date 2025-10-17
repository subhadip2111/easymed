import axios from "axios";



// Interface for search medicine response
interface SearchMedicineResponse {
  query: string;
  primaryMedicine: {
    name: string;
    description: string;
    composition: string[];
    sideEffects: string[];
    buyLinks: any[];
    alternatives: string[];
  };
  similarMedicines: any[];
  disclaimer: string;
  retrievedAt: string;
}

// Interface for upload prescription response
interface UploadPrescriptionResponse {
  statusCode: number;
  message: string;
  analisedMed: string[];
}

// Interface for bulk medicine item
interface BulkMedicineItem {
  buyLinks: {
    site: string;
    title: string;
    url: string;
    snippet: string | null;
    price: string | null;
  }[];
  alternativeNames: string[];
}

export const searchMedicines = async (query: string,location:string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/medicine/search`,
      { name: query,
        location
       }, 
      {
        headers: {
          "Content-Type": "application/json", // ✅ important for backend to parse
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch medicines");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching medicines:", error);
    throw error;
  }
};






export const uploadPrescriptionAndgetAnalisisData = async (imageFile: File): Promise<UploadPrescriptionResponse> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ocr/upload`, {
      method: "POST",
      body: formData,
  
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading prescription:", error);
    throw error;
  }
};


export const bulkSearchMedicinesThroughtInternet = async (
  medicineList: string[]
): Promise<BulkMedicineItem[]> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/medicine/search/bulk`,
      { names: medicineList },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // ✅ axios auto parses JSON
  } catch (error) {
    console.error("❌ Error in bulk search:", error);
    throw error;
  }
};








