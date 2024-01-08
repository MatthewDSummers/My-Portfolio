from django.urls import path, re_path

from . import views
from . import star_ocean_api as star_ocean

urlpatterns = [
    path('', views.home),
    path('projects', views.projects),
    path('resume', views.resume),
    path('contact', views.contact),
    path('have-fun', views.have_fun),
    # re_path(r'^star-ocean/(?P<series>\w+)/(?P<name>\w+)/$', star_ocean.star_ocean_chars_list, name="star-ocean-chars"),
    # re_path(r'^star-ocean/(?P<series>\w+)/(?P<name>[\w\-?]+)/$', star_ocean.star_ocean_chars_list, name="star-ocean-chars")
    # path('form', views.form),
    path('star-ocean', views.projects, name="star-ocean-page"),
    path('star-ocean/chars', star_ocean.star_ocean_chars_list, name="star-ocean-chars")
]
