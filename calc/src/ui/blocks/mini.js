/**
 * SolarConnect Block Preset - Mini Widget (`mini`)
 */

import { calcSolar } from "../../core/engine.js";
import { formatCurrency, formatKW } from "../../core/format.js";
import { t } from "../i18n.js";

export function renderMiniBlock(widget, container) {
  const lang = widget.options.lang || "ru";
  const state = widget.state;

  const bill = state.bill || 40000;
  const result = calcSolar({
    segment: "home",
    city: state.city || "almaty",
    bill
  }, widget.config);

  widget.currentResult = result;
  widget.notifyResult(result);

  container.innerHTML = `
    <div class="sc-container" style="padding: 16px; max-width: 360px;">
      <div style="font-weight: 700; font-size: 16px; color: var(--sc-navy); margin-bottom: 12px; text-align: center;">
        Быстрый расчёт станции
      </div>

      <div class="sc-form-group" style="margin-bottom: 12px;">
        <label class="sc-label" style="font-size: 12px;">Счёт за свет (₸/мес):</label>
        <input type="number" class="sc-input js-bill-input" style="height: 40px; font-size: 15px;" value="${bill}">
      </div>

      <div class="sc-card" style="background: linear-gradient(135deg, var(--sc-navy) 0%, var(--sc-navy-light) 100%); color: #FFF; padding: 14px; text-align: center; margin-bottom: 12px;">
        <div style="font-size: 11px; opacity: 0.85;">Экономия в год:</div>
        <div style="font-size: 26px; font-weight: 800; color: var(--sc-sun);">${formatCurrency(result.savingYear)}</div>
        <div style="font-size: 11px; opacity: 0.85; margin-top: 2px;">Станция: ${formatKW(result.kwp)} • ~${result.paybackSimple} лет окупаемость</div>
      </div>

      <button class="sc-btn sc-btn-full js-open-full" style="height: 44px; font-size: 14px;">
        ${t("cta.fullCalc", lang)}
      </button>
    </div>
  `;

  const inputEl = container.querySelector(".js-bill-input");
  const openBtn = container.querySelector(".js-open-full");

  if (inputEl) inputEl.addEventListener("change", e => widget.setState({ bill: Number(e.target.value) }));
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      widget.openLeadModal();
    });
  }
}
