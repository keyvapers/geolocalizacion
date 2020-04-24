<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Vehiculos extends RestController {
    
    function __construct()
    {
        parent::__construct();
    }

    public function listar_get(){
        $userId = $this->get( 'userId',TRUE );
        $tipoAdmin = tiposUsuarios::Admin;
        $tipoCliente = tiposUsuarios::Cliente;
        
        $this->db->select('tipo_usuario_id');
        $this->db->from('usuario');
        $this->db->where('usuario.id',$userId);
        $query = $this->db->get()->row();

        if($query != null){
            switch($query->tipo_usuario_id){
                case $tipoAdmin:
                    $this->db->select('vehiculo.*, usuario.username');
                    $this->db->from('vehiculo');
                    $this->db->join('vehiculo_usuario', 'vehiculo_usuario.vehiculo_id = vehiculo.id');
                    $this->db->join('usuario', 'usuario.id = vehiculo_usuario.usuario_id');
                    $query = $this->db->get()->result();
                break;
                case $tipoCliente:
                    $this->db->select('vehiculo.*, usuario.username');
                    $this->db->from('vehiculo');
                    $this->db->join('vehiculo_usuario', 'vehiculo_usuario.vehiculo_id = vehiculo.id');
                    $this->db->join('usuario', 'usuario.id = vehiculo_usuario.usuario_id');
                    $this->db->where('vehiculo_usuario.usuario_id', $userId);
                    $query = $this->db->get()->result();
                break;
            }

            $this->response( [
                'data' => $query
            ], 200 );
        }else
            $this->response( [
                'error' => 'Usuario no encontrado'
            ], 200 );
        
    }

    public function agregar_post(){
        $data = $this->post();
        $usuario_id = $data['usuario_id'];
        array_pop($data);
        $this->db->insert('vehiculo', $data);
        $vehiculo_id = $this->db->insert_id();
        $usuario_vehiculo = array(
            'usuario_id' => $usuario_id,
            'vehiculo_id' => $vehiculo_id
        );
        $this->db->insert('vehiculo_usuario', $usuario_vehiculo);

        $this->response( [
            'data' => $vehiculo_id
        ], 200 );
    }

    public function obtener_get(){
        $id = $this->get('id');
        $this->db->select('*');
        $this->db->from('vehiculo');
        $this->db->join('vehiculo_usuario', 'vehiculo_usuario.vehiculo_id = vehiculo.id');
        $this->db->where('vehiculo.id',$id);
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
        array_pop($data);

        $this->db->where('id', $id);
        $this->db->update('vehiculo', $data);

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

        $this->db->where('vehiculo_id', $id);
        $this->db->delete('vehiculo_usuario');

        $this->db->where('id', $id);
        $this->db->delete('vehiculo');

        if($this->db->affected_rows()>0)
            $this->response( [
                'data' => $id
            ], 200 );
        else
            $this->response( [
                'error' => 'Error al eliminar'
            ], 500 );
    }


    public function posicion_post(){
        $lat = $this->post('lat');
        $lng = $this->post('lng');
        $id  = $this->post('id');

        $vehiculo = array(
            'lat' => $lat,
            'lng' => $lng
        );

        $this->db->where('id', $id);
        $this->db->update('vehiculo', $vehiculo);

        if($this->db->affected_rows()>0){
            $options = array(
            'cluster' => 'us2',
            'useTLS' => true
            );
            $pusher = new Pusher\Pusher(
            '4d141fc651ae0778d77c',
            '6e28fe457a33f1760ffb',
            '987593',
            $options
            );
        
            $data['lat'] = $lat;
            $data['lng'] = $lng;
            $data['id'] = $id;
            $pusher->trigger('geolocalizacion', 'actualizacion', $data);
            $this->response( [
                'message' => 'Actualizado con éxito'
            ], 200 );
        }  
        else
            $this->response( [
                'error' => 'Error al actualizar'
            ], 500 );
    }


   
}