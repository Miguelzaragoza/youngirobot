<?php 
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['user_name'])) {

 ?>
<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>youngiRobot | Panel Cliente</title>

    <!-- Camara -->
    <!--<script src="https://cdn.jsdelivr.net/npm/eventemitter2@5.0.1/lib/eventemitter2.min.js"></script>
-->
<script type="text/javascript" src="https://static.robotwebtools.org/EventEmitter2/current/eventemitter2.min.js"></script>
    <script type="text/javascript" src="assets/js/demo/roslib.min.js"></script>

    <!-- Favicons -->
    <link href="assets/img/favicon.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300 ,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet">

    <!-- Bootstrap core CSS-->
    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template-->
    <link href="assets/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <!-- Page level plugin CSS-->
    <link href="assets/vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="assets/css/sb-admin.css" rel="stylesheet">
    <script type="text/javascript" src="https://static.robotwebtools.org/EaselJS/current/easeljs.min.js"></script>
    
    <script type="text/javascript" src="https://static.robotwebtools.org/ros2djs/current/ros2d.min.js"></script>
    <script type="text/javascript" src="assets/js/three.js"></script>
    
    <!-- Remix Icons-->
    <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">


</head>

<body id="page-top">

<div id="app">
  <div id="loading">  
    <vue-simple-spinner class="mt-4" size="large" message=""></vue-simple-spinner>
    <button id="boton" @click="loading(false)">Esconder - aguarde 3 segundos</button>
  </div>
</div>

    <!-- Barra superior header -->
    <nav class="navbar navbar-expand navbar-dark bg-dark static-top">

        <a class="navbar-brand mr-1" href="admin_page.php"><img src="assets/img/logo.png" alt=""></a>

        <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
            <i class="fas fa-bars"></i>
        </button>

    </nav>

    <div id="wrapper">

        <!-- Menú Lateral -->
        <ul class="sidebar navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="admin_page.php">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Panel UPV</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#rutaModal">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Crear Ruta</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="notificaciones.html">
                    <i class="fas fa-fw fa-bell"></i>
                    <span>Alertas</span></a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="heridos.html">
                    <i class="fas fa-fw fa-users"></i>
                    <span>Registro Heridos</span></a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#logoutModal">
                    <!-- Llama al HTML que se encuentra al final de este archivo, muestra pop-up-->
                    <i class="fas fa-fw fa-sign-out-alt"></i>
                    <span>Cerrar Sesion</span>
                </a>
            </li>

            <img src="assets/img/upv.png" alt="logo upv">
        </ul>


        <!-- Contenido Panel Principal -->
        <div id="content-wrapper">

            <div class="container-fluid">
                
                <div class="cabecera">
                    <i class="fas fa-fw fa-tachometer-alt"></i><h2>Panel UPV</h2>
                </div>
                
                <!-- Zona Conectar -->
                <br>
                <!--<div class="row estado">
                        <h6>Robot_1</h6>
                        Estado: <p id="texto_conectado" class="robot-info"></p>
                        Batería: <p class="robot-info">20%</p>  
                        Cámara: <img class="robot-info-camara" src="assets/img/imagen_camara.jpeg" data-toggle="modal" data-target="#infoRobot" alt="">    
                          
                </div>-->
                
                
                <div class="container " id="headerRobot" style="display:none">

                    <div class="row">
                                <ul class="list-group mb-3 w-100">
                                    <li class="list-group-item d-flex justify-content-between align-items-center bg-primary bg-gradient text-light">
                                        <div class="col-auto">
                                            <b>Robot_1</b>
                                        </div>
                                        <div class="col-auto">
                                            Estado
                                            <span class="badge badge-light badge-pill ml-4 " id="texto_conectado">12</span>
                                        </div>
                                        <div class="col-auto">
                                            Batería
                                            <span class="badge badge-light badge-pill ml-4 " id="bateria">100%</span>
                                        </div>
                                        <div class="col-auto" data-toggle="modal" data-target="#infoRobot">
                                            Cámara
                                            <span class="badge badge-pill ml-4 robot-info-camara" id="divCamera2" ></span>
                                        </div>
                                        
                                         
                                    </li>
                                </ul>

                    </div>

                <div class="row">
                    <div class="col-8">
                    <!-- Mapa Panel Principal -->
                        <div class="container mt-4">
                            <!--<img src="assets/img/planta_1.png" class="mt-4" alt="Planta1" id="imgMapa">
                            -->
                            <div class="mascara mt-4 ml-4">
                            <div class="row linea-abc justify-content-end">
                               <div class="col bg-primary zona" data-bs-toggle="tooltip" data-bs-placement="top" title="Sector A" id="sectorA">
                                   
                               </div>
                               <div class="col zona bg-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="Sector B" id="sectorB">
                                   
                               </div>
                               <div class="col-4  zona bg-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Sector C" id="sectorC">
                                   
                               </div>
                                
                            </div>
                            </div>
                            <!--<img src="assets/img/planta_1.png" class="mt-4" alt="Planta1" id="imgMapa">-->
                            
                            <canvas class="mt-4" id="map" width="550" height="600"></canvas>

                        </div>
                        <p class="ml-3"><i>Pulse el robot para indicarle un destino o ruta que limpiar.</i></p>
                    </div>

                

                    <div class="col-3">
                        <div class="container mt-5 ml-5">
                            <div class="row">
                                
                                <ul class="list-group mb-3 w-100">
                                <a href="heridos.html">
                                    <li class="list-group-item d-flex justify-content-between align-items-center bg-primary text-light">
                                        <b>Heridos</b>
                                         <span class="badge badge-light badge-pill ml-4 text-primary" id="texto-heridos">0</span>
                                    </li>
                                </a>
                                </ul>

                                
                                <ul class="list-group w-100 mb-3">
                                <a href="notificaciones.html">
                                    <li class="list-group-item d-flex justify-content-between align-items-center bg-primary text-light">
                                        <b>Alertas</b>
                                         <span class="badge badge-light badge-pill ml-4 text-primary" id="texto-alertas">2</span>
                                    </li>
                                </a>
                                </ul>

                                <ul class="list-group w-100" id="limpiar">
                                <a href="#">
                                    <li class="list-group-item d-flex justify-content-between align-items-center bg-primary text-light">
                                        <b>Limpiar </b>
                                         <span class="badge ml-5 text-primary"><img src="assets/img/spray.png" style="width:30px; heigth:30px;"></img></span>
                                    </li>
                                </a>
                                </ul>
                                        
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- /.content-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Cerrar Sesión Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">¿Listo para salir?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Selecciona 'Cerrar Sesión' si quieres salir realmente y ya ha sterminado todo tu
                    trabajo.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                    <a class="btn btn-primary" href="index.html" onclick="disconnect();">Cerrar Sesión</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Alerta Modal-->
    <div class="modal fade" id="alertasModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content bg-primary text-light">
                <div class="modal-header">
                    <i class="ri-error-warning-line mr-3 mt-1"></i>
                    <h5 class="modal-title" id="exampleModalLabel"><b>Alerta</b></h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body" id="alertas-body">
                    
                </div>
            </div>
        </div>
    </div>

    <!-- Info Robot Modal-->
    <div class="modal fade" id="infoRobot" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Robot 1</h5>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body text-center">   
                    
                    <div id="divCamera" class="img_camara"></div>
                    <!--<img src="assets/img/imagen_camara.jpeg" alt="Camara del robot" class="img_camara"> -->
                </div>
            </div>
        </div>
    </div>


    <!-- Modal Robot Destino-->
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">He llegado!</h5>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    El robot ya ha llegado a su destino!! No olvides desconectarte del robot si no lo vas a usar mas. 
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendido!</button>
                </div>
            </div>
        </div>
    </div>

 
    <!-- Ruta Modal-->
    <div class="modal fade" id="rutaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Elige la ruta a seguir:</h5>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="accordion">
                        <div id="accordion">
                            <div class="card">
                                <div class="card-header text-center" id="headingOne">
                                    <button class="btn btn-light " data-toggle="collapse" data-target="#collapseOne"
                                        aria-expanded="false" aria-controls="collapseOne">
                                        Destinos:
                                    </button>
                                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne"
                                        data-parent="#accordion">

                                        <div class="linea">
                                            <div class="card text-center" style="width: 9rem;" id="btn_enviar_bano">

                                                <img class="card-img-top" src="assets/img/bano.png"
                                                    alt="Card image cap">

                                                <div class="card-body">
                                                    <h5 class="card-title">Baño</h5>
                                                    <p class="card-text">Seleccionar</p>
                                                </div>
                                            </div>


                                            <div class="card text-center" style="width: 9rem;" id="btn_enviar_lab">
                                                <img class="card-img-top" src="assets/img/tubo.png"
                                                    alt="Card image cap">
                                                <div class="card-body">
                                                    <h5 class="card-title">Laboratorio</h5>
                                                    <p class="card-text">Seleccionar</p>
                                                </div>
                                            </div>


                                            <div class="card text-center" style="width: 9rem;" id="btn_enviar_hab">
                                                <img class="card-img-top" src="assets/img/bed.png" alt="Card image cap">
                                                <div class="card-body">
                                                    <h5 class="card-title">H - 123</h5>
                                                    <p class="card-text">Seleccionar</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card-header text-center" id="headingOne">
                                            <button class="btn btn-light" data-toggle="collapse"
                                                data-target="#collapseTwo" aria-expanded="false"
                                                aria-controls="collapseOne">
                                                Selección de rutas:
                                            </button>
                                        </div>
                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingOne"
                                            data-parent="#accordion">
                                            <div class="linea">
                                                <div class="card text-center" style="width: 9rem;" id="btn_ruta_mananera">
                                                    <img class="card-img-top" src="assets/img/bano.png"
                                                        alt="Card image cap">
                                                    <div class="card-body">
                                                        <h5 class="card-title">Ruta mañanera</h5>
                                                        <p class="card-text">Seleccionar</p>
                                                    </div>
                                                </div>



                                                <div class="card text-center" style="width: 9rem;" id="btn_ruta_mediodia">
                                                    <img class="card-img-top" src="assets/img/tubo.png"
                                                        alt="Card image cap">
                                                    <div class="card-body">
                                                        <h5 class="card-title">Ruta mediodia</h5>
                                                        <p class="card-text">Seleccionar</p>
                                                    </div>
                                                </div>


                                                <div class="card text-center" style="width: 9rem;" id="btn_ruta_nocturna">
                                                    <img class="card-img-top" src="assets/img/bed.png"
                                                        alt="Card image cap">
                                                    <div class="card-body">
                                                        <h5 class="card-title">Ruta Nocturna</h5>
                                                        <p class="card-text">Seleccionar</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

            <!-- Bootstrap core JavaScript-->
            <script src="assets/vendor/jquery/jquery.min.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>

            <!-- Core plugin JavaScript-->
            <script src="assets/vendor/jquery-easing/jquery.easing.min.js"></script>

            <!-- Page level plugin JavaScript-->
            <script src="assets/vendor/chart.js/Chart.min.js"></script>
            <script src="assets/vendor/datatables/jquery.dataTables.js"></script>
            <script src="assets/vendor/datatables/dataTables.bootstrap4.js"></script>

            <!-- Custom scripts for all pages-->
            <script src="assets/js/sb-admin.min.js"></script>

            <!-- Demo scripts for this page-->
            <script src="assets/js/demo/datatables-demo.js"></script>
            <script src="assets/js/demo/chart-area-demo.js"></script>

            <!-- Action -->
            <script src="assets/js/accion.js"></script>
            
            <script src="assets/js/mjpegcanvas.min.js"></script>      


            <script>
                function quitarMenu() {
                    document.getElementById('sidebarToggle').style.display = 'none';
                    var elementosAQuitar = document.getElementsByClassName("sidebar"); //divsToHide is an array
                    for (var i = 0; i < elementosAQuitar.length; i++) {
                        elementosAQuitar[i].style.display = "none"; // depending on what you're doing
                    }
                }
            </script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vue"></script>
            <script src="https://unpkg.com/vue-simple-spinner@1.2.8/dist/vue-simple-spinner.min.js"></script>
            <script src="assets/js/loading.js"></script>
    
            
            <script type="text/javascript">
               <?php
                $loading = $_GET['L'];
                if($loading==1){
                ?> 
                
                    document.getElementById("boton").click();
                    
                    <?php
                }else{
                    ?>
                      document.getElementById("app").style.display="none";
                    <?php
                }
                ?>
                
            </script>       

        <script> 
        setTimeout(function(){ 
            document.getElementById("headerRobot").style.display="block";; 
        }, 3000);
        </script> 

        <script>
        alertas();
        function alertas(){
            
            var peticionAlertas = new XMLHttpRequest();
            peticionAlertas.open("get", "Backend/select_alertas.php", true);

            peticionAlertas.send();

            peticionAlertas.onload = function () {
                //$('#alertasModal').modal('show');
                // ...esta aparece bajo la forma de "this.responseText", un texto con un formato que recuerda al de JSON.
                // Como al final de dicho texto se encuentra "[]", no cumple con el convenio del formato JSON.
                var textoJSON_noApto = this.responseText;
                //console.log(textoJSON_noApto);

                // Ahora el texto ya es apto para pasarlo a JSON.
                var json = JSON.parse(textoJSON_noApto);
                //console.log(json);
                // Una vez pasado a dicha formato, y por cada objeto en dicho JSON, se accede a sus propiedades.
                //var x= $('#texto-alertas').val();
                //console.log(x)
                var idAlerta = document.getElementById('texto-alertas');
                
                idAlerta.innerHTML = json.length;


                var alertas_body = document.getElementById('alertas-body');
                var textoAlertas= "Ha ocurrido un error de tipo '" + json[0]["tipo"] +"'." ;

                alertas_body.innerHTML= textoAlertas;

                

            };
        }
        //setInterval('alertas()',3000);
        </script>

        <script>

            var peticionAlertas = new XMLHttpRequest();
            peticionAlertas.open("get", "Backend/select_incidencias.php", true);

            peticionAlertas.send();

            peticionAlertas.onload = function () {

                // ...esta aparece bajo la forma de "this.responseText", un texto con un formato que recuerda al de JSON.
                // Como al final de dicho texto se encuentra "[]", no cumple con el convenio del formato JSON.
                var textoJSON_noApto = this.responseText;
                //console.log(textoJSON_noApto);

                // Ahora el texto ya es apto para pasarlo a JSON.
                var json = JSON.parse(textoJSON_noApto);
                //console.log(json);
                // Una vez pasado a dicha formato, y por cada objeto en dicho JSON, se accede a sus propiedades.
                
                var idAlerta = document.getElementById('texto-heridos');
                idAlerta.innerHTML = json.length;
                

            };
        </script>

<script>
    
        function alertasResuelto(){
            
            var peticionAlertas = new XMLHttpRequest();
            peticionAlertas.open("get", "Backend/select_alerta_resuelto.php", true);

            peticionAlertas.send();

            peticionAlertas.onload = function () {
                //$('#alertasModal').modal('show');
                // ...esta aparece bajo la forma de "this.responseText", un texto con un formato que recuerda al de JSON.
                // Como al final de dicho texto se encuentra "[]", no cumple con el convenio del formato JSON.
                var textoJSON_noApto = this.responseText;
                //console.log(textoJSON_noApto);

                // Ahora el texto ya es apto para pasarlo a JSON.
                var json = JSON.parse(textoJSON_noApto);
                //console.log(json);
                // Una vez pasado a dicha formato, y por cada objeto en dicho JSON, se accede a sus propiedades.
                //var x= $('#texto-alertas').val();
                //console.log(x)
                //var idAlerta = document.getElementById('texto-alertas');
                
                //idAlerta.innerHTML = json.length;

                $('#alertasModal').modal('show');
                var alertas_body = document.getElementById('alertas-body');
                var textoAlertas= "Ha ocurrido un error de tipo '" + json[0]["tipo"] +"'." ;

                alertas_body.innerHTML= textoAlertas;

                

            };
        }
        alertasResuelto();
        setInterval('alertasResuelto()',300000);
        </script>
</body>

</html>
<?php 
}else{
     header("Location: ../index.html");
     exit();
}
 ?>