
/**
 * SolarConnect Multi-Calculator System (sc-calc.js)
 * Standalone ES2019 IIFE Bundle. Zero external dependencies.
 * Version: 1.0.0 (2026-09-15)
 */
(function() {
  'use strict';

  const INLINED_CSS = "/* SolarConnect Calculator Design System */\n:host {\n  --sc-navy: #0E2A47;\n  --sc-navy-light: #1A3F66;\n  --sc-sun: #F5A300;\n  --sc-sun-hover: #E09400;\n  --sc-ink: #222B36;\n  --sc-gray: #5B6775;\n  --sc-gray-light: #8C9BAA;\n  --sc-line: #D5DCE4;\n  --sc-bg: #FFFFFF;\n  --sc-bg-soft: #F5F7FA;\n  --sc-card: #FFFFFF;\n  --sc-green: #2E7D32;\n  --sc-green-bg: #E8F5E9;\n  --sc-red: #C0392B;\n  --sc-red-bg: #FDEDEC;\n  --sc-radius: 14px;\n  --sc-radius-sm: 8px;\n  --sc-font: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif;\n  --sc-shadow: 0 4px 20px rgba(14, 42, 71, 0.08);\n  --sc-shadow-lg: 0 10px 30px rgba(14, 42, 71, 0.12);\n  display: block;\n  font-family: var(--sc-font);\n  color: var(--sc-ink);\n  box-sizing: border-box;\n}\n\n:host([data-theme=\"dark\"]) {\n  --sc-navy: #1E3E62;\n  --sc-navy-light: #2B527E;\n  --sc-ink: #F0F4F8;\n  --sc-gray: #A0B0C0;\n  --sc-gray-light: #6C7D93;\n  --sc-line: #2C3E50;\n  --sc-bg: #0B1622;\n  --sc-bg-soft: #132232;\n  --sc-card: #182A3E;\n  --sc-green: #4CAF50;\n  --sc-green-bg: #1B382B;\n  --sc-red: #E74C3C;\n  --sc-red-bg: #3E1E1E;\n  --sc-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n}\n\n*, *:before, *:after {\n  box-sizing: inherit;\n}\n\n.sc-container {\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 24px;\n  background: var(--sc-bg-soft);\n  border-radius: var(--sc-radius);\n  border: 1px solid var(--sc-line);\n  box-shadow: var(--sc-shadow);\n  transition: background 0.3s ease, border-color 0.3s ease;\n}\n\n.sc-header {\n  margin-bottom: 24px;\n}\n\n.sc-title {\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--sc-navy);\n  margin: 0 0 6px 0;\n  line-height: 1.25;\n}\n\n:host([data-theme=\"dark\"]) .sc-title {\n  color: #FFFFFF;\n}\n\n.sc-subtitle {\n  font-size: 14px;\n  color: var(--sc-gray);\n  margin: 0;\n}\n\n.sc-grid-2 {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n\n.sc-grid-3 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.sc-grid-4 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n}\n\n@media (max-width: 768px) {\n  .sc-container {\n    padding: 16px;\n  }\n  .sc-grid-2, .sc-grid-3, .sc-grid-4 {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n}\n\n.sc-card {\n  background: var(--sc-card);\n  border: 1px solid var(--sc-line);\n  border-radius: var(--sc-radius);\n  padding: 20px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);\n}\n\n.sc-form-group {\n  margin-bottom: 20px;\n}\n\n.sc-label {\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--sc-ink);\n  margin-bottom: 8px;\n}\n\n.sc-slider-group {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.sc-input {\n  width: 100%;\n  height: 48px;\n  padding: 0 16px;\n  font-size: 16px;\n  font-family: var(--sc-font);\n  color: var(--sc-ink);\n  background: var(--sc-bg);\n  border: 1.5px solid var(--sc-line);\n  border-radius: var(--sc-radius-sm);\n  outline: none;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n\n.sc-input:focus {\n  border-color: var(--sc-sun);\n  box-shadow: 0 0 0 3px rgba(245, 163, 0, 0.2);\n}\n\n.sc-slider {\n  flex: 1;\n  height: 8px;\n  -webkit-appearance: none;\n  appearance: none;\n  background: var(--sc-line);\n  border-radius: 4px;\n  outline: none;\n  cursor: pointer;\n}\n\n.sc-slider::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: var(--sc-sun);\n  border: 3px solid #FFFFFF;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);\n  cursor: pointer;\n  transition: transform 0.15s ease;\n}\n\n.sc-slider::-webkit-slider-thumb:hover {\n  transform: scale(1.15);\n}\n\n.sc-select {\n  width: 100%;\n  height: 48px;\n  padding: 0 16px;\n  font-size: 16px;\n  font-family: var(--sc-font);\n  color: var(--sc-ink);\n  background: var(--sc-bg);\n  border: 1.5px solid var(--sc-line);\n  border-radius: var(--sc-radius-sm);\n  outline: none;\n  cursor: pointer;\n}\n\n.sc-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 52px;\n  padding: 0 24px;\n  font-size: 16px;\n  font-weight: 700;\n  font-family: var(--sc-font);\n  color: var(--sc-navy);\n  background: var(--sc-sun);\n  border: none;\n  border-radius: var(--sc-radius-sm);\n  cursor: pointer;\n  text-decoration: none;\n  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;\n  min-width: 44px;\n  min-height: 44px;\n}\n\n.sc-btn:hover {\n  background: var(--sc-sun-hover);\n  box-shadow: 0 4px 12px rgba(245, 163, 0, 0.3);\n}\n\n.sc-btn:active {\n  transform: translateY(1px);\n}\n\n.sc-btn-full {\n  width: 100%;\n}\n\n.sc-btn-outline {\n  background: transparent;\n  border: 2px solid var(--sc-sun);\n  color: var(--sc-navy);\n}\n\n:host([data-theme=\"dark\"]) .sc-btn-outline {\n  color: #FFFFFF;\n}\n\n.sc-btn-whatsapp {\n  background: #25D366;\n  color: #FFFFFF;\n}\n\n.sc-btn-whatsapp:hover {\n  background: #1EBE5D;\n  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);\n}\n\n.sc-result-box {\n  background: linear-gradient(135deg, var(--sc-navy) 0%, var(--sc-navy-light) 100%);\n  color: #FFFFFF;\n  border-radius: var(--sc-radius);\n  padding: 24px;\n  margin-bottom: 24px;\n  box-shadow: var(--sc-shadow-lg);\n}\n\n.sc-result-highlight {\n  margin-bottom: 16px;\n}\n\n.sc-result-value {\n  font-size: 38px;\n  font-weight: 800;\n  color: var(--sc-sun);\n  line-height: 1.1;\n}\n\n.sc-result-subtext {\n  font-size: 14px;\n  color: rgba(255, 255, 255, 0.85);\n  margin-top: 4px;\n}\n\n.sc-metric-card {\n  background: rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: var(--sc-radius-sm);\n  padding: 14px;\n  text-align: center;\n}\n\n.sc-metric-val {\n  font-size: 20px;\n  font-weight: 700;\n  color: #FFFFFF;\n}\n\n.sc-metric-lbl {\n  font-size: 12px;\n  color: rgba(255, 255, 255, 0.7);\n  margin-top: 2px;\n}\n\n.sc-accordion {\n  border: 1px solid var(--sc-line);\n  border-radius: var(--sc-radius-sm);\n  background: var(--sc-card);\n  margin-top: 16px;\n  overflow: hidden;\n}\n\n.sc-accordion-header {\n  padding: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  user-select: none;\n}\n\n.sc-accordion-content {\n  padding: 16px;\n  border-top: 1px solid var(--sc-line);\n  background: var(--sc-bg-soft);\n}\n\n.sc-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n\n.sc-table th, .sc-table td {\n  padding: 10px 12px;\n  text-align: left;\n  border-bottom: 1px solid var(--sc-line);\n}\n\n.sc-table th {\n  font-weight: 600;\n  color: var(--sc-gray);\n  background: var(--sc-bg-soft);\n}\n\n.sc-badge {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.sc-badge-fact { background: #E3F2FD; color: #1565C0; }\n.sc-badge-estimate { background: #FFF3E0; color: #E65100; }\n.sc-badge-assumption { background: #F3E5F5; color: #7B1FA2; }\n\n.sc-warning {\n  background: var(--sc-red-bg);\n  border-left: 4px solid var(--sc-red);\n  color: var(--sc-red);\n  padding: 12px 16px;\n  border-radius: var(--sc-radius-sm);\n  font-size: 13px;\n  margin-bottom: 16px;\n}\n\n.sc-disclaimer {\n  font-size: 12px;\n  color: var(--sc-gray);\n  line-height: 1.4;\n  margin-top: 20px;\n}\n\n.sc-tabs {\n  display: flex;\n  gap: 8px;\n  border-bottom: 2px solid var(--sc-line);\n  margin-bottom: 20px;\n  overflow-x: auto;\n}\n\n.sc-tab {\n  padding: 12px 20px;\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--sc-gray);\n  background: none;\n  border: none;\n  border-bottom: 3px solid transparent;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.2s ease;\n}\n\n.sc-tab.active {\n  color: var(--sc-navy);\n  border-bottom-color: var(--sc-sun);\n}\n\n:host([data-theme=\"dark\"]) .sc-tab.active {\n  color: #FFFFFF;\n}\n\n/* Modal Popup for lead form or detailed view */\n.sc-modal-overlay {\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: rgba(14, 42, 71, 0.6);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  padding: 16px;\n}\n\n.sc-modal-body {\n  background: var(--sc-card);\n  border-radius: var(--sc-radius);\n  max-width: 600px;\n  width: 100%;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding: 24px;\n  box-shadow: var(--sc-shadow-lg);\n  position: relative;\n}\n\n.sc-modal-close {\n  position: absolute;\n  top: 16px; right: 16px;\n  background: none;\n  border: none;\n  font-size: 24px;\n  color: var(--sc-gray);\n  cursor: pointer;\n}\n";

  /**
 * SolarConnect Calculation Engine - Core Physics & Economics
 * Pure functions, zero DOM dependencies, ES2019.
 */

const DEFAULT_CONFIG = {
  version: "2026-09-15",
  priceUpdatedAt: "2026-09-15",
  currency: "KZT",
  panelKw: 0.65,
  cities: {
    almaty: {
      name: "Алматы",
      tariff: 30,
      yieldPerKw: 1462,
      monthly: [4.0, 5.0, 8.0, 9.5, 11.0, 12.0, 12.5, 11.5, 10.0, 8.0, 5.0, 3.5],
      verified: true
    }
  },
  segments: {
    home: { min: 3, max: 20, selfShare: 0.35 },
    business: { min: 20, max: 500, selfShare: 0.80 },
    agro: { min: 10, max: 100, selfShare: 0.70 }
  },
  pricePoints: {
    home: [[6.5, 246182], [13, 238922], [19.5, 296301]],
    business: [[65, 184615], [105.3, 189934], [210.6, 189934]],
    agro: [[6.5, 511498], [13, 449211], [26, 413153]]
  },
  kits: [
    { id: "home-6.5", segment: "home", name: "Дом-минимум", kw: 6.5, price: 1600181, storageKwh: 0 },
    { id: "home-13", segment: "home", name: "Дом-оптимум", kw: 13, price: 3105988, storageKwh: 0 },
    { id: "home-19.5", segment: "home", name: "Дом-максимум", kw: 19.5, price: 5777863, storageKwh: 0 },
    { id: "biz-65", segment: "business", name: "Бизнес-65", kw: 65, price: 12000000, storageKwh: 0 },
    { id: "biz-105", segment: "business", name: "Бизнес-105", kw: 105.3, price: 20000000, storageKwh: 0 },
    { id: "biz-210", segment: "business", name: "Бизнес-210", kw: 210.6, price: 40000000, storageKwh: 0 },
    { id: "agro-6.5", segment: "agro", name: "Агро-6.5", kw: 6.5, price: 3324738, storageKwh: 5 },
    { id: "agro-13", segment: "agro", name: "Агро-13", kw: 13, price: 5839738, storageKwh: 16 },
    { id: "agro-26", segment: "agro", name: "Агро-26", kw: 26, price: 10741975, storageKwh: 32 }
  ],
  kitTolerance: 0.10,
  economics: {
    creditRate: 0.7,
    tariffGrowth: 0.07,
    degradation: 0.005,
    omRate: 0.005,
    inverterReplaceYear: 13,
    inverterReplaceShare: 0.12,
    discountRate: 0.12,
    horizonYears: 25
  },
  area: { pitched: 5, flat: 11, ground: 11 },
  backup: {
    dod: 0.9,
    inverterEff: 0.92,
    cycleEff: 0.95,
    moduleKwh: 5,
    inverterLine: [5, 8, 12, 20, 30, 50],
    appliances: [
      { id: "light", name: "Освещение (весь дом)", watt: 100, hours: 5, duty: 1, start: 1 },
      { id: "fridge", name: "Холодильник", watt: 150, hours: 24, duty: 0.3, start: 3 },
      { id: "router", name: "Роутер и связь", watt: 20, hours: 24, duty: 1, start: 1 },
      { id: "pump", name: "Насос отопления", watt: 100, hours: 8, duty: 1, start: 3 },
      { id: "tv", name: "Телевизор", watt: 120, hours: 4, duty: 1, start: 1 },
      { id: "pc", name: "Компьютер", watt: 200, hours: 6, duty: 1, start: 1 },
      { id: "washer", name: "Стиральная машина", watt: 2000, hours: 1, duty: 1, start: 1 },
      { id: "ac", name: "Кондиционер", watt: 1200, hours: 6, duty: 1, start: 3 },
      { id: "well", name: "Скважинный насос", watt: 1500, hours: 2, duty: 1, start: 3 },
      { id: "boiler", name: "Котёл электрический", watt: 3000, hours: 4, duty: 1, start: 1 },
      { id: "freezer", name: "Морозильный ларь", watt: 200, hours: 24, duty: 0.4, start: 3 },
      { id: "pos", name: "Касса и серверная", watt: 500, hours: 12, duty: 1, start: 1 }
    ]
  },
  finance: {
    installments: [
      { id: "kaspi-12", name: "Kaspi, 12 месяцев", months: 12, rate: 0.0, down: 0 },
      { id: "kaspi-24", name: "Kaspi, 24 месяца", months: 24, rate: 0.0, down: 0 },
      { id: "bcc-36", name: "BCC, 36 месяцев", months: 36, rate: 0.12, down: 0 }
    ],
    leasing: { months: 48, rate: 0.18, down: 0.2, buyout: 0.01 },
    diesel: { fuelPerKwh: 0.3, fuelPrice: 290, maintenancePerHour: 120 }
  }
};

function pricePerKw(segment, kwp, config) {
  const pts = (config.pricePoints && config.pricePoints[segment]) || DEFAULT_CONFIG.pricePoints[segment] || DEFAULT_CONFIG.pricePoints.home;
  if (kwp <= pts[0][0]) return pts[0][1];
  if (kwp >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    if (kwp >= x1 && kwp <= x2) {
      return y1 + (y2 - y1) * (kwp - x1) / (x2 - x1);
    }
  }
  return pts[0][1];
}

function calcIRR(cashflows) {
  function npvAtRate(rate) {
    let val = 0;
    for (let t = 0; t < cashflows.length; t++) {
      val += cashflows[t] / Math.pow(1 + rate, t);
    }
    return val;
  }

  let low = -0.9;
  let high = 1.0;
  let npvLow = npvAtRate(low);
  let npvHigh = npvAtRate(high);

  if (npvLow * npvHigh > 0) {
    high = 3.0;
    npvHigh = npvAtRate(high);
    if (npvLow * npvHigh > 0) return 0;
  }

  for (let i = 0; i < 200; i++) {
    const mid = (low + high) / 2;
    const npvMid = npvAtRate(mid);
    if (Math.abs(npvMid) < 1e-5) return mid;
    if (npvLow * npvMid < 0) {
      high = mid;
      npvHigh = npvMid;
    } else {
      low = mid;
      npvLow = npvMid;
    }
  }

  return (low + high) / 2;
}

function calcSolar(input = {}, config = DEFAULT_CONFIG) {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const warnings = [];
  const assumptions = [];

  const segment = input.segment || "home";
  const segConfig = (cfg.segments && cfg.segments[segment]) || cfg.segments.home;
  const cityKey = input.city || "almaty";
  const cityConfig = (cfg.cities && cfg.cities[cityKey]) || cfg.cities.almaty || {
    name: "Алматы",
    tariff: 30,
    yieldPerKw: 1462,
    monthly: [4.0, 5.0, 8.0, 9.5, 11.0, 12.0, 12.5, 11.5, 10.0, 8.0, 5.0, 3.5],
    verified: true
  };

  const tariff = cityConfig.tariff || 30;
  const yieldPerKw = cityConfig.yieldPerKw || 1462;
  const panelKw = cfg.panelKw || 0.65;

  assumptions.push({
    key: "tariff",
    value: `${tariff} ₸/кВтч`,
    label: "Тариф на электроэнергию",
    source: cfg.sources?.tariff || "Сайт SolarConnect",
    status: "FACT"
  });

  assumptions.push({
    key: "yieldPerKw",
    value: `${yieldPerKw} кВтч/кВт`,
    label: "Удельная годовая выработка",
    source: cfg.sources?.yieldPerKw || "Сайт SolarConnect",
    status: cityConfig.verified ? "ОЦЕНКА" : "ДОПУЩЕНИЕ"
  });

  if (!cityConfig.verified) {
    warnings.push("Данные по выбранному городу являются предварительной оценкой.");
  }

  // 1. Consumption calculation
  let consumptionYear = 0;
  if (typeof input.consumptionYear === "number" && input.consumptionYear > 0) {
    consumptionYear = input.consumptionYear;
  } else {
    const bill = typeof input.bill === "number" && input.bill > 0 ? input.bill : 40000;
    consumptionYear = (bill * 12) / tariff;
  }

  // 2. Target kWp calculation & panel stepping (0.65 kW)
  const rawKwpTarget = consumptionYear / yieldPerKw;
  let kwp = Math.max(panelKw, Math.round(rawKwpTarget / panelKw) * panelKw);

  // Segment range clamping
  if (kwp < segConfig.min) {
    warnings.push(`Минимальная мощность для сегмента "${segment}" составляет ${segConfig.min} кВт.`);
    kwp = segConfig.min;
  } else if (kwp > segConfig.max) {
    warnings.push(`Мощность превышает лимит ${segConfig.max} кВт. Проверьте сценарий или свяжитесь с инженером.`);
    kwp = segConfig.max;
  }

  // 3. Roof Area check
  const roofType = input.roofType || "pitched";
  const areaPerKw = (cfg.area && cfg.area[roofType]) || 5;
  let areaNeeded = Math.round(kwp * areaPerKw * 10) / 10;
  let areaFits = true;
  let availableArea = input.roofArea || null;

  if (typeof availableArea === "number" && availableArea > 0) {
    if (areaNeeded > availableArea) {
      const maxKwpByArea = Math.floor(availableArea / areaPerKw / panelKw) * panelKw;
      if (maxKwpByArea < kwp) {
        areaFits = false;
        kwp = Math.max(panelKw, maxKwpByArea);
        const coveredShare = Math.round(((kwp * yieldPerKw) / consumptionYear) * 100);
        warnings.push(`По вашей площади (${availableArea} м²) помещается ${kwp.toFixed(1)} кВт. Это покроет ${coveredShare}% потребления.`);
      }
    }
  }

  // 4. Kit Matching Rule (Section 6.5)
  const kits = (cfg.kits || []).filter(k => k.segment === segment);
  const tolerance = cfg.kitTolerance || 0.10;

  let matchedKit = null;
  for (const kit of kits) {
    if (Math.abs(kit.kw - kwp) <= kit.kw * tolerance) {
      matchedKit = kit;
      break;
    }
  }

  let capex = 0;
  let isInterpolatedPrice = false;

  if (matchedKit) {
    kwp = matchedKit.kw;
    capex = matchedKit.price;
  } else {
    const unitPrice = pricePerKw(segment, kwp, cfg);
    capex = Math.round((kwp * unitPrice) / 10000) * 10000;
    isInterpolatedPrice = true;
  }

  kwp = Math.round(kwp * 100) / 100;
  areaNeeded = Math.round(kwp * areaPerKw * 10) / 10;

  if (isInterpolatedPrice) {
    assumptions.push({
      key: "priceNote",
      value: "Ориентировочная стоимость",
      label: "Расчёт цены",
      source: `Прайс от ${cfg.priceUpdatedAt || "2026-09-15"}`,
      status: "ОЦЕНКА"
    });
  }

  // 5. Generation calculation
  const generationYear = Math.round(kwp * yieldPerKw);
  const monthlyProfile = cityConfig.monthly || [4, 5, 8, 9.5, 11, 12, 12.5, 11.5, 10, 8, 5, 3.5];
  const generationMonth = monthlyProfile.map(pct => Math.round(generationYear * pct / 100));

  // 6. Savings Calculation (Mode Net vs Self)
  const mode = input.mode || "net";
  const defaultSelfShare = segConfig.selfShare !== undefined ? segConfig.selfShare : 0.35;
  const selfShare = typeof input.selfShare === "number" ? input.selfShare : defaultSelfShare;
  const creditRate = cfg.economics?.creditRate ?? 0.7;

  let savingYear = 0;
  if (mode === "net") {
    savingYear = Math.min(generationYear, consumptionYear) * tariff;
  } else {
    const selfUse = Math.min(generationYear * selfShare, consumptionYear);
    const surplus = Math.max(0, generationYear - selfUse);
    savingYear = selfUse * tariff + surplus * tariff * creditRate;
  }

  const annualBillLimit = (typeof input.bill === "number" && input.bill > 0) ? input.bill * 12 : consumptionYear * tariff;
  savingYear = Math.min(savingYear, annualBillLimit);
  savingYear = Math.round(savingYear);

  const savingMonthAvg = Math.round(savingYear / 12);
  const savingShareOfBill = Math.min(1.0, savingYear / annualBillLimit);

  assumptions.push({
    key: "mode",
    value: mode === "net" ? "Полный зачёт (1 к 1)" : `Самопотребление ${Math.round(selfShare * 100)}% + зачёт ${creditRate * 100}%`,
    label: "Режим учёта выработки",
    source: cfg.sources?.selfShare || "Допущение калькулятора",
    status: "ДОПУЩЕНИЕ"
  });

  // 7. Financial Model (25-year Cashflows)
  const sc = input.scenario || {};
  const years = sc.years || cfg.economics?.horizonYears || 25;
  const tariffGrowth = sc.tariffGrowth !== undefined ? sc.tariffGrowth : cfg.economics?.tariffGrowth ?? 0.07;
  const degradation = sc.degradation !== undefined ? sc.degradation : cfg.economics?.degradation ?? 0.005;
  const discountRate = sc.discountRate !== undefined ? sc.discountRate : cfg.economics?.discountRate ?? 0.12;
  const omRate = cfg.economics?.omRate ?? 0.005;
  const invYear = cfg.economics?.inverterReplaceYear ?? 13;
  const invShare = cfg.economics?.inverterReplaceShare ?? 0.12;

  assumptions.push({
    key: "tariffGrowth",
    value: `${Math.round(tariffGrowth * 100)}% в год`,
    label: "Рост тарифа",
    source: "Параметр сценария",
    status: "ДОПУЩЕНИЕ"
  });

  assumptions.push({
    key: "degradation",
    value: `${(degradation * 100).toFixed(1)}% в год`,
    label: "Деградация панелей",
    source: "Типовой паспорт Longi",
    status: "ДОПУЩЕНИЕ"
  });

  const cashflows = [];
  const rawCashflowSeries = [-capex];
  let cumCashflow = -capex;
  let cumDiscountedCashflow = -capex;
  let paybackSimple = Math.round((capex / (savingYear || 1)) * 10) / 10;
  let paybackDiscounted = null;
  let totalSavings25 = 0;
  let discOpexSum = 0;
  let discGenSum = 0;

  for (let t = 1; t <= years; t++) {
    const degradationFactor = Math.max(0.5, 1 - degradation * (t - 1));
    const tariffFactor = Math.pow(1 + tariffGrowth, t - 1);
    const yrGen = generationYear * degradationFactor;

    let yrSaving = 0;
    if (mode === "net") {
      yrSaving = Math.min(yrGen, consumptionYear) * tariff * tariffFactor;
    } else {
      const yrSelf = Math.min(yrGen * selfShare, consumptionYear);
      const yrSurplus = Math.max(0, yrGen - yrSelf);
      yrSaving = yrSelf * tariff * tariffFactor + yrSurplus * tariff * tariffFactor * creditRate;
    }

    const yrOpex = capex * omRate;
    const yrInvReplace = t === invYear ? capex * invShare : 0;
    const yrNet = Math.round(yrSaving - yrOpex - yrInvReplace);

    totalSavings25 += yrNet;

    const discountFactor = 1 / Math.pow(1 + discountRate, t);
    const yrDiscountedNet = yrNet * discountFactor;

    discOpexSum += (yrOpex + yrInvReplace) * discountFactor;
    discGenSum += yrGen * discountFactor;

    const prevCumDisc = cumDiscountedCashflow;
    cumCashflow += yrNet;
    cumDiscountedCashflow += yrDiscountedNet;

    if (paybackDiscounted === null && cumDiscountedCashflow >= 0) {
      const frac = prevCumDisc < 0 ? (-prevCumDisc) / (yrDiscountedNet || 1) : 0;
      paybackDiscounted = Math.round(((t - 1) + frac) * 10) / 10;
    }

    rawCashflowSeries.push(yrNet);

    cashflows.push({
      year: t,
      saving: Math.round(yrSaving),
      opex: Math.round(yrOpex + yrInvReplace),
      net: yrNet,
      cumulative: Math.round(cumCashflow),
      cumulativeDiscounted: Math.round(cumDiscountedCashflow)
    });
  }

  if (paybackDiscounted === null) {
    paybackDiscounted = Math.round(paybackSimple * 1.4 * 10) / 10;
  }

  const npv = Math.round(cumDiscountedCashflow);
  const irr = Math.round(calcIRR(rawCashflowSeries) * 1000) / 1000;
  const lcoe = discGenSum > 0 ? Math.round(((capex + discOpexSum) / discGenSum) * 10) / 10 : 0;

  return {
    segment,
    city: cityKey,
    cityName: cityConfig.name || "Алматы",
    consumptionYear: Math.round(consumptionYear),
    kwp,
    kit: matchedKit ? {
      id: matchedKit.id,
      name: matchedKit.name,
      price: matchedKit.price,
      power: matchedKit.kw
    } : {
      id: `custom-${kwp}`,
      name: `Станция ${kwp} кВт`,
      price: capex,
      power: kwp
    },
    capex,
    isInterpolatedPrice,
    generationYear,
    generationMonth,
    savingYear,
    savingMonthAvg,
    savingShareOfBill: Math.round(savingShareOfBill * 100),
    paybackSimple,
    paybackDiscounted,
    irr,
    npv,
    lcoe,
    savings25: Math.round(totalSavings25),
    cashflow: cashflows,
    area: {
      needed: areaNeeded,
      available: availableArea,
      fits: areaFits
    },
    assumptions,
    warnings
  };
}

  /**
 * SolarConnect Financial Engine - Installments, Leasing, Net-Metering & Diesel Comparison
 * Pure functions, zero DOM dependencies, ES2019.
 */



/**
 * Calculates installment scenarios (e.g. Kaspi 12/24m 0%, BCC 36m 12%).
 * @param {number} capex Total station cost in KZT
 * @param {number} savingYear Annual solar savings in KZT
 * @param {object} config
 * @returns {Array} List of installment calculations
 */
function calcInstallments(capex, savingYear, config = DEFAULT_CONFIG) {
  const options = config.finance?.installments || [
    { id: "kaspi-12", name: "Kaspi, 12 месяцев", months: 12, rate: 0.0, down: 0 },
    { id: "kaspi-24", name: "Kaspi, 24 месяца", months: 24, rate: 0.0, down: 0 },
    { id: "bcc-36", name: "BCC, 36 месяцев", months: 36, rate: 0.12, down: 0.2 }
  ];

  const monthlySaving = Math.round(savingYear / 12);

  return options.map(opt => {
    const months = opt.months;
    const rate = opt.rate || 0;
    const downShare = opt.down || 0;
    const downPayment = Math.round(capex * downShare);
    const principal = capex - downPayment;

    let monthly = 0;
    if (rate === 0) {
      monthly = Math.round(principal / months);
    } else {
      const i = rate / 12;
      monthly = Math.round((principal * i) / (1 - Math.pow(1 + i, -months)));
    }

    const totalPaid = downPayment + monthly * months;
    const overpayment = totalPaid - capex;
    const netMonthly = monthly - monthlySaving;
    const isSelfPaying = netMonthly <= 0;

    return {
      id: opt.id,
      name: opt.name,
      months,
      rate,
      downPayment,
      monthly,
      monthlySaving,
      netMonthly,
      isSelfPaying,
      totalPaid,
      overpayment: Math.max(0, overpayment)
    };
  });
}

/**
 * Calculates corporate leasing schedule.
 * @param {number} capex Total station cost in KZT
 * @param {object} config
 * @returns {object}
 */
function calcLeasing(capex, config = DEFAULT_CONFIG) {
  const cfg = config.finance?.leasing || { months: 48, rate: 0.18, down: 0.2, buyout: 0.01 };
  const months = cfg.months;
  const rate = cfg.rate;
  const downShare = cfg.down;
  const buyoutShare = cfg.buyout;

  const downPayment = Math.round(capex * downShare);
  const buyoutPayment = Math.round(capex * buyoutShare);
  const principal = capex - downPayment;
  const i = rate / 12;

  const monthly = Math.round((principal * i) / (1 - Math.pow(1 + i, -months)));
  const totalLease = downPayment + monthly * months + buyoutPayment;
  const overpayment = totalLease - capex;

  return {
    months,
    rate,
    downPayment,
    monthly,
    buyoutPayment,
    totalLease,
    overpayment
  };
}

/**
 * Calculates Diesel Generator vs Solar economics.
 * @param {number} kwhNeeded Annual kWh requirement
 * @param {number} solarCapex Solar station cost in KZT
 * @param {number} solarLcoe Solar LCOE in KZT/kWh
 * @param {object} config
 * @returns {object}
 */
function calcDieselVsSolar(kwhNeeded, solarCapex, solarLcoe = 0, config = DEFAULT_CONFIG) {
  const d = config.finance?.diesel || { fuelPerKwh: 0.3, fuelPrice: 290, maintenancePerHour: 120 };
  const fuelLiters = Math.round(kwhNeeded * d.fuelPerKwh);
  const fuelCostYear = Math.round(fuelLiters * d.fuelPrice);

  // Estimate operating hours assuming average 10 kW generator load
  const runHours = Math.round(kwhNeeded / 10);
  const maintCostYear = Math.round(runHours * d.maintenancePerHour);

  const dieselCostYear = fuelCostYear + maintCostYear;
  const dieselLcoe = kwhNeeded > 0 ? Math.round((dieselCostYear / kwhNeeded) * 10) / 10 : 0;
  const annualSavingsVsDiesel = dieselCostYear - (solarLcoe * kwhNeeded);
  const paybackVsDiesel = annualSavingsVsDiesel > 0 ? Math.round((solarCapex / annualSavingsVsDiesel) * 10) / 10 : null;

  return {
    kwhNeeded,
    fuelLiters,
    fuelCostYear,
    maintCostYear,
    dieselCostYear,
    dieselLcoe,
    solarLcoe,
    annualSavingsVsDiesel: Math.round(annualSavingsVsDiesel),
    paybackVsDiesel
  };
}

/**
 * Comprehensive financial evaluation.
 * @param {object} solarResult Result object from calcSolar
 * @param {object} config
 * @returns {object}
 */
function calcFinance(solarResult, config = DEFAULT_CONFIG) {
  const capex = solarResult.capex;
  const savingYear = solarResult.savingYear;
  const kwh = solarResult.generationYear;
  const lcoe = solarResult.lcoe;

  return {
    installments: calcInstallments(capex, savingYear, config),
    leasing: calcLeasing(capex, config),
    diesel: calcDieselVsSolar(kwh, capex, lcoe, config)
  };
}

  /**
 * SolarConnect Backup Engine - Standby Power & Battery Sizing
 * Pure functions, zero DOM dependencies, ES2019.
 */



/**
 * Calculates battery & inverter requirements based on appliance load checklist.
 * @param {object} input { appliances: [{id, count, hours}], hoursAutonomy: 24, phase: 1 }
 * @param {object} config
 * @returns {object} Backup calculation result
 */
function calcBackup(input = {}, config = DEFAULT_CONFIG) {
  const cfg = config.backup || DEFAULT_CONFIG.backup || {};
  const catalog = cfg.appliances || [];
  const dod = cfg.dod ?? 0.9;
  const inverterEff = cfg.inverterEff ?? 0.92;
  const cycleEff = cfg.cycleEff ?? 0.95;
  const moduleKwh = cfg.moduleKwh ?? 5;
  const inverterLine = cfg.inverterLine || [5, 8, 12, 20, 30, 50];

  const hoursAutonomy = typeof input.hoursAutonomy === "number" && input.hoursAutonomy > 0 ? input.hoursAutonomy : 24;
  const phase = input.phase === 3 ? 3 : 1;

  const selectedInput = input.appliances || [];

  let totalEnergyDayWh = 0;
  let totalPeakLoadW = 0;
  const activeAppliances = [];
  const excludedAppliances = [];

  catalog.forEach(app => {
    let userApp = null;
    if (Array.isArray(selectedInput)) {
      userApp = selectedInput.find(item => item.id === app.id || item === app.id);
    }

    const isSelected = !!userApp;
    const count = typeof userApp === "object" && typeof userApp.count === "number" ? userApp.count : (isSelected ? 1 : 0);
    const hours = typeof userApp === "object" && typeof userApp.hours === "number" ? userApp.hours : app.hours;

    if (count > 0) {
      const duty = app.duty !== undefined ? app.duty : 1;
      const startFactor = app.start !== undefined ? app.start : 1;

      const Wh = app.watt * hours * duty * count;
      // Peak load surge occurs at motor startup independent of duty cycle fraction
      const peakW = app.watt * startFactor * count;

      totalEnergyDayWh += Wh;
      totalPeakLoadW += peakW;

      activeAppliances.push({
        id: app.id,
        name: app.name,
        watt: app.watt,
        count,
        hours,
        dailyWh: Math.round(Wh),
        peakW: Math.round(peakW)
      });
    } else {
      excludedAppliances.push({
        id: app.id,
        name: app.name,
        watt: app.watt
      });
    }
  });

  const energyDayKwh = totalEnergyDayWh / 1000;
  const energyAutonomyKwh = energyDayKwh * (hoursAutonomy / 24);

  const totalEff = dod * inverterEff * cycleEff;
  const batteryNeededKwh = energyAutonomyKwh / totalEff;

  const moduleCount = Math.max(1, Math.ceil(batteryNeededKwh / moduleKwh));
  const batteryInstalledKwh = moduleCount * moduleKwh;

  const inverterKwNeeded = (totalPeakLoadW * 1.25) / 1000;
  let selectedInverterKw = inverterLine[0];
  for (const inv of inverterLine) {
    if (inv >= inverterKwNeeded) {
      selectedInverterKw = inv;
      break;
    }
    selectedInverterKw = inv;
  }

  const actualAutonomyHours = energyDayKwh > 0
    ? Math.round(((batteryInstalledKwh * totalEff) / energyDayKwh) * 24 * 10) / 10
    : 24;

  const inverterPrices = { 5: 650000, 8: 950000, 12: 1350000, 20: 2100000, 30: 2900000, 50: 4200000 };
  const invPrice = inverterPrices[selectedInverterKw] || (selectedInverterKw * 100000);
  const batteryPrice = moduleCount * 700000;
  const estimatedPrice = invPrice + batteryPrice;

  return {
    energyDayKwh: Math.round(energyDayKwh * 100) / 100,
    energyAutonomyKwh: Math.round(energyAutonomyKwh * 100) / 100,
    batteryNeededKwh: Math.round(batteryNeededKwh * 100) / 100,
    batteryInstalledKwh,
    moduleCount,
    moduleKwh,
    peakLoadW: Math.round(totalPeakLoadW),
    inverterKwNeeded: Math.round(inverterKwNeeded * 10) / 10,
    inverterKw: selectedInverterKw,
    phase,
    requestedAutonomyHours: hoursAutonomy,
    actualAutonomyHours,
    estimatedPrice: Math.round(estimatedPrice / 10000) * 10000,
    activeAppliances,
    excludedAppliances
  };
}

  /**
 * SolarConnect Formatting Utilities
 * Pure functions for number, currency, unit formatting, and Russian declensions.
 */

/**
 * Formats a number with non-breaking space thousand separators.
 * @param {number} val
 * @param {number} decimals
 * @returns {string}
 */
function formatNumber(val, decimals = 0) {
  if (val === null || val === undefined || isNaN(val)) return "0";
  const fixed = Number(val).toFixed(decimals);
  const parts = fixed.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(",");
}

/**
 * Formats currency values in Kazakhstani Tenge (₸).
 * @param {number} val
 * @param {string} symbol
 * @returns {string} E.g. "4 620 000 ₸"
 */
function formatCurrency(val, symbol = "₸") {
  return `${formatNumber(Math.round(val))} ${symbol}`;
}

/**
 * Formats large values concisely (e.g. 4.62 млн ₸, 744 тыс ₸).
 * @param {number} val
 * @param {string} symbol
 * @returns {string}
 */
function formatCompact(val, symbol = "₸") {
  if (val === null || val === undefined || isNaN(val)) return `0 ${symbol}`;
  const abs = Math.abs(val);
  const sign = val < 0 ? "-" : "";

  if (abs >= 1000000) {
    const mln = Math.round((abs / 1000000) * 100) / 100;
    return `${sign}${formatNumber(mln, mln % 1 === 0 ? 0 : 2)} млн ${symbol}`;
  } else if (abs >= 100000) {
    const thous = Math.round(abs / 1000);
    return `${sign}${formatNumber(thous)} тыс ${symbol}`;
  }
  return `${sign}${formatCurrency(abs, symbol)}`;
}

/**
 * Formats power rating in kW.
 * @param {number} kw
 * @returns {string} E.g. "16.9 кВт"
 */
function formatKW(kw) {
  if (kw === null || kw === undefined || isNaN(kw)) return "0 кВт";
  const rounded = Math.round(Number(kw) * 10) / 10;
  return `${formatNumber(rounded, rounded % 1 === 0 ? 0 : 1)} кВт`;
}

/**
 * Formats energy in kWh.
 * @param {number} kwh
 * @returns {string} E.g. "24 800 кВтч"
 */
function formatKWh(kwh) {
  if (kwh === null || kwh === undefined || isNaN(kwh)) return "0 кВтч";
  return `${formatNumber(Math.round(kwh))} кВтч`;
}

/**
 * Russian word pluralization helper.
 * @param {number} num
 * @param {[string, string, string]} forms E.g. ['год', 'года', 'лет']
 * @returns {string}
 */
function pluralize(num, forms = ["год", "года", "лет"]) {
  const n = Math.abs(Math.round(num)) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return `${num} ${forms[2]}`;
  if (n1 > 1 && n1 < 5) return `${num} ${forms[1]}`;
  if (n1 === 1) return `${num} ${forms[0]}`;
  return `${num} ${forms[2]}`;
}

  /**
 * SolarConnect Validation & Input Sanitization
 * Pure functions for input verification, phone validation, honeypot & rate limiting.
 */

/**
 * Sanitizes numerical input within min/max boundaries.
 * @param {any} val
 * @param {number} defaultVal
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function sanitizeNumber(val, defaultVal = 0, min = 0, max = Infinity) {
  if (val === null || val === undefined || val === "") return defaultVal;
  const num = Number(String(val).replace(/\s/g, "").replace(",", "."));
  if (isNaN(num)) return defaultVal;
  return Math.min(max, Math.max(min, num));
}

/**
 * Extracts digits from phone input.
 * @param {string} phoneStr
 * @returns {string} Digits only
 */
function extractPhoneDigits(phoneStr = "") {
  return String(phoneStr).replace(/\D/g, "");
}

/**
 * Formats 11-digit Kazakhstani phone number to +7 (7XX) XXX-XX-XX format.
 * @param {string} input
 * @returns {string}
 */
function formatPhoneMask(input = "") {
  let digits = extractPhoneDigits(input);

  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }
  if (!digits.startsWith("7")) {
    digits = "7" + digits;
  }
  digits = digits.slice(0, 11);

  if (digits.length === 0) return "";
  let res = "+7";
  if (digits.length > 1) {
    res += " (" + digits.slice(1, 4);
  }
  if (digits.length >= 4) {
    res += ")";
  }
  if (digits.length > 4) {
    res += " " + digits.slice(4, 7);
  }
  if (digits.length >= 7) {
    res += "-";
  }
  if (digits.length > 7) {
    res += digits.slice(7, 9);
  }
  if (digits.length >= 9) {
    res += "-";
  }
  if (digits.length > 9) {
    res += digits.slice(9, 11);
  }
  return res;
}

/**
 * Validates Kazakhstani phone number (must be 11 digits starting with 77).
 * @param {string} phoneStr
 * @returns {boolean}
 */
function isValidPhone(phoneStr = "") {
  const digits = extractPhoneDigits(phoneStr);
  return digits.length === 11 && (digits.startsWith("77") || digits.startsWith("70"));
}

/**
 * Validates lead contact form data.
 * @param {object} contact { name, phone, consent, honeypot }
 * @param {number} formOpenedAt Timestamp when form was opened
 * @returns {{ isValid: boolean, errors: string[] }}
 */
function validateLeadForm(contact = {}, formOpenedAt = 0) {
  const errors = [];

  // 1. Name check
  if (!contact.name || String(contact.name).trim().length < 2) {
    errors.push("Пожалуйста, укажите ваше имя (минимум 2 символа).");
  }

  // 2. Phone check
  if (!isValidPhone(contact.phone)) {
    errors.push("Пожалуйста, введите корректный номер телефона +7 (7XX) XXX-XX-XX.");
  }

  // 3. Consent check
  if (!contact.consent) {
    errors.push("Необходимо согласие на обработку персональных данных.");
  }

  // 4. Honeypot check
  if (contact.honeypot && String(contact.honeypot).trim().length > 0) {
    errors.push("Обнаружена автоматическая отправка.");
  }

  // 5. Minimum fill-time check (3 seconds)
  if (formOpenedAt > 0) {
    const elapsedSec = (Date.now() - formOpenedAt) / 1000;
    if (elapsedSec < 3) {
      errors.push("Форма заполнена слишком быстро.");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Rate limit check: max 3 submissions per hour per device.
 * @returns {boolean} True if allowed, false if limit exceeded
 */
function checkRateLimit() {
  try {
    const key = "sc_calc_leads_history";
    const history = JSON.parse(localStorage.getItem(key) || "[]");
    const oneHourAgo = Date.now() - 3600 * 1000;
    const recent = history.filter(ts => ts > oneHourAgo);
    return recent.length < 3;
  } catch (e) {
    return true; // Fail open if localStorage unavailable
  }
}

/**
 * Records a successful lead submission in rate limit log.
 */
function recordLeadSubmission() {
  try {
    const key = "sc_calc_leads_history";
    const history = JSON.parse(localStorage.getItem(key) || "[]");
    const oneHourAgo = Date.now() - 3600 * 1000;
    const recent = history.filter(ts => ts > oneHourAgo);
    recent.push(Date.now());
    localStorage.setItem(key, JSON.stringify(recent));
  } catch (e) {
    // Ignore localStorage errors
  }
}

  /**
 * SolarConnect Internationalization Dictionary (RU / KK)
 */

const I18N = {
  ru: {
    "calc.title": "Посчитайте свою солнечную станцию за 30 секунд",
    "calc.subtitle": "Мгновенный предварительный расчёт мощности, стоимости и окупаемости",

    "universal.title": "Какая солнечная станция вам нужна?",
    "universal.home.title": "Для дома и дачи",
    "universal.home.desc": "Снизить счёт за свет и защитить технику",
    "universal.biz.title": "Для бизнеса",
    "universal.biz.desc": "Окупаемость, IRR, NPV и сокращение расходов",
    "universal.agro.title": "Для агросектора",
    "universal.agro.desc": "Полив, охлаждение и удалённые объекты",
    "universal.backup.title": "Резервное питание",
    "universal.backup.desc": "Автономный свет и работа при отключениях",

    "home.bill": "Счёт за электроэнергию, тенге в месяц",
    "home.city": "Город / Регион",
    "home.roofType": "Тип крыши / Модели",
    "home.roofArea": "Площадь крыши (м²)",
    "home.occupancy": "Когда вы обычно дома днём?",
    "home.outages": "Бывают ли отключения света?",

    "roof.pitched": "Скатная крыша",
    "roof.flat": "Плоская крыша",
    "roof.ground": "Установка на земле",

    "occ.low": "Почти никогда (днём на работе)",
    "occ.mid": "Половину дня",
    "occ.high": "Весь день (дома кто-то есть)",

    "outages.none": "Почти никогда не отключают",
    "outages.rare": "Редко (1-2 раза в месяц)",
    "outages.often": "Часто (нужен накопитель)",

    "biz.mode": "Способ ввода потребления",
    "biz.mode.bill": "Счёт в месяц (₸)",
    "biz.mode.kwh": "Потребление в месяц (кВтч)",
    "biz.industry": "Отрасль объекта",
    "biz.hours": "График работы",
    "biz.payMethod": "Способ оплаты",

    "ind.warehouse": "Склад или логистика",
    "ind.production": "Производство или цех",
    "ind.sto": "СТО или автосервис",
    "ind.hotel": "Отель или база отдыха",
    "ind.shop": "Магазин или ТЦ",
    "ind.azs": "АЗС",
    "ind.office": "Офисный центр",
    "ind.other": "Другое",

    "hours.day": "Только день (8:00 - 18:00)",
    "hours.shift": "Посменно (8:00 - 22:00)",
    "hours.full": "Круглосуточно (24/7)",

    "result.saving": "Экономия в год",
    "result.savingShare": "Снижение счёта на {n}%",
    "result.kwp": "Мощность станции",
    "result.capex": "Ориентировочная стоимость",
    "result.payback": "Срок окупаемости",
    "result.genYear": "Годовая выработка",
    "result.irr": "IRR за 25 лет",
    "result.npv": "NPV (12%)",
    "result.lcoe": "Стоимость 1 кВтч (LCOE)",
    "result.savings25": "Итог экономии за 25 лет",

    "backup.appliances": "Приборы для резервного питания",
    "backup.autonomy": "Желаемая автономия (часов)",
    "backup.phase": "Тип ввода",
    "backup.inverter": "Рекомендуемый инвертор",
    "backup.battery": "Ёмкость накопителя",
    "backup.active": "Будет работать при отключении",
    "backup.excluded": "Не входит в текущую конфигурацию",

    "benefit.tariffGrowth": "Рост тарифа в год",
    "benefit.horizon": "Горизонт расчёта",
    "benefit.discountRate": "Ставка дисконтирования",

    "finance.tab.installments": "Рассрочка",
    "finance.tab.leasing": "Лизинг",
    "finance.tab.net": "Зачёт излишков",
    "finance.tab.diesel": "Солнце vs Дизель",

    "method.title": "Как мы считали",
    "method.subtitle": "Прозрачная методика и допущения расчёта",

    "form.title": "Точный расчёт инженера по вашему объекту",
    "form.promise": "Ответим в течение рабочего дня, обычно в течение 30 минут",
    "form.name": "Ваше имя",
    "form.phone": "Телефон",
    "form.address": "Район или адрес объекта (необязательно)",
    "form.timing": "Когда планируете монтаж?",
    "form.timing.now": "В течение этого месяца",
    "form.timing.soon": "В ближайшие 1-3 месяца",
    "form.timing.later": "Просто присматриваюсь",
    "form.consent": "Согласен на обработку персональных данных",
    "form.submit": "Получить точный расчёт",
    "form.success": "Заявка успешно отправлена! Инженер свяжется с вами.",
    "form.error": "Не удалось отправить форму. Напишите нам в WhatsApp — расчёт сохранён.",

    "cta.whatsapp": "Написать в WhatsApp",
    "cta.print": "Распечатать расчёт",
    "cta.details": "Уточнить детали расчёта",
    "cta.fullCalc": "Подробный расчёт",
    "cta.back": "Назад",

    "disclaimer": "Расчёт ориентировочный. Точная мощность, состав и стоимость определяются после инженерного расчёта по вашему объекту: крыше, вводу и графику потребления. Цены действительны на дату обновления калькулятора."
  },

  kk: {
    "calc.title": "Күн электр станцияңызды 30 секундта есептеңіз",
    "calc.subtitle": "Қуатты, құнын және өтелу мерзімін лезде алдын ала есептеу",

    "universal.title": "Сізге қандай күн станциясы қажет?",
    "universal.home.title": "Үй және саяжай үшін",
    "universal.home.desc": "Электр шотын азайту және техниканы қорғау",
    "universal.biz.title": "Бизнес үшін",
    "universal.biz.desc": "Өтелімділік, IRR, NPV және шығындарды азайту",
    "universal.agro.title": "Агросектор үшін",
    "universal.agro.desc": "Суару, салқындату және шалғай нысандар",
    "universal.backup.title": "Резервтік қуат",
    "universal.backup.desc": "Автономды жарық және өшу кезіндегі жұмыс",

    "home.bill": "Электр энергиясының шоты, айына теңге",
    "home.city": "Қала / Аймақ",
    "home.roofType": "Шатыр түрі",
    "home.roofArea": "Шатыр ауданы (м²)",
    "home.occupancy": "Күндіз үйде қашан боласыз?",
    "home.outages": "Жарық жиі өше ме?",

    "roof.pitched": "Еңіс шатыр",
    "roof.flat": "Жалпақ шатыр",
    "roof.ground": "Жерге орнату",

    "occ.low": "Дерлік ешқашан (жұмыста)",
    "occ.mid": "Күннің жартысы",
    "occ.high": "Күні бойы үйде",

    "outages.none": "Дерлік өшпейді",
    "outages.rare": "Сирек (айына 1-2 рет)",
    "outages.often": "Жиі (аккумулятор қажет)",

    "biz.mode": "Тұтынуды енгізу әдісі",
    "biz.mode.bill": "Айлық шот (₸)",
    "biz.mode.kwh": "Айлық тұтыну (кВтч)",
    "biz.industry": "Нысан саласы",
    "biz.hours": "Жұмыс кестесі",
    "biz.payMethod": "Төлем әдісі",

    "ind.warehouse": "Қойма немесе логистика",
    "ind.production": "Өндіріс немесе цех",
    "ind.sto": "СТО немесе автосервис",
    "ind.hotel": "Қонақ үй",
    "ind.shop": "Дүкен немесе СОО",
    "ind.azs": "МАЙҚ (АЗС)",
    "ind.office": "Офис орталығы",
    "ind.other": "Басқа",

    "hours.day": "Тек күндіз (8:00 - 18:00)",
    "hours.shift": "Ауысыммен (8:00 - 22:00)",
    "hours.full": "Тәулік бойы (24/7)",

    "result.saving": "Жылдық үнемдеу",
    "result.savingShare": "Шотты {n}%-ға азайту",
    "result.kwp": "Станция қуаты",
    "result.capex": "Болжалды құны",
    "result.payback": "Өтелу мерзімі",
    "result.genYear": "Жылдық өндіріс",
    "result.irr": "25 жылдық IRR",
    "result.npv": "NPV (12%)",
    "result.lcoe": "1 кВтч құны (LCOE)",
    "result.savings25": "25 жылдағы жалпы үнемдеу",

    "backup.appliances": "Резервтік қуат құрылғылары",
    "backup.autonomy": "Қажетті автономия (сағат)",
    "backup.phase": "Енгізу түрі",
    "backup.inverter": "Ұсынылатын инвертор",
    "backup.battery": "Аккумулятор сыйымдылығы",
    "backup.active": "Өшу кезінде жұмыс істейді",
    "backup.excluded": "Қолданыстағы конфигурацияға кірмейді",

    "benefit.tariffGrowth": "Тарифтің жылдық өсуі",
    "benefit.horizon": "Есептеу мерзімі",
    "benefit.discountRate": "Дисконттау мөлшерлемесі",

    "finance.tab.installments": "Бөліп төлеу",
    "finance.tab.leasing": "Лизинг",
    "finance.tab.net": "Артықты есепке алу",
    "finance.tab.diesel": "Күн vs Дизель",

    "method.title": "Біз қалай есептедік",
    "method.subtitle": "Ашық әдістеме мен болжамдар",

    "form.title": "Нысаныңыз бойынша инженердің дәл есептеуі",
    "form.promise": "Жұмыс күні ішінде жауап береміз",
    "form.name": "Сіздің атыңыз",
    "form.phone": "Телефон",
    "form.address": "Нысан мекенжайы (міндетті емес)",
    "form.timing": "Монтаждауды қашан жоспарлайсыз?",
    "form.timing.now": "Осы ай ішінде",
    "form.timing.soon": "Жақын 1-3 айда",
    "form.timing.later": "Әлі жоспарлаудамын",
    "form.consent": "Жеке деректерді өңдеуге келісемін",
    "form.submit": "Дәл есептеуді алу",
    "form.success": "Өтінім сәтті жіберілді! Инженер сізбен хабарласады.",
    "form.error": "Форманы жіберу мүмкін болмады. WhatsApp-қа жазыңыз.",

    "cta.whatsapp": "WhatsApp-қа жазу",
    "cta.print": "Есепті басып шығару",
    "cta.details": "Мәліметтерді нақтылау",
    "cta.fullCalc": "Толық есептеу",
    "cta.back": "Артқа",

    "disclaimer": "Есептеу болжалды. Дәл қуат, құрам және құны нысаныңыз бойынша инженерлік есептен кейін анықталады."
  }
};

/**
 * Gets translated text by key.
 * @param {string} key
 * @param {string} lang 'ru' | 'kk'
 * @param {object} params Replace parameters {n: 35}
 * @returns {string}
 */
function t(key, lang = "ru", params = {}) {
  const dict = I18N[lang] || I18N.ru;
  let str = dict[key] || I18N.ru[key] || key;
  Object.keys(params).forEach(k => {
    str = str.replace(new RegExp(`\\{${k}\\}`, "g"), params[k]);
  });
  return str;
}

  /**
 * SolarConnect Canvas 2D Chart Engine
 * Lightweight, zero dependencies, Retina/High DPI support, responsive.
 */



const MONTH_NAMES = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

/**
 * Renders 12-month generation bars overlaid with consumption line.
 * @param {HTMLCanvasElement} canvas
 * @param {number[]} monthlyGen Array of 12 kWh values
 * @param {number} annualConsumption Annual consumption in kWh
 * @param {object} options
 */
function renderGenerationChart(canvas, monthlyGen = [], annualConsumption = 0, options = {}) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 500;
  const height = options.height || 220;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  const isDark = options.theme === "dark";
  const barColor = options.barColor || "#F5A300";
  const lineColor = options.lineColor || (isDark ? "#FFFFFF" : "#0E2A47");
  const textColor = isDark ? "#A0B0C0" : "#5B6775";
  const gridColor = isDark ? "#2C3E50" : "#E5E9F0";

  const monthlyCons = Math.round(annualConsumption / 12);
  const maxVal = Math.max(...monthlyGen, monthlyCons) * 1.15 || 1000;

  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  // Grid lines (3 horizontal lines)
  ctx.lineWidth = 1;
  ctx.strokeStyle = gridColor;
  ctx.fillStyle = textColor;
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';

  for (let i = 0; i <= 3; i++) {
    const val = Math.round((maxVal / 3) * i);
    const y = paddingTop + chartH - (chartH / 3) * i;

    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();

    ctx.fillText(formatNumber(val), paddingLeft - 6, y + 4);
  }

  // Draw 12 Bars
  const numBars = 12;
  const gap = 6;
  const barWidth = Math.max(4, (chartW - (numBars - 1) * gap) / numBars);

  ctx.textAlign = 'center';
  for (let i = 0; i < 12; i++) {
    const gen = monthlyGen[i] || 0;
    const h = (gen / maxVal) * chartH;
    const x = paddingLeft + i * (barWidth + gap);
    const y = paddingTop + chartH - h;

    // Draw Bar
    ctx.fillStyle = barColor;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, barWidth, h, [4, 4, 0, 0]) : ctx.rect(x, y, barWidth, h);
    ctx.fill();

    // Month Label
    ctx.fillStyle = textColor;
    ctx.fillText(MONTH_NAMES[i], x + barWidth / 2, height - 10);
  }

  // Draw Monthly Consumption Line
  if (monthlyCons > 0) {
    const consY = paddingTop + chartH - (monthlyCons / maxVal) * chartH;
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 4]);
    ctx.moveTo(paddingLeft, consY);
    ctx.lineTo(width - paddingRight, consY);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash
  }
}

/**
 * Renders 25-Year Cumulative Cashflow curve with payback break-even marker.
 * @param {HTMLCanvasElement} canvas
 * @param {Array} cashflow Array of {year, cumulative}
 * @param {number} paybackYears
 * @param {object} options
 */
function renderCashflowChart(canvas, cashflow = [], paybackYears = 0, options = {}) {
  if (!canvas || !cashflow.length) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 500;
  const height = options.height || 220;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  const isDark = options.theme === "dark";
  const lineColor = "#2E7D32";
  const zeroLineColor = isDark ? "#4A5568" : "#A0AEC0";
  const textColor = isDark ? "#A0B0C0" : "#5B6775";
  const pointColor = "#F5A300";

  const minVal = Math.min(cashflow[0].cumulative, ...cashflow.map(c => c.cumulative));
  const maxVal = Math.max(0, ...cashflow.map(c => c.cumulative));
  const range = (maxVal - minVal) || 1;

  const paddingLeft = 55;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const getY = (val) => paddingTop + chartH - ((val - minVal) / range) * chartH;
  const getX = (idx) => paddingLeft + (idx / (cashflow.length - 1)) * chartW;

  // Draw Zero Line
  const zeroY = getY(0);
  ctx.strokeStyle = zeroLineColor;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(paddingLeft, zeroY);
  ctx.lineTo(width - paddingRight, zeroY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw Cashflow Area Gradient
  const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
  gradient.addColorStop(0, "rgba(46, 125, 50, 0.25)");
  gradient.addColorStop(1, "rgba(46, 125, 50, 0.0)");

  ctx.beginPath();
  ctx.moveTo(getX(0), zeroY);
  cashflow.forEach((c, idx) => {
    ctx.lineTo(getX(idx), getY(c.cumulative));
  });
  ctx.lineTo(getX(cashflow.length - 1), zeroY);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw Curve Line
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 3;
  cashflow.forEach((c, idx) => {
    const x = getX(idx);
    const y = getY(c.cumulative);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Draw Payback Point Marker
  if (paybackYears > 0 && paybackYears <= cashflow.length) {
    const paybackIdx = Math.min(cashflow.length - 1, paybackYears);
    const pbX = getX(paybackIdx);
    const pbY = getY(0);

    ctx.fillStyle = pointColor;
    ctx.beginPath();
    ctx.arc(pbX, pbY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = isDark ? "#FFFFFF" : "#0E2A47";
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${paybackYears} года`, pbX, pbY - 10);
  }

  // X Axis Labels (Years 1, 5, 10, 15, 20, 25)
  ctx.fillStyle = textColor;
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "center";
  [1, 5, 10, 15, 20, 25].forEach(yr => {
    const idx = yr - 1;
    if (idx < cashflow.length) {
      ctx.fillText(`${yr}г`, getX(idx), height - 10);
    }
  });

  // Y Axis Labels
  ctx.textAlign = "right";
  ctx.fillText(`${Math.round(maxVal / 1000000)}M`, paddingLeft - 8, getY(maxVal) + 4);
  ctx.fillText("0", paddingLeft - 8, zeroY + 4);
  ctx.fillText(`${Math.round(minVal / 1000000)}M`, paddingLeft - 8, getY(minVal) + 4);
}

/**
 * Creates accessible HTML table fallback for charts.
 * @param {Array} data Array of monthly or cashflow data
 * @param {string} title Table title
 * @returns {string} HTML string
 */
function generateAccessibleTableHTML(data = [], title = "Таблица данных") {
  if (!data.length) return "";
  const rows = data.map((item, i) => `
    <tr>
      <td>${item.month || item.year || (i + 1)}</td>
      <td>${item.gen || item.cumulative || item.net || 0}</td>
    </tr>
  `).join("");

  return `
    <details class="sc-accordion">
      <summary class="sc-accordion-header">${title}</summary>
      <div class="sc-accordion-content">
        <table class="sc-table">
          <thead><tr><th>Период</th><th>Значение</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </details>
  `;
}

  /**
 * SolarConnect Lead Submission System
 * Handles API POST request, retry logic, honeypot, rate limiting, and WhatsApp fallback.
 */




/**
 * Generates WhatsApp fallback URL with pre-filled user inputs & results.
 * @param {string} phone Target WhatsApp number (e.g. 77713169033)
 * @param {object} input Calculation input
 * @param {object} result Calculation result
 * @returns {string} WhatsApp URL
 */
function buildWhatsAppUrl(phone = "77713169033", input = {}, result = {}) {
  const targetPhone = extractPhoneDigits(phone) || "77713169033";

  const segmentLabels = { home: "дом", business: "бизнес", agro: "агросектор", backup: "резервное питание" };
  const segmentName = segmentLabels[input.segment] || "объект";

  const cityName = result.cityName || "Алматы";
  const billStr = input.bill ? formatCurrency(input.bill) : "";
  const kwStr = formatKW(result.kwp || 0);
  const capexStr = result.capex ? formatCurrency(result.capex) : "";
  const savingStr = result.savingYear ? formatCurrency(result.savingYear) : "";

  let msg = `Здравствуйте! Посчитал на сайте: ${segmentName}, ${cityName}`;
  if (billStr) {
    msg += `, счёт ${billStr} в месяц`;
  }
  msg += `.\n\nПолучилось:\nстанция ${kwStr}`;
  if (capexStr) {
    msg += `,\nориентировочно ${capexStr}`;
  }
  if (savingStr) {
    msg += `,\nэкономия около ${savingStr} в год`;
  }
  msg += `.\n\nХочу точный расчёт.`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
}

/**
 * Extracts UTM parameters from current page URL.
 * @returns {object}
 */
function getUtmParams() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      source: urlParams.get("utm_source") || null,
      medium: urlParams.get("utm_medium") || null,
      campaign: urlParams.get("utm_campaign") || null,
      content: urlParams.get("utm_content") || null,
      term: urlParams.get("utm_term") || null
    };
  } catch (e) {
    return { source: null, medium: null, campaign: null, content: null, term: null };
  }
}

/**
 * Submits lead to API endpoint with single retry and WhatsApp fallback.
 * @param {object} payload Complete lead JSON payload
 * @param {string} endpoint Target URL
 * @param {function} onSuccess Callback on success
 * @param {function} onError Callback on failure
 */
async function submitLead(payload, endpoint = "/api/lead", onSuccess, onError) {
  // Check local rate limit
  if (!checkRateLimit()) {
    if (onError) onError(new Error("Превышен лимит отправок. Пожалуйста, попробуйте позже или напишите в WhatsApp."));
    return;
  }

  async function makeRequest() {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }
    return await res.json();
  }

  try {
    const data = await makeRequest();
    recordLeadSubmission();
    if (onSuccess) onSuccess(data);
  } catch (err1) {
    console.warn("[SCCalc] First lead submit failed, retrying in 3s...", err1);
    // Retry once after 3 seconds
    setTimeout(async () => {
      try {
        const data = await makeRequest();
        recordLeadSubmission();
        if (onSuccess) onSuccess(data);
      } catch (err2) {
        console.error("[SCCalc] Lead submission retry failed.", err2);
        if (onError) onError(err2);
      }
    }, 3000);
  }
}

  /**
 * SolarConnect Analytics Dispatcher
 * Pushes standard events to dataLayer, GA4 (gtag), and Yandex Metrika (ym).
 * STRICT RULE: No PII (names, phone numbers) are ever transmitted to analytics.
 */

/**
 * Tracks an analytics event.
 * @param {string} eventName Fixed event name from spec (e.g. calc_result)
 * @param {object} params Custom event parameters
 */
function trackEvent(eventName, params = {}) {
  // Ensure PII fields are never sent
  const safeParams = { ...params };
  delete safeParams.name;
  delete safeParams.phone;
  delete safeParams.contact;

  safeParams.timestamp = new Date().toISOString();

  // 1. Push to window.dataLayer
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...safeParams
    });

    // 2. Push to GA4 (gtag)
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, safeParams);
    }

    // 3. Push to Yandex Metrika (ym)
    if (typeof window.ym === "function") {
      // Find active Yandex Metrika counter ID
      try {
        const ymCounters = Object.keys(window).filter(k => /^yaCounter\d+$/.test(k));
        if (ymCounters.length > 0) {
          const counterId = ymCounters[0].replace("yaCounter", "");
          window.ym(Number(counterId), "reachGoal", eventName, safeParams);
        }
      } catch (e) {
        // Ignore Metrika errors
      }
    }
  }

  // Debug log in development mode
  if (typeof window !== "undefined" && window.__SC_CALC_DEBUG__) {
    console.log(`[SCCalc Analytics] ${eventName}:`, safeParams);
  }
}


  /**
 * SolarConnect Block Preset - Home Calculator (`home`)
 */







function renderHomeBlock(widget, container) {
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

  /**
 * SolarConnect Block Preset - Business Calculator (`business`)
 */







function renderBusinessBlock(widget, container) {
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

  /**
 * SolarConnect Block Preset - Agro Calculator (`agro`)
 */







function renderAgroBlock(widget, container) {
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

  /**
 * SolarConnect Block Preset - Backup Calculator (`backup`)
 */






function renderBackupBlock(widget, container) {
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

  /**
 * SolarConnect Block Preset - Benefit Calculator (`benefit`)
 */







function renderBenefitBlock(widget, container) {
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

  /**
 * SolarConnect Block Preset - Finance Calculator (`finance`)
 */







function renderFinanceBlock(widget, container) {
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

  /**
 * SolarConnect Block Preset - Mini Widget (`mini`)
 */





function renderMiniBlock(widget, container) {
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

  /**
 * SolarConnect Block Preset - Universal Multi-Calculator (`universal`)
 */








function renderUniversalBlock(widget, container) {
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


  // Injected CSS into SCCalcWidget
  /**
 * SolarConnect Base Widget Framework
 * Handles Shadow DOM mounting, state management, 150ms debouncing, lead modal, and public API.
 */
















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

class SCCalcWidget {
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

    const cssText = INLINED_CSS;
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

const SCCalc = {
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


  // Expose global SCCalc
  window.SCCalc = SCCalc;

  // Auto-scan on DOM ready
  if (typeof document !== 'undefined') {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function() { SCCalc.scan(); });
    } else {
      SCCalc.scan();
    }
  }
})();
