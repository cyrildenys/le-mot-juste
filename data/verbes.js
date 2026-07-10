/* =====================================================================
   Le Mot Juste — Base des verbes irréguliers
   Chaque verbe est décrit par ses « parties principales » ; le moteur
   (conjugueur.js) en dérive tous les temps et modes.

   Schéma :
     g          groupe (3 pour les irréguliers)
     aux        "avoir" | "etre"
     pres       [je, tu, il, nous, vous, ils]  (formes nues, sans pronom)
     imp        imparfait [6]  (optionnel ; sinon dérivé du « nous » présent)
     futStem    radical du futur/conditionnel (ex. "ser" → serai / serais)
     ps         [radical, type]  type = 'a' | 'i' | 'u' | 'in'  (passé simple)
     subj       [radical sing/3e pl, radical nous/vous]  (subjonctif présent)
     subjForms  [6]  override complet du subjonctif présent (optionnel)
     ppr        participe présent
     pp         participe passé (masc. sing.)
     imper      [tu, nous, vous]  (optionnel ; sinon dérivé ; false = aucun)
     impersonnel  true → seul « il » existe (falloir, pleuvoir)
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};

  LMJ.data.verbes = {
    être: {
      g: 3, aux: "avoir",
      pres: ["suis", "es", "est", "sommes", "êtes", "sont"],
      imp: ["étais", "étais", "était", "étions", "étiez", "étaient"],
      futStem: "ser", ps: ["f", "u"],
      subjForms: ["sois", "sois", "soit", "soyons", "soyez", "soient"],
      imper: ["sois", "soyons", "soyez"], ppr: "étant", pp: "été",
    },
    avoir: {
      g: 3, aux: "avoir",
      pres: ["ai", "as", "a", "avons", "avez", "ont"],
      futStem: "aur", ps: ["e", "u"],
      subjForms: ["aie", "aies", "ait", "ayons", "ayez", "aient"],
      imper: ["aie", "ayons", "ayez"], ppr: "ayant", pp: "eu",
    },
    aller: {
      g: 3, aux: "etre",
      pres: ["vais", "vas", "va", "allons", "allez", "vont"],
      futStem: "ir", ps: ["all", "a"],
      subjForms: ["aille", "ailles", "aille", "allions", "alliez", "aillent"],
      imper: ["va", "allons", "allez"], ppr: "allant", pp: "allé",
    },
    faire: {
      g: 3, aux: "avoir",
      pres: ["fais", "fais", "fait", "faisons", "faites", "font"],
      futStem: "fer", ps: ["f", "i"], subj: ["fass", "fass"],
      ppr: "faisant", pp: "fait",
    },
    dire: {
      g: 3, aux: "avoir",
      pres: ["dis", "dis", "dit", "disons", "dites", "disent"],
      futStem: "dir", ps: ["d", "i"], subj: ["dis", "dis"],
      ppr: "disant", pp: "dit",
    },
    pouvoir: {
      g: 3, aux: "avoir",
      pres: ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
      futStem: "pourr", ps: ["p", "u"],
      subjForms: ["puisse", "puisses", "puisse", "puissions", "puissiez", "puissent"],
      imper: false, ppr: "pouvant", pp: "pu",
    },
    vouloir: {
      g: 3, aux: "avoir",
      pres: ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
      futStem: "voudr", ps: ["voul", "u"],
      subjForms: ["veuille", "veuilles", "veuille", "voulions", "vouliez", "veuillent"],
      imper: ["veuille", "veuillons", "veuillez"], ppr: "voulant", pp: "voulu",
    },
    devoir: {
      g: 3, aux: "avoir",
      pres: ["dois", "dois", "doit", "devons", "devez", "doivent"],
      futStem: "devr", ps: ["d", "u"],
      subjForms: ["doive", "doives", "doive", "devions", "deviez", "doivent"],
      ppr: "devant", pp: "dû",
    },
    savoir: {
      g: 3, aux: "avoir",
      pres: ["sais", "sais", "sait", "savons", "savez", "savent"],
      futStem: "saur", ps: ["s", "u"], subj: ["sach", "sach"],
      imper: ["sache", "sachons", "sachez"], ppr: "sachant", pp: "su",
    },
    voir: {
      g: 3, aux: "avoir",
      pres: ["vois", "vois", "voit", "voyons", "voyez", "voient"],
      futStem: "verr", ps: ["v", "i"], subj: ["voi", "voy"],
      ppr: "voyant", pp: "vu",
    },
    venir: {
      g: 3, aux: "etre",
      pres: ["viens", "viens", "vient", "venons", "venez", "viennent"],
      futStem: "viendr", ps: ["v", "in"], subj: ["vienn", "ven"],
      ppr: "venant", pp: "venu",
    },
    tenir: {
      g: 3, aux: "avoir",
      pres: ["tiens", "tiens", "tient", "tenons", "tenez", "tiennent"],
      futStem: "tiendr", ps: ["t", "in"], subj: ["tienn", "ten"],
      ppr: "tenant", pp: "tenu",
    },
    prendre: {
      g: 3, aux: "avoir",
      pres: ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
      futStem: "prendr", ps: ["pr", "i"], subj: ["prenn", "pren"],
      ppr: "prenant", pp: "pris",
    },
    mettre: {
      g: 3, aux: "avoir",
      pres: ["mets", "mets", "met", "mettons", "mettez", "mettent"],
      futStem: "mettr", ps: ["m", "i"], subj: ["mett", "mett"],
      ppr: "mettant", pp: "mis",
    },
    partir: {
      g: 3, aux: "etre",
      pres: ["pars", "pars", "part", "partons", "partez", "partent"],
      futStem: "partir", ps: ["part", "i"], subj: ["part", "part"],
      ppr: "partant", pp: "parti",
    },
    sortir: {
      g: 3, aux: "etre",
      pres: ["sors", "sors", "sort", "sortons", "sortez", "sortent"],
      futStem: "sortir", ps: ["sort", "i"], subj: ["sort", "sort"],
      ppr: "sortant", pp: "sorti",
    },
    dormir: {
      g: 3, aux: "avoir",
      pres: ["dors", "dors", "dort", "dormons", "dormez", "dorment"],
      futStem: "dormir", ps: ["dorm", "i"], subj: ["dorm", "dorm"],
      ppr: "dormant", pp: "dormi",
    },
    servir: {
      g: 3, aux: "avoir",
      pres: ["sers", "sers", "sert", "servons", "servez", "servent"],
      futStem: "servir", ps: ["serv", "i"], subj: ["serv", "serv"],
      ppr: "servant", pp: "servi",
    },
    sentir: {
      g: 3, aux: "avoir",
      pres: ["sens", "sens", "sent", "sentons", "sentez", "sentent"],
      futStem: "sentir", ps: ["sent", "i"], subj: ["sent", "sent"],
      ppr: "sentant", pp: "senti",
    },
    courir: {
      g: 3, aux: "avoir",
      pres: ["cours", "cours", "court", "courons", "courez", "courent"],
      futStem: "courr", ps: ["cour", "u"], subj: ["cour", "cour"],
      ppr: "courant", pp: "couru",
    },
    mourir: {
      g: 3, aux: "etre",
      pres: ["meurs", "meurs", "meurt", "mourons", "mourez", "meurent"],
      futStem: "mourr", ps: ["mour", "u"], subj: ["meur", "mour"],
      ppr: "mourant", pp: "mort",
    },
    ouvrir: {
      g: 3, aux: "avoir",
      pres: ["ouvre", "ouvres", "ouvre", "ouvrons", "ouvrez", "ouvrent"],
      futStem: "ouvrir", ps: ["ouvr", "i"], subj: ["ouvr", "ouvr"],
      ppr: "ouvrant", pp: "ouvert",
    },
    offrir: {
      g: 3, aux: "avoir",
      pres: ["offre", "offres", "offre", "offrons", "offrez", "offrent"],
      futStem: "offrir", ps: ["offr", "i"], subj: ["offr", "offr"],
      ppr: "offrant", pp: "offert",
    },
    couvrir: {
      g: 3, aux: "avoir",
      pres: ["couvre", "couvres", "couvre", "couvrons", "couvrez", "couvrent"],
      futStem: "couvrir", ps: ["couvr", "i"], subj: ["couvr", "couvr"],
      ppr: "couvrant", pp: "couvert",
    },
    souffrir: {
      g: 3, aux: "avoir",
      pres: ["souffre", "souffres", "souffre", "souffrons", "souffrez", "souffrent"],
      futStem: "souffrir", ps: ["souffr", "i"], subj: ["souffr", "souffr"],
      ppr: "souffrant", pp: "souffert",
    },
    cueillir: {
      g: 3, aux: "avoir",
      pres: ["cueille", "cueilles", "cueille", "cueillons", "cueillez", "cueillent"],
      futStem: "cueiller", ps: ["cueill", "i"], subj: ["cueill", "cueill"],
      ppr: "cueillant", pp: "cueilli",
    },
    naître: {
      g: 3, aux: "etre",
      pres: ["nais", "nais", "naît", "naissons", "naissez", "naissent"],
      futStem: "naîtr", ps: ["naqu", "i"], subj: ["naiss", "naiss"],
      ppr: "naissant", pp: "né",
    },
    connaître: {
      g: 3, aux: "avoir",
      pres: ["connais", "connais", "connaît", "connaissons", "connaissez", "connaissent"],
      futStem: "connaîtr", ps: ["conn", "u"], subj: ["connaiss", "connaiss"],
      ppr: "connaissant", pp: "connu",
    },
    paraître: {
      g: 3, aux: "avoir",
      pres: ["parais", "parais", "paraît", "paraissons", "paraissez", "paraissent"],
      futStem: "paraîtr", ps: ["par", "u"], subj: ["paraiss", "paraiss"],
      ppr: "paraissant", pp: "paru",
    },
    croire: {
      g: 3, aux: "avoir",
      pres: ["crois", "crois", "croit", "croyons", "croyez", "croient"],
      futStem: "croir", ps: ["cr", "u"], subj: ["croi", "croy"],
      ppr: "croyant", pp: "cru",
    },
    boire: {
      g: 3, aux: "avoir",
      pres: ["bois", "bois", "boit", "buvons", "buvez", "boivent"],
      futStem: "boir", ps: ["b", "u"], subj: ["boiv", "buv"],
      ppr: "buvant", pp: "bu",
    },
    lire: {
      g: 3, aux: "avoir",
      pres: ["lis", "lis", "lit", "lisons", "lisez", "lisent"],
      futStem: "lir", ps: ["l", "u"], subj: ["lis", "lis"],
      ppr: "lisant", pp: "lu",
    },
    écrire: {
      g: 3, aux: "avoir",
      pres: ["écris", "écris", "écrit", "écrivons", "écrivez", "écrivent"],
      futStem: "écrir", ps: ["écriv", "i"], subj: ["écriv", "écriv"],
      ppr: "écrivant", pp: "écrit",
    },
    vivre: {
      g: 3, aux: "avoir",
      pres: ["vis", "vis", "vit", "vivons", "vivez", "vivent"],
      futStem: "vivr", ps: ["véc", "u"], subj: ["viv", "viv"],
      ppr: "vivant", pp: "vécu",
    },
    suivre: {
      g: 3, aux: "avoir",
      pres: ["suis", "suis", "suit", "suivons", "suivez", "suivent"],
      futStem: "suivr", ps: ["suiv", "i"], subj: ["suiv", "suiv"],
      ppr: "suivant", pp: "suivi",
    },
    rire: {
      g: 3, aux: "avoir",
      pres: ["ris", "ris", "rit", "rions", "riez", "rient"],
      futStem: "rir", ps: ["r", "i"], subj: ["ri", "ri"],
      ppr: "riant", pp: "ri",
    },
    conduire: {
      g: 3, aux: "avoir",
      pres: ["conduis", "conduis", "conduit", "conduisons", "conduisez", "conduisent"],
      futStem: "conduir", ps: ["conduis", "i"], subj: ["conduis", "conduis"],
      ppr: "conduisant", pp: "conduit",
    },
    construire: {
      g: 3, aux: "avoir",
      pres: ["construis", "construis", "construit", "construisons", "construisez", "construisent"],
      futStem: "construir", ps: ["construis", "i"], subj: ["construis", "construis"],
      ppr: "construisant", pp: "construit",
    },
    plaire: {
      g: 3, aux: "avoir",
      pres: ["plais", "plais", "plaît", "plaisons", "plaisez", "plaisent"],
      futStem: "plair", ps: ["pl", "u"], subj: ["plais", "plais"],
      ppr: "plaisant", pp: "plu",
    },
    recevoir: {
      g: 3, aux: "avoir",
      pres: ["reçois", "reçois", "reçoit", "recevons", "recevez", "reçoivent"],
      futStem: "recevr", ps: ["reç", "u"], subj: ["reçoiv", "recev"],
      ppr: "recevant", pp: "reçu",
    },
    valoir: {
      g: 3, aux: "avoir",
      pres: ["vaux", "vaux", "vaut", "valons", "valez", "valent"],
      futStem: "vaudr", ps: ["val", "u"], subj: ["vaill", "val"],
      ppr: "valant", pp: "valu",
    },
    envoyer: {
      g: 3, aux: "avoir",
      pres: ["envoie", "envoies", "envoie", "envoyons", "envoyez", "envoient"],
      futStem: "enverr", ps: ["envoy", "a"], subj: ["envoi", "envoy"],
      ppr: "envoyant", pp: "envoyé",
    },
    acquérir: {
      g: 3, aux: "avoir",
      pres: ["acquiers", "acquiers", "acquiert", "acquérons", "acquérez", "acquièrent"],
      futStem: "acquerr", ps: ["acqu", "i"], subj: ["acquièr", "acquér"],
      ppr: "acquérant", pp: "acquis",
    },
    battre: {
      g: 3, aux: "avoir",
      pres: ["bats", "bats", "bat", "battons", "battez", "battent"],
      futStem: "battr", ps: ["batt", "i"], subj: ["batt", "batt"],
      ppr: "battant", pp: "battu",
    },
    vaincre: {
      g: 3, aux: "avoir",
      pres: ["vaincs", "vaincs", "vainc", "vainquons", "vainquez", "vainquent"],
      futStem: "vaincr", ps: ["vainqu", "i"], subj: ["vainqu", "vainqu"],
      ppr: "vainquant", pp: "vaincu",
    },
    craindre: {
      g: 3, aux: "avoir",
      pres: ["crains", "crains", "craint", "craignons", "craignez", "craignent"],
      futStem: "craindr", ps: ["craign", "i"], subj: ["craign", "craign"],
      ppr: "craignant", pp: "craint",
    },
    peindre: {
      g: 3, aux: "avoir",
      pres: ["peins", "peins", "peint", "peignons", "peignez", "peignent"],
      futStem: "peindr", ps: ["peign", "i"], subj: ["peign", "peign"],
      ppr: "peignant", pp: "peint",
    },
    joindre: {
      g: 3, aux: "avoir",
      pres: ["joins", "joins", "joint", "joignons", "joignez", "joignent"],
      futStem: "joindr", ps: ["joign", "i"], subj: ["joign", "joign"],
      ppr: "joignant", pp: "joint",
    },
    résoudre: {
      g: 3, aux: "avoir",
      pres: ["résous", "résous", "résout", "résolvons", "résolvez", "résolvent"],
      futStem: "résoudr", ps: ["résol", "u"], subj: ["résolv", "résolv"],
      ppr: "résolvant", pp: "résolu",
    },
    fuir: {
      g: 3, aux: "avoir",
      pres: ["fuis", "fuis", "fuit", "fuyons", "fuyez", "fuient"],
      futStem: "fuir", ps: ["fu", "i"], subj: ["fui", "fuy"],
      ppr: "fuyant", pp: "fui",
    },
    vêtir: {
      g: 3, aux: "avoir",
      pres: ["vêts", "vêts", "vêt", "vêtons", "vêtez", "vêtent"],
      futStem: "vêtir", ps: ["vêt", "i"], subj: ["vêt", "vêt"],
      ppr: "vêtant", pp: "vêtu",
    },
    nuire: {
      g: 3, aux: "avoir",
      pres: ["nuis", "nuis", "nuit", "nuisons", "nuisez", "nuisent"],
      futStem: "nuir", ps: ["nuis", "i"], subj: ["nuis", "nuis"],
      ppr: "nuisant", pp: "nui",
    },
    luire: {
      g: 3, aux: "avoir",
      pres: ["luis", "luis", "luit", "luisons", "luisez", "luisent"],
      futStem: "luir", ps: ["luis", "i"], subj: ["luis", "luis"],
      ppr: "luisant", pp: "lui",
    },
    coudre: {
      g: 3, aux: "avoir",
      pres: ["couds", "couds", "coud", "cousons", "cousez", "cousent"],
      futStem: "coudr", ps: ["cous", "i"], subj: ["cous", "cous"],
      ppr: "cousant", pp: "cousu",
    },
    moudre: {
      g: 3, aux: "avoir",
      pres: ["mouds", "mouds", "moud", "moulons", "moulez", "moulent"],
      futStem: "moudr", ps: ["moul", "u"], subj: ["moul", "moul"],
      ppr: "moulant", pp: "moulu",
    },
    conclure: {
      g: 3, aux: "avoir",
      pres: ["conclus", "conclus", "conclut", "concluons", "concluez", "concluent"],
      futStem: "conclur", ps: ["concl", "u"], subj: ["conclu", "conclu"],
      ppr: "concluant", pp: "conclu",
    },
    exclure: {
      g: 3, aux: "avoir",
      pres: ["exclus", "exclus", "exclut", "excluons", "excluez", "excluent"],
      futStem: "exclur", ps: ["excl", "u"], subj: ["exclu", "exclu"],
      ppr: "excluant", pp: "exclu",
    },
    inclure: {
      g: 3, aux: "avoir",
      pres: ["inclus", "inclus", "inclut", "incluons", "incluez", "incluent"],
      futStem: "inclur", ps: ["incl", "u"], subj: ["inclu", "inclu"],
      ppr: "incluant", pp: "inclus",
    },
    contredire: {
      g: 3, aux: "avoir",
      pres: ["contredis", "contredis", "contredit", "contredisons", "contredisez", "contredisent"],
      futStem: "contredir", ps: ["contred", "i"], subj: ["contredis", "contredis"],
      ppr: "contredisant", pp: "contredit",
    },
    interdire: {
      g: 3, aux: "avoir",
      pres: ["interdis", "interdis", "interdit", "interdisons", "interdisez", "interdisent"],
      futStem: "interdir", ps: ["interd", "i"], subj: ["interdis", "interdis"],
      ppr: "interdisant", pp: "interdit",
    },
    prédire: {
      g: 3, aux: "avoir",
      pres: ["prédis", "prédis", "prédit", "prédisons", "prédisez", "prédisent"],
      futStem: "prédir", ps: ["préd", "i"], subj: ["prédis", "prédis"],
      ppr: "prédisant", pp: "prédit",
    },
    asseoir: {
      g: 3, aux: "avoir",
      pres: ["assieds", "assieds", "assied", "asseyons", "asseyez", "asseyent"],
      futStem: "assiér", ps: ["ass", "i"], subj: ["assey", "assey"],
      ppr: "asseyant", pp: "assis",
    },
    pourvoir: {
      g: 3, aux: "avoir",
      pres: ["pourvois", "pourvois", "pourvoit", "pourvoyons", "pourvoyez", "pourvoient"],
      futStem: "pourvoir", ps: ["pourv", "u"], subj: ["pourvoi", "pourvoy"],
      ppr: "pourvoyant", pp: "pourvu",
    },
    prévoir: {
      g: 3, aux: "avoir",
      pres: ["prévois", "prévois", "prévoit", "prévoyons", "prévoyez", "prévoient"],
      futStem: "prévoir", ps: ["prév", "i"], subj: ["prévoi", "prévoy"],
      ppr: "prévoyant", pp: "prévu",
    },
    traire: {
      g: 3, aux: "avoir",
      pres: ["trais", "trais", "trait", "trayons", "trayez", "traient"],
      futStem: "traire", subj: ["trai", "tray"],
      ppr: "trayant", pp: "trait",
      // Verbe défectif : pas de passé simple ni de subjonctif imparfait (pas de "ps").
    },
    mouvoir: {
      g: 3, aux: "avoir",
      pres: ["meus", "meus", "meut", "mouvons", "mouvez", "meuvent"],
      futStem: "mouvr", ps: ["m", "u"], subj: ["meuv", "mouv"],
      ppr: "mouvant", pp: "mû",
    },
    émouvoir: {
      g: 3, aux: "avoir",
      pres: ["émeus", "émeus", "émeut", "émouvons", "émouvez", "émeuvent"],
      futStem: "émouvr", ps: ["ém", "u"], subj: ["émeuv", "émouv"],
      ppr: "émouvant", pp: "ému",
    },
    promouvoir: {
      g: 3, aux: "avoir",
      pres: ["promeus", "promeus", "promeut", "promouvons", "promouvez", "promeuvent"],
      futStem: "promouvr", ps: ["prom", "u"], subj: ["promeuv", "promouv"],
      ppr: "promouvant", pp: "promu",
    },
    falloir: {
      g: 3, aux: "avoir", impersonnel: true,
      pres: [null, null, "faut", null, null, null],
      imp: [null, null, "fallait", null, null, null],
      futStem: "faudr", ps: ["fall", "u"],
      subjForms: [null, null, "faille", null, null, null],
      imper: false, ppr: null, pp: "fallu",
    },
    pleuvoir: {
      g: 3, aux: "avoir", impersonnel: true,
      pres: [null, null, "pleut", null, null, null],
      imp: [null, null, "pleuvait", null, null, null],
      futStem: "pleuvr", ps: ["pl", "u"],
      subjForms: [null, null, "pleuve", null, null, null],
      imper: false, ppr: "pleuvant", pp: "plu",
    },
  };

  /* Verbes des 1er/2e groupes qui se conjuguent avec l'auxiliaire ÊTRE. */
  LMJ.data.verbesEtre = new Set([
    "aller", "arriver", "entrer", "rentrer", "rester", "tomber", "retomber",
    "monter", "remonter", "descendre", "redescendre", "retourner", "passer",
    "naître", "renaître", "mourir", "décéder", "partir", "repartir", "sortir",
    "ressortir", "venir", "revenir", "devenir", "parvenir", "survenir", "intervenir",
  ]);
})();
