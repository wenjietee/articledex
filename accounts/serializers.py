from django.contrib.auth.models import User
from .models import *
from articles.serializers import ArticleSerializer
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username',
                  'email', 'password')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = super().create(validated_data)
        # hash user password
        user.set_password(validated_data['password'])
        user.save()

        # create user's profile
        Profile.objects.create(
            description='',
            user=user
        )

        return user


class UnreadSerializer(serializers.ModelSerializer):

    article = ArticleSerializer(read_only=True)

    class Meta:
        model = Unread
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):

    article = ArticleSerializer(read_only=True)

    class Meta:
        model = Like
        fields = '__all__'


class PrivateSerializer(serializers.ModelSerializer):

    article = ArticleSerializer(read_only=True)

    class Meta:
        model = Private
        fields = '__all__'


class LocalSerializer(serializers.ModelSerializer):

    article = ArticleSerializer(read_only=True)

    class Meta:
        model = Local
        fields = '__all__'
