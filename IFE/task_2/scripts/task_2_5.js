/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var chart = document.getElementById('aqi-chart-wrap')
     ,innerHTML = ''
     ,key, height, title, color;
  initAqiChartData();
  for(key in chartData) {
    if(chartData.hasOwnProperty(key)) {
      height = chartData[key];
      title = key + ': ' + chartData[key];
      switch (true) {
        case height < 100 :
          color = 'springgreen';
          break;
        case (height >= 100 && height < 200) :
          color = 'yellowgreen';
          break;
        case (height >= 200 && height < 300) :
          color = 'yellow';
          break;
        case (height >= 300 && height < 400) :
          color = 'khaki';
          break;
        case (height >= 400 && height < 500) :
          color = 'goldenrod';
          break;
        default:
          break;
      }
      innerHTML += "<div class='aqi-div' title='" + title + "' style='height:" + height + "px; background-color:" + color +"' ></div>";
    }
  }
  chart.innerHTML = innerHTML;
  chartData = {};
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化 
  // 设置对应数据
  var gra = event.target;
  pageState.nowGraTime = gra.value;
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  // 设置对应数据
  pageState.nowSelectCity = document.getElementById('city-select').selectedIndex;
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var inp = document.getElementById('form-gra-time');
  inp.addEventListener('change', graTimeChange, false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var sel = document.getElementById('city-select');
  for(city in aqiSourceData) {
    if(aqiSourceData.hasOwnProperty(city) && city !== '北京') {
      var opt = document.createElement('option');
      opt.text = city;
      sel.add(opt, null);
    }
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  sel.addEventListener('change', citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var sel = document.getElementById('city-select')
     ,selected_city = sel.options[pageState.nowSelectCity].text
     ,data = aqiSourceData[selected_city];
  switch (pageState.nowGraTime) {
    case 'day':
      chartData = data;
      break;
    case 'month':
      var month = ['01', '02', '03'];
      for (var i = 0; i < 3; i++) {
        var sum = 0
           ,num = 0
           ,name = '2016年' + month[i] + '月均值';
        for(var date in data) {
          if(data.hasOwnProperty(date) && date.substring(5, 7) === month[i]) {
            sum += data[date];
            num += 1;
          }
        }
        chartData[name] = Math.round(sum/num);  
      };
      break;
    case 'week':
      var dat = new Date('2016-01-01')
         ,sum = 0
         ,days = 0
         ,weaks = 0
      for(var date in data) {
        if(data.hasOwnProperty(date)) {
          sum += data[date];
          days += 1;
          if(dat.getDay() === 0 || date === '2016-03-31') {
            weaks += 1;
            chartData[('2016年第' + weaks + '周均值')] = Math.round(sum/days);
            sum = 0;
            days = 0;
          }
          dat.setDate(dat.getDate() + 1);
        }
      }
      break;
    default:
      break;
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
}

init();