
const myPort = browser.runtime.connect({name:"content-port"}); // Connection to background.js

myPort.onMessage.addListener((message) => {  // Listener for message from background script.
  // If image repeats in page, text will populate in all images.
  let images = document.querySelectorAll(`img[src="${message.srcUrl}"]`);

  function resultFunction(){
    let resultElement = document.createElement("p");
    resultElement.id = "a11yElem";
    resultElement.style.display = "none";
    document.body.appendChild(resultElement);
    resultElement.textContent = browser.i18n.getMessage("messageContent") + message.result.text;
    resultElement.setAttribute("aria-live", "polite");
  }

  function confidenceHiddenNode(){
    let confidenceNode = document.createElement('p');
    confidenceNode.id = "confidence";
    confidenceNode.type = "hidden";
    confidenceNode.textContent = browser.i18n.getMessage("confidenceLocalized") + message.result.confidence + "%";
    document.body.appendChild(confidenceNode);
  }

  for(let image of images){
    image.setAttribute("aria-describedby", "a11yElem");
    resultFunction();
    confidenceHiddenNode();
  }

});