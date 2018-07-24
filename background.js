
// const tesseract = Tesseract.create({
//     workerPath: "worker.js",
//     corePath: "tesseract-core.js"
// });

browser.contextMenus.create({
  id: "discover-image-text",
  title: "Discover Image Text",// browser.i18n.getMessage("contextMenuItemDiscoverImageText"),
  contexts: ["image"],
  onclick: info => {
    debugger;
    fetch(info.srcUrl)
      .then(response => response.blob())
      .then(blob => {
        Tesseract.recognize(blob).then(result =>
          console.log(result.text, `Confidence: ${result.confidence}%`));
      });
  }
});
