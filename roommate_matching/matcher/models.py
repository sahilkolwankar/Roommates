from django.db import models

# Create your models here.

class Matcher(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    # Will add date automatically
    created_at = models.DateTimeField(auto_now_add=True)