/**
 * SolarConnect Canvas 2D Chart Engine
 * Lightweight, zero dependencies, Retina/High DPI support, responsive.
 */

import { formatNumber } from "../core/format.js";

const MONTH_NAMES = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

/**
 * Renders 12-month generation bars overlaid with consumption line.
 * @param {HTMLCanvasElement} canvas
 * @param {number[]} monthlyGen Array of 12 kWh values
 * @param {number} annualConsumption Annual consumption in kWh
 * @param {object} options
 */
export function renderGenerationChart(canvas, monthlyGen = [], annualConsumption = 0, options = {}) {
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
export function renderCashflowChart(canvas, cashflow = [], paybackYears = 0, options = {}) {
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
export function generateAccessibleTableHTML(data = [], title = "Таблица данных") {
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
