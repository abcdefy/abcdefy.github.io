var divs = [];

function createDiv(num) {
	var div = document.createElement('div');
	div.innerHTML = num;
	div.setAttribute("class", "num");
	return div;
}

function renderOutput(divs) {
	var output = document.getElementById('output');
	output.innerHTML = '';
	divs.forEach(div => output.appendChild(createDiv(div)));
}

function check(e) {
	var content = document.getElementsByTagName('textarea')[0].value;
	divs = content.match(/[\u4e00-\u9fa5\w]+/g);
	renderOutput(divs);
}

function search(e) {
	if(divs.length === 0) {
		alert('请先输入内容！');
		return false;
	}
	var content = document.getElementById('search_box').value.replace(/[^\u4e00-\u9fa5\w]/, "");
	if(divs.some(x => x.search(content) >= 0)) {
		var result = divs.map(div => div.replace(content, '<span>$&</span>'));
		renderOutput(result);
	}else {
		alert('没有匹配项！');
	}
}

(function () {
	document.getElementById('check').addEventListener('click', check, true);
	document.getElementById('search').addEventListener('click', search, true);
})();