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
    {
      id: "mu-au-niveau",
      titre: "« au niveau de » (abus)",
      resume: "À réserver à une hauteur réelle.",
      explication:
        "<p>« Au niveau de » indique proprement une <strong>hauteur</strong> ou un <strong>échelon</strong>. Employé comme passe-partout (= « en ce qui concerne »), il alourdit la phrase.</p>",
      exemples: [
        { ok: false, texte: "Au niveau du budget, c'est difficile.", correction: "Concernant le budget, c'est difficile." },
        { ok: true, texte: "L'eau est montée au niveau du quai." },
      ],
      astuce: "Préférez « concernant », « quant à », « sur le plan de ».",
    },
    {
      id: "mu-suite-a",
      titre: "« suite à »",
      resume: "Correction : « à la suite de » ou « comme suite à ».",
      explication:
        "<p>« Suite à » est critiqué dans un registre soigné. On lui préfère <strong>à la suite de</strong> (à cause de) ou, dans une lettre, <strong>comme suite à</strong> / <strong>en réponse à</strong>.</p>",
      exemples: [
        { ok: false, texte: "Suite à votre courrier, je vous informe…", correction: "À la suite de votre courrier / En réponse à votre courrier…" },
      ],
      astuce: "Dans une lettre formelle : « comme suite à » ou « en réponse à ».",
    },
    {
      id: "mu-je-mexcuse",
      titre: "« je m'excuse »",
      resume: "On ne s'excuse pas soi-même : on prie autrui d'excuser.",
      explication:
        "<p>Dire « je m'excuse » revient à s'accorder soi-même le pardon. Il est plus correct de <strong>demander</strong> à l'autre de vous excuser.</p>",
      exemples: [
        { ok: false, texte: "Je m'excuse pour le retard.", correction: "Je vous prie de m'excuser / Excusez-moi pour le retard." },
      ],
      astuce: "« Veuillez m'excuser » ou « je vous présente mes excuses ».",
    },
    {
      id: "mu-attention-intention",
      titre: "« à l'attention » / « à l'intention »",
      resume: "Attention = destinataire d'un courrier ; intention = en l'honneur de.",
      explication:
        "<p><strong>À l'attention de</strong> : pour signaler le <strong>destinataire</strong> d'un document (« Je porte à votre attention »).</p><p><strong>À l'intention de</strong> : <strong>en faveur de, pour</strong> quelqu'un (« une fête à l'intention des enfants »).</p>",
      exemples: [
        { ok: true, texte: "Note à l'<em>attention</em> du directeur. (courrier)" },
        { ok: true, texte: "Un cadeau à l'<em>intention</em> de sa mère. (pour elle)" },
      ],
      astuce: "Courrier → attention. En l'honneur de / pour → intention.",
    },
    {
      id: "mu-en-termes",
      titre: "« en terme de »",
      resume: "S'écrit « en termes de » (pluriel).",
      explication:
        "<p>La locution correcte est <strong>en termes de</strong> (au pluriel) et signifie proprement « dans le vocabulaire de ». Employée au sens de « en matière de / du point de vue de », elle est critiquée : préférez alors ces tournures.</p>",
      exemples: [
        { ok: false, texte: "En terme de qualité, c'est parfait.", correction: "En matière de qualité / Du point de vue de la qualité…" },
        { ok: true, texte: "En termes de marine, « bâbord » désigne la gauche." },
      ],
      astuce: "Toujours au pluriel : « en termes de » (et de préférence « en matière de »).",
    },
    {
      id: "mu-aeroport",
      titre: "« aréoport »",
      resume: "Barbarisme : on écrit « aéroport ».",
      explication:
        "<p>Le préfixe vient de <strong>aéro-</strong> (du grec <em>aêr</em>, « air »), comme dans « aérien », « aéronef ». La forme « aréoport » est fautive.</p>",
      exemples: [
        { ok: false, texte: "On se retrouve à l'aréoport.", correction: "On se retrouve à l'aéroport." },
      ],
      astuce: "Pensez à « air » → « aéro- ».",
    },
    {
      id: "mu-dilemme",
      titre: "« dilemne »",
      resume: "Le mot correct est « dilemme ».",
      explication:
        "<p>« Dilemme » (du grec <em>dilêmma</em>) s'écrit avec deux <strong>m</strong>. La graphie « dilemne » n'existe pas.</p>",
      exemples: [
        { ok: false, texte: "Je suis face à un dilemne.", correction: "Je suis face à un dilemme." },
      ],
      astuce: "Comme « emmener » : deux m, jamais « -mn- ».",
    },
    {
      id: "mu-remunerer",
      titre: "« rénumérer »",
      resume: "Le verbe correct est « rémunérer ».",
      explication:
        "<p>« Rémunérer » vient du latin <em>munus</em> (« don, rétribution »), d'où <strong>ré-mu-nérer</strong>. La forme « rénumérer » (par confusion avec « numéro ») est fautive.</p>",
      exemples: [
        { ok: false, texte: "Il faut rénumérer les heures supplémentaires.", correction: "Il faut rémunérer les heures supplémentaires." },
      ],
      astuce: "« rému- » (rétribution), pas « rénu- » (rien à voir avec numéro).",
    },
    {
      id: "mu-obnubiler",
      titre: "« obnibuler »",
      resume: "Le verbe correct est « obnubiler ».",
      explication:
        "<p>« Obnubiler » (du latin <em>nubes</em>, « nuage » : littéralement « couvrir d'un nuage ») s'écrit <strong>ob-nu-biler</strong>. La forme « obnibuler » est fautive.</p>",
      exemples: [
        { ok: false, texte: "Il est obnibulé par cette idée.", correction: "Il est obnubilé par cette idée." },
      ],
      astuce: "« -nu- » comme « nuage » : obnubiler.",
    },
    {
      id: "mu-infarctus",
      titre: "« infractus »",
      resume: "Le mot correct est « infarctus ».",
      explication:
        "<p>« Infarctus » vient du latin <em>infarctus</em> (« farci, rempli »), à rapprocher de « farci ». La confusion avec « fracture » (comme si le cœur se brisait) donne à tort « infractus ».</p>",
      exemples: [
        { ok: false, texte: "Il a fait un infractus.", correction: "Il a fait un infarctus." },
      ],
      astuce: "Pensez à « farci » : infar-ctus, pas « infra- ».",
    },
    {
      id: "mu-digression",
      titre: "« disgression »",
      resume: "Le mot correct est « digression ».",
      explication:
        "<p>« Digression » vient du latin <em>digressio</em> (« action de s'éloigner »), sans <strong>s</strong> après le <strong>di-</strong>. La confusion avec des mots en « dis- » (disjoindre, discontinuer) donne à tort « disgression ».</p>",
      exemples: [
        { ok: false, texte: "Faire une disgression.", correction: "Faire une digression." },
      ],
      astuce: "« di- » (s'éloigner), pas « dis- » : digression.",
    },
    {
      id: "mu-solutionner",
      titre: "« solutionner »",
      resume: "L'Académie française préconise « résoudre ».",
      explication:
        "<p>« Solutionner » n'est pas à proprement parler fautif (il est formé régulièrement sur « solution »), mais l'<strong>Académie française</strong> le juge lourd et recommande <strong>résoudre</strong> à la place.</p>",
      exemples: [
        { ok: false, texte: "Il va solutionner le problème.", correction: "Il va résoudre le problème." },
        { ok: false, texte: "Solutionner une énigme.", correction: "Résoudre une énigme." },
      ],
      astuce: "Préférez toujours « résoudre » : plus court et recommandé par l'Académie.",
    },
    {
      id: "mu-au-temps-pour-moi",
      titre: "« au temps pour moi » / « autant pour moi »",
      resume: "L'Académie française retient « au temps pour moi ».",
      explication:
        "<p>Expression d'origine militaire : « au temps » signifiait reprendre un mouvement depuis le début après une erreur. L'<strong>Académie française</strong> retient cette orthographe conforme à l'étymologie, même si « autant pour moi » est devenu très courant.</p>",
      exemples: [
        { ok: true, texte: "Au temps pour moi, je me suis trompé." },
      ],
      astuce: "Pour admettre une erreur, l'Académie recommande « au temps pour moi ».",
    },
  ];
})();
