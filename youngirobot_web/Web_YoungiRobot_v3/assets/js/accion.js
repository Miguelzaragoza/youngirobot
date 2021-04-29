document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")
    cambiarTextoConectado("Desconectado.", "#8F8F8F")

    document.getElementById("btn_enviar_bano").addEventListener("click", send_goal)
    document.getElementById("btn_enviar_hab").addEventListener("click", send_goal1)
    document.getElementById("btn_enviar_lab").addEventListener("click", send_goal2)
    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)



    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
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
        })
    }

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

});
