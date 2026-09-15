/**
 * SolarConnect Block Preset - Finance Calculator (`finance`)
 */

import { calcSolar } from "../../core/engine.js";
import { calcFinance } from "../../core/finance.js";
import { formatCurrency, formatKW } from "../../core/format.js";
import { t } from "../i18n.js";
import { trackEvent } from "../../analytics/track.js";

export function renderFinanceBlock(widget, container) {
  const lang = widget.options.lang || "ru";
  const state = widget.state;

  const activeTab = state.financeTab || "installments";
  const bill = state.bill || 62000;

  const solarResult = calcSolar({
    segment: "home",
    city: state.city || "almaty",
    bill
  }, widget.config);

  const finResult = calcFinance(solarResult, widget.config);

  widget.currentResult = solarResult;
  widget.notifyResult(solarResult);

  container.innerHTML = `
    <div class="sc-container">
      <div class="sc-header">
        <h2 class="sc-title">Финансовые инструменты и условия оплаты</h2>
        <p class="sc-subtitle">Рассрочка Kaspi/BCC, лизинг, зачёт излишков и сравнение с генератором</p>
      </div>

      <div class="sc-tabs">
        <button class="sc-tab js-tab-btn ${activeTab === "installments" ? "active" : ""}" data-tab="installments">${t("finance.tab.installments", lang)}</button>
        <button class="sc-tab js-tab-btn ${activeTab === "leasing" ? "active" : ""}" data-tab="leasing">${t("finance.tab.leasing", lang)}</button>
        <button class="sc-tab js-tab-btn ${activeTab === "net" ? "active" : ""}" data-tab="net">${t("finance.tab.net", lang)}</button>
        <button class="sc-tab js-tab-btn ${activeTab === "diesel" ? "active" : ""}" data-tab="diesel">${t("finance.tab.diesel", lang)}</button>
      </div>

      <div class="sc-card" style="margin-bottom: 20px;">
        <div class="sc-form-group">
          <label class="sc-label">Стоимость вашей станции (${formatKW(solarResult.kwp)}): <strong>${formatCurrency(solarResult.capex)}</strong></label>
          <div class="sc-slider-group">
            <input type="range" class="sc-slider js-bill-slider" min="10000" max="250000" step="1000" value="${bill}">
            <input type="number" class="sc-input js-bill-input" style="width:140px;" value="${bill}">
          </div>
        </div>
      </div>

      ${activeTab === "installments" ? `
        <div class="sc-grid-3">
          ${finResult.installments.map(inst => `
            <div class="sc-card" style="${inst.isSelfPaying ? "border: 2px solid var(--sc-green);" : ""}">
              <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">${inst.name}</div>
              <div style="font-size: 24px; font-weight: 800; color: var(--sc-navy); margin-bottom: 12px;">${formatCurrency(inst.monthly)}/мес</div>
              <div style="font-size: 13px; color: var(--sc-gray); margin-bottom: 4px;">Экономия в месяц: <strong>${formatCurrency(inst.monthlySaving)}</strong></div>
              <div style="font-size: 13px; color: ${inst.isSelfPaying ? "var(--sc-green)" : "var(--sc-ink)"}; font-weight: 700; margin-bottom: 12px;">
                ${inst.isSelfPaying ? "✓ Станция окупает себя сама!" : `Разница: +${formatCurrency(inst.netMonthly)}/мес`}
              </div>
              <div style="font-size: 12px; color: var(--sc-gray-light);">Переплата: ${formatCurrency(inst.overpayment)}</div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${activeTab === "leasing" ? `
        <div class="sc-card">
          <div style="font-weight: 700; font-size: 18px; margin-bottom: 12px;">Лизинг для юридических лиц (${finResult.leasing.months} месяцев)</div>
          <div class="sc-grid-4" style="margin-bottom: 16px;">
            <div class="sc-metric-card" style="background:var(--sc-bg-soft); color:var(--sc-ink);">
              <div class="sc-metric-val" style="color:var(--sc-navy);">${formatCurrency(finResult.leasing.downPayment)}</div>
              <div class="sc-metric-lbl">Авансовый взнос (20%)</div>
            </div>
            <div class="sc-metric-card" style="background:var(--sc-bg-soft); color:var(--sc-ink);">
              <div class="sc-metric-val" style="color:var(--sc-navy);">${formatCurrency(finResult.leasing.monthly)}</div>
              <div class="sc-metric-lbl">Ежемесячный платёж</div>
            </div>
            <div class="sc-metric-card" style="background:var(--sc-bg-soft); color:var(--sc-ink);">
              <div class="sc-metric-val" style="color:var(--sc-navy);">${formatCurrency(finResult.leasing.buyoutPayment)}</div>
              <div class="sc-metric-lbl">Выкупной платёж (1%)</div>
            </div>
            <div class="sc-metric-card" style="background:var(--sc-bg-soft); color:var(--sc-ink);">
              <div class="sc-metric-val" style="color:var(--sc-navy);">${formatCurrency(finResult.leasing.totalLease)}</div>
              <div class="sc-metric-lbl">Итого по лизингу</div>
            </div>
          </div>
          <div style="font-size: 13px; color: var(--sc-gray);">* Лизинговые платежи относятся на валовые расходы предприятия и уменьшают КПН.</div>
        </div>
      ` : ""}

      ${activeTab === "net" ? `
        <div class="sc-card">
          <div style="font-weight: 700; font-size: 18px; margin-bottom: 8px;">Режим Нетто-Потребителя (Зачёт излишков)</div>
          <p style="font-size: 14px; color: var(--sc-gray); margin-bottom: 16px;">
            Вырабатываемая днём энергия сначала питает ваши приборы. Излишки передаются в городскую сеть с зачётом 70% от розничного тарифа.
          </p>
          <div style="font-size: 16px; font-weight: 700; color: var(--sc-green);">
            Расчётная экономия при зачёте излишков: ${formatCurrency(solarResult.savingYear)} в год
          </div>
        </div>
      ` : ""}

      ${activeTab === "diesel" ? `
        <div class="sc-card">
          <div style="font-weight: 700; font-size: 18px; margin-bottom: 8px;">Сравнение затрат: Солнце vs Дизельный генератор</div>
          <div style="font-size: 15px; margin-bottom: 8px;">
            Стоимость 1 кВтч от дизельного генератора: <strong>~${finResult.diesel.dieselLcoe} ₸</strong>
          </div>
          <div style="font-size: 15px; margin-bottom: 16px; color: var(--sc-green); font-weight:700;">
            Стоимость 1 кВтч от Солнечной Станции (LCOE): <strong>~${finResult.diesel.solarLcoe} ₸</strong>
          </div>
          <div style="font-size: 14px; color: var(--sc-gray);">
            Солнечная станция окупает разницу с дизельным генератором за <strong>~${finResult.diesel.paybackVsDiesel || 3.5} года</strong>.
          </div>
        </div>
      ` : ""}

      <div style="margin-top: 20px; display: flex; gap: 12px;">
        <button class="sc-btn sc-btn-full js-open-lead">${t("form.submit", lang)}</button>
        <a href="${widget.getWhatsAppUrl(solarResult)}" target="_blank" rel="noopener" class="sc-btn sc-btn-whatsapp">${t("cta.whatsapp", lang)}</a>
      </div>
    </div>
  `;

  // Attach Handlers
  container.querySelectorAll(".js-tab-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const tab = e.target.getAttribute("data-tab");
      widget.setState({ financeTab: tab });
    });
  });

  const slider = container.querySelector(".js-bill-slider");
  const inputEl = container.querySelector(".js-bill-input");
  const openLeadBtn = container.querySelector(".js-open-lead");

  if (slider) slider.addEventListener("input", e => widget.setState({ bill: Number(e.target.value) }));
  if (inputEl) inputEl.addEventListener("change", e => widget.setState({ bill: Number(e.target.value) }));
  if (openLeadBtn) openLeadBtn.addEventListener("click", () => widget.openLeadModal());
}
