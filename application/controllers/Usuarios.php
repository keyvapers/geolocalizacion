<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuarios extends CI_Controller {

    public function __construct(){
        parent::__construct();
        validarSesion();
    }

    public function index(){
        if($this->session->userdata('tipoUsuario') == tiposUsuarios::Admin){
            $this->load->view('default_view',array('pagina'=>'usuarios/index_view',
                'title'=>'Usuarios',
                'load' => [
                    'js'=>['datatable/jquery.dataTable.min','usuarios_catalogo','sha1'],
                    'css'=>['datatable/jquery.dataTable.min','usuarios']
                ]
            ), FALSE);
        }else{
            redirect(base_url('Vehiculos'),'refresh');
        } 
    }

    public function agregar(){
        $this->load->view('usuarios/agregar_view');
    }

    public function editar($id){
        $this->load->view('usuarios/agregar_view', array(
            'id' => $id
        ));
    }
}