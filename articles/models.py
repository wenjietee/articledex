from django.db import models
from django.contrib.auth.models import User
import uuid

from django.db.models.expressions import F

# Create your models here.


class Tag(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(max_length=200, null=False)

    def __str__(self):
        return self.name


class Article(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    url = models.CharField(max_length=2083, null=False)
    article_type = models.CharField(max_length=200, null=False)
    title = models.CharField(max_length=200, null=False)
    content = models.TextField()
    description = models.TextField()

    # relationships
    tags = models.ManyToManyField(Tag, related_name='tags', blank=True)
    user = models.ForeignKey(
        User, related_name='user', on_delete=models.CASCADE)

    # meta info
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
