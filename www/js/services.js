"use strict";

var app = angular.module("myApp.services", ["ngRoute", "ngResource"]);

app.service('translationService', function($resource) {  
    this.getTranslation = function($scope, language) {
    	if(isNaN(language))
    		language = 'en';
    	
        var languageFilePath = "i18n\\" + language + '.csv';
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
});