var CPF = require("cpf_cnpj").CPF;
var CNPJ = require("cpf_cnpj").CNPJ;
var formValid = [] // set validation variable

function validate(data) {
    return new Promise((resolve,reject) => { // return promise
        formValid = [] // Reset validation variable

        data.map((item,index) => { // map on form array and catch the item and the index
            var value = Object.keys(item)[0]  //save the form Value
            item[value].map(validation => { // map on validations inside the form values
                if (typeof validation === 'object') {
                    return validation.function(value,index,validation)
                }
                else {
                    return validation(value,index,validation)
                }
            })
        })
        if (formValid.length > 0) { // if formValid Array has a positive length
            reject(formValid) // return the array with the errors on promise
            return false
        } else {
            resolve() // resolve
            return true
        }
    })
}


function cpf(obs) {
    var cpf = {function: validateCpf,obs}
    return cpf
}
function validateCpf(value,index,validation) {
    if (value) {
        let statusMsg = 'Invalid Document'
        if (validation.obs) {
            statusMsg = validation.obs
        }
        let validationType = validation.function

        if (!CPF.isValid(value)) {
            formValid.push({
                value,
                index,
                validation: validationType,
                status: statusMsg
            })
        }
    } else {
        return true
    }
}

function cnpj(obs) {
    var cnpj = {function: validateCnpj,obs}
    return cnpj
}

function validateCnpj(value,index,validation) {
    if (value) {
        let statusMsg = 'Invalid Document'
        if (validation.obs) {
            statusMsg = validation.obs
        }
        let validationType = validation.function

        if (!CNPJ.isValid(value)) {
            formValid.push({
                value,
                index,
                validation: validationType,
                status: statusMsg
            })
        }
    }
}


function email(obs) {
    var email = {function: validateEmail,obs}
    return email
}
function validateEmail(value,index,validation) {
    if (value) {
        let reg=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        let statusMsg = 'Invalid email'
        if (validation.obs) {
            statusMsg = validation.obs
        }
        let validationType = validation.function

        if (!reg.test(value)) {
            formValid.push({
                value,
                index,
                validation: validationType,
                status: statusMsg
            })
        }
    }
}

function required(obs) {
    var required = {function: validateRequired,obs}
    return required
}
function validateRequired(value,index,validation) {
    let statusMsg = 'The field is required'
    if (validation.obs) {
        statusMsg = validation.obs
    }
    let validationType = validation.function
    if (value.length <= 0) {
        formValid.push({
            value,
            index,
            validation: validationType,
            status: statusMsg
        })
    }
}

function minmax(min,max,obs) { // function minmax return the values of min and max to an object with the name of the function called
    var minmax = {function: range,min,max,obs}
    return minmax
}
function range(value,index,validation) {
    let obs = [
        'Minimum value not reached',
        'Maximum value reached'
    ]
    let validationType = validation.function
    if (validation.obs && validation.obs.length != 0) {
        obs = validation.obs
    }

    if (value) {
        if (value < validation.min) {
            formValid.push({
                value,
                index,
                validation:validationType,
                status: obs[0]
            })
        }
        if (value > validation.max) {
            formValid.push({
                value,
                index,
                validation:validationType,
                status: obs[1]
            })
        }
    }
}



module.exports = { validate, minmax, required, cpf, cnpj, email}