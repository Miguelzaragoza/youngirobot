#! /usr/bin/env python

import math
import rospy
from smach import State,StateMachine
from time import sleep
import smach_ros
import actionlib
from punto import Punto
from geometry_msgs.msg import PoseStamped, PoseWithCovarianceStamped
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal, MoveBaseResult


class Iniciar(State):
    """
  Estado Inicial

  Attributes:
  
  Methods:
    execute(): Recoje por pantalla a que estdo quieres canviar

    """
    def __init__(self):
        """ 
        Inicializa el estado y publica la posición inicial del robot

        """
        State.__init__(self, outcomes=['1','0'], input_keys=['input'], output_keys=[''])
        pose_publisher = rospy.Publisher('/initialpose', PoseWithCovarianceStamped, queue_size=10)
        posicion_inicial = PoseWithCovarianceStamped()
        posicion_inicial.pose.pose.orientation.w = 1
        posicion_inicial.pose.pose.position.x = -1.75
        posicion_inicial.pose.pose.position.y = 1.75
        posicion_inicial.pose.pose.position.z = 0
        posicion_inicial.header.frame_id = 'map'
        pose_publisher.publish(posicion_inicial)

    def execute(self, userdata):
        """ 
        Canvia de estado si el parametro de entra es uno sino fin del programa
        
        """
        sleep(1)
        if userdata.input == 1:
             return '1'
        else:
             return '0'
class Esperar(State):
    """
  Estado Esperar

  Attributes:
  
  Methods:
    execute(): Recoje por pantalla a que estdo quieres canviar

    """
    def __init__(self):
        """ 
        Inicializa el estado
        """
        State.__init__(self, outcomes=['1','0'], input_keys=['input'], output_keys=[''])

    def execute(self, userdata):
        """ 
        Da a elgir al usuario que estado quiere canviar y devuelve el valor como consecuencia
        
        """
        sleep(1)
        sm.userdata.sm_input = int(input('Que quieres hacer? 1(navegacionindicada)/0(navegacionautonoma): '))
        if(userdata.input == 0 or userdata.input == 1):
            if userdata.input == 1:
                return '1'
            else:
                return '0'
        else:
            return '0'
            raise ValueError("Error al introduccir el valor")
class Navegacion_indicada(State):
    """
  Estado navegacion indicada

  Attributes:
  
  Methods:
    execute(): da a escojer al usuario a que punto quiere ir y recoje por pantalla a que estado quieres canviar
    mover_robot_a_punto():se le pasa un punto y manda una accion para mover al robot a ese punto

    """
    def __init__(self):
        """ 
        Inicializa el estado y publica la posición inicial del robot
        
        """
        State.__init__(self, outcomes=['1','0'], input_keys=['input'], output_keys=[''])

    def execute(self, userdata):
        """ 
        Da a elegir al usuario que punto quiere ir i manda el punto a la funcion mover_punto_robot()
        
        """
        sleep(1)
        # --- main() ---
        print("Pulsa 1 para ir al Laboratorio")
        print("Pulsa 2 para ir a la Habitacion 321")    
        print("Pulsa 3 para ir a los Banyos")
        print("------------------------------------------")
        numero = int(input('Elija una opcion: '))

        if numero == 1:
            Punto_Lab = Punto(no= "Laboratorio", pos_x=-2.0, pos_y=-4.0, ori_z=0.0, ori_w=1.0)

            Punto_Lab_Real = Punto(no= "Laboratorio", pos_x=-0.5, pos_y=1, ori_z=0.0, ori_w=1.0) # Habitacion 1
            Punto_Delante_Lab_Real = Punto(no= "Laboratorio", pos_x=-0.2, pos_y=0.25, ori_z=0.0, ori_w=1.0) # Delante Habitacion 1
            mover_habitacion1 = [Punto_Delante_Lab_Real, Punto_Lab_Real]

            
            for i in mover_habitacion1:
                self.mover_robot_a_punto(i)

            Punto_1_Hab1 = Punto(no= "Laboratorio", pos_x=-0.25, pos_y=1, ori_z=0.0, ori_w=1.0)
            Punto_2_Hab1 = Punto(no= "Laboratorio", pos_x=-0.5, pos_y=1.5, ori_z=0.0, ori_w=1.0)
            Punto_3_Hab1 = Punto(no= "Laboratorio", pos_x=-1, pos_y=1.25, ori_z=0.0, ori_w=1.0)
            Punto_4_Hab1 = Punto(no= "Laboratorio", pos_x=-0.5, pos_y=0.75, ori_z=0.0, ori_w=1.0)
            ruta_limpieza_habitacion1 = [Punto_1_Hab1,Punto_2_Hab1,Punto_3_Hab1,Punto_4_Hab1]

            print("Pulsa 1 para desinfectar habitacion")
            print("Pulsa 2 para cancelar")    
            print("------------------------------------------")
            variable = int(input('Elija una opcion: '))

            if variable == 1:
                for i in ruta_limpieza_habitacion1:
                    self.mover_robot_a_punto(i)



            
            print("---------- Moviendo robot ----------")
            condicion_opciones = True

        if numero == 2:
            Punto_Hab_321 = Punto(no= "Habitacion 321", pos_x=2.5, pos_y=-4.0, ori_z=0.0, ori_w=1.0)

            Punto_Hab_321_Real = Punto(no= "Habitacion 321", pos_x=0.0, pos_y=1.75, ori_z=0.0, ori_w=1.0) # Habitacion 2
            Punto_Delante_Hab_321_Real = Punto(no= "Habitacion 321", pos_x=0.5, pos_y=0.75, ori_z=0.0, ori_w=1.0) # Delante Habitacion 2
            mover_habitacion2 = [Punto_Delante_Hab_321_Real, Punto_Hab_321_Real]
            for i in mover_habitacion2:
                self.mover_robot_a_punto(i)

            Punto_1_Hab2 = Punto(no= "Laboratorio", pos_x=0.5, pos_y=1.75, ori_z=0.0, ori_w=1.0)
            Punto_2_Hab2 = Punto(no= "Laboratorio", pos_x=0, pos_y=2, ori_z=0.0, ori_w=1.0)
            Punto_3_Hab2 = Punto(no= "Laboratorio", pos_x=-0.25, pos_y=1.75, ori_z=0.0, ori_w=1.0)
            Punto_4_Hab2 = Punto(no= "Laboratorio", pos_x=0, pos_y=1.5, ori_z=0.0, ori_w=1.0)
            ruta_limpieza_habitacion2 = [Punto_1_Hab2,Punto_2_Hab2,Punto_3_Hab2,Punto_4_Hab2]


            print("Pulsa 1 para desinfectar habitacion")
            print("Pulsa 2 para cancelar")    
            print("------------------------------------------")
            variable = int(input('Elija una opcion: '))

            if variable == 1:
                for i in ruta_limpieza_habitacion2:
                    self.mover_robot_a_punto(i)

            
            print("---------- Moviendo robot ----------")
            condicion_opciones = True

        if numero == 3:
            Punto_Banyos = Punto(no= "Banyos", pos_x=4.0, pos_y=-4.0, ori_z=0.0, ori_w=1.0)

            Punto_Banyos_Real = Punto(no= "Banyos", pos_x=1, pos_y=2.5, ori_z=0.0, ori_w=1.0) # Habitacion 3
            Punto_Delante_Banyos_Real = Punto(no= "Banyos", pos_x=1.0, pos_y=1.25, ori_z=0.0, ori_w=1.0) # Delante Habitacion 3
            #Punto_Orientacion_Banyos_Real = Punto(no= "Banyos", pos_x=0.0, pos_y=0.0, ori_z=math.sin(math.pi), ori_w=math.cos(math.pi)) # Delante Habitacion 3
            mover_habitacion3 = [Punto_Delante_Banyos_Real, Punto_Banyos_Real]
            for i in mover_habitacion3:
                self.mover_robot_a_punto(i)

            Punto_1_Hab3 = Punto(no= "Laboratorio", pos_x=1.25, pos_y=2.25, ori_z=0.0, ori_w=1.0)
            Punto_2_Hab3 = Punto(no= "Laboratorio", pos_x=1, pos_y=2.75, ori_z=0.0, ori_w=1.0)
            Punto_3_Hab3 = Punto(no= "Laboratorio", pos_x=0.45, pos_y=2.5, ori_z=0.0, ori_w=1.0)
            Punto_4_Hab3 = Punto(no= "Laboratorio", pos_x=1, pos_y=2, ori_z=0.0, ori_w=1.0)
            ruta_limpieza_habitacion3 = [Punto_1_Hab3,Punto_2_Hab3,Punto_3_Hab3,Punto_4_Hab3]

            print("Pulsa 1 para desinfectar habitacion")
            print("Pulsa 2 para cancelar")    
            print("------------------------------------------")
            variable = int(input('Elija una opcion: '))

            if variable == 1:
                for i in ruta_limpieza_habitacion3:
                    self.mover_robot_a_punto(i)

            print("---------- Moviendo robot ----------")
            condicion_opciones = True
        sm.userdata.sm_input = int(input('Que quieres hacer? 0(Esperar)/1(navegacionautonoma): '))
        if(userdata.input == 0 or userdata.input == 1):
            if userdata.input == 1:
                return '1'
            else:
                return '0'
        else:
            return '0'
            raise ValueError("Error al introduccir el valor")

    def mover_robot_a_punto(self, punto):
        """ 
        Publica en la accion movebase el punto para que vaya hasta el 
        
        """

        #rospy.init_node('fsm')

        rate = rospy.Rate(2)
        move = MoveBaseGoal()

        move.target_pose.header.frame_id = 'map'
        move.target_pose.pose.position.x = punto.get_posicion_x()
        move.target_pose.pose.position.y = punto.get_posicion_y()
        move.target_pose.pose.position.z = 0.0
        move.target_pose.pose.orientation.x = 0.0
        move.target_pose.pose.orientation.y = 0.0
        move.target_pose.pose.orientation.z = punto.get_orientacion_z()
        move.target_pose.pose.orientation.w = punto.get_orientacion_w()

        client = actionlib.SimpleActionClient('/move_base', MoveBaseAction)  # se crea el cliente de la accion
        client.wait_for_server()  # esperamos a que el servidor este activo

        client.send_goal(move)  # enviamos el goal
        rospy.loginfo("Enviado el goal...")
        client.wait_for_result()  # esperamos el resultado
        #print('Resultado: %f'%(client.get_result())) # imprime el resultado

class Navegacion_autonoma(State):
    """
  Estado navegacion autonoma

  Attributes:
  
  Methods:
    execute(): da a escojer al usuario a que ruta quiere ir y recoje por pantalla a que estado quieres canviar
    mover_robot_a_punto():se le pasa un punto o varios y manda una accion para mover al robot a esos puntos

    """
    
    def __init__(self):
        """ 
        Inicializa el estado
        
        """
        State.__init__(self, outcomes=['1','0'], input_keys=['input'], output_keys=[''])

    def mover_robot_a_punto(self, punto):
        """ 
        Publica en la accion movebase el punto para que vaya hasta el 
        
        """

        #rospy.init_node('fsm')

        rate = rospy.Rate(2)
        move = MoveBaseGoal()

        move.target_pose.header.frame_id = 'map'
        move.target_pose.pose.position.x = punto.get_posicion_x()
        move.target_pose.pose.position.y = punto.get_posicion_y()
        move.target_pose.pose.position.z = 0.0
        move.target_pose.pose.orientation.x = 0.0
        move.target_pose.pose.orientation.y = 0.0
        move.target_pose.pose.orientation.z = punto.get_orientacion_z()
        move.target_pose.pose.orientation.w = punto.get_orientacion_w()

        client = actionlib.SimpleActionClient('/move_base', MoveBaseAction)  # se crea el cliente de la accion
        client.wait_for_server()  # esperamos a que el servidor este activo

        client.send_goal(move)  # enviamos el goal
        rospy.loginfo("Enviado el goal...")
        client.wait_for_result()  # esperamos el resultado
        #print('Resultado: %f'%(client.get_result())) # imprime el resultado

    def execute(self, userdata):
        """ 
        Da a elegir al usuario que ruta quiere ir i manda los puntos a la funcion mover_punto_robot()
        
        """
        sleep(1)
        # --- main() ---
        print("Pulsa 1 para realizar la ruta manyanera")
        print("Pulsa 2 para realizar la ruta del medio dia")
        print("Pulsa 3 para realizar la ruta nocturna")
        print("------------------------------------------")
        numero = int(input('Elija una opcion: '))

        Punto_Lab = Punto(no= "Laboratorio",pos_x=-2.0, pos_y=-4.0, ori_z=0.0, ori_w=1.0)
        Punto_Hab_321 = Punto(no= "Habitacion 321", pos_x=2.5, pos_y=-4.0, ori_z=0.0, ori_w=1.0)
        Punto_Banyos = Punto(no= "Banyos", pos_x=4.0, pos_y=-4.0, ori_z=0.0, ori_w=1.0)

        Punto_Lab_Real = Punto(no= "Laboratorio", pos_x=-0.5, pos_y=1, ori_z=0.0, ori_w=1.0) # Habitacion 1
        Punto_Delante_Lab_Real = Punto(no= "Laboratorio", pos_x=-0.2, pos_y=0.25, ori_z=0.0, ori_w=1.0) # Delante Habitacion 1
        Punto_1_Hab1 = Punto(no= "Laboratorio", pos_x=-0.25, pos_y=1, ori_z=0.0, ori_w=1.0)
        Punto_2_Hab1 = Punto(no= "Laboratorio", pos_x=-0.5, pos_y=1.5, ori_z=0.0, ori_w=1.0)
        Punto_3_Hab1 = Punto(no= "Laboratorio", pos_x=-1, pos_y=1.25, ori_z=0.0, ori_w=1.0)
        Punto_4_Hab1 = Punto(no= "Laboratorio", pos_x=-0.5, pos_y=0.75, ori_z=0.0, ori_w=1.0)
        mover_habitacion1 = [Punto_Delante_Lab_Real, Punto_Lab_Real,Punto_1_Hab1,Punto_2_Hab1,Punto_3_Hab1,Punto_4_Hab1]

        Punto_Hab_321_Real = Punto(no= "Habitacion 321", pos_x=0.0, pos_y=1.75, ori_z=0.0, ori_w=1.0) # Habitacion 2
        Punto_Delante_Hab_321_Real = Punto(no= "Habitacion 321", pos_x=0.5, pos_y=0.75, ori_z=0.0, ori_w=1.0) # Delante Habitacion 2
        Punto_1_Hab2 = Punto(no= "Laboratorio", pos_x=0.5, pos_y=1.75, ori_z=0.0, ori_w=1.0)
        Punto_2_Hab2 = Punto(no= "Laboratorio", pos_x=0, pos_y=2, ori_z=0.0, ori_w=1.0)
        Punto_3_Hab2 = Punto(no= "Laboratorio", pos_x=-0.25, pos_y=1.75, ori_z=0.0, ori_w=1.0)
        Punto_4_Hab2 = Punto(no= "Laboratorio", pos_x=0, pos_y=1.5, ori_z=0.0, ori_w=1.0)
        mover_habitacion2 = [Punto_Delante_Hab_321_Real, Punto_Hab_321_Real,Punto_1_Hab2,Punto_2_Hab2,Punto_3_Hab2,Punto_4_Hab2]

        Punto_Banyos_Real = Punto(no= "Banyos", pos_x=1, pos_y=2.5, ori_z=0.0, ori_w=1.0) # Habitacion 3
        Punto_Delante_Banyos_Real = Punto(no= "Banyos", pos_x=1.0, pos_y=1.25, ori_z=0.0, ori_w=1.0) # Delante Habitacion 3
        Punto_1_Hab3 = Punto(no= "Laboratorio", pos_x=1.25, pos_y=2.25, ori_z=0.0, ori_w=1.0)
        Punto_2_Hab3 = Punto(no= "Laboratorio", pos_x=1, pos_y=2.75, ori_z=0.0, ori_w=1.0)
        Punto_3_Hab3 = Punto(no= "Laboratorio", pos_x=0.45, pos_y=2.5, ori_z=0.0, ori_w=1.0)
        Punto_4_Hab3 = Punto(no= "Laboratorio", pos_x=1, pos_y=2, ori_z=0.0, ori_w=1.0)
        mover_habitacion3 = [Punto_Delante_Banyos_Real, Punto_Banyos_Real,Punto_1_Hab3,Punto_2_Hab3,Punto_3_Hab3,Punto_4_Hab3]

        ruta_manyanera = [Punto_Delante_Lab_Real, Punto_Lab_Real,Punto_1_Hab1,Punto_2_Hab1,Punto_3_Hab1,Punto_4_Hab1,Punto_Delante_Hab_321_Real, Punto_Hab_321_Real,Punto_1_Hab2,Punto_2_Hab2,Punto_3_Hab2,Punto_4_Hab2]
        ruta_medio_dia = [Punto_Delante_Hab_321_Real, Punto_Hab_321_Real,Punto_1_Hab2,Punto_2_Hab2,Punto_3_Hab2,Punto_4_Hab2, Punto_Delante_Banyos_Real, Punto_Banyos_Real,Punto_1_Hab3,Punto_2_Hab3,Punto_3_Hab3,Punto_4_Hab3]
        ruta_nocturna = [Punto_Delante_Banyos_Real, Punto_Banyos_Real,Punto_1_Hab3,Punto_2_Hab3,Punto_3_Hab3,Punto_4_Hab3,Punto_Delante_Lab_Real, Punto_Lab_Real,Punto_1_Hab1,Punto_2_Hab1,Punto_3_Hab1,Punto_4_Hab1]

        if numero == 1:
            for i in ruta_manyanera:
                self.mover_robot_a_punto(i)
            print("---------- Moviendo robot ----------")
            condicion_opciones = True

        if numero == 2:
            for i in ruta_medio_dia:
                self.mover_robot_a_punto(i)
            print("---------- Moviendo robot ----------")
            condicion_opciones = True

        if numero == 3:
            for i in ruta_nocturna:
                self.mover_robot_a_punto(i)
            print("---------- Moviendo robot ----------")
            condicion_opciones = True
        sm.userdata.sm_input = int(input('Que quieres hacer? 1(navegacionindicada)/0(Esperar): '))
        if(userdata.input == 0 or userdata.input == 1):
            if userdata.input == 1:
                return '1'
            else:
                return '0'
        else:
            return '0'
            raise ValueError("Error al introduccir el valor")
                    
try:
  rospy.init_node('test_fsm', anonymous=True)
  
  sm = StateMachine(outcomes=['success'])
  sm.userdata.sm_input = 1
  with sm:
    iniciar = int(input("Quieres iniciar el robot? 1/0:"))
    if(iniciar == 0 or iniciar == 1):
        if(iniciar == 1):
            StateMachine.add('Iniciar', Iniciar(), transitions={'1':'Esperar','0':'Iniciar'}, remapping={'input':'sm_input','output':'input'})
            StateMachine.add('Esperar', Esperar(), transitions={'1':'Navegacion_indicada','0':'Navegacion_autonoma'}, remapping={'input':'sm_input','output':'input'})
            StateMachine.add('Navegacion_indicada', Navegacion_indicada(), transitions={'0':'Esperar','1':'Navegacion_autonoma'}, remapping={'input':'sm_input','output':'input'})
            StateMachine.add('Navegacion_autonoma', Navegacion_autonoma(), transitions={'1':'Navegacion_indicada','0':'Esperar'}, remapping={'input':'sm_input','output':'input'})
        else:
            print("No se ha ejecutado el programa, vuelve a ejecutarlo")
        sis = smach_ros.IntrospectionServer('server_name', sm, '/SM_ROOT')
        sis.start()
        sm.execute()
        rospy.spin()
        sis.stop()
    else:
        raise ValueError("Error al introduccir el valor")
        
except ValueError as error:
  print("Se ha producido un error " + str(error))
  rospy.spin()
