import json
import os
from pprint import pprint

with open('arrets.json') as data_file:    
    data = json.load(data_file)

for arret in data['arrets'] :
	nom = arret['nom']
	lon = arret['lon']
	lat = arret['lat']
	req = "curl -X POST \"http://localhost:3000/arrets\" -H \"Content-Type: application/json\" -d \'{\"location\":{\"lat\":%f,\"lon\":%f},\"nom\":\"%s\"}\'" % (lat, lon, nom)
	os.system(req)