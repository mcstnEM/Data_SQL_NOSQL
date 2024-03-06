- [Installation Windows](#installation-windows)
  - [Installation dans vos variables d'environnement](#installation-dans-vos-variables-denvironnement)
- [Installation MacOS (OSX) avec Homebrew](#installation-macos-osx-avec-homebrew)
  - [Créé votre mot de passe](#créé-votre-mot-de-passe)
    - [En se connectant à la base de données](#en-se-connectant-à-la-base-de-données)
    - [Via la commande `mysqladmin`](#via-la-commande-mysqladmin)
  - [Connection à votre application MySQL](#connection-à-votre-application-mysql)
- [Installation Linux](#installation-linux)
  - [Créé votre mot de passe](#créé-votre-mot-de-passe-1)
    - [En se connectant à la base de données](#en-se-connectant-à-la-base-de-données-1)
    - [Via la commande `mysqladmin`](#via-la-commande-mysqladmin-1)
  - [Connection à votre application MySQL](#connection-à-votre-application-mysql-1)
- [Lancer/Stoper votre serveur MySQL](#lancerstoper-votre-serveur-mysql)
  - [Via Windows](#via-windows)
  - [Via MacOS (OSX) avec Hombrew](#via-macos-osx-avec-hombrew)
  - [Via Linux](#via-linux)
- [Installer PHPMyAdmin en deux commande avec Docker](#installer-phpmyadmin-en-deux-commande-avec-docker)

# Installation Windows

Rendez-vous sur la [page de téléchargement de l'installer de MySQL](https://dev.mysql.com/downloads/installer/), lancé l'installation. Il vous faudra choisir le type de setup (configuration) "**Server only**", pour n'installer que le serveur MySQL.

Télécharger **MySQL Server** et vérifié que les options suivantes correspondes :

- [x] TCP/IP
- [x] Ouvrir les ports du pare-feu Windows pour l'accée au réseaux
- [x] Port: 3306

Arrivé à l'étape “comptes et rôles”, définissé un nom d'utilisateur et un mot de passe pour l'utilisateur “root”.

> [!NOTE]
> En informatique, et notamment dans le monde des bases de données, l’utilisateur dit **“root” (ou racine)** est un utilisateur qui a tous les droits (création, suppression, mise à jour). C’est celui qu’on utilise pour installer des logiciels sur notre machine.

Dans la bare de recherche Windows, tapez et séléctionné **“MySQL Command Line Client”** pour ouvrir la CLI MySQL.

Renseigné votre mot de passe de votre compte root pour accéder à vos bases de données.

## Installation dans vos variables d'environnement

Vous pouvez rechercher l'emplacement du fichier, récupérer le chemin du répertoir `/bin/` et le coller dans le **$path** de vos variables d'environnement.

Relancé votre terminal (si vous l'aviez laissé ouvert).

Entré la commande `mysql -u <nom_utilisateur> -p`.

Renseigné votre mot de passe pour accéder à vos bases de données.

# Installation MacOS (OSX) avec Homebrew 

Premièrement il vous faudra Homebrew. Vous trouverez l'installation sur leur [page d'accueil](https://brew.sh/fr/).

Lancé la commande `brew install mysql`.

> [!WARNING]
> MySQL fonctionnant avec son propre serveur, il vous faudra le lancer parmi les services de Homebrew.  
> Pour cela, exécuté la commande `brew services list` pour voir les services tournant en arrière-plan sur votre système et `brew services start mysql` si MySQL n'est pas lancé.
> Pour fermer le service, il vous faudra simple faire un `brew services stop mysql`.
> Si vous avez besoin de relancer le serveur, vous avez la commande `brew services restart mysql`.

Vérifier que l'installation c'est bien passé avec `mysql -V`, cette commande vous affichera la version de MySQL.

## Créé votre mot de passe

Deux possibilité pour créer sont mot de passe :

### En se connectant à la base de données 

Vous n'avez pas de mot de passe normalement si c'est votre première installation.  
Connétez-vous à votre base de données avec la commande `mysql -u root` et rentré la commande SQL `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';`.

Lancé la commande `FLUSH PRIVILEGES`.

> [!NOTE]
> La commande `FLUSH PRIVILEGES;` en MySQL est utilisée pour relire les fichiers de privilèges et recharger les privilèges en cours sans avoir à redémarrer le serveur MySQL. Lorsque vous effectuez des changements aux privilèges des utilisateurs, par exemple en utilisant la commande `GRANT` ou `REVOKE`, MySQL ne les applique pas immédiatement. Au lieu de cela, il les met en mémoire jusqu'à ce que le serveur soit redémarré ou que la commande `FLUSH PRIVILEGES;` soit exécutée.

### Via la commande `mysqladmin`

La commande est simple, la voici :  
`mysqladmin -u root password 'votre_mot_de_passe'`

## Connection à votre application MySQL

Entré la commande `mysql -u root -p` et renseigné votre mot-de-passe, vous devriez accéder à vos bases de données.

# Installation Linux

Commencez par mettre à jour la liste des programmes porposés par APT en tapant la commande `sudo apt update`.

> [!WARNING]
> `sudo` vous demandera l'autorisation d'éxécuter la commande qui suit. Soit vous vérez des caractères **"*"** s'afficher à mesure que vous entrez votre mot-de-passe soit rien ne s'affiche, c'est normal, il s'agit d'une mesure de sécurité, même si rien ne s'affiche, vous renseignez bien un mot de passe.

Installé maintenant MySQL avec la commande `sudo apt install mysql-server`. On vous demandera peut-être de confirmer, tapé `Y` pour valider.

Pour voir si MySQL tourne bien sur votre système, lancé `systemctl status mysql`, si ça n'est pas le cas, lancé le serveur MySQL avec `sudo systemctl start mysql`.

## Créé votre mot de passe

Deux possibilité pour créer sont mot de passe :

### En se connectant à la base de données 

Vous n'avez pas de mot de passe normalement si c'est votre première installation.  
Connétez-vous à votre base de données avec la commande `mysql -u root` et rentré la commande SQL `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';`.

Lancé la commande `FLUSH PRIVILEGES`.

> [!NOTE]
> La commande `FLUSH PRIVILEGES;` en MySQL est utilisée pour relire les fichiers de privilèges et recharger les privilèges en cours sans avoir à redémarrer le serveur MySQL. Lorsque vous effectuez des changements aux privilèges des utilisateurs, par exemple en utilisant la commande `GRANT` ou `REVOKE`, MySQL ne les applique pas immédiatement. Au lieu de cela, il les met en mémoire jusqu'à ce que le serveur soit redémarré ou que la commande `FLUSH PRIVILEGES;` soit exécutée.

### Via la commande `mysqladmin`

La commande est simple, la voici :  
`mysqladmin -u root password 'votre_mot_de_passe'`

## Connection à votre application MySQL

Entré la commande `mysql -u root -p` et renseigné votre mot-de-passe, vous devriez accéder à vos bases de données.

# Lancer/Stoper votre serveur MySQL

MySQL fonctionnant avec son propre serveur, il est pratique de pouvoir le stoper ou le lancer au besoin. Par example, si vous avez besoin du port 3306 (port par défaut de MySQL) pour un autre serveur MySQL, comme c'est le cas pour les outilles comme XAMPP, MAMP, WAMP.

## Via Windows

Via la boîte de dialogue Exécuter (Windows + R) ou PowerShell, tapez **"services.msc"**, chercher le service correspondant au serveur MySQL (nom par défaut: **mysql80**).

Démarré ou stoppé le service.

## Via MacOS (OSX) avec Hombrew

Dans le terminal tapez `brew services list` pour voir si MySQL est lancé.

- Lancé le serveur MySQL :    `brew services start mysql`
- Stoppé le serveur MySQL :   `brew services stop mysql`

> [!TIP]
> Relancé le serveur MySQL avec `brew services restart mysql`.

## Via Linux

Dans le terminal, afin de vérifier si le serveur MySQL est lancé, tapez la commande `systemctl status mysql`.

- Lancé le serveur MySQL :  `sudo systemctl start mysql`
- Stoppé le serveur MySQL : `sudo systemctl stop mysql`

# Installer PHPMyAdmin en deux commande avec Docker

Si vous souhaitez avoir une interface grafique on peut installer PHPMyAdmin dans un contener Docker. 

Il vous faudra d'abord créer un réseau local dans Docker pour que le contener puisse communiquer avec votre instance de MySQL :

```bash
docker network create phpmyadmin_network
```

```bash
docker run --name phpmyadmin -d --network phpmyadmin_network -e PMA_HOST=host.docker.internal -e PMA_USER=root -e PMA_PASSWORD=root -p 8080:80 phpmyadmin
```