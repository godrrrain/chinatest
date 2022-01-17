from django.db import models


class Leaderboard(models.Model):
    name = models.CharField('Member name', max_length=18)
    score = models.IntegerField('Score')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Score'
        verbose_name_plural = 'Scores'
