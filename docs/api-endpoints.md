## QUICKFIT - BACKEND ROUTES
- Don’t forget closing slash on all routes (Django default requirement)
- Responses are generally in the form of arrays of objects.
- Check schema for updated constraints on each field/column


### Movements (pure, non-nested routes)

##### Return all movement objects
- /api/movements/
- method: GET

##### Add a new movement
- /api/movements/
- method: POST
- contentType: 'application/json'
- data: { “author_id: 2, “title”: “zzzzz”, "description": “zzzzzzzzzzzzzzzz”, "movement_type": “b”, "demo_url": “zzzz” }

##### Display one movement
- /api/movements/4/
- method: POST

##### Edit one movement
*restricted to users who are the authors of the movement being edited*
- /api/movements/4/
- method: PATCH
- contentType: 'application/json'
- data: {"demo_url": “vvvv”}



##### Delete one movement
*restricted to users who are the authors of the movement being deleted*
- /api/movements/4/
- method: DELETE





### Workouts (pure, non-nested routes)

##### Return all workout objects
- /api/workouts/
- method: GET

##### Add a new workout
- /api/workouts/
- method: POST
- contentType: 'application/json'
- data:   { “athlete_id": 2, "workout_data": “{u'anything_field': 21, u’whatever_field': u’yyy'}" }

*Note:  The workout_data is in the form of a json string with python native object formatting. I suggest we start using fields instead of json objects.*

##### Display one workout
- /api/workouts/4/
- method: POST

##### Edit one workout
*restricted to users who are the athletes of the workout being edited*
- /api/workouts/4/
- method: PATCH
- contentType: 'application/json'
- data: { "workout_data": “{u'anything_field': 22, u’whatever_field': u’zzz’}" }

*Note:  The workout_data is in the form of a json string with python native object formatting. I suggest we start using fields instead of json objects.*

##### Delete one workout
*restricted to users who are the athletes of the workout being deleted*
- /api/workouts/4/
- method: DELETE






### Nested routes

##### display a single user’s movements
- /api/users/2/movements
- method: GET

*Note:  Currently, if no movements are found for that user, empty array is returned with status code 200*


##### display a single user’s workouts
- /api/users/2/workouts
- method: GET

*Note:  Currently, if no movements are found for that user, empty array is returned with status code 200*
