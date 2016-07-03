var tree = function(node) {
	var root = node;
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
	}
	return {
		traverseBF: function(node, fn) {
			var currentNode = node,
				array = [];
			while(currentNode) {
				if (currentNode.children) array.push(...currentNode.children);
				fn(currentNode);
				currentNode = array.shift();
			}
		},
		traverseDF: function(node, fn) {
			(function traverse(currentNode) {
				timer.queue.forEach.call( currentNode.children, e => traverse(e) );
				fn(currentNode);
			})(node);
		},
		cut: function(node) {
			stop();
			node.remove();
		},
		add: function(node, date) {
			var div = document.createElement('div');
			div.appendChild( document.createTextNode(date) );
			node.appendChild(div);
		}
	};
}( document.getElementById('root') );

(function() {
	var root = document.getElementById('root');
	tree.traverseDF( root, node => node.classList.add('hidden') );
	root.addEventListener('click', e => {
		var clickedNode = e.target;
		if(!clickedNode.children[0]) return false;
		if (/hidden/.test(clickedNode.children[0].className)) {
			[].forEach.call( clickedNode.children, node => node.classList.remove('hidden') );
		} else {
			tree.traverseBF(clickedNode, node => node.className = 'hidden');
			clickedNode.className = '';
		}
	});
})();