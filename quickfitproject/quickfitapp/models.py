# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

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
    author_id = models.ForeignKey(User)
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)

    movement_type = models.CharField(
        choices = MOVEMENT_TYPES,
        max_length=1,
        default='o',
    )

    demo_url = models.CharField(max_length=2000)

    timestamp_last_updated = models.DateField(auto_now=True, auto_now_add=False)
    timestamp_created = models.DateField(auto_now=False, auto_now_add=True)

    #tells Django which field to use as display on the Django admin (analgous to console but on the browser)
    def __str__(self):
        return self.description
