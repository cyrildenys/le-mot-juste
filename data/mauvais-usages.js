/* =====================================================================
   Le Mot Juste — Mauvais usages (fautes, pléonasmes, barbarismes)
   Schéma identique aux règles : { id, titre, resume, explication, exemples, astuce }
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};

  LMJ.data.mauvaisUsages = [
    {
      id: "mu-aujourdhui",
      titre: "« au jour d'aujourd'hui »",
      resume: "Triple pléonasme à bannir.",
      explication:
        "<p>« Aujourd'hui » contient déjà l'idée de « au jour de ce jour » (hui = ce jour). Ajouter « au jour de » est un pléonasme.</p>",
      exemples: [
        { ok: false, texte: "Au jour d'aujourd'hui, tout va bien.", correction: "Aujourd'hui, tout va bien." },
      ],
      astuce: "Dites simplement « aujourd'hui » ou « à ce jour ».",
    },
    {
      id: "mu-malgre-que",
      titre: "« malgré que »",
      resume: "À éviter au sens de « bien que ».",
      explication:
        "<p>« Malgré que » n'est admis qu'avec le verbe « avoir » (malgré qu'il en ait = quoi qu'il en ait). Au sens concessif, préférez <strong>bien que</strong> (+ subjonctif) ou <strong>malgré</strong> (+ nom).</p>",
      exemples: [
        { ok: false, texte: "Malgré qu'il pleuve, je sors.", correction: "Bien qu'il pleuve, je sors." },
        { ok: true, texte: "Malgré la pluie, je sors." },
      ],
      astuce: "« bien que » + subjonctif, ou « malgré » + nom.",
    },
    {
      id: "mu-pallier",
      titre: "« pallier à » un problème",
      resume: "« pallier » est transitif direct : pas de « à ».",
      explication:
        "<p>On <strong>pallie quelque chose</strong> (sans préposition), on ne « pallie pas à » quelque chose.</p>",
      exemples: [
        { ok: false, texte: "Pallier au manque de personnel.", correction: "Pallier le manque de personnel." },
        { ok: true, texte: "Cette mesure pallie les difficultés." },
      ],
      astuce: "Comme « remédier » demande « à », mais « pallier » se construit directement.",
    },
    {
      id: "mu-se-rappeler",
      titre: "« se rappeler de » quelque chose",
      resume: "On se rappelle quelque chose ; on se souvient DE quelque chose.",
      explication:
        "<p><strong>Se rappeler</strong> est transitif direct (se rappeler quelque chose). <strong>Se souvenir</strong> demande « de ». La confusion des deux constructions est fautive.</p>",
      exemples: [
        { ok: false, texte: "Je me rappelle de cette histoire.", correction: "Je me rappelle cette histoire." },
        { ok: true, texte: "Je me souviens de cette histoire." },
      ],
      astuce: "Avec un pronom : « je me le rappelle » (et non « je m'en rappelle »).",
    },
    {
      id: "mu-chez-coiffeur",
      titre: "« aller au coiffeur / au docteur »",
      resume: "Devant une personne, on va « chez ».",
      explication:
        "<p>Devant un nom de personne (métier), on emploie <strong>chez</strong> et non « au ».</p>",
      exemples: [
        { ok: false, texte: "Je vais au coiffeur.", correction: "Je vais chez le coiffeur." },
        { ok: true, texte: "Je vais chez le médecin." },
      ],
      astuce: "« au » pour un lieu (au salon, au cabinet) ; « chez » pour une personne.",
    },
    {
      id: "mu-comme-meme",
      titre: "« comme même »",
      resume: "L'expression correcte est « quand même ».",
      explication:
        "<p>« Comme même » n'existe pas. La locution qui signifie « malgré tout » est <strong>quand même</strong> (ou « tout de même »).</p>",
      exemples: [
        { ok: false, texte: "C'est comme même incroyable.", correction: "C'est quand même incroyable." },
      ],
      astuce: "Toujours « quand même » (avec un d).",
    },
    {
      id: "mu-voire-meme",
      titre: "« voire même »",
      resume: "Pléonasme : « voire » suffit.",
      explication:
        "<p>« Voire » signifie déjà « et même ». Le doubler avec « même » est redondant.</p>",
      exemples: [
        { ok: false, texte: "C'est difficile, voire même impossible.", correction: "C'est difficile, voire impossible." },
      ],
      astuce: "Choisissez « voire » ou « et même », mais pas les deux.",
    },
    {
      id: "mu-apres-que",
      titre: "« après que » + subjonctif",
      resume: "« après que » se construit avec l'indicatif.",
      explication:
        "<p>L'action introduite par <strong>après que</strong> a réellement eu lieu : on emploie donc l'<strong>indicatif</strong>. (À l'inverse, « avant que » demande le subjonctif.)</p>",
      exemples: [
        { ok: false, texte: "Après qu'il soit parti…", correction: "Après qu'il est parti…" },
        { ok: true, texte: "Avant qu'il ne parte…" },
      ],
      astuce: "après que → indicatif ; avant que → subjonctif.",
    },
    {
      id: "mu-monter-en-haut",
      titre: "« monter en haut », « descendre en bas »",
      resume: "Pléonasmes.",
      explication:
        "<p>On ne peut monter que vers le haut et descendre que vers le bas : ces précisions sont superflues. Idem pour « sortir dehors », « prévoir à l'avance ».</p>",
      exemples: [
        { ok: false, texte: "Il est monté en haut.", correction: "Il est monté." },
        { ok: false, texte: "Prévoir à l'avance.", correction: "Prévoir." },
      ],
      astuce: "Méfiez-vous des précisions déjà contenues dans le verbe.",
    },
    {
      id: "mu-si-jaurais",
      titre: "« si j'aurais »",
      resume: "Après « si » de condition, jamais de conditionnel.",
      explication:
        "<p>Dans une subordonnée de condition, « si » est suivi de l'<strong>imparfait</strong> (ou du présent), <strong>jamais du conditionnel</strong>.</p>",
      exemples: [
        { ok: false, texte: "Si j'aurais su, je serais venu.", correction: "Si j'avais su, je serais venu." },
        { ok: true, texte: "Si je pouvais, je viendrais." },
      ],
      astuce: "« Les si n'aiment pas les rais » : pas de -rais après « si ».",
    },
    {
      id: "mu-espece",
      titre: "« un espèce de »",
      resume: "« espèce » est féminin.",
      explication:
        "<p>Le nom <strong>espèce</strong> est féminin, quel que soit le genre du mot qui suit : on dit toujours <strong>une</strong> espèce de.</p>",
      exemples: [
        { ok: false, texte: "Un espèce de génie.", correction: "Une espèce de génie." },
      ],
      astuce: "Toujours « une espèce de », même devant un nom masculin.",
    },
    {
      id: "mu-dont-en",
      titre: "« dont… en » (double emploi)",
      resume: "« dont » contient déjà « de » : pas de « en » en plus.",
      explication:
        "<p>Le pronom <strong>dont</strong> équivaut à « de qui / de quoi ». Ajouter « en » (qui signifie aussi « de cela ») fait double emploi.</p>",
      exemples: [
        { ok: false, texte: "C'est le livre dont je t'en ai parlé.", correction: "C'est le livre dont je t'ai parlé." },
      ],
      astuce: "Si vous employez « dont », supprimez « en ».",
    },
  ];
})();
