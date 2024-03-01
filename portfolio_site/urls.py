from django.urls import path, re_path
from . import views
from django.http import HttpResponse, HttpResponseRedirect

urlpatterns = [
    path('', views.home),
    path('projects', views.projects),
    path('resume', views.resume),
    path('contact', views.contact),
    path('have-fun', views.have_fun),
    path('certification/', lambda request: HttpResponseRedirect("/")),
    re_path(r'^certification/(?P<school_name>[\w-]+)/(?:(?P<course_name>[\w-]+)/)?$', views.cert_page),
    re_path(r'^docs/(?P<title>.*)$', views.doc_view),
    path('docs/starry-ocean', views.doc_view)
] 