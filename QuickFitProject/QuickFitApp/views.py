# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Exercise
from .serializers import ExerciseSerializer

@csrf_exempt
def exercise_list(request):
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

@csrf_exempt
def exercise_detail(request, pk):
    try:
        exercise = Exercise.objects.get(pk=pk)
    except Exercise.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ExerciseSerializer(exercise)
        return JsonResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ExerciseSerializer(exercise, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        exercise.delete()
        return HttpResponse(status=204)
