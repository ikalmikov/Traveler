from rest_framework import status
from rest_framework.response import Response
# from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from .models import Itinerary, Event
from .serializers import LoginSerializer, SignupSerializer, ItinerarySerializer, EventSerializer

# Create your views here.

# User Authentication #####################################################
@api_view(['POST'])
def login_view(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(username=username, password=password)
    
    # If User is valid, Login
    if user:
        login(request, user)
        return Response({'detail': 'Login successful'}, status=status.HTTP_201_CREATED)
    
        # Check if username or password is wrong
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'Username does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'error': 'Password is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user_data = serializer.validated_data
        try:
            User.objects.create_user(
                first_name = user_data['first_name'],
                last_name = user_data['last_name'],
                username = user_data['username'],
                password = user_data['password']
            )
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)

        # user = auth.authenticate(username=user_data['username'], password=user_data['password'])
        # auth.login(request, user)

        return Response({'detail': 'User created successfully'}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
# @login_required()
def logout_view(request):
    if not request.user.is_authenticated:
        return Response({'detail':'User is not logged in.'}, status=status.HTTP_400_BAD_REQUEST)

    logout(request)
    response = Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)
    return response

# @api_view(['GET'])
# @ensure_csrf_cookie
# def session_view(request):
#     if request.user.is_authenticated:
#         return Response({'detail': 'User is logged in'}, status=status.HTTP_200_OK)
#     else:
#         return Response({'detail': 'User is not logged in'}, status=status.HTTP_401_UNAUTHORIZED)


# Itinerary Requests #####################################################

@api_view(['GET', 'POST'])
# @login_required()
def itinerary_view(request):
    # Return all itineraries created by user
    if request.method == 'GET':
        itineraries = Itinerary.objects.filter(user=request.user)
        serializer = ItinerarySerializer(itineraries, many=True)
        return Response(serializer.data)

    # Create New Itinerary
    elif request.method == 'POST':
        serializer = ItinerarySerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
# @login_required()
def itinerary_view_detail(request, pk):
    # Check if itinerary exists
    try:
        itinerary = Itinerary.objects.get(pk=pk, user=request.user)
    except Itinerary.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ItinerarySerializer(itinerary)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ItinerarySerializer(itinerary, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        itinerary.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)
    

# Event Requests #####################################################

@api_view(['GET', 'POST'])
# @login_required()
def event_view(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = EventSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
# @login_required()
def event_view_detail(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Check if event is created by user
    if request.user != event.itinerary.user:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)