#!  /usr/bin/env python

import rospy
import actionlib
from geometry_msgs.msg import PoseStamped
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal, MoveBaseResult

rospy.init_node('move_to_goal')

rate = rospy.Rate(2)
move = MoveBaseGoal()

move.target_pose.header.frame_id = 'map'
move.target_pose.pose.position.x = -4.0
move.target_pose.pose.position.y = 2.0
move.target_pose.pose.position.z = 0.0
move.target_pose.pose.orientation.x = 0.0
move.target_pose.pose.orientation.y = 0.0
move.target_pose.pose.orientation.z = 0.0
move.target_pose.pose.orientation.w = 1.0

client = actionlib.SimpleActionClient('/move_base', MoveBaseAction)  # se crea el cliente de la accion
client.wait_for_server()  # esperamos a que el servidor este activo

client.send_goal(move)  # enviamos el goal
rospy.loginfo("Enviado el goal...")
client.wait_for_result()  # esperamos el resultado
