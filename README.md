#API ACCIO
##Sommaire

- [**INFORMATION**]()
	- [Introduction]()
	- [Install Environnement]()
	- [Install]()
	- [Running]()
- [**Arrêtes VA**]()
	- [Ajouter un point VA]()
	- [Obtenir tous les points VA]()
	- [Delete un point VA]()
	- [Obtenir information d'un certain point]()
- [**Voiture Auto**]()
	- [Creation d'un VA]()
	- [Obtenir toutes les infos VAs]()	
- [**Utilisateur**]()
	- [Create Utilisateur]()
	- [Get All Utilisateur]()
	- [Get Utilisateur By Id]()
	- [Delete Utilisateur]()




###INFORMATION
####Introduction
####Install Environnement
__Dependance:__

- NodeJS
- Express
- Express-generator
- MongoDB

####Install

~~~bash
mkdir data
npm install
mongod --dbpath ./data 
npm start
~~~


####Running

Il faut préparer les données pour tester. Les données des arrêtes se trouvent sur la répertoire **ArretsData**, pour l'installer: 

~~~bash
cd ArretsData
python post.py
~~~




**API ArretsBus**

~~~bash
curl -X POST "http://localhost:3000/arrets" -H "Content-Type: application/json" -d '{"location":{"lat":49.18165,"lon":-0.34709},"nom":"Le Dôme"}'

curl -X DELETE "http://localhost:3000/arrets/58756def64f0a665246e9aa1"

curl -X GET http://localhost:3000/arrets
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





