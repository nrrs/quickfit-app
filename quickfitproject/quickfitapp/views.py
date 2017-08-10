# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
# from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from django.contrib.auth.models import User
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

from .models import Movement
from .serializers import MovementSerializer
from .models import Workout
from .serializers import WorkoutSerializer
from .serializers import UserSerializer


# adjust when we need to filter by user (e.g. only pull one user's movements)
class MovementViewSet(viewsets.ModelViewSet):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = UserSerializer

# client_id = 'H2omDajOpBpwUYfSZahr9weNvMt1A8LbiW0srJ1S'
#
# client_secret = 'XuNyLon7py5lmkbjfCxKYgCcbcPrv5REjFJsXtZCdA5PSE2VWwUFeSy0IQxeES2yRZZpe7BUVTzODjyM4R2Eq9dd0A4oZd9szvD3a5mjoSt1hnfLV2s6Xqq267zW2pD1'

# class-based views
# class LoginView(APIView):
#     authentication_classes = (SessionAuthentication, BasicAuthentication)
#     permission_classes = (IsAuthenticated,)
#
#     def post(self, request, format=None):
#         content = {
#             'user': unicode(request.user),  # `django.contrib.auth.User` instance.
#             'auth': unicode(request.auth),  # None
#         }
#         return Response(content)


# function-based view for basic auth
# @api_view(['POST'])
# def signup(request):
#     username = request.POST.get('username', None)
#     password = request.POST.get('password', None)
#     email = request.POST.get('email', None)
#     user = User.objects.create_user(username, email, password)
#     user.save()
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=201)
#     return Response(serializer.errors, status=400)
#
# @api_view(['POST'])
# def login(request):
#     username = request.POST.get('username', None)
#     password = request.POST.get('password', None)
#     user = authenticate(request, username=username, password=password)
#     if user is not None:
#         login(request, user)
#         serializer = UserSerializer(user)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)
#     else:
#         return JsonResponse(
#           {'errors': ['Invalid combination of username and password.']}
#         )



#REST framework generates all below 'standard' functions and routes


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
