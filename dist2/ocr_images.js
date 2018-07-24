//import Tesseract from 'tesseract.js';

// image resolution yields better output
// consider enlarging image before recognize runs to get better results.

// TEST 1: Add CDN in <head> - RESULT: WORKS

debugger;

this.tesseract = Tesseract.create({
  workerPath: "tesseract/dist/worker.js",
  langPath: "tesseract/langs/eus.traineddata.gz",
  corePath: "tesseract/node_modules/tesseract.js-core/index.js",
})

function runOCR(){
  // Collect DOM images.
  let images = document.body.getElementsByTagName("img");

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

      //add aria-describedby to ea. image.

      Tesseract.recognize(ctx)
        .then(function(result){
          // add p tag to ea. image, push result into p tag with aria attr as id
          console.log(result.text, "Confidence: " + result.confidence + "%");
        });
    }
  img.src = src;
  }
}

runOCR();
