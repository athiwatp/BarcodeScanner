angular.module('app.controllers', [])

.controller('scanCtrl', ['$scope', '$rootScope', '$ionicPlatform', '$ionicPopup', '$cordovaBarcodeScanner', 'localStorageService', '$cordovaVibration',
    function($scope, $rootScope, $ionicPlatform, $ionicPopup, $cordovaBarcodeScanner, localStorageService, $cordovaVibration) {
        $rootScope.scan_list = localStorageService.length() > 0 ? localStorageService.get('scannedData') : []
        $scope.startScan = function() {
            $ionicPlatform.ready(function() {
                $cordovaBarcodeScanner.scan({
                    showTorchButton: true
                }).then(function(barcodeData) {
                    if (!barcodeData.cancelled) {
                        $cordovaVibration.vibrate(100);
                        var data = {
                            text: barcodeData.text,
                            format: barcodeData.format,
                            date: Date.now()
                        }
                        $rootScope.scan_list.push(data)
                        localStorageService.set('scannedData', $rootScope.scan_list);
                        $ionicPopup.alert({
                            title: 'Barcode Scanner',
                            template: `
                                Text: ${barcodeData.text} <br/>
                                Format: ${barcodeData.format}
                            `
                        });
                    }
                }, function(error) {
                    $ionicPopup.alert({
                        title: 'Barcode Scanner',
                        template: 'An error occured.'
                    });
                });
            });
        }
    }
])

.controller('historyCtrl', ['$scope', '$rootScope', 'localStorageService', '$ionicPopup', '$cordovaSocialSharing',
    function($scope, $rootScope, localStorageService, $ionicPopup, $cordovaSocialSharing) {
        $scope.loadScans = function() {
            setTimeout(function() {
                $rootScope.scan_list = localStorageService.length() > 0 ? localStorageService.get('scannedData') : []
            });
        }
        $scope.clearStorage = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Barcode Scanner',
                template: 'Are you sure you want to clear history?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    localStorageService.clearAll();
                    $rootScope.scan_list = []
                } else {
                    console.log('You are not sure');
                }
            });
        }
        $scope.shareScan = function(index) {
            $cordovaSocialSharing.share($rootScope.scan_list[index].text, 'Barcode Scanner', null, null) // Share via native share sheet
                .then(function(result) {
                    console.log(success)
                }, function(err) {
                    console.log(err)
                });
        }
    }
])