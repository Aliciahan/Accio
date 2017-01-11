#Install: 
__Dependance:__
- NodeJS
- Express
- Express-generator
- MongoDB


** Running **

~~~bash
mkdir data
npm install
mongod --dbpath ./data 
npm start
~~~


** API ArretsBus. **

~~~bash
curl -X POST "http://localhost:3000/arrets" -H "Content-Type: application/json" -d '{"location":{"lat":49.18165,"lon":-0.34709},"nom":"Le Dôme"}'

curl -X DELETE "http://localhost:3000/arrets/58756def64f0a665246e9aa1"

curl -X GET http://localhost:3000/arrets
~~~
