/* =====================================================================
   Le Mot Juste — Amorçage
   Barre d'onglets, pile de navigation (compatible bouton retour Android),
   en-tête contextuel, enregistrement du service worker.
   ===================================================================== */
(function () {
  "use strict";
  const { util, store } = window.LMJ;
  const view = util.$("#view");
  const headerEl = util.$("#app-header");
  const tabbarEl = util.$("#tabbar");

  /* ---------- Icônes (inline SVG, aucune ressource externe) ---------- */
  const ICONS = {
    regles:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H2z"/><path d="M22 4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2h6z"/></svg>',
    motdujour:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.1 5.6L20 10l-5.9 1.4L12 17l-2.1-5.6L4 10l5.9-1.4z"/></svg>',
    dictee:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-5a9 9 0 0 1 18 0v5"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
  };

  const TABS = [
    { id: "regles", label: "Les règles", eyebrow: "Référentiel", title: "Les règles", sub: "Accords, conjugaison, confusions, usages, vocabulaire" },
    { id: "motdujour", label: "Mot du jour", eyebrow: "Un mot par jour", title: "Le mot du jour", sub: "Enrichir son éloquence, jour après jour" },
    { id: "dictee", label: "Dictée", eyebrow: "S'exercer", title: "Dictées", sub: "Du niveau facile à expert" },
  ];

  /* ---------- État & pile de navigation ---------- */
  let currentTab = null;
  let stack = []; // pile de fonctions render(root) ; index 0 = racine de l'onglet

  function drawTop() {
    const fn = stack[stack.length - 1];
    util.clear(view);
    window.scrollTo({ top: 0 });
    fn(view);
  }

  function setHeader({ eyebrow, title, sub }) {
    util.clear(headerEl);
    util.append(headerEl, [
      eyebrow ? util.el("div", { class: "eyebrow", text: eyebrow }) : null,
      util.el("h1", { text: title || "" }),
      sub ? util.el("div", { class: "sub", text: sub }) : null,
    ]);
  }

  function renderTabbar() {
    util.clear(tabbarEl);
    TABS.forEach((t) => {
      const btn = util.el("button", {
        class: t.id === currentTab ? "active" : "",
        role: "tab",
        html: ICONS[t.id] + `<span>${t.label}</span>`,
        on: { click: () => selectTab(t.id) },
      });
      tabbarEl.appendChild(btn);
    });
  }

  function selectTab(tabId, opts) {
    opts = opts || {};
    const tab = TABS.find((t) => t.id === tabId) || TABS[0];
    currentTab = tab.id;
    setHeader(tab); // en-tête par défaut ; la vue peut le remplacer
    const viewMod = window.LMJ.views[tab.id];
    stack = [
      (root) => {
        setHeader(tab);
        if (viewMod && viewMod.render) viewMod.render(root);
        else root.appendChild(util.el("div", { class: "empty", text: "Bientôt disponible." }));
      },
    ];
    renderTabbar();
    drawTop();
    store.set("tab", tab.id);
    if (!opts.fromPop) history.replaceState({ tab: tab.id, depth: 0 }, "");
  }

  /* API de navigation pour les vues (drill-down) */
  window.LMJ.nav = {
    /** Empile un nouvel écran. header : {eyebrow,title,sub} optionnel. */
    push(renderFn, header) {
      stack.push((root) => {
        if (header) setHeader(header);
        renderFn(root);
      });
      history.pushState({ tab: currentTab, depth: stack.length - 1 }, "");
      drawTop();
    },
    back() {
      if (stack.length > 1) history.back();
    },
    setHeader,
  };

  window.addEventListener("popstate", (e) => {
    if (stack.length > 1) {
      stack.pop();
      drawTop();
    } else {
      const st = e.state;
      if (st && st.tab && st.tab !== currentTab) selectTab(st.tab, { fromPop: true });
    }
  });

  /* ---------- Enregistrement du service worker ---------- */
  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    // Uniquement en contexte sécurisé (https ou localhost) — pas en file://
    if (location.protocol === "file:") return;

    // Recharge une fois lorsqu'une nouvelle version prend le contrôle.
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      location.reload();
    });

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js", { updateViaCache: "none" })
        .then((reg) => {
          reg.update();
          // Vérifie les mises à jour à chaque retour sur l'app et périodiquement.
          document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") reg.update();
          });
          setInterval(() => reg.update(), 60 * 60 * 1000);
        })
        .catch((e) => console.warn("[SW] non enregistré :", e));
    });
  }

  /* ---------- Démarrage ---------- */
  function start() {
    if (LMJ.tts) LMJ.tts.init();
    const last = store.get("tab", "regles");
    selectTab(TABS.find((t) => t.id === last) ? last : "regles");
    registerSW();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
