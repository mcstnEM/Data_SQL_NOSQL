**Python + Mango = PyMango** :rocket:
:book: Ressource : https://pymongo.readthedocs.io/

**Création d'un environnement Python**
:book: Référence : https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/
**Installation**
```bash
python3 -m pip install --user virtualenv
```
```bash
# création d'un environnement
python -m venv env
# activation d un environnement
source env/bin/activate
```

**Installation de la librairie PyMongo**
```bash
python -m pip install "pymongo[srv]"
```

**Consigne**
[1]
À partir du fichier main.py, créer en console, une application de recherche dans votre base de données restaurant.
- La console demande la valeur d'une recherche, 
- L'utilisateur tape un mot correspondant à sa recherche,
- La console print tous les restaurants (nom, quartier et type de cuisine) qui contiennent le mot recherché dans la clef name.

[2]
Maintenant, affichez les quartiers avec à côté un numéro de résultat ( [1] Manhattan , [2] Brooklyn ,[3] ... , exetera)
Puis demandez à l'utilisateur de taper le numéro de son choix.
Continuez en demandant le type de cuisine selon le même mode opératoire.
Puis affichez les résultats (numéro de résultat, nom, quartier et type de cuisine) des restaurants correspondant à ce quartier et ce type de cuisine. 
L'utilisateur peut taper le numéro de son choix pour voir s'afficher l'adresse.


**Gestion des dates**
```bash
python -m pip install python-dateutil
```

```py
from dateutil import parser
maDate = '2023-01-01T00:00:00.000Z'
maDateFormatted = parser.parse(maDate)
```


Aggregation et Sort
:book: Ressource : https://pymongo.readthedocs.io/en/3.6.1/examples/aggregation.html
```python
from bson.son import SON
pipeline = [
    {"$unwind": "$tags"},
    {"$group": {"_id": "$tags", "count": {"$sum": 1}}},
    {"$sort": SON([("count", -1), ("_id", -1)])}
]
```

