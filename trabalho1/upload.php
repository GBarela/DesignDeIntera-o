<?php
$src = $_FILES["image"]["tmp_name"];
$imageName = $_FILES["image"]["name"];
$imageExtension = explode('.', $imageName);
$imageExtension = strtolower(end($imageExtension));
$newImageName = uniqid() . "." . $imageExtension;
$targ = "img/" . $newImageName;
move_uploaded_file($src, $targ);

echo $targ; 
?>