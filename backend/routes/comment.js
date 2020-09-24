const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/message/:msgId/comment', commentCtrl.allComments);
router.post('/message/:msgId/comment', commentCtrl.postComment);
router.put('/message/:msgId/comment/:commentId', auth, commentCtrl.updateComment);
router.delete('/message/:msgId/comment/:commentId', auth, commentCtrl.deleteComment);

router.get('/message/:msgId/comment/:commentId/like', commentCtrl.allLikes);
router.post('/message/:msgId/comment/:commentId/like', commentCtrl.postLike);
router.delete('/message/:msgId/comment/:commentId/like/:likeId', auth, commentCtrl.deleteLike);


module.exports = router;