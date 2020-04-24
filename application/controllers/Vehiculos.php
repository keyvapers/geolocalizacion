<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Vehiculos extends CI_Controller {

    public function __construct(){
        parent::__construct();
        validarSesion();
    }

    public function index(){
        /*$js = ;
        switch($this->session->userdata('tipoUsuario')){
            case tiposUsuarios::Admin:
                $js->push('vehiculos_agregar');
            break;
        }*/
        $this->load->view('default_view',array('pagina'=>'vehiculos/index_view',
            'title'=>'Vehiculos',
            'load' => [
                'js'=>['datatable/jquery.dataTable.min','vehiculos_catalogo'],
                'css'=>['datatable/jquery.dataTable.min']
            ]
        ), FALSE);
        
    }

    public function agregar(){
        $this->load->view('vehiculos/agregar_view');
    }

    public function editar($id){
        $this->load->view('vehiculos/agregar_view', array(
            'id' => $id
        ));
    }

    public function rastrear(){
        $this->load->view('default_view',array('pagina'=>'vehiculos/rastrear_view',
        'title'=>'Rastrear',
        'load' => [
            'js'=>['mapa','pusher/pusher.min','vehiculos_rastrear'],
            'css'=>['mapa']
        ]
    ), FALSE);
    }
}