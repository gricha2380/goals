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

  function processJson(jsonData) {
    console.log('building table data, sir');
    var html = '';
    for (var e in jsonData) {
      for (var i = 0; i < jsonData[e].length; i++) {
        html += jsonData[e][i];
        console.log(html);
      }
    }
    return html;
  }

  document.querySelector('nav a').addEventListener('click', function(){


    if (!showWhyBox) {
      console.log('clicked');
      var xmlhttp = new XMLHttpRequest();
      var url = '../data/whyBox.json';

      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var whyBoxData = JSON.parse(this.responseText);
          // makeDiv(whyBoxData);
          var newDiv = document.createElement('div');
          newDiv.setAttribute('id', 'whyBox');
          newDiv.innerHTML = processJson(whyBoxData);
          document.querySelector('body').appendChild(newDiv);
          showWhyBox = true;
        } else {
          console.log('no data');
        }
      };
      xmlhttp.open('GET', url, true);
      xmlhttp.send();
    }

  }); // end onclick

  function makeDiv(divData) {
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'whyBox');
    document.querySelector('body').appendChild(newDiv);
    showWhyBox = true;
    return divData;
  }


}); // end document ready
