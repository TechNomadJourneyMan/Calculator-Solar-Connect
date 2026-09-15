/**
 * SolarConnect Block Preset - Backup Calculator (`backup`)
 */

import { calcBackup } from "../../core/backup.js";
import { formatCurrency, formatKW } from "../../core/format.js";
import { t } from "../i18n.js";
import { trackEvent } from "../../analytics/track.js";

export function renderBackupBlock(widget, container) {
  const lang = widget.options.lang || "ru";
  const state = widget.state;

  const hoursAutonomy = state.hoursAutonomy || 24;
  const phase = state.phase || 1;

  // Selected appliances state array
  const defaultAppliances = [
    { id: "light", count: 1 },
    { id: "fridge", count: 1 },
    { id: "router", count: 1 },
    { id: "pump", count: 1 },
    { id: "tv", count: 1 }
  ];
  const selectedApps = state.selectedApps || defaultAppliances;

  const result = calcBackup({
    appliances: selectedApps,
    hoursAutonomy,
    phase
  }, widget.config);

  widget.currentResult = result;
  widget.notifyResult(result);

  const catalog = widget.config.backup?.appliances || [];

  const applianceRowsHTML = catalog.map(app => {
    const activeObj = selectedApps.find(a => a.id === app.id);
    const isChecked = !!activeObj;
    const count = activeObj ? activeObj.count : 1;

    return `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--sc-line);">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
          <input type="checkbox" class="js-app-check" data-id="${app.id}" ${isChecked ? "checked" : ""}>
          <span>${app.name} (${app.watt} Вт)</span>
        </label>
        ${isChecked ? `
          <div style="display: flex; align-items: center; gap: 6px;">
            <button class="sc-btn sc-btn-outline js-count-minus" data-id="${app.id}" style="width:28px; height:28px; padding:0;">-</button>
            <span style="font-weight:700; width:20px; text-align:center;">${count}</span>
            <button class="sc-btn sc-btn-outline js-count-plus" data-id="${app.id}" style="width:28px; height:28px; padding:0;">+</button>
          </div>
        ` : ""}
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="sc-container">
      <div class="sc-header">
        <h2 class="sc-title">Калькулятор резервного питания и автономности</h2>
        <p class="sc-subtitle">Подбор инвертора Deye и аккумуляторов LiFePO4 по списку приборов</p>
      </div>

      <div class="sc-grid-2">
        <div class="sc-card">
          <div class="sc-form-group">
            <label class="sc-label">${t("backup.autonomy", lang)}: <strong>${hoursAutonomy} ч</strong></label>
            <input type="range" class="sc-slider js-autonomy-slider" min="2" max="48" step="2" value="${hoursAutonomy}">
          </div>

          <div class="sc-form-group">
            <label class="sc-label">${t("backup.phase", lang)}</label>
            <select class="sc-select js-phase-select">
              <option value="1" ${phase === 1 ? "selected" : ""}>1-фазный ввод (220 В)</option>
              <option value="3" ${phase === 3 ? "selected" : ""}>3-фазный ввод (380 В)</option>
            </select>
          </div>

          <div class="sc-form-group">
            <label class="sc-label">${t("backup.appliances", lang)}</label>
            <div style="max-height: 260px; overflow-y: auto; padding-right: 4px;">
              ${applianceRowsHTML}
            </div>
          </div>
        </div>

        <div>
          <div class="sc-result-box">
            <div class="sc-result-highlight">
              <div class="sc-result-subtext">${t("backup.inverter", lang)} и ${t("backup.battery", lang)}</div>
              <div class="sc-result-value">${result.inverterKw} кВт / ${result.batteryInstalledKwh} кВтч</div>
              <div class="sc-result-subtext">Рекомендуемый комплект: ${result.moduleCount} ${pluralize(result.moduleCount, ["модуль", "модуля", "модулей"])} по 5 кВтч</div>
            </div>

            <div class="sc-grid-3">
              <div class="sc-metric-card">
                <div class="sc-metric-val">${result.peakLoadW} Вт</div>
                <div class="sc-metric-lbl">Пиковая нагрузка</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">${result.actualAutonomyHours} ч</div>
                <div class="sc-metric-lbl">Автономия</div>
              </div>
              <div class="sc-metric-card">
                <div class="sc-metric-val">${formatCurrency(result.estimatedPrice)}</div>
                <div class="sc-metric-lbl">Цена комплекта</div>
              </div>
            </div>
          </div>

          <div class="sc-card" style="margin-bottom: 16px;">
            <div class="sc-label" style="color: var(--sc-green);">${t("backup.active", lang)}:</div>
            <div style="font-size: 13px; color: var(--sc-gray); margin-bottom: 12px;">
              ${result.activeAppliances.map(a => `• ${a.name} (${a.count} шт, ${a.hours} ч/сут)`).join("<br>") || "Ничего не выбрано"}
            </div>

            ${result.excludedAppliances.length > 0 ? `
              <div class="sc-label" style="color: var(--sc-red);">${t("backup.excluded", lang)}:</div>
              <div style="font-size: 13px; color: var(--sc-gray);">
                ${result.excludedAppliances.slice(0, 5).map(a => `• ${a.name}`).join("<br>")}
              </div>
            ` : ""}
          </div>

          <div style="display: flex; gap: 12px;">
            <button class="sc-btn sc-btn-full js-open-lead">${t("form.submit", lang)}</button>
            <a href="${widget.getWhatsAppUrl(result)}" target="_blank" rel="noopener" class="sc-btn sc-btn-whatsapp">${t("cta.whatsapp", lang)}</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Handlers
  const slider = container.querySelector(".js-autonomy-slider");
  const phaseSelect = container.querySelector(".js-phase-select");
  const openLeadBtn = container.querySelector(".js-open-lead");

  if (slider) slider.addEventListener("input", e => widget.setState({ hoursAutonomy: Number(e.target.value) }));
  if (phaseSelect) phaseSelect.addEventListener("change", e => widget.setState({ phase: Number(e.target.value) }));
  if (openLeadBtn) openLeadBtn.addEventListener("click", () => widget.openLeadModal());

  // Checkbox handlers
  container.querySelectorAll(".js-app-check").forEach(chk => {
    chk.addEventListener("change", e => {
      const id = e.target.getAttribute("data-id");
      let updated = [...selectedApps];
      if (e.target.checked) {
        if (!updated.some(a => a.id === id)) updated.push({ id, count: 1 });
      } else {
        updated = updated.filter(a => a.id !== id);
      }
      widget.setState({ selectedApps: updated });
    });
  });

  // Plus / Minus handlers
  container.querySelectorAll(".js-count-plus").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id");
      const updated = selectedApps.map(a => a.id === id ? { ...a, count: a.count + 1 } : a);
      widget.setState({ selectedApps: updated });
    });
  });

  container.querySelectorAll(".js-count-minus").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id");
      const updated = selectedApps.map(a => a.id === id ? { ...a, count: Math.max(1, a.count - 1) } : a);
      widget.setState({ selectedApps: updated });
    });
  });
}
