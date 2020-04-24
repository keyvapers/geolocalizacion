type usuario = {
    id                  :number;
    username            :string;
    tipo_usuario_id     :number;
    tipo                :string;
}

type tipo_usuario = {
    id      :number;
    tipo    :string;
}

class Usuarios_agregar{
    peticion: Peticion;
    constructor(){
        this.peticion = new Peticion({url: this.url_api});
        this.inicializar();
    }

    get url_api(){
        return localStorage.getItem('url_api') || '';
    }

    inicializar(){
        (<any>$( "#frm-usuario" )).validate({
            rules: {
                confirm_password: {
                equalTo: "#password"
              }
            }
          });
        this.getTipos();
        this.agregarEventoGuardar();
    }

    getTipos(){
        let App = this;
        this.peticion.get(`usuarios/tipos`, function(result:any){
            if(result.data != null)
                App.llenarSelect(result.data);
        }, function(){});
    }

    llenarSelect(tipos : tipo_usuario[]){
        let opt = ``;
        tipos.map(tu => {
            opt += `<option value="${tu.id}">${tu.tipo}</option>`;
        });

        $("#select-tipo").html(opt);
    }

    agregarEventoGuardar(){
        let App = this;
        $('#guardar-valor').click(function(e){
            e.preventDefault();
            var $form = $("#frm-usuario");
            if (!(<any>$form).valid()) return false;
            var data = {
                username: $form.find("[name='username']").val(),
                password: sha1($form.find("[name='password']").val()),
                tipo_usuario_id: $form.find("[name='tipo_usuario_id']").val()
            };

            App.peticion.set({ parametros: data });
            App.peticion.post(`usuarios/agregar`, function(){
                new Usuarios_catalogo();
                (<any>$('#modal-container')).modal('hide');
            }, function(){});
            return false;
        });
    }
}

new Usuarios_agregar();