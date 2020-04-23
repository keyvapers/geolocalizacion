<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_agrega_usuarios extends CI_Migration {

        public function up()
        {
            $data = array(
                array(
                    'username' => 'admin',
                    'password' => 'admin',
                    'tipoUsuario' => 'admin'
                ),
                array(
                    'username' => 'cliente',
                    'password' => 'cliente',
                    'tipoUsuario' => 'cliente'
                )
            );
        
            $this->db->insert_batch('Usuario', $data);  
        }

        public function down()
        {
            $this->db->empty_table('Usuario');
        }
}