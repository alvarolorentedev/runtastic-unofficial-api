 var  requestLib = require('request'),
        jar = requestLib.jar()

 const urls = {
        api: 'https://www.runtastic.com',
        paths: {
            auth: '/en/d/users/sign_in.json',
            activitiesList: '/api/run_sessions/json'
        }
 }

 const regex = {
     workouts: {
        csrfToken : /meta name='csrf-token' content='(.*?)'/,
        sessions : /var index_data = (.*?);/,
        session_uid : /sport-sessions\/(.*?)$/
     },
     auth: {
         authenticityToken : /input name="authenticity_token" type="hidden" value="(.*?)"/,
         currentUser: /"current_user":({.*?})}/
     }
 }

 module.exports = { urls: urls, regex: regex, jar }