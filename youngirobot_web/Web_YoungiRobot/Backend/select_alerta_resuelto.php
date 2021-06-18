<?php
include('gb_conn');
include('functions.php');

if($resultset=getSQLResultSet("SELECT * FROM `alertas` WHERE `Resuelto`=0")){
        while($row = $resultset->fetch_array()){
            //echo json_encode($row);
            //echo $fecha;
               
            $id_alertas= $row['Id_Alertas'];
            $Tipo= $row['Tipo'];
            $Hora= $row['Hora'];
            $Dia= $row['Dia'];
            $Resuelto= $row['Resuelto'];
        
            $alerta[] = array('id_alertas'=> $id_alertas, 'tipo' => $Tipo, 'hora' => $Hora, 'dia' => $Dia,'resuelto' => $Resuelto); 
            
    }
    echo json_encode($alerta);
}else{
    echo("No funciona");
}
?>