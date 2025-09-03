/**
 * Utility functions for string processing and number operations
 */

/**
 * Remove accents from Vietnamese text using NFKD normalization
 * @param {string} str - Input string with accents
 * @returns {string} String without accents
 */
export function stripAccents(str) {
  return str
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Extract only letters A-Z from a string
 * @param {string} str - Input string
 * @returns {string} String containing only A-Z letters
 */
export function onlyLetters(str) {
  return stripAccents(str.toUpperCase()).replace(/[^A-Z]/g, '');
}

/**
 * Calculate sum of all digits in a number
 * @param {number} n - Input number
 * @returns {number} Sum of digits
 */
export function digitSum(n) {
  return Math.abs(n)
    .toString()
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}

/**
 * Validate date components
 * @param {number} day - Day (1-31)
 * @param {number} month - Month (1-12) 
 * @param {number} year - Year (must be positive)
 * @returns {boolean} True if date is valid
 */
export function isValidDate(day, month, year) {
  if (!day || !month || !year || year < 1) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  
  // Check for invalid dates like Feb 30
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && 
         date.getMonth() === month - 1 && 
         date.getFullYear() === year;
}

/**
 * Format a date object to YYYY-MM-DD string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if current date is after birthday this year
 * @param {number} birthMonth - Birth month (1-12)
 * @param {number} birthDay - Birth day (1-31)
 * @param {Date} referenceDate - Reference date (default: today)
 * @returns {boolean} True if after birthday this year
 */
export function isAfterBirthdayThisYear(birthMonth, birthDay, referenceDate = new Date()) {
  const currentYear = referenceDate.getFullYear();
  const birthdayThisYear = new Date(currentYear, birthMonth - 1, birthDay);
  return referenceDate >= birthdayThisYear;
}