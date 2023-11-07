from rest_framework import serializers
from .models import *

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model= Sale
        fields = '__all__'

class SpentSerializer(serializers.ModelSerializer):
    class Meta:
        model= Spent
        fields = '__all__'