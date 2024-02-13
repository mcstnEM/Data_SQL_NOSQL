# Structure des SGBD

SGBD signifi Système de Gestion de Bases de Données, comme leur nom l'indique, ils peuvent gérer de multiples bases de données.  
Selon que ce soit du NoSQL ou du SQL les données sont des objets ou des documents, rangés dans des tables structurées ou des collections (fichier structurées).

```txt
SGBD/DBMS
├── wordpress
├── prestashop
├── portfolio_photo
│   ├── addresses
│   ├── basket_product
│   ├── baskets
│   ├── newsletter   
│   ├── order_product
│   ├── orders
│   ├── products
│   ├── roles
│   ├── user_role
│   └── users
└── foodly
    ├── aliment -> [id,nom,marque,sucre,calories,graisses,proteines,bio]
    ├── aliment_bio_vw
    ├── aliment_lieu
    ├── appareil   
    ├── langue
    ├── lieu
    ├── utilisateur
    ├── utilisateur_aliment
    ├── utilisateur_appareil
    └── utilisateurs_email_vw
```
<sub>Il s'agit de la représentation d'un système de géstion de bases de données. Ici foodly est une base de donnée relationnelle, propriétaire d'une table aliment, dans laquel se trouve divers champs renseignés.</sub>  
<sub>Sur une version NoSQL, foodly aurait était une collection dans laquel aucun champ n'est spécifié par avance.</sub>

## MongoDB

MongoDB est un Système de Gestion de Bases de Données (SGBD/DBMS) orienté document et NoSQL (Not Only SQL) créer en 2007.  
Il est capable de stocker une quantité "gigantesque" de données nécessaires pour des cas d'utilisation évolutifs.

### Mais où sont les données ?

En mongoDB, les données sont structurées sous forme de document. Il s'agit simplement d'un objet [JSON, ou devrais-je dire BSON](https://www.mongodb.com/json-and-bson).

> [!NOTE]
> BSON veut dire Binary JSON. Il a une structure similaire au JSON.  
> Il a été conçu pour être une représentation binaire efficace des documents JSON qui sont stockés dans MongoDB.

Cette objet qu'on appel "document" possède plusieur propriétées qui sont les données. Un document est rangé dans une collection.

Une "collection" est donc un group de documents qui sont stockés de manière structurés dans un fichier JSON/BSON.

```txt
foodly
└── users
    ├── Lincoln
    ├── Mathieu
    ├── François Mitterrand
    └── Eliot
```

#### collection 'users' dans la base de données 'foodly'

```BSON
[
  {
    _id: ObjectId('65c3536b008f413e849a69dd'),
    name: 'Lincoln',
    email: 'lincoln@example.com',
    __v: 0
  },
  {
    _id: ObjectId('65c37dbc5984df01180f385a'),
    name: 'Mathieu',
    email: 'mathieu@example.com',
    __v: 0,
    age: 24
  },
  {
    _id: ObjectId('65c387505984df01180f385f'),
    name: 'François Mitterrand',
    email: 'francoismitterrand@example.com',
    __v: 0
  },
  {
    _id: ObjectId('65c3fb24514bb455c3ee13ad'),
    name: 'Eliot',
    email: 'eliot@example.com',
    __v: 0
  }
]
```


## MySQL

[SQL](https://www.ibm.com/cloud/blog/sql-vs-nosql) signifie "Structured Query Language" (Langage de Requête Structurée). Développée en 1995, la base de données MySQL est devenue une structure de base de données par défaut largement adoptée.

Pendant plus de deux décennies, le SQL a été le modèle de conception principal pour le développement de [systèmes de gestion de base de données relationnelle (SGBDR)](https://www.ibm.com/cloud/learn/relational-databases) afin de maintenir les données et le stockage des données.

### Mais où sont les données ?

```txt
portfolio_photo
├── addresses
├── basket_product
├── baskets
├── newsletter
├── order_product
├── orders
├── products
├── roles
├── user_role
└── users ----------------------------------------------+
    ├── id                      | int           | ...   |
    ├── email                   | varchar(200)  | ...   |
    ├── password                | varchar(128)  | ...   |
    ├── username                | varchar(80)   | ...   |
    ├── newsletter              | tinyint(1)    | ...   |
    ├── refreshToken            | varchar(255)  | ...   |
    ├── account_creation_date   | datetime      | ...   |
    +---------------------------------------------------+
```

Avec MySQL les données sont des cellules stockées dans une ligne qui représente un objet. Cette objet comporte des champs défini par la table dans laquel il se trouve.

Les tables comportent divers champs qui sont prédéfinis à la création de la table ou rajouté ultérieurement.

#### Tables récupérés depuis la base de données portfolio_photo

```txt
mysql> show tables;
+---------------------------+
| Tables_in_portfolio_photo |
+---------------------------+
| addresses                 |
| basket_product            |
| baskets                   |
| newsletter                |
| order_product             |
| orders                    |
| products                  |
| roles                     |
| user_role                 |
| users                     |
+---------------------------+
10 rows in set (0.00 sec)
```
#### Colonnes de la table users

```txt
mysql> show columns from users;
+-----------------------+--------------+------+-----+-------------------+-------------------+
| Field                 | Type         | Null | Key | Default           | Extra             |
+-----------------------+--------------+------+-----+-------------------+-------------------+
| id                    | int          | NO   | PRI | NULL              | auto_increment    |
| email                 | varchar(200) | NO   | UNI | NULL              |                   |
| password              | varchar(128) | NO   |     | NULL              |                   |
| username              | varchar(80)  | YES  | UNI | NULL              |                   |
| newsletter            | tinyint(1)   | YES  |     | 0                 |                   |
| refreshToken          | varchar(255) | YES  |     | NULL              |                   |
| account_creation_date | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-----------------------+--------------+------+-----+-------------------+-------------------+
7 rows in set (0.01 sec)
```
