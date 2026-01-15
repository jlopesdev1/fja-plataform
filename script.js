// =======================
// ESTADO
// =======================

let projetos = JSON.parse(localStorage.getItem("projetos")) || [];
let indiceEditando = null;

// =======================
// ELEMENTOS
// =======================

const listaProjetos = document.getElementById("listaProjetos");
const btnSalvar = document.getElementById("btnSalvar");
const tituloFormulario = document.getElementById("tituloFormulario");

const nome = document.getElementById("nome");
const area = document.getElementById("area");
const integrantes = document.getElementById("integrantes");
const descricao = document.getElementById("descricao");
const statusSelect = document.getElementById("status");

// =======================
// EVENTO
// =======================

btnSalvar.addEventListener("click", salvarProjeto);

// =======================
// FUNÇÕES
// =======================

function salvarProjeto() {
  if (!nome.value.trim()) return;

  const dados = {
    nome: nome.value,
    area: area.value,
    integrantes: integrantes.value,
    descricao: descricao.value,
    status: statusSelect.value
  };

  if (indiceEditando === null) {
    // Novo projeto
    projetos.push(dados);
  } else {
    // Edição
    projetos[indiceEditando] = dados;
    indiceEditando = null;
    tituloFormulario.innerText = "➕ Novo Projeto";
  }

  salvar();
  limparFormulario();
  renderizarProjetos();
}

function editarProjeto(index) {
  const p = projetos[index];

  nome.value = p.nome;
  area.value = p.area;
  integrantes.value = p.integrantes;
  descricao.value = p.descricao;
  statusSelect.value = p.status;

  indiceEditando = index;
  tituloFormulario.innerText = "✏️ Editando Projeto";
}

function excluirProjeto(index) {
  projetos.splice(index, 1);
  salvar();
  renderizarProjetos();
}

function renderizarProjetos() {
  listaProjetos.innerHTML = "";

  projetos.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "projeto";

    div.innerHTML = `
      <strong>${p.nome}</strong><br>
      <b>Área:</b> ${p.area}<br>
      <b>Integrantes:</b> ${p.integrantes}<br>
      <b>Status:</b> ${p.status}<br><br>
      <b>Descrição:</b><br>
      ${p.descricao}<br><br>

      <button class="editar" onclick="editarProjeto(${index})">
        Editar
      </button>
      <button class="excluir" onclick="excluirProjeto(${index})">
        Excluir
      </button>
    `;

    listaProjetos.appendChild(div);
  });
}

// =======================
// UTIL
// =======================

function salvar() {
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

function limparFormulario() {
  nome.value = "";
  area.value = "";
  integrantes.value = "";
  descricao.value = "";
  statusSelect.value = "Não iniciado";
}

// =======================
// INIT
// =======================

renderizarProjetos();
