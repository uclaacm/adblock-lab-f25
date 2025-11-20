// Function to remove elements by class names
function removeAdsByClass(classNames) {
  classNames.forEach(className => {
    const elements = document.getElementsByClassName(className);
    Array.from(elements).forEach(el => el.remove());
  });
}

// Initial removal for static ads
removeAdsByClass([
  "ad-banner",        // example class, update based on site
  "ad-container",
  "advertisement",
  "ad-slot"
]);

// Function to skip video ads
function skipVideoAds() {
  const videos = document.querySelectorAll("video"); // select all videos
  videos.forEach(video => {
    // Check if this video is an ad
    const isAd = video.closest(".ad-container, .video__ad, .ad-overlay"); // customize classes
    if (isAd) {
      try {
        // Attempt to skip the ad
        video.currentTime = video.duration; // jump to end
        video.pause(); // optional: pause after skipping
        // Remove video element from DOM (optional)
        // isAd.remove();
        console.log("Skipped a video ad!");
      } catch (err) {
        console.log("Could not skip ad:", err);
      }
    }
  });
}

// Run initially
skipVideoAds();

// Watch for dynamically loaded video ads
const observer = new MutationObserver(() => {
  skipVideoAds();
});

// Observe changes in the body
observer.observe(document.body, { childList: true, subtree: true });



/*
// Set up a MutationObserver to watch for dynamically loaded ads
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // check if the node or its children have ad-related classes
        const adClasses = ["ad-banner", "ad-container", "advertisement", "ad-slot"];
        adClasses.forEach(cls => {
          if (node.classList.contains(cls)) {
            node.remove();
          } else {
            const adsInside = node.getElementsByClassName(cls);
            Array.from(adsInside).forEach(ad => ad.remove());
          }
        });
      }
    });
  });
});

// Observe changes to the body
observer.observe(document.body, { childList: true, subtree: true });
*/