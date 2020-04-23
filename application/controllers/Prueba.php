<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Prueba extends CI_Controller {
    public function index(){
        $this->load->view('welcome_message');
        
    }

    public function Peticion(){
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
        
          $data['message'] = 'hello world';
          $pusher->trigger('my-channel', 'my-event', $data);
    }
}