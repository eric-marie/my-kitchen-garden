'use strict';

angular.module('records').controller('RecordsController', [
    '$scope',
    '$stateParams',
    '$location',
    '$http',
    'Upload',
    'RecordPhoto',
    'Authentication',
    'Records',
    'Roles',
    function ($scope, $stateParams, $location, $http, Upload, RecordPhoto, Authentication, Records, Roles) {
        $scope.authentication = Authentication;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;
        $scope.isAdmin = Roles.isAdmin($scope.authentication.user);

        // Page changed handler
        $scope.pageChanged = function () {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
        };

        // Create new Record
        $scope.create = function () {
            // Create new Record object
            var record = new Records({
                name: this.record.name,
                description: this.record.description,
                category: this.record.category,
                recordPhoto: this.record.recordPhoto
            });

            // Redirect after save
            record.$save(function (response) {
                $location.path('records/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Record
        $scope.remove = function (record) {
            if(confirm("Êtes-vous sûr de vouloir supprimer cette fiche ?")) {
                if (record) {
                    record.$remove();

                    for (var i in $scope.records) {
                        if ($scope.records [i] === record) {
                            $scope.records.splice(i, 1);
                        }
                    }
                } else {
                    $scope.record.$remove(function () {
                        $location.path('records');
                    });
                }
            }
        };

        // Update existing Record
        $scope.update = function () {
            var record = $scope.record;

            record.$update(function () {
                $location.path('records/' + record._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Records
        $scope.find = function () {
            $scope.records = Records.query();
        };

        // Find existing Record
        $scope.findOne = function () {
            $scope.record = Records.get({
                recordId: $stateParams.recordId
            });
        };

        // Search for a record
        $scope.recordSearch = function (product) {
            $location.path('records/' + product._id);
        };

        // Record Photo
        $scope.getRecordPhoto = RecordPhoto.getRecordPhoto;

        $scope.uploadRecordPhoto = function (files) {
            if (files && 1 == files.length) {
                var file = files[0];
                Upload.upload({
                    url: '/records/upload-photo',
                    fields: $scope.record._id ? {'recordId': $scope.record._id} : {},
                    file: file
                }).success(function (response) {
                    $scope.record.recordPhoto = response.filename;
                    RecordPhoto.refreshTimestamp();
                });
            }
        };

        $scope.deleteRecordPhoto = function () {
            $scope.record.recordPhoto = null;
        };
    }
]);
