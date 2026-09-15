/**
 * SolarConnect Calculation Engine - Core Physics, Economics & Eco Metrics
 * Pure functions, zero DOM dependencies, ES2019.
 */

export const DEFAULT_CONFIG = {
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
    },
    almaty_region: { name: "Алматинская область", tariff: 30, yieldPerKw: 1462, monthly: [4.0, 5.0, 8.0, 9.5, 11.0, 12.0, 12.5, 11.5, 10.0, 8.0, 5.0, 3.5], verified: false },
    astana: { name: "Астана", tariff: 30, yieldPerKw: 1400, monthly: [3.5, 4.5, 8.5, 10.0, 11.5, 12.5, 13.0, 12.0, 9.5, 7.5, 4.5, 3.0], verified: false },
    shymkent: { name: "Шымкент", tariff: 30, yieldPerKw: 1520, monthly: [4.5, 5.5, 8.0, 9.5, 11.0, 12.0, 12.0, 11.5, 10.0, 8.0, 5.0, 3.0], verified: false },
    karaganda: { name: "Караганда", tariff: 30, yieldPerKw: 1420, monthly: [3.8, 4.8, 8.2, 9.8, 11.2, 12.2, 12.8, 11.8, 9.8, 7.8, 4.8, 3.0], verified: false },
    taraz: { name: "Тараз", tariff: 30, yieldPerKw: 1500, monthly: [4.2, 5.2, 8.0, 9.5, 11.0, 12.0, 12.2, 11.6, 10.0, 8.0, 5.1, 3.2], verified: false },
    konaev: { name: "Конаев", tariff: 30, yieldPerKw: 1470, monthly: [4.0, 5.0, 8.0, 9.5, 11.0, 12.0, 12.5, 11.5, 10.0, 8.0, 5.0, 3.5], verified: false }
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
    { id: "home-6.5", segment: "home", name: "Дом-минимум", kw: 6.5, price: 1600181, storageKwh: 0, panels: 10, inverter: "Deye 5 кВт", url: "https://solarconnect.kz/dlya-doma" },
    { id: "home-13", segment: "home", name: "Дом-оптимум", kw: 13, price: 3105988, storageKwh: 0, panels: 20, inverter: "Deye 12 кВт", url: "https://solarconnect.kz/dlya-doma" },
    { id: "home-19.5", segment: "home", name: "Дом-максимум", kw: 19.5, price: 5777863, storageKwh: 0, panels: 30, inverter: "Deye 20 кВт", url: "https://solarconnect.kz/dlya-doma" },
    { id: "biz-65", segment: "business", name: "Бизнес-65", kw: 65, price: 12000000, storageKwh: 0, panels: 100, inverter: "Deye 50 кВт", url: "https://solarconnect.kz/dlya-biznesa" },
    { id: "biz-105", segment: "business", name: "Бизнес-105", kw: 105.3, price: 20000000, storageKwh: 0, panels: 162, inverter: "2x Deye 50 кВт", url: "https://solarconnect.kz/dlya-biznesa" },
    { id: "biz-210", segment: "business", name: "Бизнес-210", kw: 210.6, price: 40000000, storageKwh: 0, panels: 324, inverter: "4x Deye 50 кВт", url: "https://solarconnect.kz/dlya-biznesa" },
    { id: "agro-6.5", segment: "agro", name: "Агро-6.5", kw: 6.5, price: 3324738, storageKwh: 5, panels: 10, inverter: "Deye Hybrid 5 кВт", url: "https://solarconnect.kz/agro" },
    { id: "agro-13", segment: "agro", name: "Агро-13", kw: 13, price: 5839738, storageKwh: 16, panels: 20, inverter: "Deye Hybrid 12 кВт", url: "https://solarconnect.kz/agro" },
    { id: "agro-26", segment: "agro", name: "Агро-26", kw: 26, price: 10741975, storageKwh: 32, panels: 40, inverter: "Deye Hybrid 20 кВт", url: "https://solarconnect.kz/agro" }
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

export function pricePerKw(segment, kwp, config) {
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

export function calcIRR(cashflows) {
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

export function calcSolar(input = {}, config = DEFAULT_CONFIG) {
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

  let consumptionYear = 0;
  if (typeof input.consumptionYear === "number" && input.consumptionYear > 0) {
    consumptionYear = input.consumptionYear;
  } else {
    const bill = typeof input.bill === "number" && input.bill > 0 ? input.bill : 40000;
    consumptionYear = (bill * 12) / tariff;
  }

  const rawKwpTarget = consumptionYear / yieldPerKw;
  let kwp = Math.max(panelKw, Math.round(rawKwpTarget / panelKw) * panelKw);

  if (kwp < segConfig.min) {
    warnings.push(`Минимальная мощность для сегмента "${segment}" составляет ${segConfig.min} кВт.`);
    kwp = segConfig.min;
  } else if (kwp > segConfig.max) {
    warnings.push(`Мощность превышает лимит ${segConfig.max} кВт. Проверьте сценарий или свяжитесь с инженером.`);
    kwp = segConfig.max;
  }

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

  const panelCount = Math.round(kwp / panelKw);

  // Recommended Equipment Details Object
  const recommendedPackage = {
    id: matchedKit ? matchedKit.id : `custom-${kwp}`,
    name: matchedKit ? matchedKit.name : `Комплект ${kwp} кВт`,
    kwp,
    capex,
    url: matchedKit ? matchedKit.url : `https://solarconnect.kz/solnechnye-paneli`,
    panelsCount: matchedKit ? (matchedKit.panels || panelCount) : panelCount,
    panelModel: "LONGi Hi-MO X10 650 Вт (Mono PERC / N-type)",
    inverterModel: matchedKit ? matchedKit.inverter : `Deye ${Math.round(kwp * 0.8)} кВт`,
    storageKwh: matchedKit ? matchedKit.storageKwh : 0,
    storageModel: (matchedKit && matchedKit.storageKwh > 0) ? `Genix Green LiFePO4 (${matchedKit.storageKwh} кВтч)` : "Без аккумуляторов (Сетевая станция)",
    warrantyPanels: "25 лет гарантия выработки",
    warrantyInverter: "5 лет официальная гарантия",
    warrantyInstall: "2 года гарантия на монтаж",
    isMatched: !!matchedKit
  };

  const generationYear = Math.round(kwp * yieldPerKw);
  const monthlyProfile = cityConfig.monthly || [4, 5, 8, 9.5, 11, 12, 12.5, 11.5, 10, 8, 5, 3.5];
  const generationMonth = monthlyProfile.map(pct => Math.round(generationYear * pct / 100));

  // Ecological Metrics Calculation
  const co2TonsYear = Math.round(((generationYear * 0.85) / 1000) * 10) / 10;
  const treesSavedYear = Math.round(co2TonsYear * 45);
  const coalSavedKgYear = Math.round(generationYear * 0.45);
  const co2Tons25Years = Math.round(co2TonsYear * 25);

  const ecoMetrics = {
    co2TonsYear,
    treesSavedYear,
    coalSavedKgYear,
    co2Tons25Years
  };

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

  const sc = input.scenario || {};
  const years = sc.years || cfg.economics?.horizonYears || 25;
  const tariffGrowth = sc.tariffGrowth !== undefined ? sc.tariffGrowth : cfg.economics?.tariffGrowth ?? 0.07;
  const degradation = sc.degradation !== undefined ? sc.degradation : cfg.economics?.degradation ?? 0.005;
  const discountRate = sc.discountRate !== undefined ? sc.discountRate : cfg.economics?.discountRate ?? 0.12;
  const omRate = cfg.economics?.omRate ?? 0.005;
  const invYear = cfg.economics?.inverterReplaceYear ?? 13;
  const invShare = cfg.economics?.inverterReplaceShare ?? 0.12;

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
    recommendedPackage,
    eco: ecoMetrics,
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
