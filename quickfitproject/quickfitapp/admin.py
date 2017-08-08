# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin

from .models import Movement
admin.site.register(Movement)

from .models import Workout
admin.site.register(Workout)
