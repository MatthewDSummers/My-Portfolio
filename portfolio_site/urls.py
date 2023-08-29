from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('projects', views.projects),
    path('resume', views.resume),
    path('contact', views.contact),
    path('have-fun', views.have_fun),
    # path('form', views.form),
]
