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
            return Response({'status':200,'message': 'user registered!'})
        else:
            return Response({'status':500,'message': 'user not registered!'})


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
            raise exceptions.AuthenticationFailed(
                'invalid password.'
            )

        # generate tokens
        tokens = RefreshToken.for_user(user)

        # get user data
        user= UserSerializer(instance=user).data

        # return user object and tokens
        return Response({
            'refresh': str(tokens),
            'access': str(tokens.access_token),
            'user': {'id':user['id'],'username':user['username']}
            
        })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_profile(request):

    # serialize user data
    user = get_user_model().objects.get(pk=request.user.id)
    serialized_user = UserSerializer(instance=user).data

    # delete password from user object
    del serialized_user['password']

    # serialize user articles
    articles=Article.objects.filter(user=request.user.id)

    serialized_articles=ArticleSimpleSerializer(articles,many=True).data

    return Response({'profile':serialized_user,'user_articles':serialized_articles})


@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def views_profile_edit(request):

    # get profile by user id
    profile = Profile.objects.get(user=request.user)
    # edit profile
    if request.method == 'PUT':
        

        serializer = ProfileSerializer(
            instance=profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

    # serialize profile data
    serialized_profile = ProfileSerializer(instance=profile).data
    
    return Response(serialized_profile)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def views_user_actions(request):

    # get article id from url query
    article_id = request.GET['article']

    if request.method == 'PUT':

        status_update = {'status': None}

        # update unread status
        if request.GET['action'] == 'unread':

            unread = Unread.objects.get(article=article_id)
            status_update['status'] = not unread.status
            serializer = UnreadSerializer(
                instance=unread, data=status_update, partial=True)

            if serializer.is_valid():
                serializer.save()

        # update private status
        if request.GET['action'] == 'private':

            private = Private.objects.get(article=article_id)
            status_update['status'] = not private.status
            serializer = PrivateSerializer(
                instance=private, data=status_update, partial=True)

            if serializer.is_valid():
                serializer.save()

        # update local status
        if request.GET['action'] == 'local':

            local = Local.objects.get(article=article_id)
            status_update['status'] = not local.status
            serializer = LocalSerializer(
                instance=local, data=status_update, partial=True)

            if serializer.is_valid():
                serializer.save()

        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_unreads(request):

    # serialize user unread data
    user = get_user_model().objects.get(pk=request.user.id)
    serialized_unreads = UserUnreadSerializer(instance=user).data

    return Response(serialized_unreads)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_verify(request):
      # serialize user data
    user = get_user_model().objects.get(pk=request.user.id)
    serialized_user = UserSerializer(instance=user).data
    return Response({'id':serialized_user['id'],'username':serialized_user['username']})