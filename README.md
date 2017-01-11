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



**Running**




**API ArretsBus**

~~~bash
curl -X POST "http://localhost:3000/arrets" -H "Content-Type: application/json" -d '{"location":{"lat":49.18165,"lon":-0.34709},"nom":"Le Dôme"}'

curl -X DELETE "http://localhost:3000/arrets/58756def64f0a665246e9aa1"

curl -X GET http://localhost:3000/arrets
~~~

