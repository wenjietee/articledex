from accounts.serializers import UserSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):

    tags = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = Article
        fields = ('url', 'title', 'article_type',
                  'content', 'description', 'tags', 'user')

        def create(self, validated_data):
            tags = validated_data.pop('tags')

            article = Article.objects.create(**validated_data)

            for tag in tags:
                Tag.objects.get_or_create(name=tag)
                article.tags.add(tag)

            return article
