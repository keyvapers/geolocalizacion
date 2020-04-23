declare var Load:any;
interface JQueryStatic{
	active: number
}
type ajaxResult	= {
	status		:boolean;
	error		:string;
	message		:string;
	success		?:boolean;
	data		:any;
	total		:number;
}
type t_Loading={
	color		?:string,
	ancho		?:number,
	contenedor	?:string,
	onComplete	?:any
 }
class Loading {
	_color			:string;
	_ancho			:number;
	_contenedor		:string;
	_progress		:number;
	constructor(Prop?:t_Loading) {
		!Prop?				Prop = {}			:	'';
		this._color			= Prop.color		|| '#0080FF';
		this._ancho			= Prop.ancho		||	3;
		this._contenedor	= Prop.contenedor	||	'body';
		this._progress		= 0;
		this.init();
	 }
	get contenedor(){
		return $(this._contenedor);
	 }
	get Loading_html(){
		let html=`<div class="Loading"><div class="Progress"></div><div class="LoadingBg"></div></div>`;
		return html;
	 }
	init(){
		let App=this;
		$(document).ajaxStart(()=>{
			App.progress(0);
		 });
		$(document).ajaxComplete(()=>{
			App.autoProgress();
		 });
		if(!this.contenedor.find('.Loading')[0]){
			this.init_css();
			this.contenedor.append(this.Loading_html);
		 }
	 }
	autoProgress(){
		let activas		= $.active;
		let newProgress = 100 / activas;
		if(newProgress >= this._progress){
			this.progress(newProgress);
			this._progress = newProgress;
		}
	 }
	progress(progress:number){
		$('.Progress').animate({width:progress+'%'},200);
		if(progress == 100){
			$('.Loading').delay(800).fadeOut(400,function(){
				$('.Progress').width(0);
				$('.LoadingBg').hide(0);
			});
			this._progress	= 0;
		}else if (!$('.Loading').is(':visible')){
			$('.Loading').fadeIn(300);
		}
	 }
	init_css(){
		let css=`
			.Loading,.LoadingBg{
				position		: fixed;
				z-index			: 9999;
			 }
			.Loading{
				width			: 100%;
				top				: 0;
			 }
			.LoadingBg{
				display		: none;
				width			: 100%;
				height			: 100%;
				background		: rgba(255,255,255,0.7);
			 }
			.Progress{
				height			: ${this._ancho}px;
				width			: 0%;
				background-color: ${this._color};
				box-shadow		: 0 1px 10px #888888;
				border-radius	: 0 5px 5px 0;
			}`;
		let style:any	= document.createElement("style");
		style.type 		= 'text/css';
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	 }
 }
////////////
type Propiedades={
	url				?:string;
	webService		?:string;
	parametros		?:any;
	contentType		?:string|boolean;
	processData		?:boolean;
	token			?:string;
 }
type t_ajax={
	url				:string;
	type			:string;
	data			:string|object;
	dataType		:string;
	headers			?:string;
	contentType		?:string;
 }
class Peticion{
	_url			:string;
	_api			:string;
	_parametros		:any;
	_contentType	:string|boolean;
	_ajax			:any;
	notificacion	:any;
	_token			:string;
	_metodo			:string;
	_processData	:boolean;
	Loading		:any;
	constructor(propiedades: Propiedades){
		this._url			= propiedades.url			|| '';
		this._api			= propiedades.webService	|| '';
		this._parametros	= propiedades.parametros	|| '';
		this._contentType	= propiedades.contentType	|| 'application/x-www-form-urlencoded';
		this._processData	= propiedades.processData	|| true;
		this._ajax			= "";
		this._metodo		= 'post';
		// this.notificacion	= new Notificacion();
		this._token			= propiedades.token			|| '';
	 }
	set(p: Propiedades){
		this._url			= p.url			|| this._url;
		this._api			= p.webService	|| this._api;
		this._parametros	= p.parametros	|| this._parametros;
		this._token			= p.token		|| this._token;
		this._contentType	= p.contentType	|| this._contentType;
		this._processData	= p.processData	|| this._processData;
	 }
	set data(data:any){
		this._parametros=data;
	}
	get ajax(){
		return this._ajax;
	 }
	abort() {
		if (this._ajax)
			this._ajax.abort('User abort.');
	 }
	put(api:string,callback:Function){
		this._metodo	= 'put';
		this._api		= api;
		this._do(callback);
	 }
	post(api:string,callback:Function){
		this._metodo	= 'post';
		this._api		= api;
		this._do(callback);
	 }
	get(api:string,callback:Function){
		this._metodo	= 'get';
		this._api		= api;
		this._do(callback);
	 }
	delete(api:string,callback:Function){
		this._metodo	= 'delete';
		this._api		= api;
		this._do(callback);
	 }
	_do(callback:Function){
	 	// if(this._api)
	 		// this._api = "/"+this._api;
		//let App		= this;
	 	let Ajax:any={
			url			: this._url+this._api,
			type		: this._metodo,
		 	data		: this._parametros,
		 	dataType	: 'JSON',
		 	headers		: {token:this._token},
		 	processData	: this._processData
		 }
		this._parametros='';
		if(this._contentType)
			Ajax.contentType=this._contentType;
		this._ajax=$.ajax(Ajax)
		.done((result:ajaxResult)=>{
				// if (!result)
					// result = { success: false }
				if (callback)
					callback(result);
			})
		.fail((jqXHR:any)=>{
			let result	= jqXHR.responseJSON	|| {};
			if(result.data)
				if(result.data.message	==	"Parámetros incorrectos."){
					let data	= result.data.data;
					if (callback)
						callback(data);
					return ;
				}
			if (callback)
				callback(result);
		 })
		.always(()=>{ });
	 }

 }