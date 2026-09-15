/**
 * SolarConnect UI Shared Component Utilities
 * Renders Eco Benefit Box and SolarConnect Equipment Package Recommendations.
 */

import { formatCurrency, formatKW } from "../core/format.js";

export function renderEcoBox(result) {
  const eco = result.eco || {};
  return `
    <div class="sc-eco-box">
      <div class="sc-eco-title">
        🌱 Экологический эффект и польза для природы
      </div>
      <div class="sc-eco-grid">
        <div>
          <div class="sc-eco-stat">-${eco.co2TonsYear || 0} т</div>
          <div>CO₂ в год</div>
        </div>
        <div>
          <div class="sc-eco-stat">🌳 ${eco.treesSavedYear || 0}</div>
          <div>деревьев спасено</div>
        </div>
        <div>
          <div class="sc-eco-stat">⚡ ${Math.round(((eco.coalSavedKgYear || 0) / 1000) * 10) / 10} т</div>
          <div>угля не сожжено</div>
        </div>
      </div>
    </div>
  `;
}

export function renderPackageCard(result, widget) {
  const pkg = result.recommendedPackage || {};
  const formattedPrice = formatCurrency(pkg.capex || result.capex);

  return `
    <div class="sc-pkg-card">
      <div class="sc-pkg-title">
        <span>📦 Рекомендуемый комплект: ${pkg.name} (${pkg.kwp} кВт)</span>
        <span class="sc-pkg-tag">solarconnect.kz</span>
      </div>
      <div class="sc-pkg-specs">
        <div class="sc-pkg-spec-item">
          <span>☀️ <strong>Панели:</strong> ${pkg.panelsCount}x ${pkg.panelModel}</span>
        </div>
        <div class="sc-pkg-spec-item">
          <span>⚡ <strong>Инвертор:</strong> ${pkg.inverterModel}</span>
        </div>
        <div class="sc-pkg-spec-item">
          <span>🔋 <strong>Хранение:</strong> ${pkg.storageModel}</span>
        </div>
        <div class="sc-pkg-spec-item">
          <span>🛡️ <strong>Гарантия:</strong> ${pkg.warrantyPanels}</span>
        </div>
      </div>
      <div style="display: flex; gap: 10px; align-items: center; margin-top: 12px; flex-wrap: wrap;">
        <div style="font-size: 20px; font-weight: 800; color: var(--sc-navy); flex: 1;">
          ${formattedPrice}
        </div>
        <a href="${pkg.url}" target="_blank" rel="noopener" class="sc-btn js-track-pkg-order" data-pkg-id="${pkg.id}" style="text-decoration: none;">
          Заказать комплект на solarconnect.kz →
        </a>
      </div>
    </div>
  `;
}
