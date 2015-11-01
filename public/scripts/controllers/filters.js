(function () {
    'use strict';
    angular.module('TechicalTest', []).controller('ProductFiltersController', function($scope, $http) {
        $scope.filter = {};
        $scope.messages = false;
        
        var products = {
            "products": [
                {
                    "_id": 1,
                    "device": {
                        "brand": "Samsung",
                        "camera": 16,
                        "colours": [
                            {
                                "name": "black"
                            }
                        ],
                        "images": [
                            {
                                "url": "//images.comparebusinessphones.co.uk/SCWiqf-Samsung_S6_black_front.png"
                            }
                        ],
                        "memory": "32GB",
                        "model": "Galaxy S6",
                        "os": "Android",
                        "screensize": 5.1
                    },
                    "price": 410.52
                }, {
                    "_id": 2,
                    "device": {
                        "brand": "Samsung",
                        "camera": 13,
                        "colours": [
                            {
                                "name": "white"
                            }
                        ],
                        "images": [
                            {
                                "url": "//images.comparebusinessphones.co.uk/57XB2L-Samsung_A5_front-regular.png"
                            }
                        ],
                        "memory": null,
                        "model": "Galaxy A5",
                        "os": "Android",
                        "screensize": 5
                    },
                    "price": 225.67
                }, {
                    "_id": 3,
                    "device": {
                        "brand": "Samsung",
                        "camera": 8,
                        "colours": [
                            {
                                "name": "black"
                            }
                        ],
                        "images": [
                            {
                                "url": "//images.comparebusinessphones.co.uk/VKxb9J-Samsung_A3_bloack_front.png"
                            }
                        ],
                        "memory": null,
                        "model": "Galaxy A3",
                        "os": "Android",
                        "screensize": 4.5
                    },
                    "price": 175.87
                }, {
                    "_id": 4,
                    "device": {
                        "brand": "Samsung",
                        "camera": 5,
                        "colours": [
                            {
                                "name": "white"
                            }
                        ],
                        "images": [
                            {
                                "url": "//images.comparebusinessphones.co.uk/8qSxUM-Samsung-S3-mini-White_Front.png"
                            }
                        ],
                        "memory": "16GB",
                        "model": "Galaxy S3 Mini",
                        "os": "Android",
                        "screensize": 4
                    },
                    "price": 175.87
                }
            ]
        };

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

        $scope.init = function() {

            //***Keep result product filter when load page***/
            if (sessionStorage.products) {
                $scope.products = JSON.parse(sessionStorage.products); 
            } else { 
                $scope.products = products.products; 
            }

            /***Keep filter params when load page***/
            if(sessionStorage.filter_params) {
                $scope.filter = JSON.parse(sessionStorage.filter_params); 
            }
        }

        /***Filter Data***/
        $scope.getDataFilter = function() {
            var params = {device:{}};
            for(var name in $scope.filter) {
                if($scope.filter[name]) {
                    params['device'][name] = $scope.filter[name].value % 1 === 0 ? parseInt($scope.filter[name].value) : parseFloat($scope.filter[name].value);
                }
            }

            addParamsFilter($scope.filter);

            var newProducts = filterDataWithoutPrice(products, params);

            if(!('price' in params.device)) {
                $scope.messages = false;
                removeAndInsert(newProducts);
                $scope.products = newProducts;
            }

            if(('price' in params.device) && _.size($scope.filter) === 1) {
                checkPrice($scope.products, $scope.filter.price.value, function(data) {
                    removeAndInsert(data);
                    $scope.products = data;
                });
            } else {
                delete params.device.price;
                var prds = filterDataWithoutPrice(products, params);
                if ($scope.filter.price.value) {
                    checkPrice(prds, $scope.filter.price.value, function(data) {
                        removeAndInsert(data)
                        $scope.products = data;
                        
                        if (data.length === 0 ) {
                            $scope.messages = true;
                        } else {
                            $scope.messages = false;
                        }
                    });
                }
            }

            if($scope.products.length === 0) {
                $scope.products = [];
                $scope.messages = true;
            }
        }

        var checkPrice = function(arr, price_filter, callback) {
            var products = [];
            var priceSpilit = price_filter.split(':');
            for(var i = 0; i < arr.length; i++) {
                if((arr[i].price >= parseFloat(priceSpilit[0])) && (arr[i].price <= parseFloat(priceSpilit[1]))) {
                    products.push(arr[i]);
                }
            }
            callback(products);
        };

        var filterDataWithoutPrice = function(products, params) {
            var newProducts = _.pluck(_.where(products.products, params));
            return newProducts;
        };

        /**Add Products Filter To sessionStorage**/
        var removeAndInsert = function(data) {
            sessionStorage.setItem('products', JSON.stringify(data));
        };

        /**Add Params Filter To sessionStorage**/
        var addParamsFilter = function(obj) {
            sessionStorage.setItem('filter_params', JSON.stringify(obj));  
        }
    });
})();


