type optUsuarios = {
    id          :number;
    username    : string;
}

class Vehiculos_agregar{
    peticion: Peticion;
    constructor(){
        this.peticion = new Peticion({url: this.url_api});
        this.inicializar();
    }

    get url_api(){
        return localStorage.getItem('url_api') || '';
    }

    inicializar(){
        this.getUsuarios();
        this.agregarEventoGuardar();
    }

    getUsuarios(){
        let App = this;
        this.peticion.get(`usuarios/listar`, function(result:any){
            if(result.data != null)
                App.llenarSelect(result.data);
        }, function(){});
    }

    llenarSelect(usuarios : optUsuarios[]){
        let opt = ``;
        usuarios.map(us => {
            opt += `<option value="${us.id}">${us.username}</option>`;
        });

        $("#select-usuario").html(opt);
    }

    agregarEventoGuardar(){
        let App = this;
        $('#guardar-valor').click(function(e){
            e.preventDefault();
            var $form = $("#frm-vehiculo");
            if (!(<any>$form).valid()) return false;
            var data = $form.serialize();
            App.peticion.set({ parametros: data });
            App.peticion.post(`vehiculos/agregar`, function(){
                new Vehiculos_catalogo();
                (<any>$('#modal-container')).modal('hide');
            }, function(){});
            return false;
        });
    }
}

new Vehiculos_agregar();