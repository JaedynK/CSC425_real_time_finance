from django.shortcuts import render
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import SaleSerializer, SpentSerializer
from django.http import HttpResponse, JsonResponse


def send_to_homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

# this is for all request sale
@api_view(["GET", "POST"])
def sale(request):
    if request.method == 'GET':
        sales = Sale.objects.all()
        serializer = SaleSerializer(sales, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)  # Return 201 Created on success
        return Response(serializer.errors, status=400)  # Return 400 Bad Request on validation failure

# this is for all request spent
@api_view(["GET", "POST"])
def spent(request):
    if request.method == 'GET':
        spents = Spent.objects.all()
        serializer = SpentSerializer(spents, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SpentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)  # Return 201 Created on success
        return Response(serializer.errors, status=400)  # Return 400 Bad Request on validation failure