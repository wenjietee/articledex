from django.shortcuts import render
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_index(request):
    pass


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_create(request):
    pass


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def views_show(request):
    pass
