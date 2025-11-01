import axios from "axios";


export const sendContactUsForm = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/contact-us`,
            formData,
            { headers: { "Content-Type": "application/json", }, });
            console.log(response);
        return response.data;
    } catch (error) {
        console.error(" Error sending contact form:", error);
        throw error;
    }
};