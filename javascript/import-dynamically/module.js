function Fetch(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});
}

export function DoIt(params){	
	return new Promise((resolve, reject) => {
		Fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5').then((ok) => {			
			resolve(ok);
		})
		.catch((err) => { 
			reject(err);
		});
	});
}

/*
export class ClassName {
    
}
*/