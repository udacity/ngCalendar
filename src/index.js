import angular from 'angular';
import {calendar} from './calendar';

const calModule = angular.module('ngCalendar', [])
  .factory('Calendar', calendar);

const moduleName = calModule.name;

export default moduleName;