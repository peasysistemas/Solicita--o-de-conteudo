// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", async function () {
    // Inicializa o cliente do Supabase
    const supabaseUrl = 'https://wujbbsaziklpxeyphfel.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1amJic2F6aWtscHhleXBoZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0OTM5NzEsImV4cCI6MjA1NTA2OTk3MX0.lDt38pHeWax6T0JZG_FtZcrrjPxoqpDsKwJ3j8uajrI';

    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    console.log("✅ Supabase inicializado com sucesso!");

    // Captura o formulário e a mensagem de feedback
    const form = document.getElementById("contentForm");
    const messageElement = document.getElementById("message");

    // Adiciona evento ao formulário
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Captura os valores do formulário
        const title = document.getElementById("title").value.trim();
        const contentName = document.getElementById("contentName").value.trim();
        const contentType = document.querySelector('input[name="contentType"]:checked')?.value;

        // Validação simples dos campos
        if (!title || !contentName || !contentType) {
            messageElement.textContent = "⚠️ Preencha todos os campos!";
            messageElement.style.color = "red";
            return;
        }

        try {
            // Envia os dados para o Supabase
            const { data, error } = await supabase
                .from("conteudos") // Nome da tabela no Supabase
                .insert([{ title, contentName, contentType }]);

            if (error) throw error; // Se houver erro, lança exceção

            // Exibe mensagem de sucesso e limpa o formulário
            messageElement.textContent = "✅ Dados enviados com sucesso! 🎉";
            messageElement.style.color = "green";
            form.reset(); // Limpa os campos do formulário
        } catch (error) {
            console.error("❌ Erro ao enviar os dados:", error.message);
            messageElement.textContent = "❌ Erro ao enviar os dados. Tente novamente.";
            messageElement.style.color = "red";
        }
    });
});
