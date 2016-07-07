(function() {

	function Node(elementNode) {
		this.data = elementNode;
		this.parent = null;
		this.children = [];
	}

	function Tree(elementNode) {
		var node = new Node(elementNode);
		this._root = node;
	}

	Tree.prototype.traverseDF = function(callback, node) {
		node = node || this._root;
		(function recurse(currentNode) {
			currentNode.children.forEach( e => recurse(e) );
			callback(currentNode);
		})(node);
	};

	Tree.prototype.traverseBF = function(callback, node) {
		var queue = [];
		node = node || this._root;
		queue.push(node);
		currentTree = queue.shift();
		while(currentTree){
			queue.push(...currentTree.children);
			callback(currentTree);
			currentTree = queue.shift();
		}
	};

	Tree.prototype.contains = function(callback, traversal) {
		traversal.call(this, callback);
	};

	Tree.prototype.add = function(data, toData, traversal) {
		var child = new Node(data),
			parent = null,
			callback = function(node) {
				if (node.data === toData) {
					parent = node;
				}
			};
		this.contains(callback, traversal);
		if (parent) {
			parent.children.push(child);
			child.parent = parent;
		} else {
			throw new Error('Cannot add node to a non-existent parent.');
		}
	};

	Tree.prototype.remove = function(data, fromData, traversal) {
		var tree = this,
			parent = null,
			childToRemove = null,
			index;
		var callback = function(node) {
			if (node.data === fromData) {
				parent = node;
			}
		};
		this.contains(callback, traversal);
		if (parent) {
			index = findIndex(parent.children, data);
	 
			if (index === undefined) {
				throw new Error('Node to remove does not exist.');
			} else {
				childToRemove = parent.children.splice(index, 1);
			}
		} else {
			throw new Error('Parent does not exist.');
		}
		return childToRemove;
	};

	//plant the new Tree(๑•̀ㅂ•́)و✧
	var lists = document.getElementsByTagName('li'),
		supper = new Tree( lists[0] );
	[].forEach.call( [].slice.call(lists, 1), e => {
		supper.add( e, e.parentNode.parentNode, supper.traverseBF );
	} );

	function shrink(e) {
		supper.traverseBF( node => {
			node.data.classList.add('hidden');
			node.data.style.color = 'black';
			if (node.children.length) {
				node.data.classList.add('parents');
				node.data.classList.remove('parente');
			};
		}, e  );
		e.data.classList.remove('hidden');
	}

	function expand(e) {
	    e.children.forEach( node => node.data.classList.remove('hidden') );
	    e.data.classList.remove('parents');
	    e.data.classList.add('parente');
	}
	
	function click(e) {
		var clickedList = e.target;
		supper.contains( node => {
			if ( node.data === clickedList && node.children[0] ) {
				if ( node.children[0].data.classList.contains('hidden') ) {
					expand(node);
				} else {
					shrink(node);
				}
			}
		}, supper.traverseBF );
	}
	
	function search(value) {
		shrink(supper._root);
		value = document.getElementsByTagName('input')[0].value;
		supper.contains( node => {
			if ( node.data.firstChild.data.match(/\S+/).join() === value ) {
				node.data.style.color = 'firebrick';
				node.children.forEach( child => child.data.style.color = 'black' );
				(function() {
					node = node.parent;
					if (node) {
						expand(node);
						arguments.callee();
					}
				})();
			}
		}, supper.traverseBF );
	}

	function add(e) {
		var li = document.createElement('li'),
			input = document.createElement('input'),
			clickedList = e.target.parentNode.parentNode;
		li.appendChild(input);
		clickedList.appendChild(li);
		supper.add(li, clickedList, supper.traverseDF);
		input.addEventListener( 'keyup', e => {
			if ( e.keyCode === 13 ) {
				text = document.createTextNode(input.value);
				li.replaceChild(text, input);
			};
		} )
	}

	shrink(supper._root);
	lists[0].addEventListener( 'click', click, false );
	document.getElementsByTagName('button')[0].addEventListener( 'click', search );
	//document.getElementById('add').addEventListener('click', add );
})();