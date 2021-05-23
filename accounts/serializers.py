from django.contrib.auth.models import User
from .models import *
from articles.serializers import *
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UnreadSerializer(serializers.ModelSerializer):

    article = ArticleSimpleSerializer(read_only=True)

    class Meta:
        model = Unread
        fields = '__all__'


class PrivateSerializer(serializers.ModelSerializer):

    article = ArticleSimpleSerializer(read_only=True)

    class Meta:
        model = Private
        fields = '__all__'


class LocalSerializer(serializers.ModelSerializer):

    article = ArticleSimpleSerializer(read_only=True)

    class Meta:
        model = Local
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):

    article = ArticleSimpleSerializer(read_only=True)

    class Meta:
        model = Like
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    user_unreads = UnreadSerializer(many=True, read_only=True)
    user_privates = PrivateSerializer(many=True, read_only=True)
    user_locals = LocalSerializer(many=True, read_only=True)
    user_likes = LikeSerializer(many=True, read_only=True)
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username',
                  'email', 'password', 'user_unreads',
                  'user_privates', 'user_locals', 'user_likes', 'profile')
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
class UserUnreadSerializer(serializers.ModelSerializer):
    user_unreads = UnreadSerializer(many=True, read_only=True)
    class Meta:
        model=User
        fields='user_unreads'