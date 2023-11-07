from django.shortcuts import render
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import SaleSerializer, SpentSerializer
from django.http import HttpResponse, JsonResponse


def send_to_homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(["GET", "POST"])
def sale(request):
    """
        GET: Returns a list of all posts 
        POST: Create a new category
    """

    if request.method == 'GET':
        sales = Sale.objects.all()
        sales_data = []

        for sale in sales:
            sale_data = {
                "name": sale.sale_item_name,
                "uv": float(sale.sale_total),
                "pv": sale.sale_qty
            }
            sales_data.append(sale_data)

        return Response(sales_data)

    elif request.method == 'POST':
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

@api_view(["GET", "POST"])
def spent(request):
    """
        GET: Returns a list of all posts 
        POST: Create a new category
    """

    if request.method == 'GET':
        categories = Spent.objects.all()
        serializer = SpentSerializer(categories, many=True )
        cost_values = [item['spent_total'] for item in serializer.data]
        return Response(cost_values)
        

    elif request.method == 'POST':
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)