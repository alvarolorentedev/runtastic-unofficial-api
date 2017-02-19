var runtastic = require('../index')

var params = {
    email: '',
    password: ''
}

var token
var user

runtastic.authenticate(params)
    .then((result) => {
        token = result.authToken
        user = result.user
        console.log(result)
        return result
    })
    .then((result)=>{ return runtastic.workouts({authToken : token, user : user})})
    .then((result) => {
        console.log(result)
        return result
    })