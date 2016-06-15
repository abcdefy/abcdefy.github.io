var divs = [];

function createDiv(num) {
	var div = document.createElement('div')
	   ,content = document.createTextNode(num);
	div.appendChild(content);
	div.setAttribute("class", "num");
	return div;
}

function renderOutput() {
	var output = document.getElementById('output');
	output.innerHTML = '';
	divs.forEach(function(div) {
		output.appendChild(div);
		div.addEventListener('click', function(event){
			var divClicked = event.target;
			divs = divs.filter(function(ele) {
				return ele != divClicked;
			});
			renderOutput();
		}, false);
	});
}

function unshift(event) {
	var num = document.getElementById('input').value;
	if(parseInt(num, 10) == num) {
		var div = createDiv(num);
		divs.unshift(div);
		renderOutput();
	}else {
		alert("请输入一个数字！");
	}
}

function push(event) {
	var num = document.getElementById('input').value;
	if(parseInt(num, 10) == num) {
		var div = createDiv(num);
		divs.push(div);
		renderOutput();
	}else {
		alert("请输入一个数字！");
	}
}

function shift(event) {
	if(divs.length === 0) {
		alert("已经全部删完啦！");
	}else {
		divs.shift();
		renderOutput();
	}
}

function pop(event) {
	if(divs.length === 0) {
		alert("已经全部删完啦！");
	}else {
		divs.pop();
		renderOutput();
	}
}

(function () {
	document.getElementById('unshift').addEventListener('click', unshift, false);
	document.getElementById('push').addEventListener('click', push, false);
	document.getElementById('shift').addEventListener('click', shift, false);
	document.getElementById('pop').addEventListener('click', pop, false);
})();
