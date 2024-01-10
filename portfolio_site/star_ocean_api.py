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
            elif name in "milli chliette":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Millie Chliette"]
            elif name in "dorn murtough":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Dorn Murtough"]
            elif name in "ronyx":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Ronyx J. Kenny"]
            elif name in "ilia silvestri":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Ilia Silvestri"]
            elif name in "cyuss warren":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Cyuss Warren"]
            elif name in "phia melle":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Phia Melle"]
            elif name in "ashlay bernbeldt":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Ashlay Bernbeldt"]
            elif name in "ioshua jerand":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Ioshua Jerand"]
            elif name in "mavelle froesson":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Mavelle Froesson"]
            elif name in "t'nique arcana" or name in "tnique arcana":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["T'nique Arcana"]
            elif name in "erys":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Erys Jerand"]
            elif name in "welch vineyard":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"]["Welch Vineyard"]
            
            # STAR OCEAN 2
            elif name in "claude kenny" or name in "crawde kenny":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Claude C. Kenny"]
            elif name in "rena landford":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Rena Lanford"]
            elif name in "dias flac":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Dias Flac"]
            elif name in "bowman jeane":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Bowman Jeane"]
            elif name in "leon d.s. gehste" or name in "leon ds gehste":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Leon D.S. Gehste"]
            elif name in "ashton anchors":
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Ashton Anchors"]

    if not series and not name:
        combined_chars = {**STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"], **STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]}
        characters = combined_chars

    return JsonResponse(characters) if characters else HttpResponseNotFound({"error": "Nothing found for that query"})
