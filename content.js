
const myPort = browser.runtime.connect({name:"content-port"}); // Connection to background.js

myPort.onMessage.addListener((message) => {  // Listener for message from background script.
  // If image repeats in page, text will populate in all images.
  let images = document.querySelectorAll(`img[src="${message.srcUrl}"]`);

  let startAltMsg = browser.i18n.getMessage("messageContent"); //name of message, specified in messages.json file in _locales

  for(let image of images){
    image.setAttribute("aria-busy", "true");
    image.setAttribute("aria-live", "polite");
    image.setAttribute("alt", startAltMsg + message.result.text);
    image.setAttribute("aria-busy", "false");
  }

});
