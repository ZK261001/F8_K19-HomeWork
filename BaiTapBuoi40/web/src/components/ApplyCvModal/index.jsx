import { useState } from "react";

import styles from "./ApplyCvModal.module.css";

function ApplyCvModal({ defaultEmail, onClose, onSubmit }) {
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: defaultEmail ?? "",
        summary: "",
        skills: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(field) {
        return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!form.fullName.trim()) {
            setError("Vui lòng nhập họ và tên");
            return;
        }

        setError("");
        setIsSubmitting(true);
        try {
            await onSubmit({
                fullName: form.fullName.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                summary: form.summary.trim(),
                skills: form.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
            });
        } catch (submitError) {
            setError(submitError.message || "Tạo CV thất bại, vui lòng thử lại");
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Tạo CV nhanh để ứng tuyển</h2>
                <p className={styles.subtitle}>
                    Bạn cần tạo một CV cơ bản trước khi ứng tuyển. CV này sẽ được dùng lại cho các
                    lần ứng tuyển sau.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    {error && <p className={styles.formError}>{error}</p>}

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="cv-fullName">
                            Họ và tên *
                        </label>
                        <input
                            id="cv-fullName"
                            className={styles.input}
                            type="text"
                            value={form.fullName}
                            onChange={handleChange("fullName")}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="cv-phone">
                            Số điện thoại
                        </label>
                        <input
                            id="cv-phone"
                            className={styles.input}
                            type="tel"
                            value={form.phone}
                            onChange={handleChange("phone")}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="cv-email">
                            Email
                        </label>
                        <input
                            id="cv-email"
                            className={styles.input}
                            type="email"
                            value={form.email}
                            onChange={handleChange("email")}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="cv-summary">
                            Giới thiệu bản thân
                        </label>
                        <textarea
                            id="cv-summary"
                            className={styles.textarea}
                            value={form.summary}
                            onChange={handleChange("summary")}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="cv-skills">
                            Kỹ năng (cách nhau bởi dấu phẩy)
                        </label>
                        <input
                            id="cv-skills"
                            className={styles.input}
                            type="text"
                            placeholder="Ví dụ: Excel, Giao tiếp, JavaScript"
                            value={form.skills}
                            onChange={handleChange("skills")}
                        />
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Huỷ
                        </button>
                        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Đang gửi..." : "Tạo CV & Ứng tuyển"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplyCvModal;
