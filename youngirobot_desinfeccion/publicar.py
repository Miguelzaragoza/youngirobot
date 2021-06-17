#!/usr/bin/env python

import rospy
from std_msgs.msg import Byte

#rostopic pub /led_out std_msgs/Byte "data: 10"

                
def publish_once_in_led_out():
    """
    This is because publishing in topics sometimes fails the first time you publish.
    In continuos publishing systems there is no big deal but in systems that publish only
    once it IS very important.
    """


    pub = rospy.Publisher('led_out', Byte, queue_size=10)
    rospy.init_node('led_out')

    r = rospy.Rate(10) # 10hz
    if pub > 0:
        print(" He entrado")
        pub.publish(10)
    else:
        r.sleep()


publish_once_in_led_out()
