<?php 
    function validarSesion(){
        $CI =& get_instance();
        if(!$CI->session->userdata('userId')){
            echo $CI->load->view('login_view',[],true);
            die();
        }
     }