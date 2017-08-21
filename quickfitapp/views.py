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
    # serializer = UserSerializer(data=request.data)
    # if serializer.is_valid():
    #     serializer.save()
    #     # user = User.objects.get(username=username)
    #     # user.set_password(password)
    #     # user.save()
    #     return Response(serializer.data, status=201)
    # else:
    #     user = User.objects.get(username=username, email=email)
    #     user.set_password(password)
    #     return Response({"id": user.id, "email": user.email, "username": user.username}, status=201)
        # return Response(serializer.errors, status=400)
    # user = User.objects.create_user(username=username, email=email, password=password)
    # return Response('success', status=201)

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
