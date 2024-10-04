import axios from "axios";
import { CurrencyResponse } from "../types";

export const fetchCurrencyRates = async () => {
    console.log("Running!!!!")
    const response = await axios.get<CurrencyResponse>("https://www.floatrates.com/daily/usd.json");
    return response.data;
};
