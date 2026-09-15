/**
 * SolarConnect Lead Submission System
 * Handles API POST request, retry logic, honeypot, rate limiting, and WhatsApp fallback.
 */

import { validateLeadForm, checkRateLimit, recordLeadSubmission, extractPhoneDigits } from "../core/validate.js";
import { formatCurrency, formatKW } from "../core/format.js";

/**
 * Generates WhatsApp fallback URL with pre-filled user inputs & results.
 * @param {string} phone Target WhatsApp number (e.g. 77713169033)
 * @param {object} input Calculation input
 * @param {object} result Calculation result
 * @returns {string} WhatsApp URL
 */
export function buildWhatsAppUrl(phone = "77713169033", input = {}, result = {}) {
  const targetPhone = extractPhoneDigits(phone) || "77713169033";

  const segmentLabels = { home: "дом", business: "бизнес", agro: "агросектор", backup: "резервное питание" };
  const segmentName = segmentLabels[input.segment] || "объект";

  const cityName = result.cityName || "Алматы";
  const billStr = input.bill ? formatCurrency(input.bill) : "";
  const kwStr = formatKW(result.kwp || 0);
  const capexStr = result.capex ? formatCurrency(result.capex) : "";
  const savingStr = result.savingYear ? formatCurrency(result.savingYear) : "";

  let msg = `Здравствуйте! Посчитал на сайте: ${segmentName}, ${cityName}`;
  if (billStr) {
    msg += `, счёт ${billStr} в месяц`;
  }
  msg += `.\n\nПолучилось:\nстанция ${kwStr}`;
  if (capexStr) {
    msg += `,\nориентировочно ${capexStr}`;
  }
  if (savingStr) {
    msg += `,\nэкономия около ${savingStr} в год`;
  }
  msg += `.\n\nХочу точный расчёт.`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
}

/**
 * Extracts UTM parameters from current page URL.
 * @returns {object}
 */
export function getUtmParams() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      source: urlParams.get("utm_source") || null,
      medium: urlParams.get("utm_medium") || null,
      campaign: urlParams.get("utm_campaign") || null,
      content: urlParams.get("utm_content") || null,
      term: urlParams.get("utm_term") || null
    };
  } catch (e) {
    return { source: null, medium: null, campaign: null, content: null, term: null };
  }
}

/**
 * Submits lead to API endpoint with single retry and WhatsApp fallback.
 * @param {object} payload Complete lead JSON payload
 * @param {string} endpoint Target URL
 * @param {function} onSuccess Callback on success
 * @param {function} onError Callback on failure
 */
export async function submitLead(payload, endpoint = "/api/lead", onSuccess, onError) {
  // Check local rate limit
  if (!checkRateLimit()) {
    if (onError) onError(new Error("Превышен лимит отправок. Пожалуйста, попробуйте позже или напишите в WhatsApp."));
    return;
  }

  async function makeRequest() {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }
    return await res.json();
  }

  try {
    const data = await makeRequest();
    recordLeadSubmission();
    if (onSuccess) onSuccess(data);
  } catch (err1) {
    console.warn("[SCCalc] First lead submit failed, retrying in 3s...", err1);
    // Retry once after 3 seconds
    setTimeout(async () => {
      try {
        const data = await makeRequest();
        recordLeadSubmission();
        if (onSuccess) onSuccess(data);
      } catch (err2) {
        console.error("[SCCalc] Lead submission retry failed.", err2);
        if (onError) onError(err2);
      }
    }, 3000);
  }
}
