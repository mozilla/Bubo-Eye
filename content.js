
const myPort = browser.runtime.connect({name:"content-port"}); // Connection to background.js

myPort.onMessage.addListener((message) => {  // Listener for message from background script.
  // If image repeats in page, text will populate in all images.
  let images = document.querySelectorAll(`img[src="${message.srcUrl}"]`);

  function resultFunction(){
    let resultElement = document.createElement("p");
    document.body.appendChild(resultElement);
    resultElement.id = "a11yElem";
    resultElement.style.opacity = 0;
    resultElement.setAttribute("aria-live", "polite");
    resultElement.textContent = browser.i18n.getMessage("messageContent") + message.result.text;
  }

  for(let image of images){
    image.setAttribute("aria-describedby", "a11yElem");
    resultFunction();
  }

});
