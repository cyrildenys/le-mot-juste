/* =====================================================================
   Le Mot Juste — Banque de questions de quiz
   Clé = id d'une règle. Valeur = liste de questions QCM.
   Question : { q, options:[3], reponse, explication, n }
     n = niveau : 1 (facile) · 2 (intermédiaire) · 3 (expert)
   Le quiz d'une fiche puise dans toute sa catégorie et présente au
   moins 10 questions par difficulté croissante (voir view-regles.js).
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
      { q: "Des chemises ___.", options: ["blanc", "blanches", "blanche"], reponse: 1, n: 1, explication: "Accord avec « chemises » (féminin pluriel)." },
      { q: "Un homme et une femme ___.", options: ["courageux", "courageuses", "courageuse"], reponse: 0, n: 2, explication: "Genres différents → masculin pluriel." },
    ],
    "acc-pp-etre": [
      { q: "Elles sont ___ hier soir.", options: ["arrivé", "arrivées", "arrivés"], reponse: 1, n: 1, explication: "Avec être, accord avec le sujet (elles)." },
      { q: "Les fleurs sont ___.", options: ["fané", "fanées", "fanés"], reponse: 1, n: 2, explication: "Sujet « fleurs » féminin pluriel." },
    ],
    "acc-pp-avoir": [
      { q: "La lettre que j'ai ___ hier.", options: ["écrit", "écrite", "écrits"], reponse: 1, n: 2, explication: "COD « que » (=la lettre) placé avant → accord." },
      { q: "J'ai ___ les pommes.", options: ["mangé", "mangées", "mangés"], reponse: 0, n: 2, explication: "COD « les pommes » placé après → pas d'accord." },
      { q: "Les efforts qu'il a ___.", options: ["fourni", "fournis", "fournies"], reponse: 1, n: 3, explication: "COD « qu' » = les efforts (masc. plur.) placé avant → accord." },
    ],
    "acc-pp-pronominaux": [
      { q: "Elle s'est ___ les mains.", options: ["lavée", "lavé", "lavées"], reponse: 1, n: 2, explication: "COD « les mains » après le verbe → pas d'accord." },
      { q: "Elle s'est ___ ce matin.", options: ["lavé", "lavée", "laver"], reponse: 1, n: 2, explication: "« se » est COD → accord avec le sujet." },
      { q: "Ils se sont ___ la main.", options: ["serré", "serrés", "serrée"], reponse: 0, n: 3, explication: "COD « la main » après → pas d'accord (se = COI)." },
      { q: "Les reines qui se sont ___.", options: ["succédées", "succédé", "succédés"], reponse: 1, n: 3, explication: "« succéder à » → se est COI → invariable." },
    ],
    "acc-tout": [
      { q: "Elles sont ___ étonnées.", options: ["toutes", "tout", "toute"], reponse: 1, n: 2, explication: "Adverbe devant une voyelle → « tout » invariable." },
      { q: "Elles sont ___ honteuses.", options: ["tout", "toutes", "toute"], reponse: 1, n: 3, explication: "Devant consonne (h aspiré) → « toutes » par euphonie." },
    ],
    "acc-leur": [
      { q: "Je ___ ai dit la vérité.", options: ["leur", "leurs", "leures"], reponse: 0, n: 1, explication: "Pronom devant le verbe → invariable." },
      { q: "___ enfants sont polis.", options: ["Leur", "Leurs", "Leures"], reponse: 1, n: 1, explication: "Déterminant + nom pluriel → « leurs »." },
    ],
    "acc-couleurs": [
      { q: "Des chaussures ___.", options: ["marrons", "marron", "marronnes"], reponse: 1, n: 2, explication: "« marron » (nom employé comme couleur) → invariable." },
      { q: "Des yeux ___.", options: ["bleu clair", "bleus clairs", "bleu clairs"], reponse: 0, n: 3, explication: "Couleur composée → invariable." },
    ],
    "acc-demi": [
      { q: "Une ___-heure.", options: ["demie", "demi", "demies"], reponse: 1, n: 2, explication: "Devant le nom → « demi » invariable + trait d'union." },
      { q: "Deux heures et ___.", options: ["demi", "demie", "demies"], reponse: 1, n: 2, explication: "Après le nom → accord en genre (heure = féminin)." },
    ],
    "acc-verbe-sujet": [
      { q: "La plupart des gens ___ ainsi.", options: ["pense", "pensent", "penses"], reponse: 1, n: 2, explication: "Accord avec le complément (les gens)." },
      { q: "Le panier de fruits ___ renversé.", options: ["étaient", "était", "étais"], reponse: 1, n: 2, explication: "Le vrai sujet est « le panier » (singulier)." },
      { q: "C'est moi qui ___ responsable.", options: ["est", "suis", "sont"], reponse: 1, n: 3, explication: "« qui » reprend « moi » → 1re personne." },
    ],
    "acc-vingt-cent": [
      { q: "Quatre-___.", options: ["vingt", "vingts", "vingtes"], reponse: 1, n: 2, explication: "Multiplié et en fin de nombre → « vingts »." },
      { q: "Quatre-___-deux.", options: ["vingts", "vingt", "vingtes"], reponse: 1, n: 2, explication: "Suivi d'un autre nombre → pas de s." },
      { q: "Deux ___ ans.", options: ["milles", "mille", "mils"], reponse: 1, n: 2, explication: "« mille » (adjectif numéral) est invariable." },
    ],

    /* ---------- CONJUGAISON ---------- */
    "conj-er-ou-e": [
      { q: "Il a ___ son travail.", options: ["terminer", "terminé", "terminez"], reponse: 1, n: 1, explication: "« il a mordu » fonctionne → participe passé en -é." },
      { q: "Je vais ___ dehors.", options: ["jouer", "joué", "jouez"], reponse: 0, n: 1, explication: "« je vais mordre » fonctionne → infinitif en -er." },
    ],
    "conj-rai-rais": [
      { q: "Demain, je ___ à Paris.", options: ["irais", "irai", "irait"], reponse: 1, n: 2, explication: "Certitude future → futur (il ira)." },
      { q: "Si je pouvais, je ___ volontiers.", options: ["viendrai", "viendrais", "viendrait"], reponse: 1, n: 2, explication: "Hypothèse → conditionnel (il viendrait)." },
    ],
    "conj-imperatif-s": [
      { q: "___ ta soupe !", options: ["Manges", "Mange", "Manger"], reponse: 1, n: 1, explication: "1er groupe à l'impératif → pas de s." },
      { q: "___-y, dépêche-toi !", options: ["Va", "Vas", "Vais"], reponse: 1, n: 2, explication: "Devant « y », on ajoute un s : « Vas-y »." },
    ],
    "conj-present-er": [
      { q: "Ils ___ dans le jardin.", options: ["joue", "jouent", "joues"], reponse: 1, n: 1, explication: "3e personne du pluriel → -ent." },
      { q: "Tu ___ très bien.", options: ["chante", "chantes", "chantent"], reponse: 1, n: 1, explication: "2e personne du singulier → -es." },
    ],
    "conj-imparfait-passe-simple": [
      { q: "Il ___ nuit quand l'orage éclata.", options: ["fit", "faisait", "fera"], reponse: 1, n: 2, explication: "Décor / durée → imparfait." },
      { q: "Chaque été, nous ___ à la mer.", options: ["allâmes", "allions", "allons"], reponse: 1, n: 2, explication: "Habitude passée → imparfait." },
    ],
    "conj-subjonctif": [
      { q: "Il faut que tu ___.", options: ["viens", "viennes", "viendras"], reponse: 1, n: 2, explication: "« il faut que » → subjonctif présent." },
      { q: "Je veux qu'il ___ beau.", options: ["fait", "fasse", "fera"], reponse: 1, n: 2, explication: "Souhait → subjonctif présent." },
      { q: "Bien qu'il ___ tard, il continue.", options: ["est", "soit", "sera"], reponse: 1, n: 3, explication: "« bien que » → subjonctif." },
      { q: "Je ne pense pas qu'il ___ raison.", options: ["a", "ait", "aura"], reponse: 1, n: 3, explication: "Doute / négation → subjonctif." },
      { q: "Il aurait fallu qu'il ___ plus tôt.", options: ["parte", "partît", "partait"], reponse: 1, n: 3, explication: "Concordance : subjonctif imparfait (soutenu)." },
    ],

    /* ---------- CONFUSIONS ---------- */
    "conf-a-a": [
      { q: "Il ___ faim.", options: ["a", "à", "as"], reponse: 0, n: 1, explication: "Remplaçable par « avait » → verbe « a »." },
      { q: "Il va ___ Paris.", options: ["a", "à", "as"], reponse: 1, n: 1, explication: "Préposition de lieu → « à »." },
    ],
    "conf-ou-ou": [
      { q: "Thé ___ café ?", options: ["où", "ou", "oux"], reponse: 1, n: 1, explication: "Remplaçable par « ou bien » → « ou »." },
      { q: "___ vas-tu ?", options: ["Ou", "Où", "Oux"], reponse: 1, n: 1, explication: "Indique le lieu → « où »." },
    ],
    "conf-ce-se": [
      { q: "Il ___ lave.", options: ["ce", "se", "ces"], reponse: 1, n: 1, explication: "Pronom réfléchi devant le verbe → « se »." },
      { q: "___ matin, il pleut.", options: ["Se", "Ce", "Ces"], reponse: 1, n: 1, explication: "Détermine « matin » → « ce »." },
    ],
    "conf-ces-ses": [
      { q: "Il range ___ affaires.", options: ["ces", "ses", "c'est"], reponse: 1, n: 2, explication: "= les siennes → « ses »." },
      { q: "___ vrai, tu as raison.", options: ["Ses", "Ces", "C'est"], reponse: 2, n: 2, explication: "= « cela est » → « c'est »." },
      { q: "Il ___ trompé.", options: ["c'est", "s'est", "ces"], reponse: 1, n: 2, explication: "Verbe pronominal → « s'est »." },
    ],
    "conf-son-sont": [
      { q: "___ chien dort.", options: ["Sont", "Son", "Sons"], reponse: 1, n: 1, explication: "= le sien → « son »." },
      { q: "Ils ___ en retard.", options: ["son", "sont", "sonts"], reponse: 1, n: 1, explication: "Remplaçable par « étaient » → « sont »." },
    ],
    "conf-on-ont": [
      { q: "___ part demain.", options: ["Ont", "On", "Ons"], reponse: 1, n: 1, explication: "Remplaçable par « il » → « on »." },
      { q: "Ils ___ gagné.", options: ["on", "ont", "onts"], reponse: 1, n: 1, explication: "Remplaçable par « avaient » → « ont »." },
    ],
    "conf-et-est": [
      { q: "Toi ___ moi.", options: ["est", "et", "ai"], reponse: 1, n: 1, explication: "Addition (= et puis) → « et »." },
      { q: "Elle ___ prête.", options: ["et", "est", "ai"], reponse: 1, n: 1, explication: "Remplaçable par « était » → « est »." },
    ],
    "conf-la-la": [
      { q: "Reste ___ !", options: ["la", "là", "l'a"], reponse: 1, n: 1, explication: "Indique le lieu → « là »." },
      { q: "Il ___ vue hier.", options: ["la", "là", "l'a"], reponse: 2, n: 2, explication: "= « l'avait » → « l'a »." },
    ],
    "conf-quel-quelle": [
      { q: "Je crois ___ viendra.", options: ["quelle", "qu'elle", "quel"], reponse: 1, n: 2, explication: "Remplaçable par « qu'il » → « qu'elle »." },
      { q: "___ heure est-il ?", options: ["Qu'elle", "Quelle", "Quel"], reponse: 1, n: 2, explication: "Détermine « heure » (féminin) → « quelle »." },
      { q: "___ que soient les obstacles, persévère.", options: ["Quelque", "Quel", "Quels"], reponse: 2, n: 3, explication: "« quel que » en deux mots, accord avec « obstacles » → « quels que »." },
    ],
    "conf-peu-peut": [
      { q: "Il ___ venir ce soir.", options: ["peu", "peut", "peux"], reponse: 1, n: 1, explication: "Remplaçable par « pouvait » → « peut »." },
      { q: "Il mange ___.", options: ["peut", "peu", "peux"], reponse: 1, n: 1, explication: "= pas beaucoup → « peu »." },
    ],
    "conf-pres-pret": [
      { q: "Il habite ___ d'ici.", options: ["prêt", "près", "prés"], reponse: 1, n: 2, explication: "« près de » (distance)." },
      { q: "Il est ___ à partir.", options: ["près", "prêt", "prés"], reponse: 1, n: 2, explication: "« prêt à » (= préparé)." },
    ],
    "conf-quand-quant": [
      { q: "___ à moi, je reste.", options: ["Quand", "Quant", "Qu'en"], reponse: 1, n: 2, explication: "= en ce qui concerne → « quant à »." },
      { q: "___ pars-tu ?", options: ["Quant", "Quand", "Qu'en"], reponse: 1, n: 1, explication: "Indique le temps → « quand »." },
      { q: "___ penses-tu ?", options: ["Quand", "Quant", "Qu'en"], reponse: 2, n: 3, explication: "= « que… en penses-tu » → « qu'en »." },
    ],
    "conf-plutot": [
      { q: "Il est ___ sympathique.", options: ["plus tôt", "plutôt", "plutot"], reponse: 1, n: 2, explication: "= assez / de préférence → « plutôt »." },
      { q: "Lève-toi ___ demain.", options: ["plutôt", "plus tôt", "plustôt"], reponse: 1, n: 2, explication: "Contraire de « plus tard » → « plus tôt »." },
    ],
    "conf-quoique": [
      { q: "___ il soit tard, je reste.", options: ["Quoi que", "Quoique", "Quoi-que"], reponse: 1, n: 2, explication: "= bien que → « quoique »." },
      { q: "___ tu fasses, je te soutiens.", options: ["Quoique", "Quoi que", "Quoiques"], reponse: 1, n: 3, explication: "= quelle que soit la chose que → « quoi que »." },
    ],
    "conf-davantage": [
      { q: "Travaille ___ !", options: ["d'avantage", "davantage", "d'avantages"], reponse: 1, n: 2, explication: "= plus → « davantage »." },
      { q: "Il n'y a pas ___ à hésiter.", options: ["davantage", "d'avantage", "davantages"], reponse: 1, n: 3, explication: "= de profit → « d'avantage »." },
    ],

    /* ---------- MAUVAIS USAGES ---------- */
    "mu-aujourdhui": [
      { q: "Quelle formulation est correcte ?", options: ["Au jour d'aujourd'hui, tout va bien.", "Aujourd'hui, tout va bien.", "Au jour aujourd'hui, tout va bien."], reponse: 1, n: 1, explication: "« aujourd'hui » suffit ; le reste est un pléonasme." },
    ],
    "mu-malgre-que": [
      { q: "___ il pleuve, je sors.", options: ["Malgré qu'", "Bien qu'", "Malgré que"], reponse: 1, n: 2, explication: "Sens concessif → « bien que » + subjonctif." },
      { q: "___ la pluie, je sors.", options: ["Bien que", "Malgré", "Malgré que"], reponse: 1, n: 2, explication: "Devant un nom → « malgré »." },
    ],
    "mu-pallier": [
      { q: "Cette mesure pallie ___ difficultés.", options: ["aux", "les", "des"], reponse: 1, n: 2, explication: "« pallier » est transitif direct (pallier qqch)." },
      { q: "Quelle construction est correcte ?", options: ["pallier à un manque", "pallier un manque", "pallier de un manque"], reponse: 1, n: 3, explication: "On pallie quelque chose, sans préposition." },
    ],
    "mu-se-rappeler": [
      { q: "Quelle construction est correcte ?", options: ["Je me rappelle de cette histoire.", "Je me rappelle cette histoire.", "Je me rappelle à cette histoire."], reponse: 1, n: 2, explication: "« se rappeler qqch » (transitif direct)." },
      { q: "Avec un pronom, on dit :", options: ["je m'en rappelle", "je me le rappelle", "je m'y rappelle"], reponse: 1, n: 3, explication: "« se rappeler qqch » → « je me le rappelle »." },
    ],
    "mu-chez-coiffeur": [
      { q: "Je vais ___ coiffeur.", options: ["au", "chez le", "à le"], reponse: 1, n: 1, explication: "Devant une personne → « chez »." },
    ],
    "mu-comme-meme": [
      { q: "C'est ___ étonnant.", options: ["comme même", "quand même", "comme-même"], reponse: 1, n: 1, explication: "L'expression correcte est « quand même »." },
    ],
    "mu-voire-meme": [
      { q: "C'est difficile, ___ impossible.", options: ["voire même", "voire", "voir"], reponse: 1, n: 2, explication: "« voire » = « et même » : pas de doublon." },
    ],
    "mu-apres-que": [
      { q: "Après qu'il ___ parti, elle pleura.", options: ["soit", "est", "fût"], reponse: 1, n: 3, explication: "« après que » se construit avec l'indicatif." },
    ],
    "mu-monter-en-haut": [
      { q: "Quelle phrase est correcte ?", options: ["Il est monté en haut.", "Il est monté.", "Il est monté tout en haut du bas."], reponse: 1, n: 1, explication: "« monter » implique déjà « en haut » (pléonasme)." },
    ],
    "mu-si-jaurais": [
      { q: "Si j'___ su, je serais venu.", options: ["aurais", "avais", "aurai"], reponse: 1, n: 2, explication: "Après « si », pas de conditionnel → imparfait." },
    ],
    "mu-espece": [
      { q: "___ espèce de génie.", options: ["Un", "Une", "De"], reponse: 1, n: 2, explication: "« espèce » est féminin → « une »." },
    ],
    "mu-dont-en": [
      { q: "Quelle phrase est correcte ?", options: ["Le livre dont je t'en ai parlé.", "Le livre dont je t'ai parlé.", "Le livre que je t'en ai parlé."], reponse: 1, n: 3, explication: "« dont » contient déjà « de » : pas de « en »." },
    ],

    /* ---------- NOTIONS DE GRAMMAIRE ---------- */
    "gr-nature-fonction": [
      { q: "Dans « un mur rouge », « rouge » est de nature…", options: ["nom", "adjectif", "adverbe"], reponse: 1, n: 2, explication: "« rouge » est un adjectif (ici épithète)." },
    ],
    "gr-sujet": [
      { q: "« Que dit le professeur ? » Le sujet est…", options: ["Que", "le professeur", "dit"], reponse: 1, n: 2, explication: "Qui est-ce qui dit ? → le professeur (sujet inversé)." },
    ],
    "gr-cod-coi": [
      { q: "« Je mange une pomme. » « une pomme » est…", options: ["un COD", "un COI", "un CC"], reponse: 0, n: 1, explication: "Sans préposition → complément d'objet direct." },
      { q: "« Je parle à Marie. » « à Marie » est…", options: ["un COD", "un COI", "le sujet"], reponse: 1, n: 2, explication: "Introduit par « à » → complément d'objet indirect." },
      { q: "« Il lui donne un livre. » « lui » est…", options: ["un COD", "un COI", "le sujet"], reponse: 1, n: 3, explication: "« donner à quelqu'un » → « lui » est COI." },
    ],
    "gr-cc": [
      { q: "« Il travaille dans le jardin. » « dans le jardin » est…", options: ["un COD", "un CC de lieu", "le sujet"], reponse: 1, n: 2, explication: "Déplaçable/supprimable → complément circonstanciel de lieu." },
    ],
    "gr-epithete-attribut": [
      { q: "« Cette voiture est rapide. » « rapide » est…", options: ["épithète", "attribut du sujet", "COD"], reponse: 1, n: 2, explication: "Relié au sujet par « est » (verbe d'état) → attribut." },
    ],
    "gr-propositions": [
      { q: "« Je pense qu'il dort. » contient…", options: ["une proposition", "deux propositions", "trois propositions"], reponse: 1, n: 2, explication: "Deux verbes conjugués → deux propositions." },
      { q: "« Quand il arriva, tout dormait. » « Quand il arriva » est…", options: ["une principale", "une subordonnée", "une indépendante"], reponse: 1, n: 3, explication: "Introduite par « quand » et dépendante → subordonnée." },
    ],
    "gr-relative": [
      { q: "« La ville où je suis né. » « où » introduit…", options: ["une relative", "une principale", "un COD"], reponse: 0, n: 2, explication: "Pronom relatif → subordonnée relative." },
      { q: "Dans « le livre dont je parle », « dont » remplace un complément introduit par…", options: ["à", "de", "pour"], reponse: 1, n: 3, explication: "« parler de » → « dont » = de qui / de quoi." },
    ],
    "gr-voix-passive": [
      { q: "Passif de « Le chat mange la souris » :", options: ["La souris mange le chat.", "La souris est mangée par le chat.", "Le chat est mangé."], reponse: 1, n: 3, explication: "Le COD devient sujet ; agent introduit par « par »." },
    ],
    "gr-determinants": [
      { q: "Lequel est un déterminant ?", options: ["rapidement", "cette", "manger"], reponse: 1, n: 1, explication: "« cette » est un déterminant démonstratif." },
    ],

    /* ---------- VOCABULAIRE : NUANCES ---------- */
    "nu-amener": [
      { q: "___ ton frère à la fête.", options: ["Apporte", "Amène", "Emporte"], reponse: 1, n: 1, explication: "Personne + vers ici → « amener »." },
      { q: "N'oublie pas d'___ ton parapluie.", options: ["amener", "emporter", "emmener"], reponse: 1, n: 2, explication: "Chose + au loin → « emporter »." },
    ],
    "nu-an-annee": [
      { q: "Il a trente ___.", options: ["années", "ans", "an"], reponse: 1, n: 1, explication: "L'unité comptée → « ans »." },
      { q: "Une ___ riche en événements.", options: ["an", "année", "ans"], reponse: 1, n: 1, explication: "La durée vécue → « année »." },
    ],
    "nu-second-deuxieme": [
      { q: "Le ___ étage sur cinq.", options: ["second", "deuxième", "secondaire"], reponse: 1, n: 1, explication: "Série de plus de deux → « deuxième »." },
    ],
    "nu-eminent-imminent": [
      { q: "Un ___ professeur.", options: ["imminent", "éminent", "immanent"], reponse: 1, n: 2, explication: "Remarquable, supérieur → « éminent »." },
      { q: "Un danger ___.", options: ["éminent", "imminent", "immanent"], reponse: 1, n: 2, explication: "Sur le point d'arriver → « imminent »." },
    ],
    "nu-conjecture": [
      { q: "Se perdre en ___.", options: ["conjonctures", "conjectures", "conjugaisons"], reponse: 1, n: 2, explication: "Suppositions → « conjectures »." },
      { q: "La ___ économique.", options: ["conjecture", "conjoncture", "conjugaison"], reponse: 1, n: 3, explication: "Situation du moment → « conjoncture »." },
    ],
    "nu-prodige-prodigue": [
      { q: "Un enfant ___.", options: ["prodigue", "prodige", "prodigieux"], reponse: 1, n: 2, explication: "Talent extraordinaire → « prodige »." },
      { q: "Le fils ___.", options: ["prodige", "prodigue", "prodigieux"], reponse: 1, n: 2, explication: "Qui dépense sans compter → « prodigue »." },
    ],
    "nu-officiel-officieux": [
      { q: "Le résultat ___.", options: ["officieux", "officiel", "officiant"], reponse: 1, n: 2, explication: "Confirmé par l'autorité → « officiel »." },
      { q: "Une source ___.", options: ["officielle", "officieuse", "officiante"], reponse: 1, n: 2, explication: "Connue mais non confirmée → « officieuse »." },
    ],
    "nu-notable-notoire": [
      { q: "Une amélioration ___.", options: ["notoire", "notable", "notariale"], reponse: 1, n: 2, explication: "Digne d'être notée → « notable »." },
      { q: "Un mensonge ___.", options: ["notable", "notoire", "notarié"], reponse: 1, n: 2, explication: "Connu de tous → « notoire »." },
    ],
    "nu-emigrer-immigrer": [
      { q: "Ils ont ___ vers le Canada.", options: ["immigré", "émigré", "migré"], reponse: 1, n: 2, explication: "Quitter son pays → « émigrer »." },
      { q: "Sa famille a ___ en France.", options: ["émigré", "immigré", "migré"], reponse: 1, n: 2, explication: "Entrer dans un pays → « immigrer »." },
    ],
    "nu-partial-partiel": [
      { q: "Un juge ___.", options: ["partiel", "partial", "partagé"], reponse: 1, n: 2, explication: "Manque d'objectivité → « partial »." },
      { q: "Un remboursement ___.", options: ["partial", "partiel", "partagé"], reponse: 1, n: 2, explication: "Incomplet → « partiel »." },
    ],
    "nu-continu-continuel": [
      { q: "Un courant ___.", options: ["continuel", "continu", "continué"], reponse: 1, n: 2, explication: "Sans interruption → « continu »." },
      { q: "Des interruptions ___.", options: ["continues", "continuelles", "continuées"], reponse: 1, n: 3, explication: "Qui se répètent sans cesse → « continuelles »." },
    ],
    "nu-venimeux-veneneux": [
      { q: "Un serpent ___.", options: ["vénéneux", "venimeux", "venteux"], reponse: 1, n: 2, explication: "Qui inocule un venin → « venimeux »." },
      { q: "Un champignon ___.", options: ["venimeux", "vénéneux", "venteux"], reponse: 1, n: 3, explication: "Toxique à l'ingestion → « vénéneux »." },
    ],
    "nu-perpetrer-perpetuer": [
      { q: "___ un attentat.", options: ["Perpétuer", "Perpétrer", "Perpétuel"], reponse: 1, n: 2, explication: "Commettre un acte → « perpétrer »." },
      { q: "___ une tradition.", options: ["Perpétrer", "Perpétuer", "Perpétuel"], reponse: 1, n: 3, explication: "Faire durer → « perpétuer »." },
    ],
    "nu-recouvrer-recouvrir": [
      { q: "Il a ___ la vue.", options: ["recouvert", "recouvré", "recouvru"], reponse: 1, n: 3, explication: "Retrouver → « recouvrer » (recouvré)." },
      { q: "La neige a ___ les toits.", options: ["recouvré", "recouvert", "recouvru"], reponse: 1, n: 3, explication: "Couvrir entièrement → « recouvrir » (recouvert)." },
    ],

    /* ---------- Nouvelles confusions ---------- */
    "conf-sur-sur": [
      { q: "Le livre est ___ la table.", options: ["sûr", "sur", "sûre"], reponse: 1, n: 1, explication: "Préposition de position → « sur »." },
      { q: "Je suis ___ de moi.", options: ["sur", "sûr", "sûre"], reponse: 1, n: 2, explication: "= certain → « sûr » (accent circonflexe)." },
    ],
    "conf-du-du": [
      { q: "Je bois ___ café.", options: ["dû", "du", "due"], reponse: 1, n: 1, explication: "Article contracté (de + le) → « du »." },
      { q: "Il a ___ partir plus tôt.", options: ["du", "dû", "due"], reponse: 1, n: 2, explication: "Participe passé de devoir (masc. sing.) → « dû »." },
    ],
    "conf-notre-notre": [
      { q: "___ maison est petite.", options: ["Nôtre", "Notre", "Nôtres"], reponse: 1, n: 1, explication: "Déterminant devant le nom → « notre » (sans accent)." },
      { q: "Ce livre est le ___.", options: ["notre", "nôtre", "nôtres"], reponse: 1, n: 2, explication: "Pronom (après « le ») → « nôtre » (accent)." },
    ],
    "conf-quelque": [
      { q: "J'ai vu ___ amis.", options: ["quel que", "quelque", "quelques"], reponse: 2, n: 2, explication: "= plusieurs → déterminant « quelques »." },
      { q: "___ soit ta décision, je te suis.", options: ["Quelque", "Quel que", "Quelle que"], reponse: 2, n: 3, explication: "Devant « soit », en deux mots, accord avec « décision » (fém.) → « quelle que »." },
    ],
    "conf-sans-sen": [
      { q: "Il est parti ___ manteau.", options: ["s'en", "sans", "c'en"], reponse: 1, n: 1, explication: "Marque l'absence → « sans »." },
      { q: "Il ___ souvient encore.", options: ["sans", "s'en", "c'en"], reponse: 1, n: 2, explication: "Verbe pronominal → « s'en »." },
    ],
    "conf-voie-voix": [
      { q: "Elle a une belle ___.", options: ["voie", "voix", "voit"], reponse: 1, n: 1, explication: "Le son de la parole → « voix »." },
      { q: "Il ___ clair dans cette affaire.", options: ["voie", "voix", "voit"], reponse: 2, n: 2, explication: "Verbe voir (il) → « voit »." },
    ],

    /* ---------- Nouvelles nuances ---------- */
    "nu-effraction-infraction": [
      { q: "Un vol avec ___.", options: ["infraction", "effraction", "fraction"], reponse: 1, n: 2, explication: "Forcer une entrée → « effraction »." },
      { q: "Une ___ au code de la route.", options: ["effraction", "infraction", "fraction"], reponse: 1, n: 2, explication: "Violer une règle → « infraction »." },
    ],
    "nu-eruption-irruption": [
      { q: "Une ___ volcanique.", options: ["irruption", "éruption", "interruption"], reponse: 1, n: 2, explication: "Jaillir hors → « éruption »." },
      { q: "Il fit ___ dans la salle.", options: ["éruption", "irruption", "interruption"], reponse: 1, n: 3, explication: "Entrer soudainement → « irruption »." },
    ],
    "nu-allusion-illusion": [
      { q: "Faire ___ à un incident.", options: ["illusion", "allusion", "élision"], reponse: 1, n: 2, explication: "Évoquer indirectement → « allusion »." },
      { q: "Se faire des ___.", options: ["allusions", "illusions", "élisions"], reponse: 1, n: 2, explication: "Croyances trompeuses → « illusions »." },
    ],
    "nu-collision-collusion": [
      { q: "Une ___ entre deux voitures.", options: ["collusion", "collision", "collation"], reponse: 1, n: 2, explication: "Choc physique → « collision »." },
      { q: "Une ___ frauduleuse entre concurrents.", options: ["collision", "collusion", "collation"], reponse: 1, n: 3, explication: "Entente secrète → « collusion »." },
    ],
    "nu-prescription-proscription": [
      { q: "Suivre les ___ du médecin.", options: ["proscriptions", "prescriptions", "descriptions"], reponse: 1, n: 2, explication: "Recommandations → « prescriptions »." },
      { q: "La ___ de certains mots.", options: ["prescription", "proscription", "description"], reponse: 1, n: 3, explication: "Interdiction → « proscription »." },
    ],
    "nu-affluence-influence": [
      { q: "Les heures d'___.", options: ["influence", "affluence", "confluence"], reponse: 1, n: 2, explication: "Grande foule → « affluence »." },
      { q: "Avoir de l'___ sur ses proches.", options: ["affluence", "influence", "confluence"], reponse: 1, n: 2, explication: "Ascendant → « influence »." },
    ],

    /* ---------- Nouveaux accords ---------- */
    "acc-meme": [
      { q: "Ils ont fait les ___ erreurs.", options: ["même", "mêmes", "mémes"], reponse: 1, n: 2, explication: "Adjectif → accord avec « erreurs »." },
      { q: "___ les experts se trompent.", options: ["Mêmes", "Même", "Mème"], reponse: 1, n: 3, explication: "Adverbe (= y compris) → invariable." },
    ],
    "acc-possible": [
      { q: "Toutes les solutions ___.", options: ["possible", "possibles", "possibless"], reponse: 1, n: 2, explication: "Adjectif → accord avec « solutions »." },
      { q: "Réunissez le plus de documents ___.", options: ["possibles", "possible", "possiblent"], reponse: 1, n: 3, explication: "« le plus de … possible » → invariable." },
    ],
    "acc-sujets-ou-ni": [
      { q: "Ni l'un ni l'autre ne ___ venus.", options: ["est", "sont", "es"], reponse: 1, n: 2, explication: "Les deux concernés → pluriel." },
      { q: "Pierre ou Paul ___ élu président. (un seul)", options: ["seront", "sera", "serons"], reponse: 1, n: 3, explication: "Un seul peut l'être → singulier." },
    ],

    /* ---------- Nouveaux mauvais usages ---------- */
    "mu-au-niveau": [
      { q: "Quelle formulation est préférable ?", options: ["Au niveau du budget, c'est tendu.", "Concernant le budget, c'est tendu.", "Au niveau budget, c'est tendu."], reponse: 1, n: 2, explication: "« au niveau de » = hauteur ; sinon « concernant »." },
    ],
    "mu-suite-a": [
      { q: "Dans une lettre soignée :", options: ["Suite à votre courrier,", "À la suite de votre courrier,", "Suite votre courrier,"], reponse: 1, n: 2, explication: "Préférer « à la suite de » ou « en réponse à »." },
    ],
    "mu-je-mexcuse": [
      { q: "Formulation correcte :", options: ["Je m'excuse.", "Je vous prie de m'excuser.", "Je m'excuse à vous."], reponse: 1, n: 2, explication: "On demande à autrui de nous excuser." },
    ],
    "mu-attention-intention": [
      { q: "Note ___ du directeur (destinataire).", options: ["à l'intention", "à l'attention", "à l'attension"], reponse: 1, n: 3, explication: "Destinataire d'un courrier → « à l'attention »." },
      { q: "Une fête ___ des enfants (pour eux).", options: ["à l'attention", "à l'intention", "à l'intension"], reponse: 1, n: 3, explication: "En faveur de → « à l'intention »." },
    ],

    /* ---------- Nouvelles notions de grammaire ---------- */
    "gr-types-phrases": [
      { q: "« Viens-tu ? » est une phrase…", options: ["déclarative", "interrogative", "impérative"], reponse: 1, n: 1, explication: "Elle pose une question → interrogative." },
      { q: "« Quelle chance ! » est une phrase…", options: ["exclamative", "déclarative", "interrogative"], reponse: 0, n: 2, explication: "Elle exprime une émotion → exclamative." },
    ],
    "gr-complement-agent": [
      { q: "« Il est aimé de tous. » « de tous » est…", options: ["un COD", "un complément d'agent", "un CC"], reponse: 1, n: 3, explication: "Auteur de l'action au passif → complément d'agent." },
    ],
    "gr-apposition": [
      { q: "« Paris, capitale de la France, brille. » « capitale de la France » est…", options: ["une apposition", "un COD", "un CC"], reponse: 0, n: 3, explication: "Renomme le nom, détachée par virgules → apposition." },
    ],

    /* ---------- Ajouts (vague 3) ---------- */
    "conf-peut-etre": [
      { q: "Il viendra ___ demain.", options: ["peut être", "peut-être", "peut-etre"], reponse: 1, n: 1, explication: "= probablement → « peut-être » (trait d'union)." },
      { q: "Ce plan ___ amélioré.", options: ["peut-être", "peut être", "peut-etre"], reponse: 1, n: 2, explication: "= il peut être → « peut être » (verbe)." },
    ],
    "conf-tache": [
      { q: "Une ___ de café sur la nappe.", options: ["tâche", "tache", "tâches"], reponse: 1, n: 1, explication: "Une salissure → « tache » (sans accent)." },
      { q: "J'ai une ___ à finir ce soir.", options: ["tache", "tâche", "taches"], reponse: 1, n: 2, explication: "Un travail → « tâche » (accent circonflexe)." },
    ],
    "nu-evoquer-invoquer": [
      { q: "Il a ___ des souvenirs d'enfance.", options: ["invoqué", "évoqué", "provoqué"], reponse: 1, n: 2, explication: "Rappeler, mentionner → « évoquer »." },
      { q: "Il ___ la légitime défense.", options: ["évoque", "invoque", "provoque"], reponse: 1, n: 3, explication: "Citer comme argument → « invoquer »." },
    ],
    "nu-inclinaison-inclination": [
      { q: "L'___ du toit.", options: ["inclination", "inclinaison", "déclinaison"], reponse: 1, n: 2, explication: "Angle, pente → « inclinaison »." },
      { q: "Une ___ naturelle pour la musique.", options: ["inclinaison", "inclination", "déclinaison"], reponse: 1, n: 3, explication: "Penchant, goût → « inclination »." },
    ],
    "acc-adj-composes": [
      { q: "Des enfants ___.", options: ["sourd-muets", "sourds-muets", "sourds-muet"], reponse: 1, n: 3, explication: "Deux adjectifs → les deux s'accordent." },
      { q: "Des ___.", options: ["nouveaux-nés", "nouveau-nés", "nouveau-né"], reponse: 1, n: 3, explication: "« nouveau » = nouvellement (invariable) ; « né » s'accorde." },
    ],
    "gr-conjonctions": [
      { q: "« mais » est une conjonction de…", options: ["subordination", "coordination", "juxtaposition"], reponse: 1, n: 1, explication: "mais/ou/et/donc/or/ni/car → coordination." },
      { q: "« lorsque » est une conjonction de…", options: ["coordination", "subordination", "juxtaposition"], reponse: 1, n: 2, explication: "Introduit une subordonnée → subordination." },
    ],
    "mu-en-termes": [
      { q: "Orthographe correcte :", options: ["en terme de qualité", "en termes de qualité", "en therme de qualité"], reponse: 1, n: 2, explication: "Toujours au pluriel : « en termes de »." },
    ],
    "conj-t-euphonique": [
      { q: "Où ___ ?", options: ["va-il", "va-t-il", "vat-il"], reponse: 1, n: 1, explication: "Deux voyelles → -t- euphonique : « va-t-il »." },
      { q: "Que ___ ?", options: ["mange-t-on", "mange-on", "manget-on"], reponse: 0, n: 2, explication: "« mange » finit par une voyelle → « mange-t-on »." },
    ],

    /* ---------- Ajouts vérifiés (vague 4) ---------- */
    "conf-ni-ny": [
      { q: "Il n'a ni faim ___ soif.", options: ["n'y", "ni", "nie"], reponse: 1, n: 1, explication: "Coordination négative → « ni »." },
      { q: "Il ___ pense jamais.", options: ["ni", "n'y", "nie"], reponse: 1, n: 2, explication: "« ne + y » → « n'y »." },
    ],
    "conf-si-sy": [
      { q: "___ tu veux, viens.", options: ["S'y", "Si", "Ci"], reponse: 1, n: 1, explication: "Condition → « si »." },
      { q: "Il ___ attendait.", options: ["si", "s'y", "ci"], reponse: 1, n: 2, explication: "« se + y » → « s'y »." },
    ],
    "conf-sa-ca": [
      { q: "___ voiture est neuve.", options: ["Ça", "Sa", "Çà"], reponse: 1, n: 1, explication: "Possessif (= ma) → « sa »." },
      { q: "___ me plaît beaucoup.", options: ["Sa", "Ça", "Çà"], reponse: 1, n: 1, explication: "= cela → « ça »." },
      { q: "Des papiers traînaient ___ et là.", options: ["sa", "ça", "çà"], reponse: 2, n: 3, explication: "Locution « çà et là » → « çà » (accent grave)." },
    ],
    "conf-on-onn": [
      { q: "___ gagné le match !", options: ["On n'a", "On a", "Ont a"], reponse: 1, n: 1, explication: "Forme affirmative → « on a »." },
      { q: "___ rien compris à l'énoncé.", options: ["On a", "On n'a", "On-a"], reponse: 1, n: 2, explication: "Négation (rien) → « on n'a »." },
    ],
    "conj-trois-groupes": [
      { q: "« finir » appartient au…", options: ["1er groupe", "2e groupe", "3e groupe"], reponse: 1, n: 1, explication: "-ir + participe « finissant » → 2e groupe." },
      { q: "« partir » appartient au…", options: ["2e groupe", "3e groupe", "1er groupe"], reponse: 1, n: 2, explication: "-ir sans -issant (partant) → 3e groupe." },
      { q: "« aller » appartient au…", options: ["1er groupe", "3e groupe", "2e groupe"], reponse: 1, n: 3, explication: "Verbe irrégulier → 3e groupe (malgré -er)." },
    ],
    "conj-imparfait-terminaisons": [
      { q: "Nous ___ (chanter, imparfait).", options: ["chantons", "chantions", "chanterons"], reponse: 1, n: 1, explication: "Imparfait « nous » → -ions." },
      { q: "Il ___ (croire, imparfait).", options: ["croiyait", "croyait", "croiait"], reponse: 1, n: 3, explication: "Radical « croy- » + -ait → « croyait »." },
    ],
    "gr-pronoms-personnels": [
      { q: "Dans « Je le vois », « le » est un pronom…", options: ["sujet", "complément (COD)", "possessif"], reponse: 1, n: 1, explication: "Remplace le COD → pronom complément." },
      { q: "Dans « Je lui parle », « lui » est…", options: ["un COD", "un COI", "un sujet"], reponse: 1, n: 2, explication: "« parler à » → complément indirect." },
    ],
    "gr-adverbe": [
      { q: "Dans « Il court vite », « vite » est…", options: ["un adjectif", "un adverbe", "un nom"], reponse: 1, n: 1, explication: "Modifie le verbe, invariable → adverbe." },
      { q: "L'adverbe est un mot…", options: ["variable", "invariable", "toujours en -ment"], reponse: 1, n: 2, explication: "L'adverbe est invariable." },
    ],
    "nu-comprehensif-comprehensible": [
      { q: "Un professeur ___ envers ses élèves.", options: ["compréhensible", "compréhensif", "compréhensé"], reponse: 1, n: 2, explication: "Indulgent (personne) → « compréhensif »." },
      { q: "Une explication ___.", options: ["compréhensive", "compréhensible", "compréhense"], reponse: 1, n: 2, explication: "Qu'on peut comprendre → « compréhensible »." },
    ],
    "nu-original-originel": [
      { q: "Le péché ___.", options: ["original", "originel", "originaire"], reponse: 1, n: 2, explication: "Qui date de l'origine → « originel »." },
      { q: "Une idée ___.", options: ["originelle", "originale", "originaire"], reponse: 1, n: 2, explication: "Neuve, singulière → « originale »." },
    ],
    "nu-habilete-habilite": [
      { q: "L'___ d'un artisan.", options: ["habilité", "habileté", "habiletée"], reponse: 1, n: 2, explication: "Adresse, savoir-faire → « habileté »." },
      { q: "L'___ légale à signer l'acte.", options: ["habileté", "habilité", "habiletée"], reponse: 1, n: 3, explication: "Capacité juridique → « habilité »." },
    ],

    /* ---------- Ajouts vérifiés (vague 5) ---------- */
    "conf-cense-sense": [
      { q: "Nul n'est ___ ignorer la loi.", options: ["sensé", "censé", "sancé"], reponse: 1, n: 2, explication: "= supposé → « censé »." },
      { q: "Une décision ___.", options: ["censée", "sensée", "sencée"], reponse: 1, n: 2, explication: "= pleine de bon sens → « sensée »." },
    ],
    "conf-differend-different": [
      { q: "Ils ont réglé leur ___.", options: ["différent", "différend", "différant"], reponse: 1, n: 2, explication: "Un désaccord (nom) → « différend »." },
      { q: "Nous avons des goûts ___.", options: ["différends", "différents", "différant"], reponse: 1, n: 2, explication: "Adjectif → « différents »." },
    ],
    "conf-amande-amende": [
      { q: "Payer une ___ pour excès de vitesse.", options: ["amande", "amende", "emande"], reponse: 1, n: 1, explication: "Sanction financière → « amende »." },
      { q: "Un gâteau aux ___.", options: ["amendes", "amandes", "amantes"], reponse: 1, n: 1, explication: "Le fruit → « amande »." },
    ],
    "conf-balade-ballade": [
      { q: "Une ___ en forêt.", options: ["ballade", "balade", "ballades"], reponse: 1, n: 1, explication: "Une promenade → « balade »." },
      { q: "Une ___ de Chopin.", options: ["balade", "ballade", "balades"], reponse: 1, n: 2, explication: "Un poème / une pièce musicale → « ballade »." },
    ],
    "conf-dans-den": [
      { q: "Il est ___ le jardin.", options: ["d'en", "dans", "dent"], reponse: 1, n: 1, explication: "Préposition de lieu → « dans »." },
      { q: "Le plaisir ___ parler.", options: ["dans", "d'en", "dent"], reponse: 1, n: 2, explication: "« de + en » → « d'en »." },
    ],
    "mu-aeroport": [
      { q: "Orthographe correcte :", options: ["aréoport", "aéroport", "aérioport"], reponse: 1, n: 1, explication: "« aéro- » (air) → « aéroport »." },
    ],
    "mu-dilemme": [
      { q: "Orthographe correcte :", options: ["dilemne", "dilemme", "dilème"], reponse: 1, n: 2, explication: "Deux « m » → « dilemme »." },
    ],
    "mu-remunerer": [
      { q: "Orthographe correcte :", options: ["rénumérer", "rémunérer", "rénumaire"], reponse: 1, n: 2, explication: "De « munus » (rétribution) → « rémunérer »." },
    ],
    "mu-obnubiler": [
      { q: "Orthographe correcte :", options: ["obnibuler", "obnubiler", "omnibuler"], reponse: 1, n: 2, explication: "« -nu- » comme « nuage » → « obnubiler »." },
    ],
    "acc-ci-joint": [
      { q: "___ les documents demandés.", options: ["Ci-joints", "Ci-joint", "Ci-jointe"], reponse: 1, n: 2, explication: "En tête de phrase → invariable." },
      { q: "Veuillez consulter les pièces ___.", options: ["ci-joint", "ci-jointes", "ci-joints"], reponse: 1, n: 3, explication: "Après le nom (pièces, fém. pl.) → accord." },
    ],
    "acc-pp-infinitif": [
      { q: "Les choristes que j'ai ___ chanter.", options: ["entendu", "entendus", "entendues"], reponse: 1, n: 3, explication: "Les choristes font l'action de chanter → accord." },
      { q: "Les chansons que j'ai ___ chanter.", options: ["entendues", "entendu", "entendus"], reponse: 1, n: 3, explication: "Les chansons ne chantent pas → invariable." },
    ],
    "gr-prepositions": [
      { q: "Lequel est une préposition ?", options: ["rapidement", "sans", "mais"], reponse: 1, n: 1, explication: "« sans » introduit un complément → préposition." },
      { q: "« Il part pour Paris. » « pour » est…", options: ["un adverbe", "une préposition", "une conjonction"], reponse: 1, n: 2, explication: "Relie le verbe à son complément → préposition." },
    ],
    "gr-complement-du-nom": [
      { q: "« une tasse à café » : « à café » est…", options: ["un COD", "un complément du nom", "un adjectif"], reponse: 1, n: 2, explication: "Introduit par « à », il complète le nom « tasse »." },
      { q: "« le livre de Marie » : « de Marie » est…", options: ["un complément du nom", "un COI", "un attribut"], reponse: 0, n: 2, explication: "Précise le nom « livre » → complément du nom." },
    ],
    "gr-degres-adjectif": [
      { q: "« plus grand que » exprime…", options: ["un superlatif", "un comparatif", "un attribut"], reponse: 1, n: 1, explication: "Comparaison entre deux → comparatif." },
      { q: "« le plus grand » exprime…", options: ["un comparatif", "un superlatif", "une apposition"], reponse: 1, n: 2, explication: "Degré extrême → superlatif." },
    ],
    "conj-passe-compose": [
      { q: "Le passé composé se forme avec…", options: ["l'auxiliaire à l'imparfait + participe", "l'auxiliaire au présent + participe passé", "le radical + terminaisons"], reponse: 1, n: 1, explication: "Auxiliaire (avoir/être) au présent + participe passé." },
      { q: "« Nous ___ mangé. »", options: ["avions", "avons", "aurons"], reponse: 1, n: 1, explication: "Passé composé → auxiliaire au présent : « avons mangé »." },
    ],
    "conj-futur-terminaisons": [
      { q: "« Ils ___ (chanter) demain. »", options: ["chanteront", "chanteraient", "chantèrent"], reponse: 0, n: 1, explication: "Futur, ils → -ront : « chanteront »." },
      { q: "Terminaison du futur à la 1re personne du singulier :", options: ["-rais", "-rai", "-ra"], reponse: 1, n: 2, explication: "Futur je → -rai (sans s)." },
    ],

    /* ---------- Accords : complément ---------- */
    "acc-pluriel-noms": [
      { q: "un journal → des ___.", options: ["journals", "journaux", "journeaux"], reponse: 1, n: 1, explication: "-al → -aux." },
      { q: "un genou → des ___.", options: ["genous", "genoux", "genouds"], reponse: 1, n: 2, explication: "Exception en -x (bijou, caillou, chou, genou, hibou, joujou, pou)." },
      { q: "un détail → des ___.", options: ["détaux", "détails", "détailles"], reponse: 1, n: 3, explication: "« détail » suit la règle générale (+s), contrairement à travail → travaux." },
    ],
    "acc-noms-composes": [
      { q: "un chou-fleur → des ___.", options: ["chou-fleurs", "choux-fleurs", "choux-fleur"], reponse: 1, n: 2, explication: "Nom + nom → les deux s'accordent." },
      { q: "un tire-bouchon → des ___.", options: ["tires-bouchons", "tire-bouchons", "tire-bouchon"], reponse: 1, n: 2, explication: "Verbe (invariable) + nom → « tire-bouchons »." },
      { q: "un porte-monnaie → des ___.", options: ["portes-monnaies", "porte-monnaie", "porte-monnaies"], reponse: 1, n: 3, explication: "Verbe invariable + « monnaie » (concept) → invariable." },
    ],
    "acc-tel": [
      { q: "Des arbres ___ que le chêne.", options: ["tel", "tels", "telles"], reponse: 1, n: 2, explication: "« tel que » s'accorde avec « arbres » (masc. pl.) qui précède." },
      { q: "Elle bondit, ___ une gazelle.", options: ["telle", "tel", "tels"], reponse: 0, n: 3, explication: "« tel » (sans que) s'accorde avec « gazelle » qui suit → telle." },
    ],
    "acc-participe-present": [
      { q: "Des enfants ___ à leurs parents. (qui obéissent)", options: ["obéissants", "obéissant", "obéissent"], reponse: 1, n: 3, explication: "Participe présent (+ complément) → invariable." },
      { q: "Des élèves ___. (dociles)", options: ["obéissant", "obéissants", "obéissent"], reponse: 1, n: 2, explication: "Adjectif verbal (qualité) → accord." },
      { q: "Adjectif verbal de « fatiguer » :", options: ["fatiguant", "fatigant", "fatigants"], reponse: 1, n: 2, explication: "Adjectif : « fatigant » (le participe présent est « fatiguant »)." },
    ],
    "acc-aucun-nul": [
      { q: "___ élève n'était absent.", options: ["Aucuns", "Aucun", "Aucune"], reponse: 1, n: 1, explication: "Singulier par défaut → « aucun »." },
      { q: "Il n'a engagé ___ frais.", options: ["aucun", "aucuns", "aucune"], reponse: 1, n: 3, explication: "« frais » n'a pas de singulier → « aucuns »." },
    ],
    "acc-avoir-lair": [
      { q: "La salade a l'air ___.", options: ["bon", "bonne", "bons"], reponse: 1, n: 1, explication: "Sujet-chose → accord avec le sujet « salade »." },
      { q: "Ces suggestions ont l'air ___.", options: ["intéressant", "intéressantes", "intéressants"], reponse: 1, n: 2, explication: "Accord avec le sujet « suggestions » (fém. pl.)." },
      { q: "Elle avait l'air ___ et troublé. (complément sur « air »)", options: ["inquiète", "inquiet", "inquiets"], reponse: 1, n: 3, explication: "Adjectif + complément rattaché à « air » → accord obligatoire avec « air » (masc. sing.)." },
    ],
    "acc-adj-adverbe": [
      { q: "Ces fleurs sentent ___.", options: ["bonnes", "bon", "bons"], reponse: 1, n: 1, explication: "Modifie le verbe « sentent » → adverbe invariable." },
      { q: "Ces voitures sont ___.", options: ["cher", "chères", "chèrent"], reponse: 1, n: 2, explication: "« chères » est ici attribut du sujet (adjectif) → accord." },
      { q: "Ces voitures ___ cher.", options: ["coûtent", "coûtes", "coûtons"], reponse: 0, n: 2, explication: "« cher » reste invariable, modifie le verbe « coûtent »." },
    ],

    /* ---------- Confusions : complément (vague 6) ---------- */
    "conf-mes-mais": [
      { q: "___ amis arrivent demain.", options: ["Mais", "Mes", "Met"], reponse: 1, n: 1, explication: "Déterminant possessif devant un nom pluriel → « mes »." },
      { q: "Il pleut ___ je sors quand même.", options: ["mes", "mais", "met"], reponse: 1, n: 1, explication: "Opposition → « mais »." },
      { q: "Un ___ raffiné.", options: ["mais", "mes", "mets"], reponse: 2, n: 2, explication: "Un plat → « mets » (nom)." },
    ],
    "conf-cet-sept": [
      { q: "___ arbre est immense.", options: ["Cette", "Cet", "Sept"], reponse: 1, n: 1, explication: "Masculin singulier devant voyelle → « cet »." },
      { q: "Il y a ___ jours dans la semaine.", options: ["cet", "cette", "sept"], reponse: 2, n: 1, explication: "Le nombre 7 → « sept »." },
    ],
    "conf-foi-fois-foie": [
      { q: "Une ___, il neigea en été.", options: ["foi", "fois", "foie"], reponse: 1, n: 1, explication: "Occurrence → « fois »." },
      { q: "Le ___ filtre le sang.", options: ["foi", "fois", "foie"], reponse: 2, n: 2, explication: "L'organe → « foie » (masculin)." },
      { q: "Avoir ___ en quelqu'un.", options: ["foie", "fois", "foi"], reponse: 2, n: 2, explication: "La confiance → « foi »." },
    ],
    "conf-cour-cours-court": [
      { q: "Les enfants jouent dans la ___.", options: ["cours", "cour", "court"], reponse: 1, n: 1, explication: "Espace extérieur → « cour »." },
      { q: "Un texte ___.", options: ["cour", "cours", "court"], reponse: 2, n: 2, explication: "Adjectif (peu long) → « court »." },
      { q: "Je ___ tous les matins.", options: ["cour", "cours", "court"], reponse: 1, n: 2, explication: "Verbe courir, je → « cours »." },
    ],
    "conf-mere-maire-mer": [
      { q: "Ma ___ m'attend à la maison.", options: ["mer", "mère", "maire"], reponse: 1, n: 1, explication: "La maman → « mère »." },
      { q: "Le ___ inaugure la mairie.", options: ["mère", "mer", "maire"], reponse: 2, n: 1, explication: "Premier élu de la commune → « maire »." },
    ],
    "conf-vert-vers-ver-verre": [
      { q: "Un pull ___.", options: ["vers", "vert", "verre"], reponse: 1, n: 1, explication: "La couleur → « vert »." },
      { q: "Il marche ___ la sortie.", options: ["vert", "vers", "ver"], reponse: 1, n: 1, explication: "En direction de → « vers »." },
      { q: "Un ___ d'eau.", options: ["vert", "vers", "verre"], reponse: 2, n: 2, explication: "Le récipient → « verre »." },
    ],
    "conf-sain-sein-saint": [
      { q: "Un mode de vie ___.", options: ["sein", "sain", "saint"], reponse: 1, n: 1, explication: "En bonne santé → « sain »." },
      { q: "Au ___ de l'entreprise.", options: ["sain", "sein", "saint"], reponse: 1, n: 2, explication: "= à l'intérieur de → « sein »." },
    ],
    "conf-compte-comte-conte": [
      { q: "Il ___ les points.", options: ["comte", "compte", "conte"], reponse: 1, n: 1, explication: "Verbe compter, il → « compte »." },
      { q: "Un ___ de fées.", options: ["compte", "comte", "conte"], reponse: 2, n: 1, explication: "Un récit merveilleux → « conte »." },
      { q: "Le ___ et la comtesse.", options: ["conte", "compte", "comte"], reponse: 2, n: 2, explication: "Titre de noblesse → « comte »." },
    ],
    "conf-tant-temps-ten": [
      { q: "Il a ___ travaillé.", options: ["temps", "tant", "t'en"], reponse: 1, n: 1, explication: "= tellement → « tant »." },
      { q: "Le ___ passe vite.", options: ["tant", "temps", "t'en"], reponse: 1, n: 1, explication: "La durée → « temps »." },
      { q: "Tu ___ souviens ?", options: ["tant", "temps", "t'en"], reponse: 2, n: 2, explication: "« te + en » devant le verbe → « t'en »." },
    ],
    "conf-dessein-dessin": [
      { q: "Il nourrissait de sombres ___.", options: ["dessins", "desseins", "dessains"], reponse: 1, n: 2, explication: "Des intentions → « desseins »." },
      { q: "Faire un ___ au crayon.", options: ["dessein", "dessin", "dessain"], reponse: 1, n: 1, explication: "Une image tracée → « dessin »." },
    ],
    "conf-chair-chaire-cher": [
      { q: "Le prêtre monte en ___.", options: ["chair", "chaire", "cher"], reponse: 1, n: 2, explication: "Tribune → « chaire »." },
      { q: "La ___ du fruit est juteuse.", options: ["chaire", "chair", "cher"], reponse: 1, n: 2, explication: "La pulpe/matière → « chair »." },
    ],
    "conf-resonner-raisonner": [
      { q: "Ses pas ___ dans le couloir.", options: ["raisonnaient", "résonnaient", "résonnait"], reponse: 1, n: 2, explication: "Le son qui se prolonge → « résonner »." },
      { q: "Il faut ___ avant d'agir.", options: ["résonner", "raisonner", "résonnez"], reponse: 1, n: 2, explication: "Penser logiquement → « raisonner »." },
    ],

    /* ---------- Grammaire : complément (vague 2) ---------- */
    "gr-nom": [
      { q: "« Paris » est un nom…", options: ["commun", "propre", "abstrait"], reponse: 1, n: 1, explication: "Désigne un lieu unique, majuscule → nom propre." },
      { q: "« le courage » est un nom…", options: ["concret", "abstrait", "propre"], reponse: 1, n: 2, explication: "Une idée, non perceptible → nom abstrait." },
    ],
    "gr-pronoms-demonstratifs-possessifs": [
      { q: "« Ta valise est plus lourde que la mienne. » « la mienne » est un pronom…", options: ["démonstratif", "possessif", "personnel"], reponse: 1, n: 2, explication: "Indique l'appartenance → pronom possessif." },
      { q: "« Prends celui-ci. » « celui-ci » est un pronom…", options: ["possessif", "démonstratif", "personnel"], reponse: 1, n: 1, explication: "Montre → pronom démonstratif." },
    ],
    "gr-subordonnee-completive": [
      { q: "« Je pense que tu as raison. » La subordonnée est…", options: ["une relative", "une complétive", "une circonstancielle"], reponse: 1, n: 2, explication: "COD du verbe « pense », sans antécédent → complétive." },
      { q: "On peut remplacer une complétive par…", options: ["« cela »", "un adjectif", "rien, jamais"], reponse: 0, n: 2, explication: "« Je pense cela » → confirme le rôle de COD." },
    ],
    "gr-subordonnees-circonstancielles": [
      { q: "« Bien qu'il pleuve, nous sortons. » exprime…", options: ["la cause", "la concession", "le but"], reponse: 1, n: 2, explication: "« bien que » → opposition/concession." },
      { q: "« Il sortit dès qu'il eut fini. » exprime…", options: ["le temps", "la conséquence", "la condition"], reponse: 0, n: 2, explication: "« dès que » → circonstancielle de temps." },
      { q: "« Parce qu'il pleuvait » exprime…", options: ["la conséquence", "la cause", "le but"], reponse: 1, n: 1, explication: "« parce que » → cause." },
    ],
    "gr-discours-direct-indirect": [
      { q: "« Il a dit : \"Je viendrai.\" » est au discours…", options: ["indirect", "direct", "complétif"], reponse: 1, n: 1, explication: "Guillemets, paroles exactes → discours direct." },
      { q: "« Il a dit qu'il viendrait. » est au discours…", options: ["direct", "indirect", "complétif"], reponse: 1, n: 2, explication: "Intégré dans une subordonnée, sans guillemets → discours indirect." },
    ],
    "gr-ponctuation": [
      { q: "Quel signe annonce une explication ou une énumération ?", options: ["la virgule", "les deux-points", "le point-virgule"], reponse: 1, n: 1, explication: "Les deux-points annoncent une explication/citation/énumération." },
      { q: "Le point-virgule sert à…", options: ["terminer une phrase", "relier deux idées proches", "séparer des chiffres"], reponse: 1, n: 2, explication: "Il relie deux propositions complètes et liées par le sens." },
    ],

    /* ---------- Mauvais usages : complément (vague 2) ---------- */
    "mu-infarctus": [
      { q: "Orthographe correcte :", options: ["infractus", "infarctus", "infartus"], reponse: 1, n: 1, explication: "Vient de « farci » → « infarctus »." },
    ],
    "mu-digression": [
      { q: "Orthographe correcte :", options: ["disgression", "digression", "distgression"], reponse: 1, n: 2, explication: "« di- » (s'éloigner) sans s → « digression »." },
    ],
    "mu-solutionner": [
      { q: "L'Académie française recommande :", options: ["Solutionner le problème.", "Résoudre le problème.", "Solutionner problème."], reponse: 1, n: 2, explication: "« résoudre » est préféré à « solutionner »." },
    ],
    "mu-au-temps-pour-moi": [
      { q: "Forme retenue par l'Académie française :", options: ["Autant pour moi.", "Au temps pour moi.", "Autant que pour moi."], reponse: 1, n: 3, explication: "Conforme à l'étymologie militaire (« au temps »)." },
    ],
  };
})();
