"use strict";

var app = angular.module("myApp.filters", ["ngRoute"]);

app.filter('unsafe', function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	}
});