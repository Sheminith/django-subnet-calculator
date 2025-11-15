from django.urls import path
from base import views

urlpatterns = [
    path('', views.create_subnets, name='create_subnets')
]