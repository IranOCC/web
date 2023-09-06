import React from "react";
import useAxiosAuth from "./useAxiosAuth";
import { SelectDataType } from "@/types/interfaces";


export type UsePokemonListProps = {
    /** Delay to wait before fetching more items */
    fetchDelay?: number;
    endpoint: string;
};

export function usePokemonList({ fetchDelay = 0, endpoint }: UsePokemonListProps) {
    const [items, setItems] = React.useState<SelectDataType[]>([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [offset, setOffset] = React.useState(0);
    const limit = 10; // Number of items per page, adjust as necessary
    const api = useAxiosAuth()
    const loadPokemon = async (currentOffset: number) => {
        const controller = new AbortController();
        const { signal } = controller;

        try {
            setIsLoading(true);

            if (offset > 0) {
                // Delay to simulate network latency
                await new Promise((resolve) => setTimeout(resolve, fetchDelay));
            }

            const result = await api.get(endpoint)


            if (!result.data) {
                throw new Error("Network response was not ok");
            }

            setHasMore(false);
            // Append new results to existing ones
            setItems((prevItems) => [...prevItems, ...result.data]);
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Fetch aborted");
            } else {
                console.error("There was an error with the fetch operation:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadPokemon(offset);
    }, []);

    const onLoadMore = () => {
        const newOffset = offset + limit;

        setOffset(newOffset);
        loadPokemon(newOffset);
    };

    return {
        items,
        hasMore,
        isLoading,
        onLoadMore,
    };
}
