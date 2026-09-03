import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

const SavedJobsContext = createContext(null);

function storageKey(userId) {
    return `savedJobIds_${userId ?? "guest"}`;
}

function readStoredIds(userId) {
    try {
        const raw = localStorage.getItem(storageKey(userId));
        const parsed = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
        return new Set();
    }
}

export function SavedJobsProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.id;
    const [loadedUserId, setLoadedUserId] = useState(userId);
    const [savedIds, setSavedIds] = useState(() => readStoredIds(userId));

    if (userId !== loadedUserId) {
        setLoadedUserId(userId);
        setSavedIds(readStoredIds(userId));
    }

    useEffect(() => {
        localStorage.setItem(storageKey(userId), JSON.stringify([...savedIds]));
    }, [savedIds, userId]);

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
