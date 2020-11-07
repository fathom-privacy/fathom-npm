fathom-npm

![npm](https://img.shields.io/npm/v/fathom-privacy) 
# Fathom Privacy NPM SDK

This modules serves to simplify integrations with the GDPR enforcement APIs provided by https://fathomprivacy.com

## Usage instructions

1. Install the fathom-privacy package 

```shell
npm i fathom-privacy --save
```

2. Create a div with id="fathom-signup" that will be the sign-up button 

```html
<div id="fathom-signup" />
```

3. Call the fathom function with your application_id 

~~~javascript
import fathom from "fathom-privacy"

// Fathom initializes button with id "fathom-signup"
fathom("your-application-id").then((newLookup) => {     
    //when the button is clicked, promise is resolved and returns a newLookup object
    
    newLookup.listenForStatus((message) => {
        //listenForStatus(callback(message)) will run on every new status update
        if (message.status === "in progress") {
            console.log("sign up successful!")
        }

        if (message.status === "complete") {
            //newLookup's getLIData() function will return the data for that user's lookup 
            newLookup.getLIData().then((results) => { console.log(results) })
        }
    })
})
~~~ 
