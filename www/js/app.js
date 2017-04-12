"use strict";

/**
 * App level module which depends on filters, services and so on.
 * @module myApp
 */
var app = angular.module("myApp", ["ngRoute", "myApp.filters", "myApp.services", "myApp.controllers", "ngSanitize", "ngMaterial", "ngMdIcons"]);

// configure views
app.config(["$routeProvider",
    function($routeProvider) {
		
	    $routeProvider.when("/home", {
			controller: "HomeCtrl",
	        templateUrl: "partials/home.html"
	    });
		
		$routeProvider.when("/open", {
			controller: "OpenCtrl",
	        templateUrl: "partials/open.html"
	    });
		
		$routeProvider.when("/checkin", {
			controller: "CheckinCtrl",
	        templateUrl: "partials/checkin.html"
	    });
	    
	    $routeProvider.when("/main", {
			controller: "MainCtrl",
	        templateUrl: "partials/main.html"
	    });
	    
	    $routeProvider.when("/feeling_well", {
			controller: "CheckinCtrl",
	        templateUrl: "partials/feeling_well.html"
	    });
	    
	    $routeProvider.when("/feeling_not_well", {
			controller: "CheckinCtrl",
	        templateUrl: "partials/feeling_not_well.html"
	    });
	    
	    $routeProvider.when("/tier1", {
			controller: "Tier1Ctrl",
	        templateUrl: "partials/tier1.html"
	    });
	    
	    $routeProvider.when("/resources", {
			controller: "ResourcesCtrl",
	        templateUrl: "partials/resources.html"
	    });
	    
	    $routeProvider.when("/toolkit", {
			controller: "ToolkitCtrl",
	        templateUrl: "partials/toolkit.html"
	    });

	    $routeProvider.when("/tools/sleep", {
	        controller: "ToolSleepCtrl",
	        templateUrl: "partials/tool_sleep_entry.html"
	    });

	    $routeProvider.when("/reports", {
	        controller: "ReportCtrl",
	        templateUrl: "partials/report.html"
	    });
	    
	    $routeProvider.when("/info", {
			controller: "InfoCtrl",
	        templateUrl: "partials/info.html"
	    });
	    
	    $routeProvider.when("/tools", {
			controller: "ToolsCtrl",
	        templateUrl: "partials/tools.html"
	    });
	    
	    $routeProvider.when("/attitude", {
			controller: "AttitudeCtrl",
	        templateUrl: "partials/attitude.html"
	    });
	    
	    $routeProvider.when("/log", {
			controller: "LogCtrl",
	        templateUrl: "partials/log.html"
	    });
	    
	    $routeProvider.when("/myspace", {
			controller: "MySpaceCtrl",
	        templateUrl: "partials/my_space.html"
	    });
	    
	    $routeProvider.when("/diary", {
			controller: "DiaryCtrl",
	        templateUrl: "partials/diary.html"
	    });
	    
	    $routeProvider.when("/links", {
			controller: "LinksCtrl",
	        templateUrl: "partials/links.html"
	    });
	    
	    $routeProvider.when("/settings", {
			controller: "SettingsCtrl",
	        templateUrl: "partials/settings.html"
	    });
		
		$routeProvider.when("/terms-en", {
			controller: "TermsCtrl",
	        templateUrl: "partials/terms-en.html"
	    });
		
		$routeProvider.when("/terms-fr", {
			controller: "TermsCtrl",
	        templateUrl: "partials/terms-fr.html"
	    });
		
		$routeProvider.when("/about", {
			controller: "AboutCtrl",
	        templateUrl: "partials/about.html"
	    });
        
        $routeProvider.otherwise({redirectTo: "/home"});
    }
]);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('mobilePalette', {
        '50': 'eaedf1',
        '100': 'd6dce3',
        '200': 'c1cad5',
        '300': 'adb9c7',
        '400': '99a7ba',
        '500': '8496ac',
        '600': '70849e',
        '700': '5b7290',
        '800': '476182',
        '900': '335075',
        'A100': 'd6dce3',
        'A200': 'c1cad5',
        'A400': '99a7ba',
        'A700': '335075',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light

        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
      });
        
    $mdThemingProvider.theme('default')
    	.primaryPalette('mobilePalette', {'default' : '900'})
        .accentPalette('deep-orange');
});