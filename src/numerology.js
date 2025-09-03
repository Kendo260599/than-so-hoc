/**
 * Numerology calculation engine with multiple schools and methods
 */

import { digitSum, onlyLetters, isAfterBirthdayThisYear } from './utils.js';

// Letter to number mappings
const PYTHAGOREAN_MAP = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const CHALDEAN_MAP = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
};

// Vowels for Soul Urge calculation
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

// Master numbers
const MASTER_NUMBERS = new Set([11, 22, 33]);

// Karmic debt numbers với detailed meanings
const KARMIC_DEBT_NUMBERS = new Set([13, 14, 16, 19]);

// Karmic debt detailed information
const KARMIC_DEBT_INFO = {
  13: {
    reducedTo: 4,
    title: 'Nợ Nghiệp 13/4 - Lười Biếng và Gia Tăi',
    meaning: 'Trong kiếp trước bạn đã sống lười biếng, để người khác làm việc thay mình',
    challenge: 'Học cách làm việc chăm chỉ, chịu trách nhiệm và không tránh tránh nhiệm vụ',
    healing: 'Thực hành kỷ luật hàng ngày, đặt mục tiêu rõ ràng và kiên trì'
  },
  14: {
    reducedTo: 5,
    title: 'Nợ Nghiệp 14/5 - Lạm Dụng Tự Do',
    meaning: 'Trong kiếp trước bạn đã lạm dụng tự do, đề hướng quá mức',
    challenge: 'Học cách cân bằng giữa tự do và trách nhiệm, kiềm chế bản thân',
    healing: 'Đề hướng điều độ, thiền định để phát triển ý thức'
  },
  16: {
    reducedTo: 7,
    title: 'Nợ Nghiệp 16/7 - Cái Tôi và Kiêu Ngạo',
    meaning: 'Trong kiếp trước bạn đã quá kiêu ngạo, cái tôi quá lớn',
    challenge: 'Học cách khiêm tốn, lắng nghe và phát triển tâm linh',
    healing: 'Thiền định, tự phản tỉnh và phục vụ người khác'
  },
  19: {
    reducedTo: 1,
    title: 'Nợ Nghiệp 19/1 - Lạm Dụng Quyền Lực',
    meaning: 'Trong kiếp trước bạn đã lạm dụng quyền lực, ép buộc người khác',
    challenge: 'Học cách lãnh đạo bằng tấm gương, phục vụ và giúp đỡ người khác',
    healing: 'Thực hành lòng bi, giúp đỡ người khác mà không mong đổi lại'
  }
};

// Karmic Lessons detailed information
const KARMIC_LESSONS_INFO = {
  1: {
    title: 'Thiếu số 1 - Bài học về Lãnh đạo',
    weakness: 'Thiếu tự tin, không dám đưa ra quyết định, quá phụ thuộc vào người khác',
    lesson: 'Phát triển tính độc lập, học cách tự tin và dám chịu trách nhiệm lãnh đạo',
    development: 'Luyện tập đưa ra quyết định nhỏ, tham gia các hoạt động nhóm với vai trò lãnh đạo'
  },
  2: {
    title: 'Thiếu số 2 - Bài học về Hợp tác',
    weakness: 'Khó hợp tác, thiếu kiên nhẫn, không biết lắng nghe và chia sẻ',
    lesson: 'Học cách hợp tác, phát triển kỹ năng ngoại giao và cảm thông với người khác',
    development: 'Tham gia làm việc nhóm, luyện tập lắng nghe, học các kỹ năng giao tiếp'
  },
  3: {
    title: 'Thiếu số 3 - Bài học về Sáng tạo',
    weakness: 'Thiếu sáng tạo, khó biểu đạt cảm xúc, sợ thể hiện bản thân',
    lesson: 'Phát triển khả năng sáng tạo, học cách biểu đạt và giao tiếp hiệu quả',
    development: 'Tham gia các hoạt động nghệ thuật, viết nhật ký, học nói trước đám đông'
  },
  4: {
    title: 'Thiếu số 4 - Bài học về Kỷ luật',
    weakness: 'Thiếu kỷ luật, không có tổ chức, khó kiên trì và hoàn thành công việc',
    lesson: 'Xây dựng kỷ luật, học cách tổ chức và làm việc có hệ thống',
    development: 'Lập kế hoạch chi tiết, thực hành thói quen tốt, học quản lý thời gian'
  },
  5: {
    title: 'Thiếu số 5 - Bài học về Tự do',
    weakness: 'Sợ thay đổi, quá thận trọng, thiếu linh hoạt và sáng tạo',
    lesson: 'Học cách thích ứng với thay đổi, phát triển tính linh hoạt và khám phá',
    development: 'Thử những trải nghiệm mới, du lịch, học kỹ năng mới'
  },
  6: {
    title: 'Thiếu số 6 - Bài học về Trách nhiệm',
    weakness: 'Tránh trách nhiệm gia đình, khó chăm sóc người khác, thiếu lòng từ bi',
    lesson: 'Học cách chăm sóc và phục vụ người khác, phát triển tình yêu thương vô điều kiện',
    development: 'Tham gia công tác từ thiện, chăm sóc gia đình, học về nuôi dạy con'
  },
  7: {
    title: 'Thiếu số 7 - Bài học về Tâm linh',
    weakness: 'Thiếu chiều sâu tâm linh, quá tập trung vào vật chất, không tin tưởng trực giác',
    lesson: 'Phát triển đời sống tâm linh, học cách tin tưởng trực giác và tìm kiếm ý nghĩa sâu xa',
    development: 'Thiền định, đọc sách tâm linh, dành thời gian một mình để suy ngẫm'
  },
  8: {
    title: 'Thiếu số 8 - Bài học về Thành công',
    weakness: 'Sợ quyền lực, thiếu tham vọng, không biết quản lý tiền bạc và nguồn lực',
    lesson: 'Học cách quản lý và sử dụng quyền lực một cách khôn ngoan, phát triển kỹ năng kinh doanh',
    development: 'Học quản lý tài chính, phát triển kỹ năng lãnh đạo, đặt mục tiêu vật chất rõ ràng'
  },
  9: {
    title: 'Thiếu số 9 - Bài học về Nhân đạo',
    weakness: 'Thiếu lòng từ bi, quá ích kỷ, không quan tâm đến nhân loại',
    lesson: 'Phát triển lòng từ bi, học cách phục vụ nhân loại và tha thứ',
    development: 'Tham gia hoạt động từ thiện, học về các vấn đề toàn cầu, thực hành tha thứ'
  }
};

/**
 * Default options for numerology calculations
 */
export const DEFAULT_OPTIONS = {
  mapping: 'pythagorean',           // 'pythagorean' | 'chaldean'
  yMode: 'conditional',             // 'never' | 'always' | 'conditional'
  lifePathMethod: 'segment-then-sum', // 'segment-then-sum' | 'flat-sum'
  preserveMasters: 'global',        // 'global' | 'final-only' | 'none'
  personalYearMethod: 'standard',   // 'standard' | 'birthday-switch'
  nameSource: 'birth',              // 'birth' | 'current'
  karmicDebt: true,                 // boolean
  pinnaclesChallenges: false        // boolean
};

/**
 * Reduce a number according to preservation rules
 * @param {number} n - Number to reduce
 * @param {object} options - Calculation options
 * @returns {number} Reduced number
 */
export function reduceNumber(n, options = DEFAULT_OPTIONS) {
  if (options.preserveMasters === 'none') {
    // Never preserve masters, always reduce to single digit
    while (n >= 10) {
      n = digitSum(n);
    }
    return n;
  }
  
  if (options.preserveMasters === 'global') {
    // Preserve masters at every step
    if (MASTER_NUMBERS.has(n)) {
      return n;
    }
  }
  
  // For 'final-only' and 'global', reduce normally but check masters
  while (n >= 10 && !MASTER_NUMBERS.has(n)) {
    n = digitSum(n);
  }
  
  return n;
}

/**
 * Convert letters to sum based on mapping and mode
 * @param {string} name - Name to convert
 * @param {string} mode - 'all', 'vowel', or 'consonant'
 * @param {object} options - Calculation options
 * @returns {number} Sum of letter values
 */
export function lettersToSum(name, mode = 'all', options = DEFAULT_OPTIONS) {
  const cleanName = onlyLetters(name);
  const mapping = options.mapping === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  
  let sum = 0;
  
  for (let i = 0; i < cleanName.length; i++) {
    const letter = cleanName[i];
    const isVowel = VOWELS.has(letter) || isYVowel(letter, cleanName, i, options.yMode);
    
    if (mode === 'all' || 
        (mode === 'vowel' && isVowel) || 
        (mode === 'consonant' && !isVowel)) {
      sum += mapping[letter] || 0;
    }
  }
  
  return sum;
}

/**
 * Determine if Y should be treated as vowel based on position and mode
 * @param {string} letter - The letter to check
 * @param {string} word - The full word
 * @param {number} index - Position of letter in word
 * @param {string} yMode - Y treatment mode
 * @returns {boolean} True if Y should be treated as vowel
 */
function isYVowel(letter, word, index, yMode) {
  if (letter !== 'Y') return false;
  
  switch (yMode) {
    case 'never':
      return false;
    case 'always':
      return true;
    case 'conditional':
      // Y is vowel if between two consonants
      const prevChar = index > 0 ? word[index - 1] : '';
      const nextChar = index < word.length - 1 ? word[index + 1] : '';
      const prevIsConsonant = prevChar && !VOWELS.has(prevChar) && prevChar !== 'Y';
      const nextIsConsonant = nextChar && !VOWELS.has(nextChar) && nextChar !== 'Y';
      return prevIsConsonant && nextIsConsonant;
    default:
      return false;
  }
}

/**
 * Calculate Life Path number
 * @param {Date|string} date - Birth date
 * @param {object} options - Calculation options
 * @returns {object} Result with value, raw, isKarmic, label
 */
export function calcLifePath(date, options = DEFAULT_OPTIONS) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  
  let raw, value;
  
  if (options.lifePathMethod === 'flat-sum') {
    // Sum all digits directly
    const dateStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
    raw = digitSum(parseInt(dateStr));
    value = reduceNumber(raw, options);
  } else {
    // Segment then sum (default)
    const dayReduced = reduceNumber(day, options);
    const monthReduced = reduceNumber(month, options);
    const yearReduced = reduceNumber(year, options);
    
    raw = dayReduced + monthReduced + yearReduced;
    value = reduceNumber(raw, options);
  }
  
  const isKarmic = options.karmicDebt && KARMIC_DEBT_NUMBERS.has(raw);
  const label = isKarmic ? `KD ${raw}/${value}` : value.toString();
  
  return { value, raw, isKarmic, label };
}

/**
 * Calculate Expression/Destiny number
 * @param {string} name - Full name
 * @param {object} options - Calculation options
 * @returns {object} Result with value, raw, isKarmic, label
 */
export function calcExpression(name, options = DEFAULT_OPTIONS) {
  const raw = lettersToSum(name, 'all', options);
  const value = reduceNumber(raw, options);
  
  const isKarmic = options.karmicDebt && KARMIC_DEBT_NUMBERS.has(raw);
  const label = isKarmic ? `KD ${raw}/${value}` : value.toString();
  
  return { value, raw, isKarmic, label };
}

/**
 * Calculate Soul Urge number (vowels only)
 * @param {string} name - Full name
 * @param {object} options - Calculation options
 * @returns {object} Result with value, raw, isKarmic, label
 */
export function calcSoulUrge(name, options = DEFAULT_OPTIONS) {
  const raw = lettersToSum(name, 'vowel', options);
  const value = reduceNumber(raw, options);
  
  const isKarmic = options.karmicDebt && KARMIC_DEBT_NUMBERS.has(raw);
  const label = isKarmic ? `KD ${raw}/${value}` : value.toString();
  
  return { value, raw, isKarmic, label };
}

/**
 * Calculate Personality number (consonants only)
 * @param {string} name - Full name
 * @param {object} options - Calculation options
 * @returns {object} Result with value, raw, isKarmic, label
 */
export function calcPersonality(name, options = DEFAULT_OPTIONS) {
  const raw = lettersToSum(name, 'consonant', options);
  const value = reduceNumber(raw, options);
  
  const isKarmic = options.karmicDebt && KARMIC_DEBT_NUMBERS.has(raw);
  const label = isKarmic ? `KD ${raw}/${value}` : value.toString();
  
  return { value, raw, isKarmic, label };
}

/**
 * Calculate Birthday number
 * @param {Date|string} date - Birth date
 * @param {object} options - Calculation options
 * @returns {object} Result with value, raw, isKarmic, label
 */
export function calcBirthday(date, options = DEFAULT_OPTIONS) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate();
  
  const raw = day;
  const value = reduceNumber(raw, options);
  
  const isKarmic = options.karmicDebt && KARMIC_DEBT_NUMBERS.has(raw);
  const label = isKarmic ? `KD ${raw}/${value}` : value.toString();
  
  return { value, raw, isKarmic, label };
}

/**
 * Calculate Maturity number (Life Path + Expression)
 * @param {number} lifePathValue - Life Path number
 * @param {number} expressionValue - Expression number
 * @param {object} options - Calculation options
 * @returns {object} Result with value, raw, isKarmic, label
 */
export function calcMaturity(lifePathValue, expressionValue, options = DEFAULT_OPTIONS) {
  const raw = lifePathValue + expressionValue;
  const value = reduceNumber(raw, options);
  
  const isKarmic = options.karmicDebt && KARMIC_DEBT_NUMBERS.has(raw);
  const label = isKarmic ? `KD ${raw}/${value}` : value.toString();
  
  return { value, raw, isKarmic, label };
}

/**
 * Calculate Personal Year number
 * @param {Date|string} dob - Date of birth
 * @param {Date} onDate - Reference date (default: today)
 * @param {object} options - Calculation options
 * @returns {number} Personal Year number
 */
export function calcPersonalYear(dob, onDate = new Date(), options = DEFAULT_OPTIONS) {
  const d = typeof dob === 'string' ? new Date(dob) : dob;
  const birthMonth = d.getMonth() + 1;
  const birthDay = d.getDate();
  
  let year = onDate.getFullYear();
  
  if (options.personalYearMethod === 'birthday-switch') {
    // Use previous year if before birthday
    if (!isAfterBirthdayThisYear(birthMonth, birthDay, onDate)) {
      year--;
    }
  }
  
  const monthReduced = reduceNumber(birthMonth, options);
  const dayReduced = reduceNumber(birthDay, options);
  const yearReduced = reduceNumber(year, options);
  
  return reduceNumber(monthReduced + dayReduced + yearReduced, options);
}

/**
 * Calculate Personal Month number
 * @param {Date|string} dob - Date of birth
 * @param {Date} forDate - Target date for calculation (default: today)
 * @param {object} options - Calculation options
 * @returns {object} Personal Month analysis
 */
export function calcPersonalMonth(dob, forDate = new Date(), options = DEFAULT_OPTIONS) {
  const personalYear = calcPersonalYear(dob, forDate, options);
  const targetMonth = forDate.getMonth() + 1;
  
  const monthReduced = reduceNumber(targetMonth, options);
  const personalMonth = reduceNumber(personalYear + monthReduced, options);
  
  return {
    value: personalMonth,
    personalYear,
    month: targetMonth,
    year: forDate.getFullYear(),
    description: getPersonalMonthDescription(personalMonth),
    theme: getPersonalMonthTheme(personalMonth)
  };
}

/**
 * Calculate Personal Day number
 * @param {Date|string} dob - Date of birth
 * @param {Date} forDate - Target date for calculation (default: today)
 * @param {object} options - Calculation options
 * @returns {object} Personal Day analysis
 */
export function calcPersonalDay(dob, forDate = new Date(), options = DEFAULT_OPTIONS) {
  const personalMonth = calcPersonalMonth(dob, forDate, options);
  const targetDay = forDate.getDate();
  
  const dayReduced = reduceNumber(targetDay, options);
  const personalDay = reduceNumber(personalMonth.value + dayReduced, options);
  
  return {
    value: personalDay,
    personalMonth: personalMonth.value,
    personalYear: personalMonth.personalYear,
    day: targetDay,
    month: personalMonth.month,
    year: personalMonth.year,
    description: getPersonalDayDescription(personalDay),
    energy: getPersonalDayEnergy(personalDay)
  };
}

/**
 * Calculate comprehensive Personal Cycles for multiple periods
 * @param {Date|string} dob - Date of birth
 * @param {Date} fromDate - Start date
 * @param {number} months - Number of months to calculate
 * @param {object} options - Calculation options
 * @returns {object} Complete cycles analysis
 */
export function calcPersonalCycles(dob, fromDate = new Date(), months = 12, options = DEFAULT_OPTIONS) {
  const cycles = [];
  
  for (let i = 0; i < months; i++) {
    const targetDate = new Date(fromDate);
    targetDate.setMonth(targetDate.getMonth() + i);
    
    const monthCycle = calcPersonalMonth(dob, targetDate, options);
    cycles.push({
      ...monthCycle,
      monthName: getVietnameseMonthName(targetDate.getMonth() + 1),
      isCurrentMonth: targetDate.getMonth() === new Date().getMonth() && 
                     targetDate.getFullYear() === new Date().getFullYear()
    });
  }
  
  // Calculate current day if requested
  const today = new Date();
  const currentDay = calcPersonalDay(dob, today, options);
  
  return {
    cycles,
    currentDay,
    overview: {
      currentPersonalYear: cycles[0]?.personalYear,
      currentPersonalMonth: cycles.find(c => c.isCurrentMonth)?.value,
      currentPersonalDay: currentDay.value
    }
  };
}

/**
 * Get Personal Month description
 * @param {number} monthNumber - Personal month number
 * @returns {string} Description
 */
function getPersonalMonthDescription(monthNumber) {
  const descriptions = {
    1: 'Tháng khởi đầu mới - thời điểm tốt để bắt đầu dự án, đặt mục tiêu và hành động',
    2: 'Tháng hợp tác - tập trung vào mối quan hệ, kiên nhẫn và làm việc nhóm',
    3: 'Tháng sáng tạo - thể hiện khả năng nghệ thuật, giao tiếp và kết nối xã hội',
    4: 'Tháng làm việc chăm chỉ - tổ chức, xây dựng nền tảng và hoàn thành công việc',
    5: 'Tháng tự do - khám phá cơ hội mới, du lịch và thay đổi tích cực',
    6: 'Tháng gia đình - chăm sóc người thân, trách nhiệm và cam kết',
    7: 'Tháng tâm linh - tự suy ngẫm, học hỏi và phát triển nội tại',
    8: 'Tháng thành công - tập trung vào sự nghiệp, tài chính và thành tựu',
    9: 'Tháng hoàn thành - kết thúc chu kỳ, tha thứ và chuẩn bị cho giai đoạn mới',
    11: 'Tháng trực giác - nhận được cảm hứng, phát triển khả năng tâm linh',
    22: 'Tháng xây dựng lớn - thực hiện những dự án có tầm ảnh hưởng rộng lớn'
  };
  
  return descriptions[monthNumber] || 'Thời gian phát triển cá nhân';
}

/**
 * Get Personal Month theme
 * @param {number} monthNumber - Personal month number
 * @returns {string} Theme
 */
function getPersonalMonthTheme(monthNumber) {
  const themes = {
    1: 'Khởi đầu & Hành động',
    2: 'Hợp tác & Kiên nhẫn', 
    3: 'Sáng tạo & Giao tiếp',
    4: 'Tổ chức & Xây dựng',
    5: 'Tự do & Thay đổi',
    6: 'Gia đình & Trách nhiệm',
    7: 'Tâm linh & Học hỏi',
    8: 'Thành công & Tài chính',
    9: 'Hoàn thành & Tha thứ',
    11: 'Trực giác & Cảm hứng',
    22: 'Xây dựng & Tầm nhìn lớn'
  };
  
  return themes[monthNumber] || 'Phát triển';
}

/**
 * Get Personal Day description
 * @param {number} dayNumber - Personal day number
 * @returns {string} Description
 */
function getPersonalDayDescription(dayNumber) {
  const descriptions = {
    1: 'Ngày lãnh đạo - khởi xướng ý tưởng mới, hành động quyết đoán',
    2: 'Ngày hợp tác - làm việc nhóm, lắng nghe và hỗ trợ người khác',
    3: 'Ngày sáng tạo - thể hiện bản thân, giao tiếp và vui vẻ',
    4: 'Ngày làm việc - tập trung vào nhiệm vụ, tổ chức và hoàn thành',
    5: 'Ngày tự do - khám phá, gặp gỡ người mới và trải nghiệm',
    6: 'Ngày chăm sóc - quan tâm gia đình, hỗ trợ và phục vụ',
    7: 'Ngày tĩnh lặng - suy ngẫm, học hỏi và phát triển tâm linh',
    8: 'Ngày thành tựu - tập trung vào mục tiêu, kinh doanh và tài chính',
    9: 'Ngày kết thúc - hoàn thành việc dở dang, tha thứ và buông bỏ',
    11: 'Ngày trực giác - nhận cảm hứng, phát triển khả năng tâm linh',
    22: 'Ngày xây dựng - thực hiện dự án lớn với tầm nhìn xa'
  };
  
  return descriptions[dayNumber] || 'Ngày phát triển cá nhân';
}

/**
 * Get Personal Day energy level
 * @param {number} dayNumber - Personal day number
 * @returns {string} Energy description
 */
function getPersonalDayEnergy(dayNumber) {
  const energies = {
    1: 'Năng lượng cao, chủ động',
    2: 'Năng lượng nhẹ nhàng, thụ động',
    3: 'Năng lượng vui vẻ, sáng tạo',
    4: 'Năng lượng ổn định, kiên định',
    5: 'Năng lượng linh hoạt, năng động',
    6: 'Năng lượng nuôi dưỡng, yêu thương',
    7: 'Năng lượng tĩnh lặng, sâu sắc',
    8: 'Năng lượng mạnh mẽ, quyết đoán',
    9: 'Năng lượng hoàn thành, thanh tẩy',
    11: 'Năng lượng trực giác, nhạy cảm',
    22: 'Năng lượng xây dựng, có tầm nhìn'
  };
  
  return energies[dayNumber] || 'Năng lượng cân bằng';
}

/**
 * Get Vietnamese month name
 * @param {number} monthNumber - Month number (1-12)
 * @returns {string} Vietnamese month name
 */
function getVietnameseMonthName(monthNumber) {
  const months = {
    1: 'Tháng Một', 2: 'Tháng Hai', 3: 'Tháng Ba', 4: 'Tháng Tư',
    5: 'Tháng Năm', 6: 'Tháng Sáu', 7: 'Tháng Bảy', 8: 'Tháng Tám',
    9: 'Tháng Chín', 10: 'Tháng Mười', 11: 'Tháng Mười Một', 12: 'Tháng Mười Hai'
  };
  
  return months[monthNumber] || `Tháng ${monthNumber}`;
}

/**
 * Calculate Pinnacles and Challenges with accurate timing
 * @param {Date|string} dob - Date of birth
 * @param {object} options - Calculation options
 * @returns {object} Enhanced pinnacles and challenges with precise timing
 */
export function calcPinnaclesChallenges(dob, options = DEFAULT_OPTIONS) {
  const d = typeof dob === 'string' ? new Date(dob) : dob;
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  
  const M = reduceNumber(month, options);
  const D = reduceNumber(day, options);
  const Y = reduceNumber(year, options);
  
  // Calculate Life Path for timing calculations
  const lifePathRaw = M + D + Y;
  const lifePath = reduceNumber(lifePathRaw, options);
  
  // Calculate Pinnacles
  const P1 = reduceNumber(M + D, options);
  const P2 = reduceNumber(D + Y, options);
  const P3 = reduceNumber(P1 + P2, options);
  const P4 = reduceNumber(M + Y, options);
  
  // Calculate Challenges
  const C1 = Math.abs(M - D);
  const C2 = Math.abs(D - Y);
  const C3 = Math.abs(C1 - C2);
  const C4 = C3; // Fourth challenge is same as third
  
  // Calculate precise timing based on Life Path
  const firstPinnacleEnd = 36 - lifePath;
  const secondPinnacleEnd = firstPinnacleEnd + 9;
  const thirdPinnacleEnd = secondPinnacleEnd + 9;
  
  // Current age calculation
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - year;
  const hasHadBirthdayThisYear = isAfterBirthdayThisYear(month, day);
  const actualAge = hasHadBirthdayThisYear ? currentAge : currentAge - 1;
  
  // Determine current pinnacle and challenge
  let currentPinnacle = 1;
  let currentChallenge = 1;
  let yearsInCurrentPinnacle = actualAge;
  let yearsToNextPinnacle = firstPinnacleEnd - actualAge + 1;
  
  if (actualAge > firstPinnacleEnd) {
    currentPinnacle = 2;
    currentChallenge = 2;
    yearsInCurrentPinnacle = actualAge - firstPinnacleEnd;
    yearsToNextPinnacle = secondPinnacleEnd - actualAge + 1;
  }
  if (actualAge > secondPinnacleEnd) {
    currentPinnacle = 3;
    currentChallenge = 3;
    yearsInCurrentPinnacle = actualAge - secondPinnacleEnd;
    yearsToNextPinnacle = thirdPinnacleEnd - actualAge + 1;
  }
  if (actualAge > thirdPinnacleEnd) {
    currentPinnacle = 4;
    currentChallenge = 4;
    yearsInCurrentPinnacle = actualAge - thirdPinnacleEnd;
    yearsToNextPinnacle = null; // Last pinnacle, no next transition
  }
  
  const pinnacles = [
    {
      number: P1,
      period: `Tuổi 0-${firstPinnacleEnd}`,
      startAge: 0,
      endAge: firstPinnacleEnd,
      isActive: currentPinnacle === 1,
      description: getPinnacleDescription(P1, 1)
    },
    {
      number: P2,
      period: `Tuổi ${firstPinnacleEnd + 1}-${secondPinnacleEnd}`,
      startAge: firstPinnacleEnd + 1,
      endAge: secondPinnacleEnd,
      isActive: currentPinnacle === 2,
      description: getPinnacleDescription(P2, 2)
    },
    {
      number: P3,
      period: `Tuổi ${secondPinnacleEnd + 1}-${thirdPinnacleEnd}`,
      startAge: secondPinnacleEnd + 1,
      endAge: thirdPinnacleEnd,
      isActive: currentPinnacle === 3,
      description: getPinnacleDescription(P3, 3)
    },
    {
      number: P4,
      period: `Tuổi ${thirdPinnacleEnd + 1}+`,
      startAge: thirdPinnacleEnd + 1,
      endAge: null,
      isActive: currentPinnacle === 4,
      description: getPinnacleDescription(P4, 4)
    }
  ];
  
  const challenges = [
    {
      number: C1,
      period: `Tuổi 0-${firstPinnacleEnd}`,
      startAge: 0,
      endAge: firstPinnacleEnd,
      isActive: currentChallenge === 1,
      description: getChallengeDescription(C1, 1)
    },
    {
      number: C2,
      period: `Tuổi ${firstPinnacleEnd + 1}-${secondPinnacleEnd}`,
      startAge: firstPinnacleEnd + 1,
      endAge: secondPinnacleEnd,
      isActive: currentChallenge === 2,
      description: getChallengeDescription(C2, 2)
    },
    {
      number: C3,
      period: `Tuổi ${secondPinnacleEnd + 1}-${thirdPinnacleEnd}`,
      startAge: secondPinnacleEnd + 1,
      endAge: thirdPinnacleEnd,
      isActive: currentChallenge === 3,
      description: getChallengeDescription(C3, 3)
    },
    {
      number: C4,
      period: `Tuổi ${thirdPinnacleEnd + 1}+`,
      startAge: thirdPinnacleEnd + 1,
      endAge: null,
      isActive: currentChallenge === 4,
      description: getChallengeDescription(C4, 4)
    }
  ];
  
  return {
    pinnacles,
    challenges,
    currentAge: actualAge,
    currentPinnacle: {
      number: currentPinnacle,
      value: pinnacles[currentPinnacle - 1].number,
      yearsIn: yearsInCurrentPinnacle,
      yearsToNext: yearsToNextPinnacle
    },
    currentChallenge: {
      number: currentChallenge,
      value: challenges[currentChallenge - 1].number,
      yearsIn: yearsInCurrentPinnacle,
      yearsToNext: yearsToNextPinnacle
    },
    // Legacy format for backward compatibility
    ranges: pinnacles.map(p => p.period)
  };
}

/**
 * Get pinnacle description based on number and period
 * @param {number} pinnacleNumber - The pinnacle number
 * @param {number} period - Which pinnacle period (1-4)
 * @returns {string} Description
 */
function getPinnacleDescription(pinnacleNumber, period) {
  const periodNames = {
    1: 'Kỳ học tập và hình thành',
    2: 'Kỳ phát triển sự nghiệp',
    3: 'Kỳ sáng tạo và thể hiện',
    4: 'Kỳ trưởng thành và di sản'
  };
  
  const descriptions = {
    1: 'Thời kỳ phát triển sự độc lập, lãnh đạo và tiên phong',
    2: 'Thời kỳ học cách hợp tác, kiên nhẫn và ngoại giao',
    3: 'Thời kỳ thể hiện sáng tạo, giao tiếp và nghệ thuật',
    4: 'Thời kỳ xây dựng nền tảng, kỷ luật và làm việc chăm chỉ',
    5: 'Thời kỳ tự do, phiêu lưu và thay đổi',
    6: 'Thời kỳ chăm sóc gia đình, trách nhiệm và phục vụ',
    7: 'Thời kỳ phát triển tâm linh, trí tuệ và tìm kiếm chân lý',
    8: 'Thời kỳ thành công vật chất, kinh doanh và quyền lực',
    9: 'Thời kỳ nhân đạo, hoàn thành và phục vụ nhân loại',
    11: 'Thời kỳ trực giác, cảm hứng và sứ giả tâm linh',
    22: 'Thời kỳ xây dựng thành tựu lớn, thợ xây dựng chuẩn',
    33: 'Thời kỳ thầy dạy chủ đạo, chữa lành và phục vụ nhân từ'
  };
  
  return descriptions[pinnacleNumber] || 'Thời kỳ phát triển bản thân';
}

/**
 * Get challenge description based on number and period
 * @param {number} challengeNumber - The challenge number
 * @param {number} period - Which challenge period (1-4)
 * @returns {string} Description
 */
function getChallengeDescription(challengeNumber, period) {
  const descriptions = {
    0: 'Không có thử thách cụ thể - sử dụng trực giác và chọn lựa cuộc sống',
    1: 'Vượt qua sự phụ thuộc, phát triển tính độc lập và lãnh đạo',
    2: 'Học cách hợp tác, kiên nhẫn và làm việc nhóm hiệu quả',
    3: 'Thể hiện sáng tạo, cải thiện khả năng giao tiếp và biểu đạt',
    4: 'Xây dựng kỷ luật, tổ chức và kiên trì làm việc',
    5: 'Tìm cân bằng giữa tự do và trách nhiệm, tránh lạm dụng',
    6: 'Cân bằng phục vụ người khác và chăm sóc bản thân',
    7: 'Phát triển lòng tin, trí tuệ nội tại và vượt qua sự hoài nghi',
    8: 'Cân bằng giá trị vật chất và tâm linh, tránh tham lâm quyền lực'
  };
  
  return descriptions[challengeNumber] || 'Làm việc để phát triển bản thân';
}

/**
 * Get quick interpretation hint for a number
 * @param {number} n - Number to interpret
 * @returns {string|null} Brief interpretation or null
 */
export function getQuickHint(n) {
  const hints = {
    1: 'Lãnh đạo, độc lập, tinh thần tiên phong',
    2: 'Hợp tác, ngoại giao, hòa giải',
    3: 'Sáng tạo, giao tiếp, biểu đạt nghệ thuật',
    4: 'Làm việc chăm chỉ, tổ chức, xây dựng nền tảng',
    5: 'Tự do, phiêu lưu, thay đổi động',
    6: 'Nuôi dưỡng, trách nhiệm, gia đình và ngôi nhà',
    7: 'Tâm linh, phân tích, trí tuệ nội tại',
    8: 'Thành công vật chất, tài kinh doanh, quyền lực',
    9: 'Nhân đạo, hoàn thành, tình yêu vũ trụ',
    11: 'Trực giác, cảm hứng, sứ giả tâm linh',
    22: 'Thợ xây dựng, nhà tiên tri thực tế, thành tựu quy mô lớn',
    33: 'Thầy dạy chủ đạo, phục vụ nhân từ, chữa lành'
  };
  
  return hints[n] || null;
}

/**
 * Lấy thông tin chi tiết về Karmic Debt number
 * @param {number} karmicNumber - Số nợ nghiệp (13, 14, 16, 19)
 * @returns {object|null} Thông tin chi tiết hoặc null
 */
export function getKarmicDebtInfo(karmicNumber) {
  return KARMIC_DEBT_INFO[karmicNumber] || null;
}

/**
 * Kiểm tra tất cả core numbers có Karmic Debt
 * @param {object} allNumbers - Tất cả các số đã tính
 * @returns {array} Danh sách Karmic Debt được tìm thấy
 */
export function detectAllKarmicDebts(allNumbers) {
  const karmicDebts = [];
  
  // Kiểm tra tất cả các core numbers
  const numbersToCheck = [
    { type: 'lifePath', ...allNumbers.lifePath },
    { type: 'expression', ...allNumbers.expression },
    { type: 'soulUrge', ...allNumbers.soulUrge },
    { type: 'personality', ...allNumbers.personality },
    { type: 'birthday', ...allNumbers.birthday },
    { type: 'maturity', ...allNumbers.maturity }
  ];
  
  numbersToCheck.forEach(number => {
    if (number.isKarmic && KARMIC_DEBT_NUMBERS.has(number.raw)) {
      karmicDebts.push({
        type: number.type,
        number: number.raw,
        reducedTo: number.value,
        info: getKarmicDebtInfo(number.raw)
      });
    }
  });
  
  return karmicDebts;
}

/**
 * Calculate Karmic Lessons from missing numbers in name
 * @param {string} name - Full name to analyze
 * @param {object} options - Calculation options
 * @returns {object} Karmic lessons analysis
 */
export function calcKarmicLessons(name, options = DEFAULT_OPTIONS) {
  const cleanName = onlyLetters(name);
  const mapping = options.mapping === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  
  // Count occurrences of each number 1-9
  const numberCounts = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };
  
  // Count letters mapped to each number
  for (const letter of cleanName) {
    const value = mapping[letter];
    if (value && value >= 1 && value <= 9) {
      numberCounts[value]++;
    }
  }
  
  // Find missing numbers (karmic lessons)
  const missingNumbers = [];
  const presentNumbers = [];
  const intensityNumbers = []; // Numbers with 3+ occurrences
  
  for (let i = 1; i <= 9; i++) {
    if (numberCounts[i] === 0) {
      missingNumbers.push(i);
    } else {
      presentNumbers.push({
        number: i,
        count: numberCounts[i],
        intensity: numberCounts[i] >= 3 ? 'high' : numberCounts[i] === 2 ? 'medium' : 'low'
      });
      
      if (numberCounts[i] >= 3) {
        intensityNumbers.push({
          number: i,
          count: numberCounts[i]
        });
      }
    }
  }
  
  // Get detailed info for karmic lessons
  const karmicLessons = missingNumbers.map(number => ({
    number,
    info: KARMIC_LESSONS_INFO[number]
  }));
  
  return {
    missingNumbers,
    karmicLessons,
    presentNumbers,
    intensityNumbers,
    totalLetters: cleanName.length,
    analysis: {
      hasKarmicLessons: missingNumbers.length > 0,
      lessonCount: missingNumbers.length,
      dominantNumbers: intensityNumbers,
      balanceScore: calculateNameBalance(numberCounts)
    }
  };
}

/**
 * Calculate name balance score based on number distribution
 * @param {object} numberCounts - Count of each number 1-9
 * @returns {object} Balance analysis
 */
function calculateNameBalance(numberCounts) {
  const totalLetters = Object.values(numberCounts).reduce((sum, count) => sum + count, 0);
  const idealCount = totalLetters / 9;
  
  let variance = 0;
  let presentNumbers = 0;
  
  for (let i = 1; i <= 9; i++) {
    if (numberCounts[i] > 0) {
      presentNumbers++;
      variance += Math.pow(numberCounts[i] - idealCount, 2);
    }
  }
  
  const balanceScore = Math.max(0, 100 - (variance / totalLetters * 100));
  
  return {
    score: Math.round(balanceScore),
    presentNumbers,
    missingNumbers: 9 - presentNumbers,
    assessment: balanceScore > 80 ? 'Cân bằng tốt' : 
                balanceScore > 60 ? 'Cân bằng trung bình' : 
                balanceScore > 40 ? 'Mất cân bằng nhẹ' : 'Mất cân bằng nhiều'
  };
}

/**
 * Get detailed information about Karmic Lesson
 * @param {number} lessonNumber - Missing number (1-9)
 * @returns {object|null} Detailed lesson information
 */
export function getKarmicLessonInfo(lessonNumber) {
  return KARMIC_LESSONS_INFO[lessonNumber] || null;
}

/**
 * Calculate Hidden Passion Number
 * @param {string} name - Full name to analyze
 * @param {object} options - Calculation options
 * @returns {object} Hidden Passion analysis
 */
export function calcHiddenPassion(name, options = DEFAULT_OPTIONS) {
  const cleanName = onlyLetters(name);
  const mapping = options.mapping === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  
  // Count occurrences of each number 1-9
  const numberCounts = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };
  
  // Count letters mapped to each number
  for (const letter of cleanName) {
    const value = mapping[letter];
    if (value && value >= 1 && value <= 9) {
      numberCounts[value]++;
    }
  }
  
  // Find the number with highest count (Hidden Passion)
  let maxCount = 0;
  let hiddenPassionNumbers = [];
  
  for (let i = 1; i <= 9; i++) {
    if (numberCounts[i] > maxCount) {
      maxCount = numberCounts[i];
      hiddenPassionNumbers = [i];
    } else if (numberCounts[i] === maxCount && numberCounts[i] > 0) {
      hiddenPassionNumbers.push(i);
    }
  }
  
  return {
    numbers: hiddenPassionNumbers,
    count: maxCount,
    percentage: Math.round((maxCount / cleanName.length) * 100),
    descriptions: hiddenPassionNumbers.map(num => ({
      number: num,
      description: getHiddenPassionDescription(num),
      talent: getHiddenPassionTalent(num)
    }))
  };
}

/**
 * Calculate Intensity Numbers
 * @param {string} name - Full name to analyze  
 * @param {object} options - Calculation options
 * @returns {object} Intensity analysis
 */
export function calcIntensityNumbers(name, options = DEFAULT_OPTIONS) {
  const cleanName = onlyLetters(name);
  const mapping = options.mapping === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  
  // Count occurrences of each number 1-9
  const numberCounts = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };
  
  // Count letters mapped to each number
  for (const letter of cleanName) {
    const value = mapping[letter];
    if (value && value >= 1 && value <= 9) {
      numberCounts[value]++;
    }
  }
  
  // Calculate intensity levels
  const intensityLevels = [];
  const totalLetters = cleanName.length;
  
  for (let i = 1; i <= 9; i++) {
    if (numberCounts[i] > 0) {
      const percentage = (numberCounts[i] / totalLetters) * 100;
      let intensity = 'low';
      
      if (percentage >= 25) intensity = 'extreme';
      else if (percentage >= 15) intensity = 'high';
      else if (percentage >= 8) intensity = 'medium';
      
      intensityLevels.push({
        number: i,
        count: numberCounts[i],
        percentage: Math.round(percentage),
        intensity,
        description: getIntensityDescription(i, intensity),
        effect: getIntensityEffect(i, intensity)
      });
    }
  }
  
  // Sort by count descending
  intensityLevels.sort((a, b) => b.count - a.count);
  
  return {
    intensityLevels,
    highIntensity: intensityLevels.filter(level => level.intensity === 'high' || level.intensity === 'extreme'),
    dominantNumber: intensityLevels[0] || null,
    balanceAnalysis: {
      mostIntense: intensityLevels.slice(0, 3),
      leastPresent: Object.keys(numberCounts)
        .filter(num => numberCounts[num] === 0)
        .map(num => parseInt(num))
    }
  };
}

/**
 * Get Hidden Passion description
 * @param {number} passionNumber - Hidden passion number
 * @returns {string} Description
 */
function getHiddenPassionDescription(passionNumber) {
  const descriptions = {
    1: 'Khao khát lãnh đạo và độc lập - muốn được công nhận và dẫn đầu trong mọi lĩnh vực',
    2: 'Khao khát hài hòa và hợp tác - muốn tạo ra sự cân bằng và giúp đỡ người khác',
    3: 'Khao khát thể hiện sáng tạo - muốn được chú ý và truyền cảm hứng cho người khác',
    4: 'Khao khát xây dựng và tổ chức - muốn tạo ra những thành quả bền vững và đáng tin cậy',
    5: 'Khao khát tự do và phiêu lưu - muốn khám phá và trải nghiệm những điều mới mẻ',
    6: 'Khao khát chăm sóc và phục vụ - muốn được yêu thương và giúp đỡ gia đình, cộng đồng',
    7: 'Khao khát hiểu biết và trí tuệ - muốn tìm hiểu bản chất sâu xa của sự việc',
    8: 'Khao khát thành công và quyền lực - muốn đạt được địa vị cao và thành tựu vật chất',
    9: 'Khao khát phục vụ nhân loại - muốn đóng góp vào việc cải thiện thế giới'
  };
  
  return descriptions[passionNumber] || 'Khao khát phát triển bản thân';
}

/**
 * Get Hidden Passion talent
 * @param {number} passionNumber - Hidden passion number
 * @returns {string} Talent description
 */
function getHiddenPassionTalent(passionNumber) {
  const talents = {
    1: 'Tài năng lãnh đạo, khởi xướng dự án và hướng dẫn người khác',
    2: 'Tài năng ngoại giao, hòa giải xung đột và làm việc nhóm hiệu quả',
    3: 'Tài năng nghệ thuật, giao tiếp và truyền cảm hứng qua lời nói, văn bản',
    4: 'Tài năng tổ chức, quản lý và xây dựng hệ thống bền vững',
    5: 'Tài năng thích ứng, bán hàng và kết nối với nhiều người khác nhau',
    6: 'Tài năng chăm sóc, dạy dỗ và tạo ra môi trường ấm áp',
    7: 'Tài năng nghiên cứu, phân tích và hiểu biết sâu sắc vấn đề',
    8: 'Tài năng kinh doanh, quản lý tài chính và đạt được mục tiêu vật chất',
    9: 'Tài năng tư vấn, hỗ trợ và truyền cảm hứng cho cộng đồng'
  };
  
  return talents[passionNumber] || 'Tài năng đa dạng';
}

/**
 * Get intensity description
 * @param {number} number - Number
 * @param {string} intensity - Intensity level
 * @returns {string} Description
 */
function getIntensityDescription(number, intensity) {
  const baseDescriptions = {
    1: 'Tính cạnh tranh và mong muốn lãnh đạo',
    2: 'Nhu cầu hợp tác và hài hòa',
    3: 'Xu hướng sáng tạo và biểu đạt',
    4: 'Kỷ luật và mong muốn ổn định',
    5: 'Tinh thần phiêu lưu và thích thay đổi',
    6: 'Tính trách nhiệm và mong muốn chăm sóc',
    7: 'Xu hướng tìm hiểu và phân tích',
    8: 'Tham vọng thành công và quyền lực',
    9: 'Lòng nhân đạo và mong muốn giúp đỡ'
  };
  
  const intensityModifiers = {
    low: 'nhẹ',
    medium: 'trung bình',
    high: 'cao',
    extreme: 'rất cao'
  };
  
  return `${baseDescriptions[number]} (độ ${intensityModifiers[intensity]})`;
}

/**
 * Get intensity effect
 * @param {number} number - Number
 * @param {string} intensity - Intensity level
 * @returns {string} Effect description
 */
function getIntensityEffect(number, intensity) {
  if (intensity === 'extreme') {
    return `Có thể trở nên quá cực đoan hoặc mất cân bằng trong khía cạnh này`;
  } else if (intensity === 'high') {
    return `Thể hiện mạnh mẽ những đặc điểm tích cực của số ${number}`;
  } else if (intensity === 'medium') {
    return `Cân bằng tốt trong việc thể hiện đặc điểm của số ${number}`;
  } else {
    return `Thể hiện nhẹ nhàng những đặc điểm của số ${number}`;
  }
}

/**
 * Calculate Planes of Expression
 * @param {string} name - Full name to analyze
 * @param {object} options - Calculation options
 * @returns {object} Planes of Expression analysis
 */
export function calcPlanesOfExpression(name, options = DEFAULT_OPTIONS) {
  const cleanName = onlyLetters(name);
  const mapping = options.mapping === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  
  // Define letter groups for each plane
  const planeLetters = {
    physical: ['D', 'E', 'M', 'W'],     // 4, 5, 4, 5
    mental: ['A', 'H', 'I', 'J', 'N', 'P', 'Q', 'R', 'S', 'T', 'Y'],  // 1, 8, 9, 1, 5, 7, 8, 9, 1, 2, 7
    emotional: ['B', 'C', 'F', 'G', 'L', 'O', 'U', 'V', 'X', 'Z'],    // 2, 3, 6, 7, 3, 6, 3, 4, 6, 8
    intuitive: ['K']  // 2 (11)
  };
  
  // Count letters in each plane
  const planeCounts = {
    physical: 0,
    mental: 0, 
    emotional: 0,
    intuitive: 0
  };
  
  // Calculate letter distribution
  for (const letter of cleanName) {
    if (planeLetters.physical.includes(letter)) {
      planeCounts.physical++;
    } else if (planeLetters.mental.includes(letter)) {
      planeCounts.mental++;
    } else if (planeLetters.emotional.includes(letter)) {
      planeCounts.emotional++;
    } else if (planeLetters.intuitive.includes(letter)) {
      planeCounts.intuitive++;
    }
  }
  
  const totalLetters = cleanName.length;
  
  // Calculate percentages and analysis
  const planes = Object.keys(planeCounts).map(plane => {
    const count = planeCounts[plane];
    const percentage = Math.round((count / totalLetters) * 100);
    
    return {
      name: plane,
      vietnameseName: getPlaneVietnameseName(plane),
      count,
      percentage,
      strength: getPlaneStrength(percentage),
      description: getPlaneDescription(plane, percentage),
      characteristics: getPlaneCharacteristics(plane),
      development: getPlaneDevelopment(plane, percentage)
    };
  });
  
  // Sort by percentage descending
  planes.sort((a, b) => b.percentage - a.percentage);
  
  // Determine dominant and weak planes
  const dominantPlane = planes[0];
  const weakestPlane = planes[planes.length - 1];
  
  return {
    planes,
    dominantPlane,
    weakestPlane,
    balance: calculatePlaneBalance(planes),
    totalLetters,
    expressionStyle: determineExpressionStyle(planes)
  };
}

/**
 * Get Vietnamese name for plane
 * @param {string} plane - Plane name
 * @returns {string} Vietnamese name
 */
function getPlaneVietnameseName(plane) {
  const names = {
    physical: 'Mặt Phản Vật Lý',
    mental: 'Mặt Phản Trí Tuệ',
    emotional: 'Mặt Phản Cảm Xúc',
    intuitive: 'Mặt Phản Trực Giác'
  };
  
  return names[plane] || plane;
}

/**
 * Get plane strength based on percentage
 * @param {number} percentage - Percentage of letters in plane
 * @returns {string} Strength description
 */
function getPlaneStrength(percentage) {
  if (percentage >= 40) return 'rất mạnh';
  if (percentage >= 30) return 'mạnh';
  if (percentage >= 20) return 'trung bình';
  if (percentage >= 10) return 'yếu';
  return 'rất yếu';
}

/**
 * Get plane description based on percentage
 * @param {string} plane - Plane name
 * @param {number} percentage - Percentage
 * @returns {string} Description
 */
function getPlaneDescription(plane, percentage) {
  const descriptions = {
    physical: {
      high: 'Thích thể hiện qua hành động thực tế, làm việc với tay, thể thao hoặc hoạt động ngoài trời',
      medium: 'Cân bằng giữa hoạt động thể chất và tinh thần',
      low: 'Có thể thiếu năng lượng vật lý hoặc không thích hoạt động thể chất'
    },
    mental: {
      high: 'Tiếp cận các vấn đề bằng logic và lý trí, thích phân tích và giải quyết vấn đề',
      medium: 'Cân bằng giữa tư duy logic và cảm xúc',
      low: 'Có thể khó tập trung hoặc thích dựa vào cảm xúc hơn lý trí'
    },
    emotional: {
      high: 'Thể hiện qua cảm xúc, thồng cảm và kết nối sâu sắc với người khác',
      medium: 'Cân bằng cảm xúc tốt, biết kiềm chế',
      low: 'Có thể khó thể hiện cảm xúc hoặc kết nối với người khác'
    },
    intuitive: {
      high: 'Dựa vào trực giác và cảm nhận bên trong, nhạy cảm với năng lượng',
      medium: 'Có khả năng trực giác nhưng không quá phụ thuộc',
      low: 'Có thể ít tin tưởng vào trực giác, thích dựa vào bằng chứng cụ thể'
    }
  };
  
  const level = percentage >= 25 ? 'high' : percentage >= 15 ? 'medium' : 'low';
  return descriptions[plane]?.[level] || 'Đặc điểm của mặt phản này';
}

/**
 * Get plane characteristics
 * @param {string} plane - Plane name
 * @returns {array} Array of characteristics
 */
function getPlaneCharacteristics(plane) {
  const characteristics = {
    physical: [
      'Thích làm việc bằng tay',
      'Năng động thể chất',
      'Thực tế và cụ thể',
      'Kỹ năng thể thao tốt'
    ],
    mental: [
      'Tư duy logic mạnh',
      'Thích phân tích vấn đề',
      'Giao tiếp rõ ràng',
      'Làm việc có hệ thống'
    ],
    emotional: [
      'Nhạy cảm với cảm xúc',
      'Thồng cảm cao',
      'Kết nối sâu sắc',
      'Thể hiện nghệ thuật'
    ],
    intuitive: [
      'Trực giác nhạy bén',
      'Nhạy cảm tâm linh',
      'Sáng tạo độc đáo',
      'Hiểu biết sâu sắc'
    ]
  };
  
  return characteristics[plane] || [];
}

/**
 * Get plane development advice
 * @param {string} plane - Plane name
 * @param {number} percentage - Percentage
 * @returns {string} Development advice
 */
function getPlaneDevelopment(plane, percentage) {
  if (percentage >= 35) {
    // Over-developed
    const advice = {
      physical: 'Hãy cân bằng bằng cách phát triển thêm các mặt phản khác',
      mental: 'Hãy kết nối thêm với cảm xúc và trực giác',
      emotional: 'Hãy học cách kiềm chế cảm xúc bằng lý trí',
      intuitive: 'Hãy áp dụng trực giác vào thực tế cụ thể hơn'
    };
    return advice[plane];
  } else if (percentage < 15) {
    // Under-developed
    const advice = {
      physical: 'Hãy tham gia thêm hoảt động thể chất và thể thao',
      mental: 'Hãy luyện tập tư duy logic và phân tích',
      emotional: 'Hãy học cách thể hiện và kết nối cảm xúc',
      intuitive: 'Hãy phát triển trực giác qua thiền định và suy ngẫm'
    };
    return advice[plane];
  } else {
    return 'Mặt phản này đã cân bằng tốt, tiếp tục duy trì';
  }
}

/**
 * Calculate plane balance score
 * @param {array} planes - Array of plane data
 * @returns {object} Balance analysis
 */
function calculatePlaneBalance(planes) {
  const percentages = planes.map(p => p.percentage);
  const average = percentages.reduce((sum, p) => sum + p, 0) / 4;
  
  // Calculate variance from ideal 25%
  const variance = percentages.reduce((sum, p) => sum + Math.pow(p - 25, 2), 0) / 4;
  const balanceScore = Math.max(0, 100 - (variance * 2));
  
  return {
    score: Math.round(balanceScore),
    assessment: balanceScore > 80 ? 'Rất cân bằng' :
                balanceScore > 60 ? 'Cân bằng tốt' :
                balanceScore > 40 ? 'Cân bằng trung bình' : 'Mất cân bằng',
    variance: Math.round(variance),
    mostDominant: planes[0].vietnameseName,
    leastDeveloped: planes[3].vietnameseName
  };
}

/**
 * Determine expression style based on dominant planes
 * @param {array} planes - Array of plane data
 * @returns {string} Expression style
 */
function determineExpressionStyle(planes) {
  const dominant = planes[0];
  
  const styles = {
    physical: 'Người thực hành - thể hiện qua hành động',
    mental: 'Người tư duy - thể hiện qua lý trí',
    emotional: 'Người cảm xúc - thể hiện qua trái tim',
    intuitive: 'Người trực giác - thể hiện qua cảm nhận'
  };
  
  return styles[dominant.name] || 'Phong cách cân bằng';
}

// Life Path Periods Information
const LIFE_PATH_PERIODS_INFO = {
  1: {
    themes: ['Độc lập', 'Lãnh đạo', 'Khởi đầu', 'Đổi mới'],
    description: 'Thời kỳ phát triển cá tính mạnh mẽ, học cách tự tin và lãnh đạo',
    challenges: ['Tránh quá kiêu ngạo', 'Học cách hợp tác', 'Kiên nhẫn với người khác'],
    opportunities: ['Khởi nghiệp', 'Dẫn dắt dự án', 'Phát triển tài năng cá nhân']
  },
  2: {
    themes: ['Hợp tác', 'Quan hệ', 'Cân bằng', 'Hỗ trợ'],
    description: 'Thời kỳ học cách hợp tác, phát triển các mối quan hệ và kỹ năng ngoại giao',
    challenges: ['Tránh quá nhạy cảm', 'Không mất bản thân', 'Học cách quyết đoán'],
    opportunities: ['Xây dựng mối quan hệ', 'Làm việc nhóm', 'Phát triển tình cảm']
  },
  3: {
    themes: ['Sáng tạo', 'Giao tiếp', 'Vui vẻ', 'Biểu đạt'],
    description: 'Thời kỳ thể hiện sáng tạo, phát triển tài năng giao tiếp và nghệ thuật',
    challenges: ['Tránh phân tán', 'Học cách kỷ luật', 'Không quá hời hợt'],
    opportunities: ['Phát triển nghệ thuật', 'Giao tiếp công chúng', 'Sáng tạo dự án']
  },
  4: {
    themes: ['Xây dựng', 'Kỷ luật', 'Ổn định', 'Thực tế'],
    description: 'Thời kỳ xây dựng nền tảng vững chắc, phát triển kỷ luật và tính thực tế',
    challenges: ['Tránh quá cứng nhắc', 'Học cách linh hoạt', 'Không quá làm việc'],
    opportunities: ['Xây dựng sự nghiệp', 'Tạo hệ thống', 'Phát triển kỹ năng']
  },
  5: {
    themes: ['Tự do', 'Phiêu lưu', 'Thay đổi', 'Trải nghiệm'],
    description: 'Thời kỳ khám phá, trải nghiệm và tìm kiếm tự do cá nhân',
    challenges: ['Tránh bất ổn', 'Học cách cam kết', 'Không quá phóng túng'],
    opportunities: ['Du lịch khám phá', 'Học hỏi mới', 'Mở rộng tầm nhìn']
  },
  6: {
    themes: ['Trách nhiệm', 'Gia đình', 'Phục vụ', 'Chăm sóc'],
    description: 'Thời kỳ tập trung vào gia đình, trách nhiệm và phục vụ cộng đồng',
    challenges: ['Tránh hy sinh quá mức', 'Học cách nói không', 'Cân bằng bản thân'],
    opportunities: ['Xây dựng gia đình', 'Phục vụ cộng đồng', 'Chăm sóc người khác']
  },
  7: {
    themes: ['Tâm linh', 'Học hỏi', 'Suy ngẫm', 'Khám phá'],
    description: 'Thời kỳ phát triển tâm linh, học hỏi sâu sắc và tự suy ngẫm',
    challenges: ['Tránh cô lập', 'Học cách chia sẻ', 'Không quá hoài nghi'],
    opportunities: ['Phát triển tâm linh', 'Nghiên cứu sâu', 'Tìm hiểu bản thân']
  },
  8: {
    themes: ['Thành công', 'Quyền lực', 'Vật chất', 'Quản lý'],
    description: 'Thời kỳ đạt được thành công vật chất, phát triển khả năng lãnh đạo và quản lý',
    challenges: ['Tránh tham lam', 'Cân bằng vật chất-tinh thần', 'Không lạm dụng quyền lực'],
    opportunities: ['Phát triển sự nghiệp', 'Đạt thành công tài chính', 'Lãnh đạo tổ chức']
  },
  9: {
    themes: ['Nhân đạo', 'Phục vụ', 'Hoàn thành', 'Tha thứ'],
    description: 'Thời kỳ phục vụ nhân loại, hoàn thành sứ mệnh và phát triển lòng từ bi',
    challenges: ['Tránh hy sinh thái quá', 'Học cách nhận', 'Không quá lý tưởng hóa'],
    opportunities: ['Phục vụ nhân đạo', 'Hoàn thành mục tiêu', 'Truyền cảm hứng']
  },
  11: {
    themes: ['Trực giác', 'Cảm hứng', 'Tinh thần', 'Dẫn dắt'],
    description: 'Thời kỳ phát triển trực giác mạnh mẽ, truyền cảm hứng và dẫn dắt tinh thần',
    challenges: ['Kiểm soát năng lượng', 'Tránh quá nhạy cảm', 'Cân bằng lý tưởng-thực tế'],
    opportunities: ['Phát triển trực giác', 'Truyền cảm hứng', 'Dẫn dắt tinh thần']
  },
  22: {
    themes: ['Xây dựng', 'Tầm nhìn', 'Thực hiện', 'Di sản'],
    description: 'Thời kỳ biến tầm nhìn thành hiện thực, xây dựng những điều vĩ đại và để lại di sản',
    challenges: ['Quản lý áp lực', 'Kiên nhẫn với tiến trình', 'Không bỏ cuộc'],
    opportunities: ['Xây dựng di sản', 'Thực hiện tầm nhìn', 'Tạo tác động lớn']
  },
  33: {
    themes: ['Dạy dỗ', 'Chữa lành', 'Tình yêu', 'Phục vụ'],
    description: 'Thời kỳ dạy dỗ, chữa lành và phục vụ nhân loại bằng tình yêu vô điều kiện',
    challenges: ['Tránh kiệt sức', 'Cân bằng cho-nhận', 'Giữ ranh giới'],
    opportunities: ['Dạy dỗ người khác', 'Chữa lành', 'Phục vụ với tình yêu']
  }
};

/**
 * Calculate Life Path Periods - cycles based on Life Path number
 * @param {Date} birthDate - Birth date
 * @param {Date} currentDate - Current date (optional)
 * @param {object} options - Calculation options
 * @returns {object} Life Path Periods analysis
 */
export function calcLifePathPeriods(birthDate, currentDate = new Date(), options = DEFAULT_OPTIONS) {
  const lifePathResult = calcLifePath(birthDate, options);
  const lifePathNumber = lifePathResult.value;
  const currentAge = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
  
  // Calculate the three major Life Path Periods
  const birthDay = birthDate.getDate();
  const birthMonth = birthDate.getMonth() + 1;
  const birthYear = birthDate.getFullYear();
  
  // First Period: Birth month reduced
  const firstPeriod = reduceNumber(birthMonth, options);
  
  // Second Period: Birth day reduced  
  const secondPeriod = reduceNumber(birthDay, options);
  
  // Third Period: Birth year reduced
  const thirdPeriod = reduceNumber(birthYear, options);
  
  // Calculate transition ages based on Life Path
  const firstTransition = 36 - lifePathNumber;
  const secondTransition = 36;
  
  // Ensure valid transition ages
  const adjustedFirstTransition = Math.max(firstTransition, 25);
  const adjustedSecondTransition = Math.max(secondTransition, adjustedFirstTransition + 9);
  
  const periods = [
    {
      number: firstPeriod,
      period: `Tuổi 0-${adjustedFirstTransition}`,
      startAge: 0,
      endAge: adjustedFirstTransition,
      isActive: currentAge <= adjustedFirstTransition,
      phase: 'Giai đoạn Hình thành',
      focus: 'Phát triển cá tính và học hỏi cơ bản',
      ...LIFE_PATH_PERIODS_INFO[firstPeriod]
    },
    {
      number: secondPeriod,
      period: `Tuổi ${adjustedFirstTransition + 1}-${adjustedSecondTransition}`,
      startAge: adjustedFirstTransition + 1,
      endAge: adjustedSecondTransition,
      isActive: currentAge > adjustedFirstTransition && currentAge <= adjustedSecondTransition,
      phase: 'Giai đoạn Phát triển',
      focus: 'Xây dựng sự nghiệp và mối quan hệ',
      ...LIFE_PATH_PERIODS_INFO[secondPeriod]
    },
    {
      number: thirdPeriod,
      period: `Tuổi ${adjustedSecondTransition + 1}+`,
      startAge: adjustedSecondTransition + 1,
      endAge: null,
      isActive: currentAge > adjustedSecondTransition,
      phase: 'Giai đoạn Hoàn thiện',
      focus: 'Chia sẻ kinh nghiệm và hoàn thành sứ mệnh',
      ...LIFE_PATH_PERIODS_INFO[thirdPeriod]
    }
  ];
  
  // Find current period
  const currentPeriod = periods.find(p => p.isActive) || periods[periods.length - 1];
  
  // Calculate years in current period and years to next
  let yearsInCurrent = 0;
  let yearsToNext = null;
  
  if (currentPeriod) {
    yearsInCurrent = currentAge - currentPeriod.startAge;
    if (currentPeriod.endAge) {
      yearsToNext = currentPeriod.endAge - currentAge;
    }
  }
  
  return {
    lifePathNumber,
    periods,
    currentAge,
    currentPeriod: {
      number: currentPeriod?.number,
      phase: currentPeriod?.phase,
      yearsIn: Math.max(yearsInCurrent, 0),
      yearsToNext: yearsToNext > 0 ? yearsToNext : null,
      description: currentPeriod?.description,
      themes: currentPeriod?.themes,
      challenges: currentPeriod?.challenges,
      opportunities: currentPeriod?.opportunities
    },
    transitions: {
      firstTransition: adjustedFirstTransition,
      secondTransition: adjustedSecondTransition
    },
    overview: {
      currentPhase: currentPeriod?.phase || 'Giai đoạn Hoàn thiện',
      mainFocus: currentPeriod?.focus || 'Chia sẻ kinh nghiệm và hoàn thành sứ mệnh',
      keyThemes: currentPeriod?.themes || []
    }
  };
}

/**
 * Get Life Path Period information by number
 * @param {number} periodNumber - Period number (1-9, 11, 22, 33)
 * @returns {object|null} Period information
 */
export function getLifePathPeriodInfo(periodNumber) {
  return LIFE_PATH_PERIODS_INFO[periodNumber] || null;
}

// Compatibility Analysis Information
const COMPATIBILITY_INFO = {
  // Life Path Compatibility
  lifePath: {
    1: {
      compatible: [1, 3, 5, 9],
      challenging: [2, 4, 6, 8],
      neutral: [7, 11, 22, 33],
      description: 'Số 1 cần đối tác độc lập, sáng tạo và năng động'
    },
    2: {
      compatible: [2, 4, 6, 8],
      challenging: [1, 3, 5, 9],
      neutral: [7, 11, 22, 33],
      description: 'Số 2 cần đối tác hợp tác, ổn định và cân bằng'
    },
    3: {
      compatible: [1, 3, 5, 9],
      challenging: [2, 4, 6, 8],
      neutral: [7, 11, 22, 33],
      description: 'Số 3 cần đối tác vui vẻ, sáng tạo và giao tiếp tốt'
    },
    4: {
      compatible: [2, 4, 6, 8],
      challenging: [1, 3, 5, 9],
      neutral: [7, 11, 22, 33],
      description: 'Số 4 cần đối tác ổn định, thực tế và có kỷ luật'
    },
    5: {
      compatible: [1, 3, 5, 9],
      challenging: [2, 4, 6, 8],
      neutral: [7, 11, 22, 33],
      description: 'Số 5 cần đối tác linh hoạt, phiêu lưu và tự do'
    },
    6: {
      compatible: [2, 4, 6, 8],
      challenging: [1, 3, 5, 9],
      neutral: [7, 11, 22, 33],
      description: 'Số 6 cần đối tác có trách nhiệm, yêu gia đình và chăm sóc'
    },
    7: {
      compatible: [7, 11, 22, 33],
      challenging: [1, 3, 5, 8],
      neutral: [2, 4, 6, 9],
      description: 'Số 7 cần đối tác sâu sắc, tâm linh và hiểu biết'
    },
    8: {
      compatible: [2, 4, 6, 8],
      challenging: [1, 3, 5, 7, 9],
      neutral: [11, 22, 33],
      description: 'Số 8 cần đối tác tham vọng, thành công và mạnh mẽ'
    },
    9: {
      compatible: [1, 3, 5, 9],
      challenging: [2, 4, 6, 8],
      neutral: [7, 11, 22, 33],
      description: 'Số 9 cần đối tác nhân đạo, rộng lượng và có tầm nhìn'
    },
    11: {
      compatible: [7, 11, 22, 33],
      challenging: [1, 3, 5, 8],
      neutral: [2, 4, 6, 9],
      description: 'Số 11 cần đối tác tinh thần, trực giác và cảm hứng'
    },
    22: {
      compatible: [7, 11, 22, 33],
      challenging: [1, 3, 5],
      neutral: [2, 4, 6, 8, 9],
      description: 'Số 22 cần đối tác có tầm nhìn, thực tế và xây dựng'
    },
    33: {
      compatible: [7, 11, 22, 33],
      challenging: [1, 3, 5, 8],
      neutral: [2, 4, 6, 9],
      description: 'Số 33 cần đối tác yêu thương, phục vụ và chữa lành'
    }
  },

  // Expression Number Compatibility 
  expression: {
    strengths: {
      1: 'Mang lại năng lượng lãnh đạo và khởi xướng',
      2: 'Mang lại sự hợp tác và cân bằng',
      3: 'Mang lại niềm vui và sáng tạo',
      4: 'Mang lại sự ổn định và thực tế',
      5: 'Mang lại sự tự do và phiêu lưu',
      6: 'Mang lại tình yêu và chăm sóc',
      7: 'Mang lại trí tuệ và tâm linh',
      8: 'Mang lại thành công và quyền lực',
      9: 'Mang lại lòng từ bi và nhân đạo',
      11: 'Mang lại trực giác và cảm hứng',
      22: 'Mang lại tầm nhìn và thực hiện',
      33: 'Mang lại tình yêu và chữa lành'
    },
    challenges: {
      1: 'Có thể quá kiểm soát và cạnh tranh',
      2: 'Có thể quá nhạy cảm và phụ thuộc',
      3: 'Có thể quá phân tán và hời hợt',
      4: 'Có thể quá cứng nhắc và nghiêm khắc',
      5: 'Có thể quá bất ổn và thiếu cam kết',
      6: 'Có thể quá can thiệp và hy sinh',
      7: 'Có thể quá lạnh lùng và xa cách',
      8: 'Có thể quá vật chất và áp lực',
      9: 'Có thể quá lý tưởng và hy sinh',
      11: 'Có thể quá nhạy cảm và căng thẳng',
      22: 'Có thể quá áp lực và hoàn hảo',
      33: 'Có thể quá hy sinh và kiệt sức'
    }
  }
};

/**
 * Calculate compatibility between two people
 * @param {object} person1 - First person's numerology data
 * @param {object} person2 - Second person's numerology data
 * @param {object} options - Calculation options
 * @returns {object} Compatibility analysis
 */
export function calcCompatibility(person1, person2, options = DEFAULT_OPTIONS) {
  // Calculate core numbers for both people
  const p1 = {
    name: person1.name,
    lifePath: calcLifePath(person1.birthDate, options),
    expression: calcExpression(person1.name, options),
    soulUrge: calcSoulUrge(person1.name, options),
    personality: calcPersonality(person1.name, options),
    birthday: calcBirthday(person1.birthDate, options)
  };
  
  const p2 = {
    name: person2.name,
    lifePath: calcLifePath(person2.birthDate, options),
    expression: calcExpression(person2.name, options),
    soulUrge: calcSoulUrge(person2.name, options),
    personality: calcPersonality(person2.name, options),
    birthday: calcBirthday(person2.birthDate, options)
  };
  
  // Analyze Life Path compatibility
  const lifePathCompat = analyzeLifePathCompatibility(p1.lifePath.value, p2.lifePath.value);
  
  // Analyze Expression compatibility
  const expressionCompat = analyzeExpressionCompatibility(p1.expression.value, p2.expression.value);
  
  // Analyze Soul Urge compatibility
  const soulUrgeCompat = analyzeSoulUrgeCompatibility(p1.soulUrge.value, p2.soulUrge.value);
  
  // Analyze Personality compatibility
  const personalityCompat = analyzePersonalityCompatibility(p1.personality.value, p2.personality.value);
  
  // Calculate overall compatibility score
  const overallScore = calculateOverallCompatibility([
    lifePathCompat.score,
    expressionCompat.score,
    soulUrgeCompat.score,
    personalityCompat.score
  ]);
  
  return {
    person1: p1,
    person2: p2,
    compatibility: {
      overall: {
        score: overallScore,
        rating: getCompatibilityRating(overallScore),
        description: getOverallDescription(overallScore)
      },
      lifePath: lifePathCompat,
      expression: expressionCompat,
      soulUrge: soulUrgeCompat,
      personality: personalityCompat
    },
    strengths: identifyRelationshipStrengths(p1, p2),
    challenges: identifyRelationshipChallenges(p1, p2),
    advice: generateRelationshipAdvice(p1, p2, overallScore)
  };
}

/**
 * Analyze Life Path compatibility
 * @param {number} lp1 - Person 1's Life Path
 * @param {number} lp2 - Person 2's Life Path  
 * @returns {object} Compatibility analysis
 */
function analyzeLifePathCompatibility(lp1, lp2) {
  const info1 = COMPATIBILITY_INFO.lifePath[lp1];
  const info2 = COMPATIBILITY_INFO.lifePath[lp2];
  
  let score = 50; // Base score
  let type = 'neutral';
  
  if (info1.compatible.includes(lp2)) {
    score = 85;
    type = 'compatible';
  } else if (info1.challenging.includes(lp2)) {
    score = 25;
    type = 'challenging';
  } else if (lp1 === lp2) {
    score = 75;
    type = 'same';
  }
  
  return {
    score,
    type,
    description: getLifePathCompatDescription(lp1, lp2, type),
    advice: getLifePathCompatAdvice(lp1, lp2, type)
  };
}

/**
 * Analyze Expression compatibility
 * @param {number} exp1 - Person 1's Expression
 * @param {number} exp2 - Person 2's Expression
 * @returns {object} Compatibility analysis
 */
function analyzeExpressionCompatibility(exp1, exp2) {
  // Expression compatibility based on complementary energies
  const score = calculateExpressionScore(exp1, exp2);
  
  return {
    score,
    type: score > 70 ? 'harmonious' : score < 40 ? 'conflicting' : 'workable',
    strengths: [
      COMPATIBILITY_INFO.expression.strengths[exp1],
      COMPATIBILITY_INFO.expression.strengths[exp2]
    ],
    challenges: [
      COMPATIBILITY_INFO.expression.challenges[exp1],
      COMPATIBILITY_INFO.expression.challenges[exp2]
    ],
    description: `Sự kết hợp giữa Expression ${exp1} và ${exp2} tạo ra ${getExpressionCombinationDescription(exp1, exp2)}`
  };
}

/**
 * Analyze Soul Urge compatibility
 * @param {number} su1 - Person 1's Soul Urge
 * @param {number} su2 - Person 2's Soul Urge
 * @returns {object} Compatibility analysis
 */
function analyzeSoulUrgeCompatibility(su1, su2) {
  const score = calculateSoulUrgeScore(su1, su2);
  
  return {
    score,
    type: score > 70 ? 'deep_connection' : score < 40 ? 'different_desires' : 'moderate',
    description: getSoulUrgeCompatDescription(su1, su2),
    innerNeeds: getSoulUrgeInnerNeeds(su1, su2)
  };
}

/**
 * Analyze Personality compatibility
 * @param {number} p1 - Person 1's Personality
 * @param {number} p2 - Person 2's Personality
 * @returns {object} Compatibility analysis
 */
function analyzePersonalityCompatibility(p1, p2) {
  const score = calculatePersonalityScore(p1, p2);
  
  return {
    score,
    type: score > 70 ? 'attractive' : score < 40 ? 'clashing' : 'neutral',
    description: getPersonalityCompatDescription(p1, p2),
    firstImpression: getFirstImpressionAnalysis(p1, p2)
  };
}

/**
 * Calculate overall compatibility score
 * @param {array} scores - Array of individual scores
 * @returns {number} Overall score (0-100)
 */
function calculateOverallCompatibility(scores) {
  const weights = [0.4, 0.25, 0.2, 0.15]; // Life Path gets highest weight
  return Math.round(scores.reduce((total, score, index) => total + (score * weights[index]), 0));
}

/**
 * Get compatibility rating based on score
 * @param {number} score - Compatibility score
 * @returns {string} Rating description
 */
function getCompatibilityRating(score) {
  if (score >= 85) return 'Tuyệt vời';
  if (score >= 70) return 'Rất tốt';
  if (score >= 55) return 'Tốt';
  if (score >= 40) return 'Trung bình';
  if (score >= 25) return 'Khó khăn';
  return 'Rất thách thức';
}

/**
 * Get overall compatibility description
 * @param {number} score - Overall score
 * @returns {string} Description
 */
function getOverallDescription(score) {
  if (score >= 85) {
    return 'Hai bạn có sự tương thích tuyệt vời với nhiều điểm chung và hỗ trợ lẫn nhau.';
  } else if (score >= 70) {
    return 'Mối quan hệ này có tiềm năng rất tốt với sự hiểu biết và respect lẫn nhau.';
  } else if (score >= 55) {
    return 'Đây là mối quan hệ cân bằng với cả điểm mạnh và thách thức.';
  } else if (score >= 40) {
    return 'Mối quan hệ cần nỗ lực và thỏa hiệp để duy trì sự hài hòa.';
  } else {
    return 'Đây là mối quan hệ thách thức, cần hiểu biết sâu sắc và kiên nhẫn.';
  }
}

// Helper functions for specific compatibility calculations
function calculateExpressionScore(exp1, exp2) {
  // Complementary pairs get high scores
  const complementary = {
    1: [2, 6], 2: [1, 8], 3: [4, 7], 4: [3, 6], 5: [9],
    6: [1, 4], 7: [3], 8: [2], 9: [5]
  };
  
  if (exp1 === exp2) return 75;
  if (complementary[exp1]?.includes(exp2)) return 85;
  if (Math.abs(exp1 - exp2) <= 1) return 65;
  return 45;
}

function calculateSoulUrgeScore(su1, su2) {
  if (su1 === su2) return 90; // Same desires
  if (Math.abs(su1 - su2) <= 2) return 70;
  if (Math.abs(su1 - su2) <= 4) return 50;
  return 30;
}

function calculatePersonalityScore(p1, p2) {
  // Opposite personalities can be attractive
  if (Math.abs(p1 - p2) === 4 || Math.abs(p1 - p2) === 5) return 80;
  if (p1 === p2) return 60; // Similar can be boring
  if (Math.abs(p1 - p2) <= 2) return 70;
  return 40;
}

function getLifePathCompatDescription(lp1, lp2, type) {
  const descriptions = {
    compatible: `Life Path ${lp1} và ${lp2} có sự tương thích tự nhiên và hỗ trợ lẫn nhau trong hành trình cuộc sống.`,
    challenging: `Life Path ${lp1} và ${lp2} có những khác biệt cơ bản, cần sự thấu hiểu và kiên nhẫn.`,
    same: `Cùng Life Path ${lp1}, hai bạn hiểu nhau sâu sắc nhưng cần tránh sự đồng nhất quá mức.`,
    neutral: `Life Path ${lp1} và ${lp2} có thể hòa hợp nếu cả hai cùng nỗ lực và thỏa hiệp.`
  };
  
  return descriptions[type] || descriptions.neutral;
}

function getLifePathCompatAdvice(lp1, lp2, type) {
  const advice = {
    compatible: 'Hãy tận dụng sự tương thích tự nhiên này để cùng nhau phát triển.',
    challenging: 'Học cách đánh giá cao những khác biệt và biến chúng thành sức mạnh.',
    same: 'Tạo ra sự đa dạng trong mối quan hệ để tránh nhàm chán.',
    neutral: 'Tập trung vào những điểm chung và respect những khác biệt.'
  };
  
  return advice[type] || advice.neutral;
}

function getExpressionCombinationDescription(exp1, exp2) {
  // Simplified description for Expression combinations
  if (exp1 === exp2) return 'sự đồng điệu trong cách thể hiện';
  if (Math.abs(exp1 - exp2) <= 2) return 'sự hài hòa trong năng lượng';
  return 'sự đa dạng trong phong cách';
}

function getSoulUrgeCompatDescription(su1, su2) {
  if (su1 === su2) {
    return `Cả hai đều có cùng khao khát nội tâm (${su1}), tạo ra sự hiểu biết sâu sắc.`;
  }
  return `Soul Urge ${su1} và ${su2} tạo ra sự cân bằng trong những mong muốn nội tâm.`;
}

function getSoulUrgeInnerNeeds(su1, su2) {
  const needs = {
    1: 'độc lập và lãnh đạo',
    2: 'hợp tác và hài hòa',
    3: 'sáng tạo và biểu đạt',
    4: 'ổn định và trật tự',
    5: 'tự do và phiêu lưu',
    6: 'yêu thương và chăm sóc',
    7: 'hiểu biết và tâm linh',
    8: 'thành công và quyền lực',
    9: 'phục vụ và nhân đạo'
  };
  
  return {
    person1: needs[su1] || 'phát triển bản thân',
    person2: needs[su2] || 'phát triển bản thân'
  };
}

function getPersonalityCompatDescription(p1, p2) {
  if (p1 === p2) {
    return 'Hai bạn có cách thể hiện bên ngoài tương tự, dễ hiểu nhau ngay từ đầu.';
  }
  return `Personality ${p1} và ${p2} tạo ra sự hấp dẫn và bổ sung cho nhau.`;
}

function getFirstImpressionAnalysis(p1, p2) {
  if (Math.abs(p1 - p2) >= 4) {
    return 'Ấn tượng đầu rất khác biệt, có thể tạo ra sự hấp dẫn mạnh mẽ.';
  } else if (p1 === p2) {
    return 'Ấn tượng đầu rất tương đồng, dễ dàng cảm thấy thoải mái với nhau.';
  }
  return 'Ấn tượng đầu khá hài hòa và cân bằng.';
}

function identifyRelationshipStrengths(p1, p2) {
  const strengths = [];
  
  // Add specific strengths based on number combinations
  if (p1.lifePath.value === p2.lifePath.value) {
    strengths.push('Hiểu biết sâu sắc về mục tiêu cuộc sống');
  }
  
  if (p1.expression.value === p2.expression.value) {
    strengths.push('Phong cách thể hiện đồng điệu');
  }
  
  if (p1.soulUrge.value === p2.soulUrge.value) {
    strengths.push('Khao khát nội tâm giống nhau');
  }
  
  // Add general strengths
  strengths.push('Cả hai đều có tiềm năng phát triển cá nhân');
  strengths.push('Có thể học hỏi từ những khác biệt của nhau');
  
  return strengths;
}

function identifyRelationshipChallenges(p1, p2) {
  const challenges = [];
  
  // Add specific challenges based on number combinations
  const lpDiff = Math.abs(p1.lifePath.value - p2.lifePath.value);
  if (lpDiff >= 4) {
    challenges.push('Khác biệt lớn trong cách tiếp cận cuộc sống');
  }
  
  const expDiff = Math.abs(p1.expression.value - p2.expression.value);
  if (expDiff >= 5) {
    challenges.push('Phong cách thể hiện rất khác nhau');
  }
  
  // Add general challenges
  challenges.push('Cần thời gian để hiểu rõ nhau');
  challenges.push('Có thể cần thỏa hiệp trong một số vấn đề');
  
  return challenges;
}

function generateRelationshipAdvice(p1, p2, score) {
  const advice = [];
  
  if (score >= 70) {
    advice.push('Tận hưởng sự tương thích tự nhiên và cùng nhau phát triển.');
    advice.push('Tiếp tục nuôi dưỡng những điểm mạnh chung.');
  } else if (score >= 40) {
    advice.push('Tập trung vào giao tiếp và hiểu biết lẫn nhau.');
    advice.push('Tôn trọng và đánh giá cao những khác biệt.');
  } else {
    advice.push('Cần kiên nhẫn và sự nỗ lực từ cả hai phía.');
    advice.push('Tìm hiểu sâu hơn về động cơ và mong muốn của nhau.');
  }
  
  advice.push('Luôn giữ thái độ mở và sẵn sàng học hỏi.');
  advice.push('Tạo không gian cho sự phát triển cá nhân của mỗi người.');
  
  return advice;
}

/**
 * Forecast Personal Months and Days for future dates
 * @param {Date} birthDate - Birth date
 * @param {Date} startDate - Start date for forecast
 * @param {number} monthsToForecast - Number of months to forecast (default: 12)
 * @param {object} options - Calculation options
 * @returns {object} Forecast data
 */
export function calcPersonalForecast(birthDate, startDate = new Date(), monthsToForecast = 12, options = DEFAULT_OPTIONS) {
  const forecast = {
    startDate,
    birthDate,
    monthsToForecast,
    months: [],
    overview: {
      currentPersonalYear: calcPersonalYear(birthDate, startDate, options),
      forecastPeriod: `${monthsToForecast} tháng từ ${startDate.toLocaleDateString('vi-VN')}`,
      totalDays: 0
    },
    yearTransitions: [],
    specialDays: [],
    patterns: {
      dominantNumbers: {},
      cycleAnalysis: null
    }
  };
  
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < monthsToForecast; i++) {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
    const monthData = generateMonthForecast(birthDate, monthDate, options);
    
    forecast.months.push(monthData);
    forecast.overview.totalDays += monthData.days.length;
    
    // Track year transitions
    if (i > 0 && monthDate.getFullYear() !== forecast.months[i-1].year) {
      forecast.yearTransitions.push({
        month: monthDate.getMonth() + 1,
        year: monthDate.getFullYear(),
        previousPersonalYear: forecast.months[i-1].personalYear,
        newPersonalYear: monthData.personalYear,
        description: `Chuyển từ Năm Cá Nhân ${forecast.months[i-1].personalYear} sang ${monthData.personalYear}`
      });
    }
    
    // Identify special days
    monthData.days.forEach(day => {
      if (isSpecialDay(day)) {
        forecast.specialDays.push({
          date: new Date(day.year, day.month - 1, day.day),
          personalDay: day.personalDay,
          type: getSpecialDayType(day.personalDay),
          description: day.description,
          energy: day.energy
        });
      }
    });
  }
  
  // Analyze patterns
  forecast.patterns = analyzeForecastPatterns(forecast.months);
  
  return forecast;
}

/**
 * Generate detailed forecast for a specific month
 * @param {Date} birthDate - Birth date
 * @param {Date} monthDate - Month to forecast
 * @param {object} options - Calculation options
 * @returns {object} Month forecast data
 */
function generateMonthForecast(birthDate, monthDate, options) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  
  const personalYear = calcPersonalYear(birthDate, monthDate, options);
  const personalMonth = calcPersonalMonth(birthDate, monthDate, options);
  
  const monthData = {
    year,
    month,
    monthName: getVietnameseMonthName(month),
    daysInMonth,
    personalYear,
    personalMonth: personalMonth.value,
    theme: personalMonth.theme,
    description: personalMonth.description,
    days: [],
    summary: {
      dominantNumbers: {},
      bestDays: [],
      challengingDays: [],
      averageEnergy: 0
    }
  };
  
  // Generate daily forecasts
  let totalEnergy = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(year, month - 1, day);
    const personalDay = calcPersonalDay(birthDate, dayDate, options);
    
    const dayData = {
      day,
      dayOfWeek: getDayOfWeekVietnamese(dayDate.getDay()),
      personalDay: personalDay.value,
      personalMonth: personalDay.personalMonth,
      personalYear: personalDay.personalYear,
      description: personalDay.description,
      energy: personalDay.energy,
      month,
      year,
      energyLevel: getEnergyLevel(personalDay.value),
      recommendations: getDayRecommendations(personalDay.value),
      challenges: getDayChallenges(personalDay.value),
      opportunities: getDayOpportunities(personalDay.value)
    };
    
    monthData.days.push(dayData);
    
    // Track dominant numbers
    const pd = personalDay.value;
    monthData.summary.dominantNumbers[pd] = (monthData.summary.dominantNumbers[pd] || 0) + 1;
    
    // Track energy levels
    const energyValue = getEnergyValue(personalDay.value);
    totalEnergy += energyValue;
    
    // Identify best and challenging days
    if (energyValue >= 8) {
      monthData.summary.bestDays.push(day);
    } else if (energyValue <= 4) {
      monthData.summary.challengingDays.push(day);
    }
  }
  
  monthData.summary.averageEnergy = Math.round(totalEnergy / daysInMonth);
  
  return monthData;
}

// Duplicate functions removed - using the first implementations above

/**
 * Get energy level for a personal day number
 * @param {number} personalDay - Personal day number
 * @returns {string} Energy level description
 */
function getEnergyLevel(personalDay) {
  const levels = {
    1: 'Cao', 2: 'Trung bình', 3: 'Cao', 4: 'Thấp', 5: 'Rất cao',
    6: 'Trung bình', 7: 'Thấp', 8: 'Cao', 9: 'Trung bình',
    11: 'Rất cao', 22: 'Cao', 33: 'Trung bình'
  };
  return levels[personalDay] || 'Trung bình';
}

function getEnergyValue(personalDay) {
  const values = {
    1: 8, 2: 5, 3: 8, 4: 3, 5: 10,
    6: 6, 7: 4, 8: 8, 9: 6,
    11: 9, 22: 8, 33: 7
  };
  return values[personalDay] || 5;
}

function getDayRecommendations(personalDay) {
  const recommendations = {
    1: ['Bắt đầu dự án mới', 'Đưa ra quyết định', 'Lãnh đạo nhóm'],
    2: ['Hợp tác với người khác', 'Lắng nghe và thấu hiểu', 'Giải quyết xung đột'],
    3: ['Thể hiện sáng tạo', 'Giao tiếp xã hội', 'Biểu đạt ý tưởng'],
    4: ['Làm việc chăm chỉ', 'Tổ chức và sắp xếp', 'Xây dựng nền tảng'],
    5: ['Thử những điều mới', 'Du lịch hoặc khám phá', 'Linh hoạt thay đổi'],
    6: ['Chăm sóc gia đình', 'Phục vụ cộng đồng', 'Tạo không gian hài hòa'],
    7: ['Thời gian tự suy ngẫm', 'Học hỏi và nghiên cứu', 'Phát triển tâm linh'],
    8: ['Tập trung vào công việc', 'Quyết định tài chính', 'Đạt mục tiêu vật chất'],
    9: ['Hoàn thành dự án', 'Giúp đỡ người khác', 'Tha thứ và buông bỏ'],
    11: ['Tin tưởng trực giác', 'Truyền cảm hứng', 'Phát triển ý thức'],
    22: ['Thực hiện tầm nhìn lớn', 'Xây dựng dự án quan trọng', 'Lãnh đạo thực tế'],
    33: ['Dạy dỗ và hướng dẫn', 'Chữa lành và an ủi', 'Phục vụ với lòng trắc ẩn']
  };
  return recommendations[personalDay] || ['Tập trung vào mục tiêu cá nhân'];
}

function getDayChallenges(personalDay) {
  const challenges = {
    1: ['Tránh kiêu ngạo', 'Không ép buộc người khác'],
    2: ['Tránh quá nhạy cảm', 'Không phụ thuộc quá mức'],
    3: ['Không phân tán', 'Tránh nói quá nhiều'],
    4: ['Tránh cứng nhắc', 'Không quá hoang tưởng'],
    5: ['Tránh bất ổn', 'Không bỏ cuộc giữa chừng'],
    6: ['Không hy sinh quá mức', 'Tránh can thiệp quá'],
    7: ['Tránh cô lập', 'Không quá hoài nghi'],
    8: ['Tránh tham lam', 'Không lạm dụng quyền lực'],
    9: ['Tránh quá lý tưởng', 'Không mong đợi quá cao'],
    11: ['Kiểm soát năng lượng', 'Tránh quá căng thẳng'],
    22: ['Quản lý áp lực', 'Không quá hoàn hảo'],
    33: ['Tránh kiệt sức', 'Cân bằng cho và nhận']
  };
  return challenges[personalDay] || ['Giữ cân bằng trong mọi việc'];
}

function getDayOpportunities(personalDay) {
  const opportunities = {
    1: ['Khởi đầu mới', 'Lãnh đạo dự án', 'Đổi mới sáng tạo'],
    2: ['Xây dựng quan hệ', 'Hợp tác thành công', 'Giải quyết hòa bình'],
    3: ['Thể hiện tài năng', 'Kết nối xã hội', 'Sáng tạo nghệ thuật'],
    4: ['Xây dựng nền tảng', 'Hoàn thành kế hoạch', 'Ổn định tiến triển'],
    5: ['Khám phá mới', 'Mở rộng kết nối', 'Thổi xu hướng mới'],
    6: ['Nuôi dưỡng mối quan hệ', 'Chăm sóc sức khỏe', 'Tạo môi trường yêu thương'],
    7: ['Sâu sắc tâm linh', 'Nghiên cứu học hỏi', 'Phát triển trực giác'],
    8: ['Thành công tài chính', 'Lãnh đạo hiệu quả', 'Đạt thành tích lớn'],
    9: ['Phục vụ cộng đồng', 'Hoàn thành sứ mệnh', 'Gây ảnh hưởng tích cực'],
    11: ['Cảm hứng lớn', 'Dẫn dắt tinh thần', 'Kết nối tâm linh'],
    22: ['Thực hiện tầm nhìn', 'Tạo di sản lâu dài', 'Lãnh đạo biến đổi'],
    33: ['Chữa lành sâu sắc', 'Dạy dỗ với tình yêu', 'Nâng cao nhận thức']
  };
  return opportunities[personalDay] || ['Phát triển bản thân tốt nhất'];
}


/**
 * Calculate Life Path Periods - cycles based on Life Path number
 * @param {Date} birthDate - Birth date
 * @param {Date} currentDate - Current date (optional)
 * @param {object} options - Calculation options
 * @returns {object} Life Path Periods analysis
 */