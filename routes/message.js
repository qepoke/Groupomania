const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const msgCtrl = require('../controllers/message');

router.get('/message/', msgCtrl.allMessages);
router.post('/message/', msgCtrl.postMessage);
router.get('/message/:msgId', msgCtrl.viewMessage);
router.put('/message/:msgId', auth, msgCtrl.editMessage);
router.delete('/message/:msgId', auth, msgCtrl.deleteMessage);

router.get('/message/:msgId/like', msgCtrl.allLikes);
router.post('/message/:msgId/like', msgCtrl.postLike);
router.delete('/message/:msgId/like/:likeId', auth, msgCtrl.deleteLike);




module.exports = router;