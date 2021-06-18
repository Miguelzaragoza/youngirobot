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
            setCamera()
        })
        data.ros.on("error", (error) => {
            document.getElementById("conexion").innerHTML="Se ha producido algun error mientras se intentaba realizar la conexion"
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
        })
        data.ros.on('close', () => {
            data.connected = false
            console.log('Connection to ROSBridge was closed!')
              document.getElementById("divCamera").innerHTML = ""
        })
    }

    function disconnect(){
	      data.ros.close()        
	      data.connected = false
        console.log('Clic en botón de desconexión')
    }    
   
    function setCamera(){
        console.log("setting the camera")
        let viewer1 = new MJPEGCANVAS.Viewer({
            divID: "divCamera", //elemento del html donde mostraremos la cámara
            host: "127.0.0.1:8080", //dirección del servidor de vídeo
            width: 320, //no pongas un tamaño mucho mayor porque puede dar error
            height: 240,
            topic: "/turtlebot3/camera/image_raw",
            ssl: false,
        })
    }
});