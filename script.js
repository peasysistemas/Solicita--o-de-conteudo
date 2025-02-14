// Certifique-se de que a biblioteca do Supabase está carregada antes de usá-la
if (typeof supabase === "undefined") {
    console.error("Erro: A biblioteca do Supabase não foi carregada corretamente.");
} else {
    console.log("Supabase carregado com sucesso.");
}

// Inicializa o cliente do Supabase corretamente
const supabaseUrl = 'https://wujbbsaziklpxeyphfel.supabase.co'; // Substitua pelo seu URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1amJic2F6aWtscHhleXBoZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0OTM5NzEsImV4cCI6MjA1NTA2OTk3MX0.lDt38pHeWax6T0JZG_FtZcrrjPxoqpDsKwJ3j8uajrI'; // Substitua pela sua chave

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Seleciona o formulário e elementos de feedback
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contentForm");
    const messageElement = document.getElementById("message");
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        const title = document.getElementById("title").value.trim();
        const contentName = document.getElementById("contentName").value.trim();
        const contentType = document.querySelector('input[name="contentType"]:checked')?.value;

        if (!title || !contentName || !contentType) {
            messageElement.textContent = "Por favor, preencha todos os campos.";
            messageElement.style.color = "red";
            submitButton.disabled = false;
            submitButton.textContent = "Enviar";
            return;
        }

        try {
            const { data, error } = await supabase
                .from("conteudos")
                .insert([{ title, contentName, contentType }]);

            if (error) {
                throw error;
            }

            messageElement.textContent = "Dados enviados com sucesso! 🎉";
            messageElement.style.color = "green";
            form.reset();
        } catch (error) {
            console.error("Erro ao enviar os dados:", error.message);
            messageElement.textContent = "Erro ao enviar os dados. Tente novamente.";
            messageElement.style.color = "red";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Enviar";
        }
    });
});
