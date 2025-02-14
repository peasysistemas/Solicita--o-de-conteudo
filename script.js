// Configura o cliente do Supabase
const supabaseUrl = 'https://javiwdktsxlfglchpqqb.supabase.co'; // Substitua pelo seu URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphdml3ZGt0c3hsZmdsY2hwcXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0OTczNDcsImV4cCI6MjA1NTA3MzM0N30.Z4uI0kFPzR6glCOab4Dn5FoAIbb3cFeUBWezrPELgyM'; // Substitua pela sua chave
const supabase = createClient(supabaseUrl, supabaseKey);

// Função para enviar os dados do formulário
document.getElementById('contentForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Pega os dados do formulário
    const title = document.getElementById('title').value;
    const contentName = document.getElementById('contentName').value;
    const contentType = document.querySelector('input[name="contentType"]:checked').value;

    // Envia os dados para o Supabase
    const { data, error } = await supabase
        .from('conteudos') // Nome da tabela
        .insert([{ title, contentName, contentType }]); // Insere os dados

    // Exibe uma mensagem para o usuário
    const messageElement = document.getElementById('message');
    if (!error) {
        messageElement.textContent = 'Dados enviados com sucesso! 🎉';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = 'Erro ao enviar os dados. Tente novamente.';
        messageElement.style.color = 'red';
        console.error(error); // Log do erro no console
    }
});