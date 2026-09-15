const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const cssPath = path.join(rootDir, "calc", "sc-calc.css");
const cssContent = fs.readFileSync(cssPath, "utf8");

// Read module files
const engineSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "core", "engine.js"), "utf8");
const financeSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "core", "finance.js"), "utf8");
const backupSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "core", "backup.js"), "utf8");
const formatSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "core", "format.js"), "utf8");
const validateSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "core", "validate.js"), "utf8");
const i18nSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "i18n.js"), "utf8");
const chartSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "chart.js"), "utf8");
const submitSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "lead", "submit.js"), "utf8");
const trackSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "analytics", "track.js"), "utf8");

const homeSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "blocks", "home.js"), "utf8");
const businessSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "blocks", "business.js"), "utf8");
const agroSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "blocks", "agro.js"), "utf8");
const backupBlockSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "blocks", "backup.js"), "utf8");
const benefitSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "blocks", "benefit.js"), "utf8");
const financeBlockSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "blocks", "finance.js"), "utf8");
const miniSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "blocks", "mini.js"), "utf8");
const universalSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "blocks", "universal.js"), "utf8");
const widgetSrc = fs.readFileSync(path.join(rootDir, "calc", "src", "ui", "widget.js"), "utf8");

// Strip import/export statements for plain IIFE concatenation
function cleanESM(code) {
  return code
    .replace(/^import\s+[\s\S]*?;/gm, "")
    .replace(/^export\s+default\s+/gm, "")
    .replace(/^export\s+const\s+/gm, "const ")
    .replace(/^export\s+function\s+/gm, "function ")
    .replace(/^export\s+let\s+/gm, "let ")
    .replace(/^export\s+class\s+/gm, "class ");
}

const bundledCode = `
/**
 * SolarConnect Multi-Calculator System (sc-calc.js)
 * Standalone ES2019 IIFE Bundle. Zero external dependencies.
 * Version: 1.0.0 (2026-09-15)
 */
(function() {
  'use strict';

  const INLINED_CSS = ${JSON.stringify(cssContent)};

  ${cleanESM(engineSrc)}
  ${cleanESM(financeSrc)}
  ${cleanESM(backupSrc)}
  ${cleanESM(formatSrc)}
  ${cleanESM(validateSrc)}
  ${cleanESM(i18nSrc)}
  ${cleanESM(chartSrc)}
  ${cleanESM(submitSrc)}
  ${cleanESM(trackSrc)}

  ${cleanESM(homeSrc)}
  ${cleanESM(businessSrc)}
  ${cleanESM(agroSrc)}
  ${cleanESM(backupBlockSrc)}
  ${cleanESM(benefitSrc)}
  ${cleanESM(financeBlockSrc)}
  ${cleanESM(miniSrc)}
  ${cleanESM(universalSrc)}

  // Injected CSS into SCCalcWidget
  ${cleanESM(widgetSrc).replace("this.options.css || \"\"", "INLINED_CSS")}

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
`;

const outputPath = path.join(rootDir, "calc", "sc-calc.js");
fs.writeFileSync(outputPath, bundledCode, "utf8");
console.log(`[Build] Output bundle written to ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
