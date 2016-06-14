/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city_name = document.getElementById('aqi-city-input').value
		,city_data = document.getElementById('aqi-value-input').value;
	city_name = city_name.replace(/\s*/g, '');
	city_data = city_data.replace(/\s*/g, '');
	if (
			(city_data == parseInt(city_data))
			&& 
			(city_name.replace(/[\u4e00-\u9fa5]/g, '').length === 0  //匹配中文字符
				|| city_name.replace(/[a-zA-Z]/g, '').length === 0	 //匹配英文字符
			)
		)
	{
		aqiData[city_name] = city_data;
	}else {
		alert('输入的数据有误，请重新输入！');
		return false;	
	};
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table')
		,list = document.getElementsByTagName('tr').length;
	for (var i = 0; i < list - 1; i++) {
		table.removeChild(table.lastChild);
	};
	for (ele in aqiData) {
		if(aqiData.hasOwnProperty(ele)) {
			var line_next = document.createElement('tr')
				,city_next = document.createElement('td')
				,kqzl_next = document.createElement('td')
				,button = document.createElement('button')
				,operation_next = document.createElement('td')
			city_next.appendChild(document.createTextNode(ele));
			kqzl_next.appendChild(document.createTextNode(+aqiData[ele]));
			button.appendChild(document.createTextNode('删除'));
			operation_next.appendChild(button);
			line_next.appendChild(city_next);
			line_next.appendChild(kqzl_next);
			line_next.appendChild(operation_next);
			table.appendChild(line_next);
		}
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  	var x = event.target;
  	if(x.innerHTML === '删除') {
  		var del = x.parentNode.parentNode.firstChild.innerHTML;
  		delete aqiData[del];
		renderAqiList();
  	}
}

function init() {
	var table = document.getElementById('aqi-table')
		,line = document.createElement('tr')
		,city = document.createElement('td')
		,kqzl = document.createElement('td')
		,operation = document.createElement('td');
	city.appendChild(document.createTextNode('城市'));
	kqzl.appendChild(document.createTextNode('空气质量'));
	operation.appendChild(document.createTextNode('操作'));
	table.appendChild(line);
	line.appendChild(city);
	line.appendChild(kqzl);
	line.appendChild(operation);
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  	document.getElementById('add-btn').onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	document.getElementById('aqi-table').addEventListener('click', delBtnHandle, false);
}

init();