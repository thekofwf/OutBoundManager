function showBar(idDiv, valueTitleText, valueSubtitleText, valueXAxisCategories, valueXAxisTitleText, valueYAxisMin, valueYAxisTitleText, valueTooltipValueSuffix, valueSeries) {
	_divShow("chartContainer");
	_divShow(idDiv);

	Highcharts.chart(idDiv, {
		chart : {
			type : "bar"
		},
		title : {
			text : valueTitleText
		},
		subtitle : {
			text : valueSubtitleText
		},
		xAxis : {
			categories : valueXAxisCategories,
			title : {
				text : valueXAxisTitleText
			}
		},
		yAxis : {
			allowDecimals : false,
			min : valueYAxisMin,
			title : {
				text : valueYAxisTitleText
			},
		},
		tooltip : {
			valueSuffix : valueTooltipValueSuffix
		},
		plotOptions : {
			bar : {
				dataLabels : {
					enabled : true
				}
			}
		},
		credits : {
			enabled : false
		},
		series : valueSeries
	});
}

function showDynamic(idDiv, valueTitleText, valueYAxisTitleText, valueSeriesName) {
	_divShow("chartContainer");
	_divShow(idDiv);

	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});

	return Highcharts.chart(idDiv, {
		chart : {
			type : 'spline',
			animation : Highcharts.svg,
			marginRight : 10,
		},
		title : {
			text : valueTitleText
		},
		xAxis : {
			type : 'datetime',
			tickPixelInterval : 50,
		},
		yAxis : {
			allowDecimals : false,
			title : {
				text : valueYAxisTitleText
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 0);
			}
		},
		legend : {
			enabled : false
		},
		exporting : {
			enabled : false
		},
		series : [ {
			name : valueSeriesName,
			data : (function() {
				var data = new Array();
				var time = (new Date()).getTime();
				for ( var i = -19; i <= 0; i += 1) {
					data.push({
						x : time + i * 10000,
						y : 0
					});
				}
				return data;
			}())
		} ]
	});
}

function showArea(idDiv, valueTitleText, valueSubtitleText, valueXAxisCategories, valueYAxisTitleText, valueSeries) {
	_divShow("chartContainer");
	_divShow(idDiv);

	Highcharts.chart(idDiv, {
		chart : {
			type : 'area'
		},
		title : {
			text : valueTitleText
		},
		subtitle : {
			text : valueSubtitleText
		},
		xAxis : {
			categories : valueXAxisCategories,
			allowDecimals : false,
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		yAxis : {
			title : {
				text : valueYAxisTitleText
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		tooltip : {
			pointFormat : '{series.name} <b>{point.y:,.0f}</b><br/>第{point.x}'
		},
		series : valueSeries
	});
}

// function showLine() {
// Highcharts.chart('container1', {
// title : {
// text : '数据统计'
// },
// subtitle : {
// text : '这是一个测试'
// },
// yAxis : {
// title : {
// text : '数量'
// }
// },
// legend : {
// layout : 'vertical',
// align : 'right',
// verticalAlign : 'middle'
// },
//
// plotOptions : {
// series : {
// label : {
// connectorAllowed : false
// },
// pointStart : 2010
// }
// },
//
// series : [ {
// name : '拨号',
// data : [ 43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175 ]
// }, {
// name : '成功',
// data : [ 24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434 ]
// }, {
// name : '无人接听',
// data : [ 11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387 ]
// }, {
// name : '用户挂机',
// data : [ null, null, 7988, 12169, 15112, 22452, 34400, 34227 ]
// }, {
// name : '错号',
// data : [ 12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111 ]
// } ],
//
// responsive : {
// rules : [ {
// condition : {
// maxWidth : 1000
// },
// chartOptions : {
// legend : {
// layout : 'horizontal',
// align : 'center',
// verticalAlign : 'bottom'
// }
// }
// } ]
// }
// });
// }
//
// function showArea() {
//
// Highcharts.chart('container1', {
// chart : {
// type : 'area'
// },
// title : {
// text : 'US and USSR nuclear stockpiles'
// },
// subtitle : {
// text : 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">'
// + 'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' + 'armscontrol.org</a>'
// },
// xAxis : {
// allowDecimals : false,
// labels : {
// formatter : function() {
// return this.value; // clean, unformatted number for year
// }
// }
// },
// yAxis : {
// title : {
// text : 'Nuclear weapon states'
// },
// labels : {
// formatter : function() {
// return this.value / 1000 + 'k';
// }
// }
// },
// tooltip : {
// pointFormat : '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
// },
// plotOptions : {
// area : {
// pointStart : 1940,
// marker : {
// enabled : false,
// symbol : 'circle',
// radius : 2,
// states : {
// hover : {
// enabled : true
// }
// }
// }
// }
// },
// series : [
// {
// name : 'USA',
// data : [ null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233,
// 29224, 27342, 26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605, 24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380, 21004, 17287,
// 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326, 5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018 ]
// },
// {
// name : 'USSR/Russia',
// data : [ null, null, null, null, null, null, null, null, null, null, 5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
// 11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000, 35000, 33000, 31000,
// 29000, 27000, 25000, 24000, 23000, 22000, 21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787, 12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500 ]
// } ]
// });
// }
//
// function showBar() {
// Highcharts.chart('container1', {
// chart : {
// type : 'bar'
// },
// title : {
// text : 'Historic World Population by Region'
// },
// subtitle : {
// text : 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
// },
// xAxis : {
// categories : [ 'Africa', 'America', 'Asia', 'Europe', 'Oceania' ],
// title : {
// text : null
// }
// },
// yAxis : {
// min : 0,
// title : {
// text : 'Population (millions)',
// align : 'high'
// },
// labels : {
// overflow : 'justify'
// }
// },
// tooltip : {
// valueSuffix : ' millions'
// },
// plotOptions : {
// bar : {
// dataLabels : {
// enabled : true
// }
// }
// },
// legend : {
// layout : 'vertical',
// align : 'right',
// verticalAlign : 'top',
// x : -40,
// y : 80,
// floating : true,
// borderWidth : 1,
// backgroundColor : ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
// shadow : true
// },
// credits : {
// enabled : false
// },
// series : [ {
// name : 'Year 1800',
// data : [ 107, 31, 635, 203, 2 ]
// }, {
// name : 'Year 1900',
// data : [ 133, 156, 947, 408, 6 ]
// }, {
// name : 'Year 2000',
// data : [ 814, 841, 3714, 727, 31 ]
// }, {
// name : 'Year 2016',
// data : [ 1216, 1001, 4436, 738, 40 ]
// } ]
// });
// }
//
// function showPie() {
// Highcharts.chart('container1', {
// chart : {
// plotBackgroundColor : null,
// plotBorderWidth : null,
// plotShadow : false,
// type : 'pie'
// },
// title : {
// text : 'Browser market shares in January, 2018'
// },
// tooltip : {
// pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
// },
// plotOptions : {
// pie : {
// allowPointSelect : true,
// cursor : 'pointer',
// dataLabels : {
// enabled : true,
// format : '<b>{point.name}</b>: {point.percentage:.1f} %',
// style : {
// color : (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
// }
// }
// }
// },
// series : [ {
// name : 'Brands',
// colorByPoint : true,
// data : [ {
// name : 'Chrome',
// y : 61.41,
// sliced : true,
// selected : true
// }, {
// name : 'Internet Explorer',
// y : 11.84
// }, {
// name : 'Firefox',
// y : 10.85
// }, {
// name : 'Edge',
// y : 4.67
// }, {
// name : 'Safari',
// y : 4.18
// }, {
// name : 'Sogou Explorer',
// y : 1.64
// }, {
// name : 'Opera',
// y : 1.6
// }, {
// name : 'QQ',
// y : 1.2
// }, {
// name : 'Other',
// y : 2.61
// } ]
// } ]
// });
// }
//
// function showCombination() {
//
// Highcharts.chart('container1', {
// title : {
// text : 'Combination chart'
// },
// xAxis : {
// categories : [ 'Apples', 'Oranges', 'Pears', 'Bananas', 'Plums' ]
// },
// labels : {
// items : [ {
// html : 'Total fruit consumption',
// style : {
// left : '50px',
// top : '18px',
// color : (Highcharts.theme && Highcharts.theme.textColor) || 'black'
// }
// } ]
// },
// series : [ {
// type : 'column',
// name : 'Jane',
// data : [ 3, 2, 1, 3, 4 ]
// }, {
// type : 'column',
// name : 'John',
// data : [ 2, 3, 5, 7, 6 ]
// }, {
// type : 'column',
// name : 'Joe',
// data : [ 4, 3, 3, 9, 0 ]
// }, {
// type : 'spline',
// name : 'Average',
// data : [ 3, 2.67, 3, 6.33, 3.33 ],
// marker : {
// lineWidth : 2,
// lineColor : Highcharts.getOptions().colors[3],
// fillColor : 'white'
// }
// }, {
// type : 'pie',
// name : 'Total consumption',
// data : [ {
// name : 'Jane',
// y : 13,
// color : Highcharts.getOptions().colors[0]
// // Jane's color
// }, {
// name : 'John',
// y : 23,
// color : Highcharts.getOptions().colors[1]
// // John's color
// }, {
// name : 'Joe',
// y : 19,
// color : Highcharts.getOptions().colors[2]
// // Joe's color
// } ],
// center : [ 100, 80 ],
// size : 100,
// showInLegend : false,
// dataLabels : {
// enabled : false
// }
// } ]
// });
// }
//
// function showDynamic1() {
//
// Highcharts.setOptions({
// global : {
// useUTC : false
// }
// });
//
// Highcharts.chart('container1', {
// chart : {
// type : 'spline',
// animation : Highcharts.svg, // don't animate in old IE
// marginRight : 10,
// events : {
// load : function() {
// // set up the updating of the chart each second
// var series = this.series[0];
// setInterval(function() {
// var x = (new Date()).getTime(), // current time
// y = Math.random();
// series.addPoint([ x, y ], true, true);
// }, 5000);
// }
// }
// },
// title : {
// text : 'Live random data'
// },
// xAxis : {
// type : 'datetime',
// tickPixelInterval : 25,
// },
// yAxis : {
// title : {
// text : 'Value'
// },
// plotLines : [ {
// value : 0,
// width : 1,
// color : '#808080'
// } ]
// },
// tooltip : {
// formatter : function() {
// return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
// }
// },
// legend : {
// enabled : false
// },
// exporting : {
// enabled : false
// },
// series : [ {
// name : 'Random data',
// data : (function() {
// // generate an array of random data
// var data = [], time = (new Date()).getTime(), i;
//
// for (i = -19; i <= 0; i += 1) {
// data.push({
// x : time + i * 10000,
// y : Math.random()
// });
// }
// return data;
// }())
// } ]
// });
// }
// function showDynamic2() {
//
// Highcharts.setOptions({
// global : {
// useUTC : false
// }
// });
//
// Highcharts.chart('container2', {
// chart : {
// type : 'spline',
// animation : Highcharts.svg, // don't animate in old IE
// marginRight : 10,
// events : {
// load : function() {
// // set up the updating of the chart each second
// var series = this.series[0];
// setInterval(function() {
// var x = (new Date()).getTime(), // current time
// y = Math.random();
// series.addPoint([ x, y ], true, true);
// }, 5000);
// }
// }
// },
// title : {
// text : 'Live random data'
// },
// xAxis : {
// type : 'datetime',
// tickPixelInterval : 25,
// },
// yAxis : {
// title : {
// text : 'Value'
// },
// plotLines : [ {
// value : 0,
// width : 1,
// color : '#808080'
// } ]
// },
// tooltip : {
// formatter : function() {
// return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
// }
// },
// legend : {
// enabled : false
// },
// exporting : {
// enabled : false
// },
// series : [ {
// name : 'Random data',
// data : (function() {
// // generate an array of random data
// var data = [], time = (new Date()).getTime(), i;
//
// for (i = -19; i <= 0; i += 1) {
// data.push({
// x : time + i * 10000,
// y : Math.random()
// });
// }
// return data;
// }())
// } ]
// });
// }
