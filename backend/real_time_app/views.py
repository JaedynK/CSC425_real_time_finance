from django.shortcuts import render

@api_view(["GET", "POST"])
def categories(request):
    """
        GET: Returns a list of all posts 
        POST: Create a new category
    """

    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True )
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
