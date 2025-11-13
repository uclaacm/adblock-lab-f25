// Hide ONLY two specific targets: CNN header ad slot + playback controls
(function () {
  const SELECTORS = [
    // 1. CNN header ad div
    'div.ad-slot-header__wrapper',
    'div[data-uri*="cms.cnn.com/_components/ad-slot-header"]',

    // 2. playback_controls div
    '[data-testid="playback_controls"]'
  ];

  // remove matched nodes
  function removeTargets(root = document) {
    let removed = 0;
    for (const sel of SELECTORS) {
      root.querySelectorAll(sel).forEach(el => {
        if (!el || el === document.documentElement || el === document.body) return;
        el.remove();
        removed++;
      });
    }
    if (removed) console.debug(`[hide-ads] removed ${removed} target(s)`);
  }

  // initial sweep
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => removeTargets());
  } else {
    removeTargets();
  }

  // re-scan when new nodes appear (some sites reinsert these ads)
  new MutationObserver(muts => {
    for (const m of muts) {
      if (m.addedNodes && m.addedNodes.length) {
        requestAnimationFrame(removeTargets);
        break;
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

// Hide ONLY three targets: CNN header ad slot, playback controls, and overlay-root.
(function () {
  const SELECTORS = [
    // CNN header ad container
    'div.ad-slot-header__wrapper',
    'div[data-uri*="cms.cnn.com/_components/ad-slot-header"]',

    // Playback controls
    '[data-testid="playback_controls"]',

    // Overlay root (new)
    '#overlay-root',
    '[data-testid="overlay-root"]',
    '.sc-gnOvAp.dSkZRS'   // class-based fallback, just in case
  ];

  function removeTargets(root = document) {
    let removed = 0;
    for (const sel of SELECTORS) {
      root.querySelectorAll(sel).forEach(el => {
        if (!el || el === document.documentElement || el === document.body) return;
        el.remove();
        removed++;
      });
    }
    if (removed) console.debug(`[hide-ads] removed ${removed} target(s)`);
  }

  // initial cleanup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => removeTargets());
  } else {
    removeTargets();
  }

  // keep watching for reinserted ads/overlays
  new MutationObserver(muts => {
    for (const m of muts) {
      if (m.addedNodes && m.addedNodes.length) {
        requestAnimationFrame(removeTargets);
        break;
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

