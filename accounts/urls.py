from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (TokenObtainPairView)

app_name = "accounts"  # namespace

urlpatterns = [
    path('register/', views_register, name='register'),
    path('login/', views_login, name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token'),
]
