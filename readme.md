# sm-form-validation

A simple JS form Validation, for projects using Node.

## Installation

Install with NPM.

```bash
npm install sm-form-validation
```

## Simple Usage

```javascript
const { validate, required, email } = require('sm-form-validation') // import the validate function and the validations

validate( //Call validate function
     [
         {name: [ required('Fill the name') ]}, // you can pass a custom error message
         {email: [ email() ]}, // or just don't pass anything (Default return in English)
     ]
 )
     .then(() => { // success promise don't return any value
         console.log('success')
     })
     .catch((err) => { // error promise return an array with all error occurrences
         console.log(err)//array
     })
```

## The Validation Function
It receives an array of objects, that contains the value to validate and a validation array.<br/>
Then return a Promise that return empty when success or and array when has an error
```javascript
validate( [ { value : [ validation array ] } ] )
  .then(()=>{})
  .catch((err)=>{ console.log(err)})
```
## The Error Return
When the validation gets error, it return an Array with all the occurrences.<br/>
***This code:***
```javascript
validate(
    [
        {'': [required()]}, // empty value, validation Required()
    ]
)
    .then(() => {
        console.log('success')
    })
    .catch(err => {
        console.log(err)
    })
```
***Will return this Array:***
```javascript
[
  {
    value: '', // Value to validate
    index: 0,  // index on value array
    validation: [Function: validateRequired], // Validation Type
    status: 'The field is required' // The default error message
  }
]
```

## Custom Error Messages
For each validation, you can pass a custom error message as a param in the function.
```javascript
validate(
  [
    {'email@email': [ email('PUT AN VALID EMAIL PLS') ]}, // to single validations, just pass an string as a parameter
    {5 : [ minmax(4,10,['Minimum value not reached', 'Maximum value reached']) } // to minmax validation, you have to pass the messages on an array
  ]
 )
```

## Validations
Name     |    Sintax  | Description
-------- | -----------|----------------------------------------------------------
Required | required( ' Custom Message ' ) | Validate the length of the value
Email    | email( ' Custom Message ' )    | validate a string by an email valid Regex
Minmax   | minmax( minVal ,maxVal ,[ 'Min Custom Message', 'max Custom Message' ] ) | Validate a value by the min and the max value passed  
Cpf      | cpf( 'Custom Message' )| Validate a document by a valid Regex
Cnpj     | cnpj('Custom Message' )| Validate a document by a valid Regex

## License
[MIT](https://choosealicense.com/licenses/mit/)