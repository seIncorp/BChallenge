let tempuser = {};
let tempalbums = {};


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
            framework.create('label').body(`&nbsp;> ${tempuser.user.username}`).append('breadcrumbs');

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
                    photos(element.album.id);
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

function photos(a){

   console.log('PPPPPPPPPP',a);
}





function request({type, url, dataR=''}){
	return new Promise((resolve, reject)=>{
		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) 
			{
                let obj = JSON.parse(this.responseText);
				resolve(obj);
			}
		
			// TODO: dodaj še za reject. ali to prepusti naslednjim funkcijam?
		};
		
		xhttp.open(type, url,true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send(dataR);
	});	
}