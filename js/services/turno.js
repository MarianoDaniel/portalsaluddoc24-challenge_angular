(function () {
    'use strict';

    angular
        .module('miApp')
        .factory('TurnoService', TurnoService);

    TurnoService.$inject = ['$http'];

    function TurnoService($http) {
        var service = this;

        var apiBaseUrl = `${window.location.origin}/data`;

        service.obtenerEspecialidadesUrl = apiBaseUrl + '/especialidades.json';
        service.obtenerProfesionalesUrl = apiBaseUrl + '/profesionales.json';
        service.solicitarTurnoUrl = apiBaseUrl + '/turnos.json';

        // Función para obtener especialidades
        service.obtenerEspecialidades = function () {
            return $http.get(service.obtenerEspecialidadesUrl)
                .then(function (response) {
                    return response.data.especialidades;
                })
                .catch(function (error) {
                    console.error('Error al obtener especialidades:', error);
                    throw error;
                });
        };

        // Función para obtener los profesionales de la especialidad
        service.obtenerProfesionales = function (especialidadId) {
            return $http.get(service.obtenerEspecialidadesUrl)
                .then(function (response) {
                    return response.data.especialidades.filter(especialidad => especialidad.id === especialidadId).flatMap(esp => esp.profesionales);
                })
                .catch(function (error) {
                    console.error('Error al obtener profesionales:', error);
                    throw error;
                });
        };

        // Función para enviar solicitud de turno
        service.enviarSolicitudTurno = function (datosTurno) {
            return $http.get(service.solicitarTurnoUrl)
                .then(function (response) {
                    //Dejo esto para que se vea que los datos se "envían"
                    console.log("DatosTurno", datosTurno);
                    console.log("response.data", response.data);
                    return response.data;
                })
                .catch(function (error) {
                    console.error('Error al enviar solicitud de turno:', error);
                    throw error;
                });
        };

        return {
            obtenerEspecialidades: function () {
                return service.obtenerEspecialidades();
            },
            obtenerProfesionales: function (especialidadId) {
                return service.obtenerProfesionales(especialidadId);
            },
            enviarSolicitudTurno: function (datosTurno) {
                return service.enviarSolicitudTurno(datosTurno);
            }
        };
    }
})();
