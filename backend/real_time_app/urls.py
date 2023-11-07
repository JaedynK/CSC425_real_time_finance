from django.urls import path
from . import views


urlpatterns = [
    path('', views.send_to_homepage, name='homepage'),
    path('sale/', views.sale),
    path('spent/', views.spent),
]