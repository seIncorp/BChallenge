let tempuser = {};
let tempalbum = {};
let tempPhotos = {};

function users(){
	let it;
	let value;

    it = usersCall();
    value = it.next().value;
    it.next(value);
}

function *usersCall(){

	let res = yield request({
		type: 'POST', 
		url: '/users', 
		dataR: JSON.stringify({})
	});

	res.then( obj => {
        console.log(obj)

        if(obj.status == 'true')
        {
            document.getElementById('main').innerHTML = '';
            tempuser = {};
            tempalbum = {};
            tempPhotos = {};

            document.getElementById('breadcrumbs').innerHTML = `<label id="1" onclick="users()">users</label>`;

            framework.create('table','usersTable')
            .append('main');

            framework.create('tr')
            .body(
                framework.create('th').body('Username').element()
            )
            .body(
                framework.create('th').body('Name').element()
            )
            .body(
                framework.create('th').body('Photo').element()
            )
            .append('usersTable');

            obj.data.forEach(element => {

                framework.create('tr')
                .event("click", function(){
                    albums(element);
                })
                .body(
                    framework.create('td').body(element.user.username).element()
                )
                .body(
                    framework.create('td').body(element.user.name).element()
                )
                .body(
                    framework.create('td').body(`
                        <img src="${element.thumbnail.thumbnailUrl}" height="75" width="75">
                    `).element()
                )
                .append('usersTable');
            });
        }
	}).catch(err => console.log(err));
}

function albums(element){

    tempuser = element;

	let it;
	let value;

    it = albumsCall(element.user.id);
    value = it.next().value;
    it.next(value);
}

function *albumsCall(userId){

	let res = yield request({
		type: 'POST', 
		url: '/albums', 
		dataR: JSON.stringify({
            userId: userId
        })
    });
    
    res.then( obj => {
        console.log(obj)

        if(obj.status == 'true')
        {
            tempalbum = {};
            tempPhotos = {};

            document.getElementById('breadcrumbs').innerHTML = `<label id="1" onclick="users()">users</label>`;
            framework.create('label','2').body(`&nbsp;> ${tempuser.user.username}`).append('breadcrumbs');

            document.getElementById('main').innerHTML = '';

            framework.create('table','albumsTable')
            .append('main');

            framework.create('tr')
            .body(
                framework.create('th').body('Title').element()
            )
            .body(
                framework.create('th').body('Thumbnails').element()
            )
            .append('albumsTable');

            obj.data.forEach(element => {
                console.log(element);

                let tempThumbnails = '';

                element.thumbnails.forEach(el => {
                    tempThumbnails += `<img src="${el.thumbnailUrl}" height="75" width="75">`
                });

                framework.create('tr')
                .event("click", function(){
                    photos(element);
                })
                .body(
                    framework.create('td').body(element.album.title).element()
                )
                .body(
                    framework.create('td').body(tempThumbnails).element()
                )
                .append('albumsTable');
            });
        }
    });
}

function photos(element){

    tempalbum = element;

	let it;
	let value;

    it = photosCall(element.album.id);
    value = it.next().value;
    it.next(value);
}

function *photosCall(albumId){

	let res = yield request({
		type: 'POST', 
		url: '/photos', 
		dataR: JSON.stringify({
            albumId: albumId
        })
    });

    res.then( obj => {
        console.log(obj);

        if(obj.status == 'true')
        {
            tempPhotos = obj.data;

            document.getElementById('breadcrumbs').innerHTML = `<label id="1" onclick="users()">users</label>`;
            framework.create('label','2').body(`&nbsp;> ${tempuser.user.username}`).append('breadcrumbs');
            framework.create('label','3').body(`&nbsp;> ${tempalbum.album.title}`).append('breadcrumbs');
            
            document.getElementById('2').onclick = function(){
                albums(tempuser);
            };

            document.getElementById('main').innerHTML = '';

            obj.data.forEach((element,id) => {

                framework.create('div',`img${element.id}`).style({
                    display: 'inline-flex',
                    position: 'relative'
                })
                .body(`<img id="${element.id+'img'}" src="${element.thumbnailUrl}" style="position:relative;" onclick="openImage('${element.id}')">`)
                .append('main');

                 framework.create('div')
                .class('imageTitle')
                .body(element.title)
                .append(`img${element.id}`);
            });
        }
    });
}

function openImage(id)
{
    let element = tempPhotos.filter(ee => ee.id == id)[0];

    let body = document.body;
    
    framework.create('iframe','iframe')
    .style({
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        top: '0',
        width: '100%',
        height: body.offsetHeight+'px',
        'z-index': '1000',
        'background-color': 'black',
        opacity: '0.4'
    })
    .append('body');

    framework.create('div','fullImage').style({
        'z-index': '1001',
        position: 'absolute',
        top: '100px',
        left: '100px'
    })
    .body(`<img src="${element.url}" onclick="showHideDetails('detailsView')">`)
    .body(

        framework.create('div')
        .body(
            framework.create('label')
            .style({
                position: 'absolute',
                bottom: '1%',
                left: '1%',
                'background-color': 'white',
                opacity: '0.6'
            })
            .body(element.title)
            .element()
        )
        .body(
            `
                <div id="detailsView" class="detailsImage">
                    <label>Image title: ${element.title}</label><br>
                    <label>Album title: ${tempalbum.album.title}</label><br>
                    <label>User name: ${tempuser.user.name}</label>
                </div>
            
                <button onclick="closeImage()" class="closeButton">Close</button>
            `
        )
        .element()
    )
    .append('body');
}

function closeImage()
{
    let elem1 = document.getElementById('iframe');
    elem1.parentNode.removeChild(elem1);

    let elem2 = document.getElementById('fullImage');
    elem2.parentNode.removeChild(elem2);
}

function showHideDetails()
{
    let elem = document.getElementById('detailsView');

    if(elem.style.display == 'none')
        elem.style.display = 'block';
    else
        elem.style.display = 'none';
}

function request({type, url, dataR=''}){
	return new Promise((resolve, reject)=>{
		let xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) 
			{
                let obj = JSON.parse(this.responseText);
				resolve(obj);
			}
		};
		
		xhttp.open(type, url,true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send(dataR);
	});	
}