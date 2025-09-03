/**
 * Main application entry point - Simple Integration
 */

import { 
  calcLifePath, 
  calcExpression, 
  calcSoulUrge, 
  calcPersonality, 
  calcBirthday, 
  calcMaturity, 
  calcPersonalYear,
  calcPinnaclesChallenges,
  calcKarmicLessons,
  calcPersonalMonth,
  calcPersonalDay,
  calcPersonalCycles,
  calcHiddenPassion,
  calcIntensityNumbers,
  calcPlanesOfExpression,
  calcLifePathPeriods,
  calcCompatibility,
  calcPersonalForecast
} from './numerology.js';

// Import advanced modules
import { CRYSTAL_NUMEROLOGY } from './crystal-numerology.js';
import { COLOR_NUMEROLOGY } from './color-numerology.js';
import { CAREER_NUMEROLOGY } from './career-numerology.js';
import { FENG_SHUI_NUMEROLOGY, COSMIC_CALCULATIONS } from './feng-shui-numerology.js';

import { 
  readOptionsFromUI, 
  renderResults, 
  renderPinnaclesChallenges,
  renderEnhancedFeatures,
  validateForm,
  hideResults,
  setupAccordion,
  setupOptionsToggle,
  toast
} from './ui.js';

/**
 * Calculate all numerology values
 */
function calculateAll(name, date, options) {
  const lifePath = calcLifePath(date, options);
  const expression = calcExpression(name, options);
  const soulUrge = calcSoulUrge(name, options);
  const personality = calcPersonality(name, options);
  const birthday = calcBirthday(date, options);
  const maturity = calcMaturity(lifePath.value, expression.value, options);
  const personalYear = calcPersonalYear(date, new Date(), options);
  
  // Enhanced calculations
  const karmicLessons = calcKarmicLessons(name, options);
  const personalMonth = calcPersonalMonth(date, new Date(), options);
  const personalDay = calcPersonalDay(date, new Date(), options);
  const personalCycles = calcPersonalCycles(date, new Date(), 12, options);
  const hiddenPassion = calcHiddenPassion(name, options);
  const intensityNumbers = calcIntensityNumbers(name, options);
  const planesOfExpression = calcPlanesOfExpression(name, options);
  const lifePathPeriods = calcLifePathPeriods(date, new Date(), options);
  
  // Advanced features
  const crystalInfo = CRYSTAL_NUMEROLOGY[lifePath.value] || {};
  const colorInfo = COLOR_NUMEROLOGY[lifePath.value] || {};
  const careerInfo = CAREER_NUMEROLOGY.life_path_careers[lifePath.value] || {};
  
  // Debug log
  console.log(`Debug Advanced Features:`, {
    lifePathValue: lifePath.value,
    hasColorInfo: !!colorInfo.primary_colors,
    hasCrystalInfo: !!crystalInfo.crystals,
    hasCareerInfo: !!careerInfo.ideal_careers,
    colorData: colorInfo,
    crystalData: crystalInfo,
    careerData: careerInfo
  });
  
  const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const fengShuiNumber = COSMIC_CALCULATIONS.calcPersonalFengShuiNumber(dateString);
  const directionalLuck = COSMIC_CALCULATIONS.calcDirectionalLuck(lifePath.value);
  
  return {
    // Core numbers
    lifePath,
    expression,
    soulUrge,
    personality,
    birthday,
    maturity,
    personalYear,
    
    // Enhanced features
    karmicLessons,
    personalMonth,
    personalDay,
    personalCycles,
    hiddenPassion,
    intensityNumbers,
    planesOfExpression,
    lifePathPeriods,
    
    // Advanced features
    crystalInfo,
    colorInfo,
    careerInfo,
    fengShuiNumber,
    directionalLuck
  };
}

/**
 * Handle form submission
 */
function handleSubmit(event) {
  event.preventDefault();
  
  hideResults();
  
  const validation = validateForm();
  if (!validation) return;
  
  const { selectedName, date } = validation;
  const options = readOptionsFromUI();
  
  try {
    const results = calculateAll(selectedName, date, options);
    
    renderResults(results);
    
    if (options.pinnaclesChallenges) {
      const pinnaclesData = calcPinnaclesChallenges(date, options);
      renderPinnaclesChallenges(pinnaclesData);
    }
    
    renderEnhancedFeatures(results);
    
    // Show advanced features
    showAdvancedFeatures(results);
    
    toast('Tính toán thành công!', 'success');
    
  } catch (error) {
    console.error('Lỗi tính toán:', error);
    toast('Có lỗi xảy ra khi tính toán. Vui lòng thử lại.');
  }
}

/**
 * Show advanced features
 */
function showAdvancedFeatures(results) {
  const advancedContainer = document.getElementById('advanced-features');
  if (!advancedContainer) return;
  
  advancedContainer.innerHTML = `
    <div class="advanced-content">
      <h2>✨ Advanced Features</h2>
      
      <div class="advanced-tabs">
        <div class="tab-buttons">
          <button class="tab-btn active" data-tab="crystal">🔮 Crystal</button>
          <button class="tab-btn" data-tab="color">🌈 Color</button>
          <button class="tab-btn" data-tab="career">💼 Career</button>
          <button class="tab-btn" data-tab="fengshui">🏠 Feng Shui</button>
        </div>
        
        <div class="tab-content">
          <div class="tab-panel active" id="crystal-panel">
            ${renderCrystalContent(results.crystalInfo, results.lifePath.value)}
          </div>
          <div class="tab-panel" id="color-panel">
            ${renderColorContent(results.colorInfo, results.lifePath.value)}
          </div>
          <div class="tab-panel" id="career-panel">
            ${renderCareerContent(results.careerInfo, results.lifePath.value)}
          </div>
          <div class="tab-panel" id="fengshui-panel">
            ${renderFengShuiContent(results.fengShuiNumber, results.directionalLuck)}
          </div>
        </div>
      </div>
    </div>
  `;
  
  setupAdvancedTabs();
  advancedContainer.style.display = 'block';
}

/**
 * Render crystal content
 */
function renderCrystalContent(crystalInfo, lifePathNumber) {
  if (!crystalInfo.crystals) {
    return `<p>🔮 Thông tin crystal cho Life Path ${lifePathNumber} đang được cập nhật...</p>`;
  }
  
  return `
    <div class="crystal-content">
      <h3>🔮 Hướng Dẫn Đá Quý cho Life Path ${lifePathNumber}</h3>
      
      <div class="crystal-grid">
        ${crystalInfo.crystals.map((crystal, index) => `
          <div class="crystal-item">
            <h4>✨ ${crystal}</h4>
            <p><strong>🏷️ Ý nghĩa:</strong> ${crystalInfo.vietnamese?.[index] || crystal}</p>
            <p><strong>🌟 Đặc tính:</strong> ${crystalInfo.properties?.[index] || 'Nâng cao năng lượng tâm linh'}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="chakra-section">
        <h4>🌈 Cân Bằng Chakra</h4>
        <p><strong>🎯 Chakra chính:</strong> ${crystalInfo.chakra || 'Năng lượng vũ trụ'}</p>
        <p><strong>🎨 Màu sắc hỗ trợ:</strong> ${crystalInfo.colors?.join(', ') || 'Đa sắc màu'}</p>
      </div>
      
      <div class="meditation-section">
        <h4>🧘‍♀️ Hướng Dẫn Thiền</h4>
        <p><strong>🎯 Cách thực hành:</strong> ${crystalInfo.meditation || 'Cầm đá quý trong tay khi thiền để tăng cường kết nối tâm linh'}</p>
        <p><strong>📍 Cách sử dụng:</strong> ${crystalInfo.placement || 'Để đá quý ở không gian cá nhân để duy trì năng lượng tích cực'}</p>
        ${crystalInfo.daily_use ? `<p><strong>💡 Sử dụng hàng ngày:</strong> ${crystalInfo.daily_use}</p>` : ''}
        ${crystalInfo.cleansing ? `<p><strong>🌊 Làm sạch năng lượng:</strong> ${crystalInfo.cleansing}</p>` : ''}
      </div>
      
      <div class="compatibility-section">
        <h4>🔗 Tương Thích Số Học</h4>
        <p><strong>✅ Tương thích với:</strong> ${crystalInfo.compatible_numbers?.join(', ') || 'Tất cả các số'}</p>
        <p><strong>⚠️ Nên tránh với:</strong> ${crystalInfo.avoid_with?.join(', ') || 'Không có'}</p>
      </div>
    </div>
  `;
}

/**
 * Render color content
 */
function renderColorContent(colorInfo, lifePathNumber) {
  if (!colorInfo.primary_colors) {
    return `<p>Thông tin color cho Life Path ${lifePathNumber} đang được cập nhật...</p>`;
  }
  
  // Color names mapping
  const colorNames = {
    '#FF0000': 'Đỏ Quyền Lực', '#DC143C': 'Đỏ Thẫm', '#B22222': 'Đỏ Lửa',
    '#FFB6C1': 'Hồng Dịu Dàng', '#FFC0CB': 'Hồng Nhạt', '#F0E68C': 'Vàng Khaki',
    '#FF4500': 'Cam Sáng', '#FF6347': 'Cam Cà Chua', '#FFA500': 'Cam Vàng',
    '#FFFF00': 'Vàng Rực', '#FFD700': 'Vàng Kim', '#F0E68C': 'Vàng Khaki',
    '#008000': 'Xanh Lá', '#32CD32': 'Xanh Lime', '#00FF00': 'Xanh Neon',
    '#0000FF': 'Xanh Dương', '#4169E1': 'Xanh Hoàng Gia', '#1E90FF': 'Xanh Sâu',
    '#800080': 'Tím Đậm', '#9370DB': 'Tím Vàng', '#DDA0DD': 'Tím Nhạt'
  };
  
  return `
    <div class="color-content">
      <h3>🌈 Color Therapy cho Life Path ${lifePathNumber}</h3>
      <div class="color-grid">
        ${colorInfo.primary_colors.map(colorHex => `
          <div class="color-item" style="background: linear-gradient(135deg, ${colorHex} 0%, ${colorHex}AA 100%)">
            <h4>${colorNames[colorHex] || 'Màu Đặc Biệt'}</h4>
            <p style="color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">${colorHex}</p>
          </div>
        `).join('')}
      </div>
      <div class="feng-shui-section">
        <h4>🏠 Feng Shui Applications</h4>
        <p><strong>Direction:</strong> ${colorInfo.feng_shui?.direction || 'Multi-directional'}</p>
        <p><strong>Element:</strong> ${colorInfo.feng_shui?.element || 'Universal'}</p>
        <p><strong>Best Rooms:</strong> ${colorInfo.feng_shui?.best_rooms?.join(', ') || 'Living areas'}</p>
      </div>
      <div class="color-tips">
        <h4>Daily Applications</h4>
        <ul>
          ${colorInfo.psychology?.when_to_use?.map(tip => `<li>${tip}</li>`).join('') || '<li>Use your power colors in clothing and decor</li>'}
        </ul>
      </div>
    </div>
  `;
}

/**
 * Render career content
 */
function renderCareerContent(careerInfo, lifePathNumber) {
  if (!careerInfo.ideal_careers) {
    return `<p>💼 Thông tin nghề nghiệp cho Life Path ${lifePathNumber} đang được cập nhật...</p>`;
  }
  
  return `
    <div class="career-content">
      <h3>💼 Hướng Dẫn Sự Nghiệp cho Life Path ${lifePathNumber}</h3>
      
      <div class="career-section">
        <h4>🎯 Nghề Nghiệp Lý Tưởng</h4>
        <div class="career-tags">
          ${careerInfo.ideal_careers.slice(0, 6).map(career => `
            <span class="career-tag">${career}</span>
          `).join('')}
        </div>
      </div>
      
      <div class="business-section">
        <h4>🏢 Loại Hình Kinh Doanh Phù Hợp</h4>
        <div class="business-grid">
          ${careerInfo.business_types?.slice(0, 4).map(business => `
            <div class="business-item">${business}</div>
          `).join('') || '<div class="business-item">Đa dạng loại hình kinh doanh</div>'}
        </div>
      </div>
      
      <div class="financial-section">
        <h4>💰 Hồ Sơ Tài Chính</h4>
        <div class="financial-grid">
          <div class="financial-item">
            <strong>💾 Xu hướng tiết kiệm:</strong> 
            <p>${careerInfo.money_management?.saving_tendency || 'Cân bằng giữa tiết kiệm và đầu tư'}</p>
          </div>
          <div class="financial-item">
            <strong>📈 Phong cách đầu tư:</strong> 
            <p>${careerInfo.money_management?.investment_style || 'Danh mục đầu tư đa dạng'}</p>
          </div>
        </div>
      </div>
      
      <div class="strengths-section">
        <h4>💪 Điểm Mạnh Tài Chính</h4>
        <ul>
          ${careerInfo.financial_strengths?.slice(0, 3).map(strength => `<li>${strength}</li>`).join('') || '<li>Khả năng quản lý tài chính hiệu quả</li>'}
        </ul>
      </div>
      
      <div class="tips-section">
        <h4>🚀 Lời Khuyên Xây Dựng Tài Sản</h4>
        <ul>
          ${careerInfo.wealth_building_tips?.slice(0, 3).map(tip => `<li>${tip}</li>`).join('') || '<li>Tập trung vào kế hoạch tài chính dài hạn</li>'}
        </ul>
      </div>
    </div>
  `;
}

/**
 * Render feng shui content
 */
function renderFengShuiContent(fengShuiNumber, directionalLuck) {
  // Debug logging
  console.log('🔍 Debug Feng Shui:', {
    fengShuiNumber,
    directionalLuck,
    hasFengShuiData: !!FENG_SHUI_NUMEROLOGY,
    hasHouseAnalysis: !!FENG_SHUI_NUMEROLOGY?.house_number_analysis,
    availableNumbers: Object.keys(FENG_SHUI_NUMEROLOGY?.house_number_analysis || {})
  });

  // Import thông tin số nhà từ FENG_SHUI_NUMEROLOGY
  const houseData = FENG_SHUI_NUMEROLOGY?.house_number_analysis?.[fengShuiNumber];
  
  console.log('🏠 House Data for number', fengShuiNumber, ':', houseData);
  
  if (!houseData) {
    return `
      <div class="fengshui-content">
        <h3>🏠 Phong Thủy & Năng lượng Vũ trụ</h3>
        <p>⚠️ Không tìm thấy dữ liệu phong thủy cho số ${fengShuiNumber}</p>
        <p>📊 Debug: Numbers available: ${Object.keys(FENG_SHUI_NUMEROLOGY?.house_number_analysis || {}).join(', ')}</p>
      </div>
    `;
  }

  return `
    <div class="fengshui-content">
      <h3>🏠 Phong Thủy & Năng lượng Vũ trụ</h3>
      
      <div class="fengshui-number">
        <h4>🔢 Số Phong Thủy Cá nhân: ${fengShuiNumber}</h4>
        <div class="energy-type">
          <strong>⚡ Loại năng lượng:</strong> ${houseData.energy_type}
        </div>
        <div class="personality">
          <strong>🏠 Tính cách ngôi nhà:</strong> ${houseData.personality}
        </div>
        <div class="feng-shui-meaning">
          <strong>🧭 Ý nghĩa phong thủy:</strong> ${houseData.feng_shui_meaning}
        </div>
      </div>

      <div class="house-analysis">
        <div class="best-for">
          <h4>✅ Phù hợp cho:</h4>
          <ul>
            ${houseData.best_for.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="challenges">
          <h4>⚠️ Thách thức:</h4>
          <ul>
            ${houseData.challenges.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="remedies">
          <h4>🔧 Giải pháp phong thủy:</h4>
          <ul>
            ${houseData.feng_shui_remedies.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="colors-elements">
        <div class="lucky-colors">
          <h4>🍀 Màu may mắn:</h4>
          <div class="color-tags">
            ${houseData.lucky_colors.map(color => `<span class="color-tag lucky">${color}</span>`).join('')}
          </div>
        </div>

        <div class="unlucky-colors">
          <h4>🚫 Màu nên tránh:</h4>
          <div class="color-tags">
            ${houseData.unlucky_colors.map(color => `<span class="color-tag unlucky">${color}</span>`).join('')}
          </div>
        </div>

        <div class="element-direction">
          <div class="element">
            <strong>🌟 Ngũ hành:</strong> ${houseData.element}
          </div>
          <div class="direction">
            <strong>🧭 Hướng:</strong> ${houseData.direction}
          </div>
        </div>
      </div>

      <div class="directions">
        <h4>🧭 Hướng May mắn Cá nhân</h4>
        <div class="direction-grid">
          <div class="direction-item best">
            <strong>🎯 Hướng tốt nhất:</strong> ${directionalLuck.best}
          </div>
          <div class="direction-item good">
            <strong>👍 Hướng tốt:</strong> ${directionalLuck.good.join(', ')}
          </div>
          <div class="direction-item avoid">
            <strong>❌ Nên tránh:</strong> ${directionalLuck.avoid}
          </div>
        </div>
      </div>

      <div class="feng-shui-tips">
        <h4>💡 Lời khuyên nhanh</h4>
        <ul>
          <li>🪑 Đặt bàn làm việc hướng ${directionalLuck.best}</li>
          <li>🛏️ Giường ngủ nên hướng một trong các hướng tốt</li>
          <li>🚫 Tránh ngồi quay lưng về hướng ${directionalLuck.avoid}</li>
          <li>🎨 Sử dụng các màu may mắn trong trang trí</li>
          <li>🔧 Áp dụng các giải pháp phong thủy được đề xuất</li>
        </ul>
      </div>
    </div>
  `;
}

/**
 * Setup advanced tabs
 */
function setupAdvancedTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      button.classList.add('active');
      const targetPanel = document.getElementById(`${targetTab}-panel`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/**
 * Initialize application
 */
function init() {
  const form = document.getElementById('numerologyForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
  
  setupAccordion();
  setupOptionsToggle();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
