const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

var dev = true
var apiServer = 'https://liapi.fathomprivacy.com/api/v1'
var authServer = 'https://authentication.fathomprivacy.com'
var wsServer = 'ws://liapi.fathomprivacy.com/status/'

if (dev) {
    apiServer = 'http://localhost:8000/api/v1'
    authServer = 'http://localhost:3000'
    wsServer = 'ws://localhost:8000/status/'
} 

//uses both callback and promise for backwards compatibility
function fathomInit(application_id, callback)  {
    //set style of button
    var x = document.getElementById("fathom-signup");
    x.style.cursor = "pointer";
    x.innerText = "Connect your LinkedIn with Fathom"

    //OnClick of that button, create a popup and on successful Sign in, both return callback (for backwards compatibility) and return a Lookup class Object
    document.getElementById('fathom-signup').onclick = function openAuth() {
        let session_id = uuidv4();
        let popup = window.open(authServer+"?session_id="+session_id+"&application_id="+application_id,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

        // wait with websockets instead
        let socketPath = wsServer + session_id;    
        const chatSocket = new WebSocket(socketPath);

        chatSocket.onmessage = (e) => {
            var data = JSON.parse(e.data);
            if (dev) {
                console.log("onMessage is received!")
                console.log(data)
            }
            if (data.status === "in progress" || data.status === "timed out awaining pin") {
                //close window

                //slight delay before closing to finish animation
                setTimeout(() => {  popup.close() }, 1000);
                callback(new Lookup(application_id, session_id), null);
            }
        }

    }
}

class Lookup{
    constructor(application_id, session_id) {
        this.application_id = application_id;
        this.session_id = session_id;
    }

    test() {
        return "test!"
    }

    getSessionId() {
        return this.session_id
    }

    getStatus() {
        let that = this
        return new Promise (function(resolve, reject) {
            axios({
                method: 'get',
                url: apiServer +'/getStatus?session_id='+that.session_id,
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ that.application_id
                }
            })
            .then((response) => {
                resolve(response.data.status)
            }, (error) => {
                reject(error)
            })
        })
    }

    getLIContacts() {
        let that = this
        return new Promise (function(resolve, reject) {
            axios({
                method: 'get',
                url: apiServer +'/getLIContacts?session_id='+that.session_id,
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ that.application_id
                }
            })
            .then((response) => {
                resolve(response.data)
            }, (error) => {
                reject(error)
            })
        })
    }
}

// export feature declared earlier as default
export { Lookup, fathomInit as default };
