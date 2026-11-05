(function () {
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- menu ---- */
  var btn = document.getElementById("menuBtn");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  btn.addEventListener("click", function () {
    setMenu(!document.body.classList.contains("menu-open"));
  });
  Array.prototype.forEach.call(
    document.querySelectorAll("#overlay a"),
    function (a) {
      a.addEventListener("click", function () {
        setMenu(false);
      });
    },
  );

  /* ---- barra de rolagem ---- */
  var sb = document.getElementById("scrollbar");
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    sb.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- reveal + link ativo ---- */
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    Array.prototype.forEach.call(rv, function (el) {
      io.observe(el);
    });
  } else {
    Array.prototype.forEach.call(rv, function (el) {
      el.classList.add("in");
    });
  }
  var links = document.querySelectorAll(".links a");
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            Array.prototype.forEach.call(links, function (a) {
              a.classList.toggle(
                "on",
                a.getAttribute("href") === "#" + e.target.id,
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    Array.prototype.forEach.call(
      document.querySelectorAll("main section[id]"),
      function (s) {
        so.observe(s);
      },
    );
  }

  /* ---- digitação ---- */
  var typed = document.getElementById("typed"),
    full = typed.textContent;
  if (!reduce) {
    typed.textContent = "";
    var i = 0;
    (function tick() {
      typed.textContent = full.slice(0, ++i);
      if (i < full.length) setTimeout(tick, 38);
    })();
  }

  /* ---- contagem regressiva ---- */
  var target = new Date("2026-11-28T00:00:00-03:00").getTime();
  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }
  function cd() {
    var diff = target - Date.now();
    if (diff <= 0) {
      document.getElementById("cd").style.display = "none";
      document.getElementById("cd-today").style.display = "block";
      return;
    }
    var s = Math.floor(diff / 1000);
    document.getElementById("cd-d").textContent = pad(Math.floor(s / 86400));
    document.getElementById("cd-h").textContent = pad(
      Math.floor((s % 86400) / 3600),
    );
    document.getElementById("cd-m").textContent = pad(
      Math.floor((s % 3600) / 60),
    );
    document.getElementById("cd-s").textContent = pad(s % 60);
  }
  cd();
  setInterval(cd, 1000);

  /* ---- foto com inclinação ---- */
  var ph = document.getElementById("photo");
  if (!reduce && window.matchMedia("(hover:hover)").matches) {
    ph.addEventListener("mousemove", function (e) {
      var r = ph.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      ph.style.transform =
        "perspective(800px) rotateY(" +
        x * 8 +
        "deg) rotateX(" +
        -y * 8 +
        "deg)";
    });
    ph.addEventListener("mouseleave", function () {
      ph.style.transform = "";
    });
  }

  /* ---- checklist ---- */
  var KEY = "7ejc-checklist";
  var boxes = Array.prototype.slice.call(
    document.querySelectorAll('.list input[type="checkbox"]'),
  );
  var saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(KEY) || "{}") || {};
  } catch (e) {
    saved = {};
  }
  boxes.forEach(function (b) {
    if (saved[b.id]) b.checked = true;
  });
  var C = 2 * Math.PI * 36;
  function update() {
    var done = boxes.filter(function (b) {
        return b.checked;
      }).length,
      total = boxes.length;
    document.getElementById("count").textContent = done + "/" + total;
    document.getElementById("ringfg").style.strokeDashoffset =
      C * (1 - done / total);
    document.getElementById("countTxt").innerHTML =
      done === total
        ? "Tudo<br>pronto"
        : done === 0
          ? "Mochila em<br>preparação"
          : "Faltam " + (total - done) + "<br>itens";
    document.getElementById("done").classList.toggle("show", done === total);
    var fc = 2 * Math.PI * 15;
    var ff = document.getElementById("fabfg");
    ff.style.strokeDasharray = fc;
    ff.style.strokeDashoffset = fc * (1 - done / total);
    document.getElementById("fabCount").textContent = done + "/" + total;
    document.getElementById("fab").classList.toggle("full", done === total);
    var state = {};
    boxes.forEach(function (b) {
      if (b.checked) state[b.id] = 1;
    });
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }
  document.getElementById("ringfg").style.strokeDasharray = C;
  boxes.forEach(function (b) {
    b.addEventListener("change", function () {
      update();
      if (b.checked) {
        var r = document.querySelector(".ring");
        r.classList.remove("pop");
        void r.offsetWidth;
        r.classList.add("pop");
        try {
          if (navigator.vibrate) navigator.vibrate(12);
        } catch (e) {}
      }
    });
  });
  document.getElementById("reset").addEventListener("click", function () {
    boxes.forEach(function (b) {
      b.checked = false;
    });
    update();
  });
  update();

  /* ---- botão flutuante do checklist ---- */
  var fab = document.getElementById("fab"),
    hero = document.getElementById("inicio"),
    levar = document.getElementById("levar");
  var heroOut = false,
    inLevar = false;
  function fabVis() {
    fab.classList.toggle("show", heroOut && !inLevar);
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      function (es) {
        heroOut = !es[0].isIntersecting;
        fabVis();
      },
      { threshold: 0 },
    ).observe(hero);
    new IntersectionObserver(
      function (es) {
        inLevar = es[0].isIntersecting;
        fabVis();
      },
      { threshold: 0, rootMargin: "-20% 0px -20% 0px" },
    ).observe(levar);
  }

  /* ---- agenda: escolhe sozinho o calendário do aparelho ---- */
  if (/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)) {
    document
      .getElementById("calBtn")
      .setAttribute(
        "href",
        "data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3A-%2F%2F7%20EJC%2F%2FParoquia%20Sao%20Jose%20Operario%2F%2FPT%0D%0ACALSCALE%3AGREGORIAN%0D%0AMETHOD%3APUBLISH%0D%0ABEGIN%3AVEVENT%0D%0AUID%3A7ejc-2026%40paroquia-sao-jose-operario%0D%0ADTSTAMP%3A20261104T190000Z%0D%0ADTSTART%3BVALUE%3DDATE%3A20261128%0D%0ADTEND%3BVALUE%3DDATE%3A20261130%0D%0ASUMMARY%3A7%C2%BA%20EJC%20%C2%B7%20Encontro%20de%20Jovens%20com%20Cristo%0D%0ALOCATION%3AEscola%20J%C3%BAlio%20Gomes%20Camis%C3%A3o%5C%2C%20Parque%20Imperial%0D%0ADESCRIPTION%3AHor%C3%A1rio%3A%20confirme%20com%20seus%20tios.%20Leve%20B%C3%ADblia%20e%20ter%C3%A7o.%20Celular%3A%20melhor%20deixar%20em%20casa.%0D%0ABEGIN%3AVALARM%0D%0AACTION%3ADISPLAY%0D%0ADESCRIPTION%3AAmanh%C3%A3%20%C3%A9%20o%207%C2%BA%20EJC%21%20Separe%20B%C3%ADblia%20e%20ter%C3%A7o.%0D%0ATRIGGER%3A-PT12H%0D%0AEND%3AVALARM%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR%0D%0A",
      );
  }

  /* ---- páginas por público: aceitei / dúvida / desisti ---- */
  var WA_NUMBER = "5511947724176";
  var FORM_URL = ""; /* link do Google Forms anônimo (opcional) */
  var seen = []; /* dúvidas que a pessoa abriu no chat */
  var pickedReason = ""; /* motivo escolhido na página de desistência */

  /* ---- prazo pra quem estava em dúvida ou desistiu avisar que vai ---- */
  var DEADLINE = new Date("2026-11-21T23:59:59-03:00").getTime();
  /* pra testar como fica depois do prazo: abra a página com ?prazo=encerrado */
  function isClosed() {
    return /[?&]prazo=encerrado/.test(location.search) || Date.now() > DEADLINE;
  }
  function applyDeadline() {
    document.body.classList.toggle("closed", isClosed());
    updDqCount();
  }
  /* depois do prazo some o card "Tenho outra dúvida" (ele levava pro WhatsApp) */
  function dqKeys() {
    return [
      "conhecer",
      "igreja",
      "timido",
      "celular",
      "gostar",
      "outro",
    ].filter(function (k) {
      return !(k === "outro" && isClosed());
    });
  }
  function updDqCount() {
    var el = document.getElementById("dqCount");
    if (!el) return;
    var keys = dqKeys(),
      n = 0;
    if (typeof DQ !== "undefined")
      keys.forEach(function (k) {
        if (seen.indexOf(DQ[k].t) > -1) n++;
      });
    el.textContent = n + " de " + keys.length + " vistas";
  }
  applyDeadline();
  setInterval(applyDeadline, 60000);
  function waLink(ctx, reason) {
    var nm = "";
    try {
      nm = (document.querySelector(".name-input") || {}).value || "";
    } catch (e) {}
    var lines = ["Oi! Vim pelo site do 7º EJC 🙂", "Meu nome: " + nm.trim()];
    if (ctx === "duvida") {
      lines.push("Situação: tô em dúvida");
      lines.push(
        "Dúvidas que eu vi: " +
          (seen.length ? seen.join(", ") : "nenhuma ainda"),
      );
      lines.push("Queria conversar.");
    } else if (ctx === "vou-duvida") {
      lines.push("Situação: tava em dúvida, mas decidi: EU VOU! 🙌");
      if (seen.length) lines.push("Dúvidas que eu vi: " + seen.join(", "));
    } else if (ctx === "vou-desisti") {
      lines.push(
        "Situação: tinha pensado em desistir, mas mudei de ideia: EU VOU! 🙌",
      );
      if (pickedReason) lines.push("O que tinha pesado: " + pickedReason);
    } else {
      lines.push("Situação: pensei em desistir");
      lines.push("Motivo: " + (reason || "não informado"));
      lines.push("Queria conversar.");
    }
    return (
      "https://wa.me/" +
      WA_NUMBER +
      "?text=" +
      encodeURIComponent(lines.join("\n"))
    );
  }
  function bindWa(a) {
    var upd = function () {
      a.href = waLink(
        a.getAttribute("data-wa-ctx"),
        a.getAttribute("data-reason-label"),
      );
    };
    upd();
    a.addEventListener("click", upd);
    a.addEventListener("mouseenter", upd);
    a.addEventListener("focus", upd);
  }
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-wa-ctx]"),
    bindWa,
  );

  /* ---- dúvidas (cards) ---- */
  var DQ = {
    conhecer: {
      t: "Não conheço ninguém",
      h: "Muita gente chega assim.",
      p: "Você fica num grupo pequeno só com jovens da sua idade, então fica bem mais fácil fazer amizade. Muita amizade boa começa ali.",
    },
    igreja: {
      t: "Não sou muito de igreja",
      h: "Não precisa ser.",
      p: "Ninguém vai te cobrar nada nem te expor. É um fim de semana pra você ouvir, pensar e viver tudo no seu tempo.",
    },
    timido: {
      t: "Sou tímido",
      h: "Tá tudo certo.",
      p: "Ninguém vai te obrigar a falar ou fazer o que você não quiser. Você participa do seu jeito, e vai ter muita gente tímida igual a você.",
    },
    celular: {
      t: "Vou ficar sem celular?",
      h: "Vai, e isso é bom.",
      p: "É isso que faz o encontro ser diferente: dois dias longe do mundo pra se conectar com Deus e com quem tá do seu lado.",
    },
    gostar: {
      t: "E se eu não gostar?",
      h: "Só tem um jeito de saber.",
      p: "Vem com o coração aberto e deixa Deus te surpreender. No mínimo, você ganha um fim de semana diferente.",
    },
    outro: {
      t: "Tenho outra dúvida",
      h: "Pergunta pra gente!",
      p: "Qualquer dúvida vale. Me chama no WhatsApp aqui embaixo que eu te respondo.",
    },
  };
  var dqAnswer = document.getElementById("dqAnswer"),
    dqOrder = Object.keys(DQ),
    dqCurrent = null;
  function showDq(k, scroll) {
    var d = DQ[k];
    dqCurrent = k;
    if (seen.indexOf(d.t) < 0) seen.push(d.t);
    Array.prototype.forEach.call(
      document.querySelectorAll(".dq"),
      function (c) {
        var key = c.getAttribute("data-dq");
        c.classList.toggle("on", key === k);
        c.classList.toggle("seen", seen.indexOf(DQ[key].t) > -1);
      },
    );
    document.getElementById("dqAK").textContent = d.t;
    document.getElementById("dqAT").textContent = d.h;
    document.getElementById("dqAP").textContent = d.p;
    updDqCount();
    var left = dqKeys().filter(function (x) {
      return seen.indexOf(DQ[x].t) < 0;
    });
    document.getElementById("dqNext").style.display = left.length ? "" : "none";
    dqAnswer.removeAttribute("hidden");
    if (scroll)
      setTimeout(function () {
        dqAnswer.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "nearest",
        });
        dqAnswer.focus({ preventScroll: true });
      }, 30);
  }
  Array.prototype.forEach.call(document.querySelectorAll(".dq"), function (c) {
    c.addEventListener("click", function () {
      showDq(c.getAttribute("data-dq"), true);
    });
  });
  document.getElementById("dqNext").addEventListener("click", function () {
    var left = dqKeys().filter(function (x) {
      return seen.indexOf(DQ[x].t) < 0;
    });
    if (left.length) showDq(left[0], true);
  });
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-scroll]"),
    function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var t = document.getElementById(a.getAttribute("data-scroll"));
        t.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "center",
        });
        var inp = t.querySelector(".name-input");
        if (inp && !inp.value)
          setTimeout(function () {
            inp.focus({ preventScroll: true });
          }, 450);
      });
    },
  );
  /* nome: compartilhado entre os campos e lembrado */
  var nameInputs = document.querySelectorAll(".name-input");
  var savedName = "";
  try {
    savedName = localStorage.getItem("7ejc-nome") || "";
  } catch (e) {}
  Array.prototype.forEach.call(nameInputs, function (inp) {
    inp.value = savedName;
    inp.addEventListener("input", function () {
      Array.prototype.forEach.call(nameInputs, function (o) {
        if (o !== inp) o.value = inp.value;
      });
      try {
        localStorage.setItem("7ejc-nome", inp.value);
      } catch (e) {}
      Array.prototype.forEach.call(
        document.querySelectorAll("[data-wa-ctx]"),
        function (a) {
          a.href = waLink(
            a.getAttribute("data-wa-ctx"),
            a.getAttribute("data-reason-label"),
          );
        },
      );
    });
  });
  /* barra fixa da página de dúvida */
  var dvBar = document.getElementById("dvBar"),
    dvHero = document.querySelector(".dv-hero"),
    dvTalk = document.getElementById("conversa"),
    dvEnd = document.querySelector(".dv-end");
  if ("IntersectionObserver" in window) {
    var dvState = { hero: true, talk: false, end: false };
    var dvUpd = function () {
      dvBar.classList.toggle(
        "show",
        !dvState.hero && !dvState.talk && !dvState.end,
      );
    };
    new IntersectionObserver(function (es) {
      dvState.hero = es[0].isIntersecting;
      dvUpd();
    }).observe(dvHero);
    new IntersectionObserver(function (es) {
      dvState.talk = es[0].isIntersecting;
      dvUpd();
    }).observe(dvTalk);
    new IntersectionObserver(function (es) {
      dvState.end = es[0].isIntersecting;
      dvUpd();
    }).observe(dvEnd);
  }

  var views = {
    aceitei: document.getElementById("v-aceitei"),
    duvida: document.getElementById("v-duvida"),
    desisti: document.getElementById("v-desisti"),
  };
  var LABEL = {
    aceitei: "Já aceitei",
    duvida: "Em dúvida",
    desisti: "Desisti",
  };
  var gate = document.getElementById("gate"),
    statusBtn = document.getElementById("statusBtn");
  var toast = document.getElementById("toast"),
    tt;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }
  function openGate() {
    gate.removeAttribute("hidden");
    document.body.classList.add("gate-open");
    var f = gate.querySelector(".gopt");
    if (f) f.focus();
  }
  function closeGate() {
    gate.setAttribute("hidden", "");
    document.body.classList.remove("gate-open");
  }
  function go(st, announce) {
    if (!views[st]) st = "aceitei";
    Object.keys(views).forEach(function (k) {
      if (k === st) views[k].removeAttribute("hidden");
      else views[k].setAttribute("hidden", "");
    });
    document.body.setAttribute("data-state", st);
    statusBtn.removeAttribute("hidden");
    document.getElementById("statusTxt").textContent = LABEL[st];
    try {
      localStorage.setItem("7ejc-estado", st);
    } catch (e) {}
    try {
      if (location.hash !== "#" + st) history.replaceState(null, "", "#" + st);
    } catch (e) {}
    window.scrollTo(0, 0);
    if (st === "aceitei") {
      Array.prototype.forEach.call(
        views.aceitei.querySelectorAll(".rv"),
        function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight)
            el.classList.add("in");
        },
      );
      if (announce) showToast("Boa! Bora arrumar a mochila 🎒");
    }
  }
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-pick]"),
    function (bt) {
      bt.addEventListener("click", function () {
        closeGate();
        go(
          bt.getAttribute("data-pick") || "aceitei",
          !!bt.getAttribute("data-pick"),
        );
      });
    },
  );
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-go]"),
    function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var t = a.getAttribute("data-go");
        if (t === "gate") openGate();
        else go(t, true);
      });
    },
  );
  /* botões "eu vou": avisam no WhatsApp com o nome e abrem a página de quem aceitou */
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-wa-go]"),
    function (a) {
      a.addEventListener("click", function (e) {
        if (isClosed()) {
          e.preventDefault();
          applyDeadline();
          showToast("O prazo das exceções terminou em 21/11");
          return;
        }
        var sec = a.closest("section"),
          inp = sec && sec.querySelector(".name-input");
        if (inp && !inp.value.trim()) {
          e.preventDefault();
          inp.focus();
          showToast("Escreve seu nome primeiro 🙂");
          return;
        }
        a.href = waLink(a.getAttribute("data-wa-ctx"));
        setTimeout(function () {
          go(a.getAttribute("data-wa-go"), true);
        }, 300);
      });
    },
  );

  /* motivos da desistência */
  var REASONS = ["prova", "trabalho", "data", "dias", "outro"];
  var reasonsEl = document.getElementById("reasons"),
    picked = document.getElementById("rPicked");
  function resetReasons() {
    reasonsEl.removeAttribute("hidden");
    picked.setAttribute("hidden", "");
    pickedReason = "";
    REASONS.forEach(function (k) {
      document.getElementById("r-" + k).setAttribute("hidden", "");
    });
  }
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-reason]"),
    function (bt) {
      bt.addEventListener("click", function () {
        var r = bt.getAttribute("data-reason");
        if (r === "animo") {
          go("duvida", false);
          return;
        }
        REASONS.forEach(function (k) {
          var el = document.getElementById("r-" + k);
          if (k === r) el.removeAttribute("hidden");
          else el.setAttribute("hidden", "");
        });
        reasonsEl.setAttribute("hidden", "");
        pickedReason = bt.querySelector("b").textContent;
        document.getElementById("rPickedTxt").textContent = pickedReason;
        picked.removeAttribute("hidden");
        var panel = document.getElementById("r-" + r);
        setTimeout(function () {
          picked.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
          });
          panel.focus({ preventScroll: true });
        }, 40);
      });
    },
  );
  document.getElementById("rChange").addEventListener("click", function () {
    resetReasons();
    reasonsEl.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  });
  statusBtn.addEventListener("click", openGate);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !gate.hasAttribute("hidden")) closeGate();
  });
  window.addEventListener("hashchange", function () {
    var h = location.hash.replace("#", "");
    if (views[h] && document.body.getAttribute("data-state") !== h) {
      closeGate();
      go(h, false);
    }
  });
  (function init() {
    var h = location.hash.replace("#", "");
    if (views[h]) {
      go(h, false);
      return;
    }
    var saved = null;
    try {
      saved = localStorage.getItem("7ejc-estado");
    } catch (e) {}
    if (saved && views[saved]) go(saved, false);
    else {
      go("aceitei", false);
      statusBtn.setAttribute("hidden", "");
      openGate();
    }
  })();

  /* ---- fechar menu com Esc ---- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
})();
