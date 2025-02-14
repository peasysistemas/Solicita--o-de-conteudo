// Importa a biblioteca do Supabase (se estiver usando npm ou módulos ES6)
import { createClient } from '@supabase/supabase-js';

// Configura o cliente do Supabase
const supabaseUrl = 'https://gtfxykzxnwubjmcsuedy.supabase.co'; // Substitua pelo seu URL do Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Znh5a3p4bnd1YmptY3N1ZWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0ODE5NDAsImV4cCI6MjA1NTA1Nzk0MH0.lQZHsu2H5SYlnpOBwogZQIPMb48gLBcxs4XC2hpDKgI'; // Substitua pela sua chave do Supabase
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
        .from('conteudos') // Nome da tabela no Supabase
        .insert([{ title, contentName, contentType }]); // Insere os dados na tabela

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