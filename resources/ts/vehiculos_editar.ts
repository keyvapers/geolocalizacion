type optUsuarios = {
    id          :number;
    username    : string;
}

class Vehiculos_editar{
    peticion: Peticion;
    idVehiculo :number;
    constructor(idVehiculo :number){
        this.peticion = new Peticion({url: this.url_api});
        this.idVehiculo = idVehiculo;
        this.inicializar();
    }

    get url_api(){
        return localStorage.getItem('url_api') || '';
    }

    inicializar(){
        this.getUsuarios();
        this.agregarEventoEditar();
        this.getVehiculo();
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

    getVehiculo(){
        let App = this;
        this.peticion.get(`vehiculos/obtener?id=${this.idVehiculo}`, function(result:any){
            if(result.data != null)
                App.llenarFormulario(result.data);
        }, function(){});
    }

    llenarFormulario(vehiculo :vehiculo){
        $("#frm-vehiculo [name='placas']").val(vehiculo.placas);
        $("#frm-vehiculo [name='marca']").val(vehiculo.marca);
        $("#frm-vehiculo [name='color']").val(vehiculo.color);
        $("#frm-vehiculo [name='modelo']").val(vehiculo.modelo);
        $("#frm-vehiculo [name='usuario_id']").val(vehiculo.usuario_id);
    }

    agregarEventoEditar(){
        let App = this;
        $('#guardar-valor').click(function(e){
            e.preventDefault();
            var $form = $("#frm-vehiculo");
            if (!(<any>$form).valid()) return false;
            var data = $form.serialize();
            data += `&id=${App.idVehiculo}`;
            App.peticion.set({ parametros: data });
            App.peticion.post(`vehiculos/editar`, function(){
                new Vehiculos_catalogo();
                (<any>$('#modal-container')).modal('hide');
            }, function(){});
            return false;
        });
    }
}