document.getElementById('contentForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Pega os dados do formulário
    const title = document.getElementById('title').value;
    const contentName = document.getElementById('contentName').value;
    const contentType = document.querySelector('input[name="contentType"]:checked').value;

    // Configuração do Supabase
    const SUPABASE_URL = 'https://gtfxykzxnwubjmcsuedy.supabase.co'; // Substitua pelo seu URL
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Znh5a3p4bnd1YmptY3N1ZWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0ODE5NDAsImV4cCI6MjA1NTA1Nzk0MH0.lQZHsu2H5SYlnpOBwogZQIPMb48gLBcxs4XC2hpDKgI'; // Substitua pela sua chave

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

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gtfxykzxnwubjmcsuedy.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)