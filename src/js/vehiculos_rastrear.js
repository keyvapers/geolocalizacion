"use strict";
var Vehiculos_rastrear = (function () {
    function Vehiculos_rastrear() {
        this.peticion = new Peticion({ url: this.url_api });
        this.markers = [];
        this.inicializar();
    }
    Object.defineProperty(Vehiculos_rastrear.prototype, "url_api", {
        get: function () {
            return localStorage.getItem('url_api') || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vehiculos_rastrear.prototype, "apiKey", {
        get: function () {
            return 'AIzaSyA66nkR3Bf-4_DUEH0dZ0WZloP3BecjTdo';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vehiculos_rastrear.prototype, "user", {
        get: function () {
            return JSON.parse(sessionStorage.userData);
        },
        enumerable: true,
        configurable: true
    });
    Vehiculos_rastrear.prototype.inicializar = function () {
        this.crearMapa();
        this.listener();
    };
    Vehiculos_rastrear.prototype.crearMapa = function () {
        var App = this;
        var mapConfig = {
            idMapa: "map",
            apiKey: this.apiKey
        };
        var opciones = {
            lat: 19.2439524,
            lng: -103.7266729,
            zoom: 14.0
        };
        new Mapa(mapConfig, opciones).ready(function (Mapa) {
            App.mapa = Mapa;
            App.getVehiculos();
        });
    };
    Vehiculos_rastrear.prototype.listener = function () {
        var App = this;
        Pusher.logToConsole = false;
        var pusher = new Pusher('4d141fc651ae0778d77c', {
            cluster: 'us2',
            forceTLS: true
        });
        var channel = pusher.subscribe('geolocalizacion');
        channel.bind('actualizacion', function (data) {
            App.actualizarMarker(data);
        });
    };
    Vehiculos_rastrear.prototype.getVehiculos = function () {
        var App = this;
        this.peticion.get("vehiculos/listar?userId=" + this.user.userId, function (result) {
            if (result.data != null)
                App.agregarMarkers(result.data);
        }, function () { });
    };
    Vehiculos_rastrear.prototype.agregarMarkers = function (vehiculos) {
        var _this = this;
        vehiculos.map(function (ve) {
            if (ve.lat != null && ve.lng != null) {
                var markOpt = {};
                markOpt.lat = ve.lat;
                markOpt.lng = ve.lng;
                markOpt.titulo = ve.placas;
                markOpt.label = true;
                markOpt.labelContent = "" + ve.placas;
                markOpt.id = ve.id;
                var marker = _this.mapa.agregarMarcador(markOpt);
                var markerV = {
                    id: ve.id,
                    marker: marker
                };
                _this.markers.push(markerV);
            }
        });
        this.mapa.ajustar();
    };
    Vehiculos_rastrear.prototype.actualizarMarker = function (ve) {
        this.mapa.actualizarPosicionMarker(ve.id, ve.lat, ve.lng);
        this.mapa.ajustar();
    };
    return Vehiculos_rastrear;
}());
new Vehiculos_rastrear();
//# sourceMappingURL=vehiculos_rastrear.js.map