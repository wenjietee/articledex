from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_index(request):
    return Response({'message': 'test index'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_create(request):
    pass


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
