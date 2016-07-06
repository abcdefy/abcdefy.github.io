var tree = function(node) {
	return {
		traverseBF: function(node, fn) {
			var currentNode = node,
				array = [];
			while (currentNode) {
				if (currentNode.children) array.push(...currentNode.children);
				fn(currentNode);
				currentNode = array.shift();
			}
		},
		traverseDF: function(node, fn) {
			(function traverse(currentNode) {
				[].forEach.call( currentNode.children, e => traverse(e) );
				fn(currentNode);
			})(node);
		},
		cut: function(node) {
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

	function set() {
		tree.traverseDF(root, node => {
			node.classList.add('hidden');
			if ( node.children.length !== 0 ) {
				node.classList.add('before1');
			}
		});
	}

	function expand(e) {
		var clickedNode = e.target || e;
		if (!clickedNode.children[0]) return false;
		if (/hidden/.test(clickedNode.children[0].className)) {
			clickedNode.classList.remove('before1');
			clickedNode.classList.add('before2');
			[].forEach.call( clickedNode.children, node => node.classList.remove('hidden') );
		} else {
			tree.traverseBF( clickedNode, node => {
				node.classList.add('hidden');
				if (node.children.length !== 0) {
					node.classList.remove('before2');
					node.classList.add('before1');
				}
			});
			clickedNode.classList.remove('hidden');
		}
	}

	function search(e) {
		var data = document.getElementsByTagName('input')[0].value;
		set();
		tree.traverseBF(root, function(node) {
			if ( node.innerText.match(/\S+/).join() === data ) {
				node.style.color = 'firebrick';
				(function() {
					if ( node !== root ) {
						node = node.parentElement;
						[].forEach.call( node.children, node => node.classList.remove('hidden') );
						arguments.callee();
					}
				})();
			}
			node.style.color = 'black';
		});
	}

	set();
	root.addEventListener('click', expand, false);
	document.getElementsByTagName('button')[0].addEventListener('click', search);
})();
