#API ACCIO

## Le premier version fonctionel se trouve sur la Branche Alicia
##Sommaire

- [**INFORMATION**](#INFORMATION)
	- [Introduction](#Introduction)
	- [Install Environnement](#Install-Environnement)
	- [Install]()
	- [Prepare Running]()
- [**Arrêtes VA**]()
	- [Ajouter un point VA]()
	- [Obtenir tous les points VA]()
	- [Delete un point VA]()
	- [Obtenir information d'un certain point]()
- [**Voiture Auto**]()
	- [Creation d'un VA]()
	- [Obtenir toutes les infos VAs]()	
	- [Montrer d'un Utilisateur]()
	- [Decendre d'un Utilisateur]()
	- [Mise A Jour Loc du VA](#Mise-A-jour-Loc-du-VA)
- [**Utilisateur**]()
	- [Create Utilisateur]()
	- [Get All Utilisateur]()
	- [Get Utilisateur By Id]()
	- [Delete Utilisateur]()
	- [Ajouter Trajet Utilisateur]()




###INFORMATION
####Introduction
Dans ce projet intense, nous voulons de optimiser le problème du "decision making" de voiture auto. Le projet est divisé en 3 parties, une partie de **Service(ce projet)** pour la décision, une partie du **logiciel device Android** pour la côté Client, et une partie du **GPS Voiture Auto** qui mise à jour à chaque l'instant la position de la voiture et la comportement montré/décentre client. 

####Install Environnement
__Dependance:__
Pour installation voir le site officiel du logiciels listés ci-dessous:
 
- NodeJS
- Express
- Express-generator
- MongoDB

####Install

- Créer la répertoire pour la base de données
- Installer dépendances du projet avec npm
- Mettre en démarche MongoDB avec ___mongod___ 
- **Start** le projet avec npm start

~~~bash
rm -rf ./data
mkdir data
npm install
mongod --dbpath ./data 
npm start
~~~


####Prepare Running

Il faut préparer les données pour tester. Les données des arrêtes se trouvent sur la répertoire **ArretsData**, pour l'installer: 

~~~bash
cd ArretsData
python post.py
~~~




###Arrêtes VA
Resemblable à l'arret BUS, qui sert à positioner le point intérêt de notre service.

####Ajouter un point VA

- **Type Request**: POST
- **Content-Type**: application/json
- **Params du Body**:
	- location: 
		- lat:Num
		- lon:Num
	- nom: String
- **exemple**:

~~~bash
curl -X POST "http://localhost:3000/arrets" -H "Content-Type: application/json" -d '{"location":{"lat":49.18165,"lon":-0.34709},"nom":"Le Dôme"}'
~~~

####Obtenir tous les points VA

- **Type Request**: GET
- **Content-Type**: application/json
- **Params du Body**: null
- **exemple**:

~~~bash
curl -X GET http://localhost:3000/arrets
~~~

####Delete un point VA
- **Type Request**: DELETE
- **Content-Type**: application/json
- **Params du Body**:null
- **exemple**:

~~~bash
curl -X DELETE "http://localhost:3000/arrets/58756def64f0a665246e9aa1"
~~~



####Obtenir information d'un certain point

- **Type Request**: GET
- **Content-Type**: application/json
- **Params du Body**: null
- **exemple**:

~~~bash
curl -X GET "http://localhost:3000/arrets/58756def64f0a665246e9aa1"
~~~

###Voiture Auto
####Creation d'un VA

~~~bash
# Create une VA:
curl -X POST "http://localhost:3000/va/create" -H "Content-Type: application/json" -d '{"loc":{"lat":49.18165,"lon":-0.34709},"nbrPersonne":1, "capacite":7, "dispo": true, "onMovement": true}'
~~~
####Obtenir toutes les infos VAs	

~~~bash

# Obtenir toutes VA:
curl http://localhost:3000/va/all
~~~

####Obtenir les infos du certain VA

~~~bash
http://localhost:3000/va/5876402fd48d458950a43839
~~~

####Delete une VA avec Id

~~~bash
curl -X DELETE http://localhost:3000/va/5876402fd48d458950a43839
~~~


####Montrer d'un Utilisateur

~~~bash
curl -X POST "http://localhost:3000/va/58765bdb42adc39073f88679/montrer" -H "Content-Type: application/json" -d '{"loc":{"lat":49.18165,"lon":-0.44}, "newClient":"58766603180d8e93b1375b37", "newTrajetVa":[{"lon":111,"lat":111},{"lon":2,"lat":222}], "trajetUserID":"58766603180d8e93b1375b37"}'
~~~

####Decendre d'un Utilisateur

~~~bash
curl -X POST "http://localhost:3000/va/58765bdb42adc39073f88679/decendre" -H "Content-Type: application/json" -d '{"loc":{"lat":49.18165,"lon":-0.45}, "newClient":"58766603180d8e93b1375b37", "newTrajetVa":[{"lon":111,"lat":111},{"lon":2,"lat":222}], "trajetUserID":"58766603180d8e93b1375b37"}'
~~~
####Mise A Jour Loc du VA

~~~bash
curl -X POST "http://localhost:3000/va/58765bdb42adc39073f88679/misajour" -H "Content-Type: application/json" -d '{"loc":{"lat":49.18165,"lon":-0.45}, "newTrajetVa":[{"lon":111,"lat":111},{"lon":2,"lat":333}]}'
~~~



###Utilisateur
####Create Utilisateur

~~~bash
curl -X POST "http://localhost:3000/users/create" -H "Content-Type: application/json" -d '{"username":"
lilei", "email":"Lilei@gmail.com", "passwordSalt":"passwordLilei", "role":"0"}'
~~~


####Get All Utilisateur

~~~bash
curl http://localhost:3000/users
~~~

####Get Utilisateur By Id

~~~bash
curl http://localhost:3000/users/587665e0180d8e93b1375b36
~~~

####Delete Utilisateur

~~~bash
curl -X DELETE http://localhost:3000/users/587665e0180d8e93b1375b36
~~~

####Ajouter Trajet Utilisateur

~~~bash
curl -X POST "http://localhost:3000/users/58766603180d8e93b1375b37/addtrajet" -H "Content-Type: application/json" -d '{"depart":{"lon":123,"lat":456},"arrivee":{"lon":321,"lat":543}, "reserve":false, "timeStamp":3333, "maxAttant":44444}'
~~~








