import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAsyncStore } from "../store/useAsyncStore";
import { fetchCurrencyRates } from "../services/getCurrencyRates";
import { CurrencyResponse } from "../types";

export const useCurrency = () => {
    const { setCurrencyRates, setLoading, setError, currencyRates, isLoading, error } = useAsyncStore();

    const {
        data,
        error: queryError,
        isLoading: queryLoading
    } = useQuery<CurrencyResponse, Error>({
        queryKey: ["currencyRates"],
        queryFn: fetchCurrencyRates,
        refetchInterval: 100000
    });

    const [keyword, setKeyword] = useState<string>("");

    useEffect(() => {
        if (data) {
            setCurrencyRates(data);
        }
        setLoading(queryLoading);
        setError(queryError || null);
    }, [data, queryError, queryLoading]);

    const sortedRates = useMemo(() => {
        if (!currencyRates || typeof currencyRates !== "object") return [];
        return Object.entries(currencyRates!).sort((a, b) => a[1]?.rate - b[1]?.rate);
    }, [data]);

    const filteredRates = useMemo(
        () =>
            sortedRates.filter(([_, currency]) =>
                (currency.code + " " + currency.name).toLowerCase().includes(keyword.toLowerCase())
            ),
        [sortedRates, keyword]
    );

    const lastUpdatedDate = data ? new Date(sortedRates[0][1].date).toLocaleString() : "";
    return { filteredRates, lastUpdatedDate, keyword, setKeyword, isLoading, error };
};
