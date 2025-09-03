/**
 * Advanced Time-based Numerology Analysis System
 */

import { calcPersonalYear, calcPersonalMonth, calcPersonalDay } from './numerology.js';

export const TIME_CYCLES = {
  // 9-Year Personal Cycle Analysis
  PERSONAL_YEAR_CYCLES: {
    1: {
      title: 'Năm Khởi Đầu Mới',
      theme: 'Seed & New Beginnings',
      energy_level: 8,
      focus_areas: ['Khởi nghiệp', 'Dự án mới', 'Tự phát triển', 'Independence'],
      opportunities: [
        'Bắt đầu business mới hoặc career change',
        'Phát triển leadership skills', 
        'Tạo brand cá nhân',
        'Đầu tư vào bản thân'
      ],
      challenges: [
        'Tránh quá impatient với kết quả',
        'Không được quá aggressive',
        'Cân bằng confidence và arrogance',
        'Học cách làm việc độc lập'
      ],
      months_breakdown: {
        power_months: [1, 4, 7, 10], // Tháng có năng lượng mạnh nhất
        planning_months: [2, 5, 8, 11], // Tháng nên lập kế hoạch
        action_months: [3, 6, 9, 12] // Tháng nên hành động
      }
    },

    2: {
      title: 'Năm Hợp Tác & Phát Triển',
      theme: 'Growth & Cooperation',
      energy_level: 5,
      focus_areas: ['Partnership', 'Teamwork', 'Diplomacy', 'Relationships'],
      opportunities: [
        'Xây dựng partnerships mạnh mẽ',
        'Phát triển skills diplomatically',
        'Cải thiện existing relationships',
        'Collaborate trong các dự án lớn'
      ],
      challenges: [
        'Tránh quá dependent vào người khác',
        'Không được passive-aggressive',
        'Cân bằng giving và receiving',
        'Học cách đưa ra decisions với team'
      ],
      months_breakdown: {
        power_months: [2, 6, 11],
        planning_months: [1, 5, 9],
        action_months: [3, 7, 12]
      }
    },

    3: {
      title: 'Năm Sáng Tạo & Biểu Đạt',
      theme: 'Creativity & Expression',
      energy_level: 9,
      focus_areas: ['Art', 'Communication', 'Social', 'Creative projects'],
      opportunities: [
        'Phát triển creative talents',
        'Mở rộng social network',
        'Public speaking, writing',
        'Marketing và promotion'
      ],
      challenges: [
        'Tránh scatter energy quá nhiều projects',
        'Không nên superficial trong relationships',
        'Cân bằng social time và work',
        'Học cách focus vào quality over quantity'
      ],
      months_breakdown: {
        power_months: [3, 6, 9, 12],
        planning_months: [1, 4, 7, 10],
        action_months: [2, 5, 8, 11]
      }
    }

    // ... Continued for years 4-9
  },

  // Detailed Monthly Analysis
  MONTHLY_THEMES: {
    1: { theme: 'Khởi đầu năng lượng', best_activities: ['Goal setting', 'New projects', 'Planning'] },
    2: { theme: 'Xây dựng foundation', best_activities: ['Research', 'Team building', 'Partnerships'] },
    3: { theme: 'Sáng tạo và giao tiếp', best_activities: ['Marketing', 'Social events', 'Creative work'] },
    4: { theme: 'Tổ chức và kỷ luật', best_activities: ['System building', 'Process improvement', 'Detail work'] },
    5: { theme: 'Thay đổi và tự do', best_activities: ['Travel', 'Exploration', 'Flexibility'] },
    6: { theme: 'Trách nhiệm và chăm sóc', best_activities: ['Family time', 'Healing', 'Service'] },
    7: { theme: 'Suy ngẫm và học hỏi', best_activities: ['Study', 'Meditation', 'Research'] },
    8: { theme: 'Thành tựu và quyền lực', best_activities: ['Business deals', 'Financial planning', 'Achievement'] },
    9: { theme: 'Hoàn thành và phục vụ', best_activities: ['Completion', 'Letting go', 'Humanitarian'] },
    11: { theme: 'Trực giác và cảm hứng', best_activities: ['Intuitive work', 'Inspiration', 'Spiritual growth'] },
    22: { theme: 'Master building', best_activities: ['Large projects', 'Vision manifestation', 'Legacy building'] }
  }
};

/**
 * Calculate comprehensive personal forecast
 */
export function calcAdvancedPersonalForecast(birthDate, startDate = new Date(), years = 3) {
  const forecast = {
    current_cycle: {},
    yearly_forecast: [],
    life_transitions: [],
    optimal_timing: {},
    energy_patterns: {}
  };

  // Calculate current personal year cycle
  const currentPersonalYear = calcPersonalYear(birthDate, startDate);
  forecast.current_cycle = {
    personal_year: currentPersonalYear.value,
    cycle_position: `${currentPersonalYear.value}/9`,
    phase: getCyclePhase(currentPersonalYear.value),
    energy_trend: getEnergyTrend(currentPersonalYear.value),
    recommended_focus: TIME_CYCLES.PERSONAL_YEAR_CYCLES[currentPersonalYear.value]?.focus_areas || []
  };

  // Generate yearly forecast
  for (let year = 0; year < years; year++) {
    const forecastDate = new Date(startDate.getFullYear() + year, startDate.getMonth(), startDate.getDate());
    const personalYear = calcPersonalYear(birthDate, forecastDate);
    
    forecast.yearly_forecast.push({
      year: forecastDate.getFullYear(),
      personal_year: personalYear.value,
      theme: TIME_CYCLES.PERSONAL_YEAR_CYCLES[personalYear.value]?.title || `Năm ${personalYear.value}`,
      energy_level: TIME_CYCLES.PERSONAL_YEAR_CYCLES[personalYear.value]?.energy_level || 5,
      key_opportunities: TIME_CYCLES.PERSONAL_YEAR_CYCLES[personalYear.value]?.opportunities.slice(0, 2) || [],
      main_challenges: TIME_CYCLES.PERSONAL_YEAR_CYCLES[personalYear.value]?.challenges.slice(0, 2) || [],
      best_months: TIME_CYCLES.PERSONAL_YEAR_CYCLES[personalYear.value]?.months_breakdown.power_months || []
    });
  }

  return forecast;
}

/**
 * Get current cycle phase
 */
function getCyclePhase(personalYear) {
  if ([1, 2, 3].includes(personalYear)) return 'Giai đoạn Khởi tạo (Creation Phase)';
  if ([4, 5, 6].includes(personalYear)) return 'Giai đoạn Phát triển (Growth Phase)';
  if ([7, 8, 9].includes(personalYear)) return 'Giai đoạn Hoàn thiện (Completion Phase)';
  if (personalYear === 11) return 'Giai đoạn Tâm linh (Spiritual Awakening)';
  if (personalYear === 22) return 'Giai đoạn Master (Master Builder)';
  return 'Giai đoạn Đặc biệt (Special Phase)';
}

/**
 * Get energy trend
 */
function getEnergyTrend(personalYear) {
  const energyMap = { 1: 8, 2: 5, 3: 9, 4: 4, 5: 8, 6: 6, 7: 3, 8: 9, 9: 7, 11: 10, 22: 9 };
  const energy = energyMap[personalYear] || 5;
  
  if (energy >= 8) return 'Năng lượng cao';
  if (energy >= 6) return 'Năng lượng trung bình';
  if (energy >= 4) return 'Năng lượng thấp';
  return 'Năng lượng rất thấp';
}

/**
 * Advanced biorhythm calculation based on birth date
 */
export function calcNumerologyBiorhythm(birthDate, targetDate = new Date()) {
  const daysSinceBirth = Math.floor((targetDate - birthDate) / (24 * 60 * 60 * 1000));
  
  // Numerology-based biorhythm cycles
  const cycles = {
    physical: {
      cycle: 23, // Traditional biorhythm
      numerology_modifier: calcLifePathModifier(birthDate),
      value: Math.sin(2 * Math.PI * daysSinceBirth / 23)
    },
    emotional: {
      cycle: 28,
      numerology_modifier: calcSoulUrgeModifier(birthDate),
      value: Math.sin(2 * Math.PI * daysSinceBirth / 28)
    },
    intellectual: {
      cycle: 33,
      numerology_modifier: calcExpressionModifier(birthDate),
      value: Math.sin(2 * Math.PI * daysSinceBirth / 33)
    },
    spiritual: {
      cycle: calcPersonalSpiritalCycle(birthDate),
      numerology_modifier: 1,
      value: Math.sin(2 * Math.PI * daysSinceBirth / calcPersonalSpiritalCycle(birthDate))
    }
  };

  return {
    date: targetDate,
    cycles: cycles,
    overall_energy: calculateOverallEnergy(cycles),
    best_activities: recommendActivitiesForBiorhythm(cycles),
    warnings: getBiorhythmWarnings(cycles)
  };
}

function calcLifePathModifier(birthDate) {
  // Simplified - would integrate with main numerology functions
  return 1.0;
}

function calcSoulUrgeModifier(birthDate) {
  return 1.0;
}

function calcExpressionModifier(birthDate) {
  return 1.0;
}

function calcPersonalSpiritalCycle(birthDate) {
  // Personal spiritual cycle based on birth date
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  return (day + month) % 20 + 30; // Range from 30-49 days
}

function calculateOverallEnergy(cycles) {
  const avg = Object.values(cycles).reduce((sum, cycle) => sum + cycle.value, 0) / Object.keys(cycles).length;
  return Math.round((avg + 1) * 50); // Convert to 0-100 scale
}

function recommendActivitiesForBiorhythm(cycles) {
  const activities = [];
  
  if (cycles.physical.value > 0.5) activities.push('Tập thể dục cường độ cao');
  if (cycles.emotional.value > 0.5) activities.push('Hoạt động xã hội, hẹn hò');
  if (cycles.intellectual.value > 0.5) activities.push('Học tập, nghiên cứu');
  if (cycles.spiritual.value > 0.5) activities.push('Thiền định, tâm linh');
  
  return activities.length > 0 ? activities : ['Nghỉ ngơi, thư giãn'];
}

function getBiorhythmWarnings(cycles) {
  const warnings = [];
  
  if (cycles.physical.value < -0.5) warnings.push('Tránh hoạt động thể chất nặng');
  if (cycles.emotional.value < -0.5) warnings.push('Cẩn thận trong các mối quan hệ');
  if (cycles.intellectual.value < -0.5) warnings.push('Tránh đưa ra quyết định quan trọng');
  if (cycles.spiritual.value < -0.5) warnings.push('Có thể cảm thấy thiếu định hướng');
  
  return warnings;
}
