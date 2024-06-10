chrome.runtime.onMessage.addListener(notify);

function notify(message)
{
  getIssueDataAndWriteToClipboard(message.issueKey);
}

function getIssueKey() {
  const searchParam = "selectedIssue=";
  let issueKey;
  let match;

  if (document.URL.includes(searchParam)) {
    match = document.URL.match(/[\?&]selectedIssue=(.*?)(?=&|$)/);
  } else {
    match = document.title.match(/\[(.*?)\]/);
  }

  if (match !== null) {
    issueKey = match[1];
  } 

  return issueKey;
}

function formatData(data, format){
  const issueKey = data['key'];
  const issueTitle = data['fields']['summary'];
  const issueDescription = data['fields']['description'];
  const issueType = data['fields']['issuetype'].name;
  const issuePriority = data['fields']['priority']?.name;
  const issueStatus = data['fields']['status'].name;
  const issueReporter = data['fields']['reporter'].displayName;
  const issueAssignee = data['fields']['assignee'] ? data['fields']['assignee'].displayName : 'Unassigned';
  const issueUrl = `${window.location.origin}/browse/${issueKey}`;

  const result = format
  .replaceAll('{key}', issueKey)
  .replaceAll('{title}', issueTitle)
  .replaceAll('{description}', issueDescription)
  .replaceAll('{type}', issueType)
  .replaceAll('{priority}', issuePriority)
  .replaceAll('{status}', issueStatus)
  .replaceAll('{reporter}', issueReporter)
  .replaceAll('{assignee}', issueAssignee)
  .replaceAll('{url}', issueUrl)
  .replaceAll('{linkStart}',`<a href="${issueUrl}">`)
  .replaceAll('{linkEnd}','</a>')

  return result;
}

function getIssueDataAndWriteToClipboard(issueId)
{
  const restCallForIssue = `${window.location.origin}/rest/api/2/issue/`;
  const fields = 'fields=key,summary,description,issuetype,priority,status,reporter,assignee'

  fetch(`${restCallForIssue}${issueId}?${fields}`)
  .then((response) => response.json())
  .then((data) => {
    storageGet('format').then(function (storageData) {
      // TODO: make '{linkStart}{key}{linkEnd}: {title}' the default if no format available
      const format = storageData.format || '{key}: {title}';
      const textFormat = format.replaceAll('{linkStart}','').replaceAll('{linkEnd}','')
      const outputText = formatData(data, textFormat)
      
      if(format.includes('{linkStart}') && format.includes('{linkEnd}'))
      {
        const outputHtml = formatData(data, format)
        navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": new Blob([outputText], { type: "text/plain" }),
            "text/html": new Blob([outputHtml], { type: "text/html" })
          })
        ])
      }
      else
        navigator.clipboard.writeText(outputText);
    });
  });
}

function createButton(parent) {
  const buttonIconSpan = document.createElement("span");
  buttonIconSpan.classList.add("css-1uc6u2g")
  buttonIconSpan.innerHTML = `
    <span class="_ca0qidpf _u5f3idpf _n3tdidpf _19bvidpf _18u0r5cr _2hwx1i6y">
      <span aria-hidden="true" class="css-1afrefi" style="--icon-primary-color: currentColor; --icon-secondary-color: var(--ds-surface, #FFFFFF);">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="enable-background:new 0 0 24 24" xml:space="preserve">
          <g transform="translate(3 3) scale(0.1465)">
            <path d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"
            fill="currentColor" fill-rule="evenodd"/>
          </g>
        </svg>
      </span>
    </span>`

  const buttonTextSpan = document.createElement("span");
  buttonTextSpan.classList.add("css-178ag6o")
  const buttonText = 'Copy to clipboard';
  buttonTextSpan.textContent = buttonText

  const button = document.createElement("button");
  button.id = "copy-to-clipboard-button";
  button.classList.add("css-1luyhz2")
  button.appendChild(buttonIconSpan)
  button.appendChild(buttonTextSpan)

  const whiteSpaceSpan = document.createElement("span");
  whiteSpaceSpan.classList.add("button-span", "_2hwxu2gc")
  whiteSpaceSpan.appendChild(button)

  const div = document.createElement("div");
  div.setAttribute("role", "presentation");
  div.appendChild(whiteSpaceSpan)

  parent.appendChild(div);
  
  button.onclick = function () {
    const issueId = getIssueKey();
    if(!!issueId) {
      getIssueDataAndWriteToClipboard(issueId);
      buttonTextSpan.textContent = 'Copied!';
    }
    else
    {
      buttonTextSpan.textContent = 'Error: No issue key found!';
    }
    setTimeout(function () {
      buttonTextSpan.textContent = buttonText;
    }, 2000);
  };
}

var observer = new MutationObserver(function (mutations, me) {
  var parent = document.getElementsByClassName('gn0msi-0 cqZBrb')[0] ??
               document.getElementsByClassName('_otyr1y44 _ca0q1y44 _u5f3idpf _n3td1y44 _19bvidpf _1e0c116y')[0] ??
               document.getElementsByClassName('_otyr1b66 _1yt4swc3 _1e0c116y')[0];
  if (parent) {
    if (!document.getElementById('copy-to-clipboard-button')) {
      createButton(parent);
    }
    return;
  }
});

observer.observe(document, {
  childList: true,
  subtree: true
});
