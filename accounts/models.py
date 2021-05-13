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
    image = models.ImageField(upload_to='profile')

    # relationships
    user = models.OneToOneField(
        User, related_name='profile', on_delete=models.CASCADE)


class Unread(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    unread = models.BooleanField(default=True, null=False)

    # relatioships
    user = models.ForeignKey(
        User, related_name='user_unreads', on_delete=models.CASCADE)
    article = models.ForeignKey(
        Article, related_name='article_unreads', on_delete=models.CASCADE)


class Like(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    # relatioships
    user = models.ForeignKey(
        User, related_name='user_unreads', on_delete=models.CASCADE)
    article = models.ForeignKey(
        Article, related_name='article_unreads', on_delete=models.CASCADE)


class Private(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    private = models.BooleanField(default=False, null=False)

    # relatioships
    user = models.ForeignKey(
        User, related_name='user_privates', on_delete=models.CASCADE)
    article = models.ForeignKey(
        Article, related_name='article_privates', on_delete=models.CASCADE)


class Local(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    local = models.BooleanField(default=False, null=False)

    # relatioships
    user = models.ForeignKey(
        User, related_name='user_locals', on_delete=models.CASCADE)
    article = models.ForeignKey(
        Article, related_name='article_locals', on_delete=models.CASCADE)
