<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Login extends RestController {
    function __construct()
    {
        parent::__construct();
    }

    public function prueba_get()
    {
        $this->response( 'hola', 200 );
    }
}