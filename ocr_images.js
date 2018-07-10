// runOCR on page onload. grab all images from page, loop through all images.
//import Tesseract from 'tesseract.js'

// image resolution will determine better output
// consider enlarging image before recognize runs to get better results.
// Tesseract will run OCR on img, video and canvas tags, need to include and collect these sources.

// Add CDN in <head>
/*
  const TESSERACTCDN = document.createElement('script');
  TESSERACTCDN.setAttribute('src','https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js');
  document.head.appendChild(TESSERACTCDN);
*/

window.Tesseract = Tesseract.create({
    workerPath: 'tesseract.js/dist/worker.dev.js',
    langPath: 'https://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/',
    corePath: 'https://cdn.rawgit.com/naptha/tesseract.js-core/0.1.0/index.js',
})


function runOCR(){
  // Collect DOM images.
  let images = document.body.getElementsByTagName("img");
  //let videos = document.body.getElementsByTagName("video");
  //let canvases = document.body.getElementsByTagName("canvas");
  for(let i = 0; i < images.length; i++){

  let img = new Image();
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let src = images[i].src;

  img.crossOrigin = "Anonymous";

  img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage( img, 0, 0 );

      Tesseract.recognize(ctx)
        .then(function(result){
          console.log(result.text, "Confidence: " + result.confidence + "%");
        });
    }
  img.src = src;
  }
}

runOCR();
