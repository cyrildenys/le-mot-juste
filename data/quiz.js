/* =====================================================================
   Le Mot Juste — Banque de questions de quiz
   Clé = id d'une règle (voir data/*.js). Valeur = liste de questions QCM.
   Question : { q, options:[3], reponse: index de la bonne, explication }
   Si q contient « ___ », c'est une phrase à trou.
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};

  LMJ.data.quiz = {
    /* ---------- ACCORDS ---------- */
    "acc-adjectif": [
      { q: "Des chemises ___.", options: ["blanc", "blanches", "blanche"], reponse: 1, explication: "Accord avec « chemises » (féminin pluriel)." },
      { q: "Un homme et une femme ___.", options: ["courageux", "courageuses", "courageuse"], reponse: 0, explication: "Genres différents → masculin pluriel." },
    ],
    "acc-pp-etre": [
      { q: "Elles sont ___ hier soir.", options: ["arrivé", "arrivées", "arrivés"], reponse: 1, explication: "Avec être, accord avec le sujet (elles)." },
      { q: "Les fleurs sont ___.", options: ["fané", "fanées", "fanés"], reponse: 1, explication: "Sujet « fleurs » féminin pluriel." },
    ],
    "acc-pp-avoir": [
      { q: "La lettre que j'ai ___ hier.", options: ["écrit", "écrite", "écrits"], reponse: 1, explication: "COD « que » (=la lettre) placé avant → accord." },
      { q: "J'ai ___ les pommes.", options: ["mangé", "mangées", "mangés"], reponse: 0, explication: "COD « les pommes » placé après → pas d'accord." },
    ],
    "acc-pp-pronominaux": [
      { q: "Elle s'est ___ les mains.", options: ["lavée", "lavé", "lavées"], reponse: 1, explication: "COD « les mains » après le verbe → pas d'accord." },
      { q: "Elle s'est ___ ce matin.", options: ["lavé", "lavée", "laver"], reponse: 1, explication: "« se » est COD → accord avec le sujet." },
    ],
    "acc-tout": [
      { q: "Elles sont ___ étonnées.", options: ["toutes", "tout", "toute"], reponse: 1, explication: "Adverbe devant une voyelle → « tout » invariable." },
      { q: "Elles sont ___ honteuses.", options: ["tout", "toutes", "toute"], reponse: 1, explication: "Devant consonne (h aspiré) → « toutes » par euphonie." },
    ],
    "acc-leur": [
      { q: "Je ___ ai dit la vérité.", options: ["leur", "leurs", "leures"], reponse: 0, explication: "Pronom devant le verbe → invariable." },
      { q: "___ enfants sont polis.", options: ["Leur", "Leurs", "Leures"], reponse: 1, explication: "Déterminant + nom pluriel → « leurs »." },
    ],
    "acc-couleurs": [
      { q: "Des chaussures ___.", options: ["marrons", "marron", "marronnes"], reponse: 1, explication: "« marron » (nom employé comme couleur) → invariable." },
      { q: "Des yeux ___.", options: ["bleu clair", "bleus clairs", "bleu clairs"], reponse: 0, explication: "Couleur composée → invariable." },
    ],
    "acc-demi": [
      { q: "Une ___-heure.", options: ["demie", "demi", "demies"], reponse: 1, explication: "Devant le nom → « demi » invariable + trait d'union." },
      { q: "Deux heures et ___.", options: ["demi", "demie", "demies"], reponse: 1, explication: "Après le nom → accord en genre (heure = féminin)." },
    ],
    "acc-verbe-sujet": [
      { q: "La plupart des gens ___ ainsi.", options: ["pense", "pensent", "penses"], reponse: 1, explication: "Accord avec le complément (les gens)." },
      { q: "Le panier de fruits ___ renversé.", options: ["étaient", "était", "étais"], reponse: 1, explication: "Le vrai sujet est « le panier » (singulier)." },
    ],
    "acc-vingt-cent": [
      { q: "Quatre-___.", options: ["vingt", "vingts", "vingtes"], reponse: 1, explication: "Multiplié et en fin de nombre → « vingts »." },
      { q: "Quatre-___-deux.", options: ["vingts", "vingt", "vingtes"], reponse: 1, explication: "Suivi d'un autre nombre → pas de s." },
      { q: "Deux ___ ans.", options: ["milles", "mille", "mils"], reponse: 1, explication: "« mille » (adjectif numéral) est invariable." },
    ],

    /* ---------- CONJUGAISON ---------- */
    "conj-er-ou-e": [
      { q: "Il a ___ son travail.", options: ["terminer", "terminé", "terminez"], reponse: 1, explication: "« il a mordu » fonctionne → participe passé en -é." },
      { q: "Je vais ___ dehors.", options: ["jouer", "joué", "jouez"], reponse: 0, explication: "« je vais mordre » fonctionne → infinitif en -er." },
    ],
    "conj-rai-rais": [
      { q: "Demain, je ___ à Paris.", options: ["irais", "irai", "irait"], reponse: 1, explication: "Certitude future → futur (il ira)." },
      { q: "Si je pouvais, je ___ volontiers.", options: ["viendrai", "viendrais", "viendrait"], reponse: 1, explication: "Hypothèse → conditionnel (il viendrait)." },
    ],
    "conj-imperatif-s": [
      { q: "___ ta soupe !", options: ["Manges", "Mange", "Manger"], reponse: 1, explication: "1er groupe à l'impératif → pas de s." },
      { q: "___-y, dépêche-toi !", options: ["Va", "Vas", "Vais"], reponse: 1, explication: "Devant « y », on ajoute un s : « Vas-y »." },
    ],
    "conj-present-er": [
      { q: "Ils ___ dans le jardin.", options: ["joue", "jouent", "joues"], reponse: 1, explication: "3e personne du pluriel → -ent." },
      { q: "Tu ___ très bien.", options: ["chante", "chantes", "chantent"], reponse: 1, explication: "2e personne du singulier → -es." },
    ],
    "conj-imparfait-passe-simple": [
      { q: "Il ___ nuit quand l'orage éclata.", options: ["fit", "faisait", "fera"], reponse: 1, explication: "Décor / durée → imparfait." },
      { q: "Chaque été, nous ___ à la mer.", options: ["allâmes", "allions", "allons"], reponse: 1, explication: "Habitude passée → imparfait." },
    ],
    "conj-subjonctif": [
      { q: "Il faut que tu ___.", options: ["viens", "viennes", "viendras"], reponse: 1, explication: "« il faut que » → subjonctif présent." },
      { q: "Je veux qu'il ___ beau.", options: ["fait", "fasse", "fera"], reponse: 1, explication: "Souhait → subjonctif présent." },
    ],

    /* ---------- CONFUSIONS ---------- */
    "conf-a-a": [
      { q: "Il ___ faim.", options: ["a", "à", "as"], reponse: 0, explication: "Remplaçable par « avait » → verbe « a »." },
      { q: "Il va ___ Paris.", options: ["a", "à", "as"], reponse: 1, explication: "Préposition de lieu → « à »." },
    ],
    "conf-ou-ou": [
      { q: "Thé ___ café ?", options: ["où", "ou", "oux"], reponse: 1, explication: "Remplaçable par « ou bien » → « ou »." },
      { q: "___ vas-tu ?", options: ["Ou", "Où", "Oux"], reponse: 1, explication: "Indique le lieu → « où »." },
    ],
    "conf-ce-se": [
      { q: "Il ___ lave.", options: ["ce", "se", "ces"], reponse: 1, explication: "Pronom réfléchi devant le verbe → « se »." },
      { q: "___ matin, il pleut.", options: ["Se", "Ce", "Ces"], reponse: 1, explication: "Détermine « matin » → « ce »." },
    ],
    "conf-ces-ses": [
      { q: "Il range ___ affaires.", options: ["ces", "ses", "c'est"], reponse: 1, explication: "= les siennes → « ses »." },
      { q: "___ vrai, tu as raison.", options: ["Ses", "Ces", "C'est"], reponse: 2, explication: "= « cela est » → « c'est »." },
      { q: "Il ___ trompé.", options: ["c'est", "s'est", "ces"], reponse: 1, explication: "Verbe pronominal → « s'est »." },
    ],
    "conf-son-sont": [
      { q: "___ chien dort.", options: ["Sont", "Son", "Sons"], reponse: 1, explication: "= le sien → « son »." },
      { q: "Ils ___ en retard.", options: ["son", "sont", "sonts"], reponse: 1, explication: "Remplaçable par « étaient » → « sont »." },
    ],
    "conf-on-ont": [
      { q: "___ part demain.", options: ["Ont", "On", "Ons"], reponse: 1, explication: "Remplaçable par « il » → « on »." },
      { q: "Ils ___ gagné.", options: ["on", "ont", "onts"], reponse: 1, explication: "Remplaçable par « avaient » → « ont »." },
    ],
    "conf-et-est": [
      { q: "Toi ___ moi.", options: ["est", "et", "ai"], reponse: 1, explication: "Addition (= et puis) → « et »." },
      { q: "Elle ___ prête.", options: ["et", "est", "ai"], reponse: 1, explication: "Remplaçable par « était » → « est »." },
    ],
    "conf-la-la": [
      { q: "Reste ___ !", options: ["la", "là", "l'a"], reponse: 1, explication: "Indique le lieu → « là »." },
      { q: "Il ___ vue hier.", options: ["la", "là", "l'a"], reponse: 2, explication: "= « l'avait » → « l'a »." },
    ],
    "conf-quel-quelle": [
      { q: "Je crois ___ viendra.", options: ["quelle", "qu'elle", "quel"], reponse: 1, explication: "Remplaçable par « qu'il » → « qu'elle »." },
      { q: "___ heure est-il ?", options: ["Qu'elle", "Quelle", "Quel"], reponse: 1, explication: "Détermine « heure » (féminin) → « quelle »." },
    ],
    "conf-peu-peut": [
      { q: "Il ___ venir ce soir.", options: ["peu", "peut", "peux"], reponse: 1, explication: "Remplaçable par « pouvait » → « peut »." },
      { q: "Il mange ___.", options: ["peut", "peu", "peux"], reponse: 1, explication: "= pas beaucoup → « peu »." },
    ],
    "conf-pres-pret": [
      { q: "Il habite ___ d'ici.", options: ["prêt", "près", "prés"], reponse: 1, explication: "« près de » (distance)." },
      { q: "Il est ___ à partir.", options: ["près", "prêt", "prés"], reponse: 1, explication: "« prêt à » (= préparé)." },
    ],
    "conf-quand-quant": [
      { q: "___ à moi, je reste.", options: ["Quand", "Quant", "Qu'en"], reponse: 1, explication: "= en ce qui concerne → « quant à »." },
      { q: "___ pars-tu ?", options: ["Quant", "Quand", "Qu'en"], reponse: 1, explication: "Indique le temps → « quand »." },
    ],
    "conf-plutot": [
      { q: "Il est ___ sympathique.", options: ["plus tôt", "plutôt", "plutot"], reponse: 1, explication: "= assez / de préférence → « plutôt »." },
      { q: "Lève-toi ___ demain.", options: ["plutôt", "plus tôt", "plustôt"], reponse: 1, explication: "Contraire de « plus tard » → « plus tôt »." },
    ],
    "conf-quoique": [
      { q: "___ il soit tard, je reste.", options: ["Quoi que", "Quoique", "Quoi-que"], reponse: 1, explication: "= bien que → « quoique »." },
      { q: "___ tu fasses, je te soutiens.", options: ["Quoique", "Quoi que", "Quoiques"], reponse: 1, explication: "= quelle que soit la chose que → « quoi que »." },
    ],
    "conf-davantage": [
      { q: "Travaille ___ !", options: ["d'avantage", "davantage", "d'avantages"], reponse: 1, explication: "= plus → « davantage »." },
      { q: "Il n'y a pas ___ à hésiter.", options: ["davantage", "d'avantage", "davantages"], reponse: 1, explication: "= de profit → « d'avantage »." },
    ],

    /* ---------- MAUVAIS USAGES ---------- */
    "mu-aujourdhui": [
      { q: "Quelle formulation est correcte ?", options: ["Au jour d'aujourd'hui, tout va bien.", "Aujourd'hui, tout va bien.", "Au jour aujourd'hui, tout va bien."], reponse: 1, explication: "« aujourd'hui » suffit ; le reste est un pléonasme." },
    ],
    "mu-malgre-que": [
      { q: "___ il pleuve, je sors.", options: ["Malgré qu'", "Bien qu'", "Malgré que"], reponse: 1, explication: "Sens concessif → « bien que » + subjonctif." },
      { q: "___ la pluie, je sors.", options: ["Bien que", "Malgré", "Malgré que"], reponse: 1, explication: "Devant un nom → « malgré »." },
    ],
    "mu-pallier": [
      { q: "Cette mesure pallie ___ difficultés.", options: ["aux", "les", "des"], reponse: 1, explication: "« pallier » est transitif direct (pallier qqch)." },
      { q: "Quelle construction est correcte ?", options: ["pallier à un manque", "pallier un manque", "pallier de un manque"], reponse: 1, explication: "On pallie quelque chose, sans préposition." },
    ],
    "mu-se-rappeler": [
      { q: "Quelle construction est correcte ?", options: ["Je me rappelle de cette histoire.", "Je me rappelle cette histoire.", "Je me rappelle à cette histoire."], reponse: 1, explication: "« se rappeler qqch » (transitif direct)." },
      { q: "Avec « se souvenir » :", options: ["Je me souviens cette histoire.", "Je me souviens de cette histoire.", "Je me souviens à cette histoire."], reponse: 1, explication: "« se souvenir DE quelque chose »." },
    ],
    "mu-chez-coiffeur": [
      { q: "Je vais ___ coiffeur.", options: ["au", "chez le", "à le"], reponse: 1, explication: "Devant une personne → « chez »." },
    ],
    "mu-comme-meme": [
      { q: "C'est ___ étonnant.", options: ["comme même", "quand même", "comme-même"], reponse: 1, explication: "L'expression correcte est « quand même »." },
    ],
    "mu-voire-meme": [
      { q: "C'est difficile, ___ impossible.", options: ["voire même", "voire", "voir"], reponse: 1, explication: "« voire » = « et même » : pas de doublon." },
    ],
    "mu-apres-que": [
      { q: "Après qu'il ___ parti, elle pleura.", options: ["soit", "est", "fût"], reponse: 1, explication: "« après que » se construit avec l'indicatif." },
    ],
    "mu-monter-en-haut": [
      { q: "Quelle phrase est correcte ?", options: ["Il est monté en haut.", "Il est monté.", "Il est monté tout en haut du bas."], reponse: 1, explication: "« monter » implique déjà « en haut » (pléonasme)." },
    ],
    "mu-si-jaurais": [
      { q: "Si j'___ su, je serais venu.", options: ["aurais", "avais", "aurai"], reponse: 1, explication: "Après « si », pas de conditionnel → imparfait." },
    ],
    "mu-espece": [
      { q: "___ espèce de génie.", options: ["Un", "Une", "De"], reponse: 1, explication: "« espèce » est féminin → « une »." },
    ],
    "mu-dont-en": [
      { q: "Quelle phrase est correcte ?", options: ["Le livre dont je t'en ai parlé.", "Le livre dont je t'ai parlé.", "Le livre que je t'en ai parlé."], reponse: 1, explication: "« dont » contient déjà « de » : pas de « en »." },
    ],

    /* ---------- NOTIONS DE GRAMMAIRE ---------- */
    "gr-nature-fonction": [
      { q: "Dans « un mur rouge », « rouge » est de nature…", options: ["nom", "adjectif", "adverbe"], reponse: 1, explication: "« rouge » est un adjectif (ici épithète)." },
    ],
    "gr-sujet": [
      { q: "« Que dit le professeur ? » Le sujet est…", options: ["Que", "le professeur", "dit"], reponse: 1, explication: "Qui est-ce qui dit ? → le professeur (sujet inversé)." },
    ],
    "gr-cod-coi": [
      { q: "« Je parle à Marie. » « à Marie » est…", options: ["un COD", "un COI", "le sujet"], reponse: 1, explication: "Introduit par « à » → complément d'objet indirect." },
      { q: "« Je mange une pomme. » « une pomme » est…", options: ["un COD", "un COI", "un CC"], reponse: 0, explication: "Sans préposition → complément d'objet direct." },
    ],
    "gr-cc": [
      { q: "« Il travaille dans le jardin. » « dans le jardin » est…", options: ["un COD", "un CC de lieu", "le sujet"], reponse: 1, explication: "Déplaçable/supprimable → complément circonstanciel de lieu." },
    ],
    "gr-epithete-attribut": [
      { q: "« Cette voiture est rapide. » « rapide » est…", options: ["épithète", "attribut du sujet", "COD"], reponse: 1, explication: "Relié au sujet par « est » (verbe d'état) → attribut." },
    ],
    "gr-propositions": [
      { q: "« Je pense qu'il dort. » contient…", options: ["une proposition", "deux propositions", "trois propositions"], reponse: 1, explication: "Deux verbes conjugués → deux propositions." },
    ],
    "gr-relative": [
      { q: "« La ville où je suis né. » « où » introduit…", options: ["une relative", "une principale", "un COD"], reponse: 0, explication: "Pronom relatif → subordonnée relative." },
    ],
    "gr-voix-passive": [
      { q: "Passif de « Le chat mange la souris » :", options: ["La souris mange le chat.", "La souris est mangée par le chat.", "Le chat est mangé."], reponse: 1, explication: "Le COD devient sujet ; agent introduit par « par »." },
    ],
    "gr-determinants": [
      { q: "Lequel est un déterminant ?", options: ["rapidement", "cette", "manger"], reponse: 1, explication: "« cette » est un déterminant démonstratif." },
    ],

    /* ---------- VOCABULAIRE : NUANCES ---------- */
    "nu-amener": [
      { q: "___ ton frère à la fête.", options: ["Apporte", "Amène", "Emporte"], reponse: 1, explication: "Personne + vers ici → « amener »." },
      { q: "N'oublie pas d'___ ton parapluie.", options: ["amener", "emporter", "emmener"], reponse: 1, explication: "Chose + au loin → « emporter »." },
    ],
    "nu-an-annee": [
      { q: "Il a trente ___.", options: ["années", "ans", "an"], reponse: 1, explication: "L'unité comptée → « ans »." },
      { q: "Une ___ riche en événements.", options: ["an", "année", "ans"], reponse: 1, explication: "La durée vécue → « année »." },
    ],
    "nu-second-deuxieme": [
      { q: "Le ___ étage sur cinq.", options: ["second", "deuxième", "secondaire"], reponse: 1, explication: "Série de plus de deux → « deuxième »." },
    ],
    "nu-eminent-imminent": [
      { q: "Un ___ professeur.", options: ["imminent", "éminent", "immanent"], reponse: 1, explication: "Remarquable, supérieur → « éminent »." },
      { q: "Un danger ___.", options: ["éminent", "imminent", "immanent"], reponse: 1, explication: "Sur le point d'arriver → « imminent »." },
    ],
    "nu-conjecture": [
      { q: "Se perdre en ___.", options: ["conjonctures", "conjectures", "conjugaisons"], reponse: 1, explication: "Suppositions → « conjectures »." },
      { q: "La ___ économique.", options: ["conjecture", "conjoncture", "conjugaison"], reponse: 1, explication: "Situation du moment → « conjoncture »." },
    ],
    "nu-prodige-prodigue": [
      { q: "Un enfant ___.", options: ["prodigue", "prodige", "prodigieux"], reponse: 1, explication: "Talent extraordinaire → « prodige »." },
      { q: "Le fils ___.", options: ["prodige", "prodigue", "prodigieux"], reponse: 1, explication: "Qui dépense sans compter → « prodigue »." },
    ],
    "nu-officiel-officieux": [
      { q: "Le résultat ___.", options: ["officieux", "officiel", "officiant"], reponse: 1, explication: "Confirmé par l'autorité → « officiel »." },
      { q: "Une source ___.", options: ["officielle", "officieuse", "officiante"], reponse: 1, explication: "Connue mais non confirmée → « officieuse »." },
    ],
    "nu-notable-notoire": [
      { q: "Une amélioration ___.", options: ["notoire", "notable", "notariale"], reponse: 1, explication: "Digne d'être notée → « notable »." },
      { q: "Un mensonge ___.", options: ["notable", "notoire", "notarié"], reponse: 1, explication: "Connu de tous → « notoire »." },
    ],
    "nu-emigrer-immigrer": [
      { q: "Ils ont ___ vers le Canada.", options: ["immigré", "émigré", "migré"], reponse: 1, explication: "Quitter son pays → « émigrer »." },
      { q: "Sa famille a ___ en France.", options: ["émigré", "immigré", "migré"], reponse: 1, explication: "Entrer dans un pays → « immigrer »." },
    ],
    "nu-partial-partiel": [
      { q: "Un juge ___.", options: ["partiel", "partial", "partagé"], reponse: 1, explication: "Manque d'objectivité → « partial »." },
      { q: "Un remboursement ___.", options: ["partial", "partiel", "partagé"], reponse: 1, explication: "Incomplet → « partiel »." },
    ],
    "nu-continu-continuel": [
      { q: "Un courant ___.", options: ["continuel", "continu", "continué"], reponse: 1, explication: "Sans interruption → « continu »." },
      { q: "Des interruptions ___.", options: ["continues", "continuelles", "continuées"], reponse: 1, explication: "Qui se répètent sans cesse → « continuelles »." },
    ],
    "nu-venimeux-veneneux": [
      { q: "Un serpent ___.", options: ["vénéneux", "venimeux", "venteux"], reponse: 1, explication: "Qui inocule un venin → « venimeux »." },
      { q: "Un champignon ___.", options: ["venimeux", "vénéneux", "venteux"], reponse: 1, explication: "Toxique à l'ingestion → « vénéneux »." },
    ],
    "nu-perpetrer-perpetuer": [
      { q: "___ un attentat.", options: ["Perpétuer", "Perpétrer", "Perpétuel"], reponse: 1, explication: "Commettre un acte → « perpétrer »." },
      { q: "___ une tradition.", options: ["Perpétrer", "Perpétuer", "Perpétuel"], reponse: 1, explication: "Faire durer → « perpétuer »." },
    ],
    "nu-recouvrer-recouvrir": [
      { q: "Il a ___ la vue.", options: ["recouvert", "recouvré", "recouvru"], reponse: 1, explication: "Retrouver → « recouvrer » (recouvré)." },
      { q: "La neige a ___ les toits.", options: ["recouvré", "recouvert", "recouvru"], reponse: 1, explication: "Couvrir entièrement → « recouvrir » (recouvert)." },
    ],
  };
})();
