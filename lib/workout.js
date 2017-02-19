'use strict'

var requestLib = require('request'),
    common = require('./common'),
    request = requestLib.defaults({jar: common.jar}),
    apiUrl = common.urls.api,
    paths = common.urls.paths

const defaultIncludes = ['city','country','creation_application','sport_type','trace_collection','zones','sharing_token','neighbourhood']

function getQueryString(params){
    var includes = params.includes || defaultIncludes
    return {
        user_id: params.user.id,
        authenticity_token: params.authToken,
        includes: includes.join(',')
    }
}

function getHeader(params){
    return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
            'Referer': 'https://www.runtastic.com',
            'X-App-Version': '1.0',
            'X-App-Key': 'com.runtastic.ember',
            'X-CSRF-Token': params.authToken,
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json, text/javascript,	application/vnd.api+json, */*; q=0.01',
            'DNT': 1
        }
}

function workout(user, session, params) {
    return new Promise((resolve, reject) =>{ 
        var qs = getQueryString(params)
        var headers = getHeader(params)
        var url = paths.activity.base + user.id + paths.activity.connector + session.uid
        request.get({ url: url, qs: qs , headers: headers }, (err, response, body) => {
            if(err){
                reject(err)
                return
            }
            resolve(JSON.parse(body))
        })
    })
}

module.exports = workout