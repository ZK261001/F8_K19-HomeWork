import { useState } from "react";
import { useNavigate } from "react-router";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";

import SearchOverlay from "./SearchOverlay";
import { useRecentSearches } from "../../hooks/useRecentSearches";
import styles from "./SearchBar.module.css";

function SearchBar({
    locations = [],
    categories = [],
    jobs = [],
    initialKeyword = "",
    initialCityId = "",
}) {
    const navigate = useNavigate();
    // Đổ sẵn từ khoá đang tìm để người dùng thấy mình đang tìm gì và sửa tiếp
    // được, thay vì ô trống làm mất keyword khi bấm tìm lại.
    const [keyword, setKeyword] = useState(initialKeyword);
    // Giữ city id chứ không phải tên: `GET /jobs` lọc theo `city_id`.
    const [cityId, setCityId] = useState(String(initialCityId ?? ""));
    const [isFocused, setIsFocused] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } =
        useRecentSearches();

    const isOverlayOpen = isFocused && !isDismissed;

    const goToResults = (searchKeyword) => {
        if (searchKeyword?.trim()) addRecentSearch(searchKeyword);

        const params = new URLSearchParams();
        if (searchKeyword) params.set("keyword", searchKeyword);
        if (cityId) params.set("city", cityId);
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
                        value={cityId}
                        onChange={(e) => setCityId(e.target.value)}
                    >
                        <option value="">Địa điểm</option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.name}
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
