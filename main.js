"use strict";

/* ========= Utils ========= */
// Formata em BRL (pt-BR)
const formatBRL = (n) =>
    new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
    }).format(n);

// Extrai número de um texto tipo "R$ 1.234,56/mês" -> 1234.56
function extractNumberBR(text) {
    const m = text.replace(/\s/g, "").match(/([\d.]+,\d{2}|\d+([.,]\d+)?)/);
    if (!m) return null;
    return parseFloat(m[1].replace(/\./g, "").replace(",", "."));
}

/* ========= Cache dos cards e preços ========= */
const cards = Array.from(document.querySelectorAll(".card-preco"));
cards.forEach((card) => {
    const priceEl = card.querySelector(".preco");
    if (!priceEl) return;

    // Guarda o texto original (ex.: "R$ 14,90/mês" ou "Sob consulta")
    priceEl.dataset.originalText = priceEl.textContent.trim();

    // Guarda o valor mensal numérico, se existir
    const n = extractNumberBR(priceEl.dataset.originalText);
    priceEl.dataset.monthly = Number.isFinite(n) ? String(n) : "";
});

/* ========= Segmented Buttons (Mensal / Anual -20%) ========= */
const segButtons = document.querySelectorAll(".segmented button");

segButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
    // visual: alterna active
    segButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // lógica: define modo
    const isAnnual = /anual/i.test(btn.textContent);
    setPrices(isAnnual ? "anual" : "mensal");
    });
});

// Aplica o modo (mensal|anual) a todos os cards
function setPrices(mode) {
    cards.forEach((card) => {
    const priceEl = card.querySelector(".preco");
    if (!priceEl) return;

    const monthly = parseFloat(priceEl.dataset.monthly);
    const hasNumber = Number.isFinite(monthly);

    // Inicia fade-out
    priceEl.classList.add("changing");

    setTimeout(() => {
        if (mode === "anual" && hasNumber) {
        const annualDiscounted = monthly * 12 * 0.8; // 12x com 20% off
        priceEl.textContent = `${formatBRL(annualDiscounted)}/ano`;
        } else {
        // volta para o texto original (inclui "/mês" ou "Sob consulta")
        priceEl.textContent = priceEl.dataset.originalText;
        }
        // Termina fade-in
        priceEl.classList.remove("changing");
    }, 250); // deve bater com o transition do CSS
    });
}

// Estado inicial (garante normalização)
setPrices("mensal");

/* ========= Fechar ad-header (X) ========= */
const closeBtn = document.getElementById("X");
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
    const adHeader = document.querySelector(".ad-header");
    if (adHeader) adHeader.remove();
    });
}
