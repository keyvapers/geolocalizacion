"use strict";
var Login = (function () {
    function Login() {
        this.peticion = new Peticion({ url: this.url_api });
        this.inicializar();
    }
    Object.defineProperty(Login.prototype, "url_api", {
        get: function () {
            return localStorage.getItem('url_api') || '';
        },
        enumerable: true,
        configurable: true
    });
    Login.prototype.inicializar = function () {
        var App = this;
        $('#frm-login').submit(function (e) {
            e.preventDefault();
            var usuario = String($(this).find('input[name=login-user]').val());
            var pass = String($(this).find('input[name=login-pass]').val());
            App.doLogin(usuario, sha1(pass));
        });
    };
    Login.prototype.doLogin = function (username, password) {
        var App = this;
        this.peticion.data = { username: username, password: password };
        $('#btn-login').prop('disabled', true).addClass('loading');
        this.peticion.post('login/signin', function (result) {
            if (result.status) {
                App.init(result.data);
            }
            else {
                $('#login-message span').html(result.error).finish().fadeIn(300).delay(3000).fadeOut();
                $('#btn-login').prop('disabled', false).removeClass('loading');
            }
        });
    };
    Login.prototype.init = function (parametros) {
        console.log("creando session");
        var url = sessionStorage.getItem('baseUrl') + 'Login/success';
        var peticion = new Peticion({ url: '', parametros: parametros });
        peticion.post(url, function () {
            location.reload();
        });
    };
    return Login;
}());
new Login();
//# sourceMappingURL=login.js.map