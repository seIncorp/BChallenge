

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

exports.firstRandomPhotoThumbnailUser = function(userId)
{
    let tempAlbum = albums.filter(result => result.userId == userId)[0].id;

    let arr = photos.filter(result => result.albumId == tempAlbum);

    return arr[Math.floor(Math.random() * arr.length)];
}

exports.someRandomPhotosThumbnailsAlbum = function(albumId){
    let arrPhotos = photos.filter(result => result.albumId == albumId);

    let numberOfPhotos = 3;
    let tempRandom = [];
    for(let i = 0; i< numberOfPhotos; i++)
        tempRandom.push(arrPhotos[Math.floor(Math.random() * arrPhotos.length)]);
    
    return tempRandom;
};

exports.getAllU = function(){
    return users;
};

exports.getAlbumsByUser = function(userId)
{
    let temp = albums.filter(result => result.userId == Number(userId))
    let arrayAlbums = [];

    temp.forEach(element => {
        arrayAlbums.push({
            album: element,
            thumbnails: exports.someRandomPhotosThumbnailsAlbum(element.id)
        });
    });

    return arrayAlbums;
}

exports.getPhotosByAlbum = function(albumId){
    let arrPhotos = photos.filter(result => result.albumId == albumId);

    return arrPhotos;
}

