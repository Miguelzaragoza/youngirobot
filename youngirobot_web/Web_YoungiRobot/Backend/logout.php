<?php 
session_start();

session_unset();
session_destroy();

header("Location: http://localhost/Web_YoungiRobot_Sprint3/index.html");
?>