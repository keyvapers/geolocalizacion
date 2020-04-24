<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title><?php echo $title? $title.' - ' :''; ?>Prueba</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo base_url('src/css/bootstrap/bootstrap.min.css')?>">
    <link rel="stylesheet" href="<?php echo base_url('src/css/mdi/materialdesignicons.min.css')?>">
    <link rel="stylesheet" href="<?php echo base_url('src/css/main.css')?>">
    <?php
        if($css)
            foreach ($css as $url) {
                $url    = base_url("src/css/$url.css");
                echo "<link rel='stylesheet' href='$url'>";
            }
    ?>
</head>
<body>
<header>
    <div id="menu-mobile">
        <nav>
            <ul>
                <li>
                    <a href="<?php echo base_url('Vehiculos')?>">Vehículos</a>
                </li>
                <li>
                    <a href="<?php echo base_url('Vehiculos/Rastrear')?>">Rastrear</a>
                </li>
                <li>
                    <a href="<?php echo base_url('Login/logout')?>">Salir</a>
                </li>
            </ul>
        </nav>
    </div>
    <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="#" id="menu-username"><?php echo $this->session->userdata('username')?></a>
        <button id="btn-menu-mobile">
            <i class="mdi mdi-menu"></i>
        </button>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="<?php echo base_url('Vehiculos')?>" id="vehiculosLinkMenu">
                        Vehículos
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?php echo base_url('Vehiculos/Rastrear')?>">Rastrear</a>
                </li>
                <?php if($this->session->userdata('tipoUsuario') == tiposUsuarios::Admin){ ?>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo base_url('Usuarios')?>">Usuarios</a>
                    </li>
                <?php } ?>
            </ul> 
        </div> 
        <a class="navbar-brand hide-mobile" href="<?php echo base_url('Login/logout')?>" id="menu-salir">Salir</a>       
    </nav>
</header>