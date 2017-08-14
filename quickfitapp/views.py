# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from django.views.decorators.csrf import csrf_exempt

# for use with function-based decoratored views
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# for use with class-based views
from django.http import Http404  # refactor to use 'status' from rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response

# importing the models and their serializers
from .models import Movement, Workout
from .serializers import MovementSerializer, WorkoutSerializer, UserSerializer


# returns boolean indicating whether or not user making the request has permission to invoke a CRUD method
class PermissionToMutateBasedOnAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ("DELETE", "PUT", "PATCH"):
            return obj.author == request.user
        else:
            return True

class MovementViewSet(viewsets.ModelViewSet):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer
    permission_classes = (PermissionToMutateBasedOnAuthor,) #this is syntax for tuple


#returns boolean indicating whether or not user making the request has permission to invoke a CRUD method
class PermissionToMutateBasedOnAthlete(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ("DELETE", "PUT", "PATCH"):
            return obj.athlete == request.user
        else:
            return True

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = (PermissionToMutateBasedOnAthlete,) #this is syntax for tuple

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer


# function-based view for basic auth
@csrf_exempt
@api_view(['POST'])
def signup(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    email = request.POST.get('email', None)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    else:
        return Response(serializer.errors, status=400)

@csrf_exempt
@api_view(['POST', 'DELETE'])
def session(request, pk):
    if request.method == 'POST':
        # email = request.POST.get('email', None)
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        # user = authenticate(request, username=username, password=password)
        user = User.objects.get(username=username)
        if user and user.check_password(password):
            login(request, user)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=201)
        else:
            return JsonResponse(
                {'errors': ['Invalid combination of username and password.']}
            )
    elif request.method == 'DELETE':
        user = User.objects.get(pk=pk)
        request.user = user
        if user is not None:
            logout(request)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=201)
        else:
            return JsonResponse(
              {'errors': ["Can't find current user."]}
            )


@csrf_exempt
@api_view(['PATCH'])
def edit_profile(request, pk):
    username = request.POST.get('username', None)
    email = request.POST.get('email', None)
    password = request.POST.get('password', None)
    user = User.objects.get(pk=pk)
    try:
        user.username = username
        user.email = email
        if password != '':
            user.set_password(password)
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=201)
    except:
        return Response("Error updating profile", status=400)


@csrf_exempt
@api_view(['GET'])
def user_movements(request, pk):
    user_movements = Movement.objects.filter(author_id=pk)
    serializer = MovementSerializer(user_movements, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
def user_workouts(request, pk):
    user_workouts = Workout.objects.filter(athlete_id=pk)
    serializer = WorkoutSerializer(user_workouts, many=True)
    return Response(serializer.data)


# class UserMovementList(APIView):
#
#     def get_object(self, pk):   #retrieves user based on their id, will replace with 'current user' after auth installed
#         try:
#             return User.objects.get(pk=pk)
#         except User.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk):
#         this_user = self.get_object(pk)
#         try:
#             all_movements = Movement.objects.filter(author=this_user)
#             serializer = MovementSerializer(all_movements, many=True)
#             return Response(serializer.data)
#         except Movement.NotFound:
#             raise Http404   #currently just returning empty array with status code 200


# class UserWorkoutList(APIView):
#
#     def get_object(self, pk):   #retrieves user based on their id, will replace with 'current user' after auth installed
#         try:
#             return User.objects.get(pk=pk)
#         except User.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         this_user = self.get_object(pk)
#         try:
#             all_workouts = Workout.objects.filter(athlete=this_user)
#             serializer = WorkoutSerializer(all_workouts, many=True)
#             return Response(serializer.data)
#         except Workout.NotFound:
#             raise Http404   #currently just returning empty array with status code 200



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
#     def put(self, request, pk, format=None):
#         single_movement = self.get_object(pk)
#         serializer = MovementSerializer(single_movement, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk, format=None):
#         single_movement = self.get_object(pk)
#         single_movement.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


#--------------------USING VIEW WRAPPERS-------------------

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
