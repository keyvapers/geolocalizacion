"use strict";
var Mapa = (function () {
    function Mapa(mc, optMap) {
        this.idMapa = '';
        this.mapa = null;
        this.markerArray = [];
        this.zoom = 10;
        this.originalZoom = this.zoom;
        this.callback = null;
        mc.cargarMaps !== false ? mc.cargarMaps = true : '';
        this.apiKey = mc.apiKey;
        this.idMapa = mc.idMapa;
        if (!window.google && mc.cargarMaps) {
            this.cargaGoogleMaps(mc, optMap);
        }
        else if (optMap)
            this.iniciaMapa(optMap);
    }
    Mapa.prototype.cargaGoogleMaps = function (mc, optMap) {
        var _this = this;
        var apiKey = '';
        if (mc.apiKey)
            apiKey = 'key=' + mc.apiKey;
        this.loadScript('https://maps.googleapis.com/maps/api/js?' + apiKey, function () { return _this.iniciaMapa(optMap); });
        return;
    };
    Mapa.prototype.loadScript = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState)
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (callback)
                        callback();
                }
                ;
            };
        else
            script.onload = function () {
                if (callback)
                    callback();
            };
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    Mapa.prototype.iniciaMapa = function (mpOpt) {
        if (mpOpt === void 0) { mpOpt = {}; }
        !mpOpt.lat ? mpOpt.lat = 19.2469 : "";
        !mpOpt.lng ? mpOpt.lng = -103.7263 : "";
        !mpOpt.zoom ? mpOpt.zoom = 10 : "";
        !mpOpt.zoomCtr ? mpOpt.zoomCtr = true : "";
        !mpOpt.ui ? mpOpt.ui = true : "";
        !mpOpt.tipoCtr ? mpOpt.tipoCtr = true : "";
        !mpOpt.streetView ? mpOpt.streetView = true : "";
        !mpOpt.controles ? mpOpt.controles = {} : "";
        !mpOpt.latLng ? mpOpt.latLng = new google.maps.LatLng(mpOpt.lat, mpOpt.lng) : "";
        !mpOpt.style ? mpOpt.style = [{ featureType: "poi", "stylers": [{ "visibility": "off" }] }] : "";
        this.originalPosition = mpOpt.latLng;
        this.originalZoom = mpOpt.zoom;
        var controles = {
            zoom: { position: '' },
            streetView: { position: '' },
            mapType: { position: '' }
        };
        controles.mapType.position = mpOpt.controles.mapType || 'RIGHT_BOTTOM';
        controles.streetView.position = mpOpt.controles.streetView || 'RIGHT_BOTTOM';
        controles.zoom.position = mpOpt.controles.zoom || 'RIGHT_CENTER';
        var getPosition = function (pos) {
            var position;
            position = parseInt(google.maps.ControlPosition[pos]);
            return position;
        };
        var mapOptions = {
            zoom: mpOpt.zoom,
            disableDefaultUI: mpOpt.ui,
            mapTypeControl: mpOpt.tipoCtr,
            mapTypeControlOptions: {
                position: getPosition(controles.mapType.position)
            },
            streetViewControl: mpOpt.streetView,
            streetViewControlOptions: {
                position: getPosition(controles.streetView.position)
            },
            zoomControl: mpOpt.zoomCtr,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: getPosition(controles.zoom.position)
            },
            center: mpOpt.latLng,
            styles: mpOpt.style
        };
        this.mapa = new google.maps.Map(document.getElementById(this.idMapa), mapOptions);
    };
    Mapa.prototype.ready = function (callback) {
        var App = this;
        var timer;
        if (window.google)
            callback(this);
        else
            timer = setInterval(function () {
                if (window.google) {
                    clearInterval(timer);
                    callback(App);
                }
            }, 500);
    };
    Mapa.prototype.agregarMarcador = function (markOpt) {
        if (markOpt === void 0) { markOpt = {}; }
        !markOpt.id ? markOpt.id = 0 : '';
        !markOpt.lat ? markOpt.lat = 19.2469 : '';
        !markOpt.lng ? markOpt.lng = -103.7263 : '';
        !markOpt.latLng ? markOpt.latLng = new google.maps.LatLng(markOpt.lat, markOpt.lng) : '';
        !markOpt.arrastrable ? markOpt.arrastrable = false : '';
        !markOpt.urlIcon ? markOpt.urlIcon = '' : '';
        !markOpt.titulo ? markOpt.titulo = "Marcador" : '';
        !markOpt.mapa ? markOpt.mapa = this.mapa : '';
        !markOpt.mover ? markOpt.mover = false : '';
        !markOpt.clickable ? markOpt.clickable = true : '';
        !markOpt.infoWindow ? markOpt.infoWindow = false : '';
        !markOpt.contenidoInfo ? markOpt.contenidoInfo = markOpt.titulo : '';
        !markOpt.label ? markOpt.label = false : '';
        !markOpt.labelContent ? markOpt.labelContent = markOpt.titulo : '';
        !markOpt.zIndex ? markOpt.zIndex = 1 : '';
        markOpt.log === undefined ? markOpt.log = true : '';
        markOpt.optimized == undefined ? markOpt.optimized = true : '';
        var opcionesMarca = {
            position: markOpt.latLng,
            icon: markOpt.urlIcon,
            title: markOpt.titulo,
            draggable: markOpt.arrastrable,
            map: markOpt.mapa,
            clickable: markOpt.clickable,
            zIndex: markOpt.zIndex,
            optimized: markOpt.optimized,
            metadata: markOpt.id
        };
        if (markOpt.label)
            opcionesMarca.label = {
                text: markOpt.labelContent
            };
        var marker = new google.maps.Marker(opcionesMarca);
        if (markOpt.mover) {
            this.moverMapa({ latLng: marker.getPosition() });
        }
        marker.destacar = function (tiempo) {
            if (tiempo === void 0) { tiempo = 2000; }
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, tiempo);
        };
        marker.close = function () {
            if (marker.infoWindow)
                marker.infoWindow.setMap(null);
            marker.setMap(null);
        }.bind(marker);
        if (markOpt.infoWindow) {
            marker.infoWindow = this.agregarInfoWindow({
                marker: marker,
                contenido: markOpt.contenidoInfo
            });
            marker.open = function (contenido) {
                if (contenido)
                    markOpt.contenidoInfo = contenido;
                marker.infoWindow.setContent(markOpt.contenidoInfo);
                marker.infoWindow.open(markOpt.mapa, marker);
            };
        }
        if (markOpt.log)
            this.markerArray.push(marker);
        return marker;
    };
    Mapa.prototype.moverMapa = function (moverOpt) {
        !moverOpt.lat ? moverOpt.lat = 19.2469 : "";
        !moverOpt.lng ? moverOpt.lng = -103.7263 : "";
        !moverOpt.latLng ? moverOpt.latLng = this.latLng(moverOpt.lat, moverOpt.lng) : "";
        this.mapa.panTo(moverOpt.latLng);
    };
    Mapa.prototype.latLng = function (lat, lng) {
        return new google.maps.LatLng(lat, lng);
    };
    Mapa.prototype.agregarInfoWindow = function (infoWD) {
        !infoWD.contenido ? infoWD.contenido = infoWD.marker.getTitle() : '';
        !infoWD.autoPan ? infoWD.autoPan = false : '';
        !infoWD.clickable ? infoWD.clickable = true : '';
        var info = new google.maps.InfoWindow({
            disableAutoPan: infoWD.autoPan
        });
        if (infoWD.clickable) {
            google.maps.event.addListener(infoWD.marker, "click", function () {
                info.setContent(infoWD.contenido);
                info.open(infoWD.marker.getMap(), infoWD.marker);
            });
        }
        return info;
    };
    Mapa.prototype.actualizarPosicionMarker = function (id, lat, lng) {
        var marker = this.markerArray.find(function (m) { return m.metadata == id; });
        var posicion = this.latLng(lat, lng);
        marker.setPosition(posicion);
    };
    Mapa.prototype.ajustar = function () {
        var latlngbounds = new google.maps.LatLngBounds();
        this.markerArray.map(function (mk) {
            latlngbounds.extend(mk.getPosition());
        });
        this.mapa.fitBounds(latlngbounds);
        this.mapa.setZoom((this.mapa.getZoom()));
    };
    return Mapa;
}());
//# sourceMappingURL=mapa.js.map