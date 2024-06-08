const contextMenuId = "jira-snippet";

// Function to create the context menu
// Callback reads runtime.lastError to prevent an unchecked error from being 
// logged when the extension attempt to register the already-registered menu 
// again. Menu registrations in event pages persist across extension restarts.
function createContextMenu() {
  chrome.contextMenus.remove(contextMenuId, function() {
    if (chrome.runtime.lastError) {
      console.log("No existing menu item to remove or other error: ", chrome.runtime.lastError);
    }

    chrome.contextMenus.create({
        id: contextMenuId,
        title: "Copy IssueId and Title to Clipboard",
        contexts: ["link"],
    }, function() {
      if (chrome.runtime.lastError) {
        console.error(`Error creating context menu: ${chrome.runtime.lastError.message}`);
      } else {
        console.log("Context menu created successfully.");
      }
    });
  });
}

createContextMenu();

chrome.contextMenus.onClicked.addListener((info, tab) => {
if (info.menuItemId === "jira-snippet") {
    if(info.linkUrl.includes("/browse/"))
    {
        let issueId = info.linkUrl.split("/browse/")[1];

        chrome.tabs.sendMessage(tab.id, {issueId: issueId});
    }
}
});