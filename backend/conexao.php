<?php
// backend/conexao.php
$host = 'mysql.hostinger.com.br'; // Host do banco de dados
$dbname = 'u705566214_solicitacao'; // Nome do banco de dados
$username = 'u705566214_solicitacao1'; // Usuário do banco de dados
$password = 'Solicita123'; // Senha do banco de dados

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Conexão com o banco de dados realizada com sucesso!";
} catch (PDOException $e) {
    die("❌ Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>