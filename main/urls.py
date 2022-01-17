from django.urls import path
from . import views
from django.views.generic import TemplateView


urlpatterns = [
    path('', views.index),
    path('about', views.about),
    path('leaderboard', views.leaderboard),
    path('quiz', views.quiz),
    path('adding/', views.adding)
]
