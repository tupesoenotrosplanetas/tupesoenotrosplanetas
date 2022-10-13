<?php
	$destino = "lapfilms7@gmail.com";
	$nombre = $_POST["nombre"];
	$correo = $_POST["correo"];
	$asunto = $_POST["asunto"];
	$mensaje = $_POST["mensaje"];
	$contenido = "Nombre: " . $nombre . "\nCorreo: " . $correo . "\nAsunto: " . $asunto . "\nMensaje " . $mensaje;
	mail($destino,$asunto,$contenido);
	header("Location:thanks.html");
?>