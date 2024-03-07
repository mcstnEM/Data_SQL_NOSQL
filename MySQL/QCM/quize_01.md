### QCM 1: Introduction à MySQL et Connexion

1. Qui est le créateur de MySQL ?
   - [ ] A) Larry Ellison
   - [x] B) Michael Widenius
   - [ ] C) Linus Torvalds
   - [ ] D) James Gosling

2. Quel est le principal langage utilisé par MySQL pour la manipulation des données ?
   - [ ] A) Python
   - [ ] B) Java
   - [x] C) SQL
   - [ ] D) PHP

3. En quelle année MySQL a-t-il été racheté par Sun Microsystems ?
   - [ ] A) 1995
   - [x] B) 2008
   - [ ] C) 2009
   - [ ] D) 2012

4. Quel fork de MySQL a été créé par Michael Widenius ?
   - [ ] A) PostgreSQL
   - [ ] B) SQLite
   - [x] C) MariaDB
   - [ ] D) Oracle DB

### QCM 2: Opérations CRUD en MySQL

6. Quelle commande SQL est utilisée pour créer une nouvelle base de données ?
   - [x] A) `CREATE DATABASE nom_bdd;`
   - [ ] B) `NEW DATABASE nom_bdd;`
   - [ ] C) `CREATE DB nom_bdd;`
   - [ ] D) `INIT DATABASE nom_bdd;`

7. Comment insérer des données dans une table MySQL ?
   - [ ] A) `ADD INTO nom_table VALUES (...)`
   - [x] B) `INSERT INTO nom_table (...) VALUES (...)`
   - [ ] C) `INPUT DATA INTO nom_table (...)`
   - [ ] D) `INSERT DATA nom_table (...)`

8. Quelle commande permet de modifier des données existantes dans une table ?
   - [ ] A) `CHANGE TABLE nom_table SET ...`
   - [x] B) `UPDATE nom_table SET ... WHERE ...`
   - [ ] C) `MODIFY nom_table SET ...`
   - [ ] D) `ALTER nom_table SET ...`

9. Comment supprimer un enregistrement spécifique d'une table ?
   - [x] A) `DELETE FROM nom_table WHERE ...`
   - [ ] B) `REMOVE FROM nom_table WHERE ...`
   - [ ] C) `ERASE FROM nom_table WHERE ...`
   - [ ] D) `DELETE * FROM nom_table WHERE ...`

10. Quel type de données est recommandé pour stocker une adresse e-mail ?
    - [ ] A) `TEXT`
    - [x] B) `VARCHAR(200)`
    - [ ] C) `EMAIL`
    - [ ] D) `STRING`

### QCM 3: Jointures SQL

11. Quel type de jointure renvoie tous les enregistrements de la table de gauche et ceux correspondants de la table de droite ?
    - [ ] A) INNER JOIN
    - [x] B) LEFT JOIN
    - [ ] C) RIGHT JOIN
    - [ ] D) CROSS JOIN

12. Laquelle de ces commandes produit un produit cartésien entre deux tables ?
    - [ ] A) `SELECT * FROM table1 INNER JOIN table2;`
    - [ ] B) `SELECT * FROM table1, table2;`
    - [x] C) `SELECT * FROM table1 CROSS JOIN table2;`
    - [ ] D) `SELECT * FROM table1 FULL JOIN table2;`

13. Quelle syntaxe est correcte pour créer une jointure interne entre deux tables ?
    - [ ] A) `JOIN table1 ON table2.key = table1.key`
    - [x] B) `FROM table1 INNER JOIN table2 ON table1.key = table2.key`
    - [ ] C) `INNER JOIN table1, table2 ON table1.key = table2.key`
    - [ ] D) `SELECT * FROM table1 TO JOIN table2 ON key`

14. Comment filtrer les résultats d'une jointure pour n'inclure que les enregistrements avec des valeurs correspondantes dans les deux tables ?
    - [ ] A) En utilisant un LEFT JOIN
    - [ ] B) En utilisant un RIGHT JOIN
    - [x] C) En utilisant un INNER JOIN
    - [ ] D) En utilisant un FULL JOIN

15. Si une table `A` a une clé étrangère qui référence une clé primaire dans une table `B`, quel type de jointure afficherait tous les enregistrements de `A` et seulement les correspondances de `B` ?
    - [ ] A) INNER JOIN
    - [x] B) LEFT JOIN
    - [ ] C) RIGHT JOIN
    - [ ] D) CROSS JOIN

```sql
SELECT * FROM A LEFT JOIN B ON A.id = B.A_id
```