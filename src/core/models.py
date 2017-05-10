import uuid
from django.db import models
from accounts.models import User

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=100, null=False, blank=False)

    user = models.ForeignKey(User)

class Expense(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    title = models.CharField(max_length=100, null=False, blank=False)

    description = models.CharField(max_length=128)

    date = models.CharField(max_length=128)

    dollar = models.IntegerField(null=False, blank=False)

    cent = models.IntegerField(null=False, blank=False)
