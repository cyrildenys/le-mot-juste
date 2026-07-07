/* =====================================================================
   Le Mot Juste — Vue « Dictée »
   Choix du niveau → texte, lecture vocale phrase par phrase,
   saisie, puis correction (diff mot-à-mot) et score.
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  const { util, store, tts } = LMJ;
  const el = util && util.el ? util.el.bind(util) : null;

  /* =====================================================================
     Moteur de correction (diff mot-à-mot)
     ===================================================================== */
  function tokenize(text) {
    const re = /[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu;
    return (text.match(re) || []).map((w) => w.replace(/[’]/g, "'"));
  }

  // Distance d'édition mot-à-mot (Levenshtein) avec substitution de premier rang :
  // chaque mot faux, oublié ou en trop compte pour exactement une faute.
  function editDiff(a, b) {
    const n = a.length, m = b.length;
    const D = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
    for (let i = 0; i <= n; i++) D[i][0] = i;
    for (let j = 0; j <= m; j++) D[0][j] = j;
    for (let i = 1; i <= n; i++)
      for (let j = 1; j <= m; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        D[i][j] = Math.min(D[i - 1][j - 1] + cost, D[i - 1][j] + 1, D[i][j - 1] + 1);
      }

    const ops = [];
    let i = n, j = m;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1] && D[i][j] === D[i - 1][j - 1]) { ops.push({ t: "ok", a: a[i - 1] }); i--; j--; }
      else if (i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + 1) { ops.push({ t: "sub", a: a[i - 1], b: b[j - 1] }); i--; j--; }
      else if (i > 0 && D[i][j] === D[i - 1][j] + 1) { ops.push({ t: "del", a: a[i - 1] }); i--; }
      else { ops.push({ t: "ins", b: b[j - 1] }); j--; }
    }
    ops.reverse();
    return ops;
  }

  function correct(original, user) {
    const a = tokenize(original), b = tokenize(user);
    const ops = editDiff(a, b);
    let fautes = 0;
    ops.forEach((o) => { if (o.t !== "ok") fautes++; });
    const total = a.length || 1;
    const pourcent = Math.max(0, Math.round((1 - fautes / total) * 100));
    const note = Math.max(0, Math.round((1 - fautes / total) * 20 * 10) / 10);
    return { ops, fautes, total, pourcent, note };
  }
  LMJ.diffDictee = correct; // exposé pour les tests

  if (!el) { // contexte Node (tests) : on s'arrête après l'export du moteur
    if (typeof module !== "undefined" && module.exports) module.exports = { correct, tokenize };
    return;
  }

  /* =====================================================================
     Icônes
     ===================================================================== */
  const IC = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 19 4 12l7-7M20 19l-7-7 7-7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 19 7-7-7-7M4 19l7-7-7-7"/></svg>',
    replay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  };

  const splitSentences = (t) => (t.match(/[^.!?…]+[.!?…]*/g) || [t]).map((s) => s.trim()).filter(Boolean);

  const bestScores = () => store.get("dicteeScores", {});
  function saveScore(id, res) {
    const s = bestScores();
    if (!s[id] || res.fautes < s[id].fautes) { s[id] = { fautes: res.fautes, total: res.total, date: util.todayKey() }; store.set("dicteeScores", s); }
  }

  function backBtn() {
    return el("button", { class: "back", on: { click: () => LMJ.nav.back() } }, [el("span", { html: IC.back }), document.createTextNode("Retour")]);
  }

  /* =====================================================================
     Écran d'une dictée
     ===================================================================== */
  function openDictee(d) {
    LMJ.nav.push((root) => {
      root.appendChild(backBtn());
      root.appendChild(el("div", { class: "spacer" }));

      root.appendChild(el("div", { class: "section-head", style: { marginTop: "0" } }, [el("h2", { text: d.titre })]));
      if (d.source) root.appendChild(el("div", { class: "muted", style: { marginTop: "-8px", marginBottom: "8px", fontStyle: "italic" }, text: "— " + d.source }));

      if (!tts || !tts.supported) {
        root.appendChild(el("div", { class: "note", style: { marginBottom: "14px" }, text: "La synthèse vocale n'est pas disponible sur cet appareil. Le texte est affiché ci-dessous pour t'entraîner." }));
        root.appendChild(el("div", { class: "card", style: { marginBottom: "14px" }, text: d.texte }));
      }

      const sentences = splitSentences(d.texte);
      let current = 0;
      let rate = store.get("dicteeRate", 0.9);

      /* ----- Lecteur ----- */
      const counter = el("div", { class: "muted", style: { fontSize: "13px" }, text: `Phrase 1 / ${sentences.length}` });
      const playBtn = el("button", { class: "play-btn", html: IC.play, "aria-label": "Écouter" });
      const prevBtn = el("button", { class: "btn", html: IC.prev, "aria-label": "Phrase précédente" });
      const nextBtn = el("button", { class: "btn", html: IC.next, "aria-label": "Phrase suivante" });

      let playing = false;
      function updateCounter() { counter.textContent = `Phrase ${current + 1} / ${sentences.length}`; }
      function playCurrent() {
        if (!tts || !tts.supported) return;
        playing = true; playBtn.innerHTML = IC.pause;
        tts.speak(sentences[current], {
          rate,
          onend: () => { playing = false; playBtn.innerHTML = IC.play; },
        });
      }
      playBtn.addEventListener("click", () => {
        if (playing) { tts.cancel(); playing = false; playBtn.innerHTML = IC.play; }
        else playCurrent();
      });
      prevBtn.addEventListener("click", () => { if (current > 0) current--; updateCounter(); playCurrent(); });
      nextBtn.addEventListener("click", () => { if (current < sentences.length - 1) current++; updateCounter(); playCurrent(); });

      const speed = el("input", { type: "range", min: "0.5", max: "1.2", step: "0.05", value: String(rate) });
      speed.addEventListener("input", () => { rate = parseFloat(speed.value); store.set("dicteeRate", rate); });

      const player = el("div", { class: "player" }, [
        prevBtn, playBtn, nextBtn,
        el("div", { class: "speed-ctl" }, [el("span", { text: "Vitesse" }), speed]),
      ]);
      root.append(counter, el("div", { class: "spacer", style: { height: "6px" } }), player);

      root.appendChild(el("button", { class: "btn ghost block", html: IC.replay + "<span>Réécouter tout le texte</span>", on: { click: () => tts && tts.speak(d.texte, { rate }) } }));

      /* ----- Saisie ----- */
      root.appendChild(el("div", { class: "lbl", style: { fontSize: "12px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", fontWeight: "700", margin: "20px 0 8px" }, text: "Écris ce que tu entends" }));
      const textarea = el("textarea", { class: "dictee-input", placeholder: "Tape ton texte ici…", autocapitalize: "sentences", spellcheck: "false" });
      root.appendChild(textarea);

      const resultBox = el("div");
      const correctBtn = el("button", { class: "btn primary block", text: "Corriger ma dictée", style: { marginTop: "14px" } });
      root.append(correctBtn, resultBox);

      correctBtn.addEventListener("click", () => {
        if (tts) tts.cancel();
        const res = correct(d.texte, textarea.value);
        saveScore(d.id, res);
        renderResult(resultBox, res, d);
        if (resultBox.scrollIntoView) resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, { eyebrow: "Dictée", title: d.titre, sub: "Écoute et recopie" });
  }

  function renderResult(box, res, d) {
    util.clear(box);

    const color = res.fautes === 0 ? "var(--green)" : res.fautes <= 3 ? "var(--amber)" : "var(--red)";
    const card = el("div", { class: "card", style: { marginTop: "16px" } });

    // Score
    card.appendChild(el("div", { class: "score-ring" }, [
      el("div", { class: "score-num", style: { color }, html: `${res.fautes}<small> faute${res.fautes > 1 ? "s" : ""}</small>` }),
      el("div", null, [
        el("div", { style: { fontSize: "20px", fontWeight: "700" }, text: res.note + " / 20" }),
        el("div", { class: "muted", style: { fontSize: "13.5px" }, text: `${res.pourcent} % de réussite · ${res.total} mots` }),
      ]),
    ]));

    const msg = res.fautes === 0 ? "Sans faute, magnifique !" : res.fautes <= 3 ? "Très bien, presque parfait." : res.fautes <= 8 ? "Bon travail, continue de t'exercer." : "Courage, relis les règles et recommence !";
    card.appendChild(el("div", { class: "note astuce", style: { marginTop: "14px" }, text: msg }));

    // Diff
    card.appendChild(el("div", { class: "lbl", style: { fontSize: "12px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", fontWeight: "700", margin: "18px 0 8px" }, text: "Correction" }));
    const diff = el("div", { class: "diff" });
    res.ops.forEach((o) => {
      if (o.t === "ok") diff.append(document.createTextNode(o.a + " "));
      else if (o.t === "sub") { diff.appendChild(el("span", { class: "bad", text: o.b })); diff.append(" "); diff.appendChild(el("span", { class: "miss", text: o.a })); diff.append(" "); }
      else if (o.t === "del") { diff.appendChild(el("span", { class: "miss", text: o.a })); diff.append(" "); }
      else if (o.t === "ins") { diff.appendChild(el("span", { class: "ins", text: o.b })); diff.append(" "); }
    });
    card.appendChild(diff);

    card.appendChild(el("div", { class: "legend" }, [
      el("span", null, [el("i", { style: { background: "var(--red-soft)" } }), document.createTextNode("ce que tu as écrit (faux)")]),
      el("span", null, [el("i", { style: { background: "var(--green-soft)" } }), document.createTextNode("le mot correct / oublié")]),
      el("span", null, [el("i", { style: { background: "var(--amber-soft)" } }), document.createTextNode("mot en trop")]),
    ]));

    // Texte original
    const det = el("details", { class: "rule", style: { marginTop: "14px" } });
    det.append(
      el("summary", null, [el("span", { class: "marker", html: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>' }), document.createTextNode("Voir le texte original")]),
      el("div", { class: "body" }, [el("p", { style: { fontFamily: "var(--serif)", fontSize: "16.5px", lineHeight: "1.7" }, text: d.texte })])
    );
    card.appendChild(det);

    box.appendChild(card);
    box.appendChild(el("button", { class: "btn block", text: "Recommencer cette dictée", style: { marginTop: "12px" }, on: { click: () => { LMJ.nav.back(); setTimeout(() => openDictee(d), 30); } } }));
  }

  /* =====================================================================
     Écran d'un niveau (liste des dictées)
     ===================================================================== */
  function openNiveau(niv) {
    LMJ.nav.push((root) => {
      root.appendChild(backBtn());
      root.appendChild(el("div", { class: "spacer" }));
      const scores = bestScores();
      const list = el("div", { class: "level-list level-" + niv.id });
      LMJ.data.dictees.filter((d) => d.niveau === niv.id).forEach((d) => {
        const best = scores[d.id];
        list.appendChild(el("button", { class: "level-card", on: { click: () => openDictee(d) } }, [
          el("span", { class: "level-dot" }),
          el("div", { style: { flex: "1" } }, [
            el("h3", { text: d.titre }),
            el("div", { class: "meta", text: d.source ? "— " + d.source : (d.texte.split(/\s+/).length + " mots") }),
          ]),
          best ? el("span", { class: "chip", text: "record : " + best.fautes + " f." }) : null,
        ]));
      });
      root.appendChild(list);
    }, { eyebrow: "Dictée", title: niv.nom, sub: niv.desc });
  }

  /* =====================================================================
     Écran racine : les 3 niveaux
     ===================================================================== */
  function render(root) {
    if (!tts || !tts.supported) {
      root.appendChild(el("div", { class: "note", style: { marginBottom: "16px" }, text: "Astuce : sur ton téléphone, la voix française du système lira les dictées. Assure-toi qu'une voix française est installée dans les réglages de synthèse vocale." }));
    }
    root.appendChild(el("p", { class: "muted", text: "Choisis un niveau. Écoute le texte lu à voix haute, recopie-le, puis lance la correction." }));
    const list = el("div", { class: "level-list", style: { marginTop: "12px" } });
    LMJ.data.dicteeNiveaux.forEach((niv) => {
      const count = LMJ.data.dictees.filter((d) => d.niveau === niv.id).length;
      list.appendChild(el("button", { class: "level-card level-" + niv.id, on: { click: () => openNiveau(niv) } }, [
        el("span", { class: "level-dot" }),
        el("div", { style: { flex: "1" } }, [
          el("h3", { text: niv.nom }),
          el("div", { class: "meta", text: niv.desc }),
        ]),
        el("span", { class: "level-badge", text: count + " dictées" }),
      ]));
    });
    root.appendChild(list);
  }

  LMJ.views.dictee = { render };
})();
