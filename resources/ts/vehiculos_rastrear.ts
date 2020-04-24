type marker_vehiculo = {
    id      : number;
    marker  : marker;
}

class Vehiculos_rastrear{
    mapa : any;
    peticion: Peticion;
    markers: marker_vehiculo[];
    constructor(){
        this.peticion = new Peticion({url: this.url_api});
        this.markers = [];
        this.inicializar();
    }

    get url_api(){
        return localStorage.getItem('url_api') || '';
    }

    get apiKey(){
        return 'AIzaSyA66nkR3Bf-4_DUEH0dZ0WZloP3BecjTdo';
    }

    get user(){
        return JSON.parse(sessionStorage.userData);  
    }

    inicializar(){
        this.crearMapa();
        this.listener();
    }

    crearMapa(){
        let App = this;
        var mapConfig={
            idMapa: "map",
            apiKey: this.apiKey
            }
        var opciones={
            lat:19.2439524,
            lng:-103.7266729,
            zoom:14.0
            }
        new Mapa(mapConfig, opciones).ready(function(Mapa:Mapa){
            App.mapa = Mapa;
            App.getVehiculos();
        });
    }

    listener(){
        let App = this;
        Pusher.logToConsole = false;

        var pusher = new Pusher('4d141fc651ae0778d77c', {
        cluster: 'us2',
        forceTLS: true
        });
    
        var channel = pusher.subscribe('geolocalizacion');
        channel.bind('actualizacion', function(data:any) {
            App.actualizarMarker(data);
        });
    }

    getVehiculos(){
        let App = this;
        this.peticion.get(`vehiculos/listar?userId=${this.user.userId}`, function(result:any){
            if(result.data != null)
                App.agregarMarkers(result.data);
        }, function(){});
    }

    agregarMarkers(vehiculos :vehiculo[]){
        vehiculos.map(ve => {
            if(ve.lat != null && ve.lng != null){
                let markOpt: marker = {} ;
                markOpt.lat = ve.lat;
                markOpt.lng = ve.lng;
                markOpt.titulo = ve.placas;
                markOpt.label = true;
                markOpt.labelContent = `${ve.placas}`;
                markOpt.id = ve.id;
                let marker = this.mapa.agregarMarcador(markOpt);
                let markerV :marker_vehiculo = {
                    id:     ve.id,
                    marker: marker
                };
                this.markers.push(markerV);
            }
        });
    }

    actualizarMarker(ve:vehiculo){
        this.mapa.actualizarPosicionMarker(ve.id, ve.lat, ve.lng); 
    }
}

new Vehiculos_rastrear();