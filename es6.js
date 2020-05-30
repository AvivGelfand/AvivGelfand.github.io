// // ES6

function foo(a = 10) {
	console.log(a);
}

foo();

var a = 'ofer';
var b = 'bye';

var str = 'my name is ' + a + 'asdf' + b + 'sadf' + b + 'adsfa';
var str2 = `my name is ${a}${b}`;
var str3 = `'my name is ${a}asdf${b}sadf${b}adsfa`;


var name = 'ofer';
var grades = [100, 50, 40];

var obj = {
	name: name,
	grades: grades,
}
var obj2 = {
	name,
	grades
}

function foo(name) {
	var obj = { name };
	// {
	// 	name: 'ofer'
	// }
}

foo('ofer');
// {
// 	name: 'ofer',
// 	grades: [100,50,40]
// }

var obj = {
	a: 100,
	b: 200,
	c: 300
}

var { a, c, ...rest } = obj;
// a = 100
// c = 300
// rest = {b: 200}

var arr = [10, 20, 30, 40];
var [x, y, z, x2] = arr;
// x=10
// y=20
// z=30
// x2=40
var [x, ...blabla] = arr;
//x=10
//blabla = [20,30,40];

function foo(obj) {
	var { a, b, c } = obj;
	// var a = obj.a;
	// var b = obj.b;
	// var c = obj.c;
	return a + b + c;
	// return obj.a + obj.b + obj.c;
}

foo(obj)


//Promise

function foo() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			let rand = Math.random();
			if (rand < 0.5) {
				reject('):');
			}
			else{
				resolve('(:');
			}

		}, 1000);
	});
}

// setInterval(function() {
foo().then(function(data) {
	console.log(data)
}).catch(function(err) {
	console.log(err);
});
// }, 1000);


function bar(timeout) {
	return new Promise(function(resolve) {
		setTimeout(function() {
			resolve(timeout + '(:');
		}, timeout);
	});
}

const arr = [1000, 1500, 1200];

const promiseArray = [bar(1000), bar(1500), bar(1200)];

Promise.all(promiseArray).then(function(results){
	console.log(results);
	// results[0] = //result bar(1000)
	// results[1] = //result bar(1500)
	// results[2] = //result bar(1200)
});
const x5 = arr.map(function(timeout) {
	return bar(timeout);
});
Promise.all(x5).then(function(results) {

});

bar(1000).then(function(result) {
	console.log(result);
})

bar(1500).then(function(result) {
	console.log(result);
})

bar(1200).then(function(result) {
	console.log(result);
})

// use the following api call
https://restcountries.eu/rest/v2/name/ba?fields=name

const fetchData = (url) => {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.status === 200 && this.readyState === 4) {
			console.log(this.responseText);
		}
	}
	xhr.open('get', url);
	xhr.send();
}

const url = 'https://restcountries.eu/rest/v2/name/ba?fields=name';

fetchData(url).then(function(data) {
	console.log(data);
});



