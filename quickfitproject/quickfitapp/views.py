# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework import permissions

#for use with function-based decoratored views
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

#for use with class-based views
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

#importing the models and their serializers
from .models import Movement
from .serializers import MovementSerializer
from .models import Workout
from .serializers import WorkoutSerializer
from .models import Profile
from .serializers import ProfileSerializer
from django.contrib.auth.models import User
from .serializers import UserSerializer


#adjust when we need to filter by user (e.g. only pull one user's movements)
class MovementViewSet(viewsets.ModelViewSet):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


#manual class-based view for listing Movements that belong to a single user
class UserMovementList(APIView):

    def get_object(self, pk):   #retrieves user based on their id, will replace with 'current user' after auth installed
        try:
            return User.objects.get(pk=pk)
        except Movement.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        this_user = self.get_object(pk)
        try:
            all_movements = Movement.objects.filter(author=this_user)
            serializer = MovementSerializer(all_movements, many=True)
            return Response(serializer.data)
        except Movement.NotFound:
            raise Http404   #currently just returning empty array with status code 200


#manual class-based view for listing Movements that belong to a single user
class UserWorkoutList(APIView):

    def get_object(self, pk):   #retrieves user based on their id, will replace with 'current user' after auth installed
        try:
            return User.objects.get(pk=pk)
        except Workout.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        this_user = self.get_object(pk)
        try:
            all_workouts = Workout.objects.filter(athlete=this_user)
            serializer = WorkoutSerializer(all_workouts, many=True)
            return Response(serializer.data)
        except Workout.NotFound:
            raise Http404   #currently just returning empty array with status code 200



#manual class-based view for working on a specific Movement only if it belongs to a single user
class UserMovementDetail(APIView):

    def destroy(self, request, pk1, pk2):
        this_user = self.get_object(pk1)
        try:
            movement_to_delete = Movement.objects.get(author=this_user, id=pk2)
            movement_to_delete.delete()
            movement_to_delete.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Movement.NotFound:
            return Response(status=status.HTTP_403_FORBIDDEN)




#--------------------MANUAL CLASS-BASED VIEWS-------------------
# class MovementList(APIView): #lists all movements
#     def get(self, request, format=None):
#         movements = Movement.objects.all()
#         serializer = MovementSerializer(movements, many=True)
#         return Response(serializer.data)
#
# class MovementDetail(APIView):  #includes fxns to retrieve, update, and delete
#     def get_object(self, pk):
#         try:
#             return Movement.objects.get(pk=pk)
#         except Movement.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         single_movement = self.get_object(pk)
#         serializer = MovementSerializer(single_movement)
#         return Response(serializer.data)
#
#
#
#     def put(self, request, pk, format=None):
#         single_movement = self.get_object(pk)
#         serializer = MovementSerializer(single_movement, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
#
#     def delete(self, request, pk, format=None):
#         single_movement = self.get_object(pk)
#         single_movement.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)



#using view wrappers in attempt to pull movements/workouts associated with one user id
# @api_view(['GET', 'PUT', 'DELETE'])
# def movement_detail(request, pk, format=None): #format=None here allows us to use format_suffix_patterns on the urls
#     try:
#         single_movement = Movement.objects.get(pk=pk)
#     except Movement.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = MovementSerializer(single_movement)
#         return Response(serializer.data) #renders the content type as requested by the client BUT serializer.data is native python (I believe)
#
#     elif request.method == 'PUT':
#         serializer = MovementSerializer(single_movement, data=request.data) #request.data can handle json and other content types
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
