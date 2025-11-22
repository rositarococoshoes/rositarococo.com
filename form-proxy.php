<?php
// Configuración básica
header('Content-Type: application/json');

// URL del formulario de Google
$googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd_KUORaRPQHoCM6B0GGp_fqI5eiAH0KM2Iwj1mXTgGEjawnQ/formResponse';

// Función para verificar si es spam
function isSpam($data) {
    // 1. Verificar si el campo landingurl está vacío
    if (empty($data['entry.1209868979'])) {
        logSpamAttempt('Empty landing URL');
        return true;
    }
    
    // 2. Verificar si el campo honeypot está lleno
    if (!empty($data['website'])) {
        logSpamAttempt('Honeypot field filled');
        return true;
    }
    
    // 3. Verificar si hay datos de productos seleccionados
    if (empty($data['entry.1471599855'])) {
        logSpamAttempt('No products selected');
        return true;
    }
    
    // 4. Verificar si los campos obligatorios están presentes
    $requiredFields = [
        'entry.1460904554', // Nombre
        'entry.1465946249', // Email
        'entry.53830725'    // WhatsApp
    ];
    
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            logSpamAttempt('Missing required field: ' . $field);
            return true;
        }
    }
    
    // 5. Verificar si la solicitud proviene de tu dominio (referer)
    if (!isset($_SERVER['HTTP_REFERER']) || 
        strpos($_SERVER['HTTP_REFERER'], 'rositarococo.com') === false) {
        logSpamAttempt('Invalid referer: ' . ($_SERVER['HTTP_REFERER'] ?? 'none'));
        return true;
    }
    
    return false;
}

// Función para registrar intentos de spam
function logSpamAttempt($reason) {
    $logFile = 'spam_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
    
    $logEntry = "$timestamp | IP: $ip | UA: $userAgent | Reason: $reason\n";
    
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}

// Verificar si es una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del formulario
    $formData = $_POST;
    
    // Verificar si es spam
    if (isSpam($formData)) {
        // Responder con un código de éxito para que el bot piense que funcionó
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Form submitted successfully']);
        exit;
    }
    
    // Preparar los datos para enviar a Google Forms
    $postData = http_build_query($formData);
    
    // Configurar la solicitud a Google Forms
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => $postData
        ]
    ];
    
    // Crear el contexto para la solicitud
    $context = stream_context_create($options);
    
    // Enviar la solicitud a Google Forms
    $result = file_get_contents($googleFormUrl, false, $context);
    
    // Verificar si la solicitud fue exitosa
    if ($result !== false) {
        // Responder con éxito
        echo json_encode(['success' => true, 'message' => 'Form submitted successfully']);
    } else {
        // Responder con error
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error submitting form']);
    }
} else {
    // Responder con error si no es una solicitud POST
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
