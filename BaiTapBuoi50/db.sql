-- 1. phục vụ tìm kiếm job theo công ty (dành cho cả client và admin)
create index idx_job_company_id on job(company_id);

-- 2. phục vụ tìm kiếm job theo category (dành cho cả client và admin)
create index idx_job_category_id on job(category_id);

-- 3. phục vụ tìm kiếm job theo kinh nghiệm dành cho client
create index idx_job_experience on job(experience, created_at desc)
where active and deleted_at is null;

-- 4. phục vụ tìm job theo khoảng lương dành cho client
create index idx_job_range_salary on job(min_salary, max_salary)
where active and deleted_at is null;

-- 5. phục vụ tìm kiếm job theo work type dành cho client
create index idx_job_work_type on job(work_type, created_at desc)
where active and deleted_at is null;

-- 6. phục vụ xem danh sách bài đăng mới nhất ở trang chủ (feed tin tuyển dụng)
create index idx_job_latest_post on job(created_at desc)
where active and deleted_at is null;

-- 7. phục vụ tìm kiếm ứng viên và cv của họ
create index idx_cv_candidate_id on cv(candidate_id);

-- 8. phục vụ tìm kiếm địa chỉ công ty
create index idx_company_address_company_id on company_address(company_id);

-- 9. phục vụ tìm kiếm công ty theo tỉnh thành
create index idx_company_address_province_id on company_address(province_id);

-- 10. admin xem danh sách ứng viên/cv nộp vào job này (sắp xếp từ mới đến cũ)
create index idx_job_app_job_created on job_application(job_id, created_at desc)
where deleted_at is null;

-- 11. ứng viên xem danh sách các job mình đã ứng tuyển kèm trạng thái
create index idx_job_app_cand_status_created 
on job_application(candidate_id, status, created_at desc)
where deleted_at is null;