from django.db import models
from django.contrib.auth.models import User
from articles.models import Article
import uuid

# Create your models here.


class Profile(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    description = models.TextField()
    image = models.CharField(
        max_length=2083, default='https://cdn0.iconfinder.com/data/icons/elasto-online-store/26/00-ELASTOFONT-STORE-READY_user-circle-512.png')

    # relationships
    user = models.OneToOneField(
        User, related_name='profile', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username}\'s profile'


class Unread(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    status = models.BooleanField(default=True, null=False)

    # relatioships
    user = models.ForeignKey(
        User, related_name='user_unreads', on_delete=models.CASCADE)
    article = models.ForeignKey(
        Article, related_name='article_unreads', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username}\'s unread articles'


class Private(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    status = models.BooleanField(default=False, null=False)

    # relatioships
    user = models.ForeignKey(
        User, related_name='user_privates', on_delete=models.CASCADE)
    article = models.ForeignKey(
        Article, related_name='article_privates', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username}\'s private articles'


class Local(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    status = models.BooleanField(default=False, null=False)

    # relatioships
    user = models.ForeignKey(
        User, related_name='user_locals', on_delete=models.CASCADE)
    article = models.ForeignKey(
        Article, related_name='article_locals', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username}\'s local articles'


class Like(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    # relatioships
    user = models.ForeignKey(
        User, related_name='user_likes', on_delete=models.CASCADE)
    article = models.ForeignKey(
        Article, related_name='article_likes', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username}\'s liked articles'
