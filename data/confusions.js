/* =====================================================================
   Le Mot Juste — Confusions fréquentes (homophones grammaticaux)
   Schéma : { id, titre, entrees:[{mot, nature, sens, exemple}], astuce }
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};

  LMJ.data.confusions = [
    {
      id: "conf-a-a",
      titre: "a / à",
      entrees: [
        { mot: "a", nature: "verbe avoir", sens: "3e pers. du présent de « avoir »", exemple: "Il a faim." },
        { mot: "à", nature: "préposition", sens: "indique lieu, temps, appartenance…", exemple: "Il va à Paris." },
      ],
      astuce: "Remplacez par « avait » : si la phrase tient, c'est « a » (verbe). Sinon, « à ».",
    },
    {
      id: "conf-ou-ou",
      titre: "ou / où",
      entrees: [
        { mot: "ou", nature: "conjonction", sens: "exprime un choix (= ou bien)", exemple: "Thé ou café ?" },
        { mot: "où", nature: "adverbe / pronom", sens: "indique le lieu ou le temps", exemple: "Où vas-tu ?" },
      ],
      astuce: "Remplaçable par « ou bien » → « ou » sans accent.",
    },
    {
      id: "conf-ce-se",
      titre: "ce / se",
      entrees: [
        { mot: "ce", nature: "déterminant / pronom", sens: "montre (ce livre) ou annonce (c'est)", exemple: "Ce matin, ce sera prêt." },
        { mot: "se", nature: "pronom réfléchi", sens: "accompagne un verbe pronominal", exemple: "Il se lave." },
      ],
      astuce: "« se » se place devant un verbe ; remplacez par « me/te » : « je me lave ».",
    },
    {
      id: "conf-ces-ses",
      titre: "ces / ses / c'est / s'est / sais / sait",
      entrees: [
        { mot: "ces", nature: "déterminant démonstratif pluriel", sens: "= ces choses-là", exemple: "Ces livres sont à moi." },
        { mot: "ses", nature: "déterminant possessif pluriel", sens: "= les siens", exemple: "Il range ses affaires." },
        { mot: "c'est", nature: "cela est", sens: "présentatif", exemple: "C'est vrai." },
        { mot: "s'est", nature: "se + est", sens: "verbe pronominal", exemple: "Il s'est trompé." },
        { mot: "sais / sait", nature: "verbe savoir", sens: "présent de « savoir »", exemple: "Je sais, il sait." },
      ],
      astuce: "« ces » → « ces …-là ». « ses » → « les siens ». « c'est » → « cela est ». « s'est » → « il s'est ».",
    },
    {
      id: "conf-son-sont",
      titre: "son / sont",
      entrees: [
        { mot: "son", nature: "déterminant possessif", sens: "= le sien", exemple: "Son chien dort." },
        { mot: "sont", nature: "verbe être", sens: "3e pers. pluriel du présent", exemple: "Ils sont là." },
      ],
      astuce: "Remplacez par « étaient » : si ça marche, c'est « sont ».",
    },
    {
      id: "conf-on-ont",
      titre: "on / ont",
      entrees: [
        { mot: "on", nature: "pronom personnel sujet", sens: "= quelqu'un, nous", exemple: "On part demain." },
        { mot: "ont", nature: "verbe avoir", sens: "3e pers. pluriel du présent", exemple: "Ils ont gagné." },
      ],
      astuce: "Remplacez par « avaient » → c'est « ont ». Par « il » → c'est « on ».",
    },
    {
      id: "conf-et-est",
      titre: "et / est",
      entrees: [
        { mot: "et", nature: "conjonction", sens: "addition (= et puis)", exemple: "Toi et moi." },
        { mot: "est", nature: "verbe être", sens: "3e pers. du présent", exemple: "Elle est prête." },
      ],
      astuce: "Remplacez par « était » : si ça tient, c'est « est ».",
    },
    {
      id: "conf-la-la",
      titre: "la / là / l'a",
      entrees: [
        { mot: "la", nature: "article / pronom", sens: "détermine ou remplace un féminin", exemple: "La porte, je la ferme." },
        { mot: "là", nature: "adverbe de lieu", sens: "indique l'endroit", exemple: "Reste là." },
        { mot: "l'a", nature: "le/la + a (avoir)", sens: "il l'a fait", exemple: "Il l'a vue." },
      ],
      astuce: "« là » (accent) = lieu. « l'a » = « l'avait ».",
    },
    {
      id: "conf-quel-quelle",
      titre: "quel / quelle / qu'elle",
      entrees: [
        { mot: "quel(s) / quelle(s)", nature: "déterminant interrogatif/exclamatif", sens: "s'accorde avec le nom", exemple: "Quelle heure ? Quel dommage !" },
        { mot: "qu'elle(s)", nature: "que + elle", sens: "conjonction + pronom", exemple: "Je crois qu'elle viendra." },
      ],
      astuce: "Remplacez par « qu'il » : si ça marche, écrivez « qu'elle ».",
    },
    {
      id: "conf-peu-peut",
      titre: "peu / peut / peux",
      entrees: [
        { mot: "peu", nature: "adverbe de quantité", sens: "= pas beaucoup", exemple: "Il mange peu." },
        { mot: "peut", nature: "verbe pouvoir (il)", sens: "3e pers. du présent", exemple: "Il peut venir." },
        { mot: "peux", nature: "verbe pouvoir (je/tu)", sens: "1re/2e pers.", exemple: "Je peux, tu peux." },
      ],
      astuce: "Remplacez par « pouvait » → verbe (peut/peux). Par « très » → adverbe (peu).",
    },
    {
      id: "conf-pres-pret",
      titre: "près / prêt",
      entrees: [
        { mot: "près", nature: "adverbe/préposition", sens: "à faible distance (près de)", exemple: "Il habite près d'ici." },
        { mot: "prêt", nature: "adjectif", sens: "= préparé (s'accorde)", exemple: "Il est prêt, elle est prête." },
      ],
      astuce: "« prêt » s'accorde et se dit « prêt à ». « près » ne s'accorde jamais et se dit « près de ».",
    },
    {
      id: "conf-quand-quant",
      titre: "quand / quant / qu'en",
      entrees: [
        { mot: "quand", nature: "conjonction/adverbe de temps", sens: "= lorsque, à quel moment", exemple: "Quand pars-tu ?" },
        { mot: "quant", nature: "locution (quant à)", sens: "= en ce qui concerne", exemple: "Quant à moi, je reste." },
        { mot: "qu'en", nature: "que + en", sens: "interrogation/restriction", exemple: "Qu'en penses-tu ?" },
      ],
      astuce: "« quant » n'existe que dans « quant à / au / aux ».",
    },
    {
      id: "conf-plutot",
      titre: "plutôt / plus tôt",
      entrees: [
        { mot: "plutôt", nature: "adverbe", sens: "= de préférence, assez", exemple: "Il est plutôt gentil." },
        { mot: "plus tôt", nature: "comparatif de « tôt »", sens: "contraire de « plus tard »", exemple: "Lève-toi plus tôt." },
      ],
      astuce: "Si l'on peut opposer « plus tard », écrivez « plus tôt » en deux mots.",
    },
    {
      id: "conf-quoique",
      titre: "quoique / quoi que",
      entrees: [
        { mot: "quoique", nature: "conjonction", sens: "= bien que, malgré que", exemple: "Quoiqu'il soit tard, je reste." },
        { mot: "quoi que", nature: "locution", sens: "= quelle que soit la chose que", exemple: "Quoi que tu fasses, je te soutiens." },
      ],
      astuce: "Remplaçable par « bien que » → « quoique » en un mot.",
    },
    {
      id: "conf-davantage",
      titre: "davantage / d'avantage(s)",
      entrees: [
        { mot: "davantage", nature: "adverbe", sens: "= plus, plus longtemps", exemple: "Travaille davantage." },
        { mot: "d'avantage(s)", nature: "de + nom « avantage »", sens: "un profit, un bénéfice", exemple: "Il n'y a pas d'avantage à cela." },
      ],
      astuce: "Remplaçable par « plus » → « davantage » en un mot.",
    },
  ];
})();
