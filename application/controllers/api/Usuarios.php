<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Usuarios extends RestController {
    
    function __construct()
    {
        parent::__construct();
    }

    public function listar_get(){
        $this->db->select('id,username');
        $this->db->from('usuario');
        $query = $this->db->get()->result();

        $this->response( [
            'data' => $query
        ], 200 );
    }

}