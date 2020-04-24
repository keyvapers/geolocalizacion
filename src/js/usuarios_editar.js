"use strict";
var Usuarios_editar = (function () {
    function Usuarios_editar(idUsuario) {
        this.peticion = new Peticion({ url: this.url_api });
        this.idUsuario = idUsuario;
        this.inicializar();
    }
    Object.defineProperty(Usuarios_editar.prototype, "url_api", {
        get: function () {
            return localStorage.getItem('url_api') || '';
        },
        enumerable: true,
        configurable: true
    });
    Usuarios_editar.prototype.inicializar = function () {
        $("#frm-usuario").validate({
            rules: {
                confirm_password: {
                    equalTo: "#password"
                }
            }
        });
        $("#frm-usuario [name='password']").prop('required', false);
        $("#frm-usuario [name='confirm_password']").prop('required', false);
        $(".modal-title").html("Editar Usuario");
        this.getTipos();
        this.agregarEventoEditar();
        this.getUsuario();
    };
    Usuarios_editar.prototype.getTipos = function () {
        var App = this;
        this.peticion.get("usuarios/tipos", function (result) {
            if (result.data != null)
                App.llenarSelect(result.data);
        }, function () { });
    };
    Usuarios_editar.prototype.llenarSelect = function (tipos) {
        var opt = "";
        tipos.map(function (tu) {
            opt += "<option value=\"" + tu.id + "\">" + tu.tipo + "</option>";
        });
        $("#select-tipo").html(opt);
    };
    Usuarios_editar.prototype.getUsuario = function () {
        var App = this;
        this.peticion.get("usuarios/obtener?id=" + this.idUsuario, function (result) {
            if (result.data != null)
                App.llenarFormulario(result.data);
        }, function () { });
    };
    Usuarios_editar.prototype.llenarFormulario = function (usuario) {
        $("#frm-usuario [name='username']").val(usuario.username);
        $("#frm-usuario [name='tipo_usuario_id']").val(usuario.tipo_usuario_id);
    };
    Usuarios_editar.prototype.agregarEventoEditar = function () {
        var App = this;
        $('#guardar-valor').click(function (e) {
            e.preventDefault();
            var $form = $("#frm-usuario");
            if (!$form.valid())
                return false;
            var data = {};
            if ($form.find("[name='password']").val() != "") {
                data = {
                    username: $form.find("[name='username']").val(),
                    tipo_usuario_id: $form.find("[name='tipo_usuario_id']").val(),
                    password: sha1($form.find("[name='password']").val()),
                    id: App.idUsuario
                };
            }
            else {
                data = {
                    username: $form.find("[name='username']").val(),
                    tipo_usuario_id: $form.find("[name='tipo_usuario_id']").val(),
                    id: App.idUsuario
                };
            }
            App.peticion.set({ parametros: data });
            App.peticion.post("usuarios/editar", function () {
                new Usuarios_catalogo();
                $('#modal-container').modal('hide');
            }, function () { });
            return false;
        });
    };
    return Usuarios_editar;
}());
//# sourceMappingURL=usuarios_editar.js.map