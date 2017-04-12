"use strict";

/**
 * Controllers module which defines controllers.
 * @module myApp/controllers
 */
var app = angular.module("myApp.controllers", ["ngRoute"]);

app.controller('HomeCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.setTitle('Home');
	$scope.setSideNavState(false);
	$scope.translate();
}]);

app.controller('CheckinCtrl', ['$scope', '$mdSidenav', '$http', function($scope, $mdSidenav, $http){
	$scope.setTitle('Checkin');
	$scope.setSideNavState(false);
	
	$http.get('json/checkin.json').then(function (response, error) {
		$scope.checkins = response.data;
	});
	
	$scope.translate();
}]);

app.controller('OpenCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.setTitle('Open');
	$scope.setSideNavState(false);
	$scope.translate();
	
	$scope.redirect = function(redirectPath) {
		$(location).attr('href', redirectPath);
	}
}]);

app.controller('AboutCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.setTitle('About');
	$scope.setSideNavState(true);
	$scope.translate();
}]);

app.controller('TermsCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.setTitle('Terms and Conditions');
	$scope.setSideNavState(true);
	$scope.translate();
}]);

app.controller('MainCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.setSideNavState(false);
	$scope.translate();
}]);

app.controller('LinksCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.setTitle('Links');
	$scope.setSideNavState(true);
}]);

app.controller('ToolkitCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.setTitle('My Toolkit');
	$scope.setSideNavState(true);
}]);

app.controller('ToolsCtrl', ['$scope', '$mdSidenav', '$http', function($scope, $mdSidenav, $http){
	$scope.setTitle('Tools');
	$scope.setSideNavState(true);

	//Grab the JSON file from the server, and output it into the scope
	$http.get('json/tools.json').then(function (response, error) {$scope.tools = response.data});
	
	//Assign the selected tool's ID to a user variable to tell info what page to generate
	$scope.assignToolID = function(selectedToolID) {
		localStorage.setItem("selectedToolID", selectedToolID);
		$(location).attr('href', '#/info');
	}
	
	// $scope.addTool = function(selectedToolID) {
		// if(localStorage.getItem("toolKit") != null) {
			// var toolKit = JSON.parse(localStorage.getItem("toolKit"));
		// } else {
			// var toolKit = [];
		// }
		
		// localStorage.setItem("toolKit", JSON.stringify(toolKit.extends(selectedToolID)));
		// console.log(localStorage.getItem("toolKit"));
	// }
}]);

app.controller('ToolSleepCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
    $scope.setTitle('Sleep Tool');
    $scope.setSideNavState(true);

    this.myDate = new Date();
    this.isOpen = false;

    // TODO: needs better range settings
    $scope.timeRange = ('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24').split(' ').map(function (hour) { return { time: hour }; });

    $scope.saveSleepEntry = function () {
        var existingEntries = [];
        var index = 0;
        if (met.storage.exists("SleepEntries")) {
            existingEntries = JSON.parse(met.storage.load("SleepEntries"));
            index = existingEntries.length;
        }

        if ($scope.content === '') {
            $scope.showInfoMessage('Error');
        } else {
            var entry = {
                index: index,
                date: $scope.ToolSleepCtrl.myDate,
                start: $scope.sleep_start,
                end: $scope.sleep_end,
                awoken: $scope.sleep_awoken,
                total: $scope.sleep_total
            };

            existingEntries.push(entry);
            met.storage.save("SleepEntries", JSON.stringify(existingEntries));
            $scope.showInfoMessage('Successfully entered the sleep data');
        }
    }

    $scope.clearData = function () {
        met.storage.delete("SleepEntries");
        $scope.showInfoMessage('Successfully cleared the sleep data');
    }

}]);

app.controller('ReportCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
    $scope.setTitle('Reports');
    $scope.setSideNavState(true);

    this.myDate = new Date();
    this.isOpen = false;

    // Load daily sleep report data
    $scope.loadDailySummary = function () {
        if (met.storage.exists("SleepEntries")) {

            var tempList = [];
            var oList = JSON.parse(met.storage.load("SleepEntries"));
            oList.forEach(function (entry) {

                if (entry.date.substring(0, 10) == "2017-03-16") { // TODO: Remove hard-coded string, create function to retrieve relative daily/weekly/monthly?
                    entry.date = entry.date.substring(0, 10);
                    tempList.push(entry);
                }

            });
            $scope.sleepReport = tempList;
        }
    }

    // Load weekly sleep report data
    $scope.loadSleepOverview = function () {
        if (met.storage.exists("SleepEntries")) {

            var tempList = [];
            var oList = JSON.parse(met.storage.load("SleepEntries"));
            oList.forEach(function (entry) {

                var date = Number(entry.date.substring(8, 10)); // TEMP

                if (entry.date.substring(0, 7) == "2017-03" && date < 19 && date > 11) { // TODO: Remove hard-coded string, create function to retrieve relative daily/weekly/monthly?
                    entry.date = entry.date.substring(0, 10);
                    entry.color = ((Number(entry.total) > 6) ? 'green' : 'red');
                    tempList.push(entry);
                }

            });
            $scope.sleepReport = tempList;
        }
    }

    // Load monthly sleep report data
    $scope.loadSleepMood = function () {
        if (met.storage.exists("SleepEntries")) {

            var tempList = [];
            var oList = JSON.parse(met.storage.load("SleepEntries"));
            oList.forEach(function (entry) {

                if (entry.date.substring(0, 7) == "2017-03") { // TODO: Remove hard-coded string, create function to retrieve relative daily/weekly/monthly?
                    entry.date = entry.date.substring(0, 10);
                    entry.color = ((Number(entry.total) > 6) ? 'green' : 'red');
                    tempList.push(entry);
                }

            });
            $scope.sleepReport = tempList;
        }
    }

    $scope.loadAll = function () {
        if (met.storage.exists("SleepEntries")) {
            var oList = JSON.parse(met.storage.load("SleepEntries"));
            $scope.results = oList;
        }
        alert(JSON.stringify($scope.results));
    }

    $scope.clearData = function () {
        met.storage.delete("SleepEntries");
        $scope.showInfoMessage('Successfully cleared the sleep data');
    }

}]);

app.controller('InfoCtrl', ['$scope', '$mdSidenav', '$http', function($scope, $mdSidenav, $http){
	$scope.setTitle('Info');
	$scope.setSideNavState(true);
	
	//Grab the JSON file from the server, and output it into the scope
	$http.get('json/tools.json').then(function (response, error) { 
		$scope.tools = response.data;
		$scope.tools.forEach(fetchToolObject);
	});
	
	//Isolate the tool that the user selected on /tools so we can use it to generate /info
	function fetchToolObject(item, index) {
		if(item.id == localStorage.getItem("selectedToolID")) {
			$scope.selectedTool = item;
		}
	}
}]);

app.controller('AttitudeCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.setTitle('Attitude for Gratitude');
	$scope.setSideNavState(true);
}]);

app.controller('ToolsAngerCtrl', ['$scope', '$mdSidenav', '$mdBottomSheet', function($scope, $mdSidenav, $mdBottomSheet){
	$scope.setTitle('Feeling Angry');
	$scope.setSideNavState(true);
	
	$scope.showListBottomSheet = function() {
	    $mdBottomSheet.show({
	      templateUrl: 'partials/tools_anger_template.html'
	    }).then(function(clickedItem) {
	      //$scope.alert = clickedItem['name'] + ' clicked!';
	    });
	};
}]);

app.controller('ToolsStressCtrl', ['$scope', '$mdSidenav', '$mdBottomSheet', function($scope, $mdSidenav, $mdBottomSheet){
	$scope.setTitle('Feeling Stressed');
	$scope.setSideNavState(true);
	
	$scope.showListBottomSheet = function() {
	    $mdBottomSheet.show({
	      templateUrl: 'partials/tools_stress_template.html'
	    }).then(function(clickedItem) {
	      //$scope.alert = clickedItem['name'] + ' clicked!';
	    });
	};
}]);

app.controller('StressIndexCtrl', ['$scope', '$mdSidenav', '$mdDialog', function($scope, $mdSidenav, $mdDialog){
	$scope.setTitle('What’s Your Stress Index?');
	$scope.setSideNavState(true);
	
	$scope.formData = [
		{"yesno0":false},
		{"yesno1":false},
		{"yesno2":false},
		{"yesno3":false},
		{"yesno4":false},
		{"yesno5":false},
		{"yesno6":false},
		{"yesno7":false},
		{"yesno8":false},
		{"yesno9":false},
		{"yesno10":false},
		{"yesno11":false},
		{"yesno12":false},
		{"yesno13":false},
		{"yesno14":false},
		{"yesno15":false},
		{"yesno16":false},
		{"yesno17":false},
		{"yesno18":false},
		{"yesno19":false},
		{"yesno20":false},
		{"yesno21":false},
		{"yesno22":false},
		{"yesno23":false},
		{"yesno24":false}
	];
	
	$scope.showAlert = function(ev, content) {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .htmlContent(content)
	        .ariaLabel('Alert Dialog')
	        .ok('Close')
	        .targetEvent(ev)
	    );
	  };
		
	$scope.tally = function(event, language) {
	 	var h = 0;
		var j = 0;
		var total = $scope.formData.length;
		
		for (var k=0; k < total; k++){
			if ($scope.formData[k]["yesno" + k])
				j++;
		}		
	 
		j = (j*2) + 1;
	 
		for (var i=0; i < total; i = i+2) {
			if ($scope.formData[i]["yesno" + i])
				h++;
		}
					 
		if (j < total){
			if (language == "en") { // Quiz is being viewed in English
				$scope.showAlert(event, "You did not fully fill out the form.<br /><br /> Please try again.");
			}else { // Quiz is being viewed in French
				$scope.showAlert(event, "Vous faisiez pas pleinement remplir éteint du formulaire.<br /><br /> S'il vous plaît tâcher à nouveau."); 
			}
			return;
		}
		else { // Quiz is filled in correctly
	  
			if ((h >= 0) && (h <= 6)) {
				if (language == "en") { // Quiz is being viewed in English		
					$scope.showAlert(event, "<strong>You Scored: "+h+"</strong><br /><br />There are few hassles in your life. Make sure, though, that you are not trying so hard to avoid problems that you shy away from challenges.");				
				}else { // Quiz is being viewed in French	  
					$scope.showAlert(event, "<strong>Résultat total : "+h+"</strong><br /><br />Il y a peu de tracasseries dans votre vie. Assururez-vous, cependant, qu'en essayant à tout prix d'éviter les problèmes, vous ne ratez pas l'occassion de relever de nouveaux défis.");
				}
			}
			else if ((h >= 7) && (h <= 13)) {
				if (language == "en") { // Quiz is being viewed in English	 
					$scope.showAlert(event, "<strong>You Scored: "+h+"</strong><br /><br />You've got your life in fairly good control. Work on the choices and habits that could still be causing you some unnecessary stress in your life.");
				}else { // Quiz is being viewed in French	 
					$scope.showAlert(event, "<strong>Résultat total : "+h+"</strong><br /><br />Vous exercerez sur votre vie un contrôle raisonnable. Occupez-vous de vos chos et habitutes qui pourraient vous causer un stress inutile.");
				}
			}
			else if ((h >= 14) && (h <= 20)) {
				if (language == "en") { // Quiz is being viewed in English	 		
					$scope.showAlert(event, "<strong>You Scored: "+h+"</strong><br /><br />You're approaching the danger zone. You may well be suffering stress-related symptoms and your relationships could be strained. Think carefully about choices you've made and take relaxation breaks every day.");
				}
				else { // Quiz is being viewed in French	 	   
					$scope.showAlert(event, "<strong>Résultat total : "+h+"</strong><br /><br />Vous pourriez présenter des symptômes reliés au stress et vos relations pourraient être tendues. Réfléchissez bien aux choix que vous avez faits et réservez-vous chaque jour des pauses pour relaxer.");
				}
			}
			else if (h >= 21) {
				if (language == "en") { // Quiz is being viewed in English			
					$scope.showAlert(event, "<strong>You Scored: "+h+"</strong><br /><br />Emergency! You must stop now, re-think how you are living, change your  attitudes, and pay careful attention to diet, exercise, and relaxation.");
				}
				else { // Quiz is being viewed in French	 		  
					$scope.showAlert(event, "<strong>Résultat total : "+h+"</strong><br /><br />Urgence! Vous devez arrêter maintenant, revoir la façon dont vous vivez; changez d'attitude, portez soigneusement attention à votre régime, faites de l'exercice et détendez-vous.");
				}
			}
		}
	}
}]);

app.controller('SettingsCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.selectedLang = $scope.getCurrentLang() === 'en' ? true : false;
		
	$scope.setTitle('Settings');
	$scope.setSideNavState(true);
	
	$scope.updateLang = function(lang){
		$scope.setCurrentLang(lang ? 'en' : 'fr');
	}
	
	$scope.clearData = function(){
		met.storage.delete("allLogEntries");
		$scope.showInfoMessage('Successfully cleared the application data');
	}
	$scope.translate();
}]);

app.controller('Tier1Ctrl', ['$scope', '$mdSidenav', '$http', function($scope, $mdSidenav, $http){
	$scope.setTitle('You are feeling ' + $scope.getYourStatus());
	$scope.setSideNavState(true);
	
	//Grab the JSON file from the server, and output it into the scope
	$http.get('json/explanation.json').then(function (response, error) { 
		$scope.explanation = response.data;
		$scope.explanation.forEach(fetchExplanationObject);
	});
	
	//Isolate the tool that the user selected on /tools so we can use it to generate /tier1
	function fetchExplanationObject(item, index) {
		console.log("Your Status: " + $scope.getYourStatus());
		if(item.statusValue == $scope.getYourStatus()) {
			$scope.selectedExplanation = item;
		}
	}
}]);

app.controller('LogCtrl', ['$scope', '$mdSidenav', '$mdDialog', function($scope, $mdSidenav, $mdDialog){
	$scope.setTitle('My Log');
	$scope.setSideNavState(true);
		
	$scope.loadFromLog = function(){
		if(met.storage.exists("allLogEntries")){
			var oList = JSON.parse(met.storage.load("allLogEntries"));
			$scope.results = oList;
		}
	}
	
	$scope.showMoreInfo = function(ev, logEntry) {
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.htmlContent('<label>You felt ' + logEntry.mood + '</label><hr /><label>Why did you feel this way?</label><br />' + logEntry.tellMe + '<br /><br /><label>How did you cope with your feeling?</label><br />' + logEntry.howAre)
				.ariaLabel(logEntry.mood)
				.ok('Close')
				.targetEvent(ev)
	    );
	};	
	
	$scope.loadFromLog();
	$scope.translate();
}]);

app.controller('MySpaceCtrl', ['$scope', '$mdSidenav', '$mdDialog', function ($scope, $mdSidenav, $mdDialog) {
    $scope.setTitle('My Space');
    $scope.setSideNavState(true);

    $scope.saveToDiary = function () {
        var existingEntries = [];
        var index = 0;
        if (met.storage.exists("allDiaryEntries")) {
            existingEntries = JSON.parse(met.storage.load("allDiaryEntries"));
            index = existingEntries.length;
        }

        if ($scope.content === '') {
            //do nothing
        } else {
            var entry = {
                index: index,
                content: $scope.diaryContent,
                timestamp: $scope.timestamp
            };

            existingEntries.push(entry);
            met.storage.save("allDiaryEntries", JSON.stringify(existingEntries));
        }
    }

    $scope.translate();
}]);

app.controller('DiaryCtrl', ['$scope', '$mdSidenav', '$mdDialog', function ($scope, $mdSidenav, $mdDialog) {
    $scope.setTitle('Diary');
    $scope.setSideNavState(true);

    $scope.loadFromDiary = function () {
        if (met.storage.exists("allDiaryEntries")) {
            var oList = JSON.parse(met.storage.load("allDiaryEntries"));
            $scope.results = oList;
        }
    }

    $scope.showMoreInfo = function (ev, diaryEntry) {
        $mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.htmlContent('<p>' + diaryEntry.content + '</p>')
				.ariaLabel(diaryEntry.timestamp)
				.ok('Close')
				.targetEvent(ev)
	    );
    };

    $scope.loadFromDiary();
    $scope.translate();
}]);


app.controller('ResourcesCtrl', ['$scope', '$mdSidenav', '$http', function($scope, $mdSidenav, $http){
    
	$scope.setTitle('Resources');
	$scope.setSideNavState(true);
	
	//Grab the JSON file from the server, and output it into the scope
	$http.get('json/resources.json').then(function (response, error) {$scope.resources = response.data});
	
}]);

app.controller('AppCtrl', ['$scope', '$location', '$mdToast', '$mdSidenav', 'translationService', "$window", function($scope, $location, $mdToast, $mdSidenav, translationService, $window){
	$scope.showSideNav = false;
    $scope.yourStatus = 'N/A';
    $scope.yourMainStatus = 'N/A';
    $scope.tellMe = '';
    $scope.howAre = '';
    $scope.diaryContent = '';
    $scope.title = 'Home';
    $scope.currentLang = met.storage.load('language');
    
    $scope.timestamp = new Date().getTime();
    $scope.setMainStatus = function (value){$scope.yourMainStatus = value;}
    $scope.getMainStatus = function (){return $scope.yourMainStatus;}
    $scope.setYourStatus = function (value){$scope.yourStatus = value;}
    $scope.getYourStatus = function (){return $scope.yourStatus;}
    $scope.getCurrentLang = function (){return $scope.currentLang;}
    $scope.getFormattedCurrentLang = function (){return angular.uppercase($scope.currentLang);}
    $scope.setCurrentLang = function (value){$scope.currentLang = value;$scope.translate();}
    
    $scope.goToLink = function(link){
    	console.log(link);
    	$window.open(link, '_blank');
    }
    
    //Get Geolocation
	met.getGeoLocation();
    
	$scope.isGPSEnabled = function(){
		return met.isGPSEnabled();
	}
	
    $scope.getProvince = function(){
    	return met.getProvince();
    }
    
    $scope.setTitle = function(title){
    	$scope.title = title;
    }
    
    $scope.getTitle = function(){
    	return $scope.title;
    }
    
	$scope.getSideNavState = function() {
	  return $scope.showSideNav;
	}
	
	$scope.setSideNavState = function(state) {
	  $scope.showSideNav = state;
	}
	
	$scope.goBack = function() {
	  window.history.back();
	}
	
	$scope.showInfoMessage = function (message) {
		$mdToast.show($mdToast.simple().textContent(message));
	}
	
	$scope.optionsMenu = function (menu, event) {
        menu(event);
    }
	
	$scope.toggleSidenav = function(menu) {
		$mdSidenav(menu).toggle();
	}
	
	$scope.goTo = function(path){
		$location.path("/" + path);
	}
	
	$scope.openDrawer = function (menuId) {
		$mdSidenav(menuId).open();
    }
	  
	$scope.closeDrawer = function (menuId) {
		$mdSidenav(menuId).close();
    }
	
	$scope.scrollTo = function(id) {
		var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
    }
	
	$scope.externalLinks = {
		data: [{
			name: 'Employee Assistance Program (EAP)',
			url: 'http://www.csc-scc.gc.ca/'
		},{
			name: 'Canadian Mental Health Association (CMHA)',
			url: 'http://ottawa.cmha.ca/'
		},{
			name: 'Sunlife',
			url: 'https://www.sunlife.ca/'
		},{
			name: 'Correctional Service Canada (CSC)',
			url: 'http://www.csc-scc.gc.ca/'
		}]
	}
	
	$scope.translate = function(){translationService.getTranslation($scope, $scope.currentLang);};
}]);