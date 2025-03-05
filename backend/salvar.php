<?php
// Habilita a exibição de erros
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Inclui o arquivo de conexão com o banco de dados
require 'conexao.php';

// Recebe os dados do formulário
$title = $_POST['title'];
$contentName = $_POST['contentName'];
$contentType = $_POST['contentType'];

try {
    // Prepara a query para inserir os dados
    $sql = "INSERT INTO conteudos (title, contentName, contentType) VALUES (:title, :contentName, :contentType)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':title' => $title,
        ':contentName' => $contentName,
        ':contentType' => $contentType
    ]);

    echo "✅ Dados salvos com sucesso!";
} catch (PDOException $e) {
    echo "❌ Erro ao salvar os dados: " . $e->getMessage();
}
?>