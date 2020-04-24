"use strict";
var Vehiculos_agregar = (function () {
    function Vehiculos_agregar() {
        this.peticion = new Peticion({ url: this.url_api });
        this.inicializar();
    }
    Object.defineProperty(Vehiculos_agregar.prototype, "url_api", {
        get: function () {
            return localStorage.getItem('url_api') || '';
        },
        enumerable: true,
        configurable: true
    });
    Vehiculos_agregar.prototype.inicializar = function () {
        this.getUsuarios();
        this.agregarEventoGuardar();
    };
    Vehiculos_agregar.prototype.getUsuarios = function () {
        var App = this;
        this.peticion.get("usuarios/listar", function (result) {
            if (result.data != null)
                App.llenarSelect(result.data);
        }, function () { });
    };
    Vehiculos_agregar.prototype.llenarSelect = function (usuarios) {
        var opt = "";
        usuarios.map(function (us) {
            opt += "<option value=\"" + us.id + "\">" + us.username + "</option>";
        });
        $("#select-usuario").html(opt);
    };
    Vehiculos_agregar.prototype.agregarEventoGuardar = function () {
        var App = this;
        $('#guardar-valor').click(function (e) {
            e.preventDefault();
            var $form = $("#frm-vehiculo");
            if (!$form.valid())
                return false;
            var data = $form.serialize();
            App.peticion.set({ parametros: data });
            App.peticion.post("vehiculos/agregar", function () {
                new Vehiculos_catalogo();
                $('#modal-container').modal('hide');
            }, function () { });
            return false;
        });
    };
    return Vehiculos_agregar;
}());
new Vehiculos_agregar();
//# sourceMappingURL=vehiculos_agregar.js.map