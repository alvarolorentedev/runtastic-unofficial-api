
var runtastic = require('../index')

var params = {
    email: '',
    password: ''
}

runtastic.authenticate(params)
    .then((result) => {
        console.log(result)
        return result
    })