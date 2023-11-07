from django.db import models

class Sale(models.Model):
    sale_total = models.DecimalField(decimal_places=3, max_digits= 25)
    sale_qty = models.IntegerField()
    sale_item_name = models.CharField(max_length= 25)
    emp_name = models.CharField(max_length= 25)

    def __str__(self) -> str:
        return f"{self.sale_item_name}"

class Spent(models.Model):
    spent_total = models.DecimalField(decimal_places=3, max_digits= 25)
    spent_qty = models.IntegerField()
    spent_item_name = models.CharField(max_length= 25)
    catagory = models.CharField(max_length= 25)

    def __str__(self) -> str:
        return f"{self.spent_item_name}"
