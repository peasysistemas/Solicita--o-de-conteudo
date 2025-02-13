document.getElementById('contentForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Pega os dados do formulário
    const title = document.getElementById('title').value;
    const contentName = document.getElementById('contentName').value;
    const contentType = document.querySelector('input[name="contentType"]:checked').value;

    // Configuração do Supabase
    const SUPABASE_URL = 'https://SEU_SUPABASE_URL.supabase.co'; // Substitua pelo seu URL do Supabase
    const SUPABASE_KEY = 'SUA_SUPABASE_KEY'; // Substitua pela sua chave do Supabase

    // Envia os dados para o Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/conteudos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({ title, contentName, contentType })
    });

    // Exibe uma mensagem para o usuário
    const messageElement = document.getElementById('message');
    if (response.ok) {
        messageElement.textContent = 'Dados enviados com sucesso! 🎉';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = 'Erro ao enviar os dados. Tente novamente.';
        messageElement.style.color = 'red';
    }
});