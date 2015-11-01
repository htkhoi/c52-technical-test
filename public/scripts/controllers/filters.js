(function () {
    'use strict';
    angular.module('TechicalTest', []).controller('ProductFiltersController',
        function($scope, $http) {

        /** Price Filter Options **/
        $http.get('/range_price_data.json').then(function(response){
            $scope.priceFilters = response.data['price_filters'];
        });

        /** Screen Filter Options **/
        $http.get('/range_screensize_data.json').then(function(response){
            $scope.screensizeFilters = response.data['screen_filters'];
        });

        /** Camera Filter options */
        $http.get('/range_camera_data.json').then(function(response){
            $scope.cameraFilters = response.data['camera_filters'];
        });

        /** GET Products **/
        var products = $http.get("/data.json").then(function(response) {
            $scope.products = products = response.data['products'];
        });

        $scope.messages = false;
    });
})();
