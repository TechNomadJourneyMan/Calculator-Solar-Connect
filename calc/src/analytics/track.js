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
export function trackEvent(eventName, params = {}) {
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
