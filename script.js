// =======================
// FIREBASE IMPORTS
// =======================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// =======================
// ESTADO
// =======================

let projetoEditandoId = null;

// =======================
// REFERÊNCIAS
// =======================

const projectsRef = collection(db, "projects");

// =======================
// ELEMENTOS DOM
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
// EVENTOS
// =======================

btnSalvar.addEventListener("click", salvarProjeto);

// =======================
// FUNÇÕES PRINCIPAIS
// =======================

async function salvarProjeto() {
  if (!nome.value.trim()) return;

  const dados = {
    nome: nome.value,
    area: area.value,
    integrantes: integrantes.value,
    descricao: descricao.value,
    status: statusSelect.value,
    updatedAt: new Date()
  };

  if (projetoEditandoId === null) {
    // NOVO PROJETO
    await addDoc(projectsRef, {
      ...dados,
      createdAt: new Date()
    });
  } else {
    // EDIÇÃO
    const projetoRef = doc(db, "projects", projetoEditandoId);
    await updateDoc(projetoRef, dados);

    projetoEditandoId = null;
    tituloFormulario.innerText = "➕ Novo Projeto";
  }

  limparFormulario();
  carregarProjetos();
}

async function editarProjeto(id, projeto) {
  nome.value = projeto.nome;
  area.value = projeto.area;
  integrantes.value = projeto.integrantes;
  descricao.value = projeto.descricao;
  statusSelect.value = projeto.status;

  projetoEditandoId = id;
  tituloFormulario.innerText = "✏️ Editando Projeto";
}

async function excluirProjeto(id) {
  const projetoRef = doc(db, "projects", id);
  await deleteDoc(projetoRef);

  carregarProjetos();
}

// =======================
// RENDER
// =======================

async function carregarProjetos() {
  listaProjetos.innerHTML = "";

  const snapshot = await getDocs(projectsRef);

  snapshot.forEach(docSnap => {
    const projeto = docSnap.data();
    const id = docSnap.id;

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

    div.querySelector(".editar").addEventListener("click", () =>
      editarProjeto(id, projeto)
    );

    div.querySelector(".excluir").addEventListener("click", () =>
      excluirProjeto(id)
    );

    listaProjetos.appendChild(div);
  });
}

// =======================
// UTIL
// =======================

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

carregarProjetos();
