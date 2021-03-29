class Punto:
  
  """ 
  Características de los puntos
  """

  def __init__(self, no, pos_x, pos_y, ori_z, ori_w):
    self.__nombre = no
    self.__posicion_x = pos_x
    self.__posicion_y = pos_y
    self.__orientacion_z = ori_z
    self.__orientacion_w = ori_w

  def datos_punto(self):
        """Obtenemos los datos del Punto
        Returns:
            nombre: nombre del punto(futura Zona)
            posicion x: corresponde con la coordenada x
            posicion y: corresponde con la coordenada y
            orientacion z: orientación de z que debe seguir
            orientacion w: orientación de w que debe seguir
        """
        return (self.__nombre,self.__posicion_x,self.__posicion_y,self.__orientacion_z,self.__orientacion_w)

  def get_nombre(self):
        """Obtenemos el nombre de un punto

        Returns:
            nombre: nombre del punto(futura Zona)
        """
        return self.__nombre
    

  def get_posicion_x(self):
        """Obtenemos la posicion x

        Returns:
            posicion_x: coordenada x
        """
        return self.__posicion_x
    

  def get_posicion_y(self):
        """Obtenemos la posicion y

        Returns:
            posicion_y: coordenada y
        """
        return self.__posicion_y
    
    
  def get_posicion_punto(self):
        """Obtenemos la posicion del punto

        Returns:
            posicion: lista que contiene la x , y
        """
        posicion = [self.__posicion_x,self.__posicion_y]

        return posicion
    

  def get_orientacion_w(self):
        """Obtenemos la orientacion w

        Returns:
            orientacion_w: parte w de la orientacion a seguir
        """
        return self.__orientacion_w
    

  def get_orientacion_z(self):
        """Obtenemos la orientacion z

        Returns:
            orientacion_z: parte z de la orientacion a seguir
        """
        return self.__orientacion_z
    

  def get_orientacion(self):
        """Obtenemos la orientacion a seguir para llegar al siguiente punto

        Returns:
            orientacion: lista que contiene la z , w
        """
        orientacion = [self.__orientacion_z,self.__orientacion_w]

        return orientacion
    


#--- main() ---
#Punto1 = Punto(no= "Laboratorio", pos_x=1, pos_y=2, ori_z=5, ori_w=5)
#a = Punto1.datos_punto()
#print(a)



