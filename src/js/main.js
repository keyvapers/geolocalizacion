"use strict";
var main = (function () {
    function main() {
        this.inicializar();
    }
    main.prototype.inicializar = function () {
        $('#modal-container').on('hidden.bs.modal', function () {
            $(this).removeData('bs.modal');
        });
        $('body').on('click', '.modal-link', function (e) {
            e.preventDefault();
            var link = $(this);
            $('.modal-content').load(link[0].href, function () {
                $('#modal-container').modal({ show: true });
            });
        });
        jQuery.extend(jQuery.validator.messages, {
            required: "Este campo es requerido"
        });
    };
    return main;
}());
new main();
//# sourceMappingURL=main.js.map