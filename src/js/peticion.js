"use strict";
var Loading = (function () {
    function Loading(Prop) {
        !Prop ? Prop = {} : '';
        this._color = Prop.color || '#0080FF';
        this._ancho = Prop.ancho || 3;
        this._contenedor = Prop.contenedor || 'body';
        this._progress = 0;
        this.init();
    }
    Object.defineProperty(Loading.prototype, "contenedor", {
        get: function () {
            return $(this._contenedor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loading.prototype, "Loading_html", {
        get: function () {
            var html = "<div class=\"Loading\"><div class=\"Progress\"></div><div class=\"LoadingBg\"></div></div>";
            return html;
        },
        enumerable: true,
        configurable: true
    });
    Loading.prototype.init = function () {
        var App = this;
        $(document).ajaxStart(function () {
            App.progress(0);
        });
        $(document).ajaxComplete(function () {
            App.autoProgress();
        });
        if (!this.contenedor.find('.Loading')[0]) {
            this.init_css();
            this.contenedor.append(this.Loading_html);
        }
    };
    Loading.prototype.autoProgress = function () {
        var activas = $.active;
        var newProgress = 100 / activas;
        if (newProgress >= this._progress) {
            this.progress(newProgress);
            this._progress = newProgress;
        }
    };
    Loading.prototype.progress = function (progress) {
        $('.Progress').animate({ width: progress + '%' }, 200);
        if (progress == 100) {
            $('.Loading').delay(800).fadeOut(400, function () {
                $('.Progress').width(0);
                $('.LoadingBg').hide(0);
            });
            this._progress = 0;
        }
        else if (!$('.Loading').is(':visible')) {
            $('.Loading').fadeIn(300);
        }
    };
    Loading.prototype.init_css = function () {
        var css = "\n\t\t\t.Loading,.LoadingBg{\n\t\t\t\tposition\t\t: fixed;\n\t\t\t\tz-index\t\t\t: 9999;\n\t\t\t }\n\t\t\t.Loading{\n\t\t\t\twidth\t\t\t: 100%;\n\t\t\t\ttop\t\t\t\t: 0;\n\t\t\t }\n\t\t\t.LoadingBg{\n\t\t\t\tdisplay\t\t: none;\n\t\t\t\twidth\t\t\t: 100%;\n\t\t\t\theight\t\t\t: 100%;\n\t\t\t\tbackground\t\t: rgba(255,255,255,0.7);\n\t\t\t }\n\t\t\t.Progress{\n\t\t\t\theight\t\t\t: " + this._ancho + "px;\n\t\t\t\twidth\t\t\t: 0%;\n\t\t\t\tbackground-color: " + this._color + ";\n\t\t\t\tbox-shadow\t\t: 0 1px 10px #888888;\n\t\t\t\tborder-radius\t: 0 5px 5px 0;\n\t\t\t}";
        var style = document.createElement("style");
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    };
    return Loading;
}());
var Peticion = (function () {
    function Peticion(propiedades) {
        this._url = propiedades.url || '';
        this._api = propiedades.webService || '';
        this._parametros = propiedades.parametros || '';
        this._contentType = propiedades.contentType || 'application/x-www-form-urlencoded';
        this._processData = propiedades.processData || true;
        this._ajax = "";
        this._metodo = 'post';
        this._token = propiedades.token || '';
    }
    Peticion.prototype.set = function (p) {
        this._url = p.url || this._url;
        this._api = p.webService || this._api;
        this._parametros = p.parametros || this._parametros;
        this._token = p.token || this._token;
        this._contentType = p.contentType || this._contentType;
        this._processData = p.processData || this._processData;
    };
    Object.defineProperty(Peticion.prototype, "data", {
        set: function (data) {
            this._parametros = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Peticion.prototype, "ajax", {
        get: function () {
            return this._ajax;
        },
        enumerable: true,
        configurable: true
    });
    Peticion.prototype.abort = function () {
        if (this._ajax)
            this._ajax.abort('User abort.');
    };
    Peticion.prototype.put = function (api, callbackDone, callbackFail) {
        this._metodo = 'put';
        this._api = api;
        this._do(callbackDone, callbackFail);
    };
    Peticion.prototype.post = function (api, callbackDone, callbackFail) {
        this._metodo = 'post';
        this._api = api;
        this._do(callbackDone, callbackFail);
    };
    Peticion.prototype.get = function (api, callbackDone, callbackFail) {
        this._metodo = 'get';
        this._api = api;
        this._do(callbackDone, callbackFail);
    };
    Peticion.prototype.delete = function (api, callbackDone, callbackFail) {
        this._metodo = 'delete';
        this._api = api;
        this._do(callbackDone, callbackFail);
    };
    Peticion.prototype._do = function (callbackDone, callbackFail) {
        var Ajax = {
            url: this._url + this._api,
            type: this._metodo,
            data: this._parametros,
            dataType: 'JSON',
            headers: { token: this._token },
            processData: this._processData
        };
        this._parametros = '';
        if (this._contentType)
            Ajax.contentType = this._contentType;
        this._ajax = $.ajax(Ajax)
            .done(function (result) {
            if (callbackDone)
                callbackDone(result);
        })
            .fail(function (jqXHR) {
            var result = jqXHR.responseJSON || {};
            if (callbackFail)
                callbackFail(result);
        })
            .always(function () { });
    };
    return Peticion;
}());
//# sourceMappingURL=peticion.js.map