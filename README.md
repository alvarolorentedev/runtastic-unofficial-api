# ![logomakr_4dzqyb](https://cloud.githubusercontent.com/assets/3071208/23109294/74bb4208-f6dd-11e6-9f09-24e7ac0d9d28.png)

This is a promise based unofficial runtastic api.

## installation 

```
npm install runtastic-unofficial-api
```

## Use

the API provides the next functionalities

### Authentication

Get login information and tokens. The next snippet describes an example of the call:

```js
var authenticate = require('runtastic-unofficial-api').authenticate

authenticate({email: <email>, password: <password>})
    .then((result) => console.log(result))
    .catch((result) => console.log(result))

```

the complete set of parameters get determined by:
```
{
    'user[email]': params.email,
    'user[password]': params.password,
    grant_type: 'password'
}
```

The result of the promise will be if failed the error that caused it and if success an result object similar to this:

```
{
    authToken: token,
    user: user,
    cookieString: cookieString,
    cookies: cookie
}
```

### Workouts

Get a list of your workouts. The next snippet describes an example of the call:

```js
var workouts = require('runtastic-unofficial-api').workouts

var token = 'authToken'

workouts({authToken: token, user: user})
    .then((result) => { console.log(result) })
    .catch((result) => console.log(result))

```

the complete set of parameters get determined by:
```
{
    user_id: params.user.id,
    authenticity_token: params.authToken,
    items: ids.join(',')
}
```

The result of the promise will be if failed the error that caused it and if success an result object similar to this:

```
[<sessions>]
```

### Workout (get)

Get a specific workout. The next snippet describes an example of the call:

```js
var workoutGet = require('runtastic-unofficial-api').workout.get

var token = 'authToken'
var user = {}
var sessions = []

workoutGet(user, sessions[0],{authToken : token, user : user})
    .then((result) => { console.log(result) })
    .catch((result) => console.log(result))

```

the complete set of parameters are determined by:
```
//const defaultIncludes = ['city','country','creation_application','sport_type','trace_collection','zones','sharing_token','neighbourhood']
//var includes = params.includes || defaultIncludes

{
    user_id: params.user.id,
    authenticity_token: params.authToken,
    includes: includes.join(',')
}
```

The result of the promise will be if failed the error that caused it and if success an result object that is quite complex to describe just try it ;) .

### Workout (set)

Set (or create) a specific workout. The next snippet describes an example of the call:

```js
var workoutSet = require('runtastic-unofficial-api').workout.set

var token = 'authToken'
var user = {}
var sessions = []

workoutSet(user, sessions[0] ,{authToken : token, user : user})
    .then((result) => { console.log(result) })
    .catch((result) => console.log(result))

```

the complete set of parameters are determined by:
```
//var duration = params.duration ? moment.duration(params.duration) : moment.duration(0)
//var pause = params.pause ? moment.duration(params.pause) : moment.duration(0)
//var datetime =  params.date ? moment(params.date) : moment()
{
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
```

The result of the promise will be if failed the error that caused it and if success an result object like this:

```
{ workoutId: <workoutId> }
```

### Logo 

Sports graphic by <a href="http://www.flaticon.com/authors/freepik">Freepik</a> from <a href="http://www.flaticon.com/">Flaticon</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>. Made with <a href="http://logomakr.com" title="Logo Maker">Logo Maker</a>

## Disclaimer, legalese and everything else.

This is not affiliated or endorset by runtastic, or any other party. This software available on the site is provided "as is" and any expressed or implied warranties, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose are disclaimed. In no event shall the user under the pseudonym Kanekotic, or any of their contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of this software, even if advised of the possibility of such damage.
