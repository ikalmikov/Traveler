from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Itinerary, Event

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        # ['id', 'title']
        # , 'place', 'start_time', 'end_time']

class ItinerarySerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)

    class Meta:
        model = Itinerary
        fields = '__all__'
        # ['id', 'title', 'events']
        # , 'location', 'start_date', 'end_date', 'events', 'created', 'user']

    # def update():
