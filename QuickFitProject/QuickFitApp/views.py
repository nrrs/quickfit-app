# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from .models import Exercise

def index(request):
    all_exercises = Exercise.objects.all()

    print "I'm here"
    print all_exercises

    exercise_dict = {}

    for exercise in all_exercises:
        exercise_dict[exercise.id] = {'id' : exercise.id, 'description' : exercise.description }

    return JsonResponse({ 'exercises': exercise_dict })
    #
    # all_exercises = Exercise.objects.all()
    # return all_exercises;
