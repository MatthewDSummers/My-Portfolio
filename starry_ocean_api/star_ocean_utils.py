import os
import json
from rest_framework.response import Response
from rest_framework import status
from functools import wraps

############
## Utility functions
############

class StarOceanUtils:
    # this is to bypass setting CORS for the whole domain (and instead, just set allowance of responses for only these methods)
    @staticmethod
    def format_response(response):
        response['Access-Control-Allow-Origin'] = '*'  # Allow anyone
        response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Authorization'
        return response

    @staticmethod
    def good_response(data):
        utils_instance = StarOceanUtils()
        return utils_instance.format_response(Response(data, status=status.HTTP_200_OK))

    @staticmethod
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

    @staticmethod
    def bad_response(error_details):
        utils_instance = StarOceanUtils()
        error = utils_instance.format_error(error_details)
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
        utils_instance = StarOceanUtils()
        return utils_instance.format_response(
                response.get(error["code"],
                    Response({"error": {"code": 500, "message": "500 Internal Server Error", "details": "Unknown Error"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                )
            )

    @staticmethod
    def get_series_name(series):
        if series == "1":
            series = "STAR_OCEAN_ONE"
        elif series == "2":
            series = "STAR_OCEAN_TWO"
        return series

    @staticmethod
    def GET_only(view_func):
        def wrapper(self, request, *args, **kwargs):
            if request.method == 'GET':
                return view_func(self, request, *args, **kwargs)
            else:
                error_details = (405, "Method is not allowed")
                utils_instance = StarOceanUtils()
                return utils_instance.bad_response(error_details)
        return wrapper

    @staticmethod
    def handle_json_error(view_func):
        @wraps(view_func)
        def wrapper(*args, **kwargs):
            if json_retrieval_error:
                return StarOceanUtils.bad_response(json_retrieval_error)
            return view_func(*args, **kwargs)
        return wrapper

    @staticmethod
    def check_for_json_error(e):
        if isinstance(e, FileNotFoundError):
            return (404, "The desired JSON file is not present. Please contact the server administrator for assistance.")
        elif isinstance(e, json.JSONDecodeError):
            return (500, "There was an issue processing the JSON file. Please contact the server administrator for assistance.")
        else:
            return (500, f"An unexpected error occurred: {e}")

############
## JSON 
############

star_ocean_chars_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'star_ocean.json')
json_retrieval_error = None


try:
    with open(star_ocean_chars_path) as so_json:
        STAR_OCEAN_CHARACTERS = json.load(so_json)

except Exception as e:
    json_retrieval_error = StarOceanUtils.check_for_json_error(e)
