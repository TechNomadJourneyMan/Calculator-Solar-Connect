/**
 * SolarConnect Block Preset - Universal Multi-Calculator (`universal`)
 */

import { renderHomeBlock } from "./home.js";
import { renderBusinessBlock } from "./business.js";
import { renderAgroBlock } from "./agro.js";
import { renderBackupBlock } from "./backup.js";
import { t } from "../i18n.js";
import { trackEvent } from "../../analytics/track.js";

export function renderUniversalBlock(widget, container) {
  const lang = widget.options.lang || "ru";
  const state = widget.state;

  const activeSegment = state.activeSegment || null;

  if (activeSegment === "home") {
    renderWithBackButton(widget, container, renderHomeBlock);
    return;
  }
  if (activeSegment === "business") {
    renderWithBackButton(widget, container, renderBusinessBlock);
    return;
  }
  if (activeSegment === "agro") {
    renderWithBackButton(widget, container, renderAgroBlock);
    return;
  }
  if (activeSegment === "backup") {
    renderWithBackButton(widget, container, renderBackupBlock);
    return;
  }

  // Step 0 Launcher: 4 segment cards
  container.innerHTML = `
    <div class="sc-container">
      <div class="sc-header" style="text-align: center;">
        <h2 class="sc-title">${t("universal.title", lang)}</h2>
        <p class="sc-subtitle">Выберите ваш объект для расчёта за 30 секунд</p>
      </div>

      <div class="sc-grid-4">
        <div class="sc-card js-select-segment" data-segment="home" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">🏠</div>
          <div style="font-weight: 700; font-size: 16px; color: var(--sc-navy); margin-bottom: 4px;">${t("universal.home.title", lang)}</div>
          <div style="font-size: 13px; color: var(--sc-gray);">${t("universal.home.desc", lang)}</div>
        </div>

        <div class="sc-card js-select-segment" data-segment="business" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">🏢</div>
          <div style="font-weight: 700; font-size: 16px; color: var(--sc-navy); margin-bottom: 4px;">${t("universal.biz.title", lang)}</div>
          <div style="font-size: 13px; color: var(--sc-gray);">${t("universal.biz.desc", lang)}</div>
        </div>

        <div class="sc-card js-select-segment" data-segment="agro" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">🚜</div>
          <div style="font-weight: 700; font-size: 16px; color: var(--sc-navy); margin-bottom: 4px;">${t("universal.agro.title", lang)}</div>
          <div style="font-size: 13px; color: var(--sc-gray);">${t("universal.agro.desc", lang)}</div>
        </div>

        <div class="sc-card js-select-segment" data-segment="backup" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">⚡</div>
          <div style="font-weight: 700; font-size: 16px; color: var(--sc-navy); margin-bottom: 4px;">${t("universal.backup.title", lang)}</div>
          <div style="font-size: 13px; color: var(--sc-gray);">${t("universal.backup.desc", lang)}</div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll(".js-select-segment").forEach(card => {
    card.addEventListener("click", e => {
      const seg = e.currentTarget.getAttribute("data-segment");
      trackEvent("calc_start", { block: "universal", segment: seg });
      widget.setState({ activeSegment: seg });
    });
  });
}

function renderWithBackButton(widget, container, renderFn) {
  renderFn(widget, container);
  const header = container.querySelector(".sc-header");
  if (header) {
    const backBtn = document.createElement("button");
    backBtn.className = "sc-btn sc-btn-outline";
    backBtn.style.cssText = "height: 36px; padding: 0 12px; font-size: 13px; margin-bottom: 12px;";
    backBtn.innerHTML = `◄ ${t("cta.back", widget.options.lang || "ru")}`;
    backBtn.addEventListener("click", () => widget.setState({ activeSegment: null }));
    header.prepend(backBtn);
  }
}
