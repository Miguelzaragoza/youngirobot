document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")
    
    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)

    document.getElementById("btn_set").addEventListener("click", set_param)
    document.getElementById("btn_move").addEventListener("click", call_move_service)
    
    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        // service information
        service_busy: false, 
        service_response: '',
        param_val: 0
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
            let topic = new ROSLIB.Topic({
                ros: data.ros,
                name: '/odom',
                messageType: 'nav_msgs/Odometry'
            })
            topic.subscribe((message) => {
                data.position = message.pose.pose.position
                    document.getElementById("pos_x").innerHTML = data.position.x.toFixed(2)
                    document.getElementById("pos_y").innerHTML = data.position.y.toFixed(2)
            })
        })
        data.ros.on("error", (error) => {
            document.getElementById("conexion").innerHTML="Se ha producido algun error mientras se intentaba realizar la conexion"
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
        })
        data.ros.on("close", () => {
            data.connected = false
            document.getElementById("conexion").innerHTML="Conexion con ROSBridge cerrada"
            console.log("Conexion con ROSBridge cerrada")	    	 
        })
    }

    function disconnect(){
	      data.ros.close()        
	      data.connected = false
        console.log('Clic en botón de desconexión')
    }    
   
    function set_param(){
        data.service_busy = true
        data.param_val = document.getElementById("param_val").value //asumimos que introducimos un valor en este campo de texto
        console.log("Reading value "+data.param_val)
        data.service_busy = false

        //creamos un parámetro
        let web_param = new ROSLIB.Param({
            ros: data.ros,
            name: 'web_param'
        })

        //le asociamos el valor leído
        web_param.set(data.param_val)
    }

    function call_move_service(){
        data.service_busy = true
        data.service_response = ''
    
      //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/move_square',
            serviceType: 'my_custom_service_msg/MyCustomServiceMessage'
        })
    
      //definimos el parámetro de la llamada
        let request = new ROSLIB.ServiceRequest({
            distance: parseInt(data.param_val)
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })	
    }

    function turn(){
        let message = new ROSLIB.Message({
            linear: {x: 1, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: 0.5, },
        })
        topic.publish(message)
    }
    function turn_right() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 1, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: -0.5, },
        })
        topic.publish(message)
    }

    function stop() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 0, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: 0, },
        })
        topic.publish(message)
    }

    function jail_mode(){
        jmode = true
    }

    function perimetral_move(){
        limit = [5, -5]
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 1, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: 0, },
        })
        topic.publish(message)
    }
});