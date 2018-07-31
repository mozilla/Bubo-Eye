const myPort = browser.runtime.connect({name:"content-port"}); //connection to background.js

myPort.onMessage.addListener((message) => {  // listener for message from background script
  //if image repeats in page, text will populate in all images.
  let images = document.querySelectorAll(`img[src="${message.srcUrl}"]`);

  for(let image of images){
    image.setAttribute("alt", "Possible text: " + message.result.text);
  }

});
