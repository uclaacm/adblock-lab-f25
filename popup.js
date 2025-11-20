const RULESET_ID = "ruleset_1"; // match the id in manifest.json

// Enable adblock rules
document.getElementById("enableBtn").addEventListener("click", () => {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: [RULESET_ID],
    disableRulesetIds: []
  }, () => {
    console.log("Adblocker enabled!");
  });
});

// Disable adblock rules
document.getElementById("disableBtn").addEventListener("click", () => {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: [],
    disableRulesetIds: [RULESET_ID]
  }, () => {
    console.log("Adblocker disabled!");
  });
});
