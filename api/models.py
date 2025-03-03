from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    currency = models.CharField(max_length=3, default="KZT")  # Например, USD, EUR, KZT

    USERNAME_FIELD = "email"  # Теперь логинимся по email
    REQUIRED_FIELDS = ["username"]  # Поля, обязательные при регистрации

    def __str__(self):
        return self.email

