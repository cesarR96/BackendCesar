/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}





//cesar examen  next u


//llamo una funsion en el body con onload y cargo los drowdom list
function listar(){
//funsiones a llenar combobox
  tipo();
  ciudad();
  inicializarSlider();
  playVideoOnScroll();

}

//primera funsion cargo todo los datos del primer boton que dice llenar todos los campos
function cargar(){

        $.ajax({
                url:   'data-1.json', 
                type:  'post', 
                dataType: "json",
                success:  function (data) {
                console.log(data)
                var obj = data
                var employee = '';
                $.each(obj, function(key, value) {
                employee += '<div >';
                employee += ' <img src="img/home.jpg" width="200px" height="200px">';
                employee += '</div>';
                employee += '<div>';
                employee += '<p>' + value.Id + '</p>';
                employee += '<p>' + value.Direccion + '</p>';
                employee += '<p>' + value.Ciudad + '</p>';
                employee += '<p>' + value.Telefono + '</p>';
                employee += '<p>' + value.Codigo + '</p>';
                employee += '<p>' + value.Tipo + '</p>';
                employee += '<p>' + value.Precio + '</p>';
                employee += '<p ><a>Ver mas<a/></p>';
                employee += '</div>';
                  
                console.log(value.Id)
              });
                   $("#ok").append(employee);//devuelvo  en el html
                }
        });
}

//llenando combobox tipo mostrando el nombre y en value el id

function tipo(){

        $.ajax({
                url:   'data-1.json', 
                type:  'post', 
                dataType: "json",
                success:  function (data) {
              
                var obj = data
               
                $.each(obj, function(key, value) {

                  $("#selecTipo").each(function(){//recorremos el select

                  if($(this).text() != value.Tipo){  // validacion si el opcion ya existe en el
                       $("#selecTipo").append('<option name="' + key.Id+ '"  value="' + value.Id+ '">' + value.Tipo + '</option>')
                    }             
                 });
              });
            }
        });
}


//igual que la funsion de arriba  solo que en este caso es ciudad
function ciudad(){

        $.ajax({
                url:   'data-1.json', 
                type:  'post', 
                dataType: "json",
                success:  function (data) {
             
                var obj = data
              
                $.each(obj, function(key, value) {

                  $("#selectCiudad").each(function(){//recorremos el select

                  if($(this).text() != value.Ciudad){  // validacion si el opcion ya existe en el
                       $("#selectCiudad").append('<option name="' + key.Id+ '"  value="' + value.Id+ '">' + value.Ciudad + '</option>')
                    }             
                 });
              });
            }
        });
}


//busqueda por parametros en este caso utilizare php ya que le mandare los parametros que necesito,
function conParamtros(){
              //llamo los id y los asigno a varibales
              var ciudadp = $('#selectCiudad').val();
              var tipop = $('#selectTipo').val();//asigno parametros
              var preciop = $('#rangoPrecio').val();

              //estas varibles las agrego al FormData
               var form_data = new FormData();
               form_data.append('ciudad', ciudadp);
               form_data.append('tipo', tipop);
               form_data.append('precio', preciop);

        $.ajax({
                url:   './modelo/llenar.php', 
                type:  'post', 
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                success:  function (data) {
               
                var obj = data
                var employee = '';
                $.each(obj, function(key, value) {
                employee += '<div >';
                employee += ' <img src="img/home.jpg" width="200px" height="200px">';
                employee += '</div>';
                employee += '<div>';
                employee += '<p>' + value.Id + '</p>';
                employee += '<p>' + value.Direccion + '</p>';
                employee += '<p>' + value.Ciudad + '</p>';
                employee += '<p>' + value.Telefono + '</p>';
                employee += '<p>' + value.Codigo + '</p>';
                employee += '<p>' + value.Tipo + '</p>';
                employee += '<p>' + value.Precio + '</p>';
                employee += '<p ><a>Ver mas<a/></p>';
                employee += '</div>';
                  
                console.log(value.Id)
              });
                   $("#ok").append(employee);//al final se imprime en el html
                }
        });
}