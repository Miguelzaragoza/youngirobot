document.addEventListener('DOMContentLoaded', event => {
    //console.log("entro en la pagina")
    cambiarTextoConectado("Desconectado.", "#8F8F8F")

    document.getElementById("btn_enviar_bano").addEventListener("click", send_goal)
    document.getElementById("btn_enviar_hab").addEventListener("click", send_goal1)
    document.getElementById("btn_enviar_lab").addEventListener("click", send_goal2)
    //document.getElementById("btn_con").addEventListener("click", connect)
    //document.getElementById("btn_dis").addEventListener("click", disconnect)



    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090',
        connected: false,
        // action information
        goal: null,
        action: {
            goal: { position: { x: 0, y: 0 } },
            feedback: {
                position: { x: 0, y: 0 },
                state: ''
            },
            result: { success: false },
            status: { status: 0, text: '' },
        }
    }



    function connect() {
        console.log("Clic en connect")

        data.ros = new ROSLIB.Ros({
            url: data.rosbridge_address
        })

        // Define callbacks
        data.ros.on("connection", () => {
            data.connected = true
            console.log("Conexion con ROSBridge correcta")
            cambiarTextoConectado("Conectado.", "#34BA05")
            setCamera();
            setCamera2();
            robotStatus();
           
            setMapa();
            
        })
        data.ros.on("error", (error) => {
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
            cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
        })
        data.ros.on("close", () => {
            data.connected = false
            console.log("Conexion con ROSBridge cerrada")
            cambiarTextoConectado("Desconectado.", "#8F8F8F")
            document.getElementById('map').innerHTML = ""
            document.getElementById("divCamera").innerHTML = ""
        })
    }
    connect();
    function disconnect() {
        data.ros.close()
        data.connected = false
        console.log('Clic en botón de desconexión')
        cambiarTextoConectado("Desconectado.", "#8F8F8F")
    }

    function send_goal() {

        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 4
        data.action.goal.position.y = -4

        //definimos un ActionClient para el /move_base
        let action_client = new ROSLIB.ActionClient({
            ros: data.ros,
            serverName: "/move_base",
            actionName: "move_base_msgs/MoveBaseAction"
        })

        //definimos el mensaje Goal que enviaremos al servidor
        data.goal = new ROSLIB.Goal({
            actionClient: action_client,
            goalMessage: {
                target_pose: {
                    header: {
                        frame_id: 'map'
                    },
                    pose: {
                        position: data.action.goal.position,
                        orientation: { x: 0, y: 0, z: 0, w: 1 }
                    }
                },
            }
        })

        //definimos los callbacks
        var con = 0
        data.goal.on('status', (status) => {
            data.action.status = status
            console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose al banyo...", "#DEBC02")
            } else if (status['status'] == 3 && con == 0) {
                con++
                $('#modal').modal('show');
                cambiarTextoConectado("Conectado.", "#34BA05")
            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal1() {

        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 2.5
        data.action.goal.position.y = -4

        //definimos un ActionClient para el /move_base
        let action_client = new ROSLIB.ActionClient({
            ros: data.ros,
            serverName: "/move_base",
            actionName: "move_base_msgs/MoveBaseAction"
        })

        //definimos el mensaje Goal que enviaremos al servidor
        data.goal = new ROSLIB.Goal({
            actionClient: action_client,
            goalMessage: {
                target_pose: {
                    header: {
                        frame_id: 'map'
                    },
                    pose: {
                        position: data.action.goal.position,
                        orientation: { x: 0, y: 0, z: 0, w: 1 }
                    }
                },
            }
        })

        //definimos los callbacks
        var con1 = 0
        data.goal.on('status', (status) => {
            data.action.status = status
            console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose a la habitacion 123...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                $('#modal').modal('show');
                cambiarTextoConectado("Conectado.", "#34BA05")
            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal2() {

        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = -4
        data.action.goal.position.y = 4

        //definimos un ActionClient para el /move_base
        let action_client = new ROSLIB.ActionClient({
            ros: data.ros,
            serverName: "/move_base",
            actionName: "move_base_msgs/MoveBaseAction"
        })

        //definimos el mensaje Goal que enviaremos al servidor
        data.goal = new ROSLIB.Goal({
            actionClient: action_client,
            goalMessage: {
                target_pose: {
                    header: {
                        frame_id: 'map'
                    },
                    pose: {
                        position: data.action.goal.position,
                        orientation: { x: 0, y: 0, z: 0, w: 1 }
                    }
                },
            }
        })
        var con2 = 0
        //definimos los callbacks
        data.goal.on('status', (status) => {
            data.action.status = status
            console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose al laboratorio...", "#DEBC02")
            } else if (status['status'] == 3 && con2 == 0) {
                con2++
                $('#modal').modal('show');
                cambiarTextoConectado("Conectado.", "#34BA05")
            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function cambiarTextoConectado(mensaje, color) {
        var x = document.getElementById("texto_conectado")
        x.innerHTML = mensaje
        x.style.color = color
    }

    function setCamera(){
        
        console.log("setting the camera")
        let viewer1 = new MJPEGCANVAS.Viewer({
            divID: "divCamera", //elemento del html donde mostraremos la cámara
            host: "127.0.0.1:8080", //dirección del servidor de vídeo
            width: 380, //no pongas un tamaño mucho mayor porque puede dar error
            height: 290,
            //topic: "/turtlebot3/camera/image_raw",
            topic: "/raspicam_node/image",
            ssl: false,
        })
        //var x= document.getElementById("divCamera");
        //x.style.display="none";
    }

    function setCamera2(){
        
        console.log("setting the camera")
        let viewer1 = new MJPEGCANVAS.Viewer({
            divID: "divCamera2", //elemento del html donde mostraremos la cámara
            host: "127.0.0.1:8080", //dirección del servidor de vídeo
            width: 40, //no pongas un tamaño mucho mayor porque puede dar error
            height: 30,
            //topic: "/turtlebot3/camera/image_raw",
            topic: "/raspicam_node/image",
            ssl: false,
        })
        //var x= document.getElementById("divCamera");
        //x.style.display="none";
    }

    function setMapa(){
        data.mapViewer = new ROS2D.Viewer({
            divID: 'map', // id del objeto html
            width: 850, 
            height: 590
        })
    
        // Setup the map client
        data.mapGridClient = new ROS2D.OccupancyGridClient({
                ros : data.ros,
                rootObject : data.mapViewer.scene,
                continuous: true // este atributo permite mantener el mapa actualizado cuando se cambie por el algoritmo de mapeado del robot
        })
    
        // Scale the canvas to fit to the map
        let gridClient = data.mapGridClient.on('change', () => {
                data.mapViewer.scaleToDimensions(data.mapGridClient.currentGrid.width, data.mapGridClient.currentGrid.height)
                data.mapViewer.shift(data.mapGridClient.currentGrid.pose.position.x, data.mapGridClient.currentGrid.pose.position.y)
        })
        
        var robotMarker = new ROS2D.NavigationArrow({
            size : 0.25,
            strokeSize : 0.05,
            pulse: true,
            fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65)
        });
        /*new ROS2D.NavigationImage = function(options) {
            var that = this;
            var size = 0.25;
            var image_url = '../assets/img/hero-img.png';
            var alpha = options.alpha || 1;
            var originals = {};
            var paintImage = function(){
              createjs.Bitmap.call(that, image);
              var scale = calculateScale(size);
              that.alpha = alpha;
              that.scaleX = scale;
              that.scaleY = scale;
              that.regY = that.image.height/2;
              that.regX = that.image.width/2;
              originals['rotation'] = that.rotation;
              Object.defineProperty( that, 'rotation', {
                get: function(){ return originals['rotation'] + 90; },
                set: function(value){ originals['rotation'] = value; }
              });
              if (pulse) {
                // have the model "pulse"
                var growCount = 0;
                var growing = true;
                var SCALE_SIZE = 1.020;
                createjs.Ticker.addEventListener('tick', function() {
                  if (growing) {
                    that.scaleX *= SCALE_SIZE;
                    that.scaleY *= SCALE_SIZE;
                    growing = (++growCount < 10);
                  } else {
                    that.scaleX /= SCALE_SIZE;
                    that.scaleY /= SCALE_SIZE;
                    growing = (--growCount < 0);
                  }
                });
              }
            };
             var calculateScale = function(_size){
                return _size / image.width;
            };
            var image = new Image();
            image.onload = paintImage;
            image.src = image_url;
            image.dataset.target="#infoRobot";
            image.toggleAttribute("modal")
        };*/
    
        //ROS2D.NavigationImage.prototype.__proto__ = createjs.Bitmap.prototype;
        gridClient.rootObject.addChild(robotMarker);
    
        let posicion_robot = new ROSLIB.Topic({
            ros: data.ros,
            name: '/odom',
            messageType: 'nav_msgs/Odometry'
        })
        posicion_robot.subscribe((message) => {
            data.position = message.pose.pose.position
            data.orientation = message.pose.pose.orientation
                robotMarker.x = data.position.x.toFixed(2)
                robotMarker.y = -data.position.y.toFixed(2)
                robotMarker.rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(
                        data.orientation.x,
                        data.orientation.y,
                        data.orientation.z,
                        data.orientation.w
                    )
                ).z * -180 / 3.14159;
        })
        var x= document.getElementById('imgMapa');
        x.style.display='none';          
    }

    function robotStatus(){
        let robot_status = new ROSLIB.Topic({
            ros: data.ros,
            name: '/battery_state',
            messageType: 'sensor_msgs/BatteryState'
        })

        robot_status.subscribe((message)=> {
            //console.log(message.percentage)
            var percentage= parseInt(message.percentage*100,10)
            var x= document.getElementById('bateria');
            x.innerHTML=percentage+"%";
            if(percentage>100){
                x.innerHTML="100%";
            }
            if(percentage>=50){
                x.style.color="#34BA05";
            }else if(percentage>=25){
                x.style.color="#DEBC02";
            }else {
                x.style.color="#FF0202";
            }

        })

    }

});
