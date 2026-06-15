<?php
// api/projetos.php - projetos PUBLICADOS do Portfolio em JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require __DIR__ . '/../conexao.php';

try {
    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicado' ORDER BY ano DESC, id";
    $projetos = $pdo->query($sql)->fetchAll();

    echo json_encode($projetos);

} catch (PDOException $e) {
    // Define o código HTTP para 500 (Erro Interno do Servidor)
    http_response_code(500);
    
    // Devolve a mensagem de erro formatada em JSON
    echo json_encode([
        "erro" => "Falha ao buscar projetos no banco de dados.",
        "detalhes" => $e->getMessage()
    ]);
}