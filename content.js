
const myPort = browser.runtime.connect({name:"content-port"}); // Connection to background.js

myPort.onMessage.addListener((message) => {  // Listener for message from background script.
  // If image repeats in page, text will populate in all images.
  let images = document.querySelectorAll(`img[src="${message.srcUrl}"]`);

  //let startAltMsg = browser.i18n.getMessage("messageContent"); //name of message, specified in messages.json file in _locales
  function resultFunction(){
    let resultElement = document.createElement("p");
    resultElement.id = "a11yElem";
    resultElement.style.display = "none";
    document.body.appendChild(resultElement);
    resultElement.textContent = browser.i18n.getMessage("messageContent") + message.result.text;
    resultElement.setAttribute("aria-live", "polite");
  }

  for(let image of images){
    image.setAttribute("aria-describedby", "a11yElem");
    resultFunction();
  }

});
