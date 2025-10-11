import axios from "axios";

export const searchMedicines = async (query: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/medicine/search`,
      { name: query }, 
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
