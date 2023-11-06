from django.db import models

class Spent(models.Model):
    spent_total = models.CharField(max_length= 25)

    def __str__(self) -> str:
        return f"{self.category_title}"
