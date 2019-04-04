

function users(){
	let it;
	let value;

    it = usersCall();
    value = it.next().value;
    it.next(value);
}

function *usersCall(){

	let res1 = yield request({
		type: 'POST', 
		url: '/users', 
		dataR: JSON.stringify({})
	});

	res1.then( obj => {
        console.log(obj)

        if(obj.status == 'true')
        {
            document.getElementById('main').innerHTML = '';

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
            
            function modifyText(e)
                {
                    console.log(e.user.username);
                }


            obj.data.forEach(element => {
                console.log(element);

                

                framework.create('tr').event("click", function(){modifyText(element)})
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