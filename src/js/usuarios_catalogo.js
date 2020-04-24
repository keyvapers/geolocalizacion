"use strict";
var Usuarios_catalogo = (function () {
    function Usuarios_catalogo() {
        this.peticion = new Peticion({ url: this.url_api });
        this.inicializar();
    }
    Object.defineProperty(Usuarios_catalogo.prototype, "url_api", {
        get: function () {
            return localStorage.getItem('url_api') || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Usuarios_catalogo.prototype, "base_url", {
        get: function () {
            return sessionStorage.baseUrl;
        },
        enumerable: true,
        configurable: true
    });
    Usuarios_catalogo.prototype.inicializar = function () {
        this.getUsuarios();
    };
    Usuarios_catalogo.prototype.getUsuarios = function () {
        var App = this;
        this.peticion.get("usuarios/listar", function (result) {
            if (result.data != null)
                App.generarTabla(result.data);
        }, function () { });
    };
    Usuarios_catalogo.prototype.generarTabla = function (usuarios) {
        var _this = this;
        var rows = "";
        if (usuarios.length > 0) {
            usuarios.map(function (u) {
                rows += "<tr>\n                            <td class=\"hide-sm\">" + u.id + "</td>\n                            <td>" + u.username + "</td>\n                            <td  class=\"hide-sm\">" + u.tipo + "</td>\n                            <td class=\"tabla-acciones\">\n                                <a class=\"btn btn-primary btn-edit modal-link\" href=\"" + _this.base_url + "Usuarios/editar/" + u.id + "\"><i class=\"mdi mdi-pencil\"></i></a>\n                                <button class=\"btn btn-primary btn-delete\" data-id=\"" + u.id + "\"><i class=\"mdi mdi-delete\"></i></button>\n                            </td>";
                rows += "</tr>";
            });
            $("#tabla-usuarios tbody").html(rows);
            this.agregarEventoEliminar();
        }
        else {
            rows += "<tr><td colspan=\"4\"><center>No hay elementos</td></center></tr>";
            $('#tabla-usuarios tbody').html(rows);
        }
    };
    Usuarios_catalogo.prototype.agregarEventoEliminar = function () {
        var App = this;
        $(".btn-delete").click(function (e) {
            e.preventDefault();
            var data = {
                id: $(this).data('id')
            };
            App.peticion.set({ parametros: data });
            App.peticion.post("Usuarios/eliminar", function () {
                new Usuarios_catalogo();
            }, function () { });
            return false;
        });
    };
    return Usuarios_catalogo;
}());
new Usuarios_catalogo();
//# sourceMappingURL=usuarios_catalogo.js.map