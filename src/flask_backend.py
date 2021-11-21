from flask import Flask, request
from flask.json import jsonify
import requests
from flask_cors import CORS
from werkzeug.wrappers import response
 
app = Flask(__name__)
CORS(app)

@app.route('/restaurants')
def restaurants():
    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')

    url = f"https://api.yelp.com/v3/businesses/search?longitude={longitude}&latitude={latitude}&limit=50&open_now=True"

    payload={}
    headers = {
    'Authorization': 'Bearer -H8Dnu2uALRKUrwpF5cSqcGA8lBv6joalBJeYgr4FtWLlYKBqwjORHwLx2y41M56o6bz0HiF6VNsQm9AmyC37k0rVSr1IwuhpEOcMPGGh3REzv-J7fr0wESOTWaZYXYx'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    return jsonify(response.json())


@app.route('/directions')
def directions():
    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')
    url = f"https://maps.google.com/?q={latitude},{longitude}"

    return url

app.run()