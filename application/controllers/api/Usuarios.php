<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Usuarios extends RestController {
    
    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function listar_get(){
        $this->db->select('usuario.id,usuario.username,tipo_usuario.tipo');
        $this->db->from('usuario');
        $this->db->join('tipo_usuario', 'tipo_usuario.id = usuario.tipo_usuario_id');
        $query = $this->db->get()->result();

        $this->response( [
            'data' => $query
        ], 200 );
    }

    public function tipos_get(){
        $this->db->select('*');
        $this->db->from('tipo_usuario');
        $query = $this->db->get()->result();

        $this->response( [
            'data' => $query
        ], 200 );
    }

    public function agregar_post(){
        $data = $this->post();
        $this->db->insert('usuario', $data);
        $usuario_id = $this->db->insert_id();

        $this->response( [
            'data' => $usuario_id
        ], 200 );
    }

    public function obtener_get(){
        $id = $this->get('id');
        $this->db->select('id,username,tipo_usuario_id');
        $this->db->from('usuario');
        $this->db->where('usuario.id',$id);
        $query = $this->db->get()->row();
        if($query != null)
            $this->response( [
                'data' => $query
            ], 200 );
        else
            $this->response( [
                'error' => 'No encontrado'
            ], 500 );
    }

    public function editar_post(){
        $data = $this->post();
        $id = $data['id'];
        array_pop($data);
        if(isset($data['confirm_password']))
            array_pop($data);

        $this->db->where('id', $id);
        $this->db->update('usuario', $data);

        if($this->db->affected_rows()>0)
            $this->response( [
                'data' => $id
            ], 200 );
        else
            $this->response( [
                'error' => 'Error al actualizar'
            ], 500 );
    }

    public function eliminar_post(){
        $id = $this->post('id');

        $this->db->where('usuario_id', $id);
        $this->db->delete('vehiculo_usuario');

        $this->db->where('id', $id);
        $this->db->delete('usuario');

        if($this->db->affected_rows()>0)
            $this->response( [
                'data' => $id
            ], 200 );
        else
            $this->response( [
                'error' => 'Error al eliminar'
            ], 500 );
    }
}