const request = require('request');
const fetch = require('node-fetch');



exports.getUsers = async () => {

	const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
	return await res.json();
};

exports.getAlbums = async () => {

	const res = await fetch(`https://jsonplaceholder.typicode.com/albums`);
	return await res.json();
};

exports.getPhotos = async () => {

	const res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
	return await res.json();
};