cmake_minimum_required(VERSION 3.0.2)
project(youngirobot_escaneo)

find_package(catkin REQUIRED COMPONENTS
  rospy
)

###################################
## catkin specific configuration ##
###################################
catkin_package(
#  INCLUDE_DIRS include
#  LIBRARIES youngirobot_escaneo
#  CATKIN_DEPENDS rospy
#  DEPENDS system_lib
)

###########
## Build ##
###########

include_directories(
# include
  ${catkin_INCLUDE_DIRS}
)