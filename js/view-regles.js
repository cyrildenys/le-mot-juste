/* =====================================================================
   Le Mot Juste — Vue « Les règles »
   Grille de catégories, recherche transverse, accordéons de règles,
   comparaisons de vocabulaire, et écran conjugueur.
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  const { util } = LMJ;
  const el = util.el.bind(util);

  /* ---------- Icônes de catégories ---------- */
  const IC = {
    accords: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    conjugaison: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    confusions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3m0-8V5a2 2 0 0 0-2-2h-3"/><path d="m7 8 5 5m0-5-5 5"/></svg>',
    usages: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4m0 4h.01"/></svg>',
    grammaire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
    nuances: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 3-3m0 0 6-6 3 3-6 6H6v-3Zm9-9 3-3 3 3-3 3-3-3Z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/></svg>',
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

  /* =====================================================================
     Rendu des différents types d'items
     ===================================================================== */
  function exemplesNode(exemples) {
    if (!exemples || !exemples.length) return null;
    const box = el("div", { class: "stack", style: { marginTop: "12px" } });
    exemples.forEach((ex) => {
      if (ex.ok) {
        box.appendChild(el("div", { class: "ex ok" }, [
          el("span", { class: "mark", text: "✓" }),
          el("span", { class: "txt", html: ex.texte }),
        ]));
      } else {
        const row = el("div", { class: "ex no" }, [
          el("span", { class: "mark", text: "✗" }),
          el("span", { class: "txt", html: ex.texte }),
        ]);
        box.appendChild(row);
        if (ex.correction) {
          box.appendChild(el("div", { class: "ex ok" }, [
            el("span", { class: "mark", text: "→" }),
            el("span", { class: "txt", html: ex.correction }),
          ]));
        }
      }
    });
    return box;
  }

  function astuceNode(astuce) {
    if (!astuce) return null;
    return el("div", { class: "note astuce", style: { marginTop: "12px" } }, [
      el("strong", { text: "Astuce — " }),
      document.createTextNode(astuce),
    ]);
  }

  function ruleNode(item, open) {
    const det = el("details", { class: "rule" });
    if (open) det.open = true;
    const sum = el("summary", null, [
      el("span", { class: "marker", html: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>' }),
      el("span", null, [
        el("div", { text: item.titre }),
        item.resume ? el("div", { class: "muted", style: { fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: "400", marginTop: "2px" }, text: item.resume }) : null,
      ]),
    ]);
    const body = el("div", { class: "body" });
    if (item.explication) body.appendChild(el("div", { html: item.explication }));
    const ex = exemplesNode(item.exemples);
    if (ex) body.appendChild(ex);
    const as = astuceNode(item.astuce);
    if (as) body.appendChild(as);
    det.append(sum, body);
    return det;
  }

  function confusionNode(item) {
    const card = el("div", { class: "card" });
    card.appendChild(el("h3", { text: item.titre, style: { fontSize: "19px", marginBottom: "10px", color: "var(--accent-ink)" } }));
    item.entrees.forEach((e) => {
      card.appendChild(el("div", { class: "nuance-word", style: { marginBottom: "8px" } }, [
        el("span", { class: "w", text: e.mot }),
        el("span", { class: "chip", style: { marginLeft: "8px", verticalAlign: "middle" }, text: e.nature }),
        el("div", { class: "d", text: e.sens }),
        e.exemple ? el("div", { class: "e", text: "« " + e.exemple + " »" }) : null,
      ]));
    });
    const as = astuceNode(item.astuce);
    if (as) card.appendChild(as);
    return card;
  }

  function nuanceNode(item) {
    const card = el("div", { class: "card" });
    card.appendChild(el("h3", { text: item.titre, style: { fontSize: "19px", marginBottom: "8px", color: "var(--accent-ink)" } }));
    if (item.cle) {
      card.appendChild(el("div", { class: "note astuce", style: { marginBottom: "12px" } }, [
        el("strong", { text: "La clé — " }), document.createTextNode(item.cle),
      ]));
    }
    const grid = el("div", { class: "nuance-pair" });
    item.entrees.forEach((e) => {
      grid.appendChild(el("div", { class: "nuance-word" }, [
        el("div", { class: "w", text: e.mot }),
        el("div", { class: "d", text: e.sens }),
        e.exemple ? el("div", { class: "e", text: "« " + e.exemple + " »" }) : null,
      ]));
    });
    card.appendChild(grid);
    return card;
  }

  function itemNode(type, item) {
    if (type === "confusion") return confusionNode(item);
    if (type === "nuance") return nuanceNode(item);
    return ruleNode(item);
  }

  /* =====================================================================
     Conjugueur
     ===================================================================== */
  const PRO_IND = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];
  const PRO_SUBJ = ["que je", "que tu", "qu'il/elle", "que nous", "que vous", "qu'ils/elles"];
  const IMP_LBL = ["(tu)", "(nous)", "(vous)"];

  function elide(pro, form) {
    const voyelle = /^[aàâeéèêiîïoôu ùûyh]/i.test(form);
    if (voyelle) {
      if (pro === "je") return "j'" + form;
      if (pro === "que je") return "que j'" + form;
    }
    return pro + " " + form;
  }

  function tenseBlock(label, forms, mode) {
    if (!forms) return null;
    const box = el("div", { class: "card", style: { padding: "14px 16px" } });
    box.appendChild(el("div", { class: "lbl", style: { fontSize: "11px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", fontWeight: "700", marginBottom: "8px" }, text: label }));
    const list = el("div", { style: { fontFamily: "var(--serif)", fontSize: "16px", lineHeight: "1.85" } });
    forms.forEach((f, i) => {
      if (f == null) return;
      let txt;
      if (mode === "imp") txt = f + " ";
      else txt = elide(mode === "subj" ? PRO_SUBJ[i] : PRO_IND[i], f);
      const row = el("div", null, [
        mode === "imp" ? el("span", { class: "muted", style: { fontSize: "12px", marginRight: "6px" }, text: IMP_LBL[i] }) : null,
        document.createTextNode(txt),
      ]);
      list.appendChild(row);
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
        el("p", { class: "muted", text: "Le moteur couvre tous les verbes en -er et -ir réguliers, plus une cinquantaine d'irréguliers essentiels. Les verbes en -re/-oir irréguliers seront ajoutés progressivement." }),
      ]));
      return;
    }

    const grpLabel = c.groupe === 1 ? "1er groupe" : c.groupe === 2 ? "2e groupe" : "3e groupe";
    const head = el("div", { class: "card", style: { marginBottom: "16px", background: "var(--surface-2)" } }, [
      el("div", { style: { display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" } }, [
        el("h2", { text: c.infinitif, style: { fontSize: "28px", color: "var(--accent-ink)" } }),
        el("span", { class: "chip accent", text: grpLabel }),
        el("span", { class: "chip", text: "auxiliaire " + (c.aux === "etre" ? "être" : "avoir") }),
        c.irregulier ? el("span", { class: "chip gold", text: "irrégulier" }) : null,
      ]),
      el("div", { class: "muted", style: { marginTop: "8px", fontSize: "14.5px" }, html:
        `Participe présent : <strong>${util.escape(c.participePresent || "—")}</strong> · Participe passé : <strong>${util.escape(c.participePasse)}</strong> · Gérondif : <strong>en ${util.escape(c.participePresent || "—")}</strong>` }),
      c.aux === "etre" ? el("div", { class: "note", style: { marginTop: "10px" }, text: "Auxiliaire être : aux temps composés, le participe s'accorde avec le sujet (ex. allé, allée, allés, allées)." }) : null,
    ]);
    container.appendChild(head);

    const modes = [
      { nom: "Indicatif", mode: "ind", temps: [
        ["Présent", c.indicatif.present], ["Passé composé", c.indicatif.passeCompose],
        ["Imparfait", c.indicatif.imparfait], ["Plus-que-parfait", c.indicatif.plusQueParfait],
        ["Passé simple", c.indicatif.passeSimple], ["Passé antérieur", c.indicatif.passeAnterieur],
        ["Futur simple", c.indicatif.futurSimple], ["Futur antérieur", c.indicatif.futurAnterieur],
      ] },
      { nom: "Conditionnel", mode: "ind", temps: [
        ["Présent", c.conditionnel.present], ["Passé", c.conditionnel.passe],
      ] },
      { nom: "Subjonctif", mode: "subj", temps: [
        ["Présent", c.subjonctif.present], ["Passé", c.subjonctif.passe],
        ["Imparfait", c.subjonctif.imparfait], ["Plus-que-parfait", c.subjonctif.plusQueParfait],
      ] },
      { nom: "Impératif", mode: "imp", temps: [
        ["Présent", c.imperatif.present], ["Passé", c.imperatif.passe],
      ] },
    ];

    modes.forEach((m) => {
      const anyForm = m.temps.some(([, f]) => f && f.some((x) => x != null));
      if (!anyForm) return;
      container.appendChild(el("h3", { text: m.nom, style: { fontSize: "18px", margin: "22px 0 12px" } }));
      const grid = el("div", { style: { display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" } });
      m.temps.forEach(([label, forms]) => {
        const b = tenseBlock(label, forms, m.mode);
        if (b) grid.appendChild(b);
      });
      container.appendChild(grid);
    });
  }

  function openConjugaison(initialVerb) {
    LMJ.nav.push((root) => {
      root.appendChild(backBtn());

      const search = el("div", { class: "search", style: { marginBottom: "12px" } });
      const input = el("input", { type: "text", placeholder: "Entrez un verbe à l'infinitif…", autocapitalize: "none", autocomplete: "off", spellcheck: "false", enterkeyhint: "search" });
      search.append(el("span", { html: IC.search }), input);
      root.appendChild(search);

      const chips = el("div", { style: { display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "16px" } });
      LMJ.verbesSuggestions.slice(0, 16).forEach((v) => {
        chips.appendChild(el("button", { class: "chip", style: { cursor: "pointer" }, text: v, on: { click: () => { input.value = v; go(v); } } }));
      });
      root.appendChild(chips);

      const results = el("div");
      root.appendChild(results);

      function go(v) {
        const verbe = (v || input.value).trim();
        if (!verbe) return;
        renderConjugaison(results, verbe);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });

      // Règles de conjugaison sous le conjugueur
      root.appendChild(el("h3", { text: "Règles de conjugaison", style: { fontSize: "18px", margin: "26px 0 12px" } }));
      (LMJ.data.conjugaisonRegles || []).forEach((r) => root.appendChild(ruleNode(r)));

      const start = (initialVerb || "aimer").trim();
      input.value = start === "aimer" ? "" : start;
      go(start);
    }, { eyebrow: "Conjugaison", title: "Conjugueur", sub: "Tous les temps, tous les modes" });
  }

  /* =====================================================================
     Écran d'une catégorie
     ===================================================================== */
  function backBtn() {
    return el("button", { class: "back", on: { click: () => LMJ.nav.back() } }, [
      el("span", { html: IC.back }), document.createTextNode("Retour"),
    ]);
  }

  function openCategory(cat) {
    if (cat.type === "conjugaison") return openConjugaison();
    LMJ.nav.push((root) => {
      root.appendChild(backBtn());
      root.appendChild(el("div", { class: "spacer" }));
      const list = el("div", { class: "stack" });
      (cat.data || []).forEach((item) => list.appendChild(itemNode(cat.type, item)));
      root.appendChild(list);
    }, { eyebrow: "Les règles", title: cat.nom, sub: cat.desc });
  }

  /* =====================================================================
     Recherche transverse
     ===================================================================== */
  function buildIndex() {
    const idx = [];
    categories().forEach((cat) => {
      (cat.data || []).forEach((item) => {
        let hay = item.titre + " " + (item.resume || "") + " " + (item.cle || "");
        if (item.explication) hay += " " + item.explication;
        if (item.entrees) hay += " " + item.entrees.map((e) => (e.mot || "") + " " + (e.sens || "")).join(" ");
        if (item.astuce) hay += " " + item.astuce;
        idx.push({ cat, type: cat.type === "conjugaison" ? "rule" : cat.type, item, hay: util.normSearch(hay) });
      });
    });
    return idx;
  }

  /* =====================================================================
     Écran racine
     ===================================================================== */
  function render(root) {
    const cats = categories();
    const idx = buildIndex();

    // Recherche
    const search = el("div", { class: "search" });
    const input = el("input", { type: "text", placeholder: "Rechercher une règle, un mot, un verbe…", autocapitalize: "none", autocomplete: "off", spellcheck: "false", enterkeyhint: "search" });
    search.append(el("span", { html: IC.search }), input);
    root.appendChild(search);

    const resultsWrap = el("div");
    const gridWrap = el("div");
    root.append(resultsWrap, gridWrap);

    // Grille des catégories
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

    function runSearch() {
      const q = util.normSearch(input.value);
      util.clear(resultsWrap);
      if (q.length < 2) { gridWrap.style.display = ""; return; }
      gridWrap.style.display = "none";
      const hits = idx.filter((r) => r.hay.includes(q)).slice(0, 30);

      resultsWrap.appendChild(el("div", { class: "muted", style: { margin: "14px 2px 6px", fontSize: "13.5px" }, text: hits.length + " résultat(s)" }));

      if (!hits.length) {
        resultsWrap.appendChild(el("div", { class: "empty" }, [
          el("p", { text: "Aucune règle trouvée." }),
          /(er|ir|re|oir)$/.test(q)
            ? el("button", { class: "btn primary", text: "Conjuguer « " + input.value.trim() + " »", on: { click: () => openConjugaison(input.value.trim()) } })
            : null,
        ]));
        return;
      }
      const list = el("div", { class: "stack" });
      hits.forEach((h) => {
        const wrap = el("div");
        wrap.appendChild(el("span", { class: "chip accent", style: { marginBottom: "8px" }, text: h.cat.nom }));
        wrap.appendChild(itemNode(h.type, h.item));
        list.appendChild(wrap);
      });
      resultsWrap.appendChild(list);
    }

    let t;
    input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(runSearch, 120); });
  }

  LMJ.views.regles = { render };
})();
