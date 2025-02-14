document.addEventListener("DOMContentLoaded", async function () {
    const supabaseUrl = 'https://wujbbsaziklpxeyphfel.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1amJic2F6aWtscHhleXBoZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0OTM5NzEsImV4cCI6MjA1NTA2OTk3MX0.lDt38pHeWax6T0JZG_FtZcrrjPxoqpDsKwJ3j8uajrI';

    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const tableBody = document.getElementById("contentTableBody");
    const messageElement = document.getElementById("message");

    try {
        const { data, error } = await supabase.from("conteudos").select("*");
        if (error) throw error;

        if (data.length === 0) {
            messageElement.textContent = "Nenhum conteúdo encontrado.";
            return;
        }

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

    // Função para gerar PDF
    document.getElementById("generatePDF").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("📋 Lista de Conteúdos", 20, 10);
        let y = 20;

        document.querySelectorAll("#contentTableBody tr").forEach((row) => {
            const columns = row.querySelectorAll("td");
            if (columns.length > 0) {
                doc.text(`${columns[0].innerText} | ${columns[1].innerText} | ${columns[2].innerText} | ${columns[3].innerText}`, 20, y);
                y += 10;
            }
        });

        doc.save("conteudos.pdf");
    });
});
