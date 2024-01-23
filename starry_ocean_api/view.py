from django.shortcuts import render

def main_view(request):
    ajax = request.GET.get("ajax")
    html_file_name = "starry_ocean_templates/starry-ocean-partial.html" if ajax else "starry_ocean_templates/starry-ocean.html"
    print(html_file_name)

    context = {}
    context["title"] = "Starry Ocean"
    context["project"] = "star-ocean"
    context["url"] = "/star-ocean/"
    return render(request, html_file_name, context)

def doc_view(request):
    ajax = request.GET.get("ajax")
    html_file_name = "starry_ocean_templates/starry-ocean-docs-partial.html" if ajax else "starry_ocean_templates/starry-ocean-docs.html"

    print(html_file_name, "the name")
    context = {
        "docs_nav":"active",
    }
    return render(request, html_file_name, context)
