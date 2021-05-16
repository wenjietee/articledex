from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
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
@permission_classes([AllowAny])
def views_login(request):
    if request.method == 'POST':

        # get data from request object
        username = request.data.get('username')
        password = request.data.get('password')

        # check if requested fields are empty
        if (username is None) or (password is None):
            raise exceptions.AuthenticationFailed(
                'username or password is required.'
            )
        # find username match in DB
        user = User.objects.filter(username=username).first()

        # if unable to find user in DB
        if user is None:
            raise exceptions.AuthenticationFailed(
                'user not found.'
            )

        if not user.check_password(password):
            raise exceptions.AuthenticationFaile(
                'invalid password.'
            )

        # serialize user data
        serialzed_user = UserSerializer(user).data

        # delete password from user object
        del serialzed_user['password']

        # generate tokens
        tokens = RefreshToken.for_user(user)

        # return user object and tokens
        return Response({
            'refresh': str(tokens),
            'access': str(tokens.access_token),
            'user': serialzed_user
        })


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def views_profile(request):

    # edit profile
    if request.method == 'PUT':
        # get profile by user id
        profile = Profile.objects.get(user=request.user)

        serializer = ProfileSerializer(
            instance=profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

    # serialize user data
    user = get_user_model().objects.get(pk=request.user.id)
    serialized_user = UserSerializer(instance=user).data
    # delete password from user object
    del serialized_user['password']

    return Response(serialized_user)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def views_actions(request):
    if request.method == 'POST':
        return Response({'message': 'post'})

    elif request.method == 'GET':
        return Response({'message': 'get'})
