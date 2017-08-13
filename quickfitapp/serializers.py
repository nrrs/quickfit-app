from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Movement, Workout, Profile

#ModelSerializers are shorthand for regular serializers
#they include default create() and update() methods when calling serializer.save()
#print(repr(MovementSerializer)) to see the long hand form

# class UsersMovementSerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = Movement
    #     fields = ('id',
    #               'author_id',   #model field name is 'author', but displays as author_id in table
    #               'movement_name')


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



class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ('id',
                  'athlete_id',   #model field name is 'athlete', but displays as athlete_id in table
                  'timestamp_created',
                  'workout_data')

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
      model = Profile
      fields = ('id',
                'proxy_username',
                'favorite_phrase')

#not working because User is undefined, maybe b/c auth is disabled
# from django.contrib.auth import get_user_model
# User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ('id',
                  'email',
                  'username')

#HOW TO USE ABOVE SERIALIZERS...


#to serialize data (transform an object instance into json)...

#movementA = Movement(movement_name= 'abc')
#movementA.save()
#serializerA = MovementSerializer(movementA)
#serializedA = serializerA.data ... '{"id": 2, "movement_name": u'abc', ...}' ...python native datatypes
#contentA = JSONRenderer().render(serializedA) ... '{"id": 2, "movement_name": "abc", ...}'  ....json object


#to deserialize data (transform a json object into an object instance) ...

# from django.utils.six import BytesIO
# streamB = BytesIO(contentA)
# serializedB = JSONParser().parse(streamB)  ...at this point, data is python native
# serializerB = MovementSerializer(serializedB=serializedB)
# serializerB.validated_data
# serializerB.save()


#to serialize a querySet...

#querySetC = Movement.objects.all()
#serializerC = MovementSerializer(querySetC, many=True)
#serializedC = serializerC.data ....python native datatypes
#contentC = JSONRenderer().render(serializedC) ...json object
