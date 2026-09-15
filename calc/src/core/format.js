/**
 * SolarConnect Formatting Utilities
 * Pure functions for number, currency, unit formatting, and Russian declensions.
 */

/**
 * Formats a number with non-breaking space thousand separators.
 * @param {number} val
 * @param {number} decimals
 * @returns {string}
 */
export function formatNumber(val, decimals = 0) {
  if (val === null || val === undefined || isNaN(val)) return "0";
  const fixed = Number(val).toFixed(decimals);
  const parts = fixed.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(",");
}

/**
 * Formats currency values in Kazakhstani Tenge (₸).
 * @param {number} val
 * @param {string} symbol
 * @returns {string} E.g. "4 620 000 ₸"
 */
export function formatCurrency(val, symbol = "₸") {
  return `${formatNumber(Math.round(val))} ${symbol}`;
}

/**
 * Formats large values concisely (e.g. 4.62 млн ₸, 744 тыс ₸).
 * @param {number} val
 * @param {string} symbol
 * @returns {string}
 */
export function formatCompact(val, symbol = "₸") {
  if (val === null || val === undefined || isNaN(val)) return `0 ${symbol}`;
  const abs = Math.abs(val);
  const sign = val < 0 ? "-" : "";

  if (abs >= 1000000) {
    const mln = Math.round((abs / 1000000) * 100) / 100;
    return `${sign}${formatNumber(mln, mln % 1 === 0 ? 0 : 2)} млн ${symbol}`;
  } else if (abs >= 100000) {
    const thous = Math.round(abs / 1000);
    return `${sign}${formatNumber(thous)} тыс ${symbol}`;
  }
  return `${sign}${formatCurrency(abs, symbol)}`;
}

/**
 * Formats power rating in kW.
 * @param {number} kw
 * @returns {string} E.g. "16.9 кВт"
 */
export function formatKW(kw) {
  if (kw === null || kw === undefined || isNaN(kw)) return "0 кВт";
  const rounded = Math.round(Number(kw) * 10) / 10;
  return `${formatNumber(rounded, rounded % 1 === 0 ? 0 : 1)} кВт`;
}

/**
 * Formats energy in kWh.
 * @param {number} kwh
 * @returns {string} E.g. "24 800 кВтч"
 */
export function formatKWh(kwh) {
  if (kwh === null || kwh === undefined || isNaN(kwh)) return "0 кВтч";
  return `${formatNumber(Math.round(kwh))} кВтч`;
}

/**
 * Russian word pluralization helper.
 * @param {number} num
 * @param {[string, string, string]} forms E.g. ['год', 'года', 'лет']
 * @returns {string}
 */
export function pluralize(num, forms = ["год", "года", "лет"]) {
  const n = Math.abs(Math.round(num)) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return `${num} ${forms[2]}`;
  if (n1 > 1 && n1 < 5) return `${num} ${forms[1]}`;
  if (n1 === 1) return `${num} ${forms[0]}`;
  return `${num} ${forms[2]}`;
}
