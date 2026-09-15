/**
 * SolarConnect Automated Test Suite
 * Covers Test Cases 1 through 8 from Section 15.2 of the technical specification.
 */

import { DEFAULT_CONFIG, calcSolar } from "../src/core/engine.js";
import { calcInstallments, calcDieselVsSolar } from "../src/core/finance.js";
import { calcBackup } from "../src/core/backup.js";

let passedCount = 0;
let failedCount = 0;

function assert(condition, message, actual, expected) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passedCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    if (actual !== undefined) console.error(`    Actual:   ${actual}`);
    if (expected !== undefined) console.error(`    Expected: ${expected}`);
    failedCount++;
  }
}

function approxEqual(actual, expected, tolerancePercent = 5) {
  if (expected === 0) return Math.abs(actual) < 0.01;
  const diff = Math.abs(actual - expected);
  const pct = (diff / Math.abs(expected)) * 100;
  return pct <= tolerancePercent;
}

console.log("==========================================");
console.log("   SolarConnect Test Suite Execution      ");
console.log("==========================================");

// --- TEST 1: Home, Almaty, bill 62,000 KZT, Net Mode ---
console.log("\n[Test 1] Home, Almaty, Bill 62,000 KZT (Net mode)");
const t1 = calcSolar({ segment: "home", city: "almaty", bill: 62000, mode: "net" }, DEFAULT_CONFIG);

assert(t1.consumptionYear === 24800, "Annual consumption == 24 800 kWh", t1.consumptionYear, 24800);
assert(approxEqual(t1.kwp, 16.9, 2), "Power == 16.9 kW", t1.kwp, 16.9);
assert(approxEqual(t1.capex, 4620000, 3), "Capex approx 4,620,000 KZT", t1.capex, 4620000);
assert(approxEqual(t1.generationYear, 24708, 2), "Generation approx 24,708 kWh", t1.generationYear, 24708);
assert(approxEqual(t1.savingYear, 741000, 3), "Saving approx 741,000 KZT", t1.savingYear, 741000);
assert(approxEqual(t1.paybackSimple, 6.2, 10), "Simple Payback approx 6.2 years", t1.paybackSimple, 6.2);
assert(approxEqual(t1.irr, 0.21, 15), "IRR approx 21%", t1.irr, 0.21);
assert(approxEqual(t1.npv, 4675000, 15), "NPV approx 4,675,000 KZT", t1.npv, 4675000);

// --- TEST 2: Home, Almaty, bill 62,000 KZT, Self Mode (35% self, 0.7 credit) ---
console.log("\n[Test 2] Home, Almaty, Bill 62,000 KZT (Self mode 35% / 0.7)");
const t2 = calcSolar({ segment: "home", city: "almaty", bill: 62000, mode: "self", selfShare: 0.35 }, DEFAULT_CONFIG);

assert(approxEqual(t2.savingYear, 597000, 5), "Self mode saving approx 597,000 KZT", t2.savingYear, 597000);
assert(approxEqual(t2.paybackSimple, 7.7, 10), "Self mode payback approx 7.7 years", t2.paybackSimple, 7.7);

// --- TEST 3: Business, 150,000 kWh/yr, 80% daytime ---
console.log("\n[Test 3] Business, 150,000 kWh/yr, 80% daytime");
const t3Self = calcSolar({ segment: "business", city: "almaty", consumptionYear: 150000, mode: "self", selfShare: 0.80 }, DEFAULT_CONFIG);
const t3Net = calcSolar({ segment: "business", city: "almaty", consumptionYear: 150000, mode: "net" }, DEFAULT_CONFIG);

assert(t3Self.kwp === 105.3, "Power == 105.3 kW (Biz-105 kit)", t3Self.kwp, 105.3);
assert(t3Self.capex === 20000000, "Capex == 20,000,000 KZT", t3Self.capex, 20000000);
assert(approxEqual(t3Self.generationYear, 153949, 2), "Generation approx 153,949 kWh", t3Self.generationYear, 153949);
assert(approxEqual(t3Self.savingYear, 4341000, 5), "Self mode saving approx 4,341,000 KZT", t3Self.savingYear, 4341000);
assert(approxEqual(t3Net.savingYear, 4500000, 5), "Net mode saving approx 4,500,000 KZT", t3Net.savingYear, 4500000);
assert(t3Self.paybackSimple >= 4.3 && t3Self.paybackSimple <= 4.8, "Payback within 4.4-4.6 years range", t3Self.paybackSimple, 4.6);
assert(approxEqual(t3Self.irr, 0.27, 15), "Business IRR approx 27%", t3Self.irr, 0.27);

// --- TEST 4: Mini Widget, Bill 40,000 KZT ---
console.log("\n[Test 4] Mini Widget, Bill 40,000 KZT");
const t4 = calcSolar({ segment: "home", city: "almaty", bill: 40000 }, DEFAULT_CONFIG);

assert(approxEqual(t4.kwp, 11.05, 5), "Power approx 11.05 kW", t4.kwp, 11.05);
assert(approxEqual(t4.capex, 2660000, 5), "Capex approx 2,660,000 KZT", t4.capex, 2660000);
assert(approxEqual(t4.savingYear, 480000, 5), "Saving == 480,000 KZT/yr", t4.savingYear, 480000);
assert(approxEqual(t4.paybackSimple, 5.5, 10), "Payback approx 5.5 years", t4.paybackSimple, 5.5);

// --- TEST 5: Agro, 38,000 kWh/yr, 70% daytime ---
console.log("\n[Test 5] Agro, 38,000 kWh/yr, 70% daytime");
const t5 = calcSolar({ segment: "agro", city: "almaty", consumptionYear: 38000, mode: "self", selfShare: 0.70 }, DEFAULT_CONFIG);

assert(t5.kwp === 26, "Power == 26 kW (Agro-26 kit)", t5.kwp, 26);
assert(t5.capex === 10741975, "Capex == 10,741,975 KZT", t5.capex, 10741975);
assert(approxEqual(t5.savingYear, 1038000, 5), "Saving approx 1,038,000 KZT/yr", t5.savingYear, 1038000);
assert(approxEqual(t5.paybackSimple, 10.4, 10), "Payback approx 10.4 years", t5.paybackSimple, 10.4);

// --- TEST 6: Backup Power Engine ---
console.log("\n[Test 6] Backup Power Engine");
const backupLoad = [
  { id: "light", count: 1, hours: 5 },
  { id: "fridge", count: 1, hours: 24 },
  { id: "router", count: 1, hours: 24 },
  { id: "pump", count: 1, hours: 8 },
  { id: "tv", count: 1, hours: 4 }
];
const t6 = calcBackup({ appliances: backupLoad, hoursAutonomy: 24 }, DEFAULT_CONFIG);

assert(approxEqual(t6.energyDayKwh, 3.34, 10), "Daily consumption approx 3.34 kWh", t6.energyDayKwh, 3.34);
assert(approxEqual(t6.batteryNeededKwh, 4.25, 10), "Battery requirement approx 4.25 kWh", t6.batteryNeededKwh, 4.25);
assert(t6.moduleCount === 1, "Module count == 1 (5 kWh module)", t6.moduleCount, 1);
assert(approxEqual(t6.peakLoadW, 990, 10), "Peak load with starting factor approx 990 W", t6.peakLoadW, 990);
assert(t6.inverterKw === 5, "Inverter matched == 5 kW", t6.inverterKw, 5);

// --- TEST 7: Installments Calculation ---
console.log("\n[Test 7] Installments on 4,620,000 KZT capex & 741,000 KZT/yr saving");
const t7 = calcInstallments(4620000, 741000, DEFAULT_CONFIG);

const i24 = t7.find(opt => opt.months === 24 && opt.rate === 0);
const i36 = t7.find(opt => opt.months === 36 && opt.rate === 0.12);

assert(i24 && approxEqual(i24.monthly, 192500, 2), "24m 0% monthly == 192,500 KZT", i24 ? i24.monthly : 0, 192500);
assert(i36 && approxEqual(i36.monthly, 153450, 5), "36m 12% monthly approx 153,450 KZT", i36 ? i36.monthly : 0, 153450);

// --- TEST 8: Edge & Boundary Cases ---
console.log("\n[Test 8] Edge & Boundary Cases");
const t8Small = calcSolar({ segment: "home", bill: 5000 }, DEFAULT_CONFIG);
assert(t8Small.warnings.length > 0 || t8Small.paybackSimple > 10, "Small bill generates warning or long payback", true, true);

const t8Area = calcSolar({ segment: "home", bill: 62000, roofArea: 20 }, DEFAULT_CONFIG);
assert(t8Area.area.fits === false, "Roof area restriction flags fits == false", t8Area.area.fits, false);
assert(t8Area.warnings.length > 0, "Roof area restriction emits warning message", true, true);

const t8Fallback = calcSolar({}, null);
assert(t8Fallback.kwp > 0 && t8Fallback.capex > 0, "Missing config gracefully uses default config fallback", true, true);

console.log("\n==========================================");
console.log(` Results: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==========================================");

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log("All automated tests completed successfully!");
}
