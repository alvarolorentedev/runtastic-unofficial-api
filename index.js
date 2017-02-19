'use strict'

const authenticate = require('./lib/authentication')
const workouts = require('./lib/workouts')

module.exports= {
    authenticate: authenticate,
    workouts: workouts

}