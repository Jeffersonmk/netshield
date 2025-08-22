 // Seleciona todos os botões dentro do componente
    const buttons = document.querySelectorAll('.segmented button');

    // Para cada botão, adiciona um evento de clique
    buttons.forEach(button => {
        button.addEventListener('click', () => {
        // Remove a classe "active" de todos os botões
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona a classe "active" apenas no botão clicado
        button.classList.add('active');
        });

    // Pega a imagem do "X"
    const closeBtn = document.getElementById("X");

    // Quando clicar na imagem
    closeBtn.addEventListener("click", () => {
    // Pega o elemento com a classe "ad-header"
    const adHeader = document.querySelector(".ad-header");
    
    // Remove do DOM
    adHeader.remove();
    });
});