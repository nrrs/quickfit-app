# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

#for use with function-based decorators
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

#importing the models and their serializers
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


#using view wrappers in attempt to pull movements/workouts associated with one user id
# @api_view(['GET', 'PUT', 'DELETE'])
# def movement_detail(request, pk):
#     try:
#         single_movement = Movement.objects.get(pk=pk)
#     except Movement.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#     serializer = MovementSerializer(single_movement)
#     return Response(serializer.data) #renders the content type as requested by the client BUT serializer.data is native python (I believe)
#
#     elif request.method == 'PUT':
#         serializer = MovementSerializer(single_movement, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     elif request.method == 'DELETE':
#         single_movement.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)



#to limit information sent with response (untested)....
# class MovementResource(ModelResource):
#     class Meta:
#         queryset = Movement.objects.all()
#         resource_name = 'movement'
#         fields = ['title', 'description']



#UNTESTED CUSTOM METHOD PULLING MOVEMENTS BY USER
# class UserViewSet(viewsets.ModelViewSet):
#     model = User
#     serializer_class = UserSerializer
#
#     # Your regular ModelViewSet things here
#     queryset = User.objects.all()   #????
#
#     # Add a decorated method above the actual methos like this
#     #to customize the route, add a second paramater to it after the methods parameter.....e.g......url_path='whatever-you-want'
#     #...that would generate the following URL pattern: ^users/{pk}/whatevs/$ Name: 'whatever-you-want'
#     @detail_route(methods=['get'])
#     def whatevs(self, request, pk):   # pk is the user_id
#         user_movements = Movement.objects.filter(author=pk)  #in the database as author_id
#         serializer = PostSerializer(user_movements)
#         return Response(serializer.data)



#BELOW METHODS ARE REPLACED WITH DEFAULT CLASS METHODS AT THE TOP

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


#analgous to INDEX (all movements)
# @csrf_exempt    #delete after auth developed
# def movement_list(request):
#     if request.method == 'GET':
#         all_movements = Movement.objects.all()
#         serializer = MovementSerializer(all_movements, many=True)
#         return JsonResponse(serializer.data, safe=False)
        #could potentially also return JSONRenderer().render(serializer.data)


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
