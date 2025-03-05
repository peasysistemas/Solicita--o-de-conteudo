document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.getElementById("contentTableBody");
    const messageElement = document.getElementById("message");

    try {
        // Faz a requisição para o backend
        const response = await fetch('backend/listar.php');
        const result = await response.json(); // Processa a resposta como JSON

        // Verifica se a resposta é válida
        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("Erro ao processar os dados.");
        }

        // Limpa a tabela antes de adicionar novos dados
        tableBody.innerHTML = '';

        // Verifica se há dados para exibir
        if (result.data.length === 0) {
            messageElement.textContent = "Nenhum conteúdo encontrado.";
            return;
        }

        // Adiciona os dados na tabela
        result.data.forEach((content) => {
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
        console.error("❌ Erro ao buscar dados:", error);
        messageElement.textContent = error.message; // Exibe a mensagem de erro
        messageElement.style.color = "red";
    }

    // Gerar PDF
    const generatePDFButton = document.getElementById("generatePDF");
    generatePDFButton.addEventListener("click", function () {
        // Garante que jsPDF está disponível
        if (!window.jspdf) {
            alert("Erro: jsPDF não foi carregado corretamente!");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título do relatório
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("📋 Relatório de Solicitações", 14, 20);

        // Captura os dados da tabela
        const tableBody = document.getElementById("contentTableBody");
        if (!tableBody || tableBody.children.length === 0) {
            alert("⚠️ Nenhum dado disponível para gerar o PDF.");
            return;
        }

        const rows = [];
        tableBody.querySelectorAll("tr").forEach(row => {
            const rowData = [];
            row.querySelectorAll("td").forEach(cell => {
                rowData.push(cell.textContent.trim());
            });
            rows.push(rowData);
        });

        // Adiciona a tabela ao PDF com estilos
        if (doc.autoTable) {
            doc.autoTable({
                startY: 30,
                head: [["ID", "Título", "Nome", "Tipo"]],
                body: rows,
                theme: "striped",
                styles: { fontSize: 12, cellPadding: 3 },
                headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
                alternateRowStyles: { fillColor: [240, 240, 240] },
            });

            // Salva o PDF
            doc.save("relatorio_solicitacoes.pdf");
        } else {
            alert("Erro: autoTable não foi carregado corretamente!");
        }
    });
});
