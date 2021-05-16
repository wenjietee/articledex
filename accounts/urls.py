from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (TokenObtainPairView)

urlpatterns = [
    path('register/', views_register, name='register'),
    path('login/', views_login, name='login'),
    path('profile/', views_profile, name='profile'),
    path('stats/', views_user_stats, name='stats'),
]
