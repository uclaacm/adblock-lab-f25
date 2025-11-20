function removeAds() {
  const frames = document.getElementsByTagName("iframe");
  for (let i = frames.length - 1; i >= 0; i--) {
    frames[i].remove();
  }
}

console.log("-- content.js running --")
removeAds();

const observer = new MutationObserver(removeAds);
observer.observe(document.body, { childList: true, subtree: true });
