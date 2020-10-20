fathom-npm

![npm](https://img.shields.io/npm/v/fathom-privacy) 
# Fathom Privacy NPM SDK

## Usage instructions

1. Install the fathom-privacy package 

```shell
npm i fathom-privacy --save
```

2. Create a div with id="fathom-signup" that will be the sign-up button 

```html
<div id="fathom-signup" />
```

3. Call the fathom function with your application_id and an OnAuthentication callback to initialize the button 

~~~javascript
import fathom from "fathom-privacy"

fathom("your-application-id", (session_id, newLookup) => {
    console.log("On authentication callback function")
    console.log(session_id)

    //Check periodically for completion fo the data collection
    setTimeout(() => {checkStatusPeriodically()}, 5000)

    function checkStatusPeriodically() {
        newLookup.getStatus()
            .then((status) => {
                if (status === "complete") {
                    // when status is complete, fetch call the getLIContacts() functon on newLookup
                    getContactsWhenComplete()
                } else {
                    console.log(status)
                    setTimeout(() => {checkStatusPeriodically()}, 5000)
                }
            })
            .catch((error) =>  {
                console.log(error)
            });
    }

    //When the collection is complete, call the newLookup's getLIComplete function
    function getContactsWhenComplete() {
        newLookup.getLIContacts()
            .then((results) => {
                console.log(results)
            })
            .catch((error) =>  {
                console.log(error)
            });
    }
})
~~~ 
