class Punto:

  def __init__(self, no, pos_x, pos_y, ori_z, ori_w):
    self.__nombre = no
    self.__posicion_x = pos_x
    self.__posicion_y = pos_y
    self.__orientacion_z = ori_z
    self.__orientacion_w = ori_w

  def datos_punto(self):
        return (self.__nombre,self.__posicion_x,self.__posicion_y,self.__orientacion_z,self.__orientacion_w)

  def get_nombre(self):
        return self.__nombre
    

  def get_posicion_x(self):
        return self.__posicion_x
    

  def get_posicion_y(self):
        return self.__posicion_y
    
    
  def get_posicion_punto(self):
        posicion = [self.__posicion_x,self.__posicion_y]

        return posicion
    

  def get_orientacion_w(self):
        return self.__orientacion_w
    

  def get_orientacion_z(self):
        return self.__orientacion_z
    

  def get_orientacion(self):
        orientacion = [self.__orientacion_z,self.__orientacion_w]

        return orientacion
    


#--- main() ---
#Punto1 = Punto(no= "Laboratorio", pos_x=1, pos_y=2, ori_z=5, ori_w=5)
#a = Punto1.datos_punto()
#print(a)