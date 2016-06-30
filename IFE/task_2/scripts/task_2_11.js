var tree = function() {
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
	function traverseDF(fn) {
		(function traverse(currentNode) {
			timer.queue.forEach.call(currentNode.children, e => traverse(e));
			fn(currentNode);
		})(root);
	}
	function traverseBF(fn) {
		var currentNode = root,
			array = [];
		while(currentNode) {
			if(currentNode.children) array.push(...currentNode.children);
			fn(currentNode);
			currentNode = array.shift();
		}
	}
	function choose(fn) {
		var type = document.getElementsByTagName('select')[0].value;
		if(type === 'traverseBF') {
			traverseBF(fn);
		}else if(type === 'traverseDF') {
			traverseDF(fn);
		}
	}
	return {
		show: function() {
			timer.stop();
			choose(timer.add.bind(timer));
			timer.fire();
		},
		contains: function(date) {
			var i;
			timer.stop();
			choose(timer.add.bind(timer));
			i = timer.queue.findIndex(e => e.innerText.match(/\S+/).join() === date);
			if(i === -1) {
				alert('search failed！')
				return false;
			}
			timer.queue = timer.queue.slice(0, i + 1);
			timer.fire();
		}
	};
}();

(function() {
	document.getElementById('charge').addEventListener('click', e => {
		var b = e.target;
		if(b.type !== 'button') return false;
		if(b.value === 'show') tree.show();
		if(b.value === 'contains') tree.contains(document.getElementsByTagName('input')[0].value);
	}, false);
})();
