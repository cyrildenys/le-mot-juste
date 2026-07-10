/* =====================================================================
   Le Mot Juste — Vocabulaire : nuances entre mots proches
   Schéma : { id, titre, cle (la clé pour choisir), entrees:[{mot, sens, exemple}] }
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};

  LMJ.data.nuances = [
    {
      id: "nu-amener",
      titre: "Amener · Apporter · Emmener · Emporter",
      cle: "amener/emmener → êtres animés ; apporter/emporter → choses. am-/ap- → vers ici ; em- → au loin.",
      entrees: [
        { mot: "amener", sens: "conduire une personne (ou un animal) vers un lieu", exemple: "Amène ton frère à la fête." },
        { mot: "emmener", sens: "conduire une personne avec soi en partant", exemple: "Je t'emmène au cinéma." },
        { mot: "apporter", sens: "porter une chose vers un lieu", exemple: "Apporte le dessert." },
        { mot: "emporter", sens: "prendre une chose avec soi en partant", exemple: "N'oublie pas d'emporter ton parapluie." },
      ],
    },
    {
      id: "nu-an-annee",
      titre: "An · Année (et jour/journée, soir/soirée)",
      cle: "La forme courte compte l'unité ; la forme longue insiste sur la durée vécue, remplie.",
      entrees: [
        { mot: "an", sens: "l'unité de temps, le point sur le calendrier", exemple: "Il a trente ans." },
        { mot: "année", sens: "la durée envisagée dans son déroulement", exemple: "Une année riche en événements." },
        { mot: "jour / journée", sens: "même distinction : le point vs la durée", exemple: "Toute la journée / il y a trois jours." },
      ],
    },
    {
      id: "nu-second-deuxieme",
      titre: "Second · Deuxième",
      cle: "Puriste : « second » quand la série s'arrête à deux ; « deuxième » quand elle continue.",
      entrees: [
        { mot: "second", sens: "il n'y a que deux éléments (pas de troisième)", exemple: "La Seconde Guerre mondiale (usage consacré)." },
        { mot: "deuxième", sens: "la série comporte plus de deux éléments", exemple: "Le deuxième étage sur cinq." },
      ],
    },
    {
      id: "nu-eminent-imminent",
      titre: "Éminent · Imminent",
      cle: "Éminent = remarquable ; imminent = sur le point d'arriver.",
      entrees: [
        { mot: "éminent", sens: "qui se distingue par sa valeur, supérieur", exemple: "Un éminent professeur." },
        { mot: "imminent", sens: "qui va se produire d'un instant à l'autre", exemple: "Un danger imminent." },
      ],
    },
    {
      id: "nu-conjecture",
      titre: "Conjecture · Conjoncture",
      cle: "Conjecture = supposition ; conjoncture = situation du moment.",
      entrees: [
        { mot: "conjecture", sens: "une hypothèse, une opinion fondée sur des probabilités", exemple: "Se perdre en conjectures." },
        { mot: "conjoncture", sens: "l'ensemble des circonstances, le contexte", exemple: "La conjoncture économique." },
      ],
    },
    {
      id: "nu-prodige-prodigue",
      titre: "Prodige · Prodigue",
      cle: "Prodige = merveille/génie ; prodigue = qui dépense sans compter.",
      entrees: [
        { mot: "prodige", sens: "un fait extraordinaire, ou un talent exceptionnel", exemple: "Un enfant prodige." },
        { mot: "prodigue", sens: "qui donne ou dépense avec excès", exemple: "Le fils prodigue." },
      ],
    },
    {
      id: "nu-officiel-officieux",
      titre: "Officiel · Officieux",
      cle: "Officiel = confirmé par l'autorité ; officieux = connu mais non confirmé.",
      entrees: [
        { mot: "officiel", sens: "émanant d'une autorité, publiquement reconnu", exemple: "Le résultat officiel." },
        { mot: "officieux", sens: "non officiel, à titre confidentiel", exemple: "Une source officieuse." },
      ],
    },
    {
      id: "nu-notable-notoire",
      titre: "Notable · Notoire",
      cle: "Notable = digne d'être noté (souvent positif) ; notoire = connu de tous (souvent négatif).",
      entrees: [
        { mot: "notable", sens: "important, remarquable", exemple: "Une amélioration notable." },
        { mot: "notoire", sens: "que tout le monde sait, manifeste", exemple: "Un mensonge notoire." },
      ],
    },
    {
      id: "nu-emigrer-immigrer",
      titre: "Émigrer · Immigrer",
      cle: "É-migrer = sortir de son pays ; Im-migrer = entrer dans un pays.",
      entrees: [
        { mot: "émigrer", sens: "quitter son pays pour s'installer ailleurs", exemple: "Ils ont émigré vers le Canada." },
        { mot: "immigrer", sens: "entrer dans un pays pour s'y établir", exemple: "Sa famille a immigré en France." },
      ],
    },
    {
      id: "nu-partial-partiel",
      titre: "Partial · Partiel",
      cle: "Partial = qui manque d'objectivité ; partiel = incomplet.",
      entrees: [
        { mot: "partial", sens: "qui prend parti, non impartial", exemple: "Un juge partial." },
        { mot: "partiel", sens: "qui ne concerne qu'une partie", exemple: "Un remboursement partiel." },
      ],
    },
    {
      id: "nu-continu-continuel",
      titre: "Continu · Continuel",
      cle: "Continu = sans interruption ; continuel = qui se répète très souvent.",
      entrees: [
        { mot: "continu", sens: "ininterrompu dans le temps", exemple: "Un courant continu." },
        { mot: "continuel", sens: "qui revient sans cesse (avec des reprises)", exemple: "Des interruptions continuelles." },
      ],
    },
    {
      id: "nu-venimeux-veneneux",
      titre: "Venimeux · Vénéneux",
      cle: "Venimeux = qui a du venin (animal) ; vénéneux = qui contient du poison (végétal).",
      entrees: [
        { mot: "venimeux", sens: "qui inocule un venin", exemple: "Un serpent venimeux." },
        { mot: "vénéneux", sens: "toxique quand on l'ingère", exemple: "Un champignon vénéneux." },
      ],
    },
    {
      id: "nu-perpetrer-perpetuer",
      titre: "Perpétrer · Perpétuer",
      cle: "Perpétrer = commettre (un crime) ; perpétuer = faire durer.",
      entrees: [
        { mot: "perpétrer", sens: "accomplir un acte (généralement répréhensible)", exemple: "Perpétrer un attentat." },
        { mot: "perpétuer", sens: "faire durer, transmettre", exemple: "Perpétuer une tradition." },
      ],
    },
    {
      id: "nu-recouvrer-recouvrir",
      titre: "Recouvrer · Recouvrir",
      cle: "Recouvrer = retrouver/récupérer ; recouvrir = couvrir de nouveau.",
      entrees: [
        { mot: "recouvrer", sens: "rentrer en possession de, retrouver", exemple: "Recouvrer la vue, recouvrer une dette." },
        { mot: "recouvrir", sens: "couvrir entièrement", exemple: "La neige recouvre les toits." },
      ],
    },
    {
      id: "nu-effraction-infraction",
      titre: "Effraction · Infraction",
      cle: "Effraction = forcer une entrée ; infraction = violer une règle.",
      entrees: [
        { mot: "effraction", sens: "bris de clôture pour pénétrer quelque part", exemple: "Un vol avec effraction." },
        { mot: "infraction", sens: "violation d'une loi, d'un règlement", exemple: "Une infraction au code de la route." },
      ],
    },
    {
      id: "nu-eruption-irruption",
      titre: "Éruption · Irruption",
      cle: "É-ruption = jaillir hors (volcan, boutons) ; Ir-ruption = entrer soudainement.",
      entrees: [
        { mot: "éruption", sens: "jaillissement (volcan, dents, boutons)", exemple: "Une éruption volcanique." },
        { mot: "irruption", sens: "entrée soudaine et violente", exemple: "Il fit irruption dans la salle." },
      ],
    },
    {
      id: "nu-allusion-illusion",
      titre: "Allusion · Illusion",
      cle: "Allusion = sous-entendu ; illusion = perception ou croyance trompeuse.",
      entrees: [
        { mot: "allusion", sens: "évocation indirecte de quelque chose", exemple: "Faire allusion à un incident." },
        { mot: "illusion", sens: "erreur de perception ou espoir vain", exemple: "Se faire des illusions." },
      ],
    },
    {
      id: "nu-collision-collusion",
      titre: "Collision · Collusion",
      cle: "Collision = choc physique ; collusion = entente secrète frauduleuse.",
      entrees: [
        { mot: "collision", sens: "choc entre deux corps", exemple: "Une collision entre deux voitures." },
        { mot: "collusion", sens: "entente secrète au détriment d'un tiers", exemple: "Une collusion entre concurrents." },
      ],
    },
    {
      id: "nu-prescription-proscription",
      titre: "Prescription · Proscription",
      cle: "Prescrire = recommander/ordonner ; proscrire = interdire.",
      entrees: [
        { mot: "prescription", sens: "ordre, recommandation (notamment médicale)", exemple: "Suivre les prescriptions du médecin." },
        { mot: "proscription", sens: "interdiction, bannissement", exemple: "La proscription de certains termes." },
      ],
    },
    {
      id: "nu-affluence-influence",
      titre: "Affluence · Influence",
      cle: "Affluence = grande foule ; influence = ascendant, pouvoir d'agir sur.",
      entrees: [
        { mot: "affluence", sens: "arrivée d'un grand nombre de personnes", exemple: "Les heures d'affluence." },
        { mot: "influence", sens: "action qu'on exerce sur quelqu'un ou quelque chose", exemple: "Avoir de l'influence sur ses proches." },
      ],
    },
    {
      id: "nu-evoquer-invoquer",
      titre: "Évoquer · Invoquer",
      cle: "Évoquer = rappeler, mentionner ; invoquer = appeler à l'aide ou citer comme argument.",
      entrees: [
        { mot: "évoquer", sens: "faire venir à l'esprit, mentionner", exemple: "Évoquer un souvenir." },
        { mot: "invoquer", sens: "appeler à son secours ; alléguer", exemple: "Invoquer la légitime défense." },
      ],
    },
    {
      id: "nu-inclinaison-inclination",
      titre: "Inclinaison · Inclination",
      cle: "Inclinaison = angle, pente (concret) ; inclination = penchant, goût (moral).",
      entrees: [
        { mot: "inclinaison", sens: "état de ce qui est incliné, angle", exemple: "L'inclinaison du toit." },
        { mot: "inclination", sens: "penchant, disposition naturelle", exemple: "Une inclination pour les arts." },
      ],
    },
    {
      id: "nu-comprehensif-comprehensible",
      titre: "Compréhensif · Compréhensible",
      cle: "Compréhensif se dit d'une personne (indulgente) ; compréhensible d'une chose (qu'on peut comprendre).",
      entrees: [
        { mot: "compréhensif", sens: "qui comprend autrui, indulgent, tolérant", exemple: "Un chef compréhensif." },
        { mot: "compréhensible", sens: "qui peut être compris, clair", exemple: "Une explication compréhensible." },
      ],
    },
    {
      id: "nu-original-originel",
      titre: "Original · Originel",
      cle: "Original = nouveau, singulier ; originel = qui date de l'origine.",
      entrees: [
        { mot: "original", sens: "neuf, inédit, qui ne ressemble à rien d'autre", exemple: "Une idée originale." },
        { mot: "originel", sens: "qui existe depuis l'origine, initial", exemple: "Le péché originel ; le sens originel d'un mot." },
      ],
    },
    {
      id: "nu-habilete-habilite",
      titre: "Habileté · Habilité",
      cle: "Habileté = adresse, savoir-faire ; habilité = aptitude légale, capacité juridique.",
      entrees: [
        { mot: "habileté", sens: "adresse, dextérité, savoir-faire", exemple: "L'habileté d'un artisan." },
        { mot: "habilité", sens: "capacité légale à agir (terme de droit)", exemple: "L'habilité d'un notaire à authentifier un acte." },
      ],
    },
    {
      id: "nu-acception-acceptation",
      titre: "Acception · Acceptation",
      cle: "Acception = sens d'un mot ; acceptation = fait d'accepter.",
      entrees: [
        { mot: "acception", sens: "le sens particulier d'un mot selon le contexte", exemple: "Dans son acception courante, ce mot signifie…" },
        { mot: "acceptation", sens: "le fait d'accepter, de donner son accord", exemple: "L'acceptation du contrat." },
      ],
    },
    {
      id: "nu-adherence-adhesion",
      titre: "Adhérence · Adhésion",
      cle: "Adhérence = état (coller, passif) ; adhésion = acte volontaire d'adhérer.",
      entrees: [
        { mot: "adhérence", sens: "état de ce qui adhère, colle à autre chose", exemple: "L'adhérence des pneus à la route." },
        { mot: "adhésion", sens: "action volontaire de se rallier, d'adhérer à une idée ou un groupe", exemple: "Son adhésion au parti." },
      ],
    },
    {
      id: "nu-eluder-elucider",
      titre: "Éluder · Élucider",
      cle: "Éluder = éviter avec adresse ; élucider = rendre clair, expliquer.",
      entrees: [
        { mot: "éluder", sens: "éviter par adresse, se dérober à", exemple: "Éluder une question gênante." },
        { mot: "élucider", sens: "rendre clair ce qui était obscur", exemple: "Élucider une énigme." },
      ],
    },
    {
      id: "nu-precepteur-percepteur",
      titre: "Précepteur · Percepteur",
      cle: "Précepteur = enseignant privé ; percepteur = fonctionnaire des impôts.",
      entrees: [
        { mot: "précepteur", sens: "éducateur privé engagé par une famille", exemple: "Le précepteur du jeune prince." },
        { mot: "percepteur", sens: "fonctionnaire chargé de recouvrer les impôts", exemple: "Payer ses impôts au percepteur." },
      ],
    },
    {
      id: "nu-decade-decennie",
      titre: "Décade · Décennie",
      cle: "Décade = dix jours (sens propre) ; décennie = dix ans.",
      entrees: [
        { mot: "décade", sens: "période de dix jours ; l'emploi pour dix ans est un anglicisme critiqué", exemple: "Une décade de la Révolution (dix jours)." },
        { mot: "décennie", sens: "période de dix ans", exemple: "La dernière décennie a changé beaucoup de choses." },
      ],
    },
    {
      id: "nu-amnistie-armistice",
      titre: "Amnistie · Armistice",
      cle: "Amnistie = pardon juridique (droit pénal) ; armistice = arrêt des combats (militaire).",
      entrees: [
        { mot: "amnistie", sens: "mesure qui efface une infraction pénale", exemple: "Une loi d'amnistie." },
        { mot: "armistice", sens: "accord qui arrête les hostilités militaires", exemple: "L'armistice de 1918." },
      ],
    },
    {
      id: "nu-avenement-evenement",
      titre: "Avènement · Événement",
      cle: "Avènement = arrivée solennelle (pouvoir, ère) ; événement = fait qui se produit.",
      entrees: [
        { mot: "avènement", sens: "arrivée au pouvoir, début solennel d'une ère", exemple: "L'avènement d'un roi." },
        { mot: "événement", sens: "fait notable qui se produit", exemple: "Un événement inattendu." },
      ],
    },
    {
      id: "nu-justesse-justice",
      titre: "Justesse · Justice",
      cle: "Justesse = exactitude ; justice = équité, institution judiciaire.",
      entrees: [
        { mot: "justesse", sens: "qualité de ce qui est exact, précis", exemple: "La justesse d'un raisonnement." },
        { mot: "justice", sens: "vertu d'équité ; institution qui rend le droit", exemple: "Rendre justice ; aller en justice." },
      ],
    },
    {
      id: "nu-prolongation-prolongement",
      titre: "Prolongation · Prolongement",
      cle: "Prolongation = dans le temps ; prolongement = dans l'espace (ou au figuré : suite).",
      entrees: [
        { mot: "prolongation", sens: "allongement d'une durée", exemple: "La prolongation d'un match." },
        { mot: "prolongement", sens: "extension dans l'espace, ou suite d'une action", exemple: "Le prolongement d'une route ; dans le prolongement de ce projet." },
      ],
    },
    {
      id: "nu-lacune-lagune",
      titre: "Lacune · Lagune",
      cle: "Lacune = manque, vide (abstrait) ; lagune = étendue d'eau côtière.",
      entrees: [
        { mot: "lacune", sens: "manque, vide dans un texte ou des connaissances", exemple: "Combler une lacune en grammaire." },
        { mot: "lagune", sens: "étendue d'eau salée séparée de la mer par un cordon de terre", exemple: "La lagune de Venise." },
      ],
    },
    {
      id: "nu-opportun-importun",
      titre: "Opportun · Importun",
      cle: "Opportun = qui vient au bon moment ; importun = qui dérange.",
      entrees: [
        { mot: "opportun", sens: "qui convient au moment, bienvenu", exemple: "Une remarque opportune." },
        { mot: "importun", sens: "qui dérange, indésirable", exemple: "Un visiteur importun." },
      ],
    },
    {
      id: "nu-consommer-consumer",
      titre: "Consommer · Consumer",
      cle: "Consommer = utiliser, acheter ; consumer = détruire par le feu ou lentement.",
      entrees: [
        { mot: "consommer", sens: "utiliser, acheter, manger/boire", exemple: "Consommer de l'énergie." },
        { mot: "consumer", sens: "détruire progressivement, notamment par le feu", exemple: "Le feu consuma la forêt." },
      ],
    },
  ];
})();
