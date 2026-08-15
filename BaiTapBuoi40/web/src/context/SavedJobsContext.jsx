import { createContext, useContext, useEffect, useState } from "react";

import { CURRENT_USER_ID } from "../utils/currentUser";

const STORAGE_KEY = `savedJobIds_${CURRENT_USER_ID}`;
const SavedJobsContext = createContext(null);

function readStoredIds() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
        return new Set();
    }
}

export function SavedJobsProvider({ children }) {
    const [savedIds, setSavedIds] = useState(readStoredIds);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedIds]));
    }, [savedIds]);

    const toggleSaved = (jobId) => {
        setSavedIds((prev) => {
            const next = new Set(prev);
            if (next.has(jobId)) {
                next.delete(jobId);
            } else {
                next.add(jobId);
            }
            return next;
        });
    };

    const isSaved = (jobId) => savedIds.has(jobId);

    return (
        <SavedJobsContext.Provider value={{ isSaved, toggleSaved }}>
            {children}
        </SavedJobsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSavedJobs() {
    const context = useContext(SavedJobsContext);
    if (!context) {
        throw new Error("useSavedJobs must be used within a SavedJobsProvider");
    }
    return context;
}
