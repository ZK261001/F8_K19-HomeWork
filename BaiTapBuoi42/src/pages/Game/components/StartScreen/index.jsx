import styles from "./StartScreen.module.css";

function StartScreen({ onStart }) {
    return (
        <div className={styles.card}>
            <div className={styles.badge}>
                <div className={styles.badgeInner}>
                    <i className="fa-solid fa-award" />
                </div>
            </div>

            <h2 className={styles.title}>AI LÀ TRIỆU PHÚ</h2>
            <p className={styles.desc}>
                Hãy chuẩn bị tinh thần bước vào ghế nóng, vượt qua 15 câu hỏi kiến thức
                phong phú và giành lấy tiền thưởng <b>150.000.000 VNĐ</b>!
            </p>

            <div className={styles.rules}>
                <div className={styles.rulesTitle}>
                    <i className="fa-solid fa-circle-info" /> Quy tắc trò chơi:
                </div>
                <p>• Trả lời 15 câu hỏi trắc nghiệm từ dễ đến khó.</p>
                <p>
                    • Hai cột mốc an toàn quan trọng: <b>Câu 5 (2.000.000đ)</b> &{" "}
                    <b>Câu 10 (22.000.000đ)</b>.
                </p>
                <p>• Bạn có <b>4 quyền trợ giúp</b> hỗ trợ trong suốt quá trình chơi.</p>
                <p>
                    • Bạn có thể bấm <b>"Dừng cuộc chơi"</b> bất cứ lúc nào để bảo toàn số
                    tiền thưởng hiện tại.
                </p>
            </div>

            <button type="button" className={styles.startBtn} onClick={onStart}>
                BẮT ĐẦU VÀO GHẾ NÓNG <i className="fa-solid fa-play" />
            </button>
        </div>
    );
}

export default StartScreen;
