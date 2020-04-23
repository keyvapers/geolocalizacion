<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_agrega_usuarios extends CI_Migration {

        public function up()
        {
            $data = array(
                array(
                    'username' => 'admin',
                    'password' => 'd033e22ae348aeb5660fc2140aec35850c4da997',
                    'tipoUsuario' => 'admin'
                ),
                array(
                    'username' => 'cliente',
                    'password' => 'd94019fd760a71edf11844bb5c601a4de95aacaf',
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