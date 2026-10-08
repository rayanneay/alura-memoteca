import api from "./api.js";

const ui = {
  async fillForm(thoughtId) {
    try {
      const thought = await api.catchThoughtById(thoughtId);
      document.getElementById("pensamento-id").value = thought.id;
      document.getElementById("pensamento-conteudo").value = thought.content;
      document.getElementById("pensamento-autoria").value = thought.author;
    } catch (error) {
      alert("Erro ao carregar pensamento para edição");
    }
  },

  cleanForm() {
    document.getElementById("pensamento-form").reset();
    document.getElementById("pensamento-id").value = "";
  },

  async renderThoughts() {
    const listOfThoughts = document.getElementById("lista-pensamentos");
    const voidMessage = document.getElementById("mensagem-vazia");
    listOfThoughts.innerHTML = "";

    try {
      const thoughts = await api.catchThoughts();
      if (thoughts.length === 0) {
        voidMessage.style.display = "block";
      } else {
        voidMessage.style.display = "none";
        thoughts.forEach(ui.addThoughtList);
      }
    } catch (error) {
      alert(`Erro ao renderizar pensamentos`);
    }
  },

  addThoughtList(thought) {
    const listOfThoughts = document.getElementById("lista-pensamentos");
    const li = document.createElement("li");
    li.setAttribute("data-id", thought.id);
    li.classList.add("li-pensamento");

    const quoteIcon = document.createElement("img");
    quoteIcon.src = "assets/imagens/aspas-azuis.png";
    quoteIcon.alt = "Aspas azuis";
    quoteIcon.classList.add("icone-aspas");

    const thoughtContent = document.createElement("div");
    thoughtContent.textContent = thought.content;
    thoughtContent.classList.add("pensamento-conteudo");

    const thoughtAuthor = document.createElement("div");
    thoughtAuthor.textContent = thought.author;
    thoughtAuthor.classList.add("pensamento-autoria");

    const editButton = document.createElement("button");
    editButton.classList.add("botao-editar");
    editButton.onclick = () => ui.fillForm(thought.id);

    const editIcon = document.createElement("img");
    editIcon.src = "assets/imagens/icone-editar.png";
    editIcon.alt = "Editar";
    editButton.appendChild(editIcon);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("botao-excluir");
    deleteButton.onclick = async () => {
      try {
        await api.deleteThought(thought.id);
        ui.renderThoughts();
      } catch (error) {
        alert("Erro ao excluir pensamento");
      }
    };

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/imagens/icone-excluir.png";
    deleteIcon.alt = "Excluir";
    deleteButton.appendChild(deleteIcon);

    const icons = document.createElement("div");
    icons.classList.add("icons");
    icons.appendChild(editButton);
    icons.appendChild(deleteButton);

    li.appendChild(quoteIcon);
    li.appendChild(thoughtContent);
    li.appendChild(thoughtAuthor);
    li.appendChild(icons);
    listOfThoughts.appendChild(li);
  },
};

export default ui;
