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
    <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="#" id="menu-username"><?php echo $this->session->userdata('username')?></a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="vehiculosLinkMenu" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Vehículos
                    </a>
                    <div class="dropdown-menu" aria-labelledby="vehiculosLinkMenu">
                        <a class="dropdown-item" href="#">Administrar</a>
                        <a class="dropdown-item" href="#">Rastrear</a>
                    </div>
                </li>
            </ul> 
        </div> 
        <a class="navbar-brand" href="#" id="menu-salir">Salir</a>       
    </nav>
</header>