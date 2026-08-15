import { useRef } from "react";
import FilterListOutlined from "@mui/icons-material/FilterListOutlined";

import FilterChip from "../../../../components/FilterChip";
import NavArrowButtons from "../../../../components/NavArrowButtons";
import styles from "./LocationFilterRow.module.css";

function LocationFilterRow({ locations, selectedLocationId, onSelectLocation }) {
    const scrollerRef = useRef(null);

    const scrollBy = (amount) => {
        scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
        <div className={styles.row}>
            <button type="button" className={styles.filterButton}>
                <FilterListOutlined className={styles.filterIcon} />
                Lọc theo: Địa điểm
            </button>

            <NavArrowButtons onPrev={() => scrollBy(-240)} onNext={() => scrollBy(240)} />

            <div className={styles.chips} ref={scrollerRef}>
                <FilterChip
                    label="Tất cả"
                    active={!selectedLocationId}
                    onClick={() => onSelectLocation(null)}
                />
                {locations.map((location) => (
                    <FilterChip
                        key={location.id}
                        label={location.name}
                        active={selectedLocationId === location.id}
                        onClick={() => onSelectLocation(location.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default LocationFilterRow;
