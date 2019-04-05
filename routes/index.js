var express = require('express');
var router = express.Router();
let UsersData = require('../background/users_data');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'BChalleng' });
});

router.post('/users', function(req, res, next) {
  res.status(200).json({
    status: 'true',
    data: UsersData.getAllU()
  });
});

router.post('/albums', function(req, res, next) {
  res.status(200).json({
    status: 'true',
    data: UsersData.getAlbumsByUser(req.body.userId)
  });
});

router.post('/photos', function(req, res, next) {
  res.status(200).json({
    status: 'true',
    data: UsersData.getPhotosByAlbum(req.body.albumId)
  });
});


module.exports = router;
