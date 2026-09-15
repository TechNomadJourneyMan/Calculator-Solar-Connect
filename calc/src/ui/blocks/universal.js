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

  // Step 0 Launcher: 4 interactive segment cards
  container.innerHTML = `
    <div class="sc-container">
      <div class="sc-header" style="text-align: center;">
        <h2 class="sc-title">${t("universal.title", lang)}</h2>
        <p class="sc-subtitle">Выберите ваш объект для расчёта за 30 секунд</p>
      </div>

      <div class="sc-grid-4">
        <button type="button" class="sc-card js-select-segment" data-segment="home" style="cursor: pointer; text-align: center; border: 1.5px solid var(--sc-line); background: var(--sc-card); padding: 24px; border-radius: var(--sc-radius); transition: all 0.2s ease;">
          <div style="font-size: 40px; margin-bottom: 12px;">🏠</div>
          <div style="font-weight: 700; font-size: 17px; color: var(--sc-navy); margin-bottom: 6px;">${t("universal.home.title", lang)}</div>
          <div style="font-size: 13px; color: var(--sc-gray); font-weight: normal;">${t("universal.home.desc", lang)}</div>
        </button>

        <button type="button" class="sc-card js-select-segment" data-segment="business" style="cursor: pointer; text-align: center; border: 1.5px solid var(--sc-line); background: var(--sc-card); padding: 24px; border-radius: var(--sc-radius); transition: all 0.2s ease;">
          <div style="font-size: 40px; margin-bottom: 12px;">🏢</div>
          <div style="font-weight: 700; font-size: 17px; color: var(--sc-navy); margin-bottom: 6px;">${t("universal.biz.title", lang)}</div>
          <div style="font-size: 13px; color: var(--sc-gray); font-weight: normal;">${t("universal.biz.desc", lang)}</div>
        </button>

        <button type="button" class="sc-card js-select-segment" data-segment="agro" style="cursor: pointer; text-align: center; border: 1.5px solid var(--sc-line); background: var(--sc-card); padding: 24px; border-radius: var(--sc-radius); transition: all 0.2s ease;">
          <div style="font-size: 40px; margin-bottom: 12px;">🚜</div>
          <div style="font-weight: 700; font-size: 17px; color: var(--sc-navy); margin-bottom: 6px;">${t("universal.agro.title", lang)}</div>
          <div style="font-size: 13px; color: var(--sc-gray); font-weight: normal;">${t("universal.agro.desc", lang)}</div>
        </button>

        <button type="button" class="sc-card js-select-segment" data-segment="backup" style="cursor: pointer; text-align: center; border: 1.5px solid var(--sc-line); background: var(--sc-card); padding: 24px; border-radius: var(--sc-radius); transition: all 0.2s ease;">
          <div style="font-size: 40px; margin-bottom: 12px;">⚡</div>
          <div style="font-weight: 700; font-size: 17px; color: var(--sc-navy); margin-bottom: 6px;">${t("universal.backup.title", lang)}</div>
          <div style="font-size: 13px; color: var(--sc-gray); font-weight: normal;">${t("universal.backup.desc", lang)}</div>
        </button>
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
