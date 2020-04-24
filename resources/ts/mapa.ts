type mapConfig = {
	idMapa			:	string;
	apiKey			?:	string;
	cargarMaps		?:	boolean;
}

type opcionesDelMapa = {
	lat						?: number;
	lng						?: number;
	zoom					?: number;
	zoomCtr					?: boolean;
	ui						?: boolean;
	tipoCtr					?: boolean;
	streetView				?: boolean;
	latLng					?: google.maps.LatLng;
	style					?: google.maps.MapTypeStyle[];
	controles				?:any;
}

type latLngPoint = {
	lat :string;
	lng :string;
}

type marker = {
    id                      ?:number;
	lat						?:number;
	lng						?:number;
	latLng					?:any;
	arrastrable				?:boolean;
	urlIcon					?:string;
	titulo					?:string;
	mapa					?:any;
	mover					?:boolean;
	infoWindow				?:boolean;
	clickable				?:boolean;
	contenidoInfo			?:string;
	zIndex					?:number;
	optimized				?:boolean;
	log						?:boolean;
	label					?:boolean;
	labelContent			?:string;
}

type Infowindow = {
	marker				:any;
	contenido			:any;
	autoPan				?:any;
	clickable			?:any;
}

class Mapa{
    idMapa			: string;
	apiKey			?: string;
	mapa			: any;
	markerArray		: any[];
	zoom			: number;
	callback		: any;
	originalPosition: any;
	originalZoom	: number;
    controles		: any;
    
    constructor(mc:mapConfig,optMap?:opcionesDelMapa){
        this.idMapa			= '';
		this.mapa 			= null;
		this.markerArray 	= [];
		this.zoom 			= 10;
		this.originalZoom 	= this.zoom;
        this.callback 		= null;
        
        mc.cargarMaps	!==	false		? mc.cargarMaps=true 		: '';
        this.apiKey		= mc.apiKey;
        this.idMapa		= mc.idMapa;
        if (!window.google && mc.cargarMaps){
            this.cargaGoogleMaps(mc,optMap);
        }else if(optMap)
            this.iniciaMapa(optMap);
    }

    cargaGoogleMaps(mc:any,optMap:any){
		let apiKey='';
		if (mc.apiKey)
			apiKey='key='+mc.apiKey;
		this.loadScript('https://maps.googleapis.com/maps/api/js?'+apiKey,() => this.iniciaMapa(optMap));
		return 
    }
    
    loadScript(url:string,callback?:any){
		let script :any= document.createElement("script");
		script.type = "text/javascript";
		if (script.readyState)  //IE
			script.onreadystatechange =()=>{
				if (script.readyState == "loaded" ||
					script.readyState == "complete"){
						script.onreadystatechange = null;
						if(callback)
							callback();
					};
				};
		else  //Others
			script.onload =()=>{
				if(callback)
					callback();
			};
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    iniciaMapa(mpOpt:opcionesDelMapa={}){
	    !mpOpt.lat 			? mpOpt.lat 		= 19.2469	: "";
		!mpOpt.lng 	        ? mpOpt.lng 		= -103.7263	: "";
		!mpOpt.zoom 		? mpOpt.zoom 		= 10		: "";
		!mpOpt.zoomCtr 		? mpOpt.zoomCtr 	= true 		: ""; 
		!mpOpt.ui 			? mpOpt.ui 			= true 		: "";
		!mpOpt.tipoCtr    	? mpOpt.tipoCtr		= true 		: "";
		!mpOpt.streetView 	? mpOpt.streetView 	= true 		: "";
		!mpOpt.controles 	? mpOpt.controles 	= {}		: "";
		!mpOpt.latLng      	? mpOpt.latLng 		= new google.maps.LatLng(mpOpt.lat, mpOpt.lng):"";
		!mpOpt.style       	? mpOpt.style 		= [{featureType: "poi", "stylers": [{ "visibility": "off" }]}]:"";
		this.originalPosition 					= mpOpt.latLng;
		this.originalZoom 						= mpOpt.zoom;
		let controles:any=	{
							zoom		: {position:''},
							streetView	: {position:''},
							mapType		: {position:''}
						}
		controles.mapType.position		= mpOpt.controles.mapType		|| 'RIGHT_BOTTOM';
		controles.streetView.position	= mpOpt.controles.streetView	|| 'RIGHT_BOTTOM';
		controles.zoom.position			= mpOpt.controles.zoom			|| 'RIGHT_CENTER';
		let getPosition=(pos:any):number=>{
			let position:number;
			position=parseInt(google.maps.ControlPosition[pos]);
			return position ;
		 }
		let mapOptions: google.maps.MapOptions = {
			zoom					:	mpOpt.zoom,
			disableDefaultUI		:	mpOpt.ui,
			mapTypeControl			:	mpOpt.tipoCtr,
			mapTypeControlOptions	:	{
											position: getPosition(controles.mapType.position)
										 },
			streetViewControl		:	mpOpt.streetView,
			streetViewControlOptions: 	{
											position: getPosition(controles.streetView.position)
										 },
			zoomControl				: 	mpOpt.zoomCtr,
			zoomControlOptions		:	{
											style: google.maps.ZoomControlStyle.LARGE,
											position: getPosition(controles.zoom.position)
										 },
			center					:	mpOpt.latLng,
			styles					:	mpOpt.style
		};
		this.mapa=new google.maps.Map(document.getElementById(this.idMapa),mapOptions);
    }

    ready(callback:any){
		let App=this;
		let timer:any;
		if(window.google)
			callback(this);	
		else
			timer=setInterval(function(){
				if(window.google){
					clearInterval(timer);
					callback(App);	
				}
			},500);
    }

    agregarMarcador(markOpt:marker={}){
        !markOpt.id			    ? markOpt.id			= 0			        : '';
		!markOpt.lat			? markOpt.lat			= 19.2469			: '';
		!markOpt.lng			? markOpt.lng			= -103.7263			: '';
		!markOpt.latLng			? markOpt.latLng		= new google.maps.LatLng(markOpt.lat, markOpt.lng):'';
		!markOpt.arrastrable	? markOpt.arrastrable	= false				: '';
		!markOpt.urlIcon		? markOpt.urlIcon		= ''				: '';
		!markOpt.titulo			? markOpt.titulo		= "Marcador"		: '';
		!markOpt.mapa			? markOpt.mapa			= this.mapa			: '';
		!markOpt.mover			? markOpt.mover			= false				: '';
		!markOpt.clickable		? markOpt.clickable		= true				: '';
		!markOpt.infoWindow		? markOpt.infoWindow	= false				: '';
		!markOpt.contenidoInfo	? markOpt.contenidoInfo	= markOpt.titulo	: '';
		!markOpt.label 			? markOpt.label			= false				: '';
		!markOpt.labelContent 	? markOpt.labelContent	= markOpt.titulo	: '';
		!markOpt.zIndex			? markOpt.zIndex		= 1					: '';
		markOpt.log===undefined	? markOpt.log			= true				: '';
		markOpt.optimized ==undefined?markOpt.optimized	= true				: '';
		let opcionesMarca :any=	{
								position	: markOpt.latLng,
								icon		: markOpt.urlIcon,  
								title		: markOpt.titulo, 
								draggable	: markOpt.arrastrable,
								map			: markOpt.mapa,
								clickable	: markOpt.clickable,
								zIndex		: markOpt.zIndex,
                                optimized	: markOpt.optimized,
                                metadata    : markOpt.id
							 };
		if(markOpt.label)
			opcionesMarca.label={
				text: markOpt.labelContent
			}
		let marker:any = new google.maps.Marker(opcionesMarca);
		if(markOpt.mover){
			this.moverMapa({latLng:marker.getPosition()});
		 }
		marker.destacar=function(tiempo:number=2000){
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function(){
				marker.setAnimation(null);
			},tiempo);
		 }
		marker.close=function() {
			if(marker.infoWindow)
				marker.infoWindow.setMap(null);
			marker.setMap(null);
		 }.bind(marker);
		if(markOpt.infoWindow){
			marker.infoWindow=this.agregarInfoWindow({
														marker		: marker,
														contenido	: markOpt.contenidoInfo
			
													 });
			marker.open=function(contenido:string){
				if(contenido)
					markOpt.contenidoInfo=contenido;
				marker.infoWindow.setContent(markOpt.contenidoInfo);
				marker.infoWindow.open(markOpt.mapa,marker);
			 }
	    }
		if(markOpt.log)
            this.markerArray.push(marker);
		return marker;
    }
    
    moverMapa(moverOpt:any){
        !moverOpt.lat     ? moverOpt.lat	= 19.2469:"";
        !moverOpt.lng     ? moverOpt.lng	= -103.7263:"";
        !moverOpt.latLng  ? moverOpt.latLng	= this.latLng(moverOpt.lat, moverOpt.lng):"";
        this.mapa.panTo(moverOpt.latLng);
    }
    
    latLng(lat:number,lng:number){
		return new google.maps.LatLng(lat,lng);
    }
    
    agregarInfoWindow(infoWD:Infowindow){
        !infoWD.contenido  	?		infoWD.contenido 	= infoWD.marker.getTitle()	: 	'';
        !infoWD.autoPan 	?		infoWD.autoPan 		= false 					: 	'';
        !infoWD.clickable	?		infoWD.clickable	= true 						: 	'';
        let info = new google.maps.InfoWindow({
                                                disableAutoPan: infoWD.autoPan
                                                });
        if(infoWD.clickable){
            google.maps.event.addListener(infoWD.marker,"click", function() { 
                info.setContent(infoWD.contenido);
                info.open(infoWD.marker.getMap(),infoWD.marker); 
            });
        }
        return info;  

    }
    
    actualizarPosicionMarker(id:number, lat:number, lng:number){
        let marker = this.markerArray.find(m => m.metadata == id);
        let posicion = this.latLng(lat,lng);
        marker.setPosition(posicion);
	}
	
	ajustar(){
		let latlngbounds = new google.maps.LatLngBounds();
		this.markerArray.map(mk =>{
			latlngbounds.extend(mk.getPosition());
		});

		this.mapa.fitBounds(latlngbounds);
		this.mapa.setZoom((this.mapa.getZoom()));
	}
}