from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    video = models.FileField(upload_to='movies/')
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
