# Handshake

Quiz de tecnologia sobre **redes e internet** (HTTP, HTTPS, DNS, status e métodos de requisição).

**Site publicado:** _cole aqui o link HTTPS (GitHub Pages)_

## Integrantes

| Nome | RM |
|------|----|
| _Nome 1_ | _RM_ |
| _Nome 2_ | _RM_ |
| _Nome 3_ | _RM_ |

## Entrega do CP1

- Página inicial (`index.html`) com nome, tema, descrição e botão de jogar.
- Estrutura da tela de jogo (`jogo.html`): progresso, pergunta, alternativas, feedback e botão "Próxima".
- Lógica do quiz (`js/jogo.js`): carrega as perguntas, corrige, mostra explicação e fonte, avança e exibe o placar.
- Banco de perguntas (`perguntas.json`) com 4 questões modelo.
- Identidade visual em `css/style.css` (paleta escura azul/verde, Space Grotesk + Inter).

## Como rodar

1. Clone o repositório: `git clone <url-do-repositorio>`
2. Abra `index.html` no navegador (funciona com duplo clique) ou use a extensão **Live Server** do VS Code.
3. Ao editar o `perguntas.json`, rode `python gerar-embutido.py` para atualizar a cópia usada quando o site é aberto sem servidor.

## Formato do `perguntas.json`

```json
{
  "pergunta": "Texto da pergunta",
  "alternativas": ["A", "B", "C", "D"],
  "resposta": 0,
  "explicacao": "Por que essa é a resposta correta.",
  "fonte": "https://link-da-fonte"
}
```

`resposta` é o índice (começando em 0) da alternativa correta.

## Publicação e entrega

1. No GitHub: **Settings → Pages → Deploy from a branch → `main` / root**. O HTTPS já vem ativo.
2. Criar a tag da entrega:

```bash
git tag cp1-entrega
git push origin cp1-entrega
```
