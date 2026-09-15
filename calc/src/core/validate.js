/**
 * SolarConnect Validation & Input Sanitization
 * Pure functions for input verification, phone validation, honeypot & rate limiting.
 */

/**
 * Sanitizes numerical input within min/max boundaries.
 * @param {any} val
 * @param {number} defaultVal
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function sanitizeNumber(val, defaultVal = 0, min = 0, max = Infinity) {
  if (val === null || val === undefined || val === "") return defaultVal;
  const num = Number(String(val).replace(/\s/g, "").replace(",", "."));
  if (isNaN(num)) return defaultVal;
  return Math.min(max, Math.max(min, num));
}

/**
 * Extracts digits from phone input.
 * @param {string} phoneStr
 * @returns {string} Digits only
 */
export function extractPhoneDigits(phoneStr = "") {
  return String(phoneStr).replace(/\D/g, "");
}

/**
 * Formats 11-digit Kazakhstani phone number to +7 (7XX) XXX-XX-XX format.
 * @param {string} input
 * @returns {string}
 */
export function formatPhoneMask(input = "") {
  let digits = extractPhoneDigits(input);

  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }
  if (!digits.startsWith("7")) {
    digits = "7" + digits;
  }
  digits = digits.slice(0, 11);

  if (digits.length === 0) return "";
  let res = "+7";
  if (digits.length > 1) {
    res += " (" + digits.slice(1, 4);
  }
  if (digits.length >= 4) {
    res += ")";
  }
  if (digits.length > 4) {
    res += " " + digits.slice(4, 7);
  }
  if (digits.length >= 7) {
    res += "-";
  }
  if (digits.length > 7) {
    res += digits.slice(7, 9);
  }
  if (digits.length >= 9) {
    res += "-";
  }
  if (digits.length > 9) {
    res += digits.slice(9, 11);
  }
  return res;
}

/**
 * Validates Kazakhstani phone number (must be 11 digits starting with 77).
 * @param {string} phoneStr
 * @returns {boolean}
 */
export function isValidPhone(phoneStr = "") {
  const digits = extractPhoneDigits(phoneStr);
  return digits.length === 11 && (digits.startsWith("77") || digits.startsWith("70"));
}

/**
 * Validates lead contact form data.
 * @param {object} contact { name, phone, consent, honeypot }
 * @param {number} formOpenedAt Timestamp when form was opened
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export function validateLeadForm(contact = {}, formOpenedAt = 0) {
  const errors = [];

  // 1. Name check
  if (!contact.name || String(contact.name).trim().length < 2) {
    errors.push("Пожалуйста, укажите ваше имя (минимум 2 символа).");
  }

  // 2. Phone check
  if (!isValidPhone(contact.phone)) {
    errors.push("Пожалуйста, введите корректный номер телефона +7 (7XX) XXX-XX-XX.");
  }

  // 3. Consent check
  if (!contact.consent) {
    errors.push("Необходимо согласие на обработку персональных данных.");
  }

  // 4. Honeypot check
  if (contact.honeypot && String(contact.honeypot).trim().length > 0) {
    errors.push("Обнаружена автоматическая отправка.");
  }

  // 5. Minimum fill-time check (3 seconds)
  if (formOpenedAt > 0) {
    const elapsedSec = (Date.now() - formOpenedAt) / 1000;
    if (elapsedSec < 3) {
      errors.push("Форма заполнена слишком быстро.");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Rate limit check: max 3 submissions per hour per device.
 * @returns {boolean} True if allowed, false if limit exceeded
 */
export function checkRateLimit() {
  try {
    const key = "sc_calc_leads_history";
    const history = JSON.parse(localStorage.getItem(key) || "[]");
    const oneHourAgo = Date.now() - 3600 * 1000;
    const recent = history.filter(ts => ts > oneHourAgo);
    return recent.length < 3;
  } catch (e) {
    return true; // Fail open if localStorage unavailable
  }
}

/**
 * Records a successful lead submission in rate limit log.
 */
export function recordLeadSubmission() {
  try {
    const key = "sc_calc_leads_history";
    const history = JSON.parse(localStorage.getItem(key) || "[]");
    const oneHourAgo = Date.now() - 3600 * 1000;
    const recent = history.filter(ts => ts > oneHourAgo);
    recent.push(Date.now());
    localStorage.setItem(key, JSON.stringify(recent));
  } catch (e) {
    // Ignore localStorage errors
  }
}
