from rest_framework import serializers
from .models import Movement, Workout
from django.contrib.auth.models import User


class MovementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movement
        fields = ('id',
                  'author',
                  'movement_name',
                  'description',
                  'movement_type',
                  'difficulty',
                  'demo_url',
                  'timestamp_last_updated',
                  'timestamp_created')


class JSONSerializerField(serializers.Field):
    def to_internal_value(self, data):
        return data
    def to_representation(self, value):
        return value


class WorkoutSerializer(serializers.ModelSerializer):
    workout_data = JSONSerializerField()

    class Meta:
        model = Workout
        fields = ('id',
                  'athlete',   # model field name is 'athlete', but displays as athlete_id in table
                  'timestamp_created',
                  'workout_data')


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ('id',
                  'email',
                  'username')
