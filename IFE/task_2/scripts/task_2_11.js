var tree = function() {
	var root = document.getElementById('root'),
		current,
		queue = [];
	var timer = {
		timerId: 0,
		queue: [],
		add: function(fn) {
			this.queue.push(fn);
		},
		fire: function() {
			(function() {
				if (timer.queue.length > 0) {
					if (timer.queue[0]()) timer.queue.shift();
					timer.timerId = setTimeout(arguments.callee, 350);
				}
			})();
		},
		stop: function() {
			clearTimeout(this.timerId);
			this.timerId = 0;
			queue = [];
			var divs = document.getElementsByTagName('div');
			this.queue.forEach.call(divs, e => e.style = 'background-color: white');
		}
	};
	function traverseAni() {
		if (current) current.style = 'background-color: white';
		current = queue.shift();
		if (current) {
			current.style = 'background-color: mediumspringgreen';
			return false;
		}
		return true;
	}
	function traverseDF() {
		(function traverse(currentNode) {
			queue.forEach.call(currentNode.children, e => traverse(e));
			queue.push(currentNode);
		})(root);
	}
	function traverseBF() {
		var currentNode = root,
			array = [];
		while(currentNode) {
			if (currentNode.children) array.push(...currentNode.children);
			queue.push(currentNode);
			currentNode = array.shift();
		}
	}
	function choose(fn) {
		var type = document.getElementsByTagName('select')[0].value;
		if (type === 'traverseBF') {
			traverseBF();
		}else if (type === 'traverseDF') {
			traverseDF();
		}
	}
	return {
		show: function() {
			timer.stop();
			choose();
			timer.add(traverseAni);
			timer.fire();
		},
		contains: function(date) {
			var i;
			timer.stop();
			choose();
			i = queue.findIndex(e => e.innerText.match(/\S+/).join() === date);
			if (i === -1) {
				alert('Search failed！');
				return false;
			}
			queue = queue.slice(0, i + 1);
			i = queue[i];
			timer.add(traverseAni);
			timer.add(e => i.style = 'background-color: firebrick');
			timer.fire();
		}
	};
}();

(function() {
	document.getElementById('charge').addEventListener('click', e => {
		var b = e.target;
		if (b.type !== 'button') return false;
		if (b.value === 'show') tree.show();
		if (b.value === 'contains') tree.contains(document.getElementsByTagName('input')[0].value);
	}, false);
})();
