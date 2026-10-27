const LETRAS = ["A", "B", "C", "D", "E", "F"];

const el = {
  progressoTexto: document.getElementById("progresso-texto"),
  barra: document.querySelector(".progresso-barra i"),
  pergunta: document.getElementById("pergunta"),
  alternativas: document.getElementById("alternativas"),
  feedback: document.getElementById("feedback"),
  proxima: document.getElementById("proxima"),
  quiz: document.getElementById("quiz"),
  resultado: document.getElementById("resultado"),
  placar: document.getElementById("placar"),
  reiniciar: document.getElementById("reiniciar"),
};

let perguntas = [];
let atual = 0;
let acertos = 0;
let respondeu = false;

function limpar(no) {
  while (no.firstChild) no.removeChild(no.firstChild);
}

function mostrarFeedback(classe, titulo, texto, fonte) {
  limpar(el.feedback);
  el.feedback.className = "feedback" + (classe ? " " + classe : "");
  if (titulo) {
    const t = document.createElement("strong");
    t.textContent = titulo;
    el.feedback.appendChild(t);
  }
  const p = document.createElement("p");
  p.textContent = texto;
  if (fonte) {
    p.appendChild(document.createTextNode(" "));
    const a = document.createElement("a");
    a.href = fonte;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "Ver fonte";
    p.appendChild(a);
  }
  el.feedback.appendChild(p);
}

function mostrarPergunta() {
  const q = perguntas[atual];
  respondeu = false;
  el.progressoTexto.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
  el.barra.style.width = `${((atual + 1) / perguntas.length) * 100}%`;
  el.pergunta.textContent = q.pergunta;

  limpar(el.alternativas);
  q.alternativas.forEach((texto, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "alternativa";
    btn.dataset.indice = i;
    const letra = document.createElement("span");
    letra.className = "letra";
    letra.textContent = LETRAS[i];
    btn.appendChild(letra);
    btn.appendChild(document.createTextNode(texto));
    btn.addEventListener("click", () => responder(i));
    li.appendChild(btn);
    el.alternativas.appendChild(li);
  });

  mostrarFeedback("", "", "Escolha uma alternativa. O feedback e a explicação aparecem aqui.");
  el.proxima.disabled = true;
  el.proxima.textContent = atual === perguntas.length - 1 ? "Ver resultado" : "Próxima";
}

function responder(indice) {
  if (respondeu) return;
  respondeu = true;
  const q = perguntas[atual];
  const botoes = el.alternativas.querySelectorAll(".alternativa");
  botoes.forEach((b) => (b.disabled = true));
  botoes[q.resposta].classList.add("correta");

  if (indice === q.resposta) {
    acertos++;
    mostrarFeedback("acerto", "✓ Resposta correta", q.explicacao, q.fonte);
  } else {
    botoes[indice].classList.add("errada");
    mostrarFeedback("erro", "✗ Não foi dessa vez", q.explicacao, q.fonte);
  }
  el.proxima.disabled = false;
  el.proxima.focus();
}

function avancar() {
  if (!respondeu) return;
  if (atual < perguntas.length - 1) {
    atual++;
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  el.quiz.hidden = true;
  el.resultado.hidden = false;
  el.placar.textContent = `Você acertou ${acertos} de ${perguntas.length}.`;
  el.reiniciar.focus();
}

function reiniciar() {
  atual = 0;
  acertos = 0;
  el.resultado.hidden = true;
  el.quiz.hidden = false;
  mostrarPergunta();
}

async function carregarPerguntas() {
  try {
    const resposta = await fetch("perguntas.json");
    if (!resposta.ok) throw new Error(resposta.status);
    return await resposta.json();
  } catch (erro) {
    // Sem servidor (file://) o fetch é bloqueado: usa a cópia embutida.
    if (Array.isArray(window.PERGUNTAS_EMBUTIDAS)) return window.PERGUNTAS_EMBUTIDAS;
    throw erro;
  }
}

async function iniciar() {
  try {
    perguntas = await carregarPerguntas();
    if (!perguntas.length) throw new Error("vazio");
    mostrarPergunta();
  } catch (erro) {
    el.pergunta.textContent = "Não foi possível carregar as perguntas.";
    limpar(el.alternativas);
    mostrarFeedback("erro", "Erro ao carregar", "Confira se o arquivo perguntas.json existe e está com o formato correto.");
    el.proxima.disabled = true;
  }
}

el.proxima.addEventListener("click", avancar);
el.reiniciar.addEventListener("click", reiniciar);
iniciar();
