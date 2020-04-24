<div class="row">
    <div class="titulo-seccion col-12" >
        <span>Vehículos</span>
    </div>
</div>
<div class="row barra-acciones">
    <div class="col-12">
        <?php if($this->session->userdata('tipoUsuario') == tiposUsuarios::Admin){ ?>
            <a class="btn btn-primary modal-link" href="<?php echo base_url('Vehiculos/Agregar');?>">Agregar</a>
        <?php } ?>
    </div>
</div>
<div class="row">
    <div class="col-12">
        <table class="table table-bordered table-stripped" id="tabla-vehiculos">
            <thead>
                <tr>
                    <th class="hide-sm">Id</th>
                    <th>Placas</th>
                    <th class="hide-sm">Marca</th>
                    <th class="hide-m hide-sm">Color</th>
                    <th class="hide-sm">Modelo</th>
                    <?php if($this->session->userdata('tipoUsuario') == tiposUsuarios::Admin){ ?>
                        <th class="hide-m hide-sm">Usuario</th>
                        <th></th>
                    <?php } ?>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        
        </table>
    </div>
</div>

