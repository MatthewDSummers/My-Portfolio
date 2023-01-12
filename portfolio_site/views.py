from django.shortcuts import render

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
        elif request.GET["title"] == "Stream-Bunny":
            context["title"] = "Stream Bunny"
            context["project"] = "stream-bunny"
        elif request.GET["title"] == "session-tracker":
            context["title"] = "Session Tracker"
            context["project"] = "session-tracker"
    else:
        context["title"] = "Projects"

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