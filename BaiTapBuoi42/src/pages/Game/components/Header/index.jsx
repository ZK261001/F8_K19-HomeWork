import styles from "./Header.module.css";

function Header({ screen, timeLeft, onWalkAway }) {
    const isPlaying = screen === "playing";

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <i className="fa-solid fa-trophy" />
                    </div>
                    <div>
                        <h1 className={styles.title}>AI LÀ TRIỆU PHÚ</h1>
                        <p className={styles.subtitle}>
                            Thử thách trí tuệ & chinh phục 150 Triệu
                        </p>
                    </div>
                </div>

                {isPlaying && (
                    <div className={styles.controls}>
                        <div className={styles.timerBox}>
                            <i className={`fa-solid fa-clock ${styles.timerIcon}`} />
                            <span className={styles.timerText}>{timeLeft}</span>s
                        </div>

                        <button
                            type="button"
                            className={styles.walkAwayBtn}
                            onClick={onWalkAway}
                        >
                            <i className="fa-solid fa-person-walking-arrow-right" />
                            <span>Dừng cuộc chơi</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
