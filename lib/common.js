 const urls = {
        api: 'https://www.runtastic.com/',
        paths: {
            auth: 'en/d/users/sign_in.json'
        }
 }

//input name=\\"authenticity_token\\" type=\\"hidden\\" value=\\"kYH0gnRWygR4IVksJNUpXCaaTc4jdp1lpvk2MKLmIaM=\\"
 const regex = {
     auth: {
         authenticityToken : /input name="authenticity_token" type="hidden" value="(.*?)"/,
         currentUser: /"current_user":({.*?})}/
     }
 }

//   var paths = {
//     'heartrate': 'https://www.runtastic.com/en/users/%d/health/heart-rates.json?period=lifetime&ago=0',
//     'login': 'https://www.runtastic.com/en/d/users/sign_in.json',
//     'logout': 'https://www.runtastic.com/en/d/users/sign_out',
//     'sessionDetail': 'https://hubs.runtastic.com/samples/v2/users/%d/samples/%s?include=trace_collection%2Cneighbourhood%2Ccity%2Ccountry%2Csport_type%2Ccreation_application%2Czones',
//     'sessions': 'https://www.runtastic.com/en/users/%s/sport-sessions',
//     'sessionsApi': 'https://www.runtastic.com/api/run_sessions/json',
//     'weight': 'https://www.runtastic.com/en/users/%d/health/weight_histories?period=lifetime&ago=0'
//   };

 module.exports = { urls: urls, regex: regex }