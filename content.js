
const myPort = browser.runtime.connect({name:"content-port"}); // Connection to background.js

myPort.onMessage.addListener((message) => {  // Listener for message from background script.
  // If image repeats in page, text will populate in all images.
  let images = document.querySelectorAll(`img[src="${message.srcUrl}"]`);

  function confidenceHiddenNode(){
    let confidenceNode = document.createElement('p');
    confidenceNode.id = "confidence";
    confidenceNode.type = "hidden";

    confidenceNode.textContent = browser.i18n.getMessage("confidenceLocalized") + message.result.confidence + "%";
    document.body.appendChild(confidenceNode);
  }

  for(let image of images){
    image.setAttribute("alt", browser.i18n.getMessage("messageContent",
      message.result.text));
  }

});
