# Schema

```
## movements
column_name 		| data_type                   	| details
------------------------|-------------------------------|-----------------------
id          		| integer   			| not null, primary key
author_id  	    	| integer      			| not null, foreign key
title     		| character varying(100)	| not null
description   	 	| text   			| 
movement_type   	| character varying(1)   	| not null, select one from preset options
demo_url  		| character varying(2000)  	|
timestamp_last_updated  | date  			| not null
timestamp_created	| date	 			| not null


## workouts
column_name 		| data_type                   	| details
------------------------|-------------------------------|-----------------------
id          		| integer   			| not null, primary key
athlete_id  	    	| integer      			| not null, foreign key
workout_data		| json 				| not null
timestamp_created	| date	 			| not null 


## auth_user (included with django)
column_name     	| data_type 			| details
------------------------|-------------------------------|-----------------------
id              	| integer   			| not null, primary key
password        	| character varying(128)	| not null
last_login		| timestamp with time zone    	| 
is_superuser 		| boolean      			| not null
username        	| character varying(150)        | not null
first_name 		| character varying(30)         | not null
last_name   		| character varying(30)         | not null
email      		| character varying(254)        | not null
is_staff      		| boolean  			| not null
is_active       	| boolean  			| not null
date_joined     	| timestamp with time zone  	| not null

```