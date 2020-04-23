<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_tabla_vehiculo extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'id' => array(
                                'type' => 'INT',
                                'constraint' => 5,
                                'unsigned' => TRUE,
                                'auto_increment' => TRUE
                        ),
                        'placas' => array(
                                'type' => 'VARCHAR',
                                'constraint' => '9',
                                'null' => FALSE,
                        ),
                        'marca' => array(
                                'type' => 'VARCHAR',
                                'constraint' => '10',
                                'null' => FALSE,
                        ),
                        'color' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '10',
                            'null' => FALSE,
                        ),
                        'modelo' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '10',
                            'null' => FALSE,
                        ),
                        'lat' => array(
                            'type' => 'DECIMAL(6,6)',
                            'unsigned' => FALSE,
                            'null' => FALSE,
                        ),
                        'lng' => array(
                            'type' => 'DECIMAL(6,6)',
                            'unsigned' => FALSE,
                            'null' => FALSE,
                        ),
                        'usuario' => array(
                            'type' => 'INT',
                            'unsigned' => FALSE,
                            'null' => FALSE,
                        )

                ));
                $this->dbforge->add_key('id', TRUE);
                $this->dbforge->create_table('Vehiculo');
        }

        public function down()
        {
                $this->dbforge->drop_table('Vehiculo');
        }
}