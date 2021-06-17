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