- [MySQL Introduction](#mysql-introduction)
- [Se connecter à notre base de données](#se-connecter-à-notre-base-de-données)
- [Les commandes dans MySQL](#les-commandes-dans-mysql)
  - [Créer une base de données](#créer-une-base-de-données)
  - [Lister les bases de données](#lister-les-bases-de-données)
  - [Switcher de base de données](#switcher-de-base-de-données)
  - [Créer une table](#créer-une-table)
    - [Les différents types de champs](#les-différents-types-de-champs)
      - [types de valeurs courante](#types-de-valeurs-courante)
      - [stocker des date et des heures](#stocker-des-date-et-des-heures)
  - [Ajouter/supprimer un champ avec `ALTER TABLE`](#ajoutersupprimer-un-champ-avec-alter-table)
    - [Ajouter un champ](#ajouter-un-champ)
    - [Supprimer un champ](#supprimer-un-champ)
    - [Ajouter une clé étrangère](#ajouter-une-clé-étrangère)
  - [Récupérer des infos sur le status de notre base de données](#récupérer-des-infos-sur-le-status-de-notre-base-de-données)
  - [Ajouter nos premières données](#ajouter-nos-premières-données)
  - [Récupérer nos premières données](#récupérer-nos-premières-données)


# MySQL Introduction

Créé en 1995 par [Michael Widenius](https://fr.wikipedia.org/wiki/Michael_Widenius), qui s'est inspiré du nom de sa première fille "My" pour baptiser son application, MySQL est un Système de Gestion de Base de Données Relationnel (SGBDR/RDBMS) basé sur le langage SQL.

MySQL a été racheté par Sun Microsystems le 16 janvier 2008, qui à son tour a été acquis le 20 avril 2009 par Oracle Corporation.

[Michael Widenius](https://fr.wikipedia.org/wiki/Michael_Widenius) a annoncé le 5 février 2009 son départ de Sun Microsystems pour fonder sa propre entreprise. Il a par la suite créé MariaDB, un fork de MySQL, en s'inspirant du nom de sa deuxième fille.

# Se connecter à notre base de données

Ici, on suppose que vous avez un compte "root" protégeait par un mot de passe. Dans le cas contraire, omettez le `-p` s'il n'y a aucun mot de passe.

```bash
mysql -u root -p
```

# Les commandes dans MySQL

## Créer une base de données 

```SQL
CREATE DATABASE nom_bdd;
```

## Lister les bases de données

```SQL
SHOW DATABASES;
```

## Switcher de base de données

```SQL
USE nom_bdd
```

## Créer une table

`PRIMARY KEY` vas automatiquement appliquer un `NOT NULL` au champ "id", par contre, si vous souhaitez avoir `AUTO_INCREMENT`, il faudrat l'indiquer manuellement.

```SQL
CREATE TABLE nom_table(id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, content TEXT);
```

### Les différents types de champs

```SQL
CREATE TABLE users(
  user_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  account_creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  admin BOOLEAN DEFAULT false,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email VARCHAR(200),
  user_profile_description TEXT
);
```

#### types de valeurs courante

- `VARCHAR()`: Indique que la colonne stockera des chaîne de caractères. On prendra le soin de choisir la quantité d’octet autorisé, sachant que nous pouvons aller jusqu’à 255 octets au maximum (soit 2040 bits)
- `TEXT`: Permet de stocker beaucoup de caractère. On peut, sans problème, y stocker un roman
- `INTEGER`: Indique que la colonne stockera des entiers
- `FLOAT`: Indique que la colonne stockera des nombres flottants
- `BOOLEAN`: Permet de stocker des valeurs booléennes

#### stocker des date et des heures

- `DATETIME`: Permet de stocker une date et une heure au format 'YYYY-MM-DD hh:mm:ss' pouvant aller de '1000-01-01 00:00:00' à '9999-12-31 23:59:59'
- `Date`: Permet de stocker juste une date au format 'YYYY-MM-DD'
- `TIME`: Permet de stocker juste une heure au format 'hh:mm:ss'
- `TIMESTAMP`: Permet de stocker un timestamp avec une plage allant de '1970-01-01 00:00:01' UTC à '2038-01-19 03:14:07' UTC

## Ajouter/supprimer un champ avec `ALTER TABLE`

### Ajouter un champ

Ici on rajoute un champ qui récupérera des entiers (`INT`)

```SQL
ALTER TABLE nom_table ADD COLUMN nom_du_champ INT;
```

### Supprimer un champ

```SQL
ALTER TABLE nom_table DROP COLUMN nom_du_champ;
```

### Ajouter une clé étrangère

```SQL
ALTER TABLE nom_table ADD FOREIGN KEY (nom_champ_cle_etrangere) REFERENCES nom_table_reference(champ_id);
```

## Récupérer des infos sur le status de notre base de données

```SQL
status
```

## Ajouter nos premières données

```SQL
INSERT INTO nom_table(champ1, champ2, champ3) VALUES (valeur_champ1, valeur_champ2);
```

## Récupérer nos premières données

```SQL
SELECT * FROM nom_table;
```