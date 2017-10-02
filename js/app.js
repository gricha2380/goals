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
  var goalArray; // initialize local array for holding goals
  // if existing values are in localhost, use them
  if (window.localStorage.getItem('goals')) {
    console.log('Found existing localstorage values.',JSON.parse(window.localStorage.getItem('goals')));
    goalArray = JSON.parse(window.localStorage.getItem('goals'));
    populateGoals(); // fill page with goal values
  }
  // otherwise make a blank array
  else {
    console.log('No local storage, starting fresh.');
    document.querySelector('.goalCount').innerHTML = '0';
    goalArray = [];
  }

  // var newDiv = document.createElement('div');
  // var body = document.querySelector('body');
  var whyBox = document.querySelector('#whyBox');

  console.log('DOM fully loaded and parsed');


  function makeNewDiv(jsonData, idName, modal) {
    // parse json first
    function processJson(jsonData) {
      console.log('reading JSON, sir');
      var html = '<div class=\'inner\'>';
      for (var e in jsonData) {
        for (var i = 0; i < jsonData[e].length; i++) {
          html += jsonData[e][i];
          console.log(html);
        }
      }
      html += '</div>';
      return html;
    }

    console.log('building new div, sir');
    var newDiv = document.createElement('div');
    var body = document.querySelector('body');
    newDiv.setAttribute('id', idName);
    newDiv.innerHTML = processJson(jsonData);
    // document.querySelector('body').appendChild(newDiv);
    body.insertBefore( newDiv, body.firstChild );
    // if modal paramater was passed, set document class
    if (modal) {
      body.classList.toggle('modal');
    }
  }

  // Learn More modal
  document.querySelector('nav a').addEventListener('click', function(){

    // only continue if hide flag is disabled
    if (!showWhyBox) {
      console.log('clicked');
      // new ajax request
      var xmlhttp = new XMLHttpRequest();
      // local JSON path
      var url = 'data/whyBox.json';

      // AJAX request to load modal content
      xmlhttp.onreadystatechange = function() {
        // if data is fetched successfully
        if (this.readyState == 4 && this.status == 200) {
          // read values as JSON and store in local variable
          var whyBoxData = JSON.parse(this.responseText);

          // makeDiv(whyBoxData);
          // var newDiv = document.createElement('div');
          // newDiv.setAttribute('id', 'whyBox');
          // newDiv.innerHTML = processJson(whyBoxData);
          // document.querySelector('body').appendChild(newDiv);

          // my function for creating new element, populated with page data
          makeNewDiv(whyBoxData,'whyBox','modal');
          // disable hide flag
          showWhyBox = true;
          // if user clicks the close button
          document.querySelector('.close').addEventListener('click', function(event) {
            // note: I can turn this into a function
            // enable hide flag
            showWhyBox = false;
            // delete the element & remove modal class from body
            document.querySelector('body').removeChild(document.querySelector('#whyBox'));
            document.querySelector('body').classList.toggle('modal');
          });
          // allow modal to be closed from clicking on background
          document.querySelector('#whyBox').addEventListener('click', function(e) {
          // click on background?
          });
        }
        // if there's an error retrieving the data
        else {
          console.log('no data');
          feedbackMessage('Error: No data was found for the modal');
        }
      };
      // initiate AJAX request
      xmlhttp.open('GET', url, true);
      xmlhttp.send();
    } // end show whybox

  }); // end onclick

  // When the send button is pressed
  document.querySelector('.send').addEventListener('click', function(event){
    // yell at user if goal is blank
    console.log(document.querySelector('#yourGoal').value,'value of goal');
    if (document.querySelector('#yourGoal').value=='') {
      feedbackMessage('Please type a goal before sending');
    }
    // if goal is provided, proceed to capture values
    else {
      // if no name is provided, use Annonymous as value
      if (document.querySelector('#userName').value=='') {
        goalArray.push({
          'goal' : document.querySelector('#yourGoal').value,
          'author' : 'Annonymous',
          'date' : formatDate()});
      } else {
        // grab values from input fields, save to array
        goalArray.push({
          'goal':document.querySelector('#yourGoal').value,
          'author':document.querySelector('#userName').value,
          'date' : formatDate()});
      }

      // send array to localStorage function
      saveLocalStorage(goalArray);
      // blank out the fields and inform the user
      document.querySelector('#yourGoal').value = '';
      document.querySelector('#userName').value = '';
      feedbackMessage('Thanks for subitting!');
      populateGoals();
    } // end capture value else statement
  }); // end send button event listener

  // save the string
  function saveLocalStorage(itemName) {
    window.localStorage.setItem('goals', JSON.stringify(itemName));
    console.log('prove it exists by typing:','JSON.parse(window.localStorage.getItem(\'goals\'))');
  }

  // read the string
  function readLocalStorage() {
    //var storedNames = JSON.parse(localStorage.getItem("names"));
    //return window.localStorage.getItem('status');
    return JSON.parse(window.localStorage.getItem('goals'));
  }

  // function for parsing goal object and dispalying in goalList
  function populateGoals() {
    //console.log(goalArray);
    // arrays for the opening & closing of all necessary HTML elements
    var goalUnit = ['<div class=\'goalUnit\'>','</div>'];
    var goalDiv = ['<div class=\'goal\'>','</div>'];
    var goalDate = ['<div class=\'date\'>','</div>'];
    var goalName = ['<div class=\'name\'>','</div>'];
    // loop to print out all results in the localStorage object
    for (var e in goalArray) {
      document.querySelector('.goalBody').innerHTML +=
        goalUnit[0]+goalDiv[0]+goalArray[e]['goal']+goalDiv[1]
        +goalDate[0]+goalArray[e]['date']+goalDate[1]
        +goalName[0]+goalArray[e]['author']+goalName[1]+goalUnit[1];
    }
    // set goal counter to current goal total
    if (goalArray.length>1) {
      document.querySelector('.goalCount').innerHTML = goalArray.length;
    } else {
      console.log(goalArray.length);
      document.querySelector('.goalCount').innerHTML = '0';
    }

  } // end populateGoals

  // handy function for displaying messages in feedback box & removing it after x seconds
  function feedbackMessage(message) {
    document.querySelector('.feedback').innerHTML = message;
    setTimeout(function() {
    //console.log('delay before hiding');
      document.querySelector('.feedback').innerHTML = '';
    }, 3000);
  }

  // format date stamp
  function formatDate() {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var d = new Date();
    var dateNow = d.getDate();
    var monthNow = d.getMonth();
    var yearNow = d.getFullYear();
    return months[monthNow] +' '+ dateNow + ', ' + yearNow +' ';
  }

}); // end document ready
