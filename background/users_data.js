

let users = [];
let albums = [];
let photos = [];

exports.addUser = function(obj){
    users.push(obj);
};

exports.addAlbum = function(obj){
    albums.push(obj);
};

exports.addPhoto = function(obj){
    photos.push(obj);
};

exports.firstRandomPhotoUser = function(userId)
{
    let tempAlbum = albums.filter(result => result.userId == userId)[0].id;

    let arr = photos.filter(result => result.albumId == tempAlbum);

    return arr[Math.floor(Math.random() * arr.length)];
}




// ONLY FOR TEST (DELETE BEFORE PUSH)
exports.getAllU = function(){
    return users;
};

exports.getAllA = function(){
    return albums;
};

exports.getAllP = function(){
    return photos;
};