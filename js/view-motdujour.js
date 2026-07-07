/* =====================================================================
   Le Mot Juste — Vue « Mot du jour »
   Tirage déterministe par date, définition + exemples, prononciation,
   favoris, historique, exploration aléatoire.
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  const { util, store, tts } = LMJ;
  const el = util.el.bind(util);

  const IC = {
    speak: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.5 1.1-1a5.5 5.5 0 0 0 0-7.9z"/></svg>',
    heartFull: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.5 1.1-1a5.5 5.5 0 0 0 0-7.9z"/></svg>',
    dice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.3" fill="currentColor"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  };

  const mots = () => LMJ.data.mots || [];
  const wordFor = (date) => { const m = mots(); return m.length ? m[((util.dayNumber(date) % m.length) + m.length) % m.length] : null; };

  const getFavs = () => store.get("favoris", []);
  const isFav = (mot) => getFavs().indexOf(mot) !== -1;
  function toggleFav(mot) {
    const f = getFavs();
    const i = f.indexOf(mot);
    if (i === -1) f.push(mot); else f.splice(i, 1);
    store.set("favoris", f);
    return i === -1;
  }
  const findMot = (nom) => mots().find((m) => m.mot === nom);

  /* ---------- Carte d'un mot ---------- */
  function chips(m) {
    const box = el("div", { class: "mdj-meta" });
    box.appendChild(el("span", { class: "chip accent", text: m.nature }));
    box.appendChild(el("span", { class: "chip", text: m.registre }));
    if (m.domaine) box.appendChild(el("span", { class: "chip gold", text: m.domaine }));
    return box;
  }

  function block(label, node) {
    return el("div", { class: "mdj-block" }, [el("div", { class: "lbl", text: label }), node]);
  }

  function synChips(list, cls) {
    const box = el("div", { class: "syn-list" });
    list.forEach((s) => box.appendChild(el("span", { class: cls, text: s })));
    return box;
  }

  function wordCard(m, dateLabel) {
    const card = el("div", { class: "mdj-card" });
    if (dateLabel) card.appendChild(el("div", { class: "mdj-date", text: dateLabel }));
    card.appendChild(el("div", { class: "mdj-word", text: m.mot }));
    card.appendChild(chips(m));
    card.appendChild(el("div", { class: "mdj-def", text: m.definition }));

    if (m.etymologie) card.appendChild(el("div", { class: "mdj-block muted", style: { fontStyle: "italic", fontSize: "15px" }, text: "Étymologie : " + m.etymologie }));

    if (m.exemples && m.exemples.length) {
      const ex = el("div", null, m.exemples.map((e) => el("div", { class: "mdj-ex", text: "« " + e + " »" })));
      card.appendChild(block("Exemples", ex));
    }
    if (m.synonymes && m.synonymes.length) card.appendChild(block("Synonymes", synChips(m.synonymes, "chip")));
    if (m.antonymes && m.antonymes.length) card.appendChild(block("Antonymes", synChips(m.antonymes, "chip gold")));

    // Actions
    const favBtn = el("button", { class: "btn", "aria-label": "Favori" });
    function paintFav() {
      const fav = isFav(m.mot);
      favBtn.innerHTML = (fav ? IC.heartFull : IC.heart) + `<span>${fav ? "Favori" : "Ajouter"}</span>`;
      favBtn.classList.toggle("primary", fav);
    }
    paintFav();
    favBtn.addEventListener("click", () => { toggleFav(m.mot); paintFav(); });

    const speakBtn = el("button", { class: "btn", html: IC.speak + "<span>Prononcer</span>", on: { click: () => tts && tts.speak(m.mot, { rate: 0.95 }) } });

    card.appendChild(el("div", { class: "mdj-actions" }, [speakBtn, favBtn]));
    return card;
  }

  /* ---------- Écran d'un mot (historique / favori / hasard) ---------- */
  function backBtn() {
    return el("button", { class: "back", on: { click: () => LMJ.nav.back() } }, [el("span", { html: IC.back }), document.createTextNode("Retour")]);
  }
  function openWord(m, header) {
    LMJ.nav.push((root) => { root.appendChild(backBtn()); root.appendChild(el("div", { class: "spacer" })); root.appendChild(wordCard(m)); }, header);
  }

  /* ---------- Vue racine ---------- */
  function render(root) {
    const m = wordFor();
    if (!m) { root.appendChild(el("div", { class: "empty", text: "Aucun mot disponible." })); return; }

    root.appendChild(wordCard(m, util.frDate()));

    // Explorer au hasard
    root.appendChild(el("div", { class: "spacer" }));
    root.appendChild(el("button", {
      class: "btn block", html: IC.dice + "<span>Piocher un mot au hasard</span>",
      on: { click: () => {
        const list = mots();
        const rnd = list[Math.floor(Math.random() * list.length)];
        openWord(rnd, { eyebrow: "Exploration", title: "Au hasard", sub: "Un mot pioché dans le corpus" });
      } },
    }));

    // Favoris
    const favs = getFavs();
    if (favs.length) {
      root.appendChild(el("div", { class: "section-head" }, [el("h2", { text: "Mes favoris" })]));
      const list = el("div");
      favs.slice().reverse().forEach((nom) => {
        const mm = findMot(nom);
        if (!mm) return;
        list.appendChild(el("div", { class: "hist-item", on: { click: () => openWord(mm, { eyebrow: "Favori", title: mm.mot, sub: mm.nature }) } }, [
          el("span", { class: "w", text: mm.mot }),
          el("span", { class: "muted", style: { fontSize: "13px" }, text: mm.registre }),
        ]));
      });
      root.appendChild(list);
    }

    // Historique des jours précédents
    root.appendChild(el("div", { class: "section-head" }, [el("h2", { text: "Les jours précédents" })]));
    const hist = el("div");
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const mm = wordFor(d);
      if (!mm) continue;
      hist.appendChild(el("div", { class: "hist-item", on: { click: () => openWord(mm, { eyebrow: "Historique", title: mm.mot, sub: util.frDate(d) }) } }, [
        el("span", { class: "w", text: mm.mot }),
        el("span", { class: "dt", text: d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) }),
      ]));
    }
    root.appendChild(hist);
  }

  LMJ.views.motdujour = { render };
})();
