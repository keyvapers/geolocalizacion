<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_tabla_usuario extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'id' => array(
                                'type' => 'INT',
                                'constraint' => 5,
                                'unsigned' => TRUE,
                                'auto_increment' => TRUE
                        ),
                        'username' => array(
                                'type' => 'VARCHAR',
                                'constraint' => '10',
                                'null' => FALSE,
                        ),
                        'password' => array(
                                'type' => 'VARCHAR',
                                'constraint' => '256',
                                'null' => FALSE,
                        ),
                        'tipoUsuario' => array(
                                'type' => 'VARCHAR',
                                'constraint' => '10',
                                'null' => FALSE
                        )
                ));
                $this->dbforge->add_key('id', TRUE);
                $this->dbforge->create_table('Usuario');
        }

        public function down()
        {
                $this->dbforge->drop_table('Usuario');
        }
}