/**
 * SolarConnect Block Preset - Business Calculator (`business`)
 */

import { calcSolar } from "../../core/engine.js";
import { formatCurrency, formatKW, formatKWh, pluralize } from "../../core/format.js";
import { t } from "../i18n.js";
import { renderCashflowChart } from "../chart.js";
import { trackEvent } from "../../analytics/track.js";

export function renderBusinessBlock(widget, container) {
  const lang = widget.options.lang || "ru";
  const state = widget.state;

  const modeType = state.bizMode || "bill";
  const bill = state.bill || 150000;
  const kwhInput = state.kwhInput || 150000;
  const city = state.city || "almaty";
  const industry = state.industry || "warehouse";

  const selfShareMap = {
    warehouse: 0.85, production: 0.80, sto: 0.75, hotel: 0.70, shop: 0.80, azs: 0.85, office: 0.90, other: 0.80
  };
  const selfShare = selfShareMap[industry] || 0.80;

  const solarInput = {
    segment: "business",
    city,
    selfShare,
    mode: state.mode || "net"
  };

  if (modeType === "bill") {
    solarInput.bill = bill;
  } else {
    solarInput.consumptionYear = kwhInput;
  }

  const result = calcSolar(solarInput, widget.config);
  widget.currentResult = result;
  widget.notifyResult(result);

  const cityOptions = Object.keys(widget.config.cities || { almaty: {} }).map(key => {
    const cName = widget.config.cities[key].name;
    return `<option value="${key}" ${key === city ? "selected" : ""}>${cName}</option>`;
  }).join("");

  container.innerHTML = `
    <div class="sc-container">
      <div class="sc-header">
        <h2 class="sc-title">Солнечные электростанции для бизнеса</h2>
        <p class="sc-subtitle">Финансовая модель, IRR, NPV и сокращение операционных расходов</p>
      </div>

      <div class="sc-grid-2">
        <div class="sc-card">
          <div class="sc-form-group">
            <label class="sc-label">${t("biz.mode", lang)}</label>
            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
              <button class="sc-btn sc-btn-outline js-biz-mode-bill" style="flex:1; height:40px; font-size:14px; ${modeType === "bill" ? "background:var(--sc-sun);" : ""}">Счёт (₸/мес)</button>
              <button class="sc-btn sc-btn-outline js-biz-mode-kwh" style="flex:1; height:40px; font-size:14px; ${modeType === "kwh" ? "background:var(--sc-sun);" : ""}">Потребление (кВтч/год)</button>
            </div>
          </div>

          ${modeType === "bill" ? `
            <div class="sc-form-group">
              <label class="sc-label">Айлық шот / Месячный счёт (₸)</label>
              <input type="number" class="sc-input js-bill-input" value="${bill}">
            </div>
          ` : `
            <div class="sc-form-group">
              <label class="sc-label">Годовое потребление (кВтч)</label>
              <input type="number" class="sc-input js-kwh-input" value="${kwhInput}">
            </div>
          `}

          <div class="sc-form-group">
            <label class="sc-label">${t("biz.industry", lang)}</label>
            <select class="sc-select js-industry-select">
              <option value="warehouse" ${industry === "warehouse" ? "selected" : ""}>${t("ind.warehouse", lang)}</option>
              <option value="production" ${industry === "production" ? "selected" : ""}>${t("ind.production", lang)}</option>
              <option value="sto" ${industry === "sto" ? "selected" : ""}>${t("ind.sto", lang)}</option>
              <option value="hotel" ${industry === "hotel" ? "selected" : ""}>${t("ind.hotel", lang)}</option>
              <option value="shop" ${industry === "shop" ? "selected" : ""}>${t("ind.shop", lang)}</option>
              <option value="azs" ${industry === "azs" ? "selected" : ""}>${t("ind.azs", lang)}</option>
              <option value="office" ${industry === "office" ? "selected" : ""}>${t("ind.office", lang)}</option>
              <option value="other" ${industry === "other" ? "selected" : ""}>${t("ind.other", lang)}</option>
            </select>
          </div>

          <div class="sc-form-group">
            <label class="sc-label">${t("home.city", lang)}</label>
            <select class="sc-select js-city-select">
              ${cityOptions}
            </select>
          </div>
        </div>

        <div>
          ${result.warnings.length > 0 ? `
            <div class="sc-warning">
              ${result.warnings.map(w => `<div>• ${w}</div>`).join("")}
            </div>
          ` : ""}

          <div class="sc-result-box">
            <div class="sc-result-highlight">
              <div class="sc-result-subtext">${t("result.saving", lang)}</div>
              <div class="sc-result-value">${formatCurrency(result.savingYear)}</div>
              <div class="sc-result-subtext">IRR проекта за 25 лет: <strong>${Math.round(result.irr * 100)}%</strong></div>
            </div>

            <div class="sc-grid-4">
              <div class="sc-metric-card">
                <div class="sc-metric-val">${formatKW(result.kwp)}</div>
                <div class="sc-metric-lbl">Мощность</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">${formatCurrency(result.capex)}</div>
                <div class="sc-metric-lbl">Инвестиции</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">~${result.paybackSimple} ${pluralize(Math.round(result.paybackSimple), ["год", "года", "лет"])}</div>
                <div class="sc-metric-lbl">Окупаемость</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">${formatCurrency(result.npv)}</div>
                <div class="sc-metric-lbl">NPV (12%)</div>
              </div>
            </div>
          </div>

          <div class="sc-card" style="margin-bottom: 16px;">
            <div class="sc-label">Накопленный денежный поток (25 лет)</div>
            <canvas class="js-cashflow-canvas" style="width:100%; height:200px;"></canvas>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="sc-btn sc-btn-full js-open-lead" style="flex: 1;">${t("form.submit", lang)}</button>
            <button class="sc-btn sc-btn-outline js-print-calc" style="flex: 1;">${t("cta.print", lang)}</button>
          </div>
        </div>
      </div>

      <details class="sc-accordion">
        <summary class="sc-accordion-header">Таблица денежного потока (первые 10 лет)</summary>
        <div class="sc-accordion-content">
          <table class="sc-table">
            <thead>
              <tr><th>Год</th><th>Экономия (₸)</th><th>O&M (₸)</th><th>Чистый поток (₸)</th><th>Накопленный (₸)</th></tr>
            </thead>
            <tbody>
              ${result.cashflow.slice(0, 10).map(c => `
                <tr>
                  <td>${c.year}</td>
                  <td>${formatCurrency(c.saving)}</td>
                  <td>${formatCurrency(c.opex)}</td>
                  <td>${formatCurrency(c.net)}</td>
                  <td><strong>${formatCurrency(c.cumulative)}</strong></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  `;

  // Attach Event Handlers
  const modeBillBtn = container.querySelector(".js-biz-mode-bill");
  const modeKwhBtn = container.querySelector(".js-biz-mode-kwh");
  const billInput = container.querySelector(".js-bill-input");
  const kwhInputEl = container.querySelector(".js-kwh-input");
  const industrySelect = container.querySelector(".js-industry-select");
  const citySelect = container.querySelector(".js-city-select");

  if (modeBillBtn) modeBillBtn.addEventListener("click", () => widget.setState({ bizMode: "bill" }));
  if (modeKwhBtn) modeKwhBtn.addEventListener("click", () => widget.setState({ bizMode: "kwh" }));

  if (billInput) billInput.addEventListener("change", e => widget.setState({ bill: Number(e.target.value) }));
  if (kwhInputEl) kwhInputEl.addEventListener("change", e => widget.setState({ kwhInput: Number(e.target.value) }));
  if (industrySelect) industrySelect.addEventListener("change", e => widget.setState({ industry: e.target.value }));
  if (citySelect) citySelect.addEventListener("change", e => widget.setState({ city: e.target.value }));

  const openLeadBtn = container.querySelector(".js-open-lead");
  if (openLeadBtn) openLeadBtn.addEventListener("click", () => widget.openLeadModal());

  const printBtn = container.querySelector(".js-print-calc");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      trackEvent("calc_print", { block: "business" });
      window.print();
    });
  }

  // Render Cashflow Canvas
  const canvas = container.querySelector(".js-cashflow-canvas");
  if (canvas) {
    renderCashflowChart(canvas, result.cashflow, result.paybackSimple, {
      theme: widget.options.theme
    });
  }
}
