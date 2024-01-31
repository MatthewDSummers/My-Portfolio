from django.shortcuts import render, redirect
from django.urls import reverse
import os
import json
import re
# Create your views here.

def home(request):
    context = {
        "home":"active",
        "title": "Portfolio",
        "page_description": "Welcome to the portfolio of Full-Stack Web Developer Matthew Summers."
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
            context["page_description"] = "Ticket Easy is a dynamic support ticket system built with Django to help businesses manage and resolve their internal issues as well as provide analytics for identifying problematic trends."
        elif request.GET["title"] == "Stream-Bunny":
            context["title"] = "Stream Bunny"
            context["project"] = "stream-bunny"
            context["url"] = "/stream-bunny/"
            context["page_description"] = "Stream Bunny is a place where people can find what platforms to stream films or series."
        elif request.GET["title"] == "session-tracker":
            context["title"] = "Session Tracker"
            context["project"] = "session-tracker"
            context["url"] = "/session-tracker/"
            context["page_description"] = "A tool to help businesses list their packages and offers and to help manage the redemption of a package's sessions. Ideal for services such as personal training, therapy, coaching, tutoring, lawn services, and other similar types of services."
        elif request.GET["title"] == "my-moogle":
            context["title"] = "My Moogle"
            context["project"] = "my-moogle"
            context["url"] = "/my-moogle/"
            context["page_description"] = "A compendium of Final Fantasy (© Square Enix) characters which uses the Moogle API as well as the Wikipedia API"

            # for dymanic control of FF page 
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
        context["page_description"] = "The personal projects page of Matthew Summers, Full-Stack Website Developer."

    if context["title"] == "My Moogle":
        return render(request, "final-fantasy.html", context)
    return render(request, "projects.html", context)

def resume(request):
    context = {
        "resume":"active",
        "title": "Resume",
        "page_description": "The CV of Matthew Summers, Full-Stack Website Developer."
    }
    return render(request, "resume.html", context)

def contact(request):
    context = {
        "contact":"active",
        "title": "Contact",
        "page_description": "Contact page for Matthew Summers, Full-Stack Website Developer."
    }
    return render(request, "contact.html", context)

def have_fun(request):
    context = {
        "have_fun":"active",
        "title": "Have Fun",
        "page_description": "Play games; tell jokes. Matthew Summers, Full-Stack Website Developer."
    }
    return render(request, "games.html", context)


def doc_view(request, title):
    page_description = "Documentation of Matthew Summers, Full-Stack Website Developer."
    if not title:
        title = "Documentation"
    elif title == "starry-ocean":
        title = "Starry Ocean API Documentation"
        page_description = "Starry Ocean API Documentation"
    context = {
        "docs_nav":"active",
        "title": title,
        "page_description": page_description
    }
    print(title)


    if title == "Documentation":
        return render(request, "docs.html", context)
    else:
        return redirect(reverse('starry_ocean:docs'))
