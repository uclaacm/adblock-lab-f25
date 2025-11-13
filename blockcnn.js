// --- Activity #1: Hiding Static Ads ---

// a list of CSS selectors that often correspond to ad containers on CNN
// note: these change all the time! (core challenge of ad blocking)
const STATIC_AD_SELECTORS = [
  '.ad-slot',
  '.ad-container',
  '[data-ad-display-unit]',
  '[data-ad-size-map]',
  '.header-ad'
];

function hideStaticAds() {
  // console.log('AdBlocker Demo: searching for static ads...');
  STATIC_AD_SELECTORS.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {

      // we hide the parent element to remove the whole ad unit
      if (el.parentElement) {
        el.parentElement.style.display = 'none';
      }
      // also hide the element itself just in case.
      el.style.display = 'none';
    });
  });
}

function runBlocker() {
  hideStaticAds();
}

// check if the extension is enabled (popup toggle controls this value in chrome.storage)
chrome.storage.local.get('isEnabled', (data) => {

  if (isEnabled) {
    runBlocker();

    // --- MutationObserver (Activity #1) ---
    // pages like CNN load content dynamically
    // we need to watch for new elements (like ads) being added to the DOM
    const observer = new MutationObserver((mutations) => {
      // we just re-run our blockers on any change
      runBlocker();
    });

    // start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
});