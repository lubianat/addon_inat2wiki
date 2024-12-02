// popup.js

document.getElementById('addToCommonsButton').addEventListener('click', function () {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const url = new URL(tabs[0].url);
    const observationId = url.pathname.split('/')[2];
    const destinationUrl = `https://inat2wiki.toolforge.org/parse/${observationId}`;
    browser.tabs.create({ url: destinationUrl });
  });
});
