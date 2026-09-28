-- 1. Danh sách công ty và các job của công ty đó
SELECT company.id, company.name,
COALESCE(
    json_agg(
        json_build_object(
            'id', job.id,
            'title', job.title
        )
    ) FILTER (WHERE job.id IS NOT NULL),
    '[]'
) as jobs
from company
left join job on job.company_id = company.id and job.active
WHERE company.active
GROUP BY company.id, company.name;

-- 2. 3 tỉnh thành có nhiều công ty nhất
select province.id, province.name,
count(DISTINCT company.id) as total_company,
json_agg(DISTINCT jsonb_build_object(
    'id', company.id,
    'name', company.name
)) as companies
from province
join company_address on province.id = company_address.province_id and company_address.active
join company on company_address.company_id = company.id and company.active
GROUP BY province.id, province.name
ORDER BY total_company DESC
LIMIT 3;

-- 3. Danh sách công ty và các địa chỉ, sắp xếp theo tỉnh có số công ty từ nhiều đến ít
WITH province_count AS (
    SELECT company_address.province_id, count(DISTINCT company_address.company_id) as total_company
    from company_address
    join company on company.id = company_address.company_id and company.active
    WHERE company_address.active
    GROUP BY company_address.province_id
)
SELECT company.id, company.tax, company.name,
json_agg(
    json_build_object(
        'id', company_address.id,
        'province', province.name,
        'ward', ward.name,
        'address_detail', company_address.address_detail
    ) ORDER BY province_count.total_company DESC
) as address
from company
join company_address on company.id = company_address.company_id and company_address.active
join province on province.id = company_address.province_id
left join ward on ward.id = company_address.ward_id
join province_count on province_count.province_id = company_address.province_id
WHERE company.active
GROUP BY company.id, company.name, company.tax
ORDER BY MAX(province_count.total_company) DESC;
