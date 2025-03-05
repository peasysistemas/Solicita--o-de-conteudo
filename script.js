document.addEventListener("DOMContentLoaded", function () {
    // Captura o formulário e o elemento de mensagem
    const form = document.getElementById("contentForm");
    const messageElement = document.getElementById("message");

    // Adiciona um listener para o evento de submit do formulário
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        // Captura os valores dos campos do formulário
        const title = document.getElementById("title").value.trim();
        const contentName = document.getElementById("contentName").value.trim();
        const contentType = document.querySelector('input[name="contentType"]:checked')?.value;

        // Validação dos campos
        if (!title || !contentName || !contentType) {
            messageElement.textContent = "⚠️ Preencha todos os campos!";
            messageElement.style.color = "red";
            return; // Interrompe a execução se algum campo estiver vazio
        }

        try {
            // Envia os dados para o backend usando fetch
            const response = await fetch('backend/salvar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `title=${encodeURIComponent(title)}&contentName=${encodeURIComponent(contentName)}&contentType=${encodeURIComponent(contentType)}`
            });

            // Verifica a resposta do backend
            const result = await response.text();

            // Exibe uma mensagem de sucesso ou erro com base na resposta
            if (result.includes("✅")) {
                messageElement.textContent = "✅ Dados enviados com sucesso! 🎉";
                messageElement.style.color = "green";
                form.reset(); // Limpa o formulário após o envio bem-sucedido
            } else {
                messageElement.textContent = "❌ Erro ao enviar os dados.";
                messageElement.style.color = "red";
            }
        } catch (error) {
            // Captura e exibe erros de rede ou outros problemas
            console.error("❌ Erro ao enviar os dados:", error);
            messageElement.textContent = "❌ Erro ao enviar os dados. Tente novamente.";
            messageElement.style.color = "red";
        }
    });
});
const submitButton = form.querySelector('button[type="submit"]');
submitButton.disabled = true;
submitButton.textContent = "Enviando...";

// No final do bloco try/catch, reative o botão
submitButton.disabled = false;
submitButton.textContent = "Enviar";

const result = await response.json(); // Supondo que o backend retorne JSON
if (result.success) {
    messageElement.textContent = "✅ " + result.message;
    messageElement.style.color = "green";
    form.reset();
} else {
    messageElement.textContent = "❌ " + result.message;
    messageElement.style.color = "red";
}