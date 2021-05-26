document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")
    
    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)

    document.getElementById("btn_start").addEventListener("click", send_goal)
    document.getElementById("btn_cancel").addEventListener("click", cancel_goal)
    
    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        // action information
          goal: null,
          action : {
              goal: {position: {x: 0, y: 0} },
              feedback: { 
              position:  {x: 0, y: 0},
                    state: ''
                },
              result: {success: false},
              status: {status: 0, text: ''},
          }    
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
   
    function send_goal(){

        //leemos los valores de la interfaz (suponemos que están en los siguientes campos)
        data.action.goal.position.x = parseFloat(document.getElementById("input_x").value)
          data.action.goal.position.y = parseFloat(document.getElementById("input_y").value)
      
        //definimos un ActionClient para el /move_base
          let action_client = new ROSLIB.ActionClient({
              ros: data.ros,
              serverName: "/move_base",
              actionName: "move_base_msgs/MoveBaseAction"
          })
      
        //definimos el mensaje Goal que enviaremos al servidor
          data.goal = new ROSLIB.Goal({
              actionClient: action_client,
              goalMessage:{
                   target_pose : {
                      header : {
                          frame_id: 'map'
                      },
                      pose : {
                          position: data.action.goal.position,
                          orientation: {x: 0, y: 0, z: 0, w: 1}
                      }
                  },
              }		    
          })
      
        //definimos los callacks
          data.goal.on('status', (status) => {
              data.action.status = status
          })
      
          data.goal.on('feedback', (feedback) => {
              data.action.feedback = feedback.base_position.pose
          })
      
        data.goal.on('result', (result) => {
              data.action.result = result
          })
      
        //enviamos el mensaje
          data.goal.send()
      }

    function cancel_goal(){
        data.goal.cancel()
    }
});