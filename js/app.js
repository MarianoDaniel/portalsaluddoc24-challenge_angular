(function() {
  'use strict';

  angular
    .module('miApp', ['ui.router'])
    .config(configure)
    .controller('MainController', MainController);

  configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function configure($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/inicio');

    $stateProvider
      .state('inicio', {
        url: '/inicio',
        templateUrl: 'pages/inicio.html',
        controller: 'InicioController as inicioCtrl',
        resolve: {
          contenidoInicio: ['InicioService', function(InicioService) {
            return InicioService.obtenerDatosInicio();
          }]
        }
      })
      .state('turno', {
        url: '/turno',
        templateUrl: 'pages/turno.html',
        controller: 'TurnoController as turnoCtrl',
        resolve: {
          especialidades: ['TurnoService', function (TurnoService) {
            return TurnoService.obtenerEspecialidades();
          }]
        }
      });
  }

  MainController.$inject = ['$scope'];
  function MainController($scope) {
    console.log("Controlador principal");
  }

})();
