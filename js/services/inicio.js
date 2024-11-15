(function () {
    'use strict';

    angular
        .module('miApp')
        .factory('InicioService', InicioService);

    InicioService.$inject = ['$http'];

    function InicioService($http) {
        var service = this;
        var apiBaseUrl = `${window.location.origin}`;

        service.obtenerDatosInicioUrl = apiBaseUrl + '/data/inicio.json';

        service.obtenerDatosInicio = function () {
            var promise = $http.get(service.obtenerDatosInicioUrl)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.error('Error al obtener datos de inicio:', error);
                    throw error;
                });

            return promise;
        };

        return {
            obtenerDatosInicio: function () {
                return service.obtenerDatosInicio();
            }
        };
    }
})();
