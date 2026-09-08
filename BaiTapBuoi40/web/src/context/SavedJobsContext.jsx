import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useAuth } from "./AuthContext";

const SavedJobsContext = createContext(null);

function storageKey(userId) {
    return `savedJobIds_${userId ?? "guest"}`;
}

function readStoredEntries(userId) {
    try {
        const raw = localStorage.getItem(storageKey(userId));
        const parsed = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed)) return [];

        // Bản cũ lưu thẳng mảng id (chuỗi). Quy về dạng mới để dữ liệu người
        // dùng đã lưu từ trước không bị mất, chỉ là không có mốc thời gian.
        return parsed
            .map((entry) =>
                typeof entry === "string"
                    ? { id: entry, savedAt: null }
                    : { id: entry?.id, savedAt: entry?.savedAt ?? null },
            )
            .filter((entry) => Boolean(entry.id));
    } catch {
        return [];
    }
}

function sortByNewest(entries) {
    // Lưu gần nhất lên đầu; mục từ bản cũ (không có savedAt) xuống cuối.
    return [...entries].sort((a, b) => {
        if (!a.savedAt && !b.savedAt) return 0;
        if (!a.savedAt) return 1;
        if (!b.savedAt) return -1;
        return new Date(b.savedAt) - new Date(a.savedAt);
    });
}

export function SavedJobsProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.id;
    const [loadedUserId, setLoadedUserId] = useState(userId);
    const [entries, setEntries] = useState(() => readStoredEntries(userId));

    if (userId !== loadedUserId) {
        setLoadedUserId(userId);
        setEntries(readStoredEntries(userId));
    }

    useEffect(() => {
        localStorage.setItem(storageKey(userId), JSON.stringify(entries));
    }, [entries, userId]);

    const savedIds = useMemo(() => new Set(entries.map((entry) => entry.id)), [entries]);
    const savedJobs = useMemo(() => sortByNewest(entries), [entries]);

    const toggleSaved = (jobId) => {
        setEntries((prev) =>
            prev.some((entry) => entry.id === jobId)
                ? prev.filter((entry) => entry.id !== jobId)
                : [...prev, { id: jobId, savedAt: new Date().toISOString() }],
        );
    };

    const isSaved = (jobId) => savedIds.has(jobId);

    const value = { isSaved, toggleSaved, savedJobs, savedCount: entries.length };

    return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSavedJobs() {
    const context = useContext(SavedJobsContext);
    if (!context) {
        throw new Error("useSavedJobs must be used within a SavedJobsProvider");
    }
    return context;
}
