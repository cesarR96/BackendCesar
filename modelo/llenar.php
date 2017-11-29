<?php

require('funciones.php');

       $ciudad = $_POST['ciudad'];
       $tipo = $_POST['tipo'];
       $precio = $_POST['precio'];
     //obtengo los datos de ajax mediante el formdata que le envie y son recibidos en las variables con POST  , luego estas variables las agrego a la funsion las cuales son las que utilizare para validar

      getData($ciudad, $tipo,$precio);







?>