/*jslint browser: true, nomen: true */

/**
 * Создание экземпляра VKGraph
 *
 * @constructor
 * @this {VKGraph}
 * @param {HTMLElement} elem DOM-элемент, в который необходимо встроить график
 */
var VKGraph = function (elem) {
	"use strict";

	this._graphData = [];
	this._elem = elem;
};

/**
 * Добавление данных статистики
 *
 * @param {String} title название пункта, например "количество просмотров"
 * @param {Array} data массив данных, где каждый элемент является массивом вида [timestamp, value]
 * @param {Boolean} useCover (optional) закрашивать или нет область под графиком
 */
VKGraph.prototype.setStatisticsData = function (title, data, useCover) {
	"use strict";

	var pushData = {'name' : title, 'd' : []},
		i,
		lasting,
		sum = 0,
		currentDate = new Date();

	for (i = 0; i < data.length; i += 1) {
		lasting = (currentDate < new Date(data[i][0] * 1000)) ? '-' : '';
		pushData.d.push([data[i][0], data[i][1], lasting]);

		sum += data[i][1];
	}

	pushData.c = sum;
	if (useCover !== false) {
		pushData.f = 1;
	}

	this._graphData.push(pushData);
};

/**
 * Отрисовка
 */
VKGraph.prototype.draw = function () {
	"use strict";

	var graphSWF = document.createElement('embed');
	graphSWF.setAttribute('type', 'application/x-shockwave-flash');
	graphSWF.setAttribute('width', '100%');
	graphSWF.setAttribute('height', '100%');
	graphSWF.setAttribute('quality', 'high');
	graphSWF.setAttribute('allowscriptaccess', 'always');
	graphSWF.setAttribute('src', './graph.swf');
	graphSWF.setAttribute('flashvars', 'graphdata=' + encodeURIComponent(JSON.stringify(this._graphData)));

	this._elem.appendChild(graphSWF);
};
