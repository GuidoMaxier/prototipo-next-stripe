(function() {
  const SCRIPT_NAME = "adtracker-js";
  const API_ENDPOINT = "http://localhost:3000/api/v1/event"; // In prod, this would be your domain

  function captureSignal() {
    // Get API Key from the script tag's data-api-key attribute
    const scriptTag = document.querySelector(`script[data-client-id]`);
    const apiKey = scriptTag ? scriptTag.getAttribute("data-client-id") : null;

    if (!apiKey) {
      console.warn("AdTracker: Missing data-client-id attribute.");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const trackingData = {
      utmSource: urlParams.get("utm_source"),
      utmMedium: urlParams.get("utm_medium"),
      utmCampaign: urlParams.get("utm_campaign"),
      fbclid: urlParams.get("fbclid"),
      gclid: urlParams.get("gclid"),
      path: window.location.pathname,
      apiKey: apiKey,
    };

    const hasParams = [
      trackingData.utmSource,
      trackingData.utmMedium,
      trackingData.utmCampaign,
      trackingData.fbclid,
      trackingData.gclid
    ].some(val => val !== null);

    // 1. If we have NEW params in URL, save them immediately
    if (hasParams) {
      localStorage.setItem("adtracker_attribution", JSON.stringify(trackingData));
      document.cookie = `adtracker_session=${encodeURIComponent(JSON.stringify(trackingData))}; path=/; max-age=86400; SameSite=Lax`;
    }

    // 2. If current URL is empty but we have OLD params in localStorage, restore the cookie
    const savedAttribution = localStorage.getItem("adtracker_attribution");
    if (!hasParams && savedAttribution) {
      document.cookie = `adtracker_session=${encodeURIComponent(savedAttribution)}; path=/; max-age=86400; SameSite=Lax`;
    }

    const payload = savedAttribution ? JSON.parse(savedAttribution) : trackingData;
    payload.path = window.location.pathname; 

    // Send to SaaS
    fetch(API_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify(payload)
    }).catch(err => console.error("AdTracker Signal Error:", err));
  }

  // Run on load
  if (document.readyState === "complete") {
    captureSignal();
  } else {
    window.addEventListener("load", captureSignal);
  }
})();
