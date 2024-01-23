from django.urls import path, re_path
from .star_ocean_api import *
from .view import doc_view, main_view
app_name =  "starry_ocean"

urlpatterns = [
    path('', main_view),
    path('docs', doc_view, name="docs"),
    re_path(r'^characters/(?P<name>.*)$', GetChar.as_view(), name="get-chars"),
    path('series/<str:series>', GetCharsBySeries.as_view(), name="get-chars-by-series"),
    path('series/<str:series>/characters/<str:name>', getBySeriesAndName.as_view(), name="get-by-series-and-name")
]