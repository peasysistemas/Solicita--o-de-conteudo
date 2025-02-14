// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", async function () {
    // Inicializa o Supabase
    const supabaseUrl = 'https://wujbbsaziklpxeyphfel.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1amJic2F6aWtscHhleXBoZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0OTM5NzEsImV4cCI6MjA1NTA2OTk3MX0.lDt38pHeWax6T0JZG_FtZcrrjPxoqpDsKwJ3j8uajrI';

    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    console.log("✅ Supabase conectado!");

    // Captura o elemento da tabela
    const tableBody = document.getElementById("contentTableBody");
    const messageElement = document.getElementById("message");

    try {
        // Busca os conteúdos no Supabase
        const { data, error } = await supabase
            .from("conteudos")
            .select("*");

        if (error) throw error;

        if (data.length === 0) {
            messageElement.textContent = "Nenhum conteúdo encontrado.";
            return;
        }

        // Insere os dados na tabela
        data.forEach(content => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${content.id}</td>
                <td>${content.title}</td>
                <td>${content.contentName}</td>
                <td>${content.contentType}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("❌ Erro ao buscar dados:", error.message);
        messageElement.textContent = "Erro ao carregar os conteúdos.";
        messageElement.style.color = "red";
    }
});
