<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Login extends RestController {
    function __construct()
    {
        parent::__construct();
    }

    public function signin_post(){
        $username = $this->post( 'username' );
        $password = $this->post( 'password' );

        $this->db->select('id,tipoUsuario,username');
        $this->db->from('usuario');
        $this->db->where('username', $username);
        $this->db->where('password', $password);
        $query = $this->db->get()->row();

        if($query != null)
            $this->response( [
                'status' => true,
                'data' => $query
            ], 200 );
        else
            $this->response( [
                'status' => false,
                'error' => 'Usuario o contraseña incorrectos'
            ], 500 );
    }

   
}