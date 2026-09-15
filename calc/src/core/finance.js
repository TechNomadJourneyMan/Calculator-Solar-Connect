/**
 * SolarConnect Financial Engine - Installments, Leasing, Net-Metering & Diesel Comparison
 * Pure functions, zero DOM dependencies, ES2019.
 */

import { DEFAULT_CONFIG } from "./engine.js";

/**
 * Calculates installment scenarios (e.g. Kaspi 12/24m 0%, BCC 36m 12%).
 * @param {number} capex Total station cost in KZT
 * @param {number} savingYear Annual solar savings in KZT
 * @param {object} config
 * @returns {Array} List of installment calculations
 */
export function calcInstallments(capex, savingYear, config = DEFAULT_CONFIG) {
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
export function calcLeasing(capex, config = DEFAULT_CONFIG) {
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
export function calcDieselVsSolar(kwhNeeded, solarCapex, solarLcoe = 0, config = DEFAULT_CONFIG) {
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
export function calcFinance(solarResult, config = DEFAULT_CONFIG) {
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
