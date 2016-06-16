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
	});
}

function push(event) {
	var num = document.getElementById('input').value;
	if(parseInt(num, 10) == num) {
		var div = createDiv(num);
		if(event.target === document.getElementById('unshift')) {
			divs.unshift(div);
		}else if(event.target === document.getElementById('push')) {
			divs.push(div);
		}
		renderOutput();
	}else {
		alert("请输入一个数字！");
	}
}

function cut(event) {
	if(divs.length === 0) {
		alert("已经全部删完啦！");
	}else {
		if(event.target === document.getElementById('shift')) {
			divs.shift();
		}else if(event.target === document.getElementById('pop')) {
			divs.pop();
		}
		renderOutput();
		return;
	}
}

(function () {
	document.getElementById('unshift').addEventListener('click', push, false);
	document.getElementById('push').addEventListener('click', push, false);
	document.getElementById('shift').addEventListener('click', cut, false);
	document.getElementById('pop').addEventListener('click', cut, false);
	document.getElementById('output').addEventListener('click', function(event) {
		divs = divs.filter(function(ele) {
			return ele !== event.target;
		});
		renderOutput();
	}, false);
})();
