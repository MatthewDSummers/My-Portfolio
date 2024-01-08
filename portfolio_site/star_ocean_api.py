from django.http import JsonResponse, HttpResponseNotFound
import json
import os 

star_ocean_chars = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'star_ocean.json')
print(star_ocean_chars)
with open(star_ocean_chars) as so_json:
    STAR_OCEAN_CHARACTERS = json.load(so_json)

def star_ocean_chars_list(request):
    series = request.GET.get("series")
    name = request.GET.get("name")
    characters = {}
    if series and not name:
        if series == "1":
            characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]
            print(characters)
        elif series == "2":
            characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]
        else:
            characters = HttpResponseNotFound("Nothing found for that query")

    if name:
        # direct lookups
        if STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"].get(name):
            characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"].get(name)
        if STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"].get(name):
            characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"].get(name)
        else:
            # non-exact name lookups
            name = name.lower()

            if name in "roddick" or name in "raddix" or name in "ratix" or name in "farrence":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Roddick Farrence"]
            elif name in "millie" or name in "chliette":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Millie Chliette"]
            elif name in "dorne" or name in "murtough":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Dorn Murtough"]
            elif name in "ronyx":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Ronyx J. Kenny"]
            elif name in "ilia" or name in "silvestri":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Ilia Silvestri"]
            elif name in "cyuss" or name in "warren":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Cyuss Warren"]
            elif name in "phia" or name in "melle":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Phia Melle"]
            elif name in "ashlay" or name in "bernbeldt":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Ashlay Bernbeldt"]
            elif name in "ioshua" or name in "jerand":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Ioshua Jerand"]
            elif name in "mavelle" or name in "froesson":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Mavelle Froesson"]
            elif name in "t'nique" or name in "tnique" or name in "arcana":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["T'nique Arcana"]
            elif name in "erys":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Erys Jerand"]
            elif name in "welch" or name in "vineyard":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Welch Vineyard"]
            

    if not series and not name:
        combined_chars = {**STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"], **STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]}
        characters = combined_chars

    return JsonResponse(characters) if characters else HttpResponseNotFound({"error": "Nothing found for that query"})
    # else:
    #     return HttpResponseNotFound("Nothing found for that query")
