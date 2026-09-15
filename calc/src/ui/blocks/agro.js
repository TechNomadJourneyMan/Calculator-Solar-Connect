/**
 * SolarConnect Block Preset - Agro Calculator (`agro`)
 */

import { calcSolar } from "../../core/engine.js";
import { calcDieselVsSolar } from "../../core/finance.js";
import { formatCurrency, formatKW, pluralize } from "../../core/format.js";
import { t } from "../i18n.js";
import { trackEvent } from "../../analytics/track.js";
import { renderEcoBox, renderPackageCard } from "../components.js";

export function renderAgroBlock(widget, container) {
  const lang = widget.options.lang || "ru";
  const state = widget.state;

  const kwhYear = state.kwhYear || 38000;
  const city = state.city || "almaty";
  const hasDiesel = state.hasDiesel !== undefined ? state.hasDiesel : true;

  const result = calcSolar({
    segment: "agro",
    city,
    consumptionYear: kwhYear,
    selfShare: 0.70,
    mode: "self"
  }, widget.config);

  const dieselComp = calcDieselVsSolar(kwhYear, result.capex, result.lcoe, widget.config);

  widget.currentResult = result;
  widget.notifyResult(result);

  container.innerHTML = `
    <div class="sc-container">
      <div class="sc-header">
        <h2 class="sc-title">Калькулятор для агросектора и фермерских хозяйств</h2>
        <p class="sc-subtitle">Полив, охлаждение, удалённые объекты и гибридные системы с накопителями</p>
      </div>

      <div class="sc-grid-2">
        <div class="sc-card">
          <div class="sc-form-group">
            <label class="sc-label">Годовое потребление (кВтч/год)</label>
            <input type="number" class="sc-input js-kwh-input" value="${kwhYear}">
          </div>

          <div class="sc-form-group">
            <label class="sc-label">Используется ли дизельный генератор?</label>
            <select class="sc-select js-diesel-select">
              <option value="true" ${hasDiesel ? "selected" : ""}>Да (заменяем дизельное топливо)</option>
              <option value="false" ${!hasDiesel ? "selected" : ""}>Нет (сетевая или автономная станция)</option>
            </select>
          </div>
        </div>

        <div>
          <div class="sc-result-box">
            <div class="sc-result-highlight">
              <div class="sc-result-subtext">${t("result.saving", lang)}</div>
              <div class="sc-result-value">${formatCurrency(result.savingYear)}</div>
              <div class="sc-result-subtext">Комплект включает накопитель LiFePO4</div>
            </div>

            <div class="sc-grid-3">
              <div class="sc-metric-card">
                <div class="sc-metric-val">${formatKW(result.kwp)}</div>
                <div class="sc-metric-lbl">Мощность</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">${formatCurrency(result.capex)}</div>
                <div class="sc-metric-lbl">Стоимость</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">~${result.paybackSimple} ${pluralize(Math.round(result.paybackSimple), ["год", "года", "лет"])}</div>
                <div class="sc-metric-lbl">Окупаемость</div>
              </div>
            </div>
          </div>

          ${hasDiesel ? `
            <div class="sc-card" style="margin-bottom: 16px; border-left: 4px solid var(--sc-sun);">
              <div class="sc-label">Сравнение: Солнечная станция vs Дизельный генератор</div>
              <div style="font-size:14px; margin-bottom: 6px;">Расход дизеля в год: <strong>${dieselComp.fuelLiters} литров</strong></div>
              <div style="font-size:14px; margin-bottom: 6px;">Затраты на дизель: <strong>${formatCurrency(dieselComp.dieselCostYear)}/год</strong></div>
              <div style="font-size:14px; color: var(--sc-green); font-weight:700;">Себестоимость 1 кВтч: Дизель ~${dieselComp.dieselLcoe} ₸ vs Солнце ~${dieselComp.solarLcoe} ₸</div>
            </div>
          ` : ""}

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

  const kwhInput = container.querySelector(".js-kwh-input");
  const dieselSelect = container.querySelector(".js-diesel-select");
  const openLeadBtn = container.querySelector(".js-open-lead");

  if (kwhInput) kwhInput.addEventListener("change", e => widget.setState({ kwhYear: Number(e.target.value) }));
  if (dieselSelect) dieselSelect.addEventListener("change", e => widget.setState({ hasDiesel: e.target.value === "true" }));
  if (openLeadBtn) openLeadBtn.addEventListener("click", () => widget.openLeadModal());
}
