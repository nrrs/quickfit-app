# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

from .models import Movement
from .serializers import MovementSerializer
from .models import Workout
from .serializers import WorkoutSerializer


#adjust when we need to filter by user (e.g. only pull one user's movements)
class MovementViewSet(viewsets.ModelViewSet):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


#RESTFUL API generates all below 'standard' functions and routes


#analgous to INDEX (all movements)
# @csrf_exempt    #delete after auth developed
# def movement_list(request):
#     if request.method == 'GET':
#         all_movements = Movement.objects.all()
#         serializer = MovementSerializer(all_movements, many=True)
#         return JsonResponse(serializer.data, safe=False)
        #could potentially also return JSONRenderer().render(serializer.data)



# @csrf_exempt  #delete after auth developed
# def movement_detail(request, pk):
#     try:
#         movement = Movement.objects.get(pk=pk)
#     except Movement.DoesNotExist:
#         return HttpResponse(status=404)
#
#     if request.method == 'GET':
#         serializer = MovementSerializer(movement)
#         return JsonResponse(serializer.data)
#
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = MovementSerializer(movement, data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)
#
#     elif request.method == 'DELETE':
#         movement.delete()
#         return HttpResponse(status=204)







#original index call for movments that worked on local browser and when connecting from React Native
# @csrf_exempt    #delete after auth developed
# def movement_list(request):
#     all_movements = Movement.objects.all()
#     movement_dict = {}
#     for movement in all_movements:
#     movement_dict[movement.id] = {
#         'id' : movement.id,
#         'author_id' : movement.author_id,  #displays as author_id in table
#         'description' : movement.description,
#         'movement_type' : movement.movement_type,
#         'demo_url' : movement.demo_url,
#         'timestamp_last_updated' : movement.timestamp_last_updated,
#         'timestamp_created' :movement.timestamp_created
#          }
#     return JsonResponse({ 'movements': movement_dict })





#
