# Jira Copy to Clipboard

A simple Chrome extension that allows "Copy to clipboard" functionality in Jira Cloud. Quickly copy fields like issue id and title to the clipboard. You can configure which fields get copied and how it is formatted.

Forked from [Jira-Snippet](https://github.com/daemonLibra/Jira-Snippet).

## Current features
- "Copy to clipboard" button on issue screen, issue popup screen and issue sidebar screen.  
  Matching the Jira Cloud quick add button style.
- "Copy to clipboard" option on hyperlink of any issue on the screen.  
  E.g., on the dashboard, linked issues, issues mentioned in comments, ...  
  No need to open the issue! Right-click the hyperlink and choose "Copy to clipboard" from the context menu.
- "Copy to clipboard" button near the breadcrumb navigator.  
  This is always visible even when scrolling down the issue details.
- Configure which fields get copied to the clipboard and in what format.
- Support copy as text and as HTML to the clipboard.  
  When pasting in HTML supported editors (chat, email, ...) you have a link to the issue.
- Supports dark mode.

## Images
- TODO

## Copy format examples
- TODO

## Installation

This extension hasn't been published to any browser marketplace.
But you can install it from source code.

### Method 1: Load as unpacked extension from source code (Developer Mode)
Note that enabling Developer Mode allows installing extensions not available on the browser web store. So there are no automatic updates and there is no verification performed by store owner (e.g. Google).

- Download the source files .zip from the [latest release](https://github.com/lvernaillen/jira-copy-to-clipboard/releases/latest).
  - Extract the zip file to a location of your choice.
  - You can also clone the repo instead of downloading the .zip file.
- Enable Developer Mode in your browser:
  - Open your browser.
  - Navigate to the Extensions page by clicking the three vertical dots in the top-right corner, then `Extensions` > `Manage Extensions`, or for Chrome by directly visit `chrome://extensions/`.
  - Toggle the Developer mode switch in the top-right corner of the Extensions page.
- Load the extension:
  - Click `Load unpacked` in the top-left corner of the Extensions page.
  - Navigate to the location where you unzipped the source code.
- Disable the Developer Mode again after loading the extension.
  - This prevents that other unverified extensions get installed in case of phishing.

### Method 2: Install from browser marketplace
- TODO
