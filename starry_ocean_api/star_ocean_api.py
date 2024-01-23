from django.shortcuts import render
from rest_framework.views import APIView
from .star_ocean_utils import StarOceanUtils, STAR_OCEAN_CHARACTERS

############
## GET
############

# Get All Characters

class GetAllChars(APIView):
    @StarOceanUtils.handle_json_error
    @StarOceanUtils.GET_only
    def get(self, request):
        print("oh hei")
        return StarOceanUtils.good_response(STAR_OCEAN_CHARACTERS)

# Get Character

class GetChar(APIView):
    @StarOceanUtils.handle_json_error
    @StarOceanUtils.GET_only
    def get(self, request, series=None, name=None):
        if name == "all":
            all_chars_instance = GetAllChars()
            return all_chars_instance.get(request)

        character = {}

        if series and name:
            # direct lookup
            series = StarOceanUtils.get_series_name(series)
            character = STAR_OCEAN_CHARACTERS[series]["CHARACTERS"].get(name)
        elif name:
            # try a somewhat more direct lookup first
            if STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"].get(name):
                character = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"].get(name)
            elif STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"].get(name):
                character = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"].get(name)
            else:
                # non-exact name lookups
                name = name.lower()
                found = False

                for k, v in STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"].items():
                    if name in k.lower():
                        character = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"][k]
                        found = True
                        break
                    elif v.get("Alternative Name"):
                        alt_name =  v.get("Alternative Name").lower()
                        if name in alt_name:
                            character = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"][k]
                            found = True 
                            break
                if not found:
                    for k, v in STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"].items():
                        if name in k.lower():
                            character = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"][k]
                            break
                        elif v.get("Alternative Name"):
                            alt_name =  v.get("Alternative Name").lower()
                            if name in alt_name:
                                character = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"][k]
                                break


        error_details = (400, "Please provide a character name") if not name else (404, "Nothing found for that query")
        return StarOceanUtils.good_response(character) if character else StarOceanUtils.bad_response(error_details)

# Direct Lookup
class getBySeriesAndName(APIView):
    @StarOceanUtils.handle_json_error
    @StarOceanUtils.GET_only
    def get(self, request, series, name):
        character = None

        if name and series:
            character = GetChar.get_char(request, series=series, name=name)

        errors = {
            1: (400, "Please provide a valid character's full name"),
            2: (400, "Please provide a valid series. Options are 1 or 2"),
            3: (400, "Please provide a valid series. Options are 1 or 2. Also, provide a character's full name."),
            4: (404, "Nothing found for that query")
        }
        error_details = (
            errors[1] if not name else
            errors[2] if not series else
            errors[3] if not name and not series else
            errors[4]
        )
        # return good_response(request, character) if character else bad_response(error_details)
        return StarOceanUtils.good_response(character) if character else StarOceanUtils.bad_response(error_details)

# Get characters by Series
class GetCharsBySeries(APIView):
    @StarOceanUtils.handle_json_error
    @StarOceanUtils.GET_only
    def get(self, request, series):
        characters = None

        if series:
            series_name = StarOceanUtils.get_series_name(series)
            series_data = STAR_OCEAN_CHARACTERS.get(series_name)
            if series_data:
                print("got it")
                characters = series_data.get("CHARACTERS")
        error_details = (400, "Please provide a series. Options are 1 or 2") if not series else (404, "Nothing found for that query")
        return StarOceanUtils.format_response (StarOceanUtils.good_response(characters) if characters else StarOceanUtils.bad_response(error_details))
