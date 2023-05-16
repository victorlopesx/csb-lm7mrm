// Seleciona os elementos HTML
const dollarInput = document.getElementById("dollar-input");
const brlResult = document.getElementById("brl-result");

// Define a API key e a URL da API
const apiKey = "dd930d63a18d71f5126763bc";

// Adiciona um listener de evento de input no campo de dólares
dollarInput.addEventListener("input", function () {
  // Obtém o valor atual do campo de dólares
  const dollarValue = this.value.replace(/,/g, "").replace(/\D/g, "");

  // Converte o valor de dólar para centavos
  const centsValue = dollarValue / 100;

  // Formata o valor de dólar para USD
  const formattedDollarValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(centsValue);

  // Atualiza o valor do campo de dólares com a formatação
  this.value = formattedDollarValue;

  // Faz a chamada para a API para obter o valor em reais
  fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/BRL/${centsValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Calcula o valor em reais com acréscimo de 6%
      const brlValue = (data.conversion_result * 1.06).toFixed(2);

      // Formata o valor em reais para BRL
      const formattedBrlValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
      }).format(brlValue);

      // Atualiza o span com o valor em reais formatado
      brlResult.textContent = formattedBrlValue;
    })
    .catch((error) => console.error(error));
});
