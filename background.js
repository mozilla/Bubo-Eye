
let portFromContent;

browser.runtime.onConnect.addListener(function(p){  //establish connection to content script.
    portFromContent = p;
})

const ocr = Tesseract.create({      //tesseract in global scope, working with local files.
    workerPath: browser.runtime.getURL("./dist/worker.js"),
    corePath: browser.runtime.getURL("./dist/tesseract-core.js")
});

browser.contextMenus.create({       //context menu - right click on-demand functionality of extension.
  id: "discover-image-text",
  title: "Discover Image Text",     // browser.i18n.getMessage("contextMenuItemDiscoverImageText"),
  contexts: ["image"],
  onclick: info => {
    fetch(info.srcUrl)
      .then(response => response.blob())   //image data sent as blob.
      .then(blob => {
        ocr.recognize(blob).then(result => {    //scanning
          console.log(result.text, `Confidence: ${result.confidence}%`);  //result/scanned text; confidence percentage
          portFromContent.postMessage({result, srcUrl:info.srcUrl});      //message with result and srcUrl sent to content script
        });
      });
  }
});
