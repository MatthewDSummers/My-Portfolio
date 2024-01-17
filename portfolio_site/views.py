from django.shortcuts import render, redirect
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

        elif request.GET["title"] == "starry-ocean":
            context["title"] = "Starry Ocean"
            context["project"] = "star-ocean"
            context["url"] = "/star-ocean/"
            return render(request, "star-ocean.html", context)

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


# def form(request):
#     x = request.GET["searched"]

#     script_dir = os.path.dirname(__file__)

#     file_path = os.path.join(script_dir, 'KJV.json')

#     with open(file_path, 'r') as f:
#         data = json.load(f)
#         results = []
#         for word in data:
#             if x in  re.findall(r'\b\w+\b', word[u'verse']):
#                 word[u'verse'] = word[u'verse'].replace(x, x.upper())
#                 results.append((word[u'name'], word[u'verse']))
#         for x in results:
#             print(x[0])
#             print(x[1])
#             print("\n")
#     context = {"results": results}
#     return render(request, "home.html", context)

def doc_view(request, title):
    if not title:
        title = "Documentation"
    elif title == "starry-ocean":
        title = "Starry Ocean API Documentation"

    context = {
        "docs_nav":"active",
        "title": title,
    }
    return render(request, "docs.html", context)

