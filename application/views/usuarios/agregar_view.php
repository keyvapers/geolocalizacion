<div class="modal-header">
    <h5 class="modal-title">Nuevo Usuario</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="modal-body">
    <form id="frm-usuario">
        <div class="form-row">
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" maxlength="10" name="username" autocomplete="off" required>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Tipo Usuario</label>
                    <select  class="form-control" name="tipo_usuario_id" id="select-tipo">
                    </select>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" class="form-control" maxlength="30" name="password" id="password" autocomplete="off" required>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Confirmar Contraseña</label>
                    <input type="password" class="form-control" maxlength="30" name="confirm_password" autocomplete="off" required>
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
    <script src="<?php echo base_url('src/js/usuarios_editar.js')?>"></script>
    <script>
        new Usuarios_editar(<?php echo $id ?>);
    </script>
<?php }else{?>
    <script src="<?php echo base_url('src/js/usuarios_agregar.js')?>"></script>
<?php } ?>
