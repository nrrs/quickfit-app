# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

#2 options for making JSONField...
# from django.contrib.postgres.fields import JSONField
from jsonfield import JSONField

# MOVEMENT_TYPES = (
#     ('lower body', "Lower Body"),
#     ('upper body', "Upper Body"),
#     ('full body', "Full Body"),
#     ('core', "Core"),
#     ('conditioning', "Conditioning"),
#     ('cardio', "Cardio")
# )

DIFFICULTY_TYPES = (
    ('novice', "Novice"),
    ('intermediate', "Intermediate"),
    ('advanced', "Advanced")
)


class Movement(models.Model):
    # USE FOR AUTH
    # author = models.ForeignKey('auth.user', related_name='movements',
    #     on_delete=models.CASCADE)

    # author = models.ForeignKey(User, related_name='movements',
    #     on_delete=models.CASCADE)

    #super-flexible foreign key
    # author = models.ForeignKey(User, blank=True, null=True)

    #super-super-flexible foreign key
    author = models.IntegerField(blank=True, null=True)

    movement_name = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)

    # movement_type = models.CharField(
    #     choices = MOVEMENT_TYPES,
    #     max_length=1,
    #     default='o',
    # )

    movement_type = models.CharField(max_length=100, blank=True)

    difficulty = models.CharField(
        choices = DIFFICULTY_TYPES,
        max_length=100,
        default='n',
    )

    demo_url = models.CharField(max_length=2000, blank=True)

    timestamp_last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    timestamp_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    # tells Django which field to use as display on the Django admin or anytime you want string representation of the entire object
    def __str__(self):
        return self.movement_name

class Workout(models.Model):

    athlete = models.ForeignKey('auth.user', related_name='workouts',
        on_delete=models.CASCADE)

    timestamp_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    # for initial releases, each day's workout (a combination of movements with timer data will be held as a JSON object snapshot)
    workout_data = JSONField()

    # on admin screen, workouts are keyed by the string of their id (must be a unique string)
    def __str__(self):
        string_id = str(self.id)
        return string_id

# for subsequent releases (not configured for this release)...
# extension of built-in auth_user model (one-to-one link) to store additional information about each user
# Django will fire an additional query when this related information is accessed

# while auth is under development, I'm using Profile as stand-in for User
class Profile(models.Model):
    silly_username = models.CharField(max_length=100, blank=False)
    # bio_data = JSONField()

    # on admin screen, profiles are keyed by the silly_username
    def __str__(self):
        return self.silly_username


# Note: we could use a proxy to extend the auth_user model behavior (add methods), but it cannot be used to change requirements (e.g. null=False to null=True)

# HOW TO GENERATE AN OBJECT IN THE PYTHON SHELL (ALTERNATIVE TO USING ADMIN GUI)
# python manage.py shell
# >>> from api.models import Note
# >>> note = Note(title="First Note", body="This is certainly noteworthy")
# >>> note.save()
# >>> Note.objects.all()
# <QuerySet [<Note: First Note This is certainly noteworthy>]>
# >>> exit()
