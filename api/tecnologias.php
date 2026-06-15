<?php
// api/tecnologias.php - catalogo de tecnologias ATIVAS em JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require __DIR__ . '/../conexao.php';

try {
    $sql = "SELECT id, nome, categoria, descricao, ano_criacao FROM tecnologias WHERE status = 'ativo' ORDER BY categoria, nome";
    $tecnologias = $pdo->query($sql)->fetchAll();

    echo json_encode($tecnologias);

} catch (PDOException $e) {
    // Define o código HTTP para 500 (Erro Interno do Servidor)
    http_response_code(500);
    
    // Devolve a mensagem de erro formatada em JSON
    echo json_encode([
        "erro" => "Falha ao buscar tecnologias no banco de dados.",
        "detalhes" => $e->getMessage()
    ]);
}