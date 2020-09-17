const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/user/signup', userCtrl.signup);
router.post('/user/login', userCtrl.login);
router.get('/user/profil/:id', userCtrl.viewProfil);
router.put('/user/profil/:id', auth, userCtrl.editProfil);
router.delete('/user/profil/:id', auth, userCtrl.deleteProfil);


module.exports = router;