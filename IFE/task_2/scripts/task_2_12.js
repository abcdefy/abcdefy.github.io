var tree = function(node) {
	var root = node;
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
	tree.traverseDF( root, node => node.classList.add('hidden') );

	function expand(e) {
		var clickedNode = e.target || e;
		if (!clickedNode.children[0]) return false;
		if (/hidden/.test(clickedNode.children[0].className)) {
			[].forEach.call( clickedNode.children, node => node.className = '' );
		} else {
			tree.traverseBF(clickedNode, node => node.className ='hidden');
			clickedNode.className = '';
		}
	}

	function search(e) {
		var data = document.getElementsByTagName('input')[0].value;
		tree.traverseBF(root, node => node.className ='hidden');
		tree.traverseBF(root, function(node) {
			if ( node.innerText.match(/\S+/).join() === data ) {
				node.style.color = 'firebrick';
				(function() {
					if ( node !== root ) {
						node = node.parentElement;
						[].forEach.call( node.children, node => node.className ='' );
						arguments.callee();
					}
				})();
			}
			node.style.color = 'black';
		});
	}

	root.addEventListener('click', expand, false);
	document.getElementsByTagName('button')[0].addEventListener('click', search);
})();
