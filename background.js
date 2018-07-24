
browser.contextMenus.create({
  id: "discover-image-text",
  title: "Discover Image Text",// browser.i18n.getMessage("contextMenuItemDiscoverImageText"),
  contexts: ["image"],
  onclick: info => {
    debugger;
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let image = document.createElement('img');
    image.onload = function() {
        context.drawImage(image, 0, 0);
        canvas.toBlob(blob => {
          Tesseract.recognize(blob).then(result =>
            console.log(result.text, `Confidence: ${result.confidence}%`));
        });
    };
    image.src = info.srcUrl;
  }
});
