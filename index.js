'use strict'

const authenticate = require('./lib/authentication')
const workouts = require('./lib/workouts')
const workout = require('./lib/workout')

module.exports= {
    authenticate: authenticate,
    workouts: workouts,
    workout: workout
}