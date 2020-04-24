type usuario = {
    id                  :number;
    username            :string;
    tipo_usuario_id     :number;
    tipo                :string;
}

class Usuarios_catalogo {
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

    inicializar(){
        this.getUsuarios();
    }

    getUsuarios(){
        let App = this;
        this.peticion.get(`usuarios/listar`, function(result:any){
            if(result.data != null)
                App.generarTabla(result.data);
        }, function(){});
    }

    generarTabla(usuarios: usuario[]){
        var rows = ``;
        if(usuarios.length > 0){
            usuarios.map(u => {
                rows += `<tr>
                            <td class="hide-sm">${u.id}</td>
                            <td>${u.username}</td>
                            <td  class="hide-sm">${u.tipo}</td>
                            <td class="tabla-acciones">
                                <a class="btn btn-primary btn-edit modal-link" href="${this.base_url}Usuarios/editar/${u.id}"><i class="mdi mdi-pencil"></i></a>
                                <button class="btn btn-primary btn-delete" data-id="${u.id}"><i class="mdi mdi-delete"></i></button>
                            </td>`;
                rows += `</tr>`;
            });
            $("#tabla-usuarios tbody").html(rows);
            this.agregarEventoEliminar();

        }else{
            rows += `<tr><td colspan="4"><center>No hay elementos</td></center></tr>`;
            $('#tabla-usuarios tbody').html(rows);
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
            App.peticion.post(`Usuarios/eliminar`, function(){
                new Usuarios_catalogo();
            }, function(){});
            return false;
        })
        
    }

}
new Usuarios_catalogo();