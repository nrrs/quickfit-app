# QUICKFIT - BACKEND ROUTES
- Don’t forget closing slash on all routes (Django default requirement)
- These endpoints return arrays of objects
- contentType: 'applciation/json' may be interchangeable with adding '?format=json' to the query string
- For JSON data, keys must be strings and all strings must use double-quotes. If your first attempt doesn't work, remove or add spaces between (e.g. "movement_name":"Exercise1" vs "movement_name": "Exercise1")
- Seed data is located on the initdata.json file.  Check there or the admin 'backdoor' to make sure you are using valid foreign keys.


## Heroku Prefix and Admin Backdoor
* URL prefix (append api endpoints to this)
 - https://afternoon-bastion-37946.herokuapp.com

* There is a 'backdoor' to the production database so you can view/add/edit the data (we can always re-seed so feel free to play):
 - https://afternoon-bastion-37946.herokuapp.com/admin/
 - username: admin
 - password: 1234quickfit


## Movements

##### View all movements
- /api/movements/
- method: GET

##### Add a new movement (requires login)
- /api/movements/
- method: POST
- contentType: 'application/json'
- data: { “author_id":2, “movement_name”:“Exercise1”, "description":“details of exercise1”, "movement_type":“full body”, "difficulty":"novice", "demo_url":"www.example.com" }

##### Display one movement (requires login)
- /api/movements/4/
- method: POST

##### Edit one movement (requires login)
*requests are restricted to users who are the authors of the movement being edited*
- /api/movements/4/
- method: PATCH
- contentType: 'application/json'
- data: { "demo_url":“www.example.com” }

##### Delete one movement (requires login)
*requests are restricted to users who are the authors of the movement being deleted*
- /api/movements/4/
- method: DELETE





## Workouts

##### View all workouts
  - /api/workouts/
  - method: GET

##### Add a new workout (requires login)
  - /api/workouts/
  - method: POST
  - contentType: 'application/json'
  - data: { "day3":"placeholder for data" }

* If the above does not work, try python native formatting...
  - data:   { “athlete_id":2, "workout_data": “{u'anything_field':21, u’whatever_field':u’yyy'}" }

*Note on workout data:  You can send any content, as long it is a JSON object. If a JSON object is not working, try the second option - python native formatting. Postman required this, but Postman is quirky.*

##### Display one workout (requires login)
  - /api/workouts/3/
  - method: POST

##### Edit one workout (requires login)
*restricted to users who are the athletes of the workout being edited*
  - /api/workouts/3/
  - method: PATCH
  - contentType: 'application/json'
  - data: { "day3":"placeholder for data" }

* If the above does not work, try python native formatting...
  - data: { "workout_data": “{u'anything_field': 22, u’whatever_field': u’zzz’}" }

*Note on workout data:  You can send any content, as long it is a JSON object. If a JSON object is not working, try the second option - python native formatting. Postman required this, but Postman is quirky.*


##### Delete one workout (requires login)
*restricted to users who are the athletes of the workout being deleted*
  - /api/workouts/4/
  - method: DELETE



## Users

##### View all users (requires login)
- /api/users/
- method: GET


### Profiles
- This table is not controlled by auth in case you need a way to store user-related data when auth is turned off

##### View all profiles (requires login)
- /api/profiles/
- method: GET




## Nested routes
- returns error if invalid user
- returns empty array if user does not have any associated movements/workouts

##### display a single user’s movements (requires login)
- /api/users/2/movements/
- method: GET

##### display a single user’s workouts (requires login)
- /api/users/2/workouts/
- method: GET
