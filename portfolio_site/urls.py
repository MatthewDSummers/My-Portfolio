from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.home),
    path('projects', views.projects),
    path('resume', views.resume),
    path('contact', views.contact),
    path('have-fun', views.have_fun),
    path('certification/<str:cert_name>', views.cert_page),
    re_path(r'^docs/(?P<title>.*)$', views.doc_view),
    path('docs/starry-ocean', views.doc_view)
] 