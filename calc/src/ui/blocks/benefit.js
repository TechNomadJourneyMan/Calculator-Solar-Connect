/**
 * SolarConnect Block Preset - Benefit Calculator (`benefit`)
 */

import { calcSolar } from "../../core/engine.js";
import { formatCurrency, formatKW } from "../../core/format.js";
import { t } from "../i18n.js";
import { renderCashflowChart } from "../chart.js";
import { trackEvent } from "../../analytics/track.js";
import { renderEcoBox, renderPackageCard } from "../components.js";

export function renderBenefitBlock(widget, container) {
  const lang = widget.options.lang || "ru";
  const state = widget.state;

  const bill = state.bill || 62000;
  const tariffGrowth = state.tariffGrowth !== undefined ? state.tariffGrowth : 0.07;
  const horizonYears = state.horizonYears || 25;
  const discountRate = state.discountRate !== undefined ? state.discountRate : 0.12;

  const result = calcSolar({
    segment: "home",
    city: state.city || "almaty",
    bill,
    scenario: {
      tariffGrowth,
      years: horizonYears,
      discountRate
    }
  }, widget.config);

  widget.currentResult = result;
  widget.notifyResult(result);

  container.innerHTML = `
    <div class="sc-container">
      <div class="sc-header">
        <h2 class="sc-title">Калькулятор финансовой выгоды и LCOE</h2>
        <p class="sc-subtitle">Детальная финансовая модель на горизонте 10-25 лет с учётом роста тарифов и деградации</p>
      </div>

      <div class="sc-grid-2">
        <div class="sc-card">
          <div class="sc-form-group">
            <label class="sc-label">Месячный счёт за свет (₸)</label>
            <input type="number" class="sc-input js-bill-input" value="${bill}">
          </div>

          <div class="sc-form-group">
            <label class="sc-label">${t("benefit.tariffGrowth", lang)}: <strong>${Math.round(tariffGrowth * 100)}% в год</strong></label>
            <select class="sc-select js-growth-select">
              <option value="0" ${tariffGrowth === 0 ? "selected" : ""}>0% (без роста)</option>
              <option value="0.05" ${tariffGrowth === 0.05 ? "selected" : ""}>5% в год</option>
              <option value="0.07" ${tariffGrowth === 0.07 ? "selected" : ""}>7% в год (стандарт)</option>
              <option value="0.10" ${tariffGrowth === 0.10 ? "selected" : ""}>10% в год</option>
            </select>
          </div>

          <div class="sc-form-group">
            <label class="sc-label">${t("benefit.horizon", lang)}: <strong>${horizonYears} лет</strong></label>
            <select class="sc-select js-horizon-select">
              <option value="10" ${horizonYears === 10 ? "selected" : ""}>10 лет</option>
              <option value="15" ${horizonYears === 15 ? "selected" : ""}>15 лет</option>
              <option value="25" ${horizonYears === 25 ? "selected" : ""}>25 лет</option>
            </select>
          </div>

          <div class="sc-form-group">
            <label class="sc-label">${t("benefit.discountRate", lang)}: <strong>${Math.round(discountRate * 100)}%</strong></label>
            <select class="sc-select js-discount-select">
              <option value="0.08" ${discountRate === 0.08 ? "selected" : ""}>8% (инфляция)</option>
              <option value="0.12" ${discountRate === 0.12 ? "selected" : ""}>12% (депозитная ставка)</option>
              <option value="0.15" ${discountRate === 0.15 ? "selected" : ""}>15% (высокий риск)</option>
            </select>
          </div>
        </div>

        <div>
          <div class="sc-result-box">
            <div class="sc-result-highlight">
              <div class="sc-result-subtext">Суммарная экономия за ${horizonYears} лет</div>
              <div class="sc-result-value">${formatCurrency(result.savings25)}</div>
              <div class="sc-result-subtext">Себестоимость 1 кВтч (LCOE): <strong>${result.lcoe} ₸/кВтч</strong></div>
            </div>

            <div class="sc-grid-3">
              <div class="sc-metric-card">
                <div class="sc-metric-val">${formatCurrency(result.npv)}</div>
                <div class="sc-metric-lbl">NPV</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">${Math.round(result.irr * 100)}%</div>
                <div class="sc-metric-lbl">IRR</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">~${result.paybackDiscounted} лет</div>
                <div class="sc-metric-lbl">Дисконт. окупаемость</div>
              </div>
            </div>
          </div>

          <div class="sc-card" style="margin-bottom: 16px;">
            <div class="sc-label">Накопленный дисконтированный денежный поток</div>
            <canvas class="js-cashflow-canvas" style="width:100%; height:200px;"></canvas>
          </div>

          ${renderEcoBox(result)}
          ${renderPackageCard(result, widget)}

          <div style="display: flex; gap: 12px;">
            <button class="sc-btn sc-btn-full js-open-lead">${t("form.submit", lang)}</button>
            <a href="${widget.getWhatsAppUrl(result)}" target="_blank" rel="noopener" class="sc-btn sc-btn-whatsapp">${t("cta.whatsapp", lang)}</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Handlers
  const billInput = container.querySelector(".js-bill-input");
  const growthSelect = container.querySelector(".js-growth-select");
  const horizonSelect = container.querySelector(".js-horizon-select");
  const discountSelect = container.querySelector(".js-discount-select");
  const openLeadBtn = container.querySelector(".js-open-lead");

  if (billInput) billInput.addEventListener("change", e => widget.setState({ bill: Number(e.target.value) }));
  if (growthSelect) growthSelect.addEventListener("change", e => {
    trackEvent("calc_scenario", { param: "tariffGrowth", value: e.target.value });
    widget.setState({ tariffGrowth: Number(e.target.value) });
  });
  if (horizonSelect) horizonSelect.addEventListener("change", e => widget.setState({ horizonYears: Number(e.target.value) }));
  if (discountSelect) discountSelect.addEventListener("change", e => widget.setState({ discountRate: Number(e.target.value) }));
  if (openLeadBtn) openLeadBtn.addEventListener("click", () => widget.openLeadModal());

  const canvas = container.querySelector(".js-cashflow-canvas");
  if (canvas) {
    renderCashflowChart(canvas, result.cashflow, result.paybackDiscounted, {
      theme: widget.options.theme
    });
  }
}
