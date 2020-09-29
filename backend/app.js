const db = require('./config/database')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const userRoutes = require('./routes/user');
const msgRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');
//const commentRoutes = require('./routes/comment');
const path = require('path'); //Plugin permettant d'accéder au path du serveur
const helmet = require('helmet'); //Plugin assurant un niveau de sécurité élevé. Possèdant 11 middlewares, il sécurise entre autres les requêtes, les Headers, et empêche le sniffing.


/* 
Authentification à la base de données
 */
db
 .authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   console.error('Unable to connect to the database:', err);
 });

 app.use(helmet()); //Execution d'helmet

 app.use((req, res, next) => {  
     res.setHeader('Access-Control-Allow-Origin', '*'); // Permet de résoudre les erreurs liées à l'accès multi-origine. (CROSS)
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
     next();
 });
 app.use(bodyParser.urlencoded({ extended : false }))
 app.use(bodyParser.json()); // Récupération des données dans le corps des requêtes
 
 app.use('/images', express.static(path.join(__dirname, 'images')));
 
 app.use('/', userRoutes);
 app.use('/', msgRoutes);
 app.use('/', commentRoutes);
 //app.use('/', likeRoutes);


 module.exports = app;




