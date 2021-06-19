#!/usr/bin/env python
"""
def publish_once_in_led_out():

    while not ctrl_c == False:
        connections = rospy.Publisher('/led_out', Byte , queue_size=1)
        if connections > 0:
            rospy.Publisher('/led_out', Byte, queue_size=1).publish(())
        else:
            rospy.Rate(10)


publish_once_in_led_out()

"""

import rospy
from std_msgs.msg import Byte


pub = rospy.Publisher('led_out', Byte, queue_size=10)
rospy.init_node('led_out')

r = rospy.Rate(10) # 10hz
while not rospy.is_shutdown():
    pub.publish(10)
    r.sleep()