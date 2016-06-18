var divs = [];

function renderOutput() {
	var output = document.getElementById('output');
	output.innerHTML = '';
	divs.forEach(function(div) {
		output.appendChild(div);
	});
}

function push(event) {
	var num = document.getElementById('input').value;
	if(divs.length >= 60){
		alert("再也加不动啦！");
		return false;
	}else if(parseInt(num, 10) == num && num >= 10 && num <= 99) {
		var div = document.createElement('div');
		div.num = num;
		div.setAttribute("class", "num");
		div.setAttribute("title", num);
		div.setAttribute("style", 'padding-top:' + 2*num + 'px; padding-bottom:' + 2*num + 'px');
		if(event.target === document.getElementById('unshift')) {
			divs.unshift(div);
		}else if(event.target === document.getElementById('push')) {
			divs.push(div);
		}
		renderOutput();
	}else {
		alert("请输入一个范围是10到99的数字！");
	}
}

function cut(event) {
	if(divs.length === 0) {
		alert("已经全部删完啦！");
	}else {
		if(event.target === document.getElementById('shift')) {
			var div = divs.shift();
		}else if(event.target === document.getElementById('pop')) {
			var div = divs.pop();
		}
		alert(div.num);
		renderOutput();
	}
}
function sort() {
	return function bubbleSort() {
    	var i = divs.length;
   		var j = 0, timer, tempExchangVal;
    	function queue() {
        	if(divs[j].num > divs[j + 1].num) {
        		timer = 50;
            		tempExchangVal = divs[j];
            		divs[j] = divs[j + 1];
            		divs[j + 1] = tempExchangVal;
            		renderOutput();
        	}
        	j += 1;
    		if(j >= i-1) {
            		i -= 1;
            		j = 0;
            		if(i === 0) {
            			return true;
            		}
        	}
        	timer = timer || 0;
        	setTimeout(queue, timer);
    	}
    	queue();
	}
}

(function () {
	document.getElementById('unshift').addEventListener('click', push, true);
	document.getElementById('push').addEventListener('click', push, true);
	document.getElementById('shift').addEventListener('click', cut, true);
	document.getElementById('pop').addEventListener('click', cut, true);
	document.getElementById('sort').addEventListener('click', sort(), true)
	document.getElementById('output').addEventListener('click', function(event) {
		divs = divs.filter(function(ele) {
			return ele !== event.target;
		});
		renderOutput();
	}, false);
})();
