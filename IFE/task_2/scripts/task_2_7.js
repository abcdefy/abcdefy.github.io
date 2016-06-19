var divs = [];

function createDiv() {
	divs = [];
	for (var i = 0; i < 60; i++) {
		var div = document.createElement('div');
	   	div.num = Math.floor(Math.random() * 91 + 9);
		div.setAttribute("class", "num");
		div.setAttribute("title", div.num);
		div.setAttribute("style", 'padding-top:' + 2*div.num + 'px; padding-bottom:' + 2*div.num + 'px');
		divs.push(div);
	};
	renderOutput();
}

function renderOutput() {
	var output = document.getElementById('output');
	output.innerHTML = '';
	divs.forEach(function(div) {
		output.appendChild(div);
	});
}

function push(e) {
	var num = document.getElementById('input').value;
	if(divs.length >= 60 || divs.in_animation === true){
		alert("现在暂时不能添加啦！");
		return false;
	}else if(parseInt(num, 10) == num && num >= 10 && num <= 99) {
		var div = document.createElement('div');
		div.num = num;
		div.setAttribute("class", "num");
		div.setAttribute("title", num);
		div.setAttribute("style", 'padding-top:' + 2*num + 'px; padding-bottom:' + 2*num + 'px');
		if(e.target === document.getElementById('unshift')) {
			divs.unshift(div);
		}else if(e.target === document.getElementById('push')) {
			divs.push(div);
		}
		renderOutput();
	}else {
		alert("请输入一个范围是10到99的数字！");
	}
}

function cut(e) {
	if(divs.length === 0 || divs.in_animation === true) {
		alert("现在暂时不能删除啦!");
		return false;
	}else {
		if(e.target === document.getElementById('shift')) {
			var div = divs.shift();
		}else if(e.target === document.getElementById('pop')) {
			var div = divs.pop();
		}
		alert(div.num);
		renderOutput();
	}
}
function sort() {
	return function bubbleSort() {
    	var i = divs.length
   		   ,j = 0
   		   ,delay, tempExchangVal;
   		divs.in_animation = true;
    	function queue() {
        	if(divs[j].num <= divs[j + 1].num) {
        		delay = false;
        		divs[j].setAttribute('class', 'num');
        	}
        	if(divs[j].num > divs[j + 1].num) {
        		delay = true;
            	divs[j].setAttribute('class', 'current');
            	tempExchangVal = divs[j];
            	divs[j] = divs[j + 1];
            	divs[j + 1] = tempExchangVal;
            	renderOutput();
        	}
        	j += 1;
    		if(j >= i-1) {
        		divs[j].setAttribute('class', 'num');
            	j = 0;
            	i -= 1;
            	if(i === 0) {
            		divs.in_animation = false;
            		return true;
            	}
        	}
        	if(delay) {
        		setTimeout(queue, 20);
        	}else{
        		queue();
        	}
    	}
    	queue();
	}
}

(function () {
	createDiv();
	document.getElementById('unshift').addEventListener('click', push, false);
	document.getElementById('push').addEventListener('click', push, false);
	document.getElementById('shift').addEventListener('click', cut, false);
	document.getElementById('pop').addEventListener('click', cut, false);
	document.getElementById('sort').addEventListener('click', sort(), false)
	document.getElementById('output').addEventListener('click', function(e) {
		if (divs.in_animation) {
			alert('手不要滑！！')
		}else {
			divs = divs.filter(function(ele) {
				return ele !== e.target;
			});
			renderOutput();
		}
	}, false);
})();
