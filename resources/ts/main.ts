interface JQueryStatic {
    validator: any;
}
class main{
    constructor(){
        this.inicializar();
    }

    inicializar(){
        $('#modal-container').on('hidden.bs.modal', function () {
            $(this).removeData('bs.modal');
        });

        $('body').on('click', '.modal-link', function (e) {
            e.preventDefault();
            var link = $(this);
            $('.modal-content').load(link[0].href, function () {
                (<any>$('#modal-container')).modal({ show: true });
            });
        });

        jQuery.extend(jQuery.validator.messages, {
            required: "Este campo es requerido",
            equalTo: "Las contraseñas no coinciden"
        });

        $("#menu-mobile").toggle();

        $("#btn-menu-mobile").click(function(e){
            e.preventDefault();
            $("#menu-mobile").toggle("slow");
        });

        $("#menu-mobile a").click(function(e){
            $(this).each(function(){
                const sectionTop = $(this.hash).offset().top;
                $("html, body").animate({
                    scrollTop: sectionTop
                }, 1500);
            });
        });
    }
}

new main();