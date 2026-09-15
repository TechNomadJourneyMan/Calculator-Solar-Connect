/**
 * SolarConnect Block Preset - Home Calculator (`home`)
 */

import { calcSolar } from "../../core/engine.js";
import { formatCurrency, formatKW, formatKWh, pluralize } from "../../core/format.js";
import { t } from "../i18n.js";
import { renderGenerationChart } from "../chart.js";
import { trackEvent } from "../../analytics/track.js";

export function renderHomeBlock(widget, container) {
  const lang = widget.options.lang || "ru";
  const state = widget.state;

  const bill = state.bill || 40000;
  const city = state.city || "almaty";
  const roofType = state.roofType || "pitched";
  const roofArea = state.roofArea || 0;
  const occupancy = state.occupancy || "mid";
  const outages = state.outages || "none";

  const selfShareMap = { low: 0.20, mid: 0.35, high: 0.60 };
  const selfShare = selfShareMap[occupancy] || 0.35;

  const result = calcSolar({
    segment: "home",
    city,
    bill,
    roofType,
    roofArea: roofArea > 0 ? roofArea : null,
    selfShare,
    mode: state.mode || "net"
  }, widget.config);

  widget.currentResult = result;
  widget.notifyResult(result);

  const cityOptions = Object.keys(widget.config.cities || { almaty: {} }).map(key => {
    const cName = widget.config.cities[key].name;
    return `<option value="${key}" ${key === city ? "selected" : ""}>${cName}</option>`;
  }).join("");

  container.innerHTML = `
    <div class="sc-container">
      <div class="sc-header">
        <h2 class="sc-title">${t("calc.title", lang)}</h2>
        <p class="sc-subtitle">${t("calc.subtitle", lang)}</p>
      </div>

      <div class="sc-grid-2">
        <div class="sc-card">
          <div class="sc-form-group">
            <label class="sc-label">${t("home.bill", lang)}</label>
            <div class="sc-slider-group">
              <input type="range" class="sc-slider js-bill-slider" min="10000" max="300000" step="1000" value="${bill}">
              <input type="number" class="sc-input js-bill-input" style="width: 140px;" value="${bill}">
            </div>
          </div>

          <div class="sc-form-group">
            <label class="sc-label">${t("home.city", lang)}</label>
            <select class="sc-select js-city-select">
              ${cityOptions}
            </select>
          </div>

          <button class="sc-btn sc-btn-outline sc-btn-full js-toggle-step2" style="margin-top: 8px;">
            ${state.showStep2 ? "▲ Скрыть уточнения" : "▼ " + t("cta.details", lang)}
          </button>

          ${state.showStep2 ? `
            <div class="sc-card" style="margin-top: 16px; background: var(--sc-bg-soft);">
              <div class="sc-form-group">
                <label class="sc-label">${t("home.roofType", lang)}</label>
                <select class="sc-select js-roof-type">
                  <option value="pitched" ${roofType === "pitched" ? "selected" : ""}>${t("roof.pitched", lang)}</option>
                  <option value="flat" ${roofType === "flat" ? "selected" : ""}>${t("roof.flat", lang)}</option>
                  <option value="ground" ${roofType === "ground" ? "selected" : ""}>${t("roof.ground", lang)}</option>
                </select>
              </div>

              <div class="sc-form-group">
                <label class="sc-label">${t("home.roofArea", lang)}</label>
                <input type="number" class="sc-input js-roof-area" placeholder="Например: 90" value="${roofArea || ""}">
              </div>

              <div class="sc-form-group">
                <label class="sc-label">${t("home.occupancy", lang)}</label>
                <select class="sc-select js-occupancy">
                  <option value="low" ${occupancy === "low" ? "selected" : ""}>${t("occ.low", lang)}</option>
                  <option value="mid" ${occupancy === "mid" ? "selected" : ""}>${t("occ.mid", lang)}</option>
                  <option value="high" ${occupancy === "high" ? "selected" : ""}>${t("occ.high", lang)}</option>
                </select>
              </div>

              <div class="sc-form-group">
                <label class="sc-label">${t("home.outages", lang)}</label>
                <select class="sc-select js-outages">
                  <option value="none" ${outages === "none" ? "selected" : ""}>${t("outages.none", lang)}</option>
                  <option value="rare" ${outages === "rare" ? "selected" : ""}>${t("outages.rare", lang)}</option>
                  <option value="often" ${outages === "often" ? "selected" : ""}>${t("outages.often", lang)}</option>
                </select>
              </div>
            </div>
          ` : ""}
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
              <div class="sc-result-subtext">${t("result.savingShare", lang, { n: result.savingShareOfBill })}</div>
            </div>

            <div class="sc-grid-3">
              <div class="sc-metric-card">
                <div class="sc-metric-val">${formatKW(result.kwp)}</div>
                <div class="sc-metric-lbl">${t("result.kwp", lang)}</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">${formatCurrency(result.capex)}</div>
                <div class="sc-metric-lbl">${t("result.capex", lang)}</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">~${result.paybackSimple} ${pluralize(Math.round(result.paybackSimple), ["год", "года", "лет"])}</div>
                <div class="sc-metric-lbl">${t("result.payback", lang)}</div>
              </div>
            </div>
          </div>

          <div class="sc-card" style="margin-bottom: 16px;">
            <div class="sc-label" style="margin-bottom: 12px;">Помесячная выработка (кВтч)</div>
            <canvas class="js-chart-canvas" style="width:100%; height:200px;"></canvas>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="sc-btn sc-btn-full js-open-lead" style="flex: 1;">${t("form.submit", lang)}</button>
            <a href="${widget.getWhatsAppUrl(result)}" target="_blank" rel="noopener" class="sc-btn sc-btn-whatsapp js-track-wa" style="flex: 1;">${t("cta.whatsapp", lang)}</a>
          </div>
        </div>
      </div>

      <details class="sc-accordion">
        <summary class="sc-accordion-header">
          <span>${t("method.title", lang)}</span>
          <span>▼</span>
        </summary>
        <div class="sc-accordion-content">
          <table class="sc-table">
            <thead>
              <tr><th>Параметр</th><th>Значение</th><th>Статус</th><th>Источник</th></tr>
            </thead>
            <tbody>
              ${result.assumptions.map(a => `
                <tr>
                  <td>${a.label}</td>
                  <td><strong>${a.value}</strong></td>
                  <td><span class="sc-badge ${a.status === "FACT" ? "sc-badge-fact" : a.status === "ОЦЕНКА" ? "sc-badge-estimate" : "sc-badge-assumption"}">${a.status}</span></td>
                  <td>${a.source}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </details>

      <div class="sc-disclaimer">${t("disclaimer", lang)}</div>
    </div>
  `;

  // Attach event handlers
  const billSlider = container.querySelector(".js-bill-slider");
  const billInput = container.querySelector(".js-bill-input");
  const citySelect = container.querySelector(".js-city-select");
  const toggleStep2Btn = container.querySelector(".js-toggle-step2");

  function updateBill(val) {
    widget.setState({ bill: Number(val) });
  }

  if (billSlider) billSlider.addEventListener("input", e => updateBill(e.target.value));
  if (billInput) billInput.addEventListener("change", e => updateBill(e.target.value));
  if (citySelect) citySelect.addEventListener("change", e => widget.setState({ city: e.target.value }));

  if (toggleStep2Btn) {
    toggleStep2Btn.addEventListener("click", () => {
      widget.setState({ showStep2: !state.showStep2 });
      trackEvent("calc_step2", { block: "home" });
    });
  }

  if (state.showStep2) {
    const roofSelect = container.querySelector(".js-roof-type");
    const areaInput = container.querySelector(".js-roof-area");
    const occSelect = container.querySelector(".js-occupancy");
    const outagesSelect = container.querySelector(".js-outages");

    if (roofSelect) roofSelect.addEventListener("change", e => widget.setState({ roofType: e.target.value }));
    if (areaInput) areaInput.addEventListener("change", e => widget.setState({ roofArea: Number(e.target.value) }));
    if (occSelect) occSelect.addEventListener("change", e => widget.setState({ occupancy: e.target.value }));
    if (outagesSelect) outagesSelect.addEventListener("change", e => widget.setState({ outages: e.target.value }));
  }

  const openLeadBtn = container.querySelector(".js-open-lead");
  if (openLeadBtn) {
    openLeadBtn.addEventListener("click", () => widget.openLeadModal());
  }

  const waBtn = container.querySelector(".js-track-wa");
  if (waBtn) {
    waBtn.addEventListener("click", () => trackEvent("calc_whatsapp", { block: "home" }));
  }

  // Render Canvas Chart
  const canvas = container.querySelector(".js-chart-canvas");
  if (canvas) {
    renderGenerationChart(canvas, result.generationMonth, result.consumptionYear, {
      theme: widget.options.theme
    });
  }
}
