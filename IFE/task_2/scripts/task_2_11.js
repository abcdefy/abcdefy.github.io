var order = function() {
	var root = document.getElementById('root');
	var timer = {
		timerId: 0,
		queue: [],
		add: function(node) {
			this.queue.push(node);
		},
		fire: function() {
			if(this.timerId) return;
			var current = timer.queue[0];
			(function() {
				current.style = 'background-color: white';
				if(timer.queue.length > 0) {
					current = timer.queue.shift();
					current.style = 'background-color: mediumspringgreen';
					timer.timerId = setTimeout(arguments.callee, 350);
				}
			})();
		},
		stop: function() {
			clearTimeout(this.timerId);
			this.timerId = 0;
			this.queue = [];
			var divs = document.getElementsByTagName('div');
			this.queue.forEach.call(divs, e => e.style = 'background-color: white');
		}
	};
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
			if(currentNode.children) array.push(...currentNode.children);
			fn(currentNode);
			currentNode = array.shift();
		}
	}
	return {
		show: function(str) {
			timer.stop();
			switch (str) {
				case 'traverseDF':
					traverseDF(root, timer.add.bind(timer));
					break;
				case 'traverseBF':
					traverseBF(root, timer.add.bind(timer));
					break;
				default:
					return false;
			}
			timer.fire();
		}
	};
}();

(function() {
	document.getElementById('charge').addEventListener('click', e => order.show(e.target.value), false);
})();