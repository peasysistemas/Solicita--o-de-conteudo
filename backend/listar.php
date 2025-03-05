<?php
// Habilita a exibição de erros apenas para log (evita poluir a resposta JSON)
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Inicia o buffer de saída para evitar caracteres indesejados
ob_start();

// Inclui a conexão com o banco de dados
require 'conexao.php';

// Define o cabeçalho para JSON puro
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET');

// Limpa qualquer saída inesperada antes do JSON
ob_clean();

try {
    // Executa a consulta ao banco
    $sql = "SELECT id, title, contentName, contentType FROM conteudos"; 
    $stmt = $pdo->query($sql);
    $conteudos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna os dados como JSON puro
    echo json_encode([
        'success' => true,
        'data' => $conteudos
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // Retorna erro formatado corretamente em JSON
    echo json_encode([
        'success' => false,
        'message' => "Erro ao buscar os dados: " . $e->getMessage()
    ]);
}

// Encerra o script para evitar saídas extras
exit;
?>
