'use strict'; // no sloppy JS habits allowed here.
/*
Things to do:
	* 'Why' button should create div element with class whyBox. CSS will style it properly as a modal.
	* 'Why' button will be event listener that does local ajax call to JSON file
	* 'Why' modal will have link to github repo, explination about 201 course, thank you to Rachel
	* Global goals will call results from Google sheets JSON file
	* 'My Goals' will use local storage
	* Field validation for 'Send' button via event handler
*/
document.addEventListener('DOMContentLoaded', function(event) {
  var showWhyBox = false;
  console.log('DOM fully loaded and parsed');
  document.querySelector('nav a').addEventListener('click', function(){
    console.log('clicked');
    if (!showWhyBox) {
      var newDiv = document.createElement('div');
      newDiv.setAttribute('id', 'whyBox');
      document.querySelector('body').appendChild(newDiv);
      showWhyBox = true;
    }

  });
});
