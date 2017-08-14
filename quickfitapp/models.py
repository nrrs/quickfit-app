# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from jsonfield import JSONField


DIFFICULTY_TYPES = (
    ('novice', "Novice"),
    ('intermediate', "Intermediate"),
    ('advanced', "Advanced")
)

class Movement(models.Model):

    author = models.ForeignKey(User, related_name='movements',
        on_delete=models.CASCADE)

    movement_name = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)
    movement_type = models.CharField(max_length=100, blank=True)

    difficulty = models.CharField(
        choices = DIFFICULTY_TYPES,
        max_length=100,
        default='n',
    )

    demo_url = models.CharField(max_length=2000, blank=True)
    timestamp_last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    timestamp_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    # declares a field to display on the Django admin or anytime you want string representation of the entire object; must be unique
    def __str__(self):
        return self.movement_name


# -------------------WORKOUT MODEL-----------------------------
class Workout(models.Model):

    athlete = models.ForeignKey(User, related_name='workouts',
        on_delete=models.CASCADE)

    # for initial releases, each day's workout (a combination of movements with timer data will be held as a JSON object snapshot)
    workout_data = JSONField()

    timestamp_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    # declares a field to display on the Django admin or anytime you want string representation of the entire object; must be unique
    def __str__(self):
        string_id = str(self.id)
        return string_id
