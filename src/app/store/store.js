import { create } from "zustand";
import { fetchSalesToday, fetchAllSales } from "../services/salesServices";

const useStore = create((set) => ({
  salesToday: [],
  allSales: [],
  error: null,
  loadingToday: false,
  loadingAll: false,

  fetchSalesToday: async () => {
    set({ loadingToday: true, error: null });
    try {
      const data = await fetchSalesToday();
      set({ salesToday: data });
    } catch (error) {
      set({ error: "Error fetching today's sales" });
    } finally {
      set({ loadingToday: false });
    }
  },

  fetchAllSales: async () => {
    set({ loadingAll: true, error: null });
    try {
      const data = await fetchAllSales();
      set({ allSales: data });
    } catch (error) {
      set({ error: "Error fetching all sales" });
    } finally {
      set({ loadingAll: false });
    }
  },

  fetchAllData: async () => {
    set({ loadingToday: true, loadingAll: true, error: null });
    try {
      const [salesToday, allSales] = await Promise.all([
        await fetchSalesToday(),
        await fetchAllSales(),
      ]);
      set({ salesToday, allSales });
    } catch (error) {
      set({ error: "Error fetching sales data" });
    } finally {
      set({ loadingToday: false, loadingAll: false });
    }
  },
}));

export default useStore;
