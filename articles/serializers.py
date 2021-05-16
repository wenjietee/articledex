from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from accounts.models import *


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):

    article_likes = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)

    class Meta:
        model = Article
        fields = ('id', 'url', 'article_type', 'title',
                  'content', 'description', 'user', 'article_likes')

    def create(self, validated_data):

        # create article
        article = super().create(validated_data)
        article.save()

        # get user
        user = User.objects.get(pk=article.user.pk)

        # init unread, private, local stats
        Unread.objects.create(status=True, article=article, user=user)
        Private.objects.create(status=False, article=article, user=user)
        Local.objects.create(status=False, article=article, user=user)

        return article
