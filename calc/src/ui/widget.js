/**
 * SolarConnect Base Widget Framework
 * Handles Shadow DOM mounting, state management, 150ms debouncing, lead modal, and public API.
 */

import { DEFAULT_CONFIG, calcSolar } from "../core/engine.js";
import { formatPhoneMask, validateLeadForm } from "../core/validate.js";
import { submitLead, buildWhatsAppUrl, getUtmParams } from "../lead/submit.js";
import { trackEvent } from "../analytics/track.js";
import { t } from "./i18n.js";

import { renderUniversalBlock } from "./blocks/universal.js";
import { renderHomeBlock } from "./blocks/home.js";
import { renderBusinessBlock } from "./blocks/business.js";
import { renderAgroBlock } from "./blocks/agro.js";
import { renderBackupBlock } from "./blocks/backup.js";
import { renderBenefitBlock } from "./blocks/benefit.js";
import { renderFinanceBlock } from "./blocks/finance.js";
import { renderMiniBlock } from "./blocks/mini.js";

const BLOCK_RENDERERS = {
  universal: renderUniversalBlock,
  home: renderHomeBlock,
  business: renderBusinessBlock,
  agro: renderAgroBlock,
  backup: renderBackupBlock,
  benefit: renderBenefitBlock,
  finance: renderFinanceBlock,
  mini: renderMiniBlock
};

export class SCCalcWidget {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { ...options };
    this.blockType = options.block || element.getAttribute("data-sc-calc") || "home";
    this.config = { ...DEFAULT_CONFIG };
    this.state = this.loadDraftState();
    this.currentResult = null;
    this.eventListeners = { result: [], lead: [], error: [] };
    this.debounceTimer = null;
    this.shadowRoot = null;
    this.isLeadModalOpen = false;
    this.formOpenedAt = 0;

    this.init();
  }

  async init() {
    // 1. Attach Shadow DOM
    if (!this.element.shadowRoot) {
      this.shadowRoot = this.element.attachShadow({ mode: "open" });
    } else {
      this.shadowRoot = this.element.shadowRoot;
    }

    // 2. Render initial view IMMEDIATELY using fallback config (Instant UI, no blank flash!)
    this.render();

    // 3. Load external Config in background if available
    await this.loadConfig();

    // 4. Track View Event
    trackEvent("calc_view", { block: this.blockType, page: typeof window !== "undefined" ? window.location.href : "" });
  }

  async loadConfig() {
    if (typeof fetch !== "function") return;
    const configUrl = this.options.config || this.element.getAttribute("data-config") || "/calc/config.json";
    try {
      const res = await fetch(configUrl);
      if (res.ok) {
        const json = await res.json();
        this.config = { ...DEFAULT_CONFIG, ...json };
        this.render(); // Re-render with fetched config
      }
    } catch (e) {
      // Keep built-in config if fetch fails
    }
  }

  loadDraftState() {
    try {
      if (typeof localStorage !== "undefined") {
        const saved = localStorage.getItem("sc_calc_draft");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.timestamp && Date.now() - parsed.timestamp < 30 * 24 * 3600 * 1000) {
            return parsed.data || {};
          }
        }
      }
    } catch (e) {}

    const attrBill = this.element.getAttribute("data-bill");
    const attrCity = this.element.getAttribute("data-city");
    const attrInd = this.element.getAttribute("data-industry");

    return {
      bill: attrBill ? Number(attrBill) : 40000,
      city: attrCity || "almaty",
      industry: attrInd || "warehouse"
    };
  }

  saveDraftState() {
    try {
      if (typeof localStorage === "undefined") return;
      const safeState = { ...this.state };
      delete safeState.name;
      delete safeState.phone;
      localStorage.setItem("sc_calc_draft", JSON.stringify({
        timestamp: Date.now(),
        data: safeState
      }));
    } catch (e) {}
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.saveDraftState();

    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.render();
    }, 150);
  }

  render() {
    if (!this.shadowRoot) return;

    const cssText = this.options.css || "";
    let contentContainer = this.shadowRoot.querySelector(".sc-widget-root");

    if (!contentContainer) {
      this.shadowRoot.innerHTML = `
        <style>${cssText}</style>
        <div class="sc-widget-root"></div>
        <div class="sc-modal-container"></div>
      `;
      contentContainer = this.shadowRoot.querySelector(".sc-widget-root");
    }

    const renderer = BLOCK_RENDERERS[this.blockType] || BLOCK_RENDERERS.home;
    renderer(this, contentContainer);

    if (this.isLeadModalOpen) {
      this.renderLeadModal();
    }
  }

  notifyResult(result) {
    this.eventListeners.result.forEach(cb => cb(result));
    trackEvent("calc_result", {
      block: this.blockType,
      segment: result.segment,
      kwp: result.kwp,
      capex: result.capex,
      saving_year: result.savingYear,
      payback: result.paybackSimple
    });
  }

  getWhatsAppUrl(result) {
    const waPhone = this.options.whatsapp || this.element.getAttribute("data-whatsapp") || this.config.whatsapp || "77713169033";
    return buildWhatsAppUrl(waPhone, this.state, result || this.currentResult || {});
  }

  openLeadModal() {
    this.isLeadModalOpen = true;
    this.formOpenedAt = Date.now();
    trackEvent("calc_form_open", { block: this.blockType });
    this.renderLeadModal();
  }

  closeLeadModal() {
    this.isLeadModalOpen = false;
    const modalContainer = this.shadowRoot.querySelector(".sc-modal-container");
    if (modalContainer) modalContainer.innerHTML = "";
  }

  renderLeadModal() {
    const modalContainer = this.shadowRoot.querySelector(".sc-modal-container");
    if (!modalContainer) return;

    const lang = this.options.lang || "ru";
    const res = this.currentResult || {};

    modalContainer.innerHTML = `
      <div class="sc-modal-overlay">
        <div class="sc-modal-body">
          <button class="sc-modal-close js-modal-close">&times;</button>
          <h3 class="sc-title" style="font-size: 20px;">${t("form.title", lang)}</h3>
          <p class="sc-subtitle" style="margin-bottom: 16px;">${t("form.promise", lang)}</p>

          <form class="js-lead-form">
            <input type="text" name="hp_check" style="display:none;" tabindex="-1" autocomplete="off">

            <div class="sc-form-group">
              <label class="sc-label">${t("form.name", lang)} *</label>
              <input type="text" class="sc-input js-input-name" required placeholder="Асхат">
            </div>

            <div class="sc-form-group">
              <label class="sc-label">${t("form.phone", lang)} *</label>
              <input type="tel" class="sc-input js-input-phone" required placeholder="+7 (7XX) XXX-XX-XX">
            </div>

            <div class="sc-form-group">
              <label class="sc-label">${t("form.address", lang)}</label>
              <input type="text" class="sc-input js-input-address" placeholder="Например: Медеуский район">
            </div>

            <div class="sc-form-group">
              <label class="sc-label">${t("form.timing", lang)}</label>
              <select class="sc-select js-select-timing">
                <option value="this_month">${t("form.timing.now", lang)}</option>
                <option value="1-3_months" selected>${t("form.timing.soon", lang)}</option>
                <option value="later">${t("form.timing.later", lang)}</option>
              </select>
            </div>

            <div class="sc-form-group" style="margin-bottom: 16px;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                <input type="checkbox" class="js-input-consent" required>
                <span>${t("form.consent", lang)}</span>
              </label>
            </div>

            <div class="js-form-error" style="color: var(--sc-red); font-size: 13px; margin-bottom: 12px; display: none;"></div>

            <button type="submit" class="sc-btn sc-btn-full js-submit-lead-btn">${t("form.submit", lang)}</button>
          </form>
        </div>
      </div>
    `;

    modalContainer.querySelector(".js-modal-close").addEventListener("click", () => this.closeLeadModal());

    const phoneInput = modalContainer.querySelector(".js-input-phone");
    if (phoneInput) {
      phoneInput.addEventListener("input", e => {
        e.target.value = formatPhoneMask(e.target.value);
      });
    }

    const form = modalContainer.querySelector(".js-lead-form");
    const errBox = modalContainer.querySelector(".js-form-error");

    form.addEventListener("submit", async e => {
      e.preventDefault();
      errBox.style.display = "none";

      const name = modalContainer.querySelector(".js-input-name").value;
      const phone = phoneInput.value;
      const address = modalContainer.querySelector(".js-input-address").value;
      const timing = modalContainer.querySelector(".js-select-timing").value;
      const consent = modalContainer.querySelector(".js-input-consent").checked;
      const hp = modalContainer.querySelector("input[name='hp_check']").value;

      const valRes = validateLeadForm({ name, phone, consent, honeypot: hp }, this.formOpenedAt);
      if (!valRes.isValid) {
        errBox.textContent = valRes.errors[0];
        errBox.style.display = "block";
        return;
      }

      const submitBtn = modalContainer.querySelector(".js-submit-lead-btn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправка...";

      const payload = {
        source: "calculator",
        block: this.blockType,
        page: typeof window !== "undefined" ? window.location.href : "",
        created_at: new Date().toISOString(),
        contact: { name, phone, consent },
        input: { ...this.state, address, timing },
        result: {
          kwp: res.kwp,
          capex: res.capex,
          kit: res.kit?.name,
          generationYear: res.generationYear,
          savingYear: res.savingYear,
          paybackSimple: res.paybackSimple,
          irr: res.irr
        },
        utm: getUtmParams(),
        meta: {
          widget_version: "1.0.0",
          config_version: this.config.version || "2026-09-15",
          duration_sec: Math.round((Date.now() - this.formOpenedAt) / 1000)
        }
      };

      const endpoint = this.options.leadEndpoint || this.element.getAttribute("data-lead-endpoint") || this.config.leadEndpoint || "/api/lead";

      submitLead(payload, endpoint,
        data => {
          trackEvent("calc_lead_submit", { block: this.blockType, kwp: res.kwp, capex: res.capex });
          this.eventListeners.lead.forEach(cb => cb(payload));

          modalContainer.querySelector(".sc-modal-body").innerHTML = `
            <h3 class="sc-title" style="color: var(--sc-green);">${t("form.success", lang)}</h3>
            <p style="margin-bottom: 20px;">Спасибо, ${name}! Мы подготовим точный схемы и спецификации оборудования.</p>
            <button class="sc-btn sc-btn-full js-close-success">Закрыть</button>
          `;
          modalContainer.querySelector(".js-close-success").addEventListener("click", () => this.closeLeadModal());
        },
        err => {
          trackEvent("calc_lead_error", { block: this.blockType, reason: err.message });
          const waUrl = this.getWhatsAppUrl(res);
          modalContainer.querySelector(".sc-modal-body").innerHTML = `
            <h3 class="sc-title" style="color: var(--sc-red);">${t("form.error", lang)}</h3>
            <p style="margin-bottom: 20px;">Вы можете отправить расчёт напрямую нашему инженеру в WhatsApp:</p>
            <a href="${waUrl}" target="_blank" rel="noopener" class="sc-btn sc-btn-whatsapp sc-btn-full">Написать в WhatsApp</a>
          `;
        }
      );
    });
  }

  on(event, handler) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].push(handler);
    }
  }

  destroy() {
    if (this.element && this.element.shadowRoot) {
      this.element.shadowRoot.innerHTML = "";
    }
  }
}

const instanceMap = new Map();

export const SCCalc = {
  version: "1.0.0",

  mount(el, options = {}) {
    if (typeof el === "string") {
      el = document.querySelector(el);
    }
    if (!el) return null;

    const widget = new SCCalcWidget(el, options);
    instanceMap.set(el, widget);
    return widget;
  },

  scan(root = document) {
    const nodes = root.querySelectorAll("[data-sc-calc]");
    nodes.forEach(node => {
      if (!instanceMap.has(node)) {
        this.mount(node);
      }
    });
  },

  destroy(el) {
    if (typeof el === "string") el = document.querySelector(el);
    if (instanceMap.has(el)) {
      instanceMap.get(el).destroy();
      instanceMap.delete(el);
    }
  },

  calc(input) {
    return calcSolar(input, DEFAULT_CONFIG);
  },

  on(event, handler) {
    instanceMap.forEach(widget => widget.on(event, handler));
  },

  setConfig(configObject) {
    Object.assign(DEFAULT_CONFIG, configObject);
  }
};
