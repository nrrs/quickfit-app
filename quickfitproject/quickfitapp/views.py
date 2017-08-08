# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Movement
from .serializers import MovementSerializer

@csrf_exempt
def movement_list(request):
    all_movements = Movement.objects.all()

    movement_dict = {}

    for movement in all_movements:
        movement_dict[movement.id] = {'id' : movement.id, 'description' : movement.description }

    return JsonResponse({ 'movements': movement_dict })

@csrf_exempt
def movement_detail(request, pk):
    try:
        movement = Movement.objects.get(pk=pk)
    except Movement.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = MovementSerializer(movement)
        return JsonResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MovementSerializer(movement, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        movement.delete()
        return HttpResponse(status=204)
