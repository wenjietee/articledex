from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import exceptions
from .models import *
from .serializers import *
from django.shortcuts import render
from django.core.exceptions import ValidationError


# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_index(request):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def views_create(request):

    if request.method == 'POST':
        article = ArticleSerializer(data=request.data)

        if article.is_valid():
            article.save()
            return Response({'message': 'article created.'})

        else:
            raise exceptions.ValidationError()


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def views_show(request, id):
    article = Article.objects.get(pk=id)

    if request.method == 'DELETE':
        article.delete()
        return Response({'message': 'article deleted.'})

    if request.method == 'PUT':
        serializer = ArticleSerializer(instance=article, data=request.data)
        if serializer.is_valid():
            serializer.save()

    serializer = ArticleSerializer(article, many=False)

    return Response(serializer.data)
