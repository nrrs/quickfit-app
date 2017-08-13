from rest_framework import serializers
from .models import Movement, Workout, Profile
from django.contrib.auth.models import User


class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movement
        fields = ('id',
                  'author_id',   #for auth, model field name is 'author', but displays as author_id in table
                #   'author',   #when auth turned off AND this is just an integer (not a foreign key) in the model
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
                  'athlete_id',   #model field name is 'athlete', but displays as athlete_id in table
                  'timestamp_created',
                  'workout_data')


class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
      model = Profile
      fields = ('id',
                'proxy_username',
                'favorite_phrase')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'email',
                  'username')



# HOW TO USE ABOVE SERIALIZERS...
# ModelSerializers are shorthand for regular serializers
# they include default create() and update() methods when calling serializer.save()
# print(repr(MovementSerializer)) to see the long hand form


# to serialize data (transform an object instance into json)...

# movementA = Movement(movement_name= 'abc')
# movementA.save()
# serializerA = MovementSerializer(movementA)
# serializedA = serializerA.data ... '{"id": 2, "movement_name": u'abc', ...}' ...python native datatypes
# contentA = JSONRenderer().render(serializedA) ... '{"id": 2, "movement_name": "abc", ...}'  ....json object


# to deserialize data (transform a json object into an object instance) ...

# from django.utils.six import BytesIO
# streamB = BytesIO(contentA)
# serializedB = JSONParser().parse(streamB)  ...at this point, data is python native
# serializerB = MovementSerializer(serializedB=serializedB)
# serializerB.validated_data
# serializerB.save()


# to serialize a querySet...

# querySetC = Movement.objects.all()
# serializerC = MovementSerializer(querySetC, many=True)
# serializedC = serializerC.data ....python native datatypes
# contentC = JSONRenderer().render(serializedC) ...json object
