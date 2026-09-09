import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { listCategoryGroups } from "../../api/categories";
import { findCompanyByEmail } from "../../api/companies";
import { createJob } from "../../api/employer";
import { CITIES, findCityById } from "../../constants/cities";
import { GENDERS, JOB_TYPES } from "../../constants/jobFilters";
import EmployerTabs from "../../components/EmployerTabs";
import RichTextEditor from "../../components/RichTextEditor";
import { useAuth } from "../../context/AuthContext";
import { jobTypeLabel, genderLabel } from "../../utils/format";
import { hasVisibleText } from "../../utils/richText";
import styles from "./PostJob.module.css";

const SALARY_TYPES = ["RANGE", "UP_TO", "MINIMUM"];
const SALARY_TYPE_LABELS = {
    RANGE: "Khoảng lương",
    UP_TO: "Tới mức lương",
    MINIMUM: "Tối thiểu",
};

// Giữ city_id (không phải city_name) vì đó là thứ `GET /jobs?city_id=` lọc theo.
// Thiếu nó thì tin đăng lên sẽ không bao giờ khớp bộ lọc địa điểm.
const emptyLocation = () => ({ city_id: "", address_detail: "" });

function PostJob() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [categoryGroups, setCategoryGroups] = useState([]);
    // undefined = chưa tra xong, null = tra rồi mà không có, object = tìm thấy.
    const [company, setCompany] = useState(undefined);

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

    const isAdmin = user?.role === "ADMIN";

    // Chỉ để hiển thị tin sẽ đứng tên công ty nào — KHÔNG dùng để chặn đăng tin.
    // Backend (POST /employer/jobs) chỉ đòi role EMPLOYER + user.company_id, nó
    // không hề kiểm tra công ty đã được duyệt hay chưa. Tài khoản admin không
    // gắn với công ty nào nên bỏ qua luôn bước tra cứu này.
    useEffect(() => {
        if (!user?.email || isAdmin) return;

        findCompanyByEmail(user.email)
            .then((found) => setCompany(found ?? null))
            .catch(() => setCompany(null));
    }, [user?.email, isAdmin]);

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

    // RichTextEditor trả thẳng chuỗi HTML chứ không phải event như <input>.
    function handleRichTextChange(field) {
        return (html) => setForm((prev) => ({ ...prev, [field]: html }));
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

        // description_html là HTML từ contentEditable: rỗng vẫn còn "<br>" nên
        // phải kiểm tra có chữ thật hay không thay vì trim() chuỗi.
        if (
            !form.title.trim() ||
            !form.category.trim() ||
            !form.deadline ||
            !hasVisibleText(form.description_html)
        ) {
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
                work_location: locations
                    .filter((loc) => loc.city_id)
                    .map((loc) => ({
                        city_id: Number(loc.city_id),
                        city_name: findCityById(loc.city_id)?.name ?? null,
                        address_detail: loc.address_detail.trim() || null,
                    })),
                deadline: form.deadline,
                is_hot: form.is_hot,
                description_html: form.description_html,
                requirements_html: hasVisibleText(form.requirements_html)
                    ? form.requirements_html
                    : null,
                benefits_html: hasVisibleText(form.benefits_html) ? form.benefits_html : null,
            };

            const job = await createJob(payload);
            navigate(`/viec-lam/${job.slug}`);
        } catch (submitError) {
            // Backend trả 403 cho hai nguyên nhân khác hẳn nhau, gộp chung một
            // câu thì người dùng không biết đường xử lý.
            if (submitError.status === 403) {
                setError(
                    isAdmin
                        ? "Tài khoản quản trị chưa đăng tin được: API POST /employer/jobs hiện chỉ nhận role EMPLOYER."
                        : "Tài khoản của bạn chưa gắn với công ty nào. Hãy đăng ký lại bằng luồng dành cho nhà tuyển dụng.",
                );
                return;
            }
            setError(submitError.message || "Đăng tuyển thất bại, vui lòng thử lại");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.page}>
            <EmployerTabs />

            <div className={styles.card}>
                <h1 className={styles.title}>Đăng tuyển việc làm</h1>
                <p className={styles.subtitle}>Điền thông tin tin tuyển dụng để đăng lên hệ thống.</p>

                {isAdmin && (
                    <p className={styles.noticeWarn}>
                        Bạn đang đăng nhập bằng tài khoản quản trị. Backend hiện chỉ cho phép role
                        EMPLOYER gọi <code>POST /employer/jobs</code>, nên form này sẽ trả lỗi 403
                        khi gửi. Cần mở quyền ở backend để admin đăng tin được.
                    </p>
                )}

                {!isAdmin && company && (
                    <p className={styles.noticeInfo}>
                        Tin sẽ được đăng dưới tên công ty <strong>{company.company_name}</strong>.
                    </p>
                )}

                {!isAdmin && company === null && (
                    <p className={styles.noticeWarn}>
                        Không tìm thấy công ty gắn với email <strong>{user?.email}</strong>. Nếu tài
                        khoản chưa được tạo qua luồng đăng ký nhà tuyển dụng thì việc đăng tin sẽ bị
                        từ chối.
                    </p>
                )}

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
                                {/* Bắt buộc chọn từ danh sách: server sinh
                                    category_slug = slugify(category), gõ tự do sẽ
                                    tạo tin không thuộc lĩnh vực nào trong
                                    GET /categories nên không trang nào hiển thị. */}
                                <select
                                    id="category"
                                    className={styles.select}
                                    value={form.category}
                                    onChange={handleChange("category")}
                                >
                                    <option value="">-- Chọn nhóm ngành --</option>
                                    {categoryOptions.map((c) => (
                                        <option key={c.id} value={c.name}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
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
                                <select
                                    className={styles.select}
                                    value={loc.city_id}
                                    onChange={handleLocationChange(index, "city_id")}
                                >
                                    <option value="">-- Tỉnh/thành phố --</option>
                                    {CITIES.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
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
                            <RichTextEditor
                                id="description_html"
                                value={form.description_html}
                                onChange={handleRichTextChange("description_html")}
                                placeholder="Mô tả chi tiết công việc, trách nhiệm chính..."
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="requirements_html">
                                Yêu cầu ứng viên
                            </label>
                            <RichTextEditor
                                id="requirements_html"
                                value={form.requirements_html}
                                onChange={handleRichTextChange("requirements_html")}
                                placeholder="Kinh nghiệm, kỹ năng, bằng cấp yêu cầu..."
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="benefits_html">
                                Quyền lợi ứng viên
                            </label>
                            <RichTextEditor
                                id="benefits_html"
                                value={form.benefits_html}
                                onChange={handleRichTextChange("benefits_html")}
                                placeholder="Lương thưởng, bảo hiểm, môi trường làm việc..."
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
