/* =====================================================================
   Le Mot Juste — Notions de grammaire
   Schéma : { id, titre, resume, explication, exemples, astuce }
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};

  LMJ.data.grammaire = [
    {
      id: "gr-nature-fonction",
      titre: "Nature et fonction d'un mot",
      resume: "La nature, c'est ce qu'est le mot ; la fonction, c'est le rôle qu'il joue.",
      explication:
        "<p>La <strong>nature</strong> (ou classe grammaticale) est fixe : nom, verbe, adjectif, adverbe, préposition… On la trouve dans le dictionnaire.</p><p>La <strong>fonction</strong> dépend de la phrase : sujet, COD, épithète, complément circonstanciel… Un même mot peut changer de fonction.</p>",
      exemples: [
        { ok: true, texte: "« rouge » est de nature adjectif ; sa fonction peut être épithète (un mur rouge) ou attribut (le mur est rouge)." },
      ],
      astuce: "Nature = carte d'identité du mot ; fonction = son métier dans la phrase.",
    },
    {
      id: "gr-sujet",
      titre: "Le sujet",
      resume: "Il commande l'accord du verbe ; on le trouve avec « qui est-ce qui ? ».",
      explication:
        "<p>Le sujet indique de qui ou de quoi l'on parle ; il donne au verbe sa personne et son nombre. On le repère en posant « <strong>qui est-ce qui</strong> + verbe ? » (ou « qu'est-ce qui ? »).</p>",
      exemples: [
        { ok: true, texte: "« Les oiseaux chantent. » Qui est-ce qui chante ? → les oiseaux (sujet)." },
        { ok: true, texte: "Le sujet peut être inversé : « Que dit le professeur ? »" },
      ],
      astuce: "Le sujet n'est pas toujours en tête de phrase : cherchez toujours par la question.",
    },
    {
      id: "gr-cod-coi",
      titre: "COD, COI et COS",
      resume: "Compléments d'objet : direct (sans préposition), indirect (avec préposition).",
      explication:
        "<p>Le <strong>COD</strong> répond à « qui ? / quoi ? » après le verbe, sans préposition.</p><p>Le <strong>COI</strong> répond à « à qui ? / de quoi ? » : il est introduit par une préposition.</p><p>Le <strong>COS</strong> (second) est un deuxième complément, souvent le destinataire.</p>",
      exemples: [
        { ok: true, texte: "Je mange une pomme. (une pomme = COD)" },
        { ok: true, texte: "Je parle à Marie. (à Marie = COI)" },
        { ok: true, texte: "Je donne un livre à Paul. (un livre = COD, à Paul = COS)" },
      ],
      astuce: "Direct = collé au verbe ; indirect = relié par « à » ou « de ».",
    },
    {
      id: "gr-cc",
      titre: "Les compléments circonstanciels",
      resume: "Ils précisent les circonstances : temps, lieu, manière, cause…",
      explication:
        "<p>Les <strong>compléments circonstanciels</strong> (CC) indiquent le temps, le lieu, la manière, la cause, le but, le moyen… Ils sont généralement <strong>déplaçables</strong> et <strong>supprimables</strong>, contrairement au COD.</p>",
      exemples: [
        { ok: true, texte: "Hier (CC temps), il a travaillé dans le jardin (CC lieu)." },
        { ok: true, texte: "Il parle avec calme (CC manière)." },
      ],
      astuce: "Si vous pouvez déplacer ou supprimer le groupe, c'est un complément circonstanciel.",
    },
    {
      id: "gr-epithete-attribut",
      titre: "Épithète ou attribut du sujet ?",
      resume: "L'épithète touche le nom ; l'attribut passe par un verbe d'état.",
      explication:
        "<p>L'adjectif <strong>épithète</strong> est directement lié au nom. L'adjectif <strong>attribut du sujet</strong> est relié au sujet par un <strong>verbe d'état</strong> (être, paraître, sembler, devenir, rester…).</p>",
      exemples: [
        { ok: true, texte: "Une voiture rapide. (épithète)" },
        { ok: true, texte: "Cette voiture est rapide. (attribut, via « est »)" },
      ],
      astuce: "Y a-t-il un verbe d'état ? Alors l'adjectif est attribut.",
    },
    {
      id: "gr-propositions",
      titre: "Les propositions dans la phrase",
      resume: "Autant de propositions que de verbes conjugués.",
      explication:
        "<p>Une <strong>proposition</strong> s'organise autour d'un verbe conjugué. On distingue : l'<strong>indépendante</strong> (seule), la <strong>principale</strong> (dont dépend une autre) et la <strong>subordonnée</strong> (qui dépend d'une autre).</p>",
      exemples: [
        { ok: true, texte: "« Il dort. » → une indépendante." },
        { ok: true, texte: "« Je pense [principale] qu'il dort [subordonnée]. »" },
      ],
      astuce: "Comptez les verbes conjugués : c'est le nombre de propositions.",
    },
    {
      id: "gr-relative",
      titre: "La proposition subordonnée relative",
      resume: "Introduite par un pronom relatif (qui, que, dont, où…), elle complète un nom.",
      explication:
        "<p>La <strong>subordonnée relative</strong> précise un nom (l'<strong>antécédent</strong>) et commence par un <strong>pronom relatif</strong> : qui, que, quoi, dont, où, lequel…</p>",
      exemples: [
        { ok: true, texte: "Le livre [que je lis] est passionnant. (antécédent : livre)" },
        { ok: true, texte: "La ville [où je suis né]." },
      ],
      astuce: "« qui » = sujet ; « que » = COD ; « dont » = complément avec « de ».",
    },
    {
      id: "gr-voix-passive",
      titre: "Voix active et voix passive",
      resume: "Au passif, le COD devient sujet et le sujet devient complément d'agent.",
      explication:
        "<p>À la <strong>voix active</strong>, le sujet fait l'action. À la <strong>voix passive</strong>, le sujet la subit ; l'auteur de l'action devient le <strong>complément d'agent</strong> (introduit par « par »).</p>",
      exemples: [
        { ok: true, texte: "Actif : Le chat mange la souris." },
        { ok: true, texte: "Passif : La souris est mangée par le chat." },
      ],
      astuce: "Seuls les verbes ayant un COD peuvent se mettre au passif.",
    },
    {
      id: "gr-determinants",
      titre: "Les déterminants",
      resume: "Ils précèdent le nom et s'accordent avec lui.",
      explication:
        "<p>Le <strong>déterminant</strong> introduit le nom : articles (le, un, du), possessifs (mon, ta), démonstratifs (ce, cette), indéfinis (chaque, plusieurs), numéraux (deux, trois)…</p>",
      exemples: [
        { ok: true, texte: "le, la, les, un, des (articles)" },
        { ok: true, texte: "mon, ton, son, notre (possessifs) ; ce, cet, cette (démonstratifs)" },
      ],
      astuce: "Un nom commun est presque toujours accompagné d'un déterminant.",
    },
    {
      id: "gr-types-phrases",
      titre: "Les types et formes de phrases",
      resume: "Déclarative, interrogative, exclamative, impérative.",
      explication:
        "<p>On distingue quatre <strong>types</strong> de phrases : <strong>déclarative</strong> (elle affirme), <strong>interrogative</strong> (elle questionne), <strong>exclamative</strong> (elle exprime une émotion), <strong>impérative</strong> (elle ordonne).</p><p>À cela s'ajoutent des <strong>formes</strong> : affirmative/négative, active/passive, neutre/emphatique.</p>",
      exemples: [
        { ok: true, texte: "Tu viens. (déclarative) — Viens-tu ? (interrogative)" },
        { ok: true, texte: "Quelle chance ! (exclamative) — Viens ici. (impérative)" },
      ],
      astuce: "La ponctuation finale trahit souvent le type : . ? !",
    },
    {
      id: "gr-complement-agent",
      titre: "Le complément d'agent",
      resume: "Dans une phrase passive, il désigne l'auteur de l'action.",
      explication:
        "<p>À la voix passive, le <strong>complément d'agent</strong> indique qui accomplit réellement l'action. Il est introduit par <strong>par</strong> (parfois <strong>de</strong>).</p>",
      exemples: [
        { ok: true, texte: "La souris est mangée <em>par le chat</em>. (agent : le chat)" },
        { ok: true, texte: "Il est respecté <em>de tous</em>." },
      ],
      astuce: "Le complément d'agent du passif correspond au sujet de la phrase active.",
    },
    {
      id: "gr-apposition",
      titre: "L'apposition",
      resume: "Un groupe qui désigne autrement le nom, souvent entre virgules.",
      explication:
        "<p>L'<strong>apposition</strong> caractérise ou renomme un nom sans mot de liaison ; elle est généralement détachée par des <strong>virgules</strong> et peut être supprimée.</p>",
      exemples: [
        { ok: true, texte: "Paris, <em>capitale de la France</em>, est immense." },
        { ok: true, texte: "Victor Hugo, <em>écrivain engagé</em>, publia beaucoup." },
      ],
      astuce: "Elle équivaut souvent à « c'est-à-dire » et se retire sans casser la phrase.",
    },
    {
      id: "gr-conjonctions",
      titre: "Les conjonctions",
      resume: "De coordination (mais, ou, et…) ou de subordination (que, quand, si…).",
      explication:
        "<p>La <strong>conjonction de coordination</strong> relie deux mots ou propositions de même fonction : <em>mais, ou, et, donc, or, ni, car</em>.</p><p>La <strong>conjonction de subordination</strong> introduit une proposition subordonnée : <em>que, quand, comme, si, lorsque, puisque, quoique, afin que…</em></p>",
      exemples: [
        { ok: true, texte: "Il pleut <em>mais</em> je sors. (coordination)" },
        { ok: true, texte: "Je sors <em>quand</em> il pleut. (subordination)" },
      ],
      astuce: "Moyen mnémo pour la coordination : « Mais où est donc Ornicar ? »",
    },
    {
      id: "gr-pronoms-personnels",
      titre: "Les pronoms personnels",
      resume: "Ils remplacent un nom ; sujets ou compléments.",
      explication:
        "<p>Les <strong>pronoms personnels</strong> désignent les personnes ou remplacent un groupe nominal.</p><p><strong>Sujets</strong> : je, tu, il/elle/on, nous, vous, ils/elles.</p><p><strong>Compléments</strong> : me, te, se, le/la/les, lui/leur, nous, vous, ainsi que « en » et « y ».</p>",
      exemples: [
        { ok: true, texte: "Je le vois. (le = COD)" },
        { ok: true, texte: "Je lui parle. (lui = COI)" },
        { ok: true, texte: "J'en viens. J'y pense. (en, y)" },
      ],
      astuce: "« lui/leur » sont compléments indirects ; « le/la/les » directs.",
    },
    {
      id: "gr-adverbe",
      titre: "L'adverbe",
      resume: "Mot invariable qui modifie un verbe, un adjectif, un autre adverbe.",
      explication:
        "<p>L'<strong>adverbe</strong> est un mot <strong>invariable</strong> qui précise le sens d'un verbe, d'un adjectif, d'un autre adverbe ou de toute la phrase.</p><p>On distingue des adverbes de manière (vite, bien), de temps (hier), de lieu (ici), de quantité (beaucoup), de négation (ne… pas)…</p>",
      exemples: [
        { ok: true, texte: "Il court <em>vite</em>. C'est <em>très</em> beau." },
        { ok: true, texte: "Beaucoup d'adverbes de manière se terminent par -ment (lentement)." },
      ],
      astuce: "L'adverbe ne s'accorde jamais : il est invariable.",
    },
  ];
})();
