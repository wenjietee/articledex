from accounts.serializers import UserSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class TagSerializer(serializers.ModelSerializer):
    articles = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='title'
    )

    class Meta:
        model = Tag
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        slug_field='text'
    )

    class Meta:
        model = Article
        fields = '__all__'
