from rest_framework import serializers
from .models import Movement

class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movement
        fields = ('id', 'description', 'author', 'movement_type')
