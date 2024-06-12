const contextMenuId = 'jira-copy-to-clipboard';

// Function to create the context menu
// Callback reads runtime.lastError to prevent an unchecked error from being
// logged when the extension attempt to register the already-registered menu
// again. Menu registrations in event pages persist across extension restarts.
function createContextMenu() {
  chrome.contextMenus.remove(contextMenuId, function () {
    if (chrome.runtime.lastError) {
      console.log(
        'No existing menu item to remove or other error: ',
        chrome.runtime.lastError
      );
    }

    chrome.contextMenus.create(
      {
        id: contextMenuId,
        title: 'Jira Copy to Clipboard',
        contexts: ['link'],
      },
      function () {
        if (chrome.runtime.lastError) {
          console.error(
            `Error creating Jira Copy to Clipboard context menu: ${chrome.runtime.lastError.message}`
          );
        } else {
          console.log(
            'Jira Copy to Clipboard context menu created successfully.'
          );
        }
      }
    );
  });
}

createContextMenu();

// Add an event listener for clicks on the context menu items created by the extension
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === contextMenuId) {
    if (info.linkUrl.includes('/browse/')) {
      let issueKey = info.linkUrl.split('/browse/')[1];
      chrome.tabs.sendMessage(tab.id, { issueKey });
    }
  }
});
