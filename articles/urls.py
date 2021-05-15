from django.urls import path
from .views import *

urlpatterns = [
    path('', views_index, name='article_index'),
    path('create', views_create, name='article_create'),
    path('show/<uuid:id>', views_show, name='article_show')
]
