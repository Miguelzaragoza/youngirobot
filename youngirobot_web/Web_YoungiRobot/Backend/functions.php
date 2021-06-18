<?php
header('Content-Type: text/html;charset=utf-8' );

function ejecutarComandoSQL($commando){
    $mysqli = new mysqli("localhost", "root", "", "bbdd_youngirobot");
    //$mysqli = new mysqli("localhost", "lamesed1_prueba1", "4cMulGcHvHP6", "lamesed1_prueba1");
    if($mysqli->connect_errno){
        printf("Connect failed: %s\n", $mysqli->connect_error);
        exit();
    }
    
    if($mysqli->multi_query($commando)){
        if($resultset = $mysqli->store_result()){
            while($row = $resultset->fetch_array(MYSQLI_BOTH)){
                
            }
            $resultset->free();
        }
    }
    
    $mysqli->close();
}

function getSQLResultSet($commando){
    $mysqli = new mysqli("localhost", "root", "", "bbdd_youngirobot");
    //$mysqli = new mysqli("localhost", "lamesed1_prueba1", "4cMulGcHvHP6", "lamesed1_prueba1");
    if($mysqli->connect_errno){
        printf("Connect failed: %s\n", $mysqli->connect_error);
        exit();
    }
    if($mysqli->multi_query($commando)){
        return $mysqli->store_result();
    }
}
