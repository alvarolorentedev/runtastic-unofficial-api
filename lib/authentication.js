'use strict'

var requestLib = require('request'),
    jar = requestLib.jar(),
    request = requestLib.defaults({jar: jar}),
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

function authenticate(params){
    return new Promise((resolve, reject) =>{
        var url = apiUrl + paths.auth
        var qs = getQueryString(params)
        request.post({ url:url, qs:qs }, (err, response, body) => {
            var cookie_string = jar.getCookieString(url); // "key1=value1; key2=value2; ..."
            var cookies = jar.getCookies(url);
            var response = JSON.parse(body)
            if(response.error)
                reject(response.error)
            else
                resolve({
                    authenticityToken: regex.authenticityToken.exec(response.update)[1],
                    user: response.current_user,
                    cookieString: jar.getCookieString(url),
                    cookies: jar.getCookies(url)
                })
        })
    })
}

module.exports = authenticate