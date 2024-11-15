(function () {
  'use strict';

  angular
    .module('miApp')
    .controller('TurnoController', TurnoController);

  TurnoController.$inject = ['especialidades', 'TurnoService', '$scope'];

  function TurnoController(especialidades, TurnoService, $scope) {
    var vm = this;
    vm.formularioVisible = true;
    vm.especialidades = especialidades;
    vm.profesionales = [];
    vm.datosTurno = {};
    vm.horariosDelProfesional = [];
    vm.formularioHabilitado = true;
    vm.titulo = 'Solicitar Turno'

    vm.cargarProfesionales = function (especialidadId) {
      if (especialidadId) {
        TurnoService.obtenerProfesionales(especialidadId)
          .then(function (profesionales) {
            vm.profesionales = profesionales;
          })
          .catch(function (error) {
            console.error('Error al cargar profesionales:', error);
          });
      } else {
        vm.profesionales = [];
      }
    };

    vm.cargarHorarios = function (profesionalId) {
      vm.horariosDelProfesional = this.profesionales.find(prof => prof.id === profesionalId)?.horarios;
    }

    vm.habilitarFormulario = function () {
      vm.formularioHabilitado = !vm.formularioHabilitado;
    }

    vm.enviarSolicitud = function () {
      TurnoService.enviarSolicitudTurno(vm.datosTurno)
        .then(function (respuesta) {
          vm.mensajeExito = `Gracias ${vm.datosTurno.nombre}, ${respuesta.mensaje}`;
          vm.formularioVisible = false;
          vm.titulo = 'Turno Solicitado';
        })
        .catch(function (error) {
          console.error('Error al enviar solicitud:', error);
        });
    };
  }
})();
