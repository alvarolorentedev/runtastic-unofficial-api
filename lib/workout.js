'use strict'

var requestLib = require('request'),
    moment = require('moment'),
    common = require('./common'),
    request = requestLib.defaults({jar: common.jar}),
    apiUrl = common.urls.api,
    paths = common.urls.paths,
    regex = common.regex.insert

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

function workoutGet(user, session, params) {
    return new Promise((resolve, reject) =>{ 
        var qs = getQueryString(params)
        var headers = getHeader(params)
        var url = paths.activity.base + user.id + paths.activity.connector + session.id
        request.get({ url: url, qs: qs , headers: headers }, (err, response, body) => {
            if(err){
                reject(err)
                return
            }
            resolve(JSON.parse(body))
        })
    })
}

function setQueryString(params){
    var duration = params.duration ? moment.duration(params.duration) : moment.duration(0)
    var pause = params.pause ? moment.duration(params.pause) : moment.duration(0)
    var datetime =  params.date ? moment(params.date) : moment()
    return {
        authenticity_token: params.authToken,
        'run_session[start_time_day]': datetime.format('YYYY-MM-DD'),
        "run_session[sport_type_id]": params.type || 1,
        "run_session[distance]": params.distance || 0,
        "run_session[distance_from_user]": params.distance || 0,
        "run_session[elevation_gain]": params.elevation_gain || 0,
        "run_session[elevation_loss]": params.elevation_loss || 0,
        "run_session[elevation_gain_from_user]": params.elevation_gain || 0,
        "run_session[elevation_loss_from_user]": params.elevation_loss || 0,
        "run_session[start_time_hour]": datetime.format('hh'),
        "run_session[start_time_minutes]" : datetime.format('mm'),
        "run_session[start_time_seconds]": datetime.format('ss'),
        "run_session[duration]": duration.asMilliseconds(),
        "run_session[duration_hours]": duration.hours(),
        "run_session[duration_minutes]": duration.minutes(),
        "run_session[duration_seconds]":duration.seconds(),
        "run_session[pause_duration]": pause.asMilliseconds(),
        "run_session[pause_duration_hours]": pause.hours(),
        "run_session[pause_duration_minutes]": pause.minutes(),
        "run_session[pause_duration_seconds]": pause.seconds(),
        "run_session[calories]": params.calories || 0,
        "run_session[calories_from_user]": params.calories || 0,
        "run_session[avg_cadence]": params.avg_cadence || undefined,
        "run_session[max_cadence]":params.max_cadence || undefined,
        "run_session[avg_cadence_from_user]": params.avg_cadence || undefined,
        "run_session[max_cadence_from_user]": params.max_cadence || undefined,
        "run_session[total_crank_revolutions]": params.total_crank_revolutions || undefined,
        "run_session[total_crank_revolutions_from_user]": params.total_crank_revolutions || undefined,
        "run_session[wheel_circumference]": params.wheel_circumference || undefined,
        "run_session[wheel_circumference_from_user]": params.wheel_circumference || undefined,
        "run_session[pulse_avg]": params.pulse_avg || undefined,
        "run_session[pulse_max]": params.pulse_max || undefined,
        "run_session[pulse_avg_from_user]":  params.pulse_avg || undefined,
        "run_session[pulse_max_from_user]": params.pulse_max || undefined,
        "run_session[temperature]": params.temperature || 0,
        "run_session[temperature_from_user]": params.temperature || 0,
        "run_session[notes]": params.notes || '',
        "run_session[subjective_feeling_id]": params.feeling || 5,
        "run_session[weather_condition_id]": params.weather || 1,
        "run_session[surface_id]" : params.surface || 1

    }
}

function workoutSet(user, session, params) {
    return new Promise((resolve, reject) =>{ 
        var qs = setQueryString(params)
        var url = apiUrl + user.run_sessions_path + (session ? session.uid : '')
        request.post({ url: url, qs: qs }, (err, response, body) => {
            if(err){
                reject(err)
                return
            }
            console.log(body)
            resolve({
                workoutId: regex.session_uid.exec(body)[1]
            })
        })
    })
}

module.exports = {
    get: workoutGet,
    set: workoutSet
}