'use strict'

var requestLib = require('request'),
    common = require('./common'),
    request = requestLib.defaults({jar: common.jar}),
    apiUrl = common.urls.api,
    paths = common.urls.paths,
    regex = common.regex.workouts

function getQueryString(params, ids){
    return {
        user_id: params.user.id,
        authenticity_token: params.authToken,
        items: ids.join(',')
    }
}

function workoutsIds(user){
    return new Promise((resolve, reject) =>{ 
        var url = apiUrl + user.run_sessions_path
        request.get({ url: url }, (err, response, body) => {
            if(err){
                reject(err)
                return
            }
            var result = []
            var all = JSON.parse(regex.sessions.exec(body)[1])
            for(var session of all)
                result.push(session[0])
            resolve(result)
        })
    })
}

function workoutsData(params, ids){
    return new Promise((resolve, reject) =>{ 
        var qs = getQueryString(params,ids)
        var url = apiUrl + paths.activitiesList
        request.post({ url: url, qs: qs }, (err, response, body) => {
            if(err)
                reject(err)
            else
                resolve(JSON.parse(body))
        })
    })
}

function workouts(params) {
    return Promise.resolve()
                    .then( () => { return workoutsIds(params.user) })
                    .then( (ids) => { return workoutsData(params, ids) })
    
}

module.exports = workouts