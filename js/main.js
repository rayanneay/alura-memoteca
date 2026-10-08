import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  ui.renderThoughts();

  const formThought = document.getElementById("pensamento-form");
  const resetButton = document.getElementById("botao-cancelar");

  formThought.addEventListener("submit", prepareFormSubmission);
  resetButton.addEventListener("click", prepareReset);
});

async function prepareFormSubmission(event) {
  event.preventDefault();

  const id = document.getElementById("pensamento-id").value;
  const content = document.getElementById("pensamento-conteudo").value.trim();
  const author = document.getElementById("pensamento-autoria").value;

  try {
    if (id) {
      await api.editThoughts({ id, content, author });
    } else {
      await api.saveThoughts({ content, author });
    }
    ui.cleanForm();
    ui.renderThoughts();
  } catch (error) {
    alert("Erro ao salvar pensamento.");
  }
}

function prepareReset() {
  ui.cleanForm();
}
