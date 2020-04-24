type tipo_usuario = {
    id      :number;
    tipo    :string;
}

class Usuarios_editar{
    peticion: Peticion;
    idUsuario :number;
    constructor(idUsuario :number){
        this.peticion = new Peticion({url: this.url_api});
        this.idUsuario = idUsuario;
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
        $( "#frm-usuario [name='password']" ).prop('required',false); 
        $( "#frm-usuario [name='confirm_password']" ).prop('required',false); 
        $(".modal-title").html("Editar Usuario");
        this.getTipos();
        this.agregarEventoEditar();
        this.getUsuario();
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

    getUsuario(){
        let App = this;
        this.peticion.get(`usuarios/obtener?id=${this.idUsuario}`, function(result:any){
            if(result.data != null)
                App.llenarFormulario(result.data);
        }, function(){});
    }

    llenarFormulario(usuario :usuario){
        $("#frm-usuario [name='username']").val(usuario.username);
        $("#frm-usuario [name='tipo_usuario_id']").val(usuario.tipo_usuario_id);
    }

    agregarEventoEditar(){
        let App = this;
        $('#guardar-valor').click(function(e){
            e.preventDefault();
            var $form = $("#frm-usuario");
            if (!(<any>$form).valid()) return false;
            var data = {};
            
            if($form.find("[name='password']").val() != ""){
                data = {
                    username: $form.find("[name='username']").val(),
                    tipo_usuario_id: $form.find("[name='tipo_usuario_id']").val(),
                    password: sha1($form.find("[name='password']").val()),
                    id: App.idUsuario
                };
            }else{
                data = {
                    username: $form.find("[name='username']").val(),
                    tipo_usuario_id: $form.find("[name='tipo_usuario_id']").val(),
                    id: App.idUsuario
                };
            }
            App.peticion.set({ parametros: data });
            App.peticion.post(`usuarios/editar`, function(){
                new Usuarios_catalogo();
                (<any>$('#modal-container')).modal('hide');
            }, function(){});
            return false;
        });
    }
}
