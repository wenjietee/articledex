from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import exceptions

# Create your views here.


@api_view(['POST'])
@permission_classes([AllowAny])
def views_register(request):
    if request.method == 'POST':
        user = UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response({'message': 'user registered!'})
        else:
            return Response({'message': 'user not registered!'})


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def views_login(request):
    # get request user name and
    # check if empty
    # find if user exists
    # serialize user
    # return user data
    pass
