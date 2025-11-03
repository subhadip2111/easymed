import axios from "axios";


export const giveRatingReview = async (formData: {
    reviewText: string;
    rating: number
    userProfileImage?: string;
    userName?: string
    location?: string;
}): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/rating-review/add`,
            formData,
            { headers: { "Content-Type": "application/json", }, });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(" Error sending contact form:", error);
        throw error;
    }
};