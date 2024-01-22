let buttonAdded = false;

function checkLicenseAndAddButton(observationId, nextToElement) {
    fetch(`https://api.inaturalist.org/v1/observations/${observationId}`)
        .then(response => response.json())
        .then(data => {
            const licenseCode = data.results[0].license_code;
            const isCompatibleLicense = ["cc-by", "cc-by-sa", "cc0"].includes(licenseCode);
            addButton(nextToElement, isCompatibleLicense);
        })
        .catch(error => console.error('Error fetching observation data:', error));
}

function addButton(nextToElement, isCompatibleLicense) {
    if (buttonAdded) return;

    const button = document.createElement('button');
    button.style.marginLeft = '10px';
    button.style.backgroundColor = isCompatibleLicense ? 'blue' : 'grey';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '5px 10px';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    if (isCompatibleLicense) {
        button.innerText = 'Add it to Wikimedia Commons!';
        button.onclick = function() {
            const observationId = window.location.pathname.split("/").pop();
            window.open(`https://inat2wiki.toolforge.org/parse/${observationId}`, '_blank');
        };
    } else {
        button.innerText = 'Cannot upload to Commons, incompatible license.';
        button.disabled = true;
    }

    nextToElement.appendChild(button);
    buttonAdded = true;
}

function observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (!buttonAdded && mutation.addedNodes.length) {
                const targetElement = document.querySelector('.ObservationTitle');
                if (targetElement) {
                    const observationId = window.location.pathname.split("/").pop();
                    checkLicenseAndAddButton(observationId, targetElement);
                    observer.disconnect();
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

observeDOMChanges();