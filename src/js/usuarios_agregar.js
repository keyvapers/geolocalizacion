"use strict";
var Usuarios_agregar = (function () {
    function Usuarios_agregar() {
        this.peticion = new Peticion({ url: this.url_api });
        this.inicializar();
    }
    Object.defineProperty(Usuarios_agregar.prototype, "url_api", {
        get: function () {
            return localStorage.getItem('url_api') || '';
        },
        enumerable: true,
        configurable: true
    });
    Usuarios_agregar.prototype.inicializar = function () {
        $("#frm-usuario").validate({
            rules: {
                confirm_password: {
                    equalTo: "#password"
                }
            }
        });
        this.getTipos();
        this.agregarEventoGuardar();
    };
    Usuarios_agregar.prototype.getTipos = function () {
        var App = this;
        this.peticion.get("usuarios/tipos", function (result) {
            if (result.data != null)
                App.llenarSelect(result.data);
        }, function () { });
    };
    Usuarios_agregar.prototype.llenarSelect = function (tipos) {
        var opt = "";
        tipos.map(function (tu) {
            opt += "<option value=\"" + tu.id + "\">" + tu.tipo + "</option>";
        });
        $("#select-tipo").html(opt);
    };
    Usuarios_agregar.prototype.agregarEventoGuardar = function () {
        var App = this;
        $('#guardar-valor').click(function (e) {
            e.preventDefault();
            var $form = $("#frm-usuario");
            if (!$form.valid())
                return false;
            var data = {
                username: $form.find("[name='username']").val(),
                password: sha1($form.find("[name='password']").val()),
                tipo_usuario_id: $form.find("[name='tipo_usuario_id']").val()
            };
            App.peticion.set({ parametros: data });
            App.peticion.post("usuarios/agregar", function () {
                new Usuarios_catalogo();
                $('#modal-container').modal('hide');
            }, function () { });
            return false;
        });
    };
    return Usuarios_agregar;
}());
new Usuarios_agregar();
//# sourceMappingURL=usuarios_agregar.js.map