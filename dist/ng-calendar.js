(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["ngCalendar"] = factory(require("angular"));
	else
		root["ngCalendar"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _calendar = __webpack_require__(2);
	
	var calModule = _angular2['default'].module('ngCalendar', []).factory('Calendar', _calendar.calendar);
	
	var moduleName = calModule.name;
	
	exports['default'] = moduleName;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _util = __webpack_require__(3);
	
	var calendar = function calendar() {
	  /**
	  * GCal is a webclient, so we can open a new cal by issuing a
	  * GET request with a formatted URL. This function builds that URL using
	  * a calendar event object that just has metadata about what the calendar should
	  * set as far as start time, duration, title, etc.
	  * @param  {Object} event the calendar event
	  * @return {String}       the fully formatted and encoded URL ready for GET request
	  */
	  var makeGoogleCalendarUrl = function makeGoogleCalendarUrl(event) {
	    var startTime = (0, _util.formatTime)(event.start);
	    var endTime = (0, _util.calculateEndTime)(event);
	
	    var href = encodeURI('https://www.google.com/calendar/render?action=TEMPLATE&text=' + (event.title || '') + '&dates=' + (startTime || '') + '/' + (endTime || '') + '&details=' + (event.description || '') + '&location=' + (event.address || '') + '&sprop=&sprop=name:');
	
	    return href;
	  };
	
	  /**
	   * Yahoo is a webclient, so we can open a new cal but issuing a
	   * GET request with a formatted URL. This function builds that URL using
	   * a calender event object.
	   * @param  {Object} event calendar event object
	   * @return {String}       the fully formatted and encoded URL ready for GET request
	   */
	  var makeYahooCalendarUrl = function makeYahooCalendarUrl(event) {
	    var eventDuration = event.end ? (event.end.getTime() - event.start.getTime()) / _util.MS_IN_MINUTES : event.duration;
	
	    var yahooHourDuration = eventDuration < 600 ? '0' + Math.floor(eventDuration / 60) : Math.floor(eventDuration / 60) + '';
	
	    var yahooMinuteDuration = eventDuration % 60 < 10 ? '0' + eventDuration % 60 : eventDuration % 60 + '';
	
	    var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;
	
	    var st = (0, _util.formatTime)(new Date(event.start - event.start.getTimezoneOffset() * _util.MS_IN_MINUTES)) || '';
	
	    var href = encodeURI('http://calendar.yahoo.com/?v=60&view=d&type=20&title=' + (event.title || '') + '&st=' + st + '&dur=' + (yahooEventDuration || '') + '&desc=' + (event.description || '') + '&in_loc=' + (event.address || ''));
	
	    return href;
	  };
	
	  /**
	   * create .ics file for mac calendar
	   * @param  {[type]} events [description]
	   * @return {[type]}        [description]
	   */
	  var ical = function ical(events) {
	    return (0, _util.makeIcs)(events);
	  };
	
	  /**
	   * create .ics file for outlook calendar
	   * @param  {[type]} events [description]
	   * @return {[type]}        [description]
	   */
	  var outlook = function outlook(events) {
	    return (0, _util.makeIcs)(events);
	  };
	
	  // Alias for views
	  var google = function google(event) {
	    return makeGoogleCalendarUrl.call(undefined, event);
	  };
	
	  var yahoo = function yahoo(event) {
	    return makeYahooCalendarUrl.call(undefined, event);
	  };
	
	  return {
	    google: google,
	    yahoo: yahoo,
	    ical: ical,
	    outlook: outlook
	  };
	};
	exports.calendar = calendar;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var MS_IN_MINUTES = 60 * 1000;
	
	exports.MS_IN_MINUTES = MS_IN_MINUTES;
	/**
	 * format date times for the urls for cals
	 * @param  {Date} date   the Date object to be formatted
	 * @return {String}      formatted date time
	 * @example:
	 *     var date = new Date();
	 *     var formattedString = formatTime(date);
	 *     formattedString === '20150528T072000Z'
	 */
	var formatTime = function formatTime(date) {
	  return date.toISOString().replace(/-|:|\.\d+/g, '');
	};
	
	exports.formatTime = formatTime;
	/**
	* calculate an end time for the events 
	* @param  {Object} event a calendar event
	* @return {String}       formatted date time
	*/
	var calculateEndTime = function calculateEndTime(_ref) {
	  var end = _ref.end;
	  var start = _ref.start;
	  var _ref$duration = _ref.duration;
	  var duration = _ref$duration === undefined ? 0 : _ref$duration;
	
	  return end ? formatTime(end) : formatTime(new Date(start.getTime() + duration * MS_IN_MINUTES));
	};
	
	exports.calculateEndTime = calculateEndTime;
	/**
	 * Given one calendar event, will create am EVENT string ready
	 * to be mashed with a full .ics download string. Helpfull when adding
	 * multiple events to one .ics file
	 * @param  {Object} event calendar event object
	 * @return {String}       one EVENT string produced to be combined with
	 *                            header and footer string text so for .ics download
	 */
	var createIcsStringFromEvent = function createIcsStringFromEvent(event) {
	  var startTime = formatTime(event.start);
	  var endTime = calculateEndTime(event);
	  var href = 'BEGIN:VEVENT\nURL:' + document.URL + '\nDTSTART:' + (startTime || '') + '\nDTEND:' + (endTime || '') + '\nSUMMARY:' + (event.title || '') + '\nDESCRIPTION:' + (event.description || '') + '\nLOCATION:' + (event.address || '') + '\nEND:VEVENT';
	  return href;
	};
	
	exports.createIcsStringFromEvent = createIcsStringFromEvent;
	/**
	 * creates a full .ics download url given an array of calender events
	 * @param  {Array|Object} events array of or single calender object
	 * @return {String}        full data: url for downloading .ics file
	 */
	var makeIcs = function makeIcs(events) {
	  if (!Array.isArray(events)) {
	    events = [events];
	  }
	
	  var dataRef = 'data:text/calendar;charset=utf8,';
	  var href = ['BEGIN:VCALENDAR', 'VERSION:2.0'];
	
	  var builtHref = events.reduce(function (_href, event) {
	    _href.push(createIcsStringFromEvent(event));
	    return _href;
	  }, href);
	
	  builtHref.push('END:VCALENDAR');
	
	  return encodeURI(dataRef + builtHref.join('\n'));;
	};
	exports.makeIcs = makeIcs;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ng-calendar.js.map