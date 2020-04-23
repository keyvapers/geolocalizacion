declare function sha1(st:any):string;
class Login{
    peticion:Peticion
    constructor(){
        this.peticion = new Peticion({url: this.url_api});
        this.inicializar();
    }

    get url_api(){
        return localStorage.getItem('url_api') || '';
    }

    inicializar(){
        let App = this;
        $('#frm-login').submit(function(e){
            e.preventDefault();
            let usuario = String($(this).find('input[name=login-user]').val());
            let pass    = String($(this).find('input[name=login-pass]').val());
            App.doLogin(usuario,sha1(pass));
        });
    }

    doLogin(username: string, password:string){
        let App             = this;
        this.peticion.data  = {username,password};
        $('#btn-login').prop('disabled',true).addClass('loading');
        this.peticion.post('login/signin',function(result:any){
            if(result.status){
                App.init(result.data);
            }else{
                $('#login-message span').html(result.error).finish().fadeIn(300).delay(3000).fadeOut();
                $('#btn-login').prop('disabled', false).removeClass('loading');
            }
        });
    }

    init(parametros:any){
        console.log("creando session");
        let url      = sessionStorage.getItem('baseUrl')+ 'Login/success';
        let peticion = new Peticion({url:'',parametros});
        peticion.post(url,function(){
			location.reload();
        });
    }
}
new Login();