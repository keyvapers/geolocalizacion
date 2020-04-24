"use strict";
var Vehiculos_catalogo = (function () {
    function Vehiculos_catalogo() {
        this.peticion = new Peticion({ url: this.url_api });
        this.inicializar();
    }
    Object.defineProperty(Vehiculos_catalogo.prototype, "url_api", {
        get: function () {
            return localStorage.getItem('url_api') || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vehiculos_catalogo.prototype, "base_url", {
        get: function () {
            return sessionStorage.baseUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vehiculos_catalogo.prototype, "user", {
        get: function () {
            return JSON.parse(sessionStorage.userData);
        },
        enumerable: true,
        configurable: true
    });
    Vehiculos_catalogo.prototype.inicializar = function () {
        this.getVehiculos();
    };
    Vehiculos_catalogo.prototype.getVehiculos = function () {
        var App = this;
        this.peticion.get("vehiculos/listar?userId=" + this.user.userId, function (result) {
            if (result.data != null)
                App.generarTabla(result.data);
        }, function () { });
    };
    Vehiculos_catalogo.prototype.generarTabla = function (vehiculos) {
        var _this = this;
        var rows = "";
        if (vehiculos.length > 0) {
            vehiculos.map(function (ve) {
                rows += "<tr>\n                            <td class=\"hide-sm\">" + ve.id + "</td>\n                            <td>" + ve.placas + "</td>\n                            <td  class=\"hide-sm\">" + ve.marca + "</td>\n                            <td class=\"hide-m hide-sm\">" + ve.color + "</td>\n                            <td  class=\"hide-sm\">" + ve.modelo + "</td>";
                if (_this.user.tipoUsuario == 1)
                    rows += "<td class=\"hide-m hide-sm\">" + ve.username + "</td>\n                            <td class=\"tabla-acciones\">\n                                <a class=\"btn btn-primary btn-edit modal-link\" href=\"" + _this.base_url + "Vehiculos/Editar/" + ve.id + "\"><i class=\"mdi mdi-pencil\"></i></a>\n                                <button class=\"btn btn-primary btn-delete\" data-id=\"" + ve.id + "\"><i class=\"mdi mdi-delete\"></i></button>\n                            </td>";
                rows += "</tr>";
            });
            $("#tabla-vehiculos tbody").html(rows);
            this.agregarEventoEliminar();
        }
        else {
            rows += "<tr><td colspan=\"7\"><center>No hay elementos</td></center></tr>";
            $('#tabla-vehiculos tbody').html(rows);
        }
    };
    Vehiculos_catalogo.prototype.agregarEventoEliminar = function () {
        var App = this;
        $(".btn-delete").click(function (e) {
            e.preventDefault();
            var data = {
                id: $(this).data('id')
            };
            App.peticion.set({ parametros: data });
            App.peticion.post("vehiculos/eliminar", function () {
                new Vehiculos_catalogo();
            }, function () { });
            return false;
        });
    };
    return Vehiculos_catalogo;
}());
new Vehiculos_catalogo();
//# sourceMappingURL=vehiculos_catalogo.js.map