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
    <script src="https://cdn.jsdelivr.net/npm/eventemitter2@5.0.1/lib/eventemitter2.min.js"></script>

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
                    <div class="col-lg-1 col-md-3">
                        <div class="row"><b>Robot_1</b></div>    
                    </div>
                    <div class="col-lg-3 col-md-3">
                        <div class="row">Estado: <p id="texto_conectado" class="robot-info"></p></div>
                    </div>

                    <div class="col-lg-3 col-md-3 mt-2 mt-md-0">
                       <div class="row">Batería: <p class="robot-info" id="bateria">20%</p>  </div>
                    </div>

                    <div class="col-lg-3 col-md-3 mt-2 mt-lg-0">
                       <div class="row align-items-center">Cámara: 
                       <!--<img class="robot-info-camara" src="assets/img/imagen_camara.jpeg" data-toggle="modal" data-target="#infoRobot" alt="">
                       -->
                       <div id="divCamera2" class="robot-info-camara"  data-toggle="modal" data-target="#infoRobot"></div>
                       </div>
                        
                    </div>


                </div>

            </div>
                
                <!-- Mapa Panel Principal -->
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-p1-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-p1" type="button" role="tab" aria-controls="pills-p1"
                            aria-selected="true">Planta 1</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-p2-tab" data-bs-toggle="pill" data-bs-target="#pills-p2"
                            type="button" role="tab" aria-controls="pills-p2" aria-selected="false">Planta 2</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active text-center" id="pills-p1" role="tabpanel"
                        aria-labelledby="pills-p1-tab">
                        <img src="assets/img/planta_1.png" class="mt-4" alt="Planta1" id="imgMapa">

                        
                        <div id="map"  class="mt-5"></div>
                        

                    </div>
                    <div class="tab-pane fade text-center" id="pills-p2" role="tabpanel" aria-labelledby="pills-p2-tab">
                        <img src="assets/img/planta_2.png" class="mt-5" alt="Planta2">
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

    <!-- Info Robot Modal-->
    <div class="modal fade" id="infoRobot" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Robot 1</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
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
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
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
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
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
                                        Destino 1:
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
                                                Destino 2:
                                            </button>
                                        </div>
                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingOne"
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
                                                    <img class="card-img-top" src="assets/img/bed.png"
                                                        alt="Card image cap">
                                                    <div class="card-body">
                                                        <h5 class="card-title">H - 123</h5>
                                                        <p class="card-text">Seleccionar</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div class="card">
                                        <div class="card-header text-center" id="headingOne">
                                            <button class="btn btn-light" data-toggle="collapse"
                                                data-target="#collapse3" aria-expanded="false"
                                                aria-controls="collapseOne">
                                                Destino 3:
                                            </button>
                                        </div>
                                        <div id="collapse3" class="collapse" aria-labelledby="headingOne"
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
                                                    <img class="card-img-top" src="assets/img/bed.png"
                                                        alt="Card image cap">
                                                    <div class="card-body">
                                                        <h5 class="card-title">H - 123</h5>
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
</body>

</html>
<?php 
}else{
     header("Location: ../index.html");
     exit();
}
 ?>