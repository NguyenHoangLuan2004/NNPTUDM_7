# NNPTUD_7 - Product Inventory API

## 1. Cài đặt

```bash
npm install
cp .env.example .env
```

Chỉnh `.env` nếu cần:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/nnptud_7
```

## 2. Chạy project

```bash
npm run dev
```

## 3. API đã làm

### Product
- `POST /api/products` → tạo product, đồng thời tự tạo inventory tương ứng
- `GET /api/products` → lấy danh sách product

### Inventory
- `GET /api/inventories` → lấy toàn bộ inventory, có populate product
- `GET /api/inventories/:id` → lấy inventory theo ID, có populate product
- `POST /api/inventories/add-stock` → tăng stock
- `POST /api/inventories/remove-stock` → giảm stock
- `POST /api/inventories/reservation` → giảm stock, tăng reserved
- `POST /api/inventories/sold` → giảm reserved, tăng soldCount

## 4. Body mẫu

### Tạo product
```json
{
  "name": "IPhone 15 Pro Max",
  "sku": "IP15PM-001",
  "price": 32990000,
  "description": "Bản 256GB"
}
```

### Add stock / Remove stock / Reservation / Sold
```json
{
  "product": "PRODUCT_OBJECT_ID",
  "quantity": 5
}
```

## 5. Gợi ý test trên Postman

1. Tạo product trước.
2. Copy `_id` của product vừa tạo.
3. Gọi `add-stock` để tăng kho.
4. Gọi `remove-stock` để giảm kho.
5. Gọi `reservation` để giữ hàng.
6. Gọi `sold` để chốt bán.
7. Gọi `get all inventories` và `get inventory by id` để kiểm tra.

## 6. Lưu ý

File zip người dùng tải lên đang rỗng, nên phần source này được tạo mới hoàn toàn bên trong thư mục `NNPTUD_7`.
