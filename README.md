# Image A11y Extension

Image A11y is an accessibility extension that allows screen reader users to click on an image and obtain the text content of that image.
It is not a description of the image but the actual text content within the image that was previously inaccessible to screen reader users. Think of memes, comics, diagrams and any photos with superimposed text on them as part of the image, this is content non-sighted users are unable to access.

![Screenshot of headline, blurb of Firefox news](/Users/villa/Desktop/image-a11y-screenshots/Screenshot_2018-07-27 New Firefox Releases Now Available.png)

Typically the text in this image would not be accessible to a screen reader and therefore to its user. Image A11y allows you to obtain the image text on demand by right clicking on the image to be scanned and passing the text into the reassigned alt attribute.

Image scanning is done with the use of [Tesseract.js](https://github.com/naptha/tesseract.js), a JavaScript library that has been around for several years and initially developed by HP. The extension works by establishing a communication port between the background and content scripts. Tesseract and the scanning it performs works in the background script, which has a connection with the content script that serves to post the message containing the scanning results and the srcUrl of the image. Once the message (components) from the background script are in the content script they are passed into the DOM, specifically the scanned text is passed into the alt attribute of the image scanned, making it now accessible to the screen reader.

Scanning accuracy is not 100%. There are multiple variables within the image itself that diminish the accuracy of the scanning, poorest accuracy is seen with memes and images that contain significant "noise" around the text portion of the image. Best results, highest accuracy is seen with images or screenshots of text; images with the text on a white background and similar cases where the text within the image is unobstructed. Training of tesseract is possible to increase accuracy and this will be the next step in making this extension more helpful to the user.     

## How to use Extension

![Screenshot of image with text, right click drop down menu](/Users/villa/Desktop/image-a11y-screenshots/Screen Shot 2018-07-27 at 9.06.07 AM.png)
Right click on the image you want to scan. The Image A11y icon and "Discover Image Text" option will show at the bottom of the menu once extension has been added and activated.

![Screenshot of image with text, inspector open showing image attributes](/Users/villa/Desktop/image-a11y-screenshots/Screen Shot 2018-07-27 at 9.06.45 AM.png)
Prior to scanning and clicking "Discover Image Text" you can see the img alt attribute is empty. The attribute will be reassigned and scanned text will be injected there.

![Screenshot of image with text, inspector open, clicking on Image A11y icon](/Users/villa/Desktop/image-a11y-screenshots/Screen Shot 2018-07-27 at 9.07.36 AM.png)
With inspector still open (which is not needed during regular use), alt attribute still empty, right click and "Discover Image Text".

![Screenshot of image with text, inspector open, Image A11y clicked](/Users/villa/Desktop/image-a11y-screenshots/Screen Shot 2018-07-27 at 9.08.08 AM.png)
Image has been scanned and the alt attribute now has text from image. Alt attribute text always starts with "Possible text:" due to the potential inaccuracies mentioned above.


## Dependencies

[Tesseract](https://github.com/naptha/tesseract.js)
