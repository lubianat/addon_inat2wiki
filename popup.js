document.getElementById('addToCommonsButton').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const url = new URL(tabs[0].url);
    const observationId = url.pathname.split('/')[2];
    const destinationUrl = `https://inat2wiki.toolforge.org/parse/${observationId}`;
    chrome.tabs.create({ url: destinationUrl });
  });
});
