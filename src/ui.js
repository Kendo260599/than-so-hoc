/**
 * UI rendering and interaction functions
 */

import { DEFAULT_OPTIONS, getQuickHint, detectAllKarmicDebts, getKarmicDebtInfo } from './numerology.js';

/**
 * Read options from UI form elements
 * @returns {object} Options object for numerology calculations
 */
export function readOptionsFromUI() {
  return {
    mapping: document.getElementById('mapping')?.value || DEFAULT_OPTIONS.mapping,
    yMode: document.getElementById('yMode')?.value || DEFAULT_OPTIONS.yMode,
    lifePathMethod: document.getElementById('lifePathMethod')?.value || DEFAULT_OPTIONS.lifePathMethod,
    preserveMasters: document.getElementById('preserveMasters')?.value || DEFAULT_OPTIONS.preserveMasters,
    personalYearMethod: document.getElementById('personalYearMethod')?.value || DEFAULT_OPTIONS.personalYearMethod,
    nameSource: document.querySelector('input[name="nameSource"]:checked')?.value || DEFAULT_OPTIONS.nameSource,
    karmicDebt: document.getElementById('karmicDebt')?.checked || DEFAULT_OPTIONS.karmicDebt,
    pinnaclesChallenges: document.getElementById('pinnaclesChallenges')?.checked || DEFAULT_OPTIONS.pinnaclesChallenges
  };
}

/**
 * Render calculation results
 * @param {object} results - Calculation results
 */
export function renderResults(results) {
  const resultsContainer = document.getElementById('results');
  if (!resultsContainer) return;
  
  const currentYear = new Date().getFullYear();
  
  // Detect Karmic Debts
  const karmicDebts = detectAllKarmicDebts(results);
  
  resultsContainer.innerHTML = `
    <div class="results-grid">
      <div class="result-card">
        <h3>Con đường đời</h3>
        <div class="result-value">${results.lifePath.label}</div>
        <div class="result-hint">${getQuickHint(results.lifePath.value) || ''}</div>
      </div>
      
      <div class="result-card">
        <h3>Số Mệnh</h3>
        <div class="result-value">${results.expression.label}</div>
        <div class="result-hint">${getQuickHint(results.expression.value) || ''}</div>
      </div>
      
      <div class="result-card">
        <h3>Khao khát tâm hồn</h3>
        <div class="result-value">${results.soulUrge.label}</div>
        <div class="result-hint">${getQuickHint(results.soulUrge.value) || ''}</div>
      </div>
      
      <div class="result-card">
        <h3>Tính cách</h3>
        <div class="result-value">${results.personality.label}</div>
        <div class="result-hint">${getQuickHint(results.personality.value) || ''}</div>
      </div>
      
      <div class="result-card">
        <h3>Ngày sinh</h3>
        <div class="result-value">${results.birthday.label}</div>
        <div class="result-hint">${getQuickHint(results.birthday.value) || ''}</div>
      </div>
      
      <div class="result-card">
        <h3>Số trưởng thành</h3>
        <div class="result-value">${results.maturity.label}</div>
        <div class="result-hint">${getQuickHint(results.maturity.value) || ''}</div>
      </div>
      
      <div class="result-card">
        <h3>Năm cá nhân ${currentYear}</h3>
        <div class="result-value">${results.personalYear}</div>
        <div class="result-hint">${getQuickHint(results.personalYear) || ''}</div>
      </div>
    </div>
    
    ${karmicDebts.length > 0 ? renderKarmicDebtSection(karmicDebts) : ''}
  `;
  
  resultsContainer.style.display = 'block';
}

/**
 * Render Pinnacles and Challenges table
 * @param {object} pinnaclesData - Enhanced pinnacles and challenges data
 */
export function renderPinnaclesChallenges(pinnaclesData) {
  const container = document.getElementById('pinnaclesContainer');
  if (!container) return;
  
  const { pinnacles, challenges, currentAge, currentPinnacle, currentChallenge } = pinnaclesData;
  
  container.innerHTML = `
    <div class="pinnacles-section">
      <h3>Đỉnh cao & Thử thách</h3>
      
      <div class="current-status">
        <div class="status-card pinnacle-status">
          <h4>Hiện tại (Tuổi ${currentAge})</h4>
          <div class="status-info">
            <div class="status-item">
              <span class="status-label">Đỉnh cao hiện tại:</span>
              <span class="status-value">${currentPinnacle.value}</span>
            </div>
            <div class="status-item">
              <span class="status-label">Thử thách hiện tại:</span>
              <span class="status-value">${currentChallenge.value}</span>
            </div>
            <div class="status-item">
              <span class="status-label">Năm trong giai đoạn:</span>
              <span class="status-value">${currentPinnacle.yearsIn} năm</span>
            </div>
            ${currentPinnacle.yearsToNext ? `
              <div class="status-item">
                <span class="status-label">Năm đến giai đoạn tiếp theo:</span>
                <span class="status-value">${currentPinnacle.yearsToNext} năm</span>
              </div>
            ` : '<div class="status-item"><span class="status-note">Đây là giai đoạn cuối cùng</span></div>'}
          </div>
        </div>
      </div>
      
      <div class="pinnacles-grid">
        <div class="pinnacles-table">
          <h4>Đỉnh cao</h4>
          <table>
            <thead>
              <tr>
                <th>Giai đoạn</th>
                <th>Giá trị</th>
                <th>Ý nghĩa</th>
              </tr>
            </thead>
            <tbody>
              ${pinnacles.map((pinnacle, index) => `
                <tr class="${pinnacle.isActive ? 'active-period' : ''}">
                  <td>${pinnacle.period}</td>
                  <td class="pinnacle-value">${pinnacle.number}</td>
                  <td class="pinnacle-hint">${pinnacle.description}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="challenges-table">
          <h4>Thử thách</h4>
          <table>
            <thead>
              <tr>
                <th>Giai đoạn</th>
                <th>Giá trị</th>
                <th>Trọng tâm</th>
              </tr>
            </thead>
            <tbody>
              ${challenges.map((challenge, index) => `
                <tr class="${challenge.isActive ? 'active-period' : ''}">
                  <td>${challenge.period}</td>
                  <td class="challenge-value">${challenge.number}</td>
                  <td class="challenge-hint">${challenge.description}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  container.style.display = 'block';
}

/**
 * Get challenge interpretation hint
 * @param {number} n - Challenge number
 * @returns {string} Challenge interpretation
 */
function getChallengeHint(n) {
  const hints = {
    0: 'Không có thử thách cụ thể - sử dụng trực giác',
    1: 'Phát triển tính độc lập và lãnh đạo',
    2: 'Học cách hợp tác và kiên nhẫn',
    3: 'Thể hiện sáng tạo và giao tiếp',
    4: 'Xây dựng kỷ luật và tổ chức',
    5: 'Tìm cân bằng giữa tự do và trách nhiệm',
    6: 'Cân bằng phục vụ người khác và chăm sóc bản thân',
    7: 'Phát triển lòng tin và trí tuệ nội tại',
    8: 'Cân bằng giá trị vật chất và tâm linh'
  };
  
  return hints[n] || 'Làm việc để phát triển bản thân';
}

/**
 * Show toast message
 * @param {string} message - Message to display
 * @param {string} type - Toast type ('error', 'success', 'info')
 */
export function toast(message, type = 'error') {
  clearToast();
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    clearToast();
  }, 4000);
}

/**
 * Clear any existing toast messages
 */
export function clearToast() {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
}

/**
 * Render Karmic Debt section
 * @param {array} karmicDebts - Array of karmic debt information
 * @returns {string} HTML for karmic debt section
 */
function renderKarmicDebtSection(karmicDebts) {
  return `
    <div class="karmic-debt-section">
      <h3>Nợ Nghiệp được phát hiện</h3>
      <div class="karmic-debt-grid">
        ${karmicDebts.map(debt => `
          <div class="karmic-debt-card">
            <div class="karmic-debt-header">
              <span class="karmic-debt-number">${debt.number}</span>
              <span class="karmic-debt-type">${getNumberTypeName(debt.type)}</span>
            </div>
            <h4>${debt.info.title}</h4>
            <div class="karmic-debt-content">
              <div class="karmic-section">
                <strong>Ý nghĩa:</strong>
                <p>${debt.info.meaning}</p>
              </div>
              <div class="karmic-section">
                <strong>Thử thách:</strong>
                <p>${debt.info.challenge}</p>
              </div>
              <div class="karmic-section">
                <strong>Chữa lành:</strong>
                <p>${debt.info.healing}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Get Vietnamese name for number type
 * @param {string} type - Number type
 * @returns {string} Vietnamese name
 */
function getNumberTypeName(type) {
  const typeNames = {
    lifePath: 'Con đường đời',
    expression: 'Số Mệnh',
    soulUrge: 'Khao khát tâm hồn',
    personality: 'Tính cách',
    birthday: 'Ngày sinh',
    maturity: 'Số trưởng thành'
  };
  return typeNames[type] || type;
}

/**
 * Hide results and pinnacles sections
 */
export function hideResults() {
  const resultsContainer = document.getElementById('results');
  const pinnaclesContainer = document.getElementById('pinnaclesContainer');
  const enhancedContainer = document.getElementById('enhancedContainer');
  const advancedContainer = document.getElementById('advanced-features');
  const pyramidContainer = document.getElementById('lifePyramidContainer');
  
  if (resultsContainer) resultsContainer.style.display = 'none';
  if (pinnaclesContainer) pinnaclesContainer.style.display = 'none';
  if (enhancedContainer) enhancedContainer.style.display = 'none';
  if (advancedContainer) advancedContainer.style.display = 'none';
  if (pyramidContainer) pyramidContainer.classList.add('section-hidden');
}

/**
 * Setup accordion functionality for explanations
 */
export function setupAccordion() {
  const accordionHeader = document.querySelector('.accordion-header');
  const accordionContent = document.querySelector('.accordion-content');
  
  if (accordionHeader && accordionContent) {
    accordionHeader.addEventListener('click', () => {
      accordionContent.classList.toggle('active');
      accordionHeader.classList.toggle('active');
    });
  }
}

/**
 * Setup options panel toggle
 */
export function setupOptionsToggle() {
  const toggleBtn = document.getElementById('optionsToggle');
  const optionsPanel = document.getElementById('optionsPanel');
  
  if (toggleBtn && optionsPanel) {
    toggleBtn.addEventListener('click', () => {
      optionsPanel.classList.toggle('collapsed');
      toggleBtn.textContent = optionsPanel.classList.contains('collapsed') 
        ? 'Hiển thị tùy chọn nâng cao' 
        : 'Ẩn tùy chọn nâng cao';
    });
  }
}

/**
 * Validate form inputs
 * @returns {object|null} Validation result or null if invalid
 */
export function validateForm() {
  console.log('Validating form...');
  
  const birthName = document.getElementById('birthName')?.value.trim();
  const currentName = document.getElementById('currentName')?.value.trim();
  const day = parseInt(document.getElementById('day')?.value);
  const month = parseInt(document.getElementById('month')?.value);
  const year = parseInt(document.getElementById('year')?.value);
  const nameSource = document.querySelector('input[name="nameSource"]:checked')?.value;
  
  console.log('Form values:', { birthName, currentName, day, month, year, nameSource });
  
  // Check name based on source
  const selectedName = nameSource === 'current' ? currentName : birthName;
  if (!selectedName) {
    console.log('Name validation failed');
    toast(`Vui lòng nhập ${nameSource === 'current' ? 'họ tên hiện tại' : 'họ tên khai sinh'}`);
    return null;
  }
  
  // Validate date
  if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
    console.log('Date validation failed');
    toast('Vui lòng nhập ngày sinh hợp lệ');
    return null;
  }
  
  // Check for valid date
  const date = new Date(year, month - 1, day);
  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
    console.log('Date format validation failed');
    toast('Ngày sinh không hợp lệ');
    return null;
  }
  
  console.log('Form validation successful');
  return {
    birthName,
    currentName,
    selectedName,
    date,
    nameSource
  };
}

/**
 * Render enhanced features section
 * @param {object} results - All calculation results
 */
export function renderEnhancedFeatures(results) {
  const container = document.getElementById('enhancedContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div class="enhanced-features">
      ${renderKarmicLessonsSection(results.karmicLessons)}
      ${renderLifePathPeriodsSection(results.lifePathPeriods)}
      ${renderPersonalCyclesSection(results.personalCycles)}
      ${renderHiddenPassionSection(results.hiddenPassion)}
      ${renderIntensitySection(results.intensityNumbers)}
      ${renderPlanesSection(results.planesOfExpression)}
    </div>
  `;
  
  container.style.display = 'block';
}

/**
 * Render Karmic Lessons section
 * @param {object} karmicLessons - Karmic lessons data
 * @returns {string} HTML
 */
function renderKarmicLessonsSection(karmicLessons) {
  if (!karmicLessons.analysis.hasKarmicLessons) {
    return `
      <div class="enhanced-section">
        <h3>🎆 Bài học Karma</h3>
        <div class="no-lessons">
          <p>Chúc mừng! Bạn không có bài học Karma nào cần học.</p>
          <p>Tên của bạn chứa đầy đủ các số từ 1-9.</p>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="enhanced-section">
      <h3>🎆 Bài học Karma (${karmicLessons.analysis.lessonCount} bài học)</h3>
      <div class="lessons-grid">
        ${karmicLessons.karmicLessons.map(lesson => `
          <div class="lesson-card">
            <div class="lesson-header">
              <span class="lesson-number">${lesson.number}</span>
              <h4>${lesson.info.title}</h4>
            </div>
            <div class="lesson-content">
              <div class="lesson-section">
                <strong>Điểm yếu:</strong>
                <p>${lesson.info.weakness}</p>
              </div>
              <div class="lesson-section">
                <strong>Bài học:</strong>
                <p>${lesson.info.lesson}</p>
              </div>
              <div class="lesson-section">
                <strong>Cách phát triển:</strong>
                <p>${lesson.info.development}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Render Personal Cycles section
 * @param {object} personalCycles - Personal cycles data
 * @returns {string} HTML
 */
function renderPersonalCyclesSection(personalCycles) {
  return `
    <div class="enhanced-section">
      <h3>📅 Chu kỳ cá nhân hiện tại</h3>
      <div class="current-cycles">
        <div class="cycle-summary">
          <div class="cycle-item">
            <span class="cycle-label">Năm cá nhân:</span>
            <span class="cycle-value">${personalCycles.overview.currentPersonalYear}</span>
          </div>
          <div class="cycle-item">
            <span class="cycle-label">Tháng cá nhân:</span>
            <span class="cycle-value">${personalCycles.overview.currentPersonalMonth}</span>
          </div>
          <div class="cycle-item">
            <span class="cycle-label">Ngày cá nhân:</span>
            <span class="cycle-value">${personalCycles.overview.currentPersonalDay}</span>
          </div>
        </div>
        
        <div class="current-day-info">
          <h4>Hôm nay (${personalCycles.currentDay.day}/${personalCycles.currentDay.month}/${personalCycles.currentDay.year})</h4>
          <p><strong>Mô tả:</strong> ${personalCycles.currentDay.description}</p>
          <p><strong>Năng lượng:</strong> ${personalCycles.currentDay.energy}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Hidden Passion section
 * @param {object} hiddenPassion - Hidden passion data
 * @returns {string} HTML
 */
function renderHiddenPassionSection(hiddenPassion) {
  return `
    <div class="enhanced-section">
      <h3>❤️ Khao khát ẩn giấu</h3>
      <div class="passion-info">
        <div class="passion-header">
          <span class="passion-numbers">${hiddenPassion.numbers.join(', ')}</span>
          <span class="passion-percentage">${hiddenPassion.percentage}% tên</span>
        </div>
        <div class="passion-descriptions">
          ${hiddenPassion.descriptions.map(desc => `
            <div class="passion-card">
              <h4>Số ${desc.number}</h4>
              <p><strong>Khao khát:</strong> ${desc.description}</p>
              <p><strong>Tài năng:</strong> ${desc.talent}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Intensity Numbers section
 * @param {object} intensityNumbers - Intensity data
 * @returns {string} HTML
 */
function renderIntensitySection(intensityNumbers) {
  return `
    <div class="enhanced-section">
      <h3>🔥 Cường độ số</h3>
      <div class="intensity-analysis">
        ${intensityNumbers.dominantNumber ? `
          <div class="dominant-number">
            <h4>Số chi phối: ${intensityNumbers.dominantNumber.number}</h4>
            <p>${intensityNumbers.dominantNumber.description}</p>
            <p><strong>Tác động:</strong> ${intensityNumbers.dominantNumber.effect}</p>
          </div>
        ` : ''}
        
        <div class="intensity-grid">
          ${intensityNumbers.intensityLevels.slice(0, 5).map(level => `
            <div class="intensity-card ${level.intensity}">
              <div class="intensity-header">
                <span class="intensity-number">${level.number}</span>
                <span class="intensity-percent">${level.percentage}%</span>
              </div>
              <div class="intensity-level">${level.intensity}</div>
              <p>${level.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Planes of Expression section
 * @param {object} planesOfExpression - Planes data
 * @returns {string} HTML
 */
function renderPlanesSection(planesOfExpression) {
  return `
    <div class="enhanced-section">
      <h3>🎭 Các mặt phản thể hiện</h3>
      <div class="planes-analysis">
        <div class="expression-style">
          <h4>Phong cách thể hiện: ${planesOfExpression.expressionStyle}</h4>
          <p>Cân bằng: ${planesOfExpression.balance.assessment} (${planesOfExpression.balance.score}/100)</p>
        </div>
        
        <div class="planes-grid">
          ${planesOfExpression.planes.map(plane => `
            <div class="plane-card ${plane.name}">
              <div class="plane-header">
                <h4>${plane.vietnameseName}</h4>
                <span class="plane-percentage">${plane.percentage}%</span>
              </div>
              <div class="plane-strength">${plane.strength}</div>
              <p class="plane-description">${plane.description}</p>
              <div class="plane-characteristics">
                <strong>Đặc điểm:</strong>
                <ul>
                  ${plane.characteristics.map(char => `<li>${char}</li>`).join('')}
                </ul>
              </div>
              <div class="plane-development">
                <strong>Phát triển:</strong> ${plane.development}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Life Path Periods section
 * @param {object} lifePathPeriods - Life Path Periods data
 * @returns {string} HTML
 */
function renderLifePathPeriodsSection(lifePathPeriods) {
  return `
    <div class="enhanced-section">
      <h3>🗓️ Chu kỳ Con đường đời</h3>
      <div class="life-path-periods">
        <div class="periods-overview">
          <div class="overview-card">
            <h4>Giai đoạn hiện tại (Tuổi ${lifePathPeriods.currentAge})</h4>
            <div class="current-period-info">
              <div class="period-number">Số ${lifePathPeriods.currentPeriod.number}</div>
              <div class="period-phase">${lifePathPeriods.currentPeriod.phase}</div>
              <p class="period-description">${lifePathPeriods.currentPeriod.description}</p>
              <div class="period-stats">
                <span class="stat-item">Năm trong giai đoạn: ${lifePathPeriods.currentPeriod.yearsIn}</span>
                ${lifePathPeriods.currentPeriod.yearsToNext ? 
                  `<span class="stat-item">Năm đến giai đoạn tiếp: ${lifePathPeriods.currentPeriod.yearsToNext}</span>` : 
                  '<span class="stat-item final-period">Giai đoạn cuối cùng</span>'
                }
              </div>
            </div>
          </div>
        </div>
        
        <div class="periods-timeline">
          <h4>Các giai đoạn cuộc đời</h4>
          <div class="timeline-grid">
            ${lifePathPeriods.periods.map(period => `
              <div class="period-card ${period.isActive ? 'active' : ''}">
                <div class="period-header">
                  <span class="period-number-small">${period.number}</span>
                  <span class="period-age">${period.period}</span>
                </div>
                <div class="period-phase-small">${period.phase}</div>
                <p class="period-focus">${period.focus}</p>
                <div class="period-themes">
                  <strong>Chủ đề:</strong>
                  <div class="themes-list">
                    ${period.themes?.map(theme => `<span class="theme-tag">${theme}</span>`).join('') || ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        ${lifePathPeriods.currentPeriod.challenges && lifePathPeriods.currentPeriod.challenges.length > 0 ? `
          <div class="current-guidance">
            <div class="guidance-section">
              <h4>🎯 Thử thách hiện tại</h4>
              <ul class="guidance-list">
                ${lifePathPeriods.currentPeriod.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
              </ul>
            </div>
            
            <div class="guidance-section">
              <h4>🌟 Cơ hội hiện tại</h4>
              <ul class="guidance-list">
                ${lifePathPeriods.currentPeriod.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
              </ul>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}