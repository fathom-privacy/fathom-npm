const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

var dev = false
var apiServer = 'https://liapi.fathomprivacy.com/api/v1'
var authServer = 'https://authentication.fathomprivacy.com'

if (dev) {
    apiServer = 'http://localhost:8000/api/v1'
    authServer = 'http://localhost:3000'
} 

module.exports = function fathomInit(application_id, callback)  {
    //set style of button
    var x = document.getElementById("fathom-signup");   // Get the element with id="demo"

    x.style.cursor = "pointer";
    x.innerText = "Connect your LinkedIn with Fathom"

    document.getElementById('fathom-signup').onclick = function openAuth() {
        session_id = uuidv4();
        let popup = window.open(authServer+"?session_id="+session_id+"&application_id="+application_id,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

        // This will succeed    
        waitForStatus(session_id, application_id, popup, 130, callback);
    }
}
  
  function waitForStatus(session_id, application_id, popup, maxRetries, callback) {
      var count = 0;
      var restartCheck = setInterval(function() {
          count++;
          if (count <= maxRetries) {
              //send credentials to server
              axios({
                  method: 'get',
                  url: apiServer +'/getStatus?session_id='+session_id,
                  headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+ application_id
                  }
              })
              .then((response) => {
                  //success case needs if statement on status
                  if (response.data.status === "in progress" || response.data.status === "timed out awaining pin") {
                      //close window
                      clearInterval(restartCheck);
                      popup.close()
                      callback(session_id);
                  } else {
                      // console.log(response.data.status)
                  }
              }, (error) => {
                  console.log(error);
              });
          } else {
              clearInterval(restartCheck);
              callback("Error");
          }
      }, 3000);
  }