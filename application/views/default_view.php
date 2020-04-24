<?php $this->load->view('partials/header_view',array('css'=>@$load['css'],'title'=>@$title)); ?>
<div id="main">
    <div class="container">
        <?php
            if(!@$data)
                $data=[];
            if($pagina!='')
                $this->load->view($pagina,$data); 
            else
                echo '<center>Página no encontrada</center>';
        ?>
    </div>
</div>
<?php $this->load->view('partials/footer_view',array('js'=>@$load['js']));?>