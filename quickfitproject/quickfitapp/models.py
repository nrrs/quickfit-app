# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

EXERCISE_TYPES = (
    ('w', "Weight Lifting"),
    ('d', "dance"),
    ('c', "cardio"),
    ('o', "Others"),
)


class Exercise(models.Model):
    # more columns
    description = models.TextField()
    author = models.ForeignKey(User)
    exercise_type = models.CharField(
        choices = EXERCISE_TYPES,
        max_length=1,
        default='o',
    )

    timestamp_last_updated = models.DateField(auto_now=True, auto_now_add=False)
    timestamp_created = models.DateField(auto_now=False, auto_now_add=True)

    #tells Django which field to use as display on the Django admin (analgous to console but on the browser)
    def __str__(self):
        return self.description
