const fs = require("fs");
const { JSDOM } = require("jsdom");

const html = fs.readFileSync("calc/demo/index.html", "utf8");
const bundle = fs.readFileSync("calc/sc-calc.js", "utf8");

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:8080/demo/index.html"
});

const window = dom.window;
const document = window.document;

// Execute bundle inside JSDOM environment
window.eval(bundle);
window.SCCalc.scan();

console.log("==========================================");
console.log("   JSDOM Interactive Rendering Test       ");
console.log("==========================================");

const blocks = ["universal", "home", "business", "agro", "backup", "benefit", "finance", "mini"];

blocks.forEach(blockName => {
  const el = document.querySelector(`[data-sc-calc="${blockName}"]`);
  if (!el) {
    console.error(`✗ FAIL: Element [data-sc-calc="${blockName}"] not found in DOM`);
    return;
  }

  const shadow = el.shadowRoot;
  if (!shadow) {
    console.error(`✗ FAIL: Shadow DOM not attached for block "${blockName}"`);
    return;
  }

  const inputs = shadow.querySelectorAll("input, select, button");
  const resultValue = shadow.querySelector(".sc-result-value, .sc-metric-val");

  if (inputs.length > 0) {
    console.log(`✓ SUCCESS: Block "${blockName}" rendered in Shadow DOM (${inputs.length} interactive controls found).`);
  } else {
    console.error(`✗ FAIL: Block "${blockName}" Shadow DOM is empty or missing controls.`);
  }
});
