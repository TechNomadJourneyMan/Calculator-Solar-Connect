/**
 * SolarConnect Backup Engine - Standby Power & Battery Sizing
 * Pure functions, zero DOM dependencies, ES2019.
 */

import { DEFAULT_CONFIG } from "./engine.js";

/**
 * Calculates battery & inverter requirements based on appliance load checklist.
 * @param {object} input { appliances: [{id, count, hours}], hoursAutonomy: 24, phase: 1 }
 * @param {object} config
 * @returns {object} Backup calculation result
 */
export function calcBackup(input = {}, config = DEFAULT_CONFIG) {
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
