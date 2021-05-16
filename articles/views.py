from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import exceptions
from .models import *
from articles.serializers import *
from accounts.serializers import *
from django.shortcuts import render


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
        # set current user in data
        request.data['user'] = request.user.pk

        # save article
        article = ArticleSerializer(data=request.data)
        if article.is_valid():
            article.save()

            return Response(article.data)

        else:
            raise exceptions.ValidationError()


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def views_show(request, id):
    # get article by uuid
    article = Article.objects.get(pk=id)

    # delete article
    if request.method == 'DELETE':
        article.delete()
        return Response({'message': 'article deleted.'})

    # edit article
    if request.method == 'PUT':
        serializer = ArticleSerializer(
            instance=article, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

    serializer = ArticleSerializer(article, many=False)

    return Response(serializer.data)
