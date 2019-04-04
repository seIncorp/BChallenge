var express = require('express');
var router = express.Router();

let UsersData = require('../background/users_data');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});














// ONLY FOR TEST (DELETE BEFORE PUSH)
router.get('/getAll',function(req, res, next) {
  res.status(200).json({
    users: UsersData.getAllU(),
    albums: UsersData.getAllA(),
    photos: UsersData.getAllP()
  });
});

router.get('/getRandom',function(req, res, next) {
  res.status(200).json({
    photo: UsersData.firstRandomPhotoUser(1)
  });
});

module.exports = router;
