(function () {
    'use strict';

    angular
        .module('miApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope'];

    function NavbarController($scope) {
        var vm = this;
    }
})();
