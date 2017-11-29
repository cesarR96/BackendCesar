<?php


//obtengo los parametros de llenar.php 
  function getData($ciudad, $tipo, $precio){
   //busco el archivo json
    $data = file_get_contents("../data-1.json");
    $products = json_decode($data, true);
    
 // obteniendo la lista del json realizo un array serach para ver si el para parametro existe de ser haci  me imprimira los datos los cuales seran enviados al ajax para cargarse
    foreach ($products as $product) {
       if (array_search($ciudad,  $products) == $ciudad && array_search($tipo,  $products) == $tipo && array_search($precio,  $products) >= $precio) {
       	//imprimo los datos 
         print_r($product);       
       }
      }
  }







?>