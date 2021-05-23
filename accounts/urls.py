from django.urls import path
from .views import *

urlpatterns = [
    path('register/', views_register, name='register'),
    path('login/', views_login, name='login'),
    path('profile/', views_profile, name='profile'),
    path('profile/edit', views_profile_edit, name='profile_edit'),
    path('actions/', views_user_actions, name='actions'),
    path('verify/', views_verify, name='verify'),
    path('unreads/', views_unreads, name='unreads'),
]
