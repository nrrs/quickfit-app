## QUICKFIT - BACKEND ROUTES
- Don’t forget closing slash on all routes (Django default requirement)
- Responses are generally in the form of arrays of objects
- contentType: 'applciation/json' may be interchangeable with adding '?format=json' to the query string



### Movements (pure, non-nested routes)

##### Return all movement objects
- /api/movements/
- method: GET

##### Add a new movement (requires login)
- /api/movements/
- method: POST
- contentType: 'application/json'
- data: { “author_id: 2, “title”: “zzzzz”, "description": “zzzzzzzzzzzzzzzz”, "movement_type": “b”, "difficulty": "i", "demo_url": “zzzz” }

##### Display one movement (requires login)
- /api/movements/4/
- method: POST

##### Edit one movement (requires login)
*restricted to users who are the authors of the movement being edited*
- /api/movements/4/
- method: PATCH
- contentType: 'application/json'
- data: {"demo_url": “vvvv”}

##### Delete one movement (requires login)
*restricted to users who are the authors of the movement being deleted*
- /api/movements/4/
- method: DELETE





### Workouts (pure, non-nested routes)

##### Return all workout objects
- /api/workouts/
- method: GET

##### Add a new workout (requires login)
- /api/workouts/
- method: POST
- contentType: 'application/json'
- data:   { “athlete_id": 2, "workout_data": “{u'anything_field': 21, u’whatever_field': u’yyy'}" }

*Note on workout data:  When sending data from admin form, send a regular json object and it will store it in native python.  Previously, in postman I've had to construct the json string with python native object formatting. I suggest we start using fields instead of json objects.*

##### Display one workout (requires login)
- /api/workouts/3/
- method: POST

##### Edit one workout (requires login)
*restricted to users who are the athletes of the workout being edited*
- /api/workouts/3/
- method: PATCH
- contentType: 'application/json'
- data: { "workout_data": “{u'anything_field': 22, u’whatever_field': u’zzz’}" }

*Note on workout data:  When sending data from admin form, send a regular json object and it will store it in native python.  Previously, in postman I've had to construct the json string with python native object formatting. I suggest we start using fields instead of json objects.*


##### Delete one workout (requires login)
*restricted to users who are the athletes of the workout being deleted*
- /api/workouts/4/?format=json
- method: DELETE



### Users (pure non-nested routes)

##### Return all user objects (requires login)
- /api/users/
- method: GET




### Nested routes
- requires user to be logged in 
- returns error if invalid user
- returns empty array if user does not have any associated movements/workouts

##### display a single user’s movements
- /api/users/2/movements/
- method: GET

##### display a single user’s workouts
- /api/users/2/workouts/
- method: GET

