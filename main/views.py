from django.shortcuts import render, redirect
from .models import Leaderboard


def index(request):
    return render(request, 'main/index.html')


def about(request):
    return render(request, 'main/about.html')


def leaderboard(request):
    scores = Leaderboard.objects.order_by('-score')
    positive_scores = 0
    for x in scores:
        if x.score > 0:
            positive_scores = positive_scores + 1
    return render(request, 'main/leaderboard.html', {'scores': scores, 'positive_scores': positive_scores})


def quiz(request):
    return render(request, 'main/quiz.html')


def adding(request):
    # name = request.object.post.pk
    name = request.GET.get("name", "Anonymous")
    score = request.GET.get("score", 0)

    leaderboard_ = Leaderboard()
    leaderboard_.name = name
    leaderboard_.score = score
    leaderboard_.save()
    return render(request, 'main/quiz.html')

