# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

#2 options for making JSONField...
# from django.contrib.postgres.fields import JSONField
from jsonfield import JSONField

MOVEMENT_TYPES = (
    ('b', "balance"),
    ('c', "cardio"),
    ('d', "dance"),
    ('f', "flexibility"),
    ('o', "other"),
    ('s', "strength"),
    ('l', "stretch"),
    ('w', "weights"),
    ('y', "yoga")
)


class Movement(models.Model):

    author = models.ForeignKey(User) #displays as author_id in table, previously author_id_id
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)

    movement_type = models.CharField(
        choices = MOVEMENT_TYPES,
        max_length=1,
        default='o',
    )

    demo_url = models.CharField(max_length=2000, blank=True)

    timestamp_last_updated = models.DateField(auto_now=True, auto_now_add=False)
    timestamp_created = models.DateField(auto_now=False, auto_now_add=True)

    #tells Django which field to use as display on the Django admin
    def __str__(self):
        return self.description



class Workout(models.Model):

    athlete = models.ForeignKey(User)   #displays as athlete_id in table
    timestamp_created = models.DateField(auto_now=False, auto_now_add=True)

    #for initial releases, each day's workout (a combination of movements with timer data will be held as a JSON object snapshot)
    workout_data = JSONField()

    #on admin screen, workouts are keyed by the string of their id (must be a unique string)
    def __str__(self):
        string_id = str(self.id)
        return string_id


#for subsequent releases (not configured for this release)...
#extension of built-in auth_user model (one-to-one link) to store additional information about each user
#Django will fire an additional query when this related information is accessed

# class Profile(models.Model):
    # bio_data = JSONField()


#Note: we could use a proxy to extend the auth_user model behavior (add methods), but it cannot be used to change requirements (e.g. null=False to null=True)
