from django.urls import path, re_path
from .star_ocean_api import GetChar, GetAllChars, GetCharsBySeries, getBySeriesAndName
from . import views

urlpatterns = [
    path('', views.home),
    path('projects', views.projects),
    path('resume', views.resume),
    path('contact', views.contact),
    path('have-fun', views.have_fun),

    re_path(r'^docs/(?P<title>.*)$', views.doc_view, name="docs"),
    # path('starry-ocean/characters/<str:name>', GetChar.as_view(), name="get-chars"),
    # path('starry-ocean/characters/all', GetAllChars.as_view(), name="get-all-chars"),
    re_path(r'^starry-ocean/characters/(?P<name>.*)$', GetChar.as_view(), name="get-chars"),

    path('starry-ocean/series/<str:series>', GetCharsBySeries.as_view(), name="get-chars-by-series"),
    path('starry-ocean/series/<str:series>/characters/<str:name>', getBySeriesAndName.as_view(), name="get-by-series-and-name")
] 