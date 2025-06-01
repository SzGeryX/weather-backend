from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from dotenv import load_dotenv
import requests, os, json, datetime


load_dotenv()

# Create your views here.

BASE = "https://api.weatherapi.com/v1/"
API_KEY = "key=" + os.getenv("API_KEY") + "&lang=hu"
API = {
    "current": "current.json?",
    "forecast": "forecast.json?",
    "astronomy": "astronomy.json?",
    "search": "search.json?",
}

def index(req):
    return render(req, "index.html")

@csrf_exempt
def today(req):
    location = json.loads(req.body)["location"]

    c = requests.get(BASE + API["current"] + f"q={location}&" + API_KEY).json()

    if "error" in c:
        return JsonResponse(c["error"])

    location = c["location"]["name"]
    c = c["current"]

    a = requests.get(BASE + API["astronomy"] + f"q={location}&" + API_KEY).json()["astronomy"]["astro"]

    return JsonResponse({
        "location": location,
        "last_updated": c["last_updated"],
        "temp": c["temp_c"],
        "feelslike": c["feelslike_c"],
        "condition_text": c["condition"]["text"],
        "condition_img": c["condition"]["icon"][2:],
        "windspeed": c["wind_kph"],
        "pressure": c["pressure_mb"],
        "humidity": c["humidity"],
        "uv": c["uv"],
        "sunrise": a["sunrise"],
        "sunset": a["sunset"],
        "moonrise": a["moonrise"],
        "moonset": a["moonset"],
    })

@csrf_exempt
def autocomplete(req):
    query = json.loads(req.body)["query"]
    a = requests.get(BASE + API["search"] + f"q={query}&" + API_KEY).json()

    res = {
        "names": []
    }

    for i in a:
        res["names"].append(i["name"])

    return JsonResponse(res)

@csrf_exempt
def forecast(req):
    location = json.loads(req.body)["location"]
    days = json.loads(req.body)["days"] + 1
    f = requests.get(BASE + API["forecast"] + f"q={location}&days={days}&" + API_KEY).json()

    if "error" in f:
        return JsonResponse(f)

    res = []
    for i in f["forecast"]["forecastday"]:
        if datetime.datetime.strptime(i["date"], "%Y-%m-%d").date() == datetime.date.today():
            continue

        day = i["day"]
        astro = i["astro"]
        res.append({
            "date": i["date"],
            "maxtemp": day["maxtemp_c"],
            "mintemp": day["mintemp_c"],
            "avgtemp": day["avgtemp_c"],
            "maxwind_kph": day["maxwind_kph"],
            "avghumidity": day["avghumidity"],
            "condition_text": day["condition"]["text"],
            "condition_icon": day["condition"]["icon"][2:],
            "uv": day["uv"],
            "chance_of_rain": day["daily_chance_of_rain"],
            "sunrise": astro["sunrise"],
            "sunset": astro["sunset"],
            "moonrise": astro["moonrise"],
            "moonset": astro["moonset"],
        }) 

    return JsonResponse({"days": res})