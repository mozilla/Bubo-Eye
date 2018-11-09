let portFromContent;

browser.runtime.onConnect.addListener(function(p){  // Establish connection to content script.
    portFromContent = p;
})

const ocr = Tesseract.create({      // Tesseract in global scope, working with local files.
    workerPath: browser.runtime.getURL("./dist/worker.js"),
    corePath: browser.runtime.getURL("./dist/tesseract-core.js")
});

browser.contextMenus.create({       // Context menu - right click on-demand functionality of extension.
  id: "discover-image-text",
  title: "Discover Image Text",     // browser.i18n.getMessage("contextMenuItemDiscoverImageText"),
  contexts: ["image"],
  onclick: info => {                // info: image info. if so can we check if alt attr present?
    fetch(info.srcUrl)
      .then(response => response.blob())   // Image data sent as blob.
      .then(blob => {
        ocr.recognize(blob).then(result => {    // Scanning
          console.log(result.text, `Confidence: ${result.confidence}%`);  // Result/scanned text; confidence percentage.
          portFromContent.postMessage({result, srcUrl:info.srcUrl});      // Message with result and srcUrl sent to content script.
        });
      });
  }
});
