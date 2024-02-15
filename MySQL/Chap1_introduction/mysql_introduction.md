- [MySQL Introduction](#mysql-introduction)
- [Se connecter à notre base de données](#se-connecter-à-notre-base-de-données)
- [Les commandes dans MySQL](#les-commandes-dans-mysql)
  - [Créer une base de données](#créer-une-base-de-données)
  - [Lister les bases de données](#lister-les-bases-de-données)
  - [Switcher de base de données](#switcher-de-base-de-données)
  - [Créer une table](#créer-une-table)
  - [Ajouter/supprimer un champ avec `ALTER TABLE`](#ajoutersupprimer-un-champ-avec-alter-table)
    - [Ajouter un champ](#ajouter-un-champ)
    - [Supprimer un champ](#supprimer-un-champ)
  - [Récupérer des infos sur le status de notre base de données](#récupérer-des-infos-sur-le-status-de-notre-base-de-données)


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
CREATE TABLE nom_table(id INT PRYMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, content TEXT);
```

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

## Récupérer des infos sur le status de notre base de données

```SQL
status
```