import { useEffect, useState } from "react";

import { CURRENT_USER_ID } from "../utils/currentUser";

const STORAGE_KEY = `recentSearchKeywords_${CURRENT_USER_ID}`;
const MAX_ITEMS = 5;

function readStored() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function useRecentSearches() {
    const [recentSearches, setRecentSearches] = useState(readStored);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
    }, [recentSearches]);

    const addRecentSearch = (keyword) => {
        const trimmed = keyword.trim();
        if (!trimmed) return;
        setRecentSearches((prev) => {
            const next = [
                trimmed,
                ...prev.filter((k) => k.toLowerCase() !== trimmed.toLowerCase()),
            ];
            return next.slice(0, MAX_ITEMS);
        });
    };

    const removeRecentSearch = (keyword) => {
        setRecentSearches((prev) => prev.filter((k) => k !== keyword));
    };

    const clearRecentSearches = () => setRecentSearches([]);

    return { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches };
}
