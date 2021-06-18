<?php
include('gb_conn');
include('functions.php');

if($resultset=getSQLResultSet("SELECT * FROM `incidencias`")){
        while($row = $resultset->fetch_array()){
            
            //echo $fecha;
               
                $id_incidencia= $row['Id_Incidencia'];
                $sector= $row['Sector'];
                $Hora= $row['Hora'];
                $Dia= $row['Dia'];
            
                $incidencia[] = array('id_incidencia'=> $id_incidencia, 'sector' => $sector, 'hora' => $Hora, 'dia' => $Dia); 
                
        }
        echo json_encode($incidencia);
}else{
    echo("No funciona");
}
?>