**PyMongo + FastAPI =** :astronaut: 
Ressource :book: https://www.mongodb.com/languages/python/pymongo-tutorial
**Initialisation / Installation
**
```
python -m venv env-pymongo-fastapi-crud
source env-pymongo-fastapi-crud/bin/activate
python -m pip install 'fastapi[all]' 'pymongo[srv]' python-dotenv
```
**Lancement du serveur**
python -m uvicorn main:app --reload

**Consigne**
[1] Essayez de faire fonctionner la route "search" en recherchant tous les restaurants contenant le mot recherché dans la clef name
[2] Nouvelle route : création d'un nouveau Restaurant
[3] Essayez tout seul de faire un updateOne maintenant. 
Quels inputs ?
Pensez à réaliser un model RestaurantUpdate.
