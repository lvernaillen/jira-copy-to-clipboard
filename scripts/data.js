function formatData(data, format) {
  const issueKey = data['key'];
  const issueTitle = data['fields']['summary'];
  const issueDescription = data['fields']['description'];
  const issueType = data['fields']['issuetype'].name;
  const issuePriority = data['fields']['priority']?.name;
  const issueStatus = data['fields']['status'].name;
  const issueReporter = data['fields']['reporter'].displayName;
  const issueAssignee = data['fields']['assignee']
    ? data['fields']['assignee'].displayName
    : 'Unassigned';
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
    .replaceAll('{linkStart}', `<a href="${issueUrl}">`)
    .replaceAll('{linkEnd}', '</a>');

  return result;
}

async function fetchIssueData(issueId) {
  const restCallForIssue = `${window.location.origin}/rest/api/2/issue/`;
  const fields = 'fields=key,summary,description,issuetype,priority,status,reporter,assignee';
  const response = await fetch(`${restCallForIssue}${issueId}?${fields}`);
  const data = await response.json();
  return data;
}

async function getDataFormat() {
  const storageData = await chrome.storage.local.get('format');
  const format = storageData.format || '{key}: {title}';
  return format;
}

async function writeAsPlainText(outputText) {
  await navigator.clipboard.writeText(outputText);
}

async function writeAsHtml(outputText, outputHtml) {
  await navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob([outputText], { type: 'text/plain' }),
      'text/html': new Blob([outputHtml], { type: 'text/html' }),
    }),
  ]);
}

async function writeToClipboard(issueId) {
  try {
    const data = await fetchIssueData(issueId);
    const format = await getDataFormat();

    const textFormat = format.replaceAll('{linkStart}', '').replaceAll('{linkEnd}', '');
    const outputText = formatData(data, textFormat);

    if (format.includes('{linkStart}') && format.includes('{linkEnd}')) {
      // Prevent newlines when pasting in some applications (e.g. Google Chat, but not GMail) by wrapping it in a span
      const outputHtml = `<span>${formatData(data, format)}</span>`;
      await writeAsHtml(outputText, outputHtml);
    } else {
      await writeAsPlainText(outputText);
    }
  } catch (error) {
    console.error('An error writing to clipboard:', error);
  }
}
