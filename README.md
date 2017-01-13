#API ACCIO
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
- [**Centre Contrôleur**]
	- [Recevoir Demande Utilisateur]()




###INFORMATION
####Introduction
Dans le cadre d'un projet informatique intensif, nous avons réalisé une application Android permettant de planifier le trajet optimal d'un véhicule autonome pour plusieurs personnes, de façon dynamique. Le projet est divisé en 3 parties, une partie de **Service (ce projet)** pour la décision de l'itinéraire selon les réservations des utilisateurs, une partie pour l'**Application Android** pour la côté Client, et une partie pour le **GPS Véhicule Autonome** qui met à jour en temps réel la position du véhicule autonome et le comportement de montée/descente du client. 


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
- **Start** le projet avec ___npm start___

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
C'est un point de chute semblable à un arrêt de bus, qui est adapté selon la condition du client.

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
- **Type Request**: POST
- **Content-Type**: application/json
- **Params du Body**: 

~~~json
{

    "loc":{
        "lat":49.18165,
        "lon":-0.34709
    },
    "nbrPersonne":1,
    "capacite":7,
    "dispo":true,
    "onMovement":true

}
~~~
- **exemple**:



~~~bash
# Create une VA:
curl -X POST "http://localhost:3000/va/create" -H "Content-Type: application/json" -d '{"loc":{"lat":49.18165,"lon":-0.34709},"nbrPersonne":1, "capacite":7, "dispo": true, "onMovement": true}'
~~~
####Obtenir toutes les infos VAs	

- **Type Request**: GET
- **Content-Type**: application/json
- **Params du Body**: null
- **exemple**:

~~~bash

# Obtenir toutes VA:
curl http://localhost:3000/va/all
~~~

- Réponse: 

~~~json 
[

    {
        "_id":"5877dbc45e8663dc21c7e977",
        "loc":{
            "lat":49.2228327,
            "lon":-0.370879
        },
        "nbrPersonne":1,
        "capacite":7,
        "dispo":true,
        "onMovement":true,
        "__v":1,
        "detailsUsers":[
            {
                "userID":"5877db1c5e8663dc21c7e974",
                "_id":"5877dcbd5e8663dc21c7e97c",
                "arrivee":{
                    "lat":49.2092824,
                    "lon":-0.3671516
                },
                "depart":{
                    "lat":49.2228327,
                    "lon":-0.370879
                }
            }
        ],
        "trajetUsers":[
            "58775e36c6e5c5b54fcf5174"
        ],
        "trajetVa":[
            {
                "lat":49.2228327,
                "lon":-0.370879,
                "_id":"5877dcbd5e8663dc21c7e97b"
            },
            {
                "lat":49.2092824,
                "lon":-0.3671516,
                "_id":"5877dcbd5e8663dc21c7e97a"
            }
        ],
        "listePersonne":[
            "5877db1c5e8663dc21c7e974"
        ]
    }, ...etc
]
~~~

####Obtenir les infos du certain VA

- **Type Request**: GET
- **Content-Type**: application/json
- **Params du Body**: null
- **exemple**:


~~~bash
http://localhost:3000/va/5876402fd48d458950a43839
~~~

####Delete une VA avec Id

- **Type Request**: DELETE
- **Content-Type**: application/json
- **Params du Body**: null
- **exemple**:

~~~bash
curl -X DELETE http://localhost:3000/va/5876402fd48d458950a43839
~~~


####Montrer d'un Utilisateur

- **Type Request**: POST
- **Content-Type**: application/json
- **Params du Body**: 

~~~json
{

    "loc":{
        "lat":49.2228327,
        "lon":-0.370879
    },
    "newClient":"5878948fed29e439469af33a",
    "newTrajetVa":[
        {
            "lat":49.2228327,
            "lon":-0.370879
        },
        {
            "lat":49.2092824,
            "lon":-0.3671516
        }
    ],
    "trajetUserID":"5878948fed29e439469af33a",
    "detailsUsers":{
        "depart":{
            "lat":49.2228327,
            "lon":-0.370879
        },
        "arrivee":{
            "lat":49.2092824,
            "lon":-0.3671516
        },
        "userID":"5878948fed29e439469af33a"
    }

}
~~~

- **exemple**:

~~~bash
curl -X POST "http://localhost:3000/va/587895ce4c6f2c3c256c96db/montrer" -H "Content-Type: application/json" -d '{"loc":{"lat":49.2228327, "lon":-0.370879}, "newClient":"5878948fed29e439469af33a", "newTrajetVa":[{"lat":49.2228327, "lon":-0.370879},{"lat":49.2092824, "lon":-0.3671516}], "trajetUserID":"5878948fed29e439469af33a", "detailsUsers": {"depart":{"lat":49.2228327, "lon":-0.370879},"arrivee":{"lat":49.2092824, "lon":-0.3671516},"userID":"5878948fed29e439469af33a"}}'

~~~

####Decendre d'un Utilisateur

~~~bash
curl -X POST "http://localhost:3000/va/58765bdb42adc39073f88679/decendre" -H "Content-Type: application/json" -d '{"loc":{"lat":49.18165,"lon":-0.45}, "newClient":"58766603180d8e93b1375b37", "newTrajetVa":[{"lon":111,"lat":111},{"lon":2,"lat":222}], "trajetUserID":"58766603180d8e93b1375b37"}'
~~~
####Mise A Jour Loc du VA

- **Type Request**: POST
- **Content-Type**: application/json
- **Params du Body**:

~~~json
{

    "loc":{
        "lat":49.18165,
        "lon":-0.45
    },
    "newTrajetVa":[
        {
            "lon":111,
            "lat":111
        },
        {
            "lon":2,
            "lat":333
        }
    ]

}
~~~


- **exemple**:

~~~bash
curl -X POST "http://localhost:3000/va/58765bdb42adc39073f88679/misajour" -H "Content-Type: application/json" -d '{"loc":{"lat":49.18165,"lon":-0.45}, "newTrajetVa":[{"lon":111,"lat":111},{"lon":2,"lat":333}]}'
~~~



###Utilisateur

####Create Utilisateur

- **Type Request**: POST
- **Content-Type**: application/json
- **Params du Body**: 

~~~json
{
    "username":"lilei",
    "email":"Lilei@gmail.com",
    "passwordSalt":"passwordLilei",
    "role":"0"
}

~~~
- **exemple**:

~~~bash
curl -X POST "http://localhost:3000/users/create" -H "Content-Type: application/json" -d '{"username":"
lilei", "email":"Lilei@gmail.com", "passwordSalt":"passwordLilei", "role":"0"}'
~~~


####Get All Utilisateur

- **Type Request**: GET
- **Content-Type**: application/json
- **Params du Body**: null
- **exemple**:



~~~bash
curl http://localhost:3000/users
~~~

####Get Utilisateur By Id

- **Type Request**: GET
- **Content-Type**: application/json
- **Params du Body**: null
- **exemple**:


~~~bash
curl http://localhost:3000/users/587665e0180d8e93b1375b36
~~~

####Delete Utilisateur

- **Type Request**: DELETE
- **Content-Type**: application/json
- **Params du Body**: NULL
- **exemple**:

~~~bash
curl -X DELETE http://localhost:3000/users/587665e0180d8e93b1375b36
~~~

####Ajouter Trajet Utilisateur

- **Type Request**: POST
- **Content-Type**: application/json
- **Params du Body**: 

~~~json
{

    "depart":{
        "lon":123,
        "lat":456
    },
    "arrivee":{
        "lon":321,
        "lat":543
    },
    "reserve":false,
    "timeStamp":3333,
    "maxAttant":44444

}
~~~
- **exemple**:

~~~bash
curl -X POST "http://localhost:3000/users/58766603180d8e93b1375b37/addtrajet" -H "Content-Type: application/json" -d '{"depart":{"lon":123,"lat":456},"arrivee":{"lon":321,"lat":543}, "reserve":false, "timeStamp":3333, "maxAttant":44444}'
~~~


###Centre Contrôleur
####Recevoir Demande Utilisateur

- **Type Request**: POST
- **Content-Type**: application/json
- **Params du Body**: 

~~~json
{

    "newIte":{
        "depart":{
            "lat":49.209223,
            "lon":-0.374195
        },
        "arrivee":{
            "lat":49.206485,
            "lon":-0.359394
        }
    },
    "userID":"5877e7dfc14974dfdcda34cf"

}
~~~

- **exemple**:

~~~bash
 curl -X POST http://localhost:3000/centerctrl/demande -H "Content-Type: application/json" -d '{"newIte":{ "depart": {"lat":49.209223,"lon":-0.374195},"arrivee":{"lat":49.206485, "lon":-0.359394} },"userID":"5877e7dfc14974dfdcda34cf"}'


#Réponse:
{

    "nameVa":"5877dbd95e8663dc21c7e979",
    "bestIte":[
        {
            "lat":"49.209223",
            "lon":"-0.374195"
        },
        {
            "lat":"49.205481",
            "lon":"-0.373463"
        },
        {
            "lat":"49.206485",
            "lon":"-0.359394"
        },
        {
            "lat":"49.206485",
            "lon":"-0.359394"
        }
    ],
    "userID":"5877e7dfc14974dfdcda34cf",
    "newIte":{
        "depart":{
            "lat":49.209223,
            "lon":-0.374195
        },
        "arrivee":{
            "lat":49.206485,
            "lon":-0.359394
        }
    }

}
~~~








