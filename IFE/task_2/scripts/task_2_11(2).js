var tree = function() {
	var root = document.getElementById('root');
	var timer = {
		timerId: 0,
		queue: [],
		add: function(fn) {
			this.queue.push(fn);
		},
		fire: function() {
			(function() {
				if (timer.queue.length > 0) {
					if (timer.queue[0]()) {
						timer.queue.shift();
						arguments.callee();
					}else {
						timer.timerId = setTimeout(arguments.callee, 300);
					}
				}
			})();
		}
	};
	function stop() {
		clearTimeout(timer.timerId);
		timer.timerId = 0;
		timer.queue = [];
		var divs = document.getElementsByTagName('div');
		timer.queue.forEach.call(divs, e => e.style = 'background-color: white');
	}
	function traverseDF(node, fn) {
		(function traverse(currentNode) {
			timer.queue.forEach.call(currentNode.children, e => traverse(e));
			fn(currentNode);
		})(node);
	}
	function traverseBF(node, fn) {
		var currentNode = node,
			array = [];
		while(currentNode) {
			if (currentNode.children) array.push(...currentNode.children);
			fn(currentNode);
			currentNode = array.shift();
		}
	}
	function choose() {
		var type = document.getElementsByTagName('select')[0].value;
		if (type === 'traverseBF') {
			return traverseBF;
		}else if (type === 'traverseDF') {
			return traverseDF;
		}
	}
	return {
		show: function() {
			stop();
			choose()(root, function(node) {
				timer.add(function() {
					node.style.backgroundColor = node.style.backgroundColor === 'white' ? 'mediumspringgreen' : 'white';
					return node.style.backgroundColor === 'white';
				});
			});
			timer.fire();
		},
		contains: function(date) {
			stop();
			choose()(root, function(node) {
				timer.add(function() {
					var color = node.innerText.match(/\S+/).join() === date ? 'firebrick' : 'mediumspringgreen';
					node.style.backgroundColor = node.style.backgroundColor=== 'white' ? color : 'white';
					return ( node.style.backgroundColor === 'white' )||( node.style.backgroundColor === 'firebrick' );
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