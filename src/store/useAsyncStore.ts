import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CurrencyResponse } from "../types";

interface StoreState {
    currencyRates: CurrencyResponse | null;
    isLoading: boolean;
    error: Error | null;
    setCurrencyRates: (rates: CurrencyResponse) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: Error | null) => void;
}

const storage = {
    getItem: async (name: string): Promise<string | null> => {
        const data = await AsyncStorage.getItem(name);
        return data || null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await AsyncStorage.setItem(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
        await AsyncStorage.removeItem(name);
    }
};

export const useAsyncStore = create<StoreState>()(
    persist<StoreState>(
        (set) => ({
            currencyRates: null,
            isLoading: false,
            error: null,

            setCurrencyRates: (rates: CurrencyResponse) => set({ currencyRates: rates }),
            setLoading: (loading: boolean) => set({ isLoading: loading }),
            setError: (error: Error | null) => set({ error })
        }),
        {
            name: "currency-storage", 
            storage: createJSONStorage(() => storage)
        }
    )
);
