document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (ev) {
    const saveButton = document.getElementById("save");
    if (ev.target == saveButton) {
      saveClipboardFormat(saveButton);
    }
  });

  loadClipboardFormat();
});

function saveClipboardFormat(saveButton) {
  const format = document.getElementById("format").value;
  const saveText = saveButton.textContent;
  storageSet({ format: format })
    .then(function () {
      saveButton.textContent = "Saved!";
      saveButton.disabled = true;
      setTimeout(function () {
        saveButton.textContent = saveText;
        saveButton.disabled = false;
      }, 1000);
    })
    .catch((error) => {
      console.error(`Save failed: ${error.message}`);
      saveButton.textContent = "Save failed!";
      saveButton.style.transition = "none";
      saveButton.classList.add("failed", "no-hover");
      saveButton.disabled = true;
      setTimeout(function () {
        saveButton.textContent = saveText;
        saveButton.style.transition = "";
        saveButton.classList.remove("failed", "no-hover");
        saveButton.disabled = false;
      }, 1000);
    });
}

function loadClipboardFormat() {
  storageGet("format").then(function (data) {
    if (data.format) {
      document.getElementById("format").value = data.format;
    } else {
      document.getElementById("format").value = "{key}: {title}";
    }
  });
}
