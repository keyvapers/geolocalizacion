</body>
<footer>
    <span>Keila Valdéz 2020</span>
    <script>
        sessionStorage.baseUrl      = '<?php echo base_url();?>';
        localStorage.url_api    = '<?php echo $this->config->item('api_url'); ?>';
    </script>
    <script src="<?php echo base_url('src/js/jquery-3.2.1.min.js')?>"></script>
    <script src="<?php echo base_url('src/js/bootstrap/bootstrap.min.js'); ?>"></script>
    <script src="<?php echo base_url('src/js/peticion.js')?>"></script>
    <?php 
        if($js)
            foreach ($js as $url) {
                $url    = base_url("src/js/$url.js");
                echo "<script src='$url'></script>";
            }
            $user	= [
                        "userId"    => $this->session->userdata('userId'),
                        "username"  => $this->session->userdata('username'),
                        "tipoUsuario"     => $this->session->userdata('tipoUsuario')
                    ];
    ?>
    <script>
        sessionStorage.userData 	= '<?php echo json_encode($user);?>';
        sessionStorage.baseUrl  	= '<?php echo base_url();?>';
        localStorage.url_api	= '<?php echo $this->config->item('api_url'); ?>';
    </script>
</footer>
</html>