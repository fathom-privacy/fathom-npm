fathom-npm

![npm](https://img.shields.io/npm/v/fathom-privacy) 
# Fathom Privacy NPM Module

## Usage instructions

1. Install the fathom-privacy package ```npm i fathom-privacy --save```
2. Import the package ```import fathomButton from "fathom-privacy"```
3. Create the div that will be the sign-up button ```<div id="fathom-signup" />```
4. Call the fathomButton function with your application_id and a callback to initialize the button ```fathom("your-key-here", (status_id) => {console.log(status_id)})``` 