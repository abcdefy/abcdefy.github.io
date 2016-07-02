var tree = function() {
	var root = document.getElementById('root'),
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
					timer.timerId = setTimeout(arguments.callee, 300);
				}
			})();
		}
	};
	function stop() {
		clearTimeout(timer.timerId);
		timer.timerId = 0;
		queue = [];
		timer.queue = [];
		var divs = document.getElementsByTagName('div');
		queue.forEach.call(divs, e => e.style = 'background-color: white');
	}
	function traverseDF(node) {
		(function traverse(currentNode) {
			queue.forEach.call(currentNode.children, e => traverse(e));
			queue.push(currentNode);
		})(node);
	}
	function traverseBF(node) {
		var currentNode = node,
			array = [];
		while(currentNode) {
			if (currentNode.children) array.push(...currentNode.children);
			queue.push(currentNode);
			currentNode = array.shift();
		}
	}
	function choose(node) {
		var type = document.getElementsByTagName('select')[0].value;
		if (type === 'traverseBF') {
			traverseBF(node);
		}else if (type === 'traverseDF') {
			traverseDF(node);
		}
	}
	return {
		show: function() {
			stop();
			choose(root);
			queue.push(queue[queue.length - 1]);
			queue.forEach( (i, index, array) => {
				timer.add(function() {
					i.style.backgroundColor = 'mediumspringgreen';
					if (array[index - 1]) { array[index - 1].style.backgroundColor = 'white'; };
					return true;
				});
			});
			timer.fire();
		},
		contains: function(date) {
			stop();
			choose(root);
			queue.push(queue[queue.length - 1]);
			queue.forEach( (i, index, array) => {
				timer.add(function() {
					i.style.backgroundColor = i.innerText.match(/\S+/).join() === date ? 'firebrick' : 'mediumspringgreen';
					if (array[index - 1]) { array[index - 1].style.backgroundColor = array[index - 1].style.backgroundColor === 'firebrick' ? 'firebrick' : 'white'; }
					return true;
				});
			});
			timer.fire();
		},
		reset: function() {
			stop();
		},
		cut: function(node) {
			stop();
			node.remove();
		},
		add: function(node, date) {
			var div = document.createElement('div');
			div.appendChild(document.createTextNode(date));
			node.appendChild(div);
		}
	};
}();

(function() {
	var current = null;
	document.getElementById('charge').addEventListener('click', e => {
		var b = e.target, v = b.value;
		if (b.type !== 'button') { return false; }
		if (v === 'show') { tree.show(); }
		if (v === 'contains') { tree.contains(document.getElementsByTagName('input')[0].value); }
		if (v === 'cut' && current) { tree.cut(current); }
		if (v === 'add') { tree.add(current, document.getElementsByTagName('input')[1].value); }
	}, false);
	document.getElementById('root').addEventListener('click', e => {
		tree.reset();
		e.target.style.backgroundColor = 'firebrick';
		current = e.target;
	}, false);
})();
