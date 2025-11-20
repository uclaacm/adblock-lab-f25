////////// ad blocker toggle \\\\\\\\\\

const TOGGLE_KEY = "adblockEnabled";
const RULESET_ID = "ruleset_1";

const toggle = document.getElementById("toggle");

async function init() {
  const stored = await chrome.storage.local.get(TOGGLE_KEY);
  const enabled = stored[TOGGLE_KEY] ?? true; // default ON
  toggle.checked = enabled;
}

toggle.addEventListener("change", async () => {
  const enabled = toggle.checked;

  if (enabled) {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: [RULESET_ID],
      disableRulesetIds: []
    });
  } else {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: [],
      disableRulesetIds: [RULESET_ID]
    });
  }

  await chrome.storage.local.set({ [TOGGLE_KEY]: enabled });
});

init();

