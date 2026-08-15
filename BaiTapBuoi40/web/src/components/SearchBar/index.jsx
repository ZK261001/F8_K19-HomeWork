import { useState } from "react";
import { useNavigate } from "react-router";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";

import SearchOverlay from "./SearchOverlay";
import { useRecentSearches } from "../../hooks/useRecentSearches";
import styles from "./SearchBar.module.css";

function SearchBar({ locations = [], categories = [], jobs = [], companies = [] }) {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [locationId, setLocationId] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } =
        useRecentSearches();

    const isOverlayOpen = isFocused && !isDismissed;

    const goToResults = (searchKeyword) => {
        if (searchKeyword?.trim()) addRecentSearch(searchKeyword);

        const params = new URLSearchParams();
        if (searchKeyword) params.set("keyword", searchKeyword);
        if (locationId) params.set("locationId", locationId);
        navigate(`/viec-lam?${params.toString()}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        goToResults(keyword);
    };

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
        }
    };

    return (
        <div className={styles.wrapper} onBlur={handleBlur}>
            <form className={styles.searchBar} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <SearchOutlined className={styles.fieldIcon} />
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Vị trí tuyển dụng, tên công ty"
                        value={keyword}
                        onFocus={() => {
                            setIsFocused(true);
                            setIsDismissed(false);
                        }}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            setIsDismissed(false);
                        }}
                    />
                </div>

                <div className={styles.divider} />

                <div className={styles.field}>
                    <PlaceOutlined className={styles.fieldIcon} />
                    <select
                        className={styles.select}
                        value={locationId}
                        onChange={(e) => setLocationId(e.target.value)}
                    >
                        <option value="">Địa điểm</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className={styles.submitButton}>
                    <SearchOutlined className={styles.submitIcon} />
                    Tìm kiếm
                </button>
            </form>

            {isOverlayOpen && (
                <SearchOverlay
                    keyword={keyword}
                    categories={categories}
                    jobs={jobs}
                    companies={companies}
                    recentSearches={recentSearches}
                    onRemoveRecent={removeRecentSearch}
                    onClearRecent={clearRecentSearches}
                    onKeywordSelect={addRecentSearch}
                    onClose={() => setIsDismissed(true)}
                />
            )}
        </div>
    );
}

export default SearchBar;
