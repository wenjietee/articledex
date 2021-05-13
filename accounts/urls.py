from django.urls import path
from .views import *

app_name = "accounts"  # namespace

urlpatterns = [
    path('register/', views_register, name='register'),
    path('login/', views_login, name='login'),
]
