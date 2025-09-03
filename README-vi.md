# 🔮 Máy Tính Thần Số Học - Numerology Calculator

[![Deploy to GitHub Pages](https://github.com/USERNAME/REPO/actions/workflows/pages.yml/badge.svg)](https://github.com/USERNAME/REPO/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Một ứng dụng web hoàn chỉnh tính toán các chỉ số thần số học với nhiều trường phái và phương pháp khác nhau. Ứng dụng chạy 100% trên trình duyệt, không cần backend, hỗ trợ tiếng Việt có dấu.

![Màn hình Máy Tính Thần Số Học](docs/screenshot.png)

## ✨ Tính năng chính

### 🔢 Các chỉ số được tính
- **Con đường đời (Life Path)** - Hướng đi chính trong cuộc đời
- **Số Mệnh (Expression/Destiny)** - Mục tiêu và sứ mệnh cuộc đời  
- **Khao khát tâm hồn (Soul Urge)** - Những mong muốn sâu thẳm (từ nguyên âm)
- **Tính cách (Personality)** - Hình ảnh bên ngoài (từ phụ âm)
- **Ngày sinh (Birthday)** - Tài năng đặc biệt từ ngày sinh
- **Số trưởng thành (Maturity)** - Mục tiêu cuộc đời sau tuổi 40 (Con đường đời + Số Mệnh)
- **Năm cá nhân (Personal Year)** - Năng lượng của năm hiện tại

### ⚙️ Trường phái tính (Schools/Methods)

#### 📊 Hệ thống mapping chữ cái
- **Pythagorean** (mặc định): AJS=1, BKT=2, CLU=3, DMV=4, ENW=5, FOX=6, GPY=7, HQZ=8, IRT=9
- **Chaldean**: Hệ thống Babylon cổ đại với cách gán số khác biệt

#### 🔤 Xử lý chữ Y
- **Never**: Y luôn được coi là phụ âm
- **Always**: Y luôn được coi là nguyên âm  
- **Conditional** (thông minh): Y là nguyên âm khi nằm giữa hai phụ âm

#### 🛤️ Phương pháp Con đường đời
- **Rút gọn từng phần rồi cộng**: Rút gọn từng thành phần (năm/tháng/ngày) rồi cộng lại
- **Cộng phẳng tất cả**: Cộng tất cả chữ số của YYYYMMDD rồi rút gọn

#### 🔢 Bảo toàn Số Chủ Đạo (11/22/33)
- **Global**: Giữ số chủ đạo ở mọi bước tính
- **Final only**: Chỉ giữ ở kết quả cuối cùng
- **None**: Không bảo toàn, luôn rút gọn về 1 chữ số

#### 📅 Phương pháp Năm cá nhân
- **Chuẩn**: Công thức chuẩn với năm hiện tại
- **Chuyển đổi theo sinh nhật**: Dùng năm trước nếu chưa qua sinh nhật trong năm

#### 📝 Nguồn tên tính toán
- **Tên khai sinh**: Dùng họ tên ghi trong giấy khai sinh
- **Tên hiện tại**: Dùng họ tên đang sử dụng hiện tại

#### 🔍 Tính năng nâng cao
- **Nợ nghiệp (Karmic Debt)**: Phát hiện toàn diện số nợ nghiệp (13/14/16/19) với giải thích chi tiết
- **Đỉnh cao & Thử thách**: Tính toán chính xác timing và trạng thái hiện tại
- **Bài học Karma**: Phân tích số thiếu trong tên và cách phát triển
- **Chu kỳ cá nhân**: Tháng, ngày và chu kỳ hàng năm
- **Khao khát ẩn giấu**: Số xuất hiện nhiều nhất trong tên
- **Phân tích cường độ**: Mức độ ảnh hưởng của từng số
- **Mặt phản thể hiện**: Vật lý, Trí tuệ, Cảm xúc, Trực giác

## 🚀 Hướng dẫn sử dụng

### Yêu cầu hệ thống
- Node.js 16+ 
- NPM hoặc Yarn
- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)

### Cài đặt và chạy cục bộ
```bash
# Clone repository (thay thế với link thực tế)
git clone https://github.com/USERNAME/REPO.git
cd REPO

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Mở trình duyệt và truy cập http://localhost:3000
```

### Chạy tests
```bash
# Chạy unit tests với coverage
npm test

# Chạy tests với watch mode
npm test -- --watch
```

## 🌐 Triển khai lên GitHub Pages

### Cách 1: Tự động với GitHub Actions
1. Fork repository này
2. Vào **Settings** → **Pages**  
3. Chọn **Source**: Deploy from a branch
4. Chọn **Branch**: `main` / (root)
5. Actions sẽ tự động chạy và deploy

### Cách 2: Thủ công
1. Vào **Settings** → **Pages**
2. Chọn **Source**: Deploy from a branch  
3. Chọn **Branch**: `main` / (root)
4. Lưu và đợi vài phút

Ứng dụng sẽ có sẵn tại: `https://USERNAME.github.io/REPO/`

## 🏗️ Cấu trúc dự án

```
.
├── index.html              # Trang chính với form và giao diện
├── README.md               # File hướng dẫn này
├── LICENSE                 # Giấy phép MIT
├── .editorconfig          # Cấu hình editor
├── .gitignore             # Các file được bỏ qua
├── package.json           # Dependencies và scripts
├── src/
│   ├── main.js            # Entry point, khởi tạo ứng dụng
│   ├── ui.js              # Render components, đọc form
│   ├── numerology.js      # Core thuật toán + tùy chọn  
│   ├── utils.js           # Các hàm tiện ích
│   └── styles.css         # CSS dark theme responsive
├── tests/
│   └── simple.test.js     # Jest unit tests
└── .github/workflows/
    └── pages.yml          # GitHub Pages deployment
```

## 🧪 Testing

Dự án có bộ test đầy đủ với Jest, bao phủ:

### ✅ Các tính năng cơ bản
- **Biến thể mapping**: Pythagorean vs Chaldean
- **Xử lý Y mode**: Never/Always/Conditional  
- **Phương pháp Life Path**: Segment vs Flat sum
- **Bảo toàn Master number**: Global/Final/None
- **Phương pháp Personal Year**: Standard vs Birthday switch
- **Phát hiện Karmic debt**: Số 13/14/16/19
- **Pinnacles & Challenges**: Tính toán timing chính xác
- **Xử lý tiếng Việt**: Loại bỏ dấu
- **Edge cases**: Input rỗng, ngày không hợp lệ, v.v.

### ✨ Các tính năng nâng cao
- **Bài học Karma**: Phân tích số thiếu, điểm cân bằng
- **Chu kỳ cá nhân**: Tháng, ngày, chu kỳ hàng năm
- **Khao khát ẩn giấu**: Số xuất hiện nhiều nhất
- **Phân tích cường độ**: Tần suất và phân bố chữ cái
- **Mặt phản thể hiện**: Vật lý, Trí tuệ, Cảm xúc, Trực giác
- **Đỉnh cao nâng cao**: Theo dõi tuổi hiện tại chính xác
- **Nợ nghiệp toàn diện**: Phát hiện trong tất cả các số cơ bản

### 📊 Coverage
- **28 test cases** bao phủ tất cả các hàm tính toán
- **Mock testing** cho các hàm phức tạp
- **Edge case handling** cho input bất thường
- **Hỗ trợ tiếng Việt** kiểm tra

Chạy `npm test` để xem kết quả chi tiết.

## 📚 Trường phái tính - Giải thích chi tiết

### Hệ thống Mapping
- **Pythagorean**: Hệ thống phổ biến nhất, mỗi chữ cái gán 1-9 theo vị trí alphabet
- **Chaldean**: Hệ thống cổ Babylon, loại bỏ số 9, có cách gán khác biệt

### Y Mode (Cách xử lý chữ Y)
- **Never**: Y coi như consonant (phụ âm) trong mọi trường hợp
- **Always**: Y coi như vowel (nguyên âm) trong mọi trường hợp  
- **Conditional**: Y là nguyên âm chỉ khi đứng giữa hai phụ âm (ví dụ: Lynn, Kyle)

### Tính Con đường đời
- **Rút gọn từng phần**: 1990-01-01 → reduce(1990) + reduce(01) + reduce(01) → reduce(total)
- **Cộng phẳng**: 1990-01-01 → reduce(19900101) trực tiếp

### Số Chủ Đạo (11, 22, 33)
- **Global**: Giữ số chủ đạo ở mọi bước reduce  
- **Final only**: Chỉ kiểm tra master ở kết quả cuối
- **None**: Luôn reduce về single digit (1-9)

### Tính Năm cá nhân
- **Chuẩn**: PY = reduce(tháng sinh + ngày sinh + năm hiện tại)
- **Chuyển đổi sinh nhật**: Nếu chưa qua sinh nhật năm nay thì dùng (năm hiện tại - 1)

## 🎯 Cách sử dụng ứng dụng

1. **Nhập thông tin cơ bản**: Họ tên khai sinh, họ tên hiện tại (nếu có), ngày sinh
2. **Tùy chỉnh trường phái**: Click "Hiển thị tùy chọn nâng cao" để điều chỉnh các phương pháp tính
3. **Tính toán**: Click "🔮 Tính các chỉ số" để xem kết quả
4. **Xem giải thích**: Click vào "📚 Giải thích nhanh về các con số" để hiểu ý nghĩa

## ⚠️ Lưu ý quan trọng

- **Tính chất tham khảo**: Thần số học là công cụ mang tính chiêm nghiệm, không nên dựa vào đó để đưa ra quyết định quan trọng trong cuộc sống
- **Bảo mật**: Ứng dụng chạy hoàn toàn offline, không thu thập hay lưu trữ dữ liệu cá nhân
- **Tương thích**: Hỗ trợ mọi trình duyệt hiện đại, responsive trên mobile
- **Tiếng Việt**: Hỗ trợ đầy đủ tiếng Việt có dấu với thuật toán chuẩn hóa NFKD

## 🛠️ Phát triển và đóng góp

### Thêm tính năng mới
1. Thêm thuật toán vào `src/numerology.js`
2. Cập nhật UI trong `src/ui.js` và `index.html`  
3. Viết tests trong `tests/simple.test.js`
4. Cập nhật README

### Tiêu chuẩn code
- ES Modules, vanilla JavaScript
- CSS thuần với CSS variables
- JSDoc cho public functions
- Test coverage cơ bản

## 📄 Giấy phép

MIT License - xem file [LICENSE](LICENSE) để biết chi tiết.

## 🤝 Đóng góp

Rất hoan nghênh các đóng góp! Vui lòng tạo Pull Request.

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/TinhNangMoi`)
3. Commit changes (`git commit -m 'Thêm tính năng mới'`)  
4. Push to branch (`git push origin feature/TinhNangMoi`)
5. Mở Pull Request

## 📞 Liên hệ

- Website: [https://USERNAME.github.io/REPO/](https://USERNAME.github.io/REPO/)
- Issues: [https://github.com/USERNAME/REPO/issues](https://github.com/USERNAME/REPO/issues)

## 🙏 Cảm ơn

Dự án này được tạo ra với mục đích hỗ trợ việc khám phá tâm linh và tự hiểu biết bản thân qua thần số học.

---

**Được tạo với ❤️ để khám phá tâm linh và khám phá bản thân**