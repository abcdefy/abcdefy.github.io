var timers = {
	timerID: 0,
	timers: [],
	add: function(fn) {
		this.timers.push(fn);
	},
	start: function() {
		if (this.timerID) return;
		(function() {
			if (timers.timers.length > 0) {
				for (var i = 0; i < timers.timers.length; i++) {
					if (timers.timers[i]() === false) {
						timers.timers.splice(i,1);
						i--;
					}
				}
				timers.timerID = setTimeout(arguments.callee, 0);
			}
		})();
	},
	stop: function() {
		clearTimeout(this.timerID);
		this.timerID = 0;
	}
};

function renderOutput(divs) {
	var output = document.getElementById('output');
	output.innerHTML = '';
	divs.forEach(function(div) {
		output.appendChild(div);
	});
}

function push(e) {
	var num = document.getElementById('input').value;
	if(divs.length >= 60 ){
		alert("现在暂时不能添加啦！");
		return false;
	}else if(parseInt(num, 10) == num && num >= 10 && num <= 99) {
		var div = document.createElement('div');
		div.num = num;
		div.setAttribute('class', 'num');
		div.setAttribute('title', num);
		div.setAttribute('style', 'padding-top:' + 2*num + 'px; padding-bottom:' + 2*num + 'px');
		if(e.target === document.getElementById('unshift')) {
			divs.unshift(div);
		}else if(e.target === document.getElementById('push')) {
			divs.push(div);
		}
		renderOutput(divs);
	}else {
		alert("请输入一个范围是10到99的数字！");
	}
}

function cut(e) {
	if(divs.length === 0) {
		alert("现在暂时不能删除啦!");
		return false;
	}else {
		if(e.target === document.getElementById('shift')) {
			var div = divs.shift();
		}else if(e.target === document.getElementById('pop')) {
			var div = divs.pop();
		}
		alert(div.num);
		renderOutput(divs);
	}
}

function sort() {
	var i = divs.length, j;
    var temp_exchangVal, queue = [];
    while (i > 0) {
        for (j = 0; j < i - 1; j++) {
            if (divs[j].num > divs[j + 1].num) {
                temp_exchangVal = divs[j];
                divs[j] = divs[j + 1];
                divs[j + 1] = temp_exchangVal;
                var current_divs = divs.concat([]);
                current_divs.big_num = j;
                queue.push(current_divs);
            }
        }
        i--;
    }
    timers.add(function() {
    	divs = queue.shift();
    	renderOutput(divs);
    	if (queue.length === 0) {
    		return false;
    	}
    });
	timers.start();
}

(function () {
	(function () {
		this.divs = [];
		for (var i = 0; i < 60; i++) {
			var div = document.createElement('div');
		   	div.num = Math.floor(Math.random() * 91 + 9);
			div.setAttribute('class', 'num');
			div.setAttribute('title', div.num);
			div.setAttribute('style', 'padding-top:' + 2*div.num + 'px; padding-bottom:' + 2*div.num + 'px');
			divs.push(div);
		};
		renderOutput(divs);
	})();
	document.getElementById('unshift').addEventListener('click', push, false);
	document.getElementById('push').addEventListener('click', push, false);
	document.getElementById('shift').addEventListener('click', cut, false);
	document.getElementById('pop').addEventListener('click', cut, false);
	document.getElementById('sort').addEventListener('click', sort, false);
	document.getElementById('output').addEventListener('click', function(e) {
		divs = divs.filter(function(ele) {
			return ele !== e.target;
		});
		renderOutput(divs);
	}, false);
})();