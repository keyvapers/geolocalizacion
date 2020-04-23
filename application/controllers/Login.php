<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct(){
		parent::__construct();
    }
     
	public function index()
	{
        if($this->session->userdata('userId')){
            redirect(base_url('Welcome'),'refresh');   
          }
		$this->load->view('login_view');
    }
    
    public function success()
    {
        $data  = $this->input->post();
        $data = array(
            'userId' => $this->input->post('id'),
            'username' => $this->input->post('username'),
            'tipoUsuario' => $this->input->post('tipoUsuario')
        );
        $this->session->set_userdata( $data );
    }

    public function logout(){
        $this->session->sess_destroy();
        echo "<script>localStorage.clear();
				sessionStorage.clear();
				window.location='".base_url()."'</script>";
    }
}