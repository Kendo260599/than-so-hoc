# 🔮 Máy Tính Thần Số Học - Numerology Calculator

[![Deploy to GitHub Pages](https://github.com/USERNAME/REPO/actions/workflows/pages.yml/badge.svg)](https://github.com/USERNAME/REPO/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Một ứng dụng web hoàn chỉnh tính toán các chỉ số thần số học với nhiều trường phái và phương pháp khác nhau. Ứng dụng chạy 100% trên trình duyệt, không cần backend, hỗ trợ tiếng Việt có dấu.

![Máy Tính Thần Số Học Screenshot](docs/screenshot.png)

## ✨ Tính năng chính

### 🔢 Các chỉ số cơ bản
- **Con đường đời (Life Path)** - Hướng đi chính trong cuộc đời
- **Số Mệnh (Expression/Destiny)** - Mục tiêu và sứ mệnh cuộc đời  
- **Khao khát tâm hồn (Soul Urge)** - Những mong muốn sâu thẳm (từ nguyên âm)
- **Tính cách (Personality)** - Hình ảnh bên ngoài (từ phụ âm)
- **Ngày sinh (Birthday)** - Tài năng đặc biệt từ ngày sinh
- **Số trưởng thành (Maturity)** - Mục tiêu cuộc đời sau tuổi 40 (Con đường đời + Số Mệnh)
- **Năm cá nhân (Personal Year)** - Năng lượng của năm hiện tại

### 🎆 Tính năng nâng cao

#### 🔴 Nợ Nghiệp (Karmic Debt)
- **Phát hiện toàn diện**: Tự động tìm số nợ nghiệp trong tất cả các chỉ số cơ bản
- **Chi tiết số 13/14/16/19**: Ý nghĩa, thử thách và cách chữa lành
- **Giải thích tiếng Việt**: Mô tả chi tiết về nguyên nhân và cách khắc phục

#### 🏄 Đỉnh cao & Thử thách nâng cao
- **Timing chính xác**: Tính toán thời gian dựa trên Con đường đời
- **Tuổi hiện tại**: Hiển thị đỉnh cao và thử thách hiện tại
- **Thời gian chuyển đổi**: Biết bao nhiêu năm nữa đến giai đoạn tiếp theo
- **Mô tả chi tiết**: Giải thích rõ về từng giai đoạn cuộc đời

#### 🎆 Bài học Karma (Karmic Lessons)
- **Phân tích số thiếu**: Tìm số không có trong tên (1-9)
- **Bài học chi tiết**: Điểm yếu, bài học cần học, cách phát triển
- **Điểm cân bằng**: Đánh giá độ cân bằng của tên

#### 📅 Chu kỳ cá nhân mở rộng
- **Tháng cá nhân**: Năng lượng và chủ đề của tháng
- **Ngày cá nhân**: Năng lượng hàng ngày cụ thể
- **Chu kỳ 12 tháng**: Xem trước năng lượng cả năm
- **Trạng thái hiện tại**: Thông tin về hôm nay

#### ❤️ Khao khát ẩn giấu (Hidden Passion)
- **Số xuất hiện nhiều nhất**: Phát hiện số chi phối trong tên
- **Tỉ lệ phần trăm**: Đo lường mức độ ảnh hưởng
- **Khao khát & Tài năng**: Mô tả sở thích và khả năng tự nhiên

#### 🔥 Cường độ số (Intensity Numbers)
- **Phân tích cường độ**: Thấp, trung bình, cao, cực cao
- **Số chi phối**: Số có ảnh hưởng mạnh nhất
- **Tác động**: Giải thích ý nghĩa của mức độ cường độ

#### 🎭 Các mặt phản thể hiện (Planes of Expression)
- **4 mặt phản**: Vật lý, Trí tuệ, Cảm xúc, Trực giác
- **Phong cách thể hiện**: Cách bạn thể hiện bản thân ra thế giới
- **Điểm cân bằng**: Đánh giá sự hài hòa giữa các mặt phản
- **Gợi ý phát triển**: Cách cải thiện mặt phản yếu

### ⚙️ Trường phái tính (Schools/Methods)

#### 📊 Hệ thống mapping chữ cái
- **Pythagorean** (mặc định): AJS=1, BKT=2, CLU=3, DMV=4, ENW=5, FOX=6, GPY=7, HQZ=8, IRT=9
- **Chaldean**: Hệ thống Babylon cổ đại

#### 🔤 Xử lý chữ Y
- **Never**: Y luôn là phụ âm
- **Always**: Y luôn là nguyên âm  
- **Conditional** (thông minh): Y là nguyên âm khi nằm giữa hai phụ âm

#### 🛤️ Phương pháp Life Path
- **Segment then Sum**: Rút gọn từng thành phần (năm/tháng/ngày) rồi cộng lại
- **Flat Sum**: Cộng tất cả chữ số của YYYYMMDD rồi rút gọn

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
- **Nợ nghiệp (Karmic Debt)**: Phát hiện số nợ nghiệp (13/14/16/19)
- **Đỉnh cao & Thử thách**: Tính các đỉnh cao và thử thách theo độ tuổi

## 🚀 Chạy cục bộ

### Yêu cầu
- Node.js 16+ 
- NPM hoặc Yarn

### Cài đặt và chạy
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

## 🌐 Deploy lên GitHub Pages

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
├── index.html              # Trang chính
├── README.md               # File này
├── LICENSE                 # MIT License
├── .editorconfig          # Cấu hình editor
├── .gitignore             # Ignore files
├── package.json           # NPM dependencies & scripts
├── src/
│   ├── main.js            # Entry point, khởi tạo app
│   ├── ui.js              # Render components, đọc form
│   ├── numerology.js      # Core thuật toán + options  
│   ├── utils.js           # Helper functions
│   └── styles.css         # CSS dark theme responsive
├── tests/
│   └── numerology.test.js # Jest unit tests
└── .github/workflows/
    └── pages.yml          # GitHub Pages deployment
```

## 🧪 Testing

Dự án có bộ test đầy đủ với Jest, bao phủ:

### ✅ Core Features Testing
- **Mapping variations**: Pythagorean vs Chaldean
- **Y mode handling**: Never/Always/Conditional  
- **Life Path methods**: Segment vs Flat sum
- **Master number preservation**: Global/Final/None
- **Personal Year methods**: Standard vs Birthday switch
- **Karmic debt detection**: 13/14/16/19 numbers
- **Pinnacles & Challenges**: Enhanced timing calculations
- **Vietnamese text handling**: Accents removal
- **Edge cases**: Empty inputs, invalid dates, etc.

### ✨ Enhanced Features Testing
- **Karmic Lessons Calculator**: Missing numbers analysis, balance scoring
- **Personal Cycles**: Monthly, daily, and yearly cycles
- **Hidden Passion Numbers**: Most frequent numbers in name
- **Intensity Analysis**: Letter frequency and distribution patterns
- **Planes of Expression**: Physical, Mental, Emotional, Intuitive analysis
- **Enhanced Pinnacles**: Accurate timing with current age tracking
- **Comprehensive Karmic Debt**: Detection across all core numbers

### 📊 Test Coverage
- **28 test cases** covering all calculation functions
- **Mock testing** for complex interdependent functions
- **Edge case handling** for unusual inputs
- **Vietnamese language support** validation
- **Multiple calculation methods** verification

Chạy `npm test` để xem kết quả chi tiết.

## 📚 Schools/Methods - Giải thích chi tiết

### Mapping Systems
- **Pythagorean**: Hệ thống phổ biến nhất, mỗi chữ cái gán 1-9 theo vị trí alphabet
- **Chaldean**: Hệ thống cổ Babylon, loại bỏ số 9, có cách gán khác biệt

### Y Mode (Cách xử lý chữ Y)
- **Never**: Y coi như consonant (phụ âm) trong mọi trường hợp
- **Always**: Y coi như vowel (nguyên âm) trong mọi trường hợp  
- **Conditional**: Y là nguyên âm chỉ khi đứng giữa hai phụ âm (ví dụ: Lynn, Kyle)

### Life Path Calculation
- **Segment then Sum**: 1990-01-01 → reduce(1990) + reduce(01) + reduce(01) → reduce(total)
- **Flat Sum**: 1990-01-01 → reduce(19900101) trực tiếp

### Master Numbers (11, 22, 33)
- **Global**: Giữ master numbers ở mọi bước reduce  
- **Final only**: Chỉ kiểm tra master ở kết quả cuối
- **None**: Luôn reduce về single digit (1-9)

### Personal Year Calculation
- **Standard**: PY = reduce(birthMonth + birthDay + currentYear)
- **Birthday Switch**: Nếu chưa qua sinh nhật năm nay thì dùng (currentYear - 1)

## ⚠️ Lưu ý quan trọng

- **Tính chất tham khảo**: Thần số học là công cụ mang tính chiêm nghiệm, không nên dựa vào đó để đưa ra quyết định quan trọng trong cuộc sống
- **Bảo mật**: Ứng dụng chạy hoàn toàn offline, không thu thập hay lưu trữ dữ liệu cá nhân
- **Tương thích**: Hỗ trợ mọi trình duyệt hiện đại, responsive trên mobile

## 🛠️ Phát triển

### Thêm tính năng mới
1. Thêm thuật toán vào `src/numerology.js`
2. Cập nhật UI trong `src/ui.js` và `index.html`  
3. Viết tests trong `tests/numerology.test.js`
4. Cập nhật README

### Code Standards
- ES Modules, vanilla JavaScript
- CSS thuần với CSS variables
- JSDoc cho public functions
- Comprehensive test coverage

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết chi tiết.

## 🤝 Đóng góp

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📧 Liên hệ

- Website: [https://USERNAME.github.io/REPO/](https://USERNAME.github.io/REPO/)
- Issues: [https://github.com/USERNAME/REPO/issues](https://github.com/USERNAME/REPO/issues)

---

**Được tầo với ❤️ để khám phá tâm linh và tự khám phá bản thân**