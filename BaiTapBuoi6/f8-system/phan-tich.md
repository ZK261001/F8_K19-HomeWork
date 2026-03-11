# Yêu cầu 3

## HOME PAGE

### 1. h1 và h2 đều dùng .title nhưng màu có giống nhau không? Tại sao?

Vì ID #main có độ ưu tiên cao nhất nên cũng không bị ghi đè bởi class .title trong theme.css

## TEACHERS PAGE

Sử dụng Internal CSS override này để ghi đè base.css

```html
<style>
    h3.section {
        color: red;
    }
</style>
```

## ORDERS PAGE

```html
<h2 class="title" id="special" style="color: chocolate;">Danh sach don hang</h2>
```

thẻ h2 trên chịu ảnh hưởng css từ inline, id, class, tag inline > id > class > tag -> inline có độ ưu tiên cao nhất -> thẻ h2 có màu chocolate

# Yêu cầu 6 — Câu hỏi phân tích (bắt buộc)

Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS?

- inline style

Câu 2: Nếu một phần tử HTML có cả h1, .title, và #main cùng set color — selector nào thắng? Tại sao?

- #main

Câu 3: Nếu bạn thêm style="color: pink" trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào?

- phần thử có màu pink

Câu 4: Tại sao theme.css có thể override style từ base.css? Điều kiện để override thành công là gì?

- theme.css override được base.css vì trong file html theme.css được link tới sau và load sau
- Điều kiện để override thành công:
    - Selector có độ ưu tiên bằng hoặc cao hơn
    - File CSS được load sau

Câu 5: Trong project của bạn, có hai phần tử đều dùng class .title nhưng hiển thị màu khác nhau. Giải thích tại sao.

- 1 trong 2 phần từ bị ghi đè bởi một CSS Selector khác mạnh hơn, chi tiết hơn

Câu 6: Phần tử nào trong project của bạn có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích selector nào thắng cuối cùng.

- Phần từ có CSS phức tạp nhất là thẻ h1 trong dashboard/index.html

- Phan tu nay co:
  tag: h1
  class: .title
  id: #special
  css inline: style="color: antiquewhite"

              Quy tac xet do uu tien:
                  Selector thang: inline style
                  Ly do: inline style co do uu tien cao nhat trong CSS

              Mau hien thi cuoi cung: antiquewhite
