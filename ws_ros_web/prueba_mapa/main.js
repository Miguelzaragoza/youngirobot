document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")
    
    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)

    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
    }

    
    function connect(){
	    console.log("Clic en connect")
	    data.ros = new ROSLIB.Ros({
                url: 'ws://'+document.getElementById("rosbridge_address").value+'/'
        })

        // Define callbacks
        data.ros.on("connection", () => {
            data.connected = true
            document.getElementById("conexion").innerHTML="Conexion con ROSBridge correcta"
            console.log("Conexion con ROSBridge correcta")
            
            data.mapViewer = new ROS2D.Viewer({
                divID: 'map', // id del objeto html
                width: 800, 
                height: 800
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
        })
        data.ros.on("error", (error) => {
            document.getElementById("conexion").innerHTML="Se ha producido algun error mientras se intentaba realizar la conexion"
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
        })
        data.ros.on('close', () => {
            data.connected = false
            console.log('Connection to ROSBridge was closed!')
              document.getElementById('map').innerHTML = ""
        })

        data.interval = setInterval(() => {
            if (data.ros != null && data.ros.isConnected) {
               data.ros.getNodes((data) => { }, (error) => { })
            }
        }, 10000)
    }

    function disconnect(){
	      data.ros.close()        
	      data.connected = false
        console.log('Clic en botón de desconexión')
    }    
});