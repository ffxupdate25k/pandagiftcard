<?php

header("Content-Type: application/json");

// Read JSON
$data = json_decode(file_get_contents("php://input"), true);

// Admin settings
$token = $data["token"];
$endpoint = $data["endpoint"];

$network = $data["network"];
$amount = $data["amount"];
$phone = $data["phone"];

// Geodnatech payload
$payload = [
    "network" => (int)$network,
    "amount" => (int)$amount,
    "mobile_number" => $phone,
    "Ported_number" => true,
    "airtime_type" => "VTU"
];

$ch = curl_init($endpoint);

curl_setopt_array($ch,[
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Token ".$token,
        "Content-Type: application/json"
    ],
    CURLOPT_POSTFIELDS => json_encode($payload)
]);

$response = curl_exec($ch);
$http = curl_getinfo($ch,CURLINFO_HTTP_CODE);

curl_close($ch);

echo $response;
?>
