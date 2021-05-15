from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Profile)
admin.site.register(Unread)
admin.site.register(Like)
admin.site.register(Private)
admin.site.register(Local)