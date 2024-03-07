# Cours sur les Clés Étrangères en SQL

## Introduction

Dans le monde des bases de données relationnelles, les relations entre les tables sont fondamentales pour modéliser et interroger des données complexes. Les clés étrangères jouent un rôle crucial dans l'établissement de ces relations, en garantissant l'intégrité référentielle entre les tables. Ce cours vise à vous familiariser avec le concept de clé étrangère, son importance, et comment l'utiliser en SQL.

## Définition d'une Clé Étrangère

Une clé étrangère est une colonne ou un ensemble de colonnes dans une table qui sert à référencer la clé primaire d'une autre table. L'objectif principal d'une clé étrangère est de maintenir l'intégrité des données entre les tables, s'assurant que la relation entre elles reste valide.

## Pourquoi Utiliser des Clés Étrangères

- **Intégrité Référentielle** : Elles garantissent que chaque valeur dans la colonne de clé étrangère existe en tant que valeur de clé primaire dans la table référencée.
- **Navigation entre les Tables** : Les clés étrangères facilitent les jointures entre les tables, permettant des requêtes complexes et des analyses de données.
- **Suppression et Mise à Jour en Cascade** : Elles permettent des opérations de mise à jour ou de suppression automatiques entre les tables liées, simplifiant la gestion des données.

## Création de Clés Étrangères

La création d'une clé étrangère se fait généralement lors de la création de la table ou après, par l'ajout d'une contrainte.

### Syntaxe de Base

Lors de la création d'une table :

```sql
CREATE TABLE TableEnfant (
    ID INT,
    ForeignKeyColumn INT,
    FOREIGN KEY (ForeignKeyColumn) REFERENCES TableParent(PrimaryKeyColumn)
);
```

Ajout à une table existante :

```sql
ALTER TABLE TableEnfant
ADD FOREIGN KEY (ForeignKeyColumn) REFERENCES TableParent(PrimaryKeyColumn);
```

### Exemple Concret

Supposons que nous ayons deux tables : `Employes` et `Departements`.

- `Departements` a deux colonnes : `DeptID` (clé primaire) et `Nom`.
- `Employes` contient `EmpID`, `Nom` et `DeptID`.

Pour créer une relation entre `Employes` et `Departements` via `DeptID` :

```sql
ALTER TABLE Employes
ADD FOREIGN KEY (DeptID) REFERENCES Departements(DeptID);
```

## Règles de Gestion des Clés Étrangères

- **Suppression en Cascade** : Si un enregistrement dans la table parente est supprimé, tous les enregistrements correspondants dans la table enfant seront également supprimés.
- **Mise à Jour en Cascade** : Si la clé primaire dans la table parente est mise à jour, la clé étrangère correspondante dans la table enfant sera également mise à jour.

### Exemple de Suppression en Cascade

```sql
ALTER TABLE Employes
ADD CONSTRAINT FK_Departement
FOREIGN KEY (DeptID)
REFERENCES Departements(DeptID)
ON DELETE CASCADE;
```

## Bonnes Pratiques

- **Ne pas abuser des suppressions en cascade** : Elles peuvent conduire à la perte de données importantes par accident.
- **Documentation** : Documentez les relations entre les tables dans votre modèle de données pour faciliter la maintenance et la compréhension du schéma.
- **Tests** : Testez les impacts des clés étrangères sur vos opérations de base de données, surtout pour les opérations de mise à jour et de suppression.

## Conclusion

Les clés étrangères sont essentielles pour maintenir des relations saines et logiques entre les tables d'une base de données. En garantissant l'intégrité référentielle, elles facilitent la gestion des données, les requêtes complexes et l'analyse. Bien utilisées, les clés étrangères renforcent la cohérence, la fiabilité et la performance de vos bases de données relationnelles.

## Gestion des Actions ON DELETE et ON UPDATE

Les clauses `ON DELETE` et `ON UPDATE` dans la définition d'une clé étrangère permettent de spécifier le comportement d'une base de données lors de la suppression ou de la mise à jour d'une ligne dans la table parente (celle référencée par la clé étrangère). Ces clauses sont cruciales pour maintenir l'intégrité référentielle de la base de données en répondant automatiquement à des changements qui pourraient autrement laisser des références orphelines.

### ON DELETE

Cette clause définit ce qui doit arriver à une ligne dans une table enfant (la table contenant la clé étrangère) lorsque la ligne correspondante dans la table parente est supprimée.

#### Options de ON DELETE

- **CASCADE** : Supprime les lignes de la table enfant qui correspondent à la ligne supprimée dans la table parente.
- **SET NULL** : Met à jour les valeurs des clés étrangères dans les lignes de la table enfant, les passant à `NULL` après la suppression dans la table parente. Cela ne fonctionne que si la colonne de clé étrangère autorise les valeurs `NULL`.
- **NO ACTION** / **RESTRICT** : Empêche la suppression de la ligne dans la table parente si des références existent dans la table enfant.
- **SET DEFAULT** : Met à jour les valeurs des clés étrangères dans la table enfant à leur valeur par défaut après la suppression dans la table parente. Cela nécessite qu'une valeur par défaut soit définie pour la colonne.

### ON UPDATE

Cette clause définit ce qui doit arriver à une ligne dans une table enfant lorsque la clé primaire correspondante dans la table parente est mise à jour.

#### Options de ON UPDATE

Les options pour `ON UPDATE` sont similaires à `ON DELETE` :

- **CASCADE** : Met à jour les valeurs de la clé étrangère dans les lignes de la table enfant pour correspondre à la nouvelle valeur de la clé primaire dans la table parente.
- **SET NULL** : Met à jour les valeurs des clés étrangères dans les lignes de la table enfant à `NULL` après la mise à jour de la clé correspondante dans la table parente.
- **NO ACTION** / **RESTRICT** : Bloque la mise à jour de la clé dans la table parente si des références existent dans la table enfant.
- **SET DEFAULT** : Met à jour les valeurs des clés étrangères dans la table enfant à leur valeur par défaut après la mise à jour de la clé dans la table parente.

### Exemple Pratique

Imaginons une table `Commandes` qui référence une table `Clients`. Si un client est supprimé, nous voulons que toutes ses commandes soient également supprimées :

```sql
ALTER TABLE Commandes
ADD CONSTRAINT fk_client_id
FOREIGN KEY (client_id)
REFERENCES Clients(client_id)
ON DELETE CASCADE;
```

Si, par contre, l'ID d'un client est mis à jour, nous voulons que cet ID soit également mis à jour dans les commandes associées :

```sql
ALTER TABLE Commandes
ADD CONSTRAINT fk_client_id
FOREIGN KEY (client_id)
REFERENCES Clients(client_id)
ON UPDATE CASCADE;
```

### Conclusion

Les clauses `ON DELETE` et `ON UPDATE` offrent une flexibilité précieuse dans la gestion de l'intégrité référentielle des bases de données relationnelles. Leur utilisation appropriée permet d'assurer que les données restent cohérentes et significatives, même face à des modifications. Il est essentiel de choisir le comportement qui correspond le mieux à la logique de votre application pour maintenir la qualité et la fiabilité de vos données.

# Supprimer une clé étrangère

Pour supprimer une clé étrangère, vous devez d'abord la récupérer. Pour cela on peut utiliser la commande `SHOW CREATE TABLE nom_table`, qui montre la commande SQL pour recréer la table indiqué.

Une fois notre clé étrangère récupérée, la commande pour la supprimer est la suivante :

```sql
ALTER TABLE nom_table DROP FOREIGN KEY cle_etrangere;
```