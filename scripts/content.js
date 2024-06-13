chrome.runtime.onMessage.addListener(notify);

async function notify(message) {
  await writeToClipboard(message.issueKey);
}

async function handleMutations(mutations) {
  try {
    const settings = await chrome.storage.local.get(['breadcrumbButton', 'quickAddButton',]);
    // TODO: these are the same defaults as in options.js, prevent duplication
    const enableBreadcrumbCheckbox = settings.breadcrumbButton != null ? settings.breadcrumbButton : true;
    const enableQuickAddButton = settings.quickAddButton != null ? settings.quickAddButton : true;

    if (enableBreadcrumbCheckbox) {
      handleBreadcrumbButton();
    }

    if (enableQuickAddButton) {
      handleQuickAddButton();
    }
  } catch (error) {
    console.error('Error handling mutations:', error);
  }
}

// Create the MutationObserver
// Jira often loads or modifies content dynamically as users navigate through the interface, especially within the same page context.
// To handle such cases, it's more reliable to use a MutationObserver to monitor changes to the DOM and inject the button when the target element becomes available.
const observer = new MutationObserver((mutations, observerInstance) => {
  handleMutations(mutations);
});

// Start observing the document
observer.observe(
  document, {
  childList: true,
  subtree: true,
});
