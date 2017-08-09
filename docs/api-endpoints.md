## QUICKFIT - BACKEND ROUTES
- Don’t forget closing slash on all routes (Django default requirement)
- When using Postman to make requests, quickfit returns responses in the form of arrays of objects.
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
- /api/movements/4/
- method: PATCH
- contentType: 'application/json'
- data: {"demo_url": “vvvv”}

##### Delete one movement
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
*Note:  The workout_data is in the form of a json string with python native object formatting*

##### Display one workout
- /api/workouts/4/
- method: POST

##### Edit one workout
- /api/workouts/4/
- method: PATCH
- contentType: 'application/json'
- data: { "workout_data": “{u'anything_field': 22, u’whatever_field': u’zzz’}" }
*Note:  The workout_data is in the form of a json string with python native object formatting*

##### Delete one workout
- /api/workouts/4/
- method: DELETE






### Nested routes

##### display a single user’s movements
- TBD


##### display a single user’s workouts
- TBD


##### delete a movement only if it belongs to a single user
- TBD


##### delete a workout only if it belongs to a single user
- TBD
