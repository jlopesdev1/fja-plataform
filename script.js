// =======================
// IMPORTS
// =======================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// =======================
// ESTADO
// =======================

let projetoEditandoId = null;
let senhaProjetoEditando = null;

// =======================
// FIRESTORE
// =======================

const projectsRef = collection(db, "projects");

// =======================
// DOM
// =======================

document.addEventListener("DOMContentLoaded", () => {
  const listaProjetos = document.getElementById("listaProjetos");
  const btnSalvar = document.getElementById("btnSalvar");
  const tituloFormulario = document.getElementById("tituloFormulario");

  const nome = document.getElementById("nome");
  const area = document.getElementById("area");
  const integrantes = document.getElementById("integrantes");
  const descricao = document.getElementById("descricao");
  const statusSelect = document.getElementById("status");
  const passwordInput = document.getElementById("password");

  btnSalvar.addEventListener("click", salvarProjeto);

  // =======================
  // LISTENER REALTIME
  // =======================

  onSnapshot(projectsRef, snapshot => {
  listaProjetos.innerHTML = "";

  snapshot.forEach(docSnap => {
    const projeto = docSnap.data();
    const id = docSnap.id;

    // 🚫 NÃO MOSTRA PROJETOS "EXCLUÍDOS"
    if (projeto.ativo === false) return;

    const div = document.createElement("div");
    div.className = "projeto";

    div.innerHTML = `
      <strong>${projeto.nome}</strong><br>
      <b>Área:</b> ${projeto.area}<br>
      <b>Integrantes:</b> ${projeto.integrantes}<br>
      <b>Status:</b> ${projeto.status}<br><br>

      <b>Descrição:</b><br>
      ${projeto.descricao}<br><br>

      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    `;

    div.querySelector(".editar").onclick = () =>
      tentarEditar(id, projeto);

    div.querySelector(".excluir").onclick = () =>
      tentarExcluir(id, projeto.password);

    listaProjetos.appendChild(div);
  });
});


  // =======================
  // FUNÇÕES
  // =======================

  async function salvarProjeto() {
    if (!nome.value.trim() || !passwordInput.value.trim()) {
      alert("Nome e senha são obrigatórios.");
      return;
    }

    const dados = {
      nome: nome.value,
      area: area.value,
      integrantes: integrantes.value,
      descricao: descricao.value,
      status: statusSelect.value,
      password: passwordInput.value,
      updatedAt: new Date()
    };

    if (projetoEditandoId === null) {
  await addDoc(projectsRef, {
  ...dados,
  ativo: true,
  createdAt: new Date()
});
} else {
  const projetoRef = doc(db, "projects", projetoEditandoId);

  await updateDoc(projetoRef, {
    ...dados,
    password: senhaProjetoEditando
  });

  projetoEditandoId = null;
  senhaProjetoEditando = null;
  tituloFormulario.innerText = "➕ Novo Projeto";
}

    limparFormulario();
  }

  function tentarEditar(id, projeto) {
  const senha = prompt("Digite a senha do projeto:");

  if (!senha) return;

  if (senha !== projeto.password) {
    alert("Senha incorreta.");
    return;
  }

  nome.value = projeto.nome;
  area.value = projeto.area;
  integrantes.value = projeto.integrantes;
  descricao.value = projeto.descricao;
  statusSelect.value = projeto.status;
  passwordInput.value = projeto.password;

  projetoEditandoId = id;
  senhaProjetoEditando = senha;

  tituloFormulario.innerText = "✏️ Editando Projeto";
}


 async function tentarExcluir(id, senhaCorreta) {
  const senha = prompt("Digite a senha do projeto:");

  if (!senha) return;

  if (senha !== senhaCorreta) {
    alert("Senha incorreta.");
    return;
  }

  const projetoRef = doc(db, "projects", id);

  await updateDoc(projetoRef, {
    ativo: false,
    password: senha
  });
}

  function limparFormulario() {
    nome.value = "";
    area.value = "";
    integrantes.value = "";
    descricao.value = "";
    statusSelect.value = "Não iniciado";
    passwordInput.value = "";
  }
});




