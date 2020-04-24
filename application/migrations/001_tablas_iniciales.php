<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_tablas_iniciales extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'id' => array(
                                'type' => 'INT',
                                'unsigned' => TRUE,
                                'auto_increment' => TRUE
                        ),
                        'tipo' => array(
                                'type' => 'VARCHAR',
                                'constraint' => '10',
                                'null' => FALSE,
                        )
                ));
                $this->dbforge->add_key('id', TRUE);
                $this->dbforge->create_table('tipo_usuario');

                $this->dbforge->add_field(array(
                        'id' => array(
                                'type' => 'BIGINT',
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
                        'tipo_usuario_id' => array(
                                'type' => 'INT',
                                'unsigned' => TRUE,
                                'null' => FALSE
                        )     
                ));
                $this->dbforge->add_key('id', TRUE);
                $this->dbforge->create_table('usuario');

                $this->dbforge->add_field(array(
                        'id' => array(
                                'type' => 'BIGINT',
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
                            'type' => 'VARCHAR',
                            'constraint' => '15',
                            'null' => TRUE,
                        ),
                        'lng' => array(
                            'type' => 'VARCHAR',
                            'constraint' => '15',
                            'null' => TRUE,
                        )
                ));
    
                $this->dbforge->add_key('id', TRUE);
                $this->dbforge->create_table('vehiculo');

                $this->dbforge->add_field(array(
                        'vehiculo_id' => array(
                                'type' => 'BIGINT',
                                'unsigned' => TRUE,
                                'null' => FALSE

                        ),
                        'usuario_id' => array(
                                'type' => 'BIGINT',
                                'unsigned' => TRUE,
                                'null' => FALSE
                        )
                ));
                $this->dbforge->add_key(array('vehiculo_id','usuario_id'));
                $this->dbforge->create_table('vehiculo_usuario');
                     
                $this->dbforge->add_column('usuario', "CONSTRAINT fk_usuario_tipo_usuario FOREIGN KEY (`tipo_usuario_id`) REFERENCES tipo_usuario(`id`) ON DELETE RESTRICT ON UPDATE CASCADE");
                $this->dbforge->add_column('vehiculo_usuario', "CONSTRAINT fk_vehiculo_usuario_vehiculo FOREIGN KEY (`vehiculo_id`) REFERENCES vehiculo(`id`) ON DELETE RESTRICT ON UPDATE CASCADE");
                $this->dbforge->add_column('vehiculo_usuario', "CONSTRAINT fk_vehiculo_usuario_usuario FOREIGN KEY (`usuario_id`) REFERENCES usuario(`id`) ON DELETE RESTRICT ON UPDATE CASCADE");
                
                $data = array(
                        array(
                            'tipo' => 'admin'
                        ),
                        array(
                            'tipo' => 'cliente'
                        )
                    );

                $this->db->insert_batch('tipo_usuario', $data);

                $data = array(
                        array(
                            'username' => 'admin',
                            'password' => 'd033e22ae348aeb5660fc2140aec35850c4da997',
                            'tipo_usuario_id' => 1
                        ),
                        array(
                            'username' => 'cliente',
                            'password' => 'd94019fd760a71edf11844bb5c601a4de95aacaf',
                            'tipo_usuario_id' => 2
                        )
                    );
                
                $this->db->insert_batch('usuario', $data); 
        
        }

        public function down()
        {
                $this->dbforge->drop_table('tipo_usuario');
                $this->dbforge->drop_table('vehiculo_usuario');
                $this->dbforge->drop_table('usuario');
                $this->dbforge->drop_table('vehiculo');
                
        }
}