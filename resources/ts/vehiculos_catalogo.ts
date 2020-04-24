
type vehiculo = {
    id          :number;
    placas      :string;
    marca       :string;
    color       :string;
    modelo      :string;
    lat         :number;
    lng         :number;
    usuario_id  :number;
    username    :string;
}

class Vehiculos_catalogo{
    peticion: Peticion;
    constructor(){
        this.peticion = new Peticion({url: this.url_api});
        this.inicializar();
    }

    get url_api(){
        return localStorage.getItem('url_api') || '';
    }

    get base_url(){
        return sessionStorage.baseUrl;
    }

    get user(){
        return JSON.parse(sessionStorage.userData);  
    }

    inicializar(){
        this.getVehiculos();
    }

    getVehiculos(){
        let App = this;
        this.peticion.get(`vehiculos/listar?userId=${this.user.userId}`, function(result:any){
            if(result.data != null)
                App.generarTabla(result.data);
        }, function(){});
    }

    generarTabla(vehiculos: vehiculo[]){
        var rows = ``;
        if(vehiculos.length > 0){
            vehiculos.map(ve => {
                rows += `<tr>
                            <td>${ve.id}</td>
                            <td>${ve.placas}</td>
                            <td>${ve.marca}</td>
                            <td>${ve.color}</td>
                            <td>${ve.modelo}</td>`;
                if(this.user.tipoUsuario == 1)
                rows +=     `<td>${ve.username}</td>
                            <td class="tabla-acciones">
                                <a class="btn btn-primary btn-edit modal-link" href="${this.base_url}Vehiculos/Editar/${ve.id}"><i class="mdi mdi-pencil"></i></a>
                                <button class="btn btn-primary btn-delete" data-id="${ve.id}"><i class="mdi mdi-delete"></i></button>
                            </td>`;
                rows += `</tr>`;
            });
            $("#tabla-vehiculos tbody").html(rows);
            this.agregarEventoEliminar();

        }else{
            rows += `<tr><td colspan="7"><center>No hay elementos</td></center></tr>`;
            $('#tabla-vehiculos tbody').html(rows);
        }
    }

    agregarEventoEliminar(){
        let App = this;
        $(".btn-delete").click(function(e){
            e.preventDefault();
            let data = {
               id: $(this).data('id')
            };
            App.peticion.set({ parametros: data });
            App.peticion.post(`vehiculos/eliminar`, function(){
                new Vehiculos_catalogo();
            }, function(){});
            return false;
        })
        
    }
}

new Vehiculos_catalogo();