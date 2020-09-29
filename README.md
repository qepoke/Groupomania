# Projet n°7 : Création d'un réseau social d'entreprise

# Parcours Développeur Web : OPENCLASSROOMS


## Comment démarrer le projet ?

1) Clonez le dépôt

2) Lancer XAMPP, MAMP ou WAMP ainsi que leurs serveurs Apache et Mysql

3) Placez vous respectivement dans les dossiers backend et frontend et lancez la commande `npm install` dans le terminal 

4) Vérifiez les informations contenu dans le fichier `backend/config/config.json` ainsi que `backend/config/database.js`

5) Placé dans le dossier backend, lancez à la suite les commandes :

    `npx sequelize-cli db:create`

    `npx sequelize-cli db:migrate`

    `npx sequelize-cli db:seed:all`

6) Créez à la racine du dossier backend/ un ficher `.env` avec comme contenu :

        TOKEN=votre_token

7) Ouvrez un 1er terminal et placez vous dans le dossier backend/. Lancez la commande `npm start`

8) Ouvrez un 2eme terminal et placez vous dans le dossier frontend/. Lancez la commande `npm run serve`

9) Ouvez votre navigateur et allez à l'adresse `http://localhost:8080`

10) Plusieurs utilisateurs sont disponibles :

        admin@test.fr
        quentin@test.fr
        thomas@test.fr

    Le mot de passe de chaque utilisateur est : `Azerty123`

    
--------------------------------------




