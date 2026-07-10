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
    {
      id: "conf-sur-sur",
      titre: "sur / sûr",
      entrees: [
        { mot: "sur", nature: "préposition / adjectif", sens: "position (sur la table) ou goût aigre", exemple: "Le livre est sur la table." },
        { mot: "sûr", nature: "adjectif", sens: "= certain (accent circonflexe)", exemple: "Je suis sûr de moi." },
      ],
      astuce: "« sûr » = certain (on peut dire « certain ») → accent circonflexe.",
    },
    {
      id: "conf-du-du",
      titre: "du / dû",
      entrees: [
        { mot: "du", nature: "article contracté", sens: "= de le", exemple: "Je bois du café." },
        { mot: "dû", nature: "participe passé de devoir", sens: "au masculin singulier (accent)", exemple: "Il a dû partir." },
      ],
      astuce: "Le participe « dû » prend un accent (mais « due, dus, dues » n'en prennent pas).",
    },
    {
      id: "conf-notre-notre",
      titre: "notre / nôtre (votre / vôtre)",
      entrees: [
        { mot: "notre / votre", nature: "déterminant possessif", sens: "devant un nom (pas d'accent)", exemple: "Notre maison, votre avis." },
        { mot: "le nôtre / le vôtre", nature: "pronom possessif", sens: "remplace le nom (accent circonflexe)", exemple: "Ce livre est le nôtre." },
      ],
      astuce: "Précédé de « le/la/les » → pronom avec accent : le nôtre, le vôtre.",
    },
    {
      id: "conf-quelque",
      titre: "quelque / quel que",
      entrees: [
        { mot: "quelque(s)", nature: "déterminant", sens: "= plusieurs, un certain (devant un nom)", exemple: "Quelques amis sont venus." },
        { mot: "quel que", nature: "locution", sens: "en deux mots devant le verbe être, s'accorde avec le sujet", exemple: "Quelle que soit ta décision…" },
      ],
      astuce: "Devant « soit » → deux mots : « quel que », accordé (quel, quelle, quels, quelles).",
    },
    {
      id: "conf-sans-sen",
      titre: "sans / s'en / c'en",
      entrees: [
        { mot: "sans", nature: "préposition", sens: "marque l'absence (= sans rien)", exemple: "Il est parti sans manteau." },
        { mot: "s'en", nature: "se + en", sens: "avec un verbe pronominal", exemple: "Il s'en va." },
        { mot: "c'en", nature: "cela + en", sens: "dans « c'en est fait / trop »", exemple: "C'en est trop !" },
      ],
      astuce: "Devant un verbe → « s'en » (il s'en souvient). Absence → « sans ».",
    },
    {
      id: "conf-voie-voix",
      titre: "voie / voix / voit",
      entrees: [
        { mot: "voie", nature: "nom / verbe (voir, subj.)", sens: "un chemin ; ou « qu'il voie »", exemple: "La voie ferrée ; il faut qu'il voie." },
        { mot: "voix", nature: "nom féminin", sens: "le son émis, le vote", exemple: "Une belle voix ; compter les voix." },
        { mot: "voit", nature: "verbe voir (il)", sens: "3e personne du présent", exemple: "Il voit clair." },
      ],
      astuce: "« voix » (le son) est invariable au pluriel : des voix.",
    },
    {
      id: "conf-peut-etre",
      titre: "peut-être / peut être",
      entrees: [
        { mot: "peut-être", nature: "adverbe", sens: "= probablement (avec trait d'union)", exemple: "Il viendra peut-être." },
        { mot: "peut être", nature: "verbe pouvoir + être", sens: "il/elle peut être", exemple: "Ce plan peut être amélioré." },
      ],
      astuce: "Remplaçable par « probablement » → « peut-être » (trait d'union).",
    },
    {
      id: "conf-tache",
      titre: "tache / tâche",
      entrees: [
        { mot: "tache", nature: "nom / verbe (tacher)", sens: "une salissure", exemple: "Une tache de café." },
        { mot: "tâche", nature: "nom / verbe (tâcher)", sens: "un travail à accomplir (accent circonflexe)", exemple: "Une tâche difficile ; tâcher de finir." },
      ],
      astuce: "Un travail → « tâche » (accent), comme « tâcher de ».",
    },
    {
      id: "conf-ni-ny",
      titre: "ni / n'y",
      entrees: [
        { mot: "ni", nature: "conjonction de négation", sens: "coordonne en niant (ni… ni…)", exemple: "Il n'a ni faim ni soif." },
        { mot: "n'y", nature: "ne + y", sens: "négation + pronom « y »", exemple: "Il n'y pense jamais." },
      ],
      astuce: "« n'y » = « ne + y » : on peut compléter par « pas / jamais ».",
    },
    {
      id: "conf-si-sy",
      titre: "si / s'y",
      entrees: [
        { mot: "si", nature: "conjonction / adverbe", sens: "condition (si tu veux) ou intensité (si beau)", exemple: "Si tu viens, préviens-moi." },
        { mot: "s'y", nature: "se + y", sens: "pronom réfléchi + « y »", exemple: "Il s'y attendait." },
      ],
      astuce: "Remplaçable par « je m'y / tu t'y » → « s'y ».",
    },
    {
      id: "conf-sa-ca",
      titre: "sa / ça / çà",
      entrees: [
        { mot: "sa", nature: "déterminant possessif", sens: "= la sienne (devant un nom féminin)", exemple: "Sa voiture est neuve." },
        { mot: "ça", nature: "pronom", sens: "= cela (familier)", exemple: "Ça me plaît." },
        { mot: "çà", nature: "adverbe", sens: "seulement dans « çà et là »", exemple: "Des papiers traînaient çà et là." },
      ],
      astuce: "Possessif → « sa » (= « ma »). « cela » → « ça ».",
    },
    {
      id: "conf-on-onn",
      titre: "on / on n'",
      entrees: [
        { mot: "on a, on est…", nature: "forme affirmative", sens: "pas de négation", exemple: "On a tout compris." },
        { mot: "on n'a, on n'est…", nature: "forme négative", sens: "le « n' » de la négation « ne »", exemple: "On n'a rien compris." },
      ],
      astuce: "Peut-on ajouter « pas / plus / rien / jamais » ? Alors il faut « on n' ».",
    },
    {
      id: "conf-cense-sense",
      titre: "censé / sensé",
      entrees: [
        { mot: "censé", nature: "adjectif", sens: "= supposé, réputé (censé faire qqch)", exemple: "Nul n'est censé ignorer la loi." },
        { mot: "sensé", nature: "adjectif", sens: "= qui a du bon sens, raisonnable", exemple: "Une décision sensée." },
      ],
      astuce: "Remplaçable par « supposé » → « censé ».",
    },
    {
      id: "conf-differend-different",
      titre: "différend / différent",
      entrees: [
        { mot: "différend", nature: "nom masculin", sens: "un désaccord, un litige", exemple: "Régler un différend." },
        { mot: "différent", nature: "adjectif", sens: "qui n'est pas semblable", exemple: "Des avis différents." },
      ],
      astuce: "Un « différend » (nom) = un litige ; « différent » (adjectif) s'accorde.",
    },
    {
      id: "conf-amande-amende",
      titre: "amande / amende",
      entrees: [
        { mot: "amande", nature: "nom féminin", sens: "le fruit de l'amandier", exemple: "Un gâteau aux amandes." },
        { mot: "amende", nature: "nom féminin", sens: "sanction pécuniaire", exemple: "Payer une amende." },
      ],
      astuce: "La sanction → « amende » (comme « amender »).",
    },
    {
      id: "conf-balade-ballade",
      titre: "balade / ballade",
      entrees: [
        { mot: "balade", nature: "nom féminin", sens: "une promenade", exemple: "Une balade en forêt." },
        { mot: "ballade", nature: "nom féminin", sens: "un poème, une pièce musicale", exemple: "Une ballade de Chopin." },
      ],
      astuce: "Deux « l » comme mélodie : la « ballade » est un poème ou une chanson.",
    },
    {
      id: "conf-dans-den",
      titre: "dans / d'en",
      entrees: [
        { mot: "dans", nature: "préposition", sens: "indique le lieu, le temps", exemple: "Il est dans le jardin." },
        { mot: "d'en", nature: "de + en", sens: "préposition « de » + pronom « en »", exemple: "Le plaisir d'en parler." },
      ],
      astuce: "« d'en » = « de + en » : souvent devant un infinitif (d'en rire, d'en sortir).",
    },
    {
      id: "conf-mes-mais",
      titre: "mes / mais / met / mets",
      entrees: [
        { mot: "mes", nature: "déterminant possessif pluriel", sens: "= les miens, les miennes", exemple: "Mes amis arrivent." },
        { mot: "mais", nature: "conjonction", sens: "marque l'opposition", exemple: "Il pleut mais je sors." },
        { mot: "met / mets", nature: "verbe mettre", sens: "il met ; tu mets ; un mets (nom : un plat)", exemple: "Il met la table. Un mets raffiné." },
      ],
      astuce: "« mais » s'oppose (= cependant) ; « mes » précède toujours un nom pluriel.",
    },
    {
      id: "conf-cet-sept",
      titre: "cet / cette / sept",
      entrees: [
        { mot: "cet", nature: "déterminant démonstratif", sens: "devant un nom masculin singulier (voyelle/h muet)", exemple: "Cet arbre est grand." },
        { mot: "cette", nature: "déterminant démonstratif féminin", sens: "devant un nom féminin singulier", exemple: "Cette maison est belle." },
        { mot: "sept", nature: "adjectif numéral", sens: "le nombre 7", exemple: "Sept jours dans la semaine." },
      ],
      astuce: "« sept » est un nombre (invariable) ; « cet/cette » désignent (= celui-ci/celle-ci).",
    },
    {
      id: "conf-foi-fois-foie",
      titre: "foi / fois / foie",
      entrees: [
        { mot: "foi", nature: "nom féminin", sens: "la confiance, la croyance", exemple: "Avoir foi en quelqu'un." },
        { mot: "fois", nature: "nom féminin", sens: "marque la répétition, l'occurrence", exemple: "Une fois, deux fois…" },
        { mot: "foie", nature: "nom masculin", sens: "l'organe du corps", exemple: "Le foie filtre le sang." },
      ],
      astuce: "« foie » (organe) est masculin ; « foi » et « fois » sont féminins.",
    },
    {
      id: "conf-cour-cours-court",
      titre: "cour / cours / court",
      entrees: [
        { mot: "cour", nature: "nom féminin", sens: "espace extérieur, tribunal, entourage royal", exemple: "Jouer dans la cour de récréation." },
        { mot: "cours", nature: "nom masculin / verbe courir", sens: "une leçon, un trajet ; ou « je cours »", exemple: "Un cours de français. Je cours vite." },
        { mot: "court", nature: "adjectif / verbe courir", sens: "peu long ; ou « il court »", exemple: "Un texte court. Il court dans le parc." },
      ],
      astuce: "« court » est aussi un adjectif (contraire de long) ; « cours » ne l'est jamais.",
    },
    {
      id: "conf-mere-maire-mer",
      titre: "mère / maire / mer",
      entrees: [
        { mot: "mère", nature: "nom féminin", sens: "la maman", exemple: "Ma mère m'attend." },
        { mot: "maire", nature: "nom masculin/féminin", sens: "premier élu d'une commune", exemple: "Le maire de la ville." },
        { mot: "mer", nature: "nom féminin", sens: "l'étendue d'eau salée", exemple: "Se baigner dans la mer." },
      ],
      astuce: "« mère » et « maire » ont un accent circonflexe ou non selon leur sens précis ; « mer » n'en a jamais.",
    },
    {
      id: "conf-vert-vers-ver-verre",
      titre: "vert / vers / ver / verre",
      entrees: [
        { mot: "vert", nature: "adjectif", sens: "la couleur", exemple: "Une pomme verte." },
        { mot: "vers", nature: "préposition / nom", sens: "en direction de ; ou une ligne de poème", exemple: "Il va vers la sortie. Un vers de Victor Hugo." },
        { mot: "ver", nature: "nom masculin", sens: "le petit animal (ver de terre)", exemple: "Un ver de terre." },
        { mot: "verre", nature: "nom masculin", sens: "la matière ou le récipient", exemple: "Un verre d'eau." },
      ],
      astuce: "Quatre mots, quatre sens : couleur (vert), direction (vers), animal (ver), objet (verre).",
    },
    {
      id: "conf-sain-sein-saint",
      titre: "sain / sein / saint",
      entrees: [
        { mot: "sain", nature: "adjectif", sens: "en bonne santé", exemple: "Un corps sain." },
        { mot: "sein", nature: "nom masculin", sens: "la poitrine ; « au sein de » = à l'intérieur de", exemple: "Au sein de l'entreprise." },
        { mot: "saint", nature: "adjectif / nom", sens: "sacré, vénéré par l'Église", exemple: "Un saint patron." },
      ],
      astuce: "« au sein de » = au milieu de, à l'intérieur de.",
    },
    {
      id: "conf-compte-comte-conte",
      titre: "compte / comte / conte",
      entrees: [
        { mot: "compte", nature: "nom masculin / verbe compter", sens: "calcul, montant ; ou « il compte »", exemple: "Ouvrir un compte. Il compte les points." },
        { mot: "comte", nature: "nom masculin", sens: "titre de noblesse", exemple: "Le comte et la comtesse." },
        { mot: "conte", nature: "nom masculin / verbe conter", sens: "récit merveilleux ; ou « il conte »", exemple: "Un conte de fées." },
      ],
      astuce: "« conte » se raconte (une histoire) ; « compte » se calcule.",
    },
    {
      id: "conf-tant-temps-ten",
      titre: "tant / temps / t'en",
      entrees: [
        { mot: "tant", nature: "adverbe de quantité", sens: "= tellement", exemple: "Il a tant travaillé." },
        { mot: "temps", nature: "nom masculin", sens: "la durée, la météo", exemple: "Le temps passe vite." },
        { mot: "t'en", nature: "te + en", sens: "pronom devant un verbe", exemple: "Tu t'en souviens ?" },
      ],
      astuce: "« temps » se rapporte toujours à la durée ou à la météo ; « tant » précise une quantité.",
    },
    {
      id: "conf-dessein-dessin",
      titre: "dessein / dessin",
      entrees: [
        { mot: "dessein", nature: "nom masculin", sens: "un projet, une intention", exemple: "Il nourrissait de sombres desseins." },
        { mot: "dessin", nature: "nom masculin", sens: "une image tracée", exemple: "Faire un dessin au crayon." },
      ],
      astuce: "« dessein » (avec e) = intention ; « dessin » (avec i) = image, comme « dessiner ».",
    },
    {
      id: "conf-chair-chaire-cher",
      titre: "chair / chaire / cher",
      entrees: [
        { mot: "chair", nature: "nom féminin", sens: "la matière du corps ; la pulpe d'un fruit", exemple: "La chair du fruit est juteuse." },
        { mot: "chaire", nature: "nom féminin", sens: "tribune d'un professeur ou d'un prêtre", exemple: "Le prêtre monte en chaire." },
        { mot: "cher / chère", nature: "adjectif", sens: "coûteux, ou affectueux (cher ami)", exemple: "Un objet cher. Mon cher ami." },
      ],
      astuce: "« chaire » (avec un e) est un meuble/tribune ; « chair » est la matière du corps.",
    },
    {
      id: "conf-resonner-raisonner",
      titre: "résonner / raisonner",
      entrees: [
        { mot: "résonner", nature: "verbe", sens: "produire un son qui se prolonge, faire écho", exemple: "Ses pas résonnaient dans le couloir." },
        { mot: "raisonner", nature: "verbe", sens: "penser logiquement, argumenter", exemple: "Il faut raisonner avant d'agir." },
      ],
      astuce: "« résonner » = un son (comme « sonner ») ; « raisonner » = la pensée (comme « raison »).",
    },
    {
      id: "conf-pause-pose",
      titre: "pause / pose",
      entrees: [
        { mot: "pause", nature: "nom féminin", sens: "un arrêt, une interruption", exemple: "Faire une pause." },
        { mot: "pose", nature: "nom féminin / verbe poser", sens: "position du corps ; ou « il pose »", exemple: "Garder la pose. Il pose sa valise." },
      ],
      astuce: "« pause » = arrêt (comme « faire une pause café ») ; « pose » vient de « poser ».",
    },
    {
      id: "conf-sceau-seau-saut-sot",
      titre: "sceau / seau / saut / sot",
      entrees: [
        { mot: "sceau", nature: "nom masculin", sens: "cachet officiel", exemple: "Le sceau de l'État." },
        { mot: "seau", nature: "nom masculin", sens: "récipient à anse", exemple: "Un seau d'eau." },
        { mot: "saut", nature: "nom masculin", sens: "bond, action de sauter", exemple: "Un saut en hauteur." },
        { mot: "sot", nature: "adjectif / nom", sens: "stupide, sans esprit", exemple: "Une remarque sotte." },
      ],
      astuce: "« sceau » (cachet) contient « sc » comme dans « inscription » officielle.",
    },
    {
      id: "conf-cygne-signe",
      titre: "cygne / signe",
      entrees: [
        { mot: "cygne", nature: "nom masculin", sens: "l'oiseau blanc", exemple: "Un cygne glisse sur l'étang." },
        { mot: "signe", nature: "nom masculin", sens: "marque, indice, geste", exemple: "Faire signe de la main." },
      ],
      astuce: "« cygne » (l'oiseau) partage son y avec « olympique » ; « signe » vient de « signaler ».",
    },
  ];
})();
