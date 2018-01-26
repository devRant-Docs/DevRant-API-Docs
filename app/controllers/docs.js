app.controller('DocsController', function ($scope, $http, $timeout) {
	$scope.setLanguage = function (lang) {console.log(lang);
		if (lang === $scope.language) {
			return;
		}

		$('.language-' + $scope.language).removeClass('active');
		$scope.language = lang;
		localStorage.setItem('examples-language', $scope.language);
		$('.language-' + $scope.language).addClass('active');
	};

	
	$scope.getExampleCode = function(endpoint, lang) {
		console.log(endpoint, lang);
		return endpoint.exampleCode[lang];
	};


	$http.get('content/docs/endpoints.json').then(function (response) {
		$scope.endpoints = response.data;
		$scope.endpointsList = [];

		$scope.endpoints.forEach(function (endpoint, i) {
			$scope.endpoints[i].langs = [];

			endpoint.exampleCode.forEach(function (lang, j) {
				$scope.endpoints[i].exampleCode[lang.langCode] = lang.code.join('\n');

				$scope.endpoints[i].langs.push({
					                            name: lang.name, langCode: lang.langCode
				                            });
			});

			$scope.endpoints[i].exampleResponse = endpoint.exampleResponse.join('\n');

			$scope.endpointsList.push(endpoint.endpoint)
		});

		$scope.endpoints.sort(function(a,b) {
			if (a.endpoint < b.endpoint)
				return -1;
			if (a.endpoint > b.endpoint)
				return 1;
			return 0;
		});
	});


	$timeout(function () {
		if (localStorage.getItem('examples-language') === null) {
			$scope.language = 'shell';
			localStorage.setItem('examples-language', $scope.language);        
			$('.code-language-option.active').removeClass('active');
			$('.language-' + $scope.language).addClass('active');
		} else {
			$scope.language = localStorage.getItem('examples-language');
			$('.code-language-option.active').removeClass('active');
			$('.language-' + $scope.language).addClass('active');
		}
	});
});