document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("save");
  saveButton.addEventListener("click", function () {
    saveClipboardFormat(saveButton);
  });

  loadClipboardFormat();
});

function saveClipboardFormat(saveButton) {
  const format = document.getElementById("format").value;
  const saveText = saveButton.textContent;
  // Attempt to save the format
  chrome.storage.local.set({ format: format })
    .then(function () {
      // Update the button text to indicate success
      saveButton.textContent = "Saved!";
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
      saveButton.textContent = "Save failed!";
      saveButton.style.transition = "none";
      saveButton.classList.add("failed", "no-hover");
      saveButton.disabled = true;
      // Restore the button text and style after 1 second
      setTimeout(function () {
        saveButton.textContent = saveText;
        saveButton.style.transition = "";
        saveButton.classList.remove("failed", "no-hover");
        saveButton.disabled = false;
      }, 1000);
    });
}

function loadClipboardFormat() {
  chrome.storage.local.get("format").then(function (data) {
    if (data.format) {
      document.getElementById("format").value = data.format;
    } else {
      document.getElementById("format").value = "{key}: {title}";
    }
  });
}
