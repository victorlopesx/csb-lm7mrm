// Seleciona o botão de cópia e o elemento com o texto a ser copiado
const copyButton = document.getElementById("copyButton");
const pixCopyBox = document.querySelector(".pixCopyBox");

// Adiciona um ouvinte de evento para o botão de cópia
copyButton.addEventListener("click", () => {
  // Cria um elemento de área de texto para armazenar o texto a ser copiado
  const textarea = document.createElement("textarea");
  textarea.value = pixCopyBox.textContent;

  // Adiciona o elemento de área de texto ao DOM para que possa ser copiado
  document.body.appendChild(textarea);

  // Seleciona o texto no elemento de área de texto
  textarea.select();

  // Copia o texto selecionado para a área de transferência
  document.execCommand("copy");

  // Remove o elemento de área de texto do DOM
  document.body.removeChild(textarea);

  // Exibe uma mensagem de confirmação para o usuário
  alert("Texto copiado para a área de transferência!");
});
