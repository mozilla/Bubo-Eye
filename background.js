
const ocr = Tesseract.create({
    workerPath: browser.runtime.getURL("./dist/worker.js"),
    corePath: browser.runtime.getURL("./dist/tesseract-core.js")
});

browser.contextMenus.create({
  id: "discover-image-text",
  title: "Discover Image Text",// browser.i18n.getMessage("contextMenuItemDiscoverImageText"),
  contexts: ["image"],
  onclick: info => {
    fetch(info.srcUrl)
      .then(response => response.blob())
      .then(blob => {
        ocr.recognize(blob).then(result =>
          console.log(result.text, `Confidence: ${result.confidence}%`));
      });
  }
});
