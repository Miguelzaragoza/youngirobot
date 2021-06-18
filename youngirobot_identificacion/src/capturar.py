#!/usr/bin/env python
import rospy
import cv2
import numpy as np
from cv_bridge import CvBridge, CvBridgeError
from sensor_msgs.msg import Image

class Ros2OpenCVImageConverter():   

    def __init__(self):
    
        self.bridge_object = CvBridge()
        self.image_sub = rospy.Subscriber("/turtlebot3/camera/image_raw",Image,self.camera_callback)

    def camera_callback(self,data):

        try:
            # Seleccionamos bgr8 porque es la codificacion de OpenCV por defecto
            cv_image = self.bridge_object.imgmsg_to_cv2(data, desired_encoding="bgr8")
        except CvBridgeError as e:
            print(e)

        alto, ancho, canales = cv_image.shape        
        print("Ancho: " + str(ancho))
        print("Alto: " + str(alto))
        print("Canales: " + str(canales))

        detectar_rojo(cv_image)
        detectar_personas(cv_image)

def main():    
    img_converter_object = Ros2OpenCVImageConverter()
    rospy.init_node('Ros2OpenCVImageConverter', anonymous=True)
    
    try:
        rospy.spin()
    except KeyboardInterrupt:
        print("Fin del programa!")
    
    cv2.destroyAllWindows() 
    
def detectar_rojo(cv_image):
    img_hsv=cv2.cvtColor(cv_image, cv2.COLOR_BGR2HSV)

    lower_red = np.array([0,50,50])
    upper_red = np.array([10,255,255])
    mask0 = cv2.inRange(img_hsv, lower_red, upper_red)

    lower_red = np.array([170,50,50])
    upper_red = np.array([180,255,255])
    mask1 = cv2.inRange(img_hsv, lower_red, upper_red)

    mask = mask0+mask1

    output_img = cv_image.copy()
    output_img[np.where(mask==0)] = 0

    cv2.imshow('Detector de Colores Rojizos', output_img)
    cv2.waitKey(1)

def detectar_personas(cv_image):
    img_gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)

    fullbody_cascade = cv2.CascadeClassifier('/home/soft/catkin_ws/src/image_capture/src/clasificadores/haarcascade_fullbody.xml')

    personas = fullbody_cascade.detectMultiScale(img_gray, 1.1, 5)
    
    for (x,y,w,h) in personas:
        cv2.rectangle(cv_image,(x,y),(x+w,y+h),(255,0,0),2)
        roi_color = cv_image[y:y+h, x:x+w]
        cv2.imwrite("persona.png", cv_image)



    cv2.imshow('Detector de Personas', cv_image)
    cv2.waitKey(1)
    
    
if __name__ == '__main__':
    main()
