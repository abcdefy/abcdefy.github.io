var application = function() {
	var hobbys = [], tags = [];

	function createDiv(item) {
		var div = document.createElement('div');
		div.innerHTML = item;
		div.setAttribute("class", "num");
		return div;
	}

	function renderOutput(label, pos) {
		var output = document.getElementById(pos);
		output.innerHTML = '';
		label.forEach(item => output.appendChild(createDiv(item)));
	}

	function push(label, arr) {
		if(!arr) return label;
		label.push(...arr);
		var n = {}, temp = [];
		for(var i = 0,j = label.length; i < j; i += 1) {
			if (!n[label[i]]) {
				n[label[i]] = 1;
				temp.push(label[i]);
			}
		}
		return temp.length > 10 ? temp.slice(-10) : temp;
	}

	return {
		hobbySet : function(e) {
			var divs = document.getElementsByTagName('textarea')[0].value.match(/[\u4e00-\u9fa5\w]+/g);
			document.getElementsByTagName('textarea')[0].value = null;
			hobbys = push(hobbys, divs);
			renderOutput(hobbys, 'hoppy_output');
		},

		tagSet : function(e) {
			if (/[^\u4e00-\u9fa5\w]+/.test(e.target.value) || e.keyCode == 13) {
				var divs = e.target.value.match(/[\u4e00-\u9fa5\w]+/g);
				e.target.value = null;
				tags = push(tags, divs);
				renderOutput(tags, 'tag_output');
			}
		}
	};
}();

(function () {
	document.getElementById('tag_box').addEventListener('keyup', application.tagSet, true);
	document.getElementById('check').addEventListener('click', application.hobbySet, true);
})();