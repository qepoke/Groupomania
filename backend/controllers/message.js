const models = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUserId = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    return userId;
}

exports.allMessages = (req, res, next) => {
    models.Message.findAll({
        attributes: ['content', 'createdAt', 'msgId', 'userId', 'like'],
        include: [{
            model: models.User,
            attributes: ['name', 'userId', 'avatar']
            }
        ],
        order: [['createdAt', 'DESC']]
    })
    .then((messages) => res.status(200).json({ messages }))
    .catch((error) => res.status(400).json({ error:  'Erreur de la base de données, impossible de récupérer les messages' }))
}

exports.viewMessage = (req, res, next) => {
    models.Message.findOne({
        attributes: ['content', 'createdAt', 'userId'],
        where: { msgId: req.params.msgId },
        include: [{
            model: models.User,
            attributes: ['name', 'userId', 'avatar']
            },
            {
            model: models.Comment,
            attributes: ['comment', 'userId', 'createdAt']
            },
            {
            model: models.Like,
            attributes: ['likeId', 'userId', 'msgId'],
            }
        ],
    })
    .then((message) => {
        if (message) {
        models.Like.findAndCountAll({
            attributes: ['userId'],
            where: { msgId: req.params.msgId}
        })
        .then((likeCount) => res.status(200).json({likeCount, message}))
        .catch(error => res.status(500).json({ error: "Impossible de récupérer les likes"}))
        } else {
          res.status(404).json({ error: 'Ce message n\'existe pas' })
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Impossible de voir le message' })
    })
}

exports.createMessage = (req, res, next) => {
    models.Message.create({
        include: [{
            model: models.User,
            attributes: ['name', 'userId', 'avatar']
            }
        ],
        content: req.body.content,
        userId : getUserId(req)
    })
    .then((message) => res.status(201).json({ message }))
    .catch((error) => res.status(400).json({ error:  'Erreur de la base de données, impossible de posté le message' }))
}

exports.editMessage = (req, res, next) => {
    /*
    Fonction de changement de photo de profil en cours
    */ 

    // const avatar = req.body.avatar
    // const userObject = req.file ?
    //     {
    //     ...JSON.parse(req.body.user),
    //     avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //     } : { ...req.body };
    models.Message.findOne({
        where: { msgId: req.params.msgId },
        include: [{
            model: models.User,
            attributes: ['userId']
            }
        ]
    })
    .then((msgFound) => {
        if (msgFound) {
            models.User.findOne({
                attributes: [ 'isAdmin' ],
                where: { userId: getUserId(req) }
            })
            .then((userIsAdmin) => {
                if ((getUserId(req) == msgFound.userId) || (userIsAdmin.dataValues.isAdmin == true)) {
                    models.Message.update(req.body, {
                        attributes: [ 'content' ],
                        where: { msgId: req.params.msgId }
                    })
                    .then(() => res.status(201).json({ message: 'Message modifié'}))
                    .catch((error) => res.status(500).json ({ error }))
                } else {
                    res.status(401).json({ error: 'Vous n\'êtes pas autorisé à modifier le message' })
                }
            })
            .catch((error) => res.status(500).json({ error: 'Impossible de communiquer avec la base de données' }))
        } else {
        res.status(404).json({ error: 'Message non trouvé' })
        }
    })
    .catch((error) => res.status(500).json({ error: 'Impossible de modifier le message' }))
}

exports.deleteMessage = (req, res, next) => {
    models.Message.findOne({
        where: { msgId: req.params.msgId }
    })
    .then((msgFound) => {
        if (msgFound) {
            models.User.findOne({
                attributes: [ 'isAdmin' ],
                where: { userId: getUserId(req) }
            })
            .then((userIsAdmin) => {
                if ((getUserId(req) == msgFound.userId) || (userIsAdmin.dataValues.isAdmin == true)) {
                    models.Message.destroy({
                        where: { msgId: req.params.msgId }
                    })
                    .then(() => res.status(201).json({ message: 'Message supprimé'}))
                    .catch((error) => res.status(404).json({ error })) 
                } else {
                    res.status(401).json({ error: 'Vous n\'êtes pas autorisé à supprimer le message' })
                }
            })
            .catch((error) => res.status(500).json({ error: 'Impossible de communiquer avec la base de données' }))  
        } else {
            res.status(404).json({ error: 'Message non trouvé' })
        }
    })
    .catch((error) => res.status(500).json({ error: 'Impossible de supprimer le message' }))
}

exports.postLike = (req, res, next) => {
    models.Message.findOne({
        attributes: ['msgId'],
        where: { msgId: req.params.msgId },
    })
    .then((msgFound) => {
        if (msgFound) {
            models.Like.findOne({
                attributes: ['userId', 'msgId'],
                where: { userId: getUserId(req),
                        msgId: req.params.msgId }
            })
            .then((likeFound) => {
                if (!likeFound) {
                    models.Like.create({
                        include: [{
                            model: models.User,
                            attributes: ['userId']
                            },
                            {
                            model: models.Message,
                            attributes: ['msgId']
                            }
                        ],
                        userId : getUserId(req),
                        msgId : req.params.msgId
                    })
                    .then((message) => res.status(201).json({ message: "Like posté" }))
                    .catch((error) => res.status(400).json({ error:  'Erreur de la base de données, impossible de posté le like' }))
                } else {
                  res.status(404).json({ error: 'Vous avez déjà liké' })
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Impossible de liké le message' })
            })
        } else {
          res.status(404).json({ error: 'Ce message n\'existe pas' })
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Impossible de voir le message' })
    })
        
}

exports.deleteLike = (req, res, next) => {
    models.Message.findOne({
        attributes: ['msgId'],
        where: { msgId: req.params.msgId },
    })
    .then((msgFound) => {
        if (msgFound) {
            models.Like.findOne({
                attributes: ['userId', 'msgId'],
                where: { userId: getUserId(req),
                        msgId: req.params.msgId }
            })
            .then((likeFound) => {
                if (likeFound) {
                    models.Like.destroy({
                        where: { msgId: req.params.msgId,
                                userId: getUserId(req) },
                    })
                    .then((message) => res.status(201).json({ message: "Like supprimé" }))
                    .catch((error) => res.status(400).json({ error:  'Erreur de la base de données, impossible de supprimer le like' }))
                } else {
                  res.status(404).json({ error: 'Vous ne pouvez pas supprimer un like qui n\'existe pas' })
                }
            })
            .catch((error) => {
                res.status(500).json({ error: 'Impossible de supprimer le like' })
            })
        } else {
          res.status(404).json({ error: 'Ce message n\'existe pas' })
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Impossible de voir le message' })
    })
        
}

// exports.deleteLike = (req, res, next) => {
//     models.Like.findOne({
//         attributes: ['userId', 'msgId'],
//         where: { msgId: req.params.msgId },
//         include: [{
//             model: models.User,
//             attributes: ['name', 'userId', 'avatar']
//             },
//             {
//             model: models.Comment,
//             attributes: ['comment', 'userId', 'createdAt']
//             },
//             {
//             model: models.Like,
//             attributes: ['likeId', 'userId', 'msgId']
//             }
//         ],
//     })
//     .then((msgFound) => {
//         if (msgFound) {
//           res.status(200).json(msgFound);
//         } else {
//           res.status(404).json({ error: 'Ce message n\'existe pas' })
//         }
//     })
//     .catch((error) => {
//         res.status(500).json({ error: 'Impossible de voir le message' })
//     })
//         models.Message.decrement({
//             'like' : 1,
//             include: [{
//                 model: models.Like,
//                 attributes: ['userId']
//                 }
//             ],
//             content: req.body.content,
//             userId : getUserId(req)
            
//         })
//         .then((msgLiked) => { 
//             res.status(201).json({ message: 'Message liké'})

//         })
//         .catch((error) => {
//             res.status(500).json({ error: 'Impossible de liké le message' })
//         })
// }