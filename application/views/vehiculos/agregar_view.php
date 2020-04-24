<div class="modal-header">
    <h5 class="modal-title">Nuevo Vehículo</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="modal-body">
    <form id="frm-vehiculo">
        <div class="form-row">
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Placas</label>
                    <input type="text" class="form-control" maxlength="9" name="placas" required>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Marca</label>
                    <input type="text" class="form-control" maxlength="10" name="marca" required>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Color</label>
                    <input type="text" class="form-control" maxlength="10" name="color" required>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Modelo</label>
                    <input type="text" class="form-control" maxlength="10" name="modelo" required>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Usuario</label>
                    <select  class="form-control" name="usuario_id" id="select-usuario">
                    </select>
                </div>
            </div>
        </div>

    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-primary btn-sm" id="guardar-valor" data-dismiss="modal">Guardar</button>
    <button type="button" class="btn btn-light btn-sm" data-dismiss="modal">Cancelar</button>
</div>
<?php if(isset ($id)) {?>
    <script src="<?php echo base_url('src/js/vehiculos_editar.js')?>"></script>
    <script>
        new Vehiculos_editar(<?php echo $id ?>);
    </script>
<?php }else{?>
    <script src="<?php echo base_url('src/js/vehiculos_agregar.js')?>"></script>
<?php } ?>
