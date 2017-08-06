# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from .models import Exercise

def index(request):
    all_exercises = Exercise.objects.all()

    # exercise_list = serializers.serialize('json', all_exercises)

    exercise_dict = {}

    for exercise in all_exercises:
        exercise_dict = {'id' : exercise.id, 'name' : exercise.name, 'description' : exercise.description }

    return JsonResponse({'exercises': exercise_dict})
