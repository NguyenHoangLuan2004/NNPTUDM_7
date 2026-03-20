# NNPTUD_7 - Product Inventory API
# Nguyễn Hoàng Luân - 2280601854 
API quản lý kho sản phẩm dùng Node.js, Express.js và MongoDB.

## Chức năng
- Tạo product và tự động tạo inventory tương ứng
- Lấy tất cả inventory
- Lấy inventory theo ID có join product
- Add stock
- Remove stock
- Reservation
- Sold

## Cài đặt
```bash
npm install
copy .env.example .env
File .env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/nnptud_7
Chạy project
npm run dev
API

POST /api/products

GET /api/inventories

GET /api/inventories/:id

POST /api/inventories/add-stock

POST /api/inventories/remove-stock

POST /api/inventories/reservation

POST /api/inventories/sold

Tài liệu

Thư mục docs gồm:

File Word báo cáo test API

File Postman collection

Ảnh chụp test Postman