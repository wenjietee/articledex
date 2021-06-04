from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import exceptions
from .models import *
from articles.serializers import *
from accounts.serializers import *
from django.shortcuts import render
from .scrapers import *

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_index(request):

    articles = Article.objects.all()
    serializer = ArticleSimpleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def views_create(request):

    if request.method == 'POST':
        # set current user in data
        request.data['user'] = request.user.pk

        # scrape page data from website
        scraped_data = scrape(
            request.data['url'], request.data['article_type'])

        # set content and title from scraped data
        request.data['title'] = scraped_data['title']
        request.data['content'] = scraped_data['content']

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
    # get article & article creator by uuid
    article = Article.objects.get(pk=id)

    # delete article
    if request.method == 'DELETE':
        article.delete()
        return Response({'message': 'article deleted.'})

    # edit article
    if request.method == 'PUT':
        # store url from db
        prev_url = article.url

        # if url dont match rescrape content
        if prev_url != request.data['url']:

            # scrape page data from website
            scraped_data = scrape(
                request.data['url'], request.data['article_type'])

            # set content and title from scraped data
            request.data['title'] = scraped_data['title']
            request.data['content'] = scraped_data['content']

        # save edited data
        serializer = ArticleSerializer(
            instance=article, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

    # serialize article
    serialized_article = ArticleSerializer(article, many=False)

    # serialize article createTypography
    serialized_article_creator = ArticleCreatorSerializer(article, many=False)

    return Response({'article': serialized_article.data, 'creator': serialized_article_creator.data})


@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def views_like(request, id):

    # get article by uuid
    article = Article.objects.get(pk=id)

    # like/unlike article
    if request.method == 'POST':
        # create like object
        Like.objects.create(article=article, user=request.user)
        return Response({'message': 'articled liked.'})

    if request.method == 'DELETE':
        # delete like object
        Like.objects.get(article=article).delete()
        return Response({'message': 'article unliked.'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def views_search(request):

    # get array of queries from url
    queries = request.GET['q'].split(' ')

    # get tags
    tags = Tag.objects.filter(name__in=queries)

    # find articles using tags
    found_articles = Article.objects.filter(tags__in=tags)

    # serialized article
    serialized_articles = ArticleSimpleSerializer(
        found_articles, many=True).data

    return Response(serialized_articles)


@api_view(['POST'])
@permission_classes([AllowAny])
def views_ext_create(request):
    if request.method == 'POST':

        # find username match in DB
        username = request.data['user']
        user = User.objects.filter(username=username).first()

        # set current user in data
        request.data['user'] = user.pk

        # scrape page data from website
        scraped_data = scrape(
            request.data['url'], request.data['article_type'])

        # set content and title from scraped data
        request.data['title'] = scraped_data['title']
        request.data['content'] = scraped_data['content']

        # save article
        article = ArticleSerializer(data=request.data)
        if article.is_valid():
            article.save()

            return Response(article.data)

        else:
            raise exceptions.ValidationError()
