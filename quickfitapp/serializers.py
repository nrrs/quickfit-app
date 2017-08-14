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
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('id',
                  'email',
                  'username',
                  'password',
                  'last_login',
                  'is_superuser',
                  'first_name',
                  'last_name',
                  'is_staff',
                  'is_active',
                  'date_joined',
                  'groups',
                  'user_permissions'
                  )
