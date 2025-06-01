from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('today/', views.today),
    path('search/', views.autocomplete),
    path('forecast/', views.forecast),
]