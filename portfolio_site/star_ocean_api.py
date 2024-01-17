import json
import os 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action, api_view
from functools import wraps
from django.shortcuts import render
from django.http import JsonResponse

############
## JSON 
############

json_retrieval_error = None
def handle_json_error(view_func):
    @wraps(view_func)
    def wrapper(*args, **kwargs):
        if json_retrieval_error:
            return bad_response(json_retrieval_error)
        return view_func(*args, **kwargs)
    return wrapper

def check_for_json_error(e):
    if isinstance(e, FileNotFoundError):
        return 404, "The desired JSON file is not present. Please contact the server administrator for assistance."
    elif isinstance(e, json.JSONDecodeError):
        return 500, "There was an issue processing the JSON file. Please contact the server administrator for assistance."
    else:
        return 500, f"An unexpected error occurred: {e}"

star_ocean_chars_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'star_ocean.json')

try:
    with open(star_ocean_chars_path) as so_json:
        STAR_OCEAN_CHARACTERS = json.load(so_json)
except Exception as e:
    json_retrieval_error = check_for_json_error(e)

############
## Utility functions
############

# this is to bypass setting CORS for the whole domain (just set indidvual responses for these view functions)
def format_response(response):
    response['Access-Control-Allow-Origin'] = '*'  # Allow anyone
    response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    response['Access-Control-Allow-Headers'] = 'Authorization'
    return response

def good_response(data):
    return format_response(Response(data, status=status.HTTP_200_OK))

def format_error(error_details):
    # Provide a fall-back
    error = {"code": 500, "message": "500 Internal Server Error", "details": "Unknown Error"}

    # Provide generic message
    message = {
        400: "Bad Request",
        403: "403 Forbidden",
        404: "404 Not Found",
        405: "405 Method Not Allowed",
        500: "500 Internal Server Error"
    }

    if len(error_details) == 2:
        # Unpack it; check it
        try:
            code, details = error_details
            code = int(code)
            if not isinstance(details, str):
                raise ValueError("Invalid data type for details")
            if code not in message:
                raise ValueError("Invalid error code")
        except ValueError:
            # Handle the case where the provided code is not an integer
            code = 500
            details = "Unknown Error"

        # Provide an error
        error = {
            "code": code,
            "message":  message.get(code),
            "details": details
        }

    return error

def bad_response(error_details):
    error = format_error(error_details)
    response = {
        400: Response({"error_data": error}, status=status.HTTP_400_BAD_REQUEST),
        401: Response({"error_data": error}, status=status.HTTP_401_UNAUTHORIZED),
        403: Response({"error_data": error}, status=status.HTTP_403_FORBIDDEN),
        404: Response({"error_data": error}, status=status.HTTP_404_NOT_FOUND),
        405: Response({"error_data": error}, status=status.HTTP_405_METHOD_NOT_ALLOWED),
        406: Response({"error_data": error}, status=status.HTTP_406_NOT_ACCEPTABLE),
        429: Response({"error_data": error}, status=status.HTTP_429_TOO_MANY_REQUESTS),
        500: Response({"error_data": error}, status=status.HTTP_500_INTERNAL_SERVER_ERROR),
        502: Response({"error_data": error}, status=status.HTTP_502_BAD_GATEWAY),
        503: Response({"error_data": error}, status=status.HTTP_503_SERVICE_UNAVAILABLE),
    }
    return format_response(
            response.get(error["code"],
                Response({"error": {"code": 500, "message": "500 Internal Server Error", "details": "Unknown Error"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            )
        )

def get_series_name(series):
    if series == "1":
        series = "STAR_OCEAN_ONE"
    elif series == "2":
        series = "STAR_OCEAN_TWO"
    return series

def GET_only(view_func):
    def wrapper(self, request, *args, **kwargs):
        if request.method == 'GET':
            return view_func(self, request, *args, **kwargs)
        else:
            error_details = (405, "Method is not allowed")
            return bad_response(error_details)
    return wrapper


############
## GET
############

# Get All Characters

class GetAllChars(APIView):
    @handle_json_error
    @GET_only
    def get(self, request):
        return good_response(STAR_OCEAN_CHARACTERS)

# Get Character

class GetChar(APIView):
    @handle_json_error
    @GET_only
    def get(self, request, series=None, name=None):
        if name == "all":
            # return GetAllChars.get(request)
            all_chars_instance = GetAllChars()
            return all_chars_instance.get(request)
        characters = {}
        if series and name:
            # direct lookup
            series = get_series_name(series)
            characters = STAR_OCEAN_CHARACTERS[series]["CHARACTERS"].get(name)
        elif name:
            # try a somewhat more direct lookup first
            if STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"].get(name):
                characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_ONE"]["CHARACTERS"].get(name)
            elif STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"].get(name):
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
                elif name in "precis neumann":
                    characters = STAR_OCEAN_CHARACTERS["STAR_OCEAN_TWO"]["CHARACTERS"]["Precis F. Neumann"]

        error_details = (400, "Please provide a character name") if not name else (404, "Nothing found for that query")
        # return good_response(request, characters) if characters else bad_response(error_details)
        return good_response(characters) if characters else bad_response(error_details)

# Direct Lookup
class getBySeriesAndName(APIView):
    @handle_json_error
    @GET_only
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
        return good_response(character) if character else bad_response(error_details)

# Get characters by Series
class GetCharsBySeries(APIView):
    @handle_json_error
    @GET_only
    def get(self, request, series):
        characters = None

        if series:
            series_name = get_series_name(series)
            series_data = STAR_OCEAN_CHARACTERS.get(series_name)
            if series_data:
                print("got it")
                characters = series_data.get("CHARACTERS")

        error_details = (400, "Please provide a series. Options are 1 or 2") if not series else (404, "Nothing found for that query")
        return format_response(good_response(characters) if characters else bad_response(error_details))


