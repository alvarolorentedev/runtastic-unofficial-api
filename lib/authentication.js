'use strict'

var request = require('request'),
    common = require('./common'),
    apiUrl = common.urls.api,
    paths = common.urls.paths,
    regex = common.regex.auth,
    handleError = common.handleError

function getQueryString(params){
    return {
        'user[email]': params.email,
        'user[password]': params.password,
        grant_type: 'password'
    }
}


//input name=\\"authenticity_token\\" type=\\"hidden\\" value=\\"kYH0gnRWygR4IVksJNUpXCaaTc4jdp1lpvk2MKLmIaM=\\"
function getAutenticityToken(url, qs){
    return new Promise((resolve, reject) =>{
        request.post({ url:url, qs:qs }, (err, response, body) => {
            if(regex.authenticityToken.test(body))
                resolve(regex.authenticityToken.exec(body)[1])
             else  
                reject('no autenticity token pressent')
        })
    })
}


function authenticate(params){
    return new Promise((resolve, reject) =>{
        var url = apiUrl + paths.auth
        var qs = getQueryString(params)
        request.post({ url:url, qs:qs }, (err, response, body) => {
            var response = JSON.parse(body)
            if(response.error)
                reject(response.error)
            else
                resolve({
                    authToken: regex.authenticityToken.exec(response.update)[1],
                    user: response.current_user
                })
        })
    })
}

module.exports = authenticate