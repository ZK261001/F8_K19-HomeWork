import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { listCategoryGroups } from "../../api/categories";
import { createJob } from "../../api/employer";
import { jobTypeLabel, genderLabel } from "../../utils/format";
import styles from "./PostJob.module.css";

const JOB_TYPES = ["FULL_TIME", "PART_TIME", "FREELANCE", "INTERNSHIP"];
const GENDERS = ["NOT_REQUIRED", "MALE", "FEMALE"];
const SALARY_TYPES = ["RANGE", "UP_TO", "MINIMUM"];
const SALARY_TYPE_LABELS = {
    RANGE: "Khoảng lương",
    UP_TO: "Tới mức lương",
    MINIMUM: "Tối thiểu",
};

const emptyLocation = () => ({ city_name: "", address_detail: "" });

function PostJob() {
    const navigate = useNavigate();
    const [categoryGroups, setCategoryGroups] = useState([]);

    const [form, setForm] = useState({
        title: "",
        category: "",
        specialty: "",
        job_type: "FULL_TIME",
        experience_level: "",
        gender: "NOT_REQUIRED",
        quantity: "",
        salaryType: "RANGE",
        salaryMin: "",
        salaryMax: "",
        isNegotiable: false,
        deadline: "",
        is_hot: false,
        description_html: "",
        requirements_html: "",
        benefits_html: "",
    });
    const [locations, setLocations] = useState([emptyLocation()]);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        listCategoryGroups().then(setCategoryGroups);
    }, []);

    const categoryOptions = useMemo(
        () => categoryGroups.flatMap((group) => group.categories),
        [categoryGroups],
    );

    function handleChange(field) {
        return (event) => {
            const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            setForm((prev) => ({ ...prev, [field]: value }));
        };
    }

    function handleLocationChange(index, field) {
        return (event) => {
            setLocations((prev) =>
                prev.map((loc, i) => (i === index ? { ...loc, [field]: event.target.value } : loc)),
            );
        };
    }

    function addLocation() {
        setLocations((prev) => [...prev, emptyLocation()]);
    }

    function removeLocation(index) {
        setLocations((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!form.title.trim() || !form.category.trim() || !form.deadline || !form.description_html.trim()) {
            setError("Vui lòng điền đầy đủ các trường bắt buộc");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                title: form.title.trim(),
                category: form.category.trim(),
                specialty: form.specialty.trim() || null,
                job_type: form.job_type,
                experience_level: form.experience_level.trim() || null,
                gender: form.gender,
                quantity: form.quantity ? Number(form.quantity) : null,
                salary: form.isNegotiable
                    ? { is_negotiable: true }
                    : {
                          type: form.salaryType,
                          min: form.salaryMin ? Number(form.salaryMin) : null,
                          max: form.salaryMax ? Number(form.salaryMax) : null,
                          is_negotiable: false,
                      },
                work_location: locations.filter((loc) => loc.city_name.trim()),
                deadline: form.deadline,
                is_hot: form.is_hot,
                description_html: form.description_html.trim(),
                requirements_html: form.requirements_html.trim() || null,
                benefits_html: form.benefits_html.trim() || null,
            };

            const job = await createJob(payload);
            navigate(`/viec-lam/${job.slug}`);
        } catch (submitError) {
            setError(submitError.message || "Đăng tuyển thất bại, vui lòng thử lại");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Đăng tuyển việc làm</h1>
                <p className={styles.subtitle}>Điền thông tin tin tuyển dụng để đăng lên hệ thống.</p>

                <form onSubmit={handleSubmit} noValidate>
                    {error && <p className={styles.formError}>{error}</p>}

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Thông tin cơ bản</h2>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="title">
                                Tên vị trí tuyển dụng *
                            </label>
                            <input
                                id="title"
                                className={styles.input}
                                type="text"
                                value={form.title}
                                onChange={handleChange("title")}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="category">
                                    Nhóm ngành *
                                </label>
                                <input
                                    id="category"
                                    className={styles.input}
                                    type="text"
                                    list="category-options"
                                    placeholder="Ví dụ: Công nghệ thông tin"
                                    value={form.category}
                                    onChange={handleChange("category")}
                                />
                                <datalist id="category-options">
                                    {categoryOptions.map((c) => (
                                        <option key={c.id} value={c.name} />
                                    ))}
                                </datalist>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="specialty">
                                    Chuyên môn
                                </label>
                                <input
                                    id="specialty"
                                    className={styles.input}
                                    type="text"
                                    value={form.specialty}
                                    onChange={handleChange("specialty")}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="job_type">
                                    Hình thức làm việc *
                                </label>
                                <select
                                    id="job_type"
                                    className={styles.select}
                                    value={form.job_type}
                                    onChange={handleChange("job_type")}
                                >
                                    {JOB_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                            {jobTypeLabel(type)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="experience_level">
                                    Kinh nghiệm yêu cầu
                                </label>
                                <input
                                    id="experience_level"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Ví dụ: 1-2 năm"
                                    value={form.experience_level}
                                    onChange={handleChange("experience_level")}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="gender">
                                    Giới tính
                                </label>
                                <select
                                    id="gender"
                                    className={styles.select}
                                    value={form.gender}
                                    onChange={handleChange("gender")}
                                >
                                    {GENDERS.map((g) => (
                                        <option key={g} value={g}>
                                            {genderLabel(g)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="quantity">
                                    Số lượng cần tuyển
                                </label>
                                <input
                                    id="quantity"
                                    className={styles.input}
                                    type="number"
                                    min="1"
                                    value={form.quantity}
                                    onChange={handleChange("quantity")}
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="deadline">
                                Hạn nộp hồ sơ *
                            </label>
                            <input
                                id="deadline"
                                className={styles.input}
                                type="datetime-local"
                                value={form.deadline}
                                onChange={handleChange("deadline")}
                            />
                        </div>

                        <label className={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                checked={form.is_hot}
                                onChange={handleChange("is_hot")}
                            />
                            Đánh dấu tin nổi bật (HOT)
                        </label>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Mức lương</h2>

                        <label className={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                checked={form.isNegotiable}
                                onChange={handleChange("isNegotiable")}
                            />
                            Lương thoả thuận
                        </label>

                        {!form.isNegotiable && (
                            <>
                                <div className={styles.field}>
                                    <label className={styles.label} htmlFor="salaryType">
                                        Loại mức lương
                                    </label>
                                    <select
                                        id="salaryType"
                                        className={styles.select}
                                        value={form.salaryType}
                                        onChange={handleChange("salaryType")}
                                    >
                                        {SALARY_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {SALARY_TYPE_LABELS[type]}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.row}>
                                    {form.salaryType !== "UP_TO" && (
                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="salaryMin">
                                                Lương tối thiểu (đ)
                                            </label>
                                            <input
                                                id="salaryMin"
                                                className={styles.input}
                                                type="number"
                                                min="0"
                                                value={form.salaryMin}
                                                onChange={handleChange("salaryMin")}
                                            />
                                        </div>
                                    )}
                                    {form.salaryType !== "MINIMUM" && (
                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="salaryMax">
                                                Lương tối đa (đ)
                                            </label>
                                            <input
                                                id="salaryMax"
                                                className={styles.input}
                                                type="number"
                                                min="0"
                                                value={form.salaryMax}
                                                onChange={handleChange("salaryMax")}
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Địa điểm làm việc</h2>

                        {locations.map((loc, index) => (
                            <div className={styles.locationRow} key={index}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Tỉnh/thành phố"
                                    value={loc.city_name}
                                    onChange={handleLocationChange(index, "city_name")}
                                />
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Địa chỉ chi tiết"
                                    value={loc.address_detail}
                                    onChange={handleLocationChange(index, "address_detail")}
                                />
                                {locations.length > 1 && (
                                    <button
                                        type="button"
                                        className={styles.removeLocationButton}
                                        onClick={() => removeLocation(index)}
                                    >
                                        Xoá
                                    </button>
                                )}
                            </div>
                        ))}

                        <button type="button" className={styles.addLocationButton} onClick={addLocation}>
                            + Thêm địa điểm
                        </button>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Mô tả chi tiết</h2>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="description_html">
                                Mô tả công việc *
                            </label>
                            <textarea
                                id="description_html"
                                className={styles.textarea}
                                value={form.description_html}
                                onChange={handleChange("description_html")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="requirements_html">
                                Yêu cầu ứng viên
                            </label>
                            <textarea
                                id="requirements_html"
                                className={styles.textarea}
                                value={form.requirements_html}
                                onChange={handleChange("requirements_html")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="benefits_html">
                                Quyền lợi ứng viên
                            </label>
                            <textarea
                                id="benefits_html"
                                className={styles.textarea}
                                value={form.benefits_html}
                                onChange={handleChange("benefits_html")}
                            />
                        </div>
                    </div>

                    <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đang đăng tuyển..." : "Đăng tuyển"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PostJob;
