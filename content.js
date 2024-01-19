let buttonAdded = false; // Flag to check if the button has been added

function addButton(nextToElement) {
    if (buttonAdded) return; // If button is already added, do nothing

    const button = document.createElement('button');
    button.innerText = 'Add it to Wikimedia Commons!';
    button.style.marginLeft = '10px';
    button.style.backgroundColor = 'blue';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '5px 10px';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    button.onclick = function() {
      const observationId = window.location.pathname.split("/").pop(); 
      window.open(`https://inat2wiki.toolforge.org/parse/${observationId}`, '_blank');
    };

    nextToElement.appendChild(button);
    buttonAdded = true; // Update the flag after adding the button
}

function observeDOMChanges() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (!buttonAdded && mutation.addedNodes.length) {
        const targetElement = document.querySelector('.ObservationTitle');
        if (targetElement) {
          addButton(targetElement);
          observer.disconnect(); // Optionally disconnect observer after adding the button
        }
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

observeDOMChanges();
