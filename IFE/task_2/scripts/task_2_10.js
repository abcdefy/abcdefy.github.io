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
					current.style = 'background-color: red';
					timer.timerId = setTimeout(arguments.callee, 350);
				}
			})();
		},
		stop: function() {
			clearTimeout(this.timerId);
			this.timerId = 0;
			this.queue = [];
			var divs = document.getElementsByTagName('div');
			[].forEach.call(divs, e => e.style = 'background-color: white');
		}
	};

	function preOrder(node) {
		if(node) {
			timer.add(node);
			arguments.callee(node.children[0]);
			arguments.callee(node.children[1]);
		}
	}

	function inOrder(node) {
		if(node) {
			arguments.callee(node.children[0]);
			timer.add(node);
			arguments.callee(node.children[1]);
		}
	}

	function postOrder(node) {
		if(node) {
			arguments.callee(node.children[0]);
			arguments.callee(node.children[1]);
			timer.add(node);
		}
	}

	return {
		show: function(str) {
			timer.stop();
			switch (str) {
				case 'preOrder':
					preOrder(root);
					break;
				case 'inOrder':
					inOrder(root);
					break;
				case 'postOrder':
					postOrder(root);
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
