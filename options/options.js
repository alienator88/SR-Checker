function storeSettings() {

  function getToggle() {
    const toggle = document.querySelector("#toggle");
    return toggle.checked;
  }

  const toggle = getToggle();
  browser.storage.local.set({
    toggle
  });

}

function updateUI(restoredSettings) {

  const toggle = document.querySelector("#toggle");
  toggle.checked = restoredSettings.toggle;
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

const saveButton = document.querySelector("#save-btn");
saveButton.addEventListener("click", storeSettings);

function onError(e) {
  console.error(e);
}

  