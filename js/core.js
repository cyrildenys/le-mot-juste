/* =====================================================================
   Le Mot Juste — noyau partagé
   Namespace global, utilitaires DOM, helpers de stockage local.
   Chargé en premier : tous les autres scripts en dépendent.
   ===================================================================== */
(function () {
  "use strict";

  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};
  LMJ.views = LMJ.views || {};

  /* ---------- Utilitaires DOM ---------- */
  const util = {
    /** Sélecteur simple */
    $(sel, root) {
      return (root || document).querySelector(sel);
    },
    $$(sel, root) {
      return Array.from((root || document).querySelectorAll(sel));
    },
    /**
     * Crée un élément. props : {class, text, html, on:{event:fn}, dataset:{}, ...attrs}
     * children : Node | string | Array
     */
    el(tag, props, children) {
      const node = document.createElement(tag);
      if (props) {
        for (const [k, v] of Object.entries(props)) {
          if (v == null) continue;
          if (k === "class") node.className = v;
          else if (k === "text") node.textContent = v;
          else if (k === "html") node.innerHTML = v;
          else if (k === "on") {
            for (const [ev, fn] of Object.entries(v)) node.addEventListener(ev, fn);
          } else if (k === "dataset") {
            for (const [dk, dv] of Object.entries(v)) node.dataset[dk] = dv;
          } else if (k === "style" && typeof v === "object") {
            Object.assign(node.style, v);
          } else {
            node.setAttribute(k, v);
          }
        }
      }
      if (children != null) util.append(node, children);
      return node;
    },
    append(node, children) {
      if (Array.isArray(children)) {
        children.forEach((c) => c != null && util.append(node, c));
      } else if (children instanceof Node) {
        node.appendChild(children);
      } else {
        node.appendChild(document.createTextNode(String(children)));
      }
      return node;
    },
    clear(node) {
      while (node.firstChild) node.removeChild(node.firstChild);
      return node;
    },
    escape(str) {
      const d = document.createElement("div");
      d.textContent = str == null ? "" : String(str);
      return d.innerHTML;
    },

    /* ---------- Texte / normalisation ---------- */
    /** minuscule + suppression des accents (pour recherche & comparaison) */
    deburr(str) {
      return (str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");
    },
    /** normalise pour la recherche : deburr + trim des espaces multiples */
    normSearch(str) {
      return util.deburr(str).replace(/\s+/g, " ").trim();
    },

    /* ---------- Dates ---------- */
    /** Clé du jour AAAA-MM-JJ en heure locale */
    todayKey(d) {
      const date = d || new Date();
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const j = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${j}`;
    },
    /** Nombre de jours depuis une époque fixe (2024-01-01) */
    dayNumber(d) {
      const date = d || new Date();
      const epoch = Date.UTC(2024, 0, 1);
      const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      return Math.floor((today - epoch) / 86400000);
    },
    frDate(d) {
      const date = d || new Date();
      return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },

    /* ---------- Divers ---------- */
    /** hash entier stable d'une chaîne */
    hash(str) {
      let h = 2166136261;
      for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return h >>> 0;
    },
  };

  /* ---------- Stockage local (progrès, historique, favoris) ---------- */
  const PREFIX = "lmj.";
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(PREFIX + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(PREFIX + key);
      } catch (e) {}
    },
  };

  /* ---------- Synthèse vocale (Web Speech API) — hors-ligne via voix système ---------- */
  const tts = {
    supported: typeof window !== "undefined" && "speechSynthesis" in window,
    voices: [],
    frVoice: null,
    _ready: false,

    refresh() {
      if (!tts.supported) return;
      tts.voices = window.speechSynthesis.getVoices() || [];
      const fr = tts.voices.filter((v) => /^fr/i.test(v.lang));
      // Préférer une voix locale (fonctionne hors-ligne)
      tts.frVoice =
        fr.find((v) => v.localService) ||
        fr.find((v) => /fr[-_]FR/i.test(v.lang)) ||
        fr[0] ||
        null;
      tts._ready = true;
    },
    init() {
      if (!tts.supported || tts._ready) return;
      tts.refresh();
      window.speechSynthesis.addEventListener("voiceschanged", tts.refresh);
    },
    /** Parle un texte. opts : {rate, pitch, onstart, onend, onboundary} */
    speak(text, opts) {
      opts = opts || {};
      if (!tts.supported) { opts.onend && opts.onend(); return null; }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      if (tts.frVoice) u.voice = tts.frVoice;
      u.rate = opts.rate != null ? opts.rate : 1;
      u.pitch = opts.pitch != null ? opts.pitch : 1;
      if (opts.onstart) u.onstart = opts.onstart;
      if (opts.onend) u.onend = opts.onend;
      if (opts.onboundary) u.onboundary = opts.onboundary;
      window.speechSynthesis.speak(u);
      return u;
    },
    cancel() { if (tts.supported) window.speechSynthesis.cancel(); },
    pause() { if (tts.supported) window.speechSynthesis.pause(); },
    resume() { if (tts.supported) window.speechSynthesis.resume(); },
  };

  LMJ.util = util;
  LMJ.store = store;
  LMJ.tts = tts;
  LMJ.VERSION = "v14";
})();
