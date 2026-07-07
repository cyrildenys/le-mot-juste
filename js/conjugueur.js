/* =====================================================================
   Le Mot Juste — Moteur de conjugaison
   • 1er groupe (-er) : algorithmique, avec toutes les variantes
     orthographiques (-cer, -ger, -yer, -eler/-eter, é→è, e muet→è).
   • 2e groupe (-ir, type finir) : algorithmique.
   • 3e groupe : dérivé des « parties principales » de data/verbes.js.
   Temps composés construits automatiquement (auxiliaire conjugué + pp).

   API : LMJ.conjugue("manger") → objet structuré (voir bas de fichier).
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  const V = LMJ.data.verbes;

  /* ---------- Terminaisons ---------- */
  const FUT = ["ai", "as", "a", "ons", "ez", "ont"];
  const COND = ["ais", "ais", "ait", "ions", "iez", "aient"];
  const IMPF = ["ais", "ais", "ait", "ions", "iez", "aient"];

  function psEnds(type) {
    return {
      a: ["ai", "as", "a", "âmes", "âtes", "èrent"],
      i: ["is", "is", "it", "îmes", "îtes", "irent"],
      u: ["us", "us", "ut", "ûmes", "ûtes", "urent"],
      in: ["ins", "ins", "int", "înmes", "întes", "inrent"],
    }[type];
  }
  function subjImpEnds(type) {
    return {
      a: ["asse", "asses", "ât", "assions", "assiez", "assent"],
      i: ["isse", "isses", "ît", "issions", "issiez", "issent"],
      u: ["usse", "usses", "ût", "ussions", "ussiez", "ussent"],
      in: ["insse", "insses", "înt", "inssions", "inssiez", "inssent"],
    }[type];
  }

  const map6 = (stem, ends) => ends.map((e) => (e == null ? null : stem + e));

  /* =====================================================================
     3e groupe — dérivation depuis les parties principales
     ===================================================================== */
  function simpleFromParts(parts) {
    const t = {
      infinitif: parts.infinitif,
      participePresent: parts.ppr,
      participePasse: parts.pp,
      present: parts.pres.slice(),
    };

    // Imparfait : fourni, ou dérivé du « nous » présent (…ons → …ais)
    if (parts.imp) t.imparfait = parts.imp.slice();
    else {
      const stem = parts.pres[3].replace(/ons$/, "");
      t.imparfait = map6(stem, IMPF);
    }

    t.futurSimple = map6(parts.futStem, FUT);
    t.conditionnelPresent = map6(parts.futStem, COND);

    const [psStem, psType] = parts.ps;
    t.passeSimple = map6(psStem, psEnds(psType));
    t.subjonctifImparfait = map6(psStem, subjImpEnds(psType));

    if (parts.subjForms) t.subjonctifPresent = parts.subjForms.slice();
    else {
      const [ss, sp] = parts.subj;
      t.subjonctifPresent = [ss + "e", ss + "es", ss + "e", sp + "ions", sp + "iez", ss + "ent"];
    }

    if (parts.imper === false) t.imperatifPresent = null;
    else if (Array.isArray(parts.imper)) t.imperatifPresent = parts.imper.slice();
    else {
      let tu = parts.pres[1];
      if (/es$/.test(tu)) tu = tu.slice(0, -1);
      t.imperatifPresent = [tu, parts.pres[3], parts.pres[4]];
    }
    return t;
  }

  /* Auxiliaires pré-conjugués (pour les temps composés) */
  const AUX = {
    avoir: simpleFromParts(Object.assign({ infinitif: "avoir" }, V["avoir"])),
    etre: simpleFromParts(Object.assign({ infinitif: "être" }, V["être"])),
  };

  function compound(auxKey, pp) {
    const a = AUX[auxKey];
    const j = (arr) => arr.map((f) => (f == null ? null : f + " " + pp));
    return {
      passeCompose: j(a.present),
      plusQueParfait: j(a.imparfait),
      passeAnterieur: j(a.passeSimple),
      futurAnterieur: j(a.futurSimple),
      conditionnelPasse: j(a.conditionnelPresent),
      subjonctifPasse: j(a.subjonctifPresent),
      subjonctifPlusQueParfait: j(a.subjonctifImparfait),
      imperatifPasse: a.imperatifPresent ? a.imperatifPresent.map((f) => f + " " + pp) : null,
    };
  }

  /* =====================================================================
     1er groupe — algorithmique
     ===================================================================== */
  const DOUBLE = new Set([
    "appeler", "rappeler", "interpeler", "jeter", "rejeter", "projeter", "interjeter",
    "feuilleter", "épeler", "renouveler", "atteler", "dételer", "étinceler", "ruisseler",
    "amonceler", "ensorceler", "chanceler", "morceler", "cacheter", "empaqueter",
    "étiqueter", "hoqueter", "voleter", "cliqueter", "breveter",
  ]);

  function graveLastE(stem) {
    // remplace le dernier « e » (avant consonnes finales) par « è »
    return stem.replace(/e([^e]*)$/, "è$1");
  }

  function group1Simple(inf) {
    const stem = inf.slice(0, -2); // sans « er »
    const endsCer = /cer$/.test(inf);
    const endsGer = /ger$/.test(inf);

    // Adoucissement c→ç / g→ge devant a, o, â
    function soft(s, ending) {
      const c = ending.charAt(0);
      const aoo = c === "a" || c === "o" || c === "â";
      if (endsCer && aoo) return s.slice(0, -1) + "ç" + ending;
      if (endsGer && aoo) return s + "e" + ending;
      return s + ending;
    }

    // Radical modifié pour les terminaisons « e muet » (+ futur selon le cas)
    let modStem = stem;
    let futUsesMod = false;
    if (/yer$/.test(inf)) {
      modStem = stem.slice(0, -1) + "i";
      futUsesMod = true;
    } else if (/(eler|eter)$/.test(inf)) {
      if (DOUBLE.has(inf)) { modStem = stem + stem.slice(-1); }
      else { modStem = graveLastE(stem); }
      futUsesMod = true;
    } else if (/é[bcdfghjklmnpqrstvwxzç]+$/.test(stem)) {
      modStem = stem.replace(/é([^é]*)$/, "è$1"); // é→è, mais futur garde é
      futUsesMod = false;
    } else if (/e[bcdfghjklmnpqrstvwxzç]+$/.test(stem)) {
      modStem = graveLastE(stem); // e muet → è
      futUsesMod = true;
    }

    const silent = (i) => i === 0 || i === 1 || i === 2 || i === 5; // je,tu,il,ils

    const present = ["e", "es", "e", "ons", "ez", "ent"].map((e, i) =>
      soft(silent(i) ? modStem : stem, e)
    );
    const subjPres = ["e", "es", "e", "ions", "iez", "ent"].map((e, i) =>
      soft(silent(i) ? modStem : stem, e)
    );
    const imparfait = IMPF.map((e) => soft(stem, e));
    const futStem = futUsesMod ? modStem + "er" : inf;
    const passeSimple = psEnds("a").map((e) => soft(stem, e));
    const subjImp = subjImpEnds("a").map((e) => soft(stem, e));

    return {
      infinitif: inf,
      participePresent: soft(stem, "ant"),
      participePasse: stem + "é",
      present,
      imparfait,
      futurSimple: map6(futStem, FUT),
      conditionnelPresent: map6(futStem, COND),
      passeSimple,
      subjonctifPresent: subjPres,
      subjonctifImparfait: subjImp,
      imperatifPresent: [present[0], present[3], present[4]],
    };
  }

  /* =====================================================================
     2e groupe — algorithmique (type finir)
     ===================================================================== */
  function group2Simple(inf) {
    const stem = inf.slice(0, -2); // sans « ir »
    return {
      infinitif: inf,
      participePresent: stem + "issant",
      participePasse: stem + "i",
      present: [stem + "is", stem + "is", stem + "it", stem + "issons", stem + "issez", stem + "issent"],
      imparfait: map6(stem + "iss", IMPF),
      futurSimple: map6(inf, FUT),
      conditionnelPresent: map6(inf, COND),
      passeSimple: map6(stem, psEnds("i")),
      subjonctifPresent: map6(stem + "iss", ["e", "es", "e", "ions", "iez", "ent"]),
      subjonctifImparfait: map6(stem, subjImpEnds("i")),
      imperatifPresent: [stem + "is", stem + "issons", stem + "issez"],
    };
  }

  /* =====================================================================
     Assemblage & détection du type
     ===================================================================== */
  function determineAux(inf, irr) {
    if (irr && irr.aux) return irr.aux;
    return LMJ.data.verbesEtre && LMJ.data.verbesEtre.has(inf) ? "etre" : "avoir";
  }

  function assemble(inf, groupe, irregulier, aux, simple, pp, impersonnel) {
    const comp = compound(aux, pp);
    const res = {
      disponible: true,
      infinitif: inf,
      groupe,
      irregulier,
      impersonnel: !!impersonnel,
      aux,
      participePresent: simple.participePresent,
      participePasse: pp,
      indicatif: {
        present: simple.present,
        imparfait: simple.imparfait,
        passeSimple: simple.passeSimple,
        futurSimple: simple.futurSimple,
        passeCompose: comp.passeCompose,
        plusQueParfait: comp.plusQueParfait,
        passeAnterieur: comp.passeAnterieur,
        futurAnterieur: comp.futurAnterieur,
      },
      conditionnel: { present: simple.conditionnelPresent, passe: comp.conditionnelPasse },
      subjonctif: {
        present: simple.subjonctifPresent,
        imparfait: simple.subjonctifImparfait,
        passe: comp.subjonctifPasse,
        plusQueParfait: comp.subjonctifPlusQueParfait,
      },
      imperatif: { present: simple.imperatifPresent, passe: comp.imperatifPasse },
    };

    if (impersonnel) {
      // Ne garder que la 3e pers. du singulier (index 2) pour les temps à 6 formes
      const keepIl = (arr) => (arr ? arr.map((v, i) => (i === 2 ? v : null)) : arr);
      for (const tps of Object.values(res.indicatif)) void tps;
      ["indicatif", "conditionnel", "subjonctif"].forEach((mode) => {
        for (const k of Object.keys(res[mode])) res[mode][k] = keepIl(res[mode][k]);
      });
      res.imperatif.present = null;
      res.imperatif.passe = null;
    }
    return res;
  }

  /* =====================================================================
     Point d'entrée
     ===================================================================== */
  function conjugue(input) {
    if (!input) return { disponible: false, infinitif: "" };
    let inf = String(input).trim().toLowerCase();

    // Verbe irrégulier connu (avec ou sans accents saisis)
    let irr = V[inf];
    if (!irr) {
      const deb = LMJ.util ? LMJ.util.deburr(inf) : inf;
      for (const key of Object.keys(V)) {
        if ((LMJ.util ? LMJ.util.deburr(key) : key) === deb) { irr = V[key]; inf = key; break; }
      }
    }
    if (irr) {
      const parts = Object.assign({ infinitif: inf }, irr);
      const simple = simpleFromParts(parts);
      return assemble(inf, irr.g || 3, true, irr.aux, simple, irr.pp, irr.impersonnel);
    }

    // 1er groupe
    if (/er$/.test(inf) && inf !== "aller") {
      const simple = group1Simple(inf);
      return assemble(inf, 1, false, determineAux(inf), simple, simple.participePasse, false);
    }
    // 2e groupe (tout -ir non irrégulier, type finir)
    if (/ir$/.test(inf)) {
      const simple = group2Simple(inf);
      return assemble(inf, 2, false, determineAux(inf), simple, simple.participePasse, false);
    }

    // -re / -oir inconnus : non couverts par le MVP
    return { disponible: false, infinitif: inf };
  }

  /* Liste de verbes proposés dans l'UI (irréguliers + exemples réguliers) */
  LMJ.verbesSuggestions = [
    "être", "avoir", "aller", "faire", "dire", "pouvoir", "vouloir", "devoir",
    "savoir", "voir", "venir", "prendre", "mettre", "partir", "finir", "manger",
    "commencer", "appeler", "acheter", "employer", "payer", "espérer", "lever",
    "aimer", "parler", "choisir", "recevoir", "boire", "connaître", "écrire",
  ];

  LMJ.conjugue = conjugue;

  /* Export Node (tests en ligne de commande) */
  if (typeof module !== "undefined" && module.exports) module.exports = { conjugue, LMJ };
})();
