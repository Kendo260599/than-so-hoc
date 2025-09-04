// Life Pyramid Visualization Component
class LifePyramidVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.calculator = new LifePyramidCalculator();
        this.selectedPosition = null;
        this.currentYear = new Date().getFullYear();
        this.setupEventListeners();
    }

    // Hiển thị kim tự tháp cho ngày sinh
    async displayPyramid(birthDate) {
        try {
            this.showLoading();
            
            // Tính toán kim tự tháp
            const pyramid = await this.calculator.calculateLifePyramid(birthDate);
            
            // Tạo HTML cho kim tự tháp
            const pyramidHTML = this.createPyramidHTML(pyramid, birthDate);
            
            // Hiển thị
            this.container.innerHTML = pyramidHTML;
            
            // Thêm event listeners
            this.attachPositionListeners();
            
            // Highlight giai đoạn hiện tại
            this.highlightCurrentPhase(pyramid, birthDate);
            
        } catch (error) {
            console.error('Lỗi hiển thị kim tự tháp:', error);
            this.showError('Không thể tính toán kim tự tháp. Vui lòng kiểm tra ngày sinh.');
        }
    }

    // Tạo HTML cho kim tự tháp
    createPyramidHTML(pyramid, birthDate) {
        const currentAge = this.calculator.calculateAge(birthDate);
        
        return `
            <div class="life-pyramid-container">
                <h2 class="pyramid-title">
                    <i class="fas fa-eye-of-providence"></i>
                    Kim Tự Tháp Cuộc Đời
                </h2>
                
                <div class="pyramid-structure">
                    ${this.createPyramidLevel(4, pyramid.level4, 'Giai Đoạn Thành Tựu', currentAge)}
                    ${this.createPyramidLevel(3, pyramid.level3, 'Giai Đoạn Phát Triển', currentAge)}
                    ${this.createPyramidLevel(2, pyramid.level2, 'Giai Đoạn Trưởng Thành', currentAge)}
                    ${this.createPyramidLevel(1, pyramid.level1, 'Giai Đoạn Khởi Đầu', currentAge)}
                </div>
                
                <div class="pyramid-connections">
                    ${this.createConnections()}
                </div>
                
                ${this.createAdviceSection(pyramid, currentAge)}
            </div>
        `;
    }

    // Tạo một tầng của kim tự tháp
    createPyramidLevel(level, positions, title, currentAge) {
        const positionsHTML = positions.map(pos => 
            this.createPosition(pos, currentAge)
        ).join('');
        
        return `
            <div class="pyramid-level level-${level}">
                <div class="level-label">${title}</div>
                ${positionsHTML}
            </div>
        `;
    }

    // Tạo một vị trí trong kim tự tháp
    createPosition(position, currentAge) {
        const isCurrent = currentAge >= position.startAge && currentAge <= position.endAge;
        const currentClass = isCurrent ? 'position-current' : '';
        
        return `
            <div class="pyramid-position ${currentClass}" 
                 data-position='${JSON.stringify(position)}'>
                <div class="position-number">${position.number}</div>
                <div class="position-age">Tuổi ${position.startAge} - ${position.endAge}</div>
                <div class="position-year">${position.startYear} - ${position.endYear}</div>
                <div class="position-meaning">${position.meaning}</div>
                <div class="position-energy">${position.energy}</div>
                ${isCurrent ? '<div class="current-indicator">✨ Giai đoạn hiện tại</div>' : ''}
            </div>
        `;
    }

    // Tạo đường kết nối
    createConnections() {
        // Tạo các đường kết nối giữa các tầng
        return `
            <svg class="connection-svg" viewBox="0 0 800 600">
                <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:rgba(255,215,0,0.1);stop-opacity:1" />
                        <stop offset="50%" style="stop-color:rgba(255,215,0,0.6);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:rgba(255,215,0,0.1);stop-opacity:1" />
                    </linearGradient>
                </defs>
                <!-- Đường kết nối sẽ được vẽ bằng JavaScript -->
            </svg>
        `;
    }

    // Tạo phần lời khuyên
    createAdviceSection(pyramid, currentAge) {
        const advice = this.calculator.generateAdvice(pyramid, currentAge);
        
        return `
            <div class="pyramid-advice">
                <h3 class="advice-title">
                    <i class="fas fa-magic"></i>
                    Hướng Dẫn Cuộc Đời
                </h3>
                <div class="advice-text">${advice.main}</div>
                
                <div class="life-lessons">
                    ${advice.lessons.map(lesson => `
                        <div class="lesson-card">
                            <div class="lesson-text">${lesson}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Hiển thị chi tiết vị trí
    showPositionDetails(position) {
        const overlay = document.createElement('div');
        overlay.className = 'details-overlay';
        
        const details = document.createElement('div');
        details.className = 'position-details';
        details.innerHTML = `
            <button class="details-close">&times;</button>
            <h3 class="details-title">Số ${position.number} - Tuổi ${position.startAge}-${position.endAge}</h3>
            
            <div class="details-section">
                <h4>Ý Nghĩa Sâu Sắc</h4>
                <p>${position.meaning}</p>
            </div>
            
            <div class="details-section">
                <h4>Năng Lượng</h4>
                <p>${position.energy}</p>
            </div>
            
            <div class="details-traits">
                <h4>Đặc Điểm Chính</h4>
                <div class="traits-list">
                    ${position.traits.map(trait => `
                        <span class="trait-tag">${trait}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="details-section">
                <h4>Thách Thức</h4>
                <div class="challenges-list">
                    ${position.challenges.map(challenge => `
                        <div class="challenge-item">• ${challenge}</div>
                    `).join('')}
                </div>
            </div>
            
            <div class="details-section">
                <h4>Lời Khuyên</h4>
                <p>${position.advice}</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(details);
        
        // Event listeners cho đóng modal
        overlay.addEventListener('click', () => this.closePositionDetails());
        details.querySelector('.details-close').addEventListener('click', () => this.closePositionDetails());
        
        // ESC key để đóng
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closePositionDetails();
        });
    }

    // Đóng chi tiết vị trí
    closePositionDetails() {
        const overlay = document.querySelector('.details-overlay');
        const details = document.querySelector('.position-details');
        
        if (overlay) overlay.remove();
        if (details) details.remove();
    }

    // Highlight giai đoạn hiện tại
    highlightCurrentPhase(pyramid, birthDate) {
        const currentAge = this.calculator.calculateAge(birthDate);
        
        // Tìm và highlight vị trí hiện tại
        setTimeout(() => {
            const currentPosition = document.querySelector('.position-current');
            if (currentPosition) {
                currentPosition.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 500);
    }

    // Gắn event listeners cho các vị trí
    attachPositionListeners() {
        const positions = this.container.querySelectorAll('.pyramid-position');
        positions.forEach(position => {
            position.addEventListener('click', (e) => {
                const positionData = JSON.parse(e.currentTarget.dataset.position);
                this.showPositionDetails(positionData);
            });
        });
    }

    // Hiển thị loading
    showLoading() {
        this.container.innerHTML = `
            <div class="pyramid-loading">
                <div class="loading-pyramid"></div>
                <p>Đang tính toán kim tự tháp cuộc đời...</p>
            </div>
        `;
    }

    // Hiển thị lỗi
    showError(message) {
        this.container.innerHTML = `
            <div class="pyramid-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
    }

    // Setup event listeners
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePositionDetails();
            }
        });
    }

    // Export kim tự tháp dưới dạng hình ảnh
    async exportPyramidImage() {
        try {
            const canvas = await html2canvas(this.container);
            const link = document.createElement('a');
            link.download = 'kim-tu-thap-cuoc-doi.png';
            link.href = canvas.toDataURL();
            link.click();
        } catch (error) {
            console.error('Lỗi export hình ảnh:', error);
            alert('Không thể xuất hình ảnh. Vui lòng thử lại.');
        }
    }

    // Tạo báo cáo PDF
    async generatePyramidReport(birthDate) {
        try {
            const pyramid = await this.calculator.calculateLifePyramid(birthDate);
            const report = this.calculator.generateDetailedReport(pyramid, birthDate);
            
            // Tạo nội dung PDF
            const pdfContent = this.createPDFContent(report);
            
            // Sử dụng jsPDF để tạo PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            doc.setFont('helvetica');
            doc.setFontSize(16);
            doc.text('Báo Cáo Kim Tự Tháp Cuộc Đời', 20, 20);
            
            // Thêm nội dung báo cáo
            let yPosition = 40;
            pdfContent.forEach(section => {
                doc.setFontSize(12);
                doc.text(section, 20, yPosition);
                yPosition += 10;
                
                if (yPosition > 270) {
                    doc.addPage();
                    yPosition = 20;
                }
            });
            
            doc.save('bao-cao-kim-tu-thap.pdf');
            
        } catch (error) {
            console.error('Lỗi tạo báo cáo:', error);
            alert('Không thể tạo báo cáo. Vui lòng thử lại.');
        }
    }

    // Tạo nội dung PDF
    createPDFContent(report) {
        return [
            `Ngày sinh: ${report.birthDate}`,
            `Tuổi hiện tại: ${report.currentAge}`,
            '',
            'KIM TỰ THÁP CUỘC ĐỜI:',
            ...report.pyramidAnalysis,
            '',
            'GIAI ĐOẠN HIỆN TẠI:',
            report.currentPhase,
            '',
            'DƯỚNG DẪN:',
            ...report.guidance,
            '',
            'DỰ ĐOÁN TƯƠNG LAI:',
            ...report.predictions
        ];
    }
}

// Utility functions
function formatVietnameseDate(date) {
    return new Date(date).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function animateNumber(element, finalNumber, duration = 2000) {
    const startNumber = 0;
    const increment = finalNumber / (duration / 16);
    let currentNumber = startNumber;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentNumber);
    }, 16);
}

// Export cho sử dụng global
window.LifePyramidVisualizer = LifePyramidVisualizer;
