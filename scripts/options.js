document.addEventListener('DOMContentLoaded', function () {
  addInputEventHandlers();
  loadInputStates();
});

function addInputEventHandlers() {
  const saveButton = document.getElementById('save');
  saveButton.addEventListener('click', function () {
    saveClipboardFormat(saveButton);
  });

  document.getElementById('breadcrumb-checkbox').addEventListener('change', function () {
    chrome.storage.local.set({ breadcrumbButton: this.checked });
  });

  document.getElementById('quick-add-checkbox').addEventListener('change', function () {
    chrome.storage.local.set({ quickAddButton: this.checked });
  });
}

function saveClipboardFormat(saveButton) {
  const format = document.getElementById('format').value;
  const saveText = saveButton.textContent;
  // Attempt to save the format
  chrome.storage.local.set({ format: format })
    .then(function () {
      // Update the button text to indicate success
      saveButton.textContent = 'Saved!';
      saveButton.disabled = true;
      // Restore the button text after 1 second
      setTimeout(function () {
        saveButton.textContent = saveText;
        saveButton.disabled = false;
      }, 1000);
    })
    .catch((error) => {
      // Log the error and update the button to indicate failure
      console.error(`Save failed: ${error.message}`);
      saveButton.textContent = 'Save failed!';
      saveButton.style.transition = 'none';
      saveButton.classList.add('failed', 'no-hover');
      saveButton.disabled = true;
      // Restore the button text and style after 1 second
      setTimeout(function () {
        saveButton.textContent = saveText;
        saveButton.style.transition = '';
        saveButton.classList.remove('failed', 'no-hover');
        saveButton.disabled = false;
      }, 1000);
    });
}

async function loadInputStates() {
  const settings = await chrome.storage.local.get(['breadcrumbButton', 'quickAddButton', 'format']);
  // let the button booleans default to true if not set
  document.getElementById('breadcrumb-checkbox').checked = (settings.breadcrumbButton != null) ? settings.breadcrumbButton : true;
  document.getElementById('quick-add-checkbox').checked = (settings.quickAddButton != null) ? settings.quickAddButton : true;
  document.getElementById('format').value = !!settings.format ? settings.format : '{key}: {title}';
}
