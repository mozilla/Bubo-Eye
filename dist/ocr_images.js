//import Tesseract from './dist/tesseract.js'

// image resolution yields better output
// consider enlarging image before recognize runs to get better results.

// Add CDN in <head>
/*
  const Tesseract = document.createElement('script');
  Tesseract.setAttribute('src','tesseract.js/dist/worker.js');
  Tesseract.setAttribute('type', 'text/javascript');
  document.head.appendChild(Tesseract);
*/
Tesseract.create({
    workerPath: './dist/worker.js',
    langPath: './langs/eng.traineddata',
    corePath: './node_modules/tesseract.js-core/index.js',
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
