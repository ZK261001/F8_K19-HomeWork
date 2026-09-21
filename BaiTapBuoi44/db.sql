CREATE TABLE customer(
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by int,
    modified_at TIMESTAMPTZ,
    modified_by INT,
    deleted_at TIMESTAMPTZ,
    deleted_by INT,
    active BOOLEAN DEFAULT TRUE
);
INSERT INTO customer(name, age, address, active) VALUES
('Trần Thanh Tùng', 29, 'Đà Nẵng', true),
('Lê Hoàng Nam', 33, 'Hà Nội', false),
('Nguyễn Khánh Linh', 20, 'TP.HCM', true),
('Phạm Đức Bảo', 16, 'Quảng Nam', true),
('Vũ Thị Thanh', 42, 'Hải Dương', false),
('Đặng Quốc Cường', 26, 'Bình Định', true),
('Bùi Hoài An', 23, 'Cần Thơ', false),
('Đỗ Anh Tuấn', 38, 'Hải Phòng', true),
('Ngô Phương Thảo', 18, 'Thừa Thiên Huế', true),
('Nguyễn Hữu Đạt', 50, 'Lâm Đồng', false),
('Hoàng Thị Ngọc', 22, 'Bắc Ninh', true),
('Phan Trọng Hiếu', 31, 'Kiên Giang', false),
('Trịnh Mai Chi', 27, 'Thái Nguyên', true);
-- lấy các khách hàng active =true
SELECT * FROM customer 
WHERE active=TRUE;
-- Lấy khách hàng trên 30 tuổi.
SELECT * FROM customer
WHERE age > 30 ;
-- Lay khach hang o ha noi
SELECT * FROM customer
WHERE address = 'Hà Nội';
SELECT * FROM customer
WHERE name ILIKE '%An%';
-- thay đổi cấu trúc bảng
ALTER TABLE customer
    ADD COLUMN IF NOT EXISTS email TEXT,
    ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
    ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
SELECT * FROM customer;
-- cập nhật các trường mới
UPDATE customer AS c 
SET
    email = v.email,
    phone = v.phone,
    gender = v.gender
FROM (VALUES 
    (1,  'tung.tranthanh@gmail.com', '0918273645', 'male'),
    (2,  'nam.lehoang@yahoo.com',    '0927364518', 'male'),
    (3,  'linh.nguyenkhanh@gmail.com','0936451827', 'female'),
    (4,  'bao.phamduc@outlook.com',  '0945182736', 'male'),
    (5,  'thanh.vuthi@gmail.com',    '0954019283', 'female'),
    (6,  'cuong.dangquoc@gmail.com', '0963928174', 'male'),
    (7,  'an.buihoai@yahoo.com',     '0972819028', 'female'),
    (8,  'tuan.doanh@gmail.com',     '0981726354', 'male'),
    (9,  'thao.ngophuong@gmail.com', '0990817263', 'female'),
    (10, 'dat.nguyenhuu@gmail.com',  '0819283746', 'male'),
    (11, 'ngoc.hoangthi@outlook.com','0828374651', 'female'),
    (12, 'hieu.phantrong@gmail.com', '0837465192', 'male'),
    (13, 'chi.trinhmai@gmail.com',    '0846519283', 'female')
) AS v(id, email, phone, gender)
WHERE c.id = v.id;

-- update thoong tin mot so khach hang
UPDATE customer
SET age=19
WHERE id%2 = 0;

-- cap nhat modifyed at modify by
UPDATE customer
SET 
    modified_at= NOW(),
    modified_by= 1;

