var express = require('express');
var router = express.Router();
var usersController = require('../controllers/Users')

/* GET users listing. */
router.get('/', usersController.userGet);
//post new user
router.post('/', usersController.userPost);
//delete a user
//router.delete('/', usersController.userDelete);
//authenticate user
router.post('/login',usersController.userLogin)

module.exports = router;
