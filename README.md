# ✝️ ejc-sao-jose-operario-parish

**Site do 7º EJC (Encontro de Jovens com Cristo) da Paróquia São José Operário**, em Munhoz Júnior, Osasco. O encontro acontece nos dias **28 e 29 de novembro de 2026**. O site recebe o jovem com uma pergunta simples, **"como você tá?"**, e mostra uma página diferente para quem já aceitou, para quem está em dúvida e para quem pensou em desistir.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=googlefonts&logoColor=white)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-green?style=flat-square)

[Fluxos](#-fluxos-principais) · [Sobre](#-sobre-o-projeto) · [Funcionalidades](#-funcionalidades) · [Tecnologias](#-tecnologias-utilizadas) · [Como executar](#%EF%B8%8F-como-executar-o-projeto) · [Configurações](#-configurações) · [Créditos](#-créditos-do-projeto)

---

## Em resumo

| | |
| --- | --- |
| **O que é** | Site de divulgação e preparação do 7º EJC |
| **Diferencial** | Três jornadas conforme a resposta do jovem: já aceitei, tô em dúvida e desisti |
| **Frontend** | HTML, CSS e JavaScript puros, sem framework e sem build |
| **Contato** | Mensagens prontas no WhatsApp com o nome e o contexto da pessoa |
| **Hospedagem** | GitHub Pages |
| **Tipo** | Projeto voluntário para a pastoral da juventude da paróquia |

---

## 📸 Fluxos principais

### Workflow de quem já aceitou

<img src="./assets/readme/fluxo-aceitei.gif" alt="Jovem escolhe Já aceitei, vê tema, música, santo padroeiro e marca o checklist do que levar" width="300px">

### Workflow de quem está em dúvida

<img src="./assets/readme/fluxo-duvida.gif" alt="Jovem escolhe Tô em dúvida, abre as respostas das dúvidas e coloca o nome para avisar que vai" width="300px">

### Workflow de quem pensou em desistir

<img src="./assets/readme/fluxo-desisti.gif" alt="Jovem escolhe Desisti, conta o motivo e vê a resposta e o convite para mudar de ideia" width="300px">

---

## 📌 Sobre o projeto

Página única (**one page**) que funciona como três sites em um:

| Camada | Tecnologia |
| --- | --- |
| Estrutura | HTML semântico |
| Estilo | CSS puro com variáveis (`:root`) |
| Comportamento | JavaScript puro (vanilla) |
| Dados salvos no aparelho | `localStorage` |
| Hospedagem | GitHub Pages |

---

## 🚀 Funcionalidades

- Pop-up inicial com três caminhos: **Já aceitei**, **Tô em dúvida** e **Desisti**
- A resposta fica salva no aparelho, e dá para trocar pelo botão no topo
- Links diretos para cada página: `#aceitei`, `#duvida`, `#desisti`
- Mensagens prontas no WhatsApp com o nome da pessoa e o que ela viu no site
- **Prazo de exceções:** depois de 21/11 os botões "eu vou" e todos os contatos de WhatsApp somem sozinhos
- Interface responsiva, pensada primeiro para o celular
- Respeita `prefers-reduced-motion` (sem animações para quem prefere)
- SEO com Open Graph e dados estruturados de **evento** (Schema.org)

### ✅ Já aceitei

- Contagem regressiva para o encontro
- Tema, música tema e santo padroeiro (São Carlo Acutis)
- Checklist do que levar, salvo no celular, com botão flutuante de progresso
- Avisos e local com link para o Google Maps
- Botão para salvar na agenda (Google Agenda ou arquivo `.ics` no iPhone)

### 🤔 Tô em dúvida

- Cards com as dúvidas mais comuns e suas respostas
- Contador de dúvidas vistas
- Conversa pelo WhatsApp já dizendo quais dúvidas a pessoa abriu
- Botão **"Decidi: eu vou!"**, que avisa no WhatsApp com o nome

### 🚪 Desisti

- A pessoa escolhe o que pesou: prova, trabalho, outro compromisso, não conseguir ir os dois dias, desânimo ou outro motivo
- Cada motivo tem uma resposta própria e o convite para o EJC 2027
- Quem está desanimado é levado para a página de dúvidas
- Botão **"Mudei de ideia, eu vou!"**, que avisa no WhatsApp com o nome e o motivo

### 🗺 Páginas

| Público | Endereço | Página |
| --- | --- | --- |
| Todos | `/` | Pop-up "como você tá?" |
| Já aceitei | `/#aceitei` | Preparação para o encontro |
| Tô em dúvida | `/#duvida` | Dúvidas e conversa |
| Desisti | `/#desisti` | Motivos e porta aberta |

---

## 🛠 Tecnologias utilizadas

| Tecnologia | Para que serve |
| --- | --- |
| **HTML5** | Estrutura semântica (`nav`, `header`, `main`, `section`, `article`, `blockquote`, `time`) |
| **CSS3** | Layout responsivo, animações, efeito glass e tema por página |
| **JavaScript** | Troca de páginas, checklist, contagem regressiva, prazo e links do WhatsApp |
| **Google Fonts** | Anton (títulos), Poppins (texto) e Yellowtail (destaques) |
| **localStorage** | Guarda a resposta do pop-up, o checklist e o nome |
| **IntersectionObserver** | Animações ao rolar, menu ativo e botões flutuantes |
| **WhatsApp (wa.me)** | Mensagens prontas para a coordenação |
| **Schema.org (JSON-LD)** | Informa ao Google que o site é de um evento, com data e local |

---

## ⚙️ Como executar o projeto

**Pré-requisito:** só um navegador. Não tem dependência nem build.

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/lunajulia107/ejc-sao-jose-operario-parish.git
```

### 2️⃣ Abrir o site

Abra o `index.html` no navegador ou, se preferir um servidor local:

```bash
cd ejc-sao-jose-operario-parish
npx serve .
```

### 3️⃣ Publicar no GitHub Pages

**Settings → Pages → Source:** *Deploy from a branch* → **Branch:** `main` / `(root)` → **Save**.

> [!NOTE]
> O site fica em `https://lunajulia107.github.io/ejc-sao-jose-operario-parish/`. Se mudar o endereço, atualize também o `canonical`, as tags `og:` e o JSON-LD no `<head>` do `index.html`.

---

## 🔧 Configurações

Tudo fica no começo de `js/main.js`:

| Variável | O que faz |
| --- | --- |
| `WA_NUMBER` | Número do WhatsApp que recebe as mensagens (com DDI e DDD, só números) |
| `DEADLINE` | Data e hora limite das exceções (padrão: 21/11/2026 às 23h59) |
| `FORM_URL` | Link opcional de um Google Forms anônimo na página "Desisti" |

A data da contagem regressiva fica na variável `target`, também em `js/main.js`.

> [!TIP]
> Para ver como o site fica depois do prazo, abra com `?prazo=encerrado` no fim do endereço, por exemplo `index.html?prazo=encerrado#duvida`.

---

## 📁 Estrutura do projeto

```
ejc-sao-jose-operario-parish/
├── index.html          → estrutura das três páginas e do pop-up
├── css/
│   └── style.css       → estilos
├── js/
│   └── main.js         → comportamento
└── assets/
    ├── ejc-logo.png    → logo do EJC (também é o favicon)
    ├── brasao.jpg      → brasão da paróquia
    ├── carlo2.jpg      → foto de São Carlo Acutis
    └── readme/         → GIFs dos fluxos deste README
```

---

## 🤝 Créditos do projeto

Projeto voluntário feito para a Paróquia São José Operário. A ideia surgiu para acolher cada jovem do jeito que ele chega: quem já confirmou se prepara, quem está em dúvida encontra respostas, e quem pensou em desistir recebe uma palavra de carinho e a porta aberta.

| Área | Responsável |
| --- | --- |
| 💻 Desenvolvimento e design | [Julia Rodrigues](https://github.com/lunajulia107) |
| ⛪ Realização | Paróquia São José Operário · Munhoz Júnior, Osasco |

### 💡 Observações

Projeto desenvolvido com foco em:

- Experiência do usuário no celular
- Acolhimento e linguagem próxima do jovem
- Código simples, sem dependências

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
