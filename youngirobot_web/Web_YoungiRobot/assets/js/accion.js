document.addEventListener('DOMContentLoaded', event => {
    //console.log("entro en la pagina")
    cambiarTextoConectado("Desconectado.", "#8F8F8F")

    document.getElementById("btn_enviar_bano").addEventListener("click", send_goal_delante)
    //document.getElementById("btn_enviar_bano").addEventListener("click", send_goal)
    document.getElementById("btn_enviar_hab").addEventListener("click", send_goal1_delante)
    //document.getElementById("btn_enviar_hab").addEventListener("click", send_goal1)
    document.getElementById("btn_enviar_lab").addEventListener("click", send_goal2_delante)
    //document.getElementById("btn_enviar_lab").addEventListener("click", send_goal2)

    document.getElementById("btn_ruta_mananera").addEventListener("click", send_goal2_ruta_mananera)
    document.getElementById("btn_ruta_mediodia").addEventListener("click", send_goal1_ruta_mediodia)
    document.getElementById("btn_ruta_nocturna").addEventListener("click", send_goal_ruta_nocturna)

    document.getElementById("sectorA").addEventListener("click", send_goal_delante)
    document.getElementById("sectorB").addEventListener("click", send_goal1_delante)
    document.getElementById("sectorC").addEventListener("click", send_goal2_delante)

    document.getElementById("limpiar").addEventListener("click", spray)

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
            cambiarTextoConectado("Conectado", "#34BA05")
            setCamera();
            setCamera2();
            robotStatus();

            //setMapa();
            setMapaPersonalizado();

        })
        data.ros.on("error", (error) => {
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
            cambiarTextoConectado("Se ha producido un error, avise al tecnico", "#FF2525")
        })
        data.ros.on("close", () => {
            data.connected = false
            console.log("Conexion con ROSBridge cerrada")
            cambiarTextoConectado("Desconectado", "#8F8F8F")
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
    //disconnect();

    function send_goal(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 2.5
        data.action.goal.position.y = -4
        //console.log("Hola")

        //REAL
        //data.action.goal.position.x = 1
        //data.action.goal.position.y = 2.5

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
            // console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose al banyo...", "#DEBC02")
            } else if (status['status'] == 3 && con == 0) {
                if (ruta == "NoRuta") {
                    send_goal_punto1(ruta);
                }
                //cambiarTextoConectado("Conectado.", "#34BA05");
                //$('#modal').modal('show');
                con++;
            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal_delante() {

        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        //data.action.goal.position.x = 1
        //data.action.goal.position.y = 1.25
        console.log("click")
        //SIMULACION
        data.action.goal.position.x = 2.5
        data.action.goal.position.y = -1

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose al banyo...", "#DEBC02")
            } else if (status['status'] == 3 && con == 0) {
                con++
                var ruta = "NoRuta";
                send_goal(ruta);
                //cambiarTextoConectado("Conectado.", "#34BA05")
            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal_ruta_nocturna() {

        //REAL
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        //data.action.goal.position.x = 1
        //data.action.goal.position.y = 1.25

        //SIMULACION
        data.action.goal.position.x = 2.5
        data.action.goal.position.y = -1

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Haciendo ruta nocturna.", "#DEBC02")
            } else if (status['status'] == 3 && con == 0) {
                con++
                var ruta = "nocturna";
                send_goal(ruta);
                //cambiarTextoConectado("Conectado.", "#34BA05")
            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal1(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 0.5
        data.action.goal.position.y = -4

        //REAL
        //data.action.goal.position.x = 0.0
        //data.action.goal.position.y = 1.75

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose a la habitacion 123...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                send_goal1_punto1(ruta);

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal1_delante() {

        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        //data.action.goal.position.x = 0.5
        //data.action.goal.position.y = 0.75

        //SIMULACION
        data.action.goal.position.x = 0.5
        data.action.goal.position.y = -1

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose a la habitacion 123...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                var ruta = "NoRuta";
                send_goal1(ruta);
                //cambiarTextoConectado("Conectado.", "#34BA05")
            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal1_ruta_mediodia() {

        //REAL
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        //data.action.goal.position.x = 0.5
        //data.action.goal.position.y = 0.75

        //SIMULACION
        data.action.goal.position.x = 0.5
        data.action.goal.position.y = -1

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Haciendo la ruta mañanera.", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                var ruta = "mediodia";
                send_goal1_punto1(ruta);
                //cambiarTextoConectado("Conectado.", "#34BA05")
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


    function send_goal2(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = -2
        data.action.goal.position.y = -4

        //REAL
        //data.action.goal.position.x = -0.5
        //data.action.goal.position.y = 1

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose al laboratorio...", "#DEBC02")
            } else if (status['status'] == 3 && con2 == 0) {
                con2++
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');
                send_goal2_punto1(ruta);

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal2_ruta_mananera() {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = -2
        data.action.goal.position.y = -1

        //REAL
        //data.action.goal.position.x = -0.2
        //data.action.goal.position.y = 0.25

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose al laboratorio...", "#DEBC02")
            } else if (status['status'] == 3 && con2 == 0) {
                con2++
                var ruta = "mañanera";
                send_goal2_punto1(ruta)
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');


            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal2_delante() {

        //REAL
        //data.action.goal.position.x = -0.2
        //data.action.goal.position.y = 0.25

        //SIMULACION
        data.action.goal.position.x = -2
        data.action.goal.position.y = -1

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                cambiarTextoConectado("Moviendose al laboratorio...", "#DEBC02")
            } else if (status['status'] == 3 && con2 == 0) {
                con2++
                var ruta = "NoRuta";
                send_goal2(ruta);
                //$('#modal').modal('show');
                //cambiarTextoConectado("Conectado.", "#34BA05")
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

    function setCamera() {

        //console.log("setting the camera")
        let viewer1 = new MJPEGCANVAS.Viewer({
            divID: "divCamera", //elemento del html donde mostraremos la cámara
            host: "127.0.0.1:8080", //dirección del servidor de vídeo
            width: 380, //no pongas un tamaño mucho mayor porque puede dar error
            height: 290,
            topic: "/turtlebot3/camera/image_raw",
            //topic: "/raspicam_node/image",
            ssl: false,
        })
        //var x= document.getElementById("divCamera");
        //x.style.display="none";
    }

    function setCamera2() {

        //console.log("setting the camera")
        let viewer1 = new MJPEGCANVAS.Viewer({
            divID: "divCamera2", //elemento del html donde mostraremos la cámara
            host: "127.0.0.1:8080", //dirección del servidor de vídeo
            width: 40, //no pongas un tamaño mucho mayor porque puede dar error
            height: 30,
            topic: "/turtlebot3/camera/image_raw",
            //topic: "/raspicam_node/image",
            ssl: false,
        })
        //var x= document.getElementById("divCamera");
        //x.style.display="none";
    }

    function setMapa() {
        data.mapViewer = new ROS2D.Viewer({
            divID: 'map', // id del objeto html
            width: 850,
            height: 590
        })

        // Setup the map client
        data.mapGridClient = new ROS2D.OccupancyGridClient({
            ros: data.ros,
            rootObject: data.mapViewer.scene,
            continuous: true // este atributo permite mantener el mapa actualizado cuando se cambie por el algoritmo de mapeado del robot
        })

        // Scale the canvas to fit to the map
        let gridClient = data.mapGridClient.on('change', () => {
            data.mapViewer.scaleToDimensions(data.mapGridClient.currentGrid.width, data.mapGridClient.currentGrid.height)
            data.mapViewer.shift(data.mapGridClient.currentGrid.pose.position.x, data.mapGridClient.currentGrid.pose.position.y)
        })

        var robotMarker = new ROS2D.NavigationArrow({
            size: 0.25,
            strokeSize: 0.05,
            pulse: true,
            fillColor: createjs.Graphics.getRGB(255, 0, 0, 0.65)
        });
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
        var x = document.getElementById('imgMapa');
        x.style.display = 'none';
    }

    function robotStatus() {
        let robot_status = new ROSLIB.Topic({
            ros: data.ros,
            name: '/battery_state',
            messageType: 'sensor_msgs/BatteryState'
        })

        robot_status.subscribe((message) => {
            //console.log(message)
            var max = 12.2;
            var pita = 10.97;
            var min = 8.77;
            var pe = 0.79;
            var percentage = "98%";

            var x = document.getElementById('bateria');
            x.innerHTML = percentage + "%";
           
        })

    }

    function send_goal2_punto1(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = -2.5
        data.action.goal.position.y = -4

        //REAL
        //data.action.goal.position.x = -0.25
        //data.action.goal.position.y = 1

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con2 == 0) {
                con2++
                console.log("punto1 goal2")
                send_goal2_punto2(ruta);
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal2_punto2(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = -2.5
        data.action.goal.position.y = -6

        //REAL
        //data.action.goal.position.x = -0.5
        //data.action.goal.position.y = 1.5

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con2 == 0) {
                con2++
                send_goal2_punto3(ruta)
                console.log("punto3 goal2")
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal2_punto3(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = -1.75
        data.action.goal.position.y = -6

        //REAL
        //data.action.goal.position.x = -1
        //data.action.goal.position.y = 1.25

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con2 == 0) {
                con2++
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');
                console.log("punto3 goal2")
                send_goal2_punto4(ruta)

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal2_punto4(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = -1.75
        data.action.goal.position.y = -4

        //REAL
        //data.action.goal.position.x = -0.5
        //data.action.goal.position.y = 0.75

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con2 == 0) {
                con2++
                console.log("punto4 goal2")
                if (ruta == "mañanera") {
                    send_goal1_delante();
                }
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal1_punto1(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 0
        data.action.goal.position.y = -4

        //REAL
        //data.action.goal.position.x = 0.5
        //data.action.goal.position.y = 1.75

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');
                console.log("punto1 goal1")
                send_goal1_punto2(ruta);

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal1_punto2(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 0
        data.action.goal.position.y = -6

        //REAL
        //data.action.goal.position.x = 0.0
        //data.action.goal.position.y = 2

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');
                console.log("punto2 goal1")
                send_goal1_punto3(ruta);
                

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }
    function send_goal1_punto3(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 0.75
        data.action.goal.position.y = -6

        //REAL
        //data.action.goal.position.x = -0.25
        //data.action.goal.position.y = 1.75

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');
                console.log("punto3 goal1")
                send_goal1_punto4(ruta);
                

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal1_punto4(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 0.75
        data.action.goal.position.y = -4

        //REAL
        //data.action.goal.position.x = 0.0
        //data.action.goal.position.y = 1.5

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                console.log("punto4 goal1")
                if (ruta == "NoRuta") {
                    cambiarTextoConectado("Conectado.", "#34BA05")
                    $('#modal').modal('show');
                }

                if (ruta == "mediodia") {
                    send_goal_delante();
                }

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }


    function send_goal_punto1(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 2
        data.action.goal.position.y = -4

        //REAL
        //data.action.goal.position.x = 1.25
        //data.action.goal.position.y = 2.25



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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');
                send_goal_punto2(ruta);
                console.log("punto1 goal")

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal_punto2(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 2
        data.action.goal.position.y = -6

        //REAL
        //data.action.goal.position.x = 1
        //data.action.goal.position.y = 2.75

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');
                send_goal_punto3(ruta);
                console.log("punto2 goal")

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }
    function send_goal_punto3(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 3
        data.action.goal.position.y = -6

        //REAL
        //data.action.goal.position.x = 0.45
        //data.action.goal.position.y = 2.5

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Moviendose a la habitacion 123...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                //cambiarTextoConectado("Conectado.", "#34BA05")
                //$('#modal').modal('show');
                send_goal_punto4(ruta);
                console.log("punto3 goal")

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    function send_goal_punto4(ruta) {

        //SIMULACION
        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = 3
        data.action.goal.position.y = -4

        //REAL
        //data.action.goal.position.x = 1
        //data.action.goal.position.y = 2

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
            //console.log(data.action.status)
            if (status['status'] == 1) {
                spray();
                cambiarTextoConectado("Limpiando ...", "#DEBC02")
            } else if (status['status'] == 3 && con1 == 0) {
                con1++
                console.log("punto3 goal")
                if (ruta == "NoRuta") {
                    cambiarTextoConectado("Conectado.", "#34BA05")
                    $('#modal').modal('show');
                }

                if (ruta == "nocturna") {
                    send_goal2_delante();
                }

            } else if (status['status'] == 4) {
                cambiarTextoConectado("Se ha producido un error, avise al tecnico.", "#FF2525")
            }
        })

        data.goal.on('feedback', (feedback) => {
            data.action.feedback = feedback.base_position.pose
            //console.log(data.action.feedback)
        })

        data.goal.on('result', (result) => {
            data.action.result = result
            //console.log(data.action.result)
        })

        //enviamos el mensaje
        data.goal.send()
    }

    //rostopic pub /led_out std_msgs/Byte "data: 10"
    function spray() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/led_out',
            messageType: 'std_msgs/Byte'
        })
        let message = new ROSLIB.Message(
        10    
        )
        topic.publish(message)
    }

    function setMapaPersonalizado() {
        // Make robot pose subscriber
        const robotPose = new ROSLIB.Topic({
            ros: data.ros,
            name: '/odom',
            messageType: 'nav_msgs/Odometry'
        });

        // Create an EaselJS stage from the canvas
        const canvas = document.getElementById("map");
        const stage = new createjs.Stage('map');

        // Create Map Image
        const map = new Image();
        map.src = "assets/img/planta_1.png";

        // Once map image has loaded...
        map.onload = function (event) {
            // Render Map to canvas after scaling the map and canvas to the appropriate proportions.
            const mapImage = event.target;
            const bitMap = new createjs.Bitmap(mapImage);
            bitMap.scaleX = 500 / canvas.width;
            bitMap.scaleY = 500 / canvas.height;
            canvas.width = 800;
            canvas.height = 500;
            stage.addChild(bitMap);
            stage.update()

            // Create bot image
            const botImg = new Image();
            botImg.src = "assets/img/hero-img.png";
            
            // Once bot image has loaded...
            botImg.onload = function (event) {
                // Create new Easel bitmap from bot image
                const botImage = event.target;
                const botBitmap = new createjs.Bitmap(botImage);
                //botBitmap.enableMouseOver(10);
                botBitmap.cursor="pointer";

                // Create a hit box for the new image (This allows Easel to register image click events)
                const hitArea = new createjs.Shape();
                hitArea.graphics.f('#000').dr(0, 0, botBitmap.image.width, botBitmap.image.height);
                botBitmap.hitArea = hitArea;

                // Add 'Click' event listener to bot image
                botBitmap.addEventListener('click', () => {
                    $('#rutaModal').modal('show');
                    console.log('Bot clicked');
                });

                // Set bot img dimensions 
                // Shift image registration point from top left corner to center of image.
                // This helps with alignment and rotates image around center rather than top left corner.
                const botImgSize = 60;
                botBitmap.scaleX = botImgSize / 574;
                botBitmap.scaleY = botImgSize / 766;
                botBitmap.regX = 574 / 2;
                botBitmap.regY = 766 / 2;
                // The numbers 193 and 280 come from the original dimensions of the bot image (in this case the dimensions are 193x280)

                // Target map resolution and bot origin point.
                const resolution = 0.05;

                const originX = Math.abs(5);
                const originY = Math.abs(5);

                // const originX = Math.abs(-109.2);
                // const originY = Math.abs(-35.35);
                // Why the absolute value?
                // Because the origin point of the bot is based upon where the bottom left corner pixel is relative to the robot's reference to (0, 0). (Kinda confusing)

                // Calculate robot's starting point

                // Adjust canvas starting position from (0, 0) being top left corner (html canvas standard) to the bottom left corner (image standard).
                // This will align canvas and map references to the same grid points.
                // Since X = 0 is still the farthest left side, we only need to shift the Y value.
                const yZeroShift = canvas.height;

                // Calculate which pixel (a.k.a. cell) to place the robot image in the canvas.
                // To get the pixel from the robot's position data, we start by dividing the robot's pose by the map's resolution.
                // As found here, http://answers.ros.org/question/205521/robot-coordinates-in-map/
                // Calculation: originX / resolution

                // The pixel calculated will be based upon the original dimensions of the map.
                // To calculate the pixel based upon the current canvas dimensions, divide the robot pose (as previously calculated) by the ratio the map was scaled.
                // Calculation: (originX / xScaleFactor) / resolution
                // You can get the ratio by dividing the original map width/height by the respective new canvas width/height.
                const xScaleFactor = canvas.width / 800;
                const yScaleFactor = canvas.height / 500;

                // Finally, incorporate the (0, 0) shift (this aligns the starting points of the canvas and image)
                const xOriginCell = (originX / xScaleFactor) / resolution;
                const yOriginCell = yZeroShift - ((originY / yScaleFactor) / resolution);

                // Add bot image to canvas
                stage.addChild(botBitmap).set({ x: xOriginCell, y: yOriginCell });
                stage.update();

                // Now that the bot is rendered at the appropriate starting point, lets start monitoring pose changes

                // Subscribe to robot pose topic
                robotPose.subscribe((message) => {
                    // Remove current bot image (this prevents image trailing)
                    stage.removeChild(botBitmap);

                    // Target the robot's pose
                    const poseX = message.pose.pose.position.x;
                    const poseY = message.pose.pose.position.y;

                    data.orientation = message.pose.pose.orientation

                    // Use three.js to convert orientation Quaternion value to Euler value.
                    const quaternion = new THREE.Quaternion(
                        data.orientation.x,
                        data.orientation.y,
                        data.orientation.z,
                        data.orientation.w
                    );
                    const rotation = new THREE.Euler().setFromQuaternion(quaternion, "XYZ");

                    // Rotate bot image
                    // Bit map rotation is measured in degrees, but our Euler value is in radians so be sure to convert BEFORE setting rotation
                    botBitmap.rotation = radians_to_degrees(rotation.z);

                    // Calculate the new position
                    // Using the same equation as above, we can simply add the robot's pose to the original pose position, 
                    // before dividing by map-canvas-ratio, to get the new cell.
                    const xCell = ((originX + poseX) / xScaleFactor) / resolution;
                    const yCell = yZeroShift - (((originY + poseY) / yScaleFactor) / resolution);
                    
                    //console.log("x: "+xCell)
                    //console.log("y: "+yCell)
                    // Add bot image back to canvas in new location and update the stage
                    stage.addChild(botBitmap).set({ x: xCell, y: yCell });
                    stage.update();

                    // Handle Canvas Click Events (for clicks outside of the robot images)
                    canvas.addEventListener('click', (e) => onClick(e, xCell, yCell), false);
                    function onClick(event, x, y) {
                        //console.log(getCursorPosition(event));
                    };

                    // Function for getting cursor position from canvas click
                    function getCursorPosition(event) {
                        let x = 0;
                        let y = 0;
                        if (event.pageX != undefined && event.pageY != undefined) {
                            //console.log(event.pageX)
                            x = event.pageX;
                            y = event.pageY;
                        } else {
                            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
                            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop
                        };
                        x -= canvas.offsetLeft;
                        y -= canvas.offsetTop;
                        return [x, y];
                    };
                });
            }
        }
    }
    function radians_to_degrees(radians) {
        const pi = Math.PI;
        return radians * (180/pi);
    };
});
