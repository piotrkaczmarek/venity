(function() {
  'use strict';
  angular
    .module('venity')
    .controller('CarEditCtrl', CarEditCtrl);

    CarEditCtrl.$inject = ['CarSrv', 'Auth', '$stateParams', '$state', 'Upload'];

    function CarEditCtrl(CarSrv, Auth, $stateParams, $state, Upload) {
      var vm = this;
      vm.update = update;
      vm.upload = upload;

      CarSrv.show($stateParams.carId)
        .success(function(data) {
          vm.car = data.car;
        })
        .error(function(error) {
          $state.go('main.carList');
        });

      function update() {
        CarSrv.update(vm.car)
          .success(redirectToCarList)
          .error(displayErrors);

        function redirectToCarList() {
          $state.go('main.carList', {}, {reload: true});
        }

        function displayErrors(error) {
          vm.errors = error;
        }
      }

      function upload(file) {
        if(!file) return;

        Upload.upload({
          url: '/api/cars/' + $stateParams.carId + '/photos',
          file: file
        }).success(function(data, status, headers, config) {
          vm.car = data.car;
        });
      }
    }
})();
