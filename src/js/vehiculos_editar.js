"use strict";
var Vehiculos_editar = (function () {
    function Vehiculos_editar(idVehiculo) {
        this.peticion = new Peticion({ url: this.url_api });
        this.idVehiculo = idVehiculo;
        this.inicializar();
    }
    Object.defineProperty(Vehiculos_editar.prototype, "url_api", {
        get: function () {
            return localStorage.getItem('url_api') || '';
        },
        enumerable: true,
        configurable: true
    });
    Vehiculos_editar.prototype.inicializar = function () {
        this.getUsuarios();
        this.agregarEventoEditar();
        this.getVehiculo();
    };
    Vehiculos_editar.prototype.getUsuarios = function () {
        var App = this;
        this.peticion.get("usuarios/listar", function (result) {
            if (result.data != null)
                App.llenarSelect(result.data);
        }, function () { });
    };
    Vehiculos_editar.prototype.llenarSelect = function (usuarios) {
        var opt = "";
        usuarios.map(function (us) {
            opt += "<option value=\"" + us.id + "\">" + us.username + "</option>";
        });
        $("#select-usuario").html(opt);
    };
    Vehiculos_editar.prototype.getVehiculo = function () {
        var App = this;
        this.peticion.get("vehiculos/obtener?id=" + this.idVehiculo, function (result) {
            if (result.data != null)
                App.llenarFormulario(result.data);
        }, function () { });
    };
    Vehiculos_editar.prototype.llenarFormulario = function (vehiculo) {
        $("#frm-vehiculo [name='placas']").val(vehiculo.placas);
        $("#frm-vehiculo [name='marca']").val(vehiculo.marca);
        $("#frm-vehiculo [name='color']").val(vehiculo.color);
        $("#frm-vehiculo [name='modelo']").val(vehiculo.modelo);
        $("#frm-vehiculo [name='usuario_id']").val(vehiculo.usuario_id);
    };
    Vehiculos_editar.prototype.agregarEventoEditar = function () {
        var App = this;
        $('#guardar-valor').click(function (e) {
            e.preventDefault();
            var $form = $("#frm-vehiculo");
            if (!$form.valid())
                return false;
            var data = $form.serialize();
            data += "&id=" + App.idVehiculo;
            App.peticion.set({ parametros: data });
            App.peticion.post("vehiculos/editar", function () {
                new Vehiculos_catalogo();
                $('#modal-container').modal('hide');
            }, function () { });
            return false;
        });
    };
    return Vehiculos_editar;
}());
//# sourceMappingURL=vehiculos_editar.js.map