# Schema
- Django will automatically add the id and timestamps listed below


## movements
column_name             | data_type                     | details
------------------------|-------------------------------|-----------------------
id                      | integer                       | not null, primary key
author_id               | integer                       | not null, foreign key
movement_name           | string (max_length = 100)     | not null
description             | text                          |
movement_type           | string (max_length = 100)     |
difficulty              | character varying(1)          | not null, select one from preset options
demo_url                | string (max_length = 100)     |
timestamp_last_updated  | datetime                      | not null
timestamp_created       | datetime                      | not null

*`difficulty` is a field with three possible entries: 'novice', 'intermediate', 'advanced'; default value is 'novice'*


## workouts
column_name         | data_type             | details
--------------------|-----------------------|-----------------------
id                  | integer               | not null, primary key
athlete_id          | integer               | not null, foreign key
workout_data        | json                  | not null
timestamp_created   | datetime              | not null


## auth_user (included with django)
column_name         | data_type                     | details
--------------------|-------------------------------|-----------------------
id                  | integer                       | not null, primary key
password            | character varying(128)        | not null
last_login          | timestamp with time zone      |
is_superuser        | boolean                       | not null
username            | character varying(150)        | not null
first_name          | character varying(30)         | not null
last_name           | character varying(30)         | not null
email               | character varying(254)        | not null
is_staff            | boolean                       | not null
is_active           | boolean                       | not null
date_joined         | timestamp with time zone      | not null
