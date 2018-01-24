// Create angular module
var app = angular.module('DevRantDocs', ['ngRoute', 'hljs']);

// Routing-Configuration
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/docs.html',
				controller:  'DocsController'
			})
			.when('/playground', {
				templateUrl: 'views/playground.html',
				controller:  'TestingAreaController'
			})
			.when('/qa', {
				templateUrl: 'views/qa.html',
				controller:  'QAController'
			})
			.when('/links', {
				templateUrl: 'views/links.html'
			})
			.otherwise({
				redirectTo: '/'
			});

		// use the HTML5 History API
		$locationProvider.html5Mode(true);
	}
]);