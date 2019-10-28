
const myPort = browser.runtime.connect({name:"content-port"}); // Connection to background.js

myPort.onMessage.addListener((message) => {  // Listener for message from background script.
  // If image repeats in page, text will populate in all images.
  let images = document.querySelectorAll(`img[src="${message.srcUrl}"]`);

  function appendPossibleTextElement(){
    let resultElement = document.createElement("p");
    resultElement.id = `${message.srcUrl}-a11yElem`;
    resultElement.style.opacity = 0;
    resultElement.setAttribute("aria-live", "polite");
    document.body.appendChild(resultElement);
    resultElement.textContent = browser.i18n.getMessage("messageContent" + message.result.text);
  }

  for(let image of images){
    image.setAttribute("aria-describedby", `${message.srcUrl}-a11yElem`);
  }

  appendPossibleTextElement();

});
