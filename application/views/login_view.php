<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>Login - Prueba</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo base_url('src/css/bootstrap/bootstrap.min.css')?>">
    <link rel="stylesheet" href="<?php echo base_url('src/css/login.css')?>">
    <link rel="stylesheet" href="<?php echo base_url('src/css/mdi/materialdesignicons.min.css')?>">
</head>
<body>
<div class="container">
    <div id="login-container">
        <form id="frm-login">
            <div class="form-group">
                <label for="login-user">Usuario</label>
                <input type="text" name="login-user" class="form-control" placeholder="Usuario" required>
            </div>
            <div class="form-group">
                <label for="login-pass">Contraseña</label>
                <input type="password" name="login-pass" class="form-control" placeholder="Contraseña" autocomplete="off" required>
                <small id="login-message" class="text-mutedX text-danger"><span>Usuario o Contraseña incorrectos</span></small>
            </div>
            <div class="form-group">
                <button class="btn btn-dark" name="login" id="btn-login">Iniciar Sesión</button>
            </div>
        </form>
    </div>
</div>
</body>
<footer>
    <script>
        sessionStorage.baseUrl      = '<?php echo base_url();?>';
        localStorage.url_api    = '<?php echo $this->config->item('api_url'); ?>';
    </script>
    <script src="<?php echo base_url('src/js/jquery-3.2.1.min.js')?>"></script>
    <script src="<?php echo base_url('src/js/sha1.js')?>"></script>
    <script src="<?php echo base_url('src/js/peticion.js')?>"></script>
    <script src="<?php echo base_url('src/js/login.js')?>"></script>
</footer>
</html>