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

    if series:
        if series == "1":
            series = "STAR_OCEAN_ONE"
        elif series == "2":
            series = "STAR_OCEAN_TWO"
        characters = STAR_OCEAN_CHARACTERS[series]["CHARACTERS"]

    if series and name:
        characters = characters.get(name)

    if name and not series:
        # direct lookups
        if STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"].get(name):
            characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"].get(name)
        if STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"].get(name):
            characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"].get(name)
        else:
            # non-exact name lookups
            name = name.lower()

            # STAR OCEAN ONE
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
            
            # STAR OCEAN 2
            elif name in "claude" or name in "crawde" or name in "kenny":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Claude C. Kenny"]
            elif name in "rena" or name in "lanford":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Rena Lanford"]
            elif name in "dias" or name in "flac":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Dias Flac"]
            elif name in "ashton" or name in "anchors":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Ashton Anchors"]

    if not series and not name:
        combined_chars = {**STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"], **STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]}
        characters = combined_chars

    return JsonResponse(characters) if characters else HttpResponseNotFound({"error": "Nothing found for that query"})
