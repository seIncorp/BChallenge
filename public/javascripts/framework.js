let framework = {
	create: function(type, id){
		
		let temp = document.createElement(type);

		if(id != undefined)
			temp.id = id;
		
		this.typeInput = null;
		this.value = null;

		if(type == 'input')
		{
			this.typeInput = function(t){
				temp.type = t;
				return tempObj;
			};

			this.value = function(val){
				temp.value = val;
				return tempObj;
			};

			this.placeholder = function(val){
				temp.placeholder = val;
				return tempObj;
			};
		}

		this.event = function(t,fn){
			temp.addEventListener(t, fn);
			
			return tempObj;
		};
		
		this.body = function(data){
			if(typeof data == 'object')
			{
				let d = data.outerHTML;
				temp.innerHTML += d;
			}
			else
				temp.innerHTML += data;
			
			return tempObj;
		};
		
		this.style = (data) => {
			Object.keys(data).forEach(key => {
				
				temp.style[key] = data[key];
			});

			return tempObj;
		};
		
		this.append = (i) => {
			document.getElementById(i).append(temp);

			return tempObj;
		};

		this.prepand = (i) => {
			let d = document.getElementById(i)
			d.insertBefore(temp,d.firstChild);
			return tempObj;
		};
		
		this.class = (data)=>{
			
			if(Array.isArray(data))
				data.forEach(d => temp.classList.add(d));
			else
				temp.classList.add(data);

			return tempObj;
		};
		
		this.element = ()=>{
			return temp;
		};
		
		
		let tempObj = {
				body: this.body,
				style: this.style,
				append: this.append,
				'class': this.class,
				element: this.element,
				event: this.event,
				typeInput: this.typeInput,
				value: this.value,
				placeholder: this.placeholder,
				prepand: this.prepand
			};
		
		return tempObj;
	}
};