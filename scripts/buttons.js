function getIssueKey() {
  let issueKey;
  let match;

  if (document.URL.includes('selectedIssue=')) {
    match = document.URL.match(/[\?&]selectedIssue=(.*?)(?=&|$)/);
  } else {
    match = document.title.match(/\[(.*?)\]/);
  }

  if (match !== null) {
    issueKey = match[1];
  }

  return issueKey;
}

function handleQuickAddButton() {
  var quickActionBar = document.getElementsByClassName('gn0msi-0 cqZBrb')[0] ??
    document.getElementsByClassName('_otyr1y44 _ca0q1y44 _u5f3idpf _n3td1y44 _19bvidpf _1e0c116y')[0] ??
    document.getElementsByClassName('_otyr1b66 _1yt4swc3 _1e0c116y')[0];
  if (quickActionBar) {
    if (!document.getElementById('copy-to-clipboard-button')) {
      addQuickAddButtonInside(quickActionBar);
    }
  }
}

function handleBreadcrumbButton() {
  const jiraPermalinkButtonWrapper = document.getElementsByClassName('issue_view_permalink_button_wrapper')?.[0] ?? null;
  if (jiraPermalinkButtonWrapper) {
    if (!document.getElementById('copy-to-clipboard-breadcrumb-button')) {
      addBreadCrumbButtonNextTo(jiraPermalinkButtonWrapper);
    }
  }
}

function addBreadCrumbButtonNextTo(neighbour) {
  // create the button
  const button = document.createElement('button');
  button.id = 'copy-to-clipboard-breadcrumb-button';
  button.className = 'breadcrumb-button';
  button.innerHTML = `
    <div class="breadcrumb-svg-wrapper">
      ${createCopyToClipboardSvg('breadcrumb-button-svg')}
    </div>`;

  // insert the button right after the given neighbour
  neighbour.insertAdjacentElement('afterend', button);

  button.onclick = function () {
    const issueId = getIssueKey();
    if (!!issueId) {
      writeToClipboard(issueId);
    } else {
      console.log('Error: No issue key found!');
    }
  };
}

function addQuickAddButtonInside(parent) {
  const buttonIconSpan = createQuickAddButtonIconSpan();
  const buttonTextSpan = createQuickAddButtonTextSpan();
  const button = createQuickAddButton(buttonIconSpan, buttonTextSpan);
  // const buttonWrapper = createQuickAddButtonWrapperSpan(button);
  parent.appendChild(button);

  button.onclick = function () {
    const issueId = getIssueKey();
    const originalButtonText = buttonTextSpan.textContent;
    if (!!issueId) {
      writeToClipboard(issueId);
      buttonTextSpan.textContent = 'Copied!';
    } else {
      buttonTextSpan.textContent = 'Error: No issue key found!';
    }
    setTimeout(function () {
      buttonTextSpan.textContent = originalButtonText;
    }, 2000);
  };
}

function createCopyToClipboardSvg(cssClass) {
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="${cssClass}" xml:space="preserve">
          <g transform="translate(3 3) scale(0.1465)">
            <path d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"
            fill="currentColor" fill-rule="evenodd"/>
          </g>
        </svg>`;
}

function createCheckmarkSvg(cssClass) {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="${cssClass}" viewBox="0 0 22.903 19.395">
      <polygon points="22.903 2.828 20.075 0 6.641 13.435 3.102 9.09 0 11.616 6.338 19.395 22.903 2.828"/>
    </svg>`;
}

function createQuickAddButtonIconSpan() {
  const buttonIconSpan = document.createElement('span');
  buttonIconSpan.classList.add('css-1uc6u2g');
  buttonIconSpan.innerHTML = `
    <span class="_ca0qidpf _u5f3idpf _n3tdidpf _19bvidpf _18u0r5cr _2hwx1i6y">
      <span aria-hidden="true" class="css-1afrefi">
        ${createCopyToClipboardSvg('quickadd-button-svg')}
      </span>
    </span>`;
  return buttonIconSpan;
}

function createQuickAddButtonTextSpan() {
  const buttonTextSpan = document.createElement('span');
  buttonTextSpan.classList.add('css-178ag6o');
  buttonTextSpan.textContent = 'Copy to clipboard';
  return buttonTextSpan;
}

function createQuickAddButton(buttonIconSpan, buttonTextSpan) {
  const button = document.createElement('button');
  button.id = 'copy-to-clipboard-button';
  button.classList.add('quickadd-button', '_2hwxu2gc', 'css-1luyhz2');
  button.appendChild(buttonIconSpan);
  button.appendChild(buttonTextSpan);
  return button;
}
