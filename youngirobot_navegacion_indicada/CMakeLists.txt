cmake_minimum_required(VERSION 3.0.2)
project(youngirobot_navegacion_indicada)

find_package(catkin REQUIRED COMPONENTS
  rospy
  move_base_msgs
  geometry_msgs
)

###################################
## catkin specific configuration ##
###################################

catkin_package(
  CATKIN_DEPENDS rospy
)

###########
## Build ##
###########

include_directories(
  ${catkin_INCLUDE_DIRS}
)