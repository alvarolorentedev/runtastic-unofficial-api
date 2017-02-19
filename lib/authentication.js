'use strict'

var requestLib = require('request'),
    common = require('./common'),
    request = requestLib.defaults({jar: common.jar}),
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

function authenticate(params){
    return new Promise((resolve, reject) =>{
        var url = apiUrl + paths.auth
        var qs = getQueryString(params)
        request.post({ url:url, qs:qs }, (err, response, body) => {
            var cookie_string = common.jar.getCookieString(url)
            var cookies = common.jar.getCookies(url)
            var response = JSON.parse(body)
            if(response.error)
                reject(response.error)
            else
                resolve({
                    authToken: regex.authenticityToken.exec(response.update)[1],
                    user: response.current_user,
                    cookieString: common.jar.getCookieString(url),
                    cookies: common.jar.getCookies(url)
                })
        })
    })
}

module.exports = authenticate