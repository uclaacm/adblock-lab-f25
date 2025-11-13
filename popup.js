
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleSwitch');
  const statusText = document.getElementById('statusText');

  // get current state from storage
  chrome.storage.local.get('isEnabled', (data) => {
    // default to true if no value is set
    const isEnabled = data.isEnabled ?? true;
    toggle.checked = isEnabled;
    updateStatusText(isEnabled);
  });

  // add listener for the toggle switch
  toggle.addEventListener('change', () => {
    const newState = toggle.checked;
    
    // save new state and update UI
    chrome.storage.local.set({ isEnabled: newState });
    updateStatusText(newState);

    // update the network-level blocking
    updateDeclarativeRules(newState);

    // reload the active tab to apply/remove content script changes
    reloadCurrentTab();
  });

  function updateStatusText(isEnabled) {
    statusText.textContent = isEnabled ? 'Enabled' : 'Disabled';
    statusText.style.color = isEnabled ? '#2196F3' : '#777';
  }

  function updateDeclarativeRules(isEnabled) {

    const options = {
      disableRulesetIds: isEnabled ? [] : ["ruleset"],
      enableRulesetIds: isEnabled ? ["ruleset"] : []
    };
    
    chrome.declarativeNetRequest.updateEnabledRulesets(options, () => {
      // console.log('AdBlocker Demo: rulesets updated.');
    });
  }

  function reloadCurrentTab() {
    // find the active tab in the current window to reload it
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        // only reload if the URL is cnn.com, where our script runs
        if (tabs[0].url && tabs[0].url.includes('cnn.com')) {
          chrome.tabs.reload(tabs[0].id);
        }
      }
    });
  }
});