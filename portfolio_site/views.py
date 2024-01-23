from django.shortcuts import render, redirect
from django.urls import reverse
import os
import json
import re
# Create your views here.

def home(request):
    context = {
        "home":"active",
        "title": "Portfolio"
    }
    return render(request, "home.html", context)

def projects(request):
    context = {
        "projects":"active"
    }

    if "title" in request.GET:
        context["single"] = True
        if request.GET["title"] == "Ticket-Easy":
            context["title"] = "Ticket Easy"
            context["project"] = "ticket-easy"
            context["url"] = "/ticket-easy/"
        elif request.GET["title"] == "Stream-Bunny":
            context["title"] = "Stream Bunny"
            context["project"] = "stream-bunny"
            context["url"] = "/stream-bunny/"
        elif request.GET["title"] == "session-tracker":
            context["title"] = "Session Tracker"
            context["project"] = "session-tracker"
            context["url"] = "/session-tracker/"
        elif request.GET["title"] == "my-moogle":
            context["title"] = "My Moogle"
            context["project"] = "my-moogle"
            context["url"] = "/my-moogle/"

            if request.GET.get('game'):
                game_parameter = request.GET.get('game')
            else:
                game_parameter = "non"
            context["game_parameter"] = game_parameter

        # elif request.GET["title"] == "starry-ocean":
        #     context["title"] = "Starry Ocean"
        #     context["project"] = "star-ocean"
        #     context["url"] = "/star-ocean/"
        #     return render(request, "star-ocean.html", context)

    else:
        context["title"] = "Projects"

    if context["title"] == "My Moogle":
        return render(request, "final-fantasy.html", context)
    return render(request, "projects.html", context)

def resume(request):
    context = {
        "resume":"active",
        "title": "Resume"
    }
    return render(request, "resume.html", context)

def contact(request):
    context = {
        "contact":"active",
        "title": "Contact"
    }
    return render(request, "contact.html", context)

def have_fun(request):
    context = {
        "have_fun":"active",
        "title": "Have Fun"
    }
    return render(request, "games.html", context)


def doc_view(request, title):
    if not title:
        title = "Documentation"

    elif title == "starry-ocean":
        title = "Starry Ocean API Documentation"

    context = {
        "docs_nav":"active",
        "title": title,
    }
    print(title)


    if title == "Documentation":
        return render(request, "docs.html", context)
    else:
        return redirect(reverse('starry_ocean:docs'))
