import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  let token = localStorage.getItem("authorization");
  return token;
}

export const deleteSale = async (saleId) => {
  try {
    const response = await axios.delete(`${API_URL}/sales/${saleId}`, {
      headers: {
        authorization: `${getToken()}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting sale:", error);
    throw error;
  }
};
