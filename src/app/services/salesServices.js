import axios from "axios";

const getToken = () => {
  return localStorage.getItem("authorization");
};

export const fetchSalesToday = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sales/today`,
      {
        headers: {
          authorization: `${getToken()}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sales", error);
    throw error;
  }
};

export const fetchAllSales = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sales-month`,
      {
        headers: {
          authorization: `${getToken()}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sales", error);
    throw error;
  }
};

export const fetchAllExpenses = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/expenses-month`,
      {
        headers: {
          authorization: `${getToken()}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sales", error);
    throw error;
  }
};
