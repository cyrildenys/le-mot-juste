/* =====================================================================
   Le Mot Juste — Vue « Les règles »
   Cartes légères (titre + court explicatif) → page « cours » détaillée
   → quiz QCM (phrases à trou). + recherche transverse + conjugueur.
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  const { util } = LMJ;
  const el = util.el.bind(util);

  /* ---------- Icônes ---------- */
  const IC = {
    accords: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    conjugaison: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    confusions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3m0-8V5a2 2 0 0 0-2-2h-3"/><path d="m7 8 5 5m0-5-5 5"/></svg>',
    usages: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4m0 4h.01"/></svg>',
    grammaire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
    nuances: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 3-3m0 0 6-6 3 3-6 6H6v-3Zm9-9 3-3 3 3-3 3-3-3Z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    quiz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    cross: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  };

  function categories() {
    const d = LMJ.data;
    return [
      { id: "accords", nom: "Les accords", desc: "Adjectifs, participes passés, tout, leur…", data: d.accords, type: "rule" },
      { id: "conjugaison", nom: "Conjugaison", desc: "Conjuguer un verbe + règles de temps", type: "conjugaison", data: d.conjugaisonRegles },
      { id: "confusions", nom: "Confusions fréquentes", desc: "a/à, ces/ses, quel/qu'elle…", data: d.confusions, type: "confusion" },
      { id: "usages", nom: "Mauvais usages", desc: "Pléonasmes, barbarismes, fautes", data: d.mauvaisUsages, type: "rule" },
      { id: "grammaire", nom: "Notions de grammaire", desc: "Nature, fonction, propositions…", data: d.grammaire, type: "rule" },
      { id: "nuances", nom: "Vocabulaire : nuances", desc: "Mots proches, sens différents", data: d.nuances, type: "nuance" },
    ];
  }

  /* Court explicatif affiché sur la carte et en chapô de la page cours */
  function shortText(item, type) {
    if (item.resume) return item.resume;
    if (type === "confusion") return "Homophones à ne plus confondre.";
    if (type === "nuance") return item.cle ? item.cle : "Mots proches, sens différents.";
    return "";
  }
  const NIVEAUX = { 1: { nom: "Facile", cls: "niv-1" }, 2: { nom: "Intermédiaire", cls: "niv-2" }, 3: { nom: "Expert", cls: "niv-3" } };
  const niv3 = (n) => (n >= 3 ? 3 : n <= 1 ? 1 : 2);

  // Toutes les questions de la catégorie de la fiche (pour un quiz progressif).
  function categoryDataOf(item) {
    const cat = categories().find((c) => (c.data || []).some((x) => x.id === item.id));
    return cat ? cat.data : [item];
  }
  function quizPool(item) {
    const pool = [];
    categoryDataOf(item).forEach((r) => {
      (LMJ.data.quiz[r.id] || []).forEach((q) => pool.push(Object.assign({ _own: r.id === item.id, _n: niv3(q.n || 1) }, q)));
    });
    return pool;
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // Construit un quiz d'au moins 10 questions, ordonné par difficulté croissante.
  function buildRamp(item) {
    const pool = quizPool(item);
    const tiers = { 1: [], 2: [], 3: [] };
    pool.forEach((q) => tiers[q._n].push(q));
    [1, 2, 3].forEach((k) => { tiers[k] = tiers[k].filter((q) => q._own).concat(shuffle(tiers[k].filter((q) => !q._own))); });
    const want = 10, desired = { 1: 4, 2: 3, 3: 3 };
    let pick = [];
    [1, 2, 3].forEach((k) => { pick = pick.concat(tiers[k].slice(0, desired[k])); });
    if (pick.length < want) {
      const rest = [];
      [1, 2, 3].forEach((k) => rest.push(...tiers[k].slice(desired[k])));
      for (const q of rest) { if (pick.length >= want) break; pick.push(q); }
    }
    pick.sort((a, b) => a._n - b._n);
    return pick;
  }

  /* ---------- Carte légère ---------- */
  function cardNode(item, type) {
    return el("button", { class: "rule-card", on: { click: () => openDetail(item, type) } }, [
      el("div", { class: "rc-body" }, [
        el("div", { class: "rc-title", text: item.titre }),
        el("div", { class: "rc-sub", text: shortText(item, type) }),
      ]),
      el("span", { class: "rc-arrow", html: IC.arrow }),
    ]);
  }

  /* ---------- Contenu détaillé (page cours) selon le type ---------- */
  function exemplesNode(exemples) {
    if (!exemples || !exemples.length) return null;
    const box = el("div", { class: "stack", style: { marginTop: "6px" } });
    exemples.forEach((ex) => {
      if (ex.ok) {
        box.appendChild(el("div", { class: "ex ok" }, [el("span", { class: "mark", text: "✓" }), el("span", { class: "txt", html: ex.texte })]));
      } else {
        box.appendChild(el("div", { class: "ex no" }, [el("span", { class: "mark", text: "✗" }), el("span", { class: "txt", html: ex.texte })]));
        if (ex.correction) box.appendChild(el("div", { class: "ex ok" }, [el("span", { class: "mark", text: "→" }), el("span", { class: "txt", html: ex.correction })]));
      }
    });
    return box;
  }
  function astuceNode(astuce) {
    if (!astuce) return null;
    return el("div", { class: "note astuce", style: { marginTop: "14px" } }, [el("strong", { text: "Astuce — " }), document.createTextNode(astuce)]);
  }

  function detailBody(item, type) {
    const wrap = el("div");
    if (type === "confusion") {
      item.entrees.forEach((e) => {
        wrap.appendChild(el("div", { class: "nuance-word", style: { marginBottom: "8px" } }, [
          el("span", { class: "w", text: e.mot }),
          el("span", { class: "chip", style: { marginLeft: "8px", verticalAlign: "middle" }, text: e.nature }),
          el("div", { class: "d", text: e.sens }),
          e.exemple ? el("div", { class: "e", text: "« " + e.exemple + " »" }) : null,
        ]));
      });
      wrap.appendChild(astuceNode(item.astuce));
    } else if (type === "nuance") {
      if (item.cle) wrap.appendChild(el("div", { class: "note astuce", style: { marginBottom: "14px" } }, [el("strong", { text: "La clé — " }), document.createTextNode(item.cle)]));
      const grid = el("div", { class: "nuance-pair" });
      item.entrees.forEach((e) => grid.appendChild(el("div", { class: "nuance-word" }, [
        el("div", { class: "w", text: e.mot }), el("div", { class: "d", text: e.sens }), e.exemple ? el("div", { class: "e", text: "« " + e.exemple + " »" }) : null,
      ])));
      wrap.appendChild(grid);
    } else {
      if (item.explication) wrap.appendChild(el("div", { class: "cours-body", html: item.explication }));
      const ex = exemplesNode(item.exemples);
      if (ex) { wrap.appendChild(el("div", { class: "cours-section-lbl", text: "Exemples" })); wrap.appendChild(ex); }
      const as = astuceNode(item.astuce);
      if (as) wrap.appendChild(as);
    }
    return wrap;
  }

  function backBtn() {
    return el("button", { class: "back", on: { click: () => LMJ.nav.back() } }, [el("span", { html: IC.back }), document.createTextNode("Retour")]);
  }

  /* ---------- Page cours ---------- */
  function openDetail(item, type) {
    LMJ.nav.push((root) => {
      root.appendChild(backBtn());
      root.appendChild(el("div", { class: "cours-lead", style: { marginTop: "10px" }, text: shortText(item, type) }));
      root.appendChild(detailBody(item, type));

      const pool = quizPool(item);
      if (pool.length) {
        const n = pool.length >= 10 ? 10 : pool.length;
        root.appendChild(el("div", { class: "spacer", style: { height: "8px" } }));
        root.appendChild(el("button", {
          class: "btn primary block", style: { marginTop: "14px" },
          html: IC.quiz + `<span>Lancer le quiz · ${n} questions</span>`,
          on: { click: () => openQuiz(item) },
        }));
        root.appendChild(el("div", { class: "muted", style: { textAlign: "center", fontSize: "12.5px", marginTop: "8px" }, text: "Difficulté croissante, du facile à l'expert." }));
      }
    }, { eyebrow: "Fiche", title: item.titre });
  }

  /* ---------- Quiz ---------- */
  function openQuiz(item) {
    let questions = buildRamp(item);
    const state = { i: 0, score: 0, answered: false, chosen: -1 };

    LMJ.nav.push((root) => {
      const host = el("div");
      root.appendChild(host);

      function draw() {
        util.clear(host);
        if (state.i >= questions.length) return drawResult();
        const q = questions[state.i];

        // Progression
        host.appendChild(el("div", { class: "quiz-progress" }, [
          el("span", { text: `Question ${state.i + 1} / ${questions.length}` }),
          el("span", { text: `Score : ${state.score}` }),
        ]));
        host.appendChild(el("div", { class: "quiz-bar" }, el("i", { style: { width: Math.round((state.i / questions.length) * 100) + "%" } })));

        // Badge de niveau
        const niv = NIVEAUX[q._n || 1];
        host.appendChild(el("div", { style: { marginBottom: "14px" } }, el("span", { class: "niv-badge " + niv.cls, text: niv.nom })));

        // Question / phrase à trou
        host.appendChild(sentenceNode(q, state.answered ? q.options[q.reponse] : null));

        // Options
        const opts = el("div", { class: "quiz-opts" });
        q.options.forEach((opt, idx) => {
          const dot = el("span", { class: "dot" });
          const b = el("button", { class: "quiz-opt" }, [dot, document.createTextNode(opt)]);
          if (state.answered) {
            b.classList.add("locked");
            if (idx === q.reponse) { b.classList.add("correct"); dot.innerHTML = IC.check; }
            else if (idx === state.chosen) { b.classList.add("wrong"); dot.innerHTML = IC.cross; }
            else b.classList.add("dim");
          } else {
            b.addEventListener("click", () => {
              state.answered = true; state.chosen = idx;
              if (idx === q.reponse) state.score++;
              draw();
            });
          }
          opts.appendChild(b);
        });
        host.appendChild(opts);

        // Explication + suite
        if (state.answered) {
          const ok = state.chosen === q.reponse;
          host.appendChild(el("div", { class: "note astuce quiz-explain" }, [
            el("strong", { text: ok ? "Bravo ! " : "Pas tout à fait. " }),
            document.createTextNode(q.explication || ""),
          ]));
          const last = state.i === questions.length - 1;
          host.appendChild(el("button", {
            class: "btn primary block", style: { marginTop: "18px" },
            text: last ? "Voir le résultat" : "Question suivante",
            on: { click: () => { state.i++; state.answered = false; state.chosen = -1; draw(); window.scrollTo({ top: 0 }); } },
          }));
        }
      }

      function drawResult() {
        const total = questions.length;
        const r = state.score / total;
        const medal = r === 1 ? "🏆" : r >= 0.7 ? "🎉" : r >= 0.5 ? "👍" : "📚";
        const msg = r === 1 ? "Sans faute, parfait !" : r >= 0.7 ? "Très bon score !" : r >= 0.5 ? "Pas mal, continue !" : "Relis la fiche et retente ta chance.";
        util.clear(host);
        host.appendChild(el("div", { class: "quiz-result" }, [
          el("div", { class: "quiz-medal", text: medal }),
          el("div", { class: "quiz-score", html: `${state.score}<small> / ${total}</small>` }),
          el("div", { class: "muted", style: { marginTop: "8px", fontSize: "16px" }, text: msg }),
        ]));
        host.appendChild(el("button", {
          class: "btn primary block", style: { marginTop: "18px" }, text: "Recommencer le quiz",
          on: { click: () => { questions = buildRamp(item); state.i = 0; state.score = 0; state.answered = false; state.chosen = -1; draw(); window.scrollTo({ top: 0 }); } },
        }));
        host.appendChild(el("button", { class: "btn block", style: { marginTop: "10px" }, text: "Retour à la fiche", on: { click: () => LMJ.nav.back() } }));
      }

      draw();
    }, { eyebrow: "Quiz", title: item.titre });
  }

  function sentenceNode(q, revealWord) {
    if (q.q.indexOf("___") === -1) return el("div", { class: "quiz-question", text: q.q });
    const parts = q.q.split("___");
    const frag = el("div", { class: "quiz-question" });
    frag.appendChild(document.createTextNode(parts[0]));
    if (revealWord) {
      frag.appendChild(el("strong", { style: { color: "var(--accent-ink)" }, text: revealWord }));
    } else {
      frag.appendChild(el("span", { class: "quiz-blank", html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" }));
    }
    frag.appendChild(document.createTextNode(parts.slice(1).join("___")));
    return frag;
  }

  /* ---------- Écran d'une catégorie ---------- */
  function openCategory(cat) {
    if (cat.type === "conjugaison") return openConjugaison();
    LMJ.nav.push((root) => {
      root.appendChild(backBtn());
      root.appendChild(el("div", { class: "spacer" }));
      (cat.data || []).forEach((item) => root.appendChild(cardNode(item, cat.type)));
    }, { eyebrow: "Les règles", title: cat.nom, sub: cat.desc });
  }

  /* =====================================================================
     Conjugueur (inchangé sur le fond ; les règles de conjugaison passent
     en cartes légères → page cours → quiz).
     ===================================================================== */
  const PRO_IND = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];
  const PRO_SUBJ = ["que je", "que tu", "qu'il/elle", "que nous", "que vous", "qu'ils/elles"];
  const IMP_LBL = ["(tu)", "(nous)", "(vous)"];
  function elide(pro, form) {
    const voyelle = /^[aàâeéèêiîïoôu ùûyh]/i.test(form);
    if (voyelle) { if (pro === "je") return "j'" + form; if (pro === "que je") return "que j'" + form; }
    return pro + " " + form;
  }
  function tenseBlock(label, forms, mode) {
    if (!forms) return null;
    const box = el("div", { class: "card", style: { padding: "14px 16px" } });
    box.appendChild(el("div", { style: { fontSize: "11px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", fontWeight: "700", marginBottom: "8px" }, text: label }));
    const list = el("div", { style: { fontFamily: "var(--serif)", fontSize: "16px", lineHeight: "1.85" } });
    forms.forEach((f, i) => {
      if (f == null) return;
      let txt = mode === "imp" ? f + " " : elide(mode === "subj" ? PRO_SUBJ[i] : PRO_IND[i], f);
      list.appendChild(el("div", null, [
        mode === "imp" ? el("span", { class: "muted", style: { fontSize: "12px", marginRight: "6px" }, text: IMP_LBL[i] }) : null,
        document.createTextNode(txt),
      ]));
    });
    box.appendChild(list);
    return box;
  }
  function renderConjugaison(container, verbe) {
    util.clear(container);
    const c = LMJ.conjugue(verbe);
    if (!c.disponible) {
      container.appendChild(el("div", { class: "empty" }, [
        el("div", { html: IC.search }),
        el("p", { html: `Le verbe <strong>« ${util.escape(c.infinitif)} »</strong> n'est pas encore dans la base.` }),
        el("p", { class: "muted", text: "Le moteur couvre tous les verbes en -er et -ir réguliers, plus une cinquantaine d'irréguliers essentiels." }),
      ]));
      return;
    }
    const grpLabel = c.groupe === 1 ? "1er groupe" : c.groupe === 2 ? "2e groupe" : "3e groupe";
    container.appendChild(el("div", { class: "card", style: { marginBottom: "16px", background: "var(--surface-2)" } }, [
      el("div", { style: { display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" } }, [
        el("h2", { text: c.infinitif, style: { fontSize: "28px", color: "var(--accent-ink)" } }),
        el("span", { class: "chip accent", text: grpLabel }),
        el("span", { class: "chip", text: "auxiliaire " + (c.aux === "etre" ? "être" : "avoir") }),
        c.irregulier ? el("span", { class: "chip gold", text: "irrégulier" }) : null,
      ]),
      el("div", { class: "muted", style: { marginTop: "8px", fontSize: "14.5px" }, html: `Participe présent : <strong>${util.escape(c.participePresent || "—")}</strong> · Participe passé : <strong>${util.escape(c.participePasse)}</strong> · Gérondif : <strong>en ${util.escape(c.participePresent || "—")}</strong>` }),
      c.aux === "etre" ? el("div", { class: "note", style: { marginTop: "10px" }, text: "Auxiliaire être : aux temps composés, le participe s'accorde avec le sujet." }) : null,
    ]));
    const modes = [
      { nom: "Indicatif", mode: "ind", temps: [["Présent", c.indicatif.present], ["Passé composé", c.indicatif.passeCompose], ["Imparfait", c.indicatif.imparfait], ["Plus-que-parfait", c.indicatif.plusQueParfait], ["Passé simple", c.indicatif.passeSimple], ["Passé antérieur", c.indicatif.passeAnterieur], ["Futur simple", c.indicatif.futurSimple], ["Futur antérieur", c.indicatif.futurAnterieur]] },
      { nom: "Conditionnel", mode: "ind", temps: [["Présent", c.conditionnel.present], ["Passé", c.conditionnel.passe]] },
      { nom: "Subjonctif", mode: "subj", temps: [["Présent", c.subjonctif.present], ["Passé", c.subjonctif.passe], ["Imparfait", c.subjonctif.imparfait], ["Plus-que-parfait", c.subjonctif.plusQueParfait]] },
      { nom: "Impératif", mode: "imp", temps: [["Présent", c.imperatif.present], ["Passé", c.imperatif.passe]] },
    ];
    modes.forEach((m) => {
      if (!m.temps.some(([, f]) => f && f.some((x) => x != null))) return;
      container.appendChild(el("h3", { text: m.nom, style: { fontSize: "18px", margin: "22px 0 12px" } }));
      const grid = el("div", { style: { display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" } });
      m.temps.forEach(([label, forms]) => { const b = tenseBlock(label, forms, m.mode); if (b) grid.appendChild(b); });
      container.appendChild(grid);
    });
  }
  // Page dédiée à la conjugaison d'un verbe.
  function openVerbe(verbe) {
    const v = (verbe || "").trim();
    if (!v) return;
    LMJ.nav.push((root) => {
      root.appendChild(backBtn());
      const c = el("div", { style: { marginTop: "10px" } });
      root.appendChild(c);
      renderConjugaison(c, v);
    }, { eyebrow: "Conjugaison", title: v });
  }

  function openConjugaison(initialVerb) {
    if (initialVerb) return openVerbe(initialVerb);
    LMJ.nav.push((root) => {
      root.appendChild(backBtn());

      // Recherche (seule ; plus de chips-filtres)
      const search = el("div", { class: "search", style: { margin: "12px 0 6px" } });
      const input = el("input", { type: "text", placeholder: "Rechercher un verbe à conjuguer…", autocapitalize: "none", autocomplete: "off", spellcheck: "false", enterkeyhint: "search" });
      search.append(el("span", { html: IC.search }), input);
      root.appendChild(search);
      input.addEventListener("keydown", (e) => { if (e.key === "Enter" && input.value.trim()) openVerbe(input.value.trim()); });
      root.appendChild(el("div", { class: "muted", style: { fontSize: "12.5px", margin: "0 2px" }, text: "Tape un verbe puis Entrée, ou choisis-en un dans l'annexe plus bas." }));

      // Règles de conjugaison — tout en haut
      root.appendChild(el("h3", { text: "Règles de conjugaison", style: { fontSize: "18px", margin: "22px 0 12px" } }));
      (LMJ.data.conjugaisonRegles || []).forEach((r) => root.appendChild(cardNode(r, "rule")));

      // Annexe des verbes — en bas
      root.appendChild(el("h3", { text: "Annexe des verbes", style: { fontSize: "18px", margin: "28px 0 6px" } }));
      root.appendChild(el("div", { class: "muted", style: { fontSize: "12.5px", marginBottom: "12px" }, text: "Sélectionne un verbe pour ouvrir sa conjugaison complète." }));
      const cloud = el("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } });
      [...new Set(LMJ.verbesAnnexe || [])]
        .filter((v) => LMJ.conjugue(v).disponible)
        .sort((a, b) => a.localeCompare(b, "fr"))
        .forEach((v) => cloud.appendChild(el("button", { class: "chip", style: { cursor: "pointer" }, text: v, on: { click: () => openVerbe(v) } })));
      root.appendChild(cloud);
    }, { eyebrow: "Conjugaison", title: "Conjugueur", sub: "Règles + annexe des verbes" });
  }

  /* ---------- Recherche transverse ---------- */
  function buildIndex() {
    const idx = [];
    categories().forEach((cat) => {
      (cat.data || []).forEach((item) => {
        let hay = item.titre + " " + (item.resume || "") + " " + (item.cle || "");
        if (item.explication) hay += " " + item.explication;
        if (item.entrees) hay += " " + item.entrees.map((e) => (e.mot || "") + " " + (e.sens || "")).join(" ");
        if (item.astuce) hay += " " + item.astuce;
        idx.push({ item, type: cat.type === "conjugaison" ? "rule" : cat.type, catNom: cat.nom, hay: util.normSearch(hay) });
      });
    });
    return idx;
  }

  /* ---------- Écran racine ---------- */
  function render(root) {
    const cats = categories();
    const idx = buildIndex();

    const search = el("div", { class: "search" });
    const input = el("input", { type: "text", placeholder: "Rechercher une règle, un mot, un verbe…", autocapitalize: "none", autocomplete: "off", spellcheck: "false", enterkeyhint: "search" });
    search.append(el("span", { html: IC.search }), input);
    root.appendChild(search);

    const resultsWrap = el("div");
    const gridWrap = el("div");
    root.append(resultsWrap, gridWrap);

    const grid = el("div", { class: "cat-grid", style: { marginTop: "18px" } });
    cats.forEach((cat) => {
      const n = cat.data ? cat.data.length : 0;
      grid.appendChild(el("button", { class: "cat-tile", on: { click: () => openCategory(cat) } }, [
        el("div", { class: "ic", html: IC[cat.id] || IC.grammaire }),
        el("h3", { text: cat.nom }),
        el("div", { class: "count", text: cat.type === "conjugaison" ? "Conjugueur + " + n + " règles" : n + " fiches" }),
      ]));
    });
    gridWrap.appendChild(grid);

    // Pied de page : compteurs + version (pour vérifier la mise à jour)
    const totalFiches = cats.reduce((s, c) => s + (c.data ? c.data.length : 0), 0);
    const nbMots = (LMJ.data.mots || []).length;
    gridWrap.appendChild(el("div", {
      class: "muted",
      style: { textAlign: "center", fontSize: "12px", marginTop: "22px", opacity: ".75" },
      text: `${totalFiches} fiches · ${nbMots} mots · Le Mot Juste ${LMJ.VERSION || ""}`,
    }));

    function runSearch() {
      const q = util.normSearch(input.value);
      util.clear(resultsWrap);
      if (q.length < 2) { gridWrap.style.display = ""; return; }
      gridWrap.style.display = "none";
      const hits = idx.filter((r) => r.hay.includes(q)).slice(0, 40);
      resultsWrap.appendChild(el("div", { class: "muted", style: { margin: "14px 2px 10px", fontSize: "13.5px" }, text: hits.length + " résultat(s)" }));
      if (!hits.length) {
        resultsWrap.appendChild(el("div", { class: "empty" }, [
          el("p", { text: "Aucune règle trouvée." }),
          /(er|ir|re|oir)$/.test(q) ? el("button", { class: "btn primary", text: "Conjuguer « " + input.value.trim() + " »", on: { click: () => openConjugaison(input.value.trim()) } }) : null,
        ]));
        return;
      }
      hits.forEach((h) => resultsWrap.appendChild(cardNode(h.item, h.type)));
    }
    let t;
    input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(runSearch, 120); });
  }

  LMJ.views.regles = { render };
})();
