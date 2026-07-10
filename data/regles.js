/* =====================================================================
   Le Mot Juste — Règles : Accords & Conjugaison
   Schéma d'une règle :
     { id, titre, resume, explication(HTML), exemples:[{ok,texte,correction?}], astuce }
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};

  LMJ.data.accords = [
    {
      id: "acc-adjectif",
      titre: "Accord de l'adjectif qualificatif",
      resume: "L'adjectif s'accorde en genre et en nombre avec le nom.",
      explication:
        "<p>L'adjectif qualificatif prend le <strong>genre</strong> (masculin/féminin) et le <strong>nombre</strong> (singulier/pluriel) du nom auquel il se rapporte.</p><p>Avec plusieurs noms de genres différents, l'accord se fait au <strong>masculin pluriel</strong>.</p>",
      exemples: [
        { ok: true, texte: "une robe <em>verte</em>, des murs <em>blancs</em>" },
        { ok: true, texte: "un homme et une femme <em>courageux</em>" },
        { ok: false, texte: "des chemises <em>blanc</em>", correction: "des chemises blanches" },
      ],
      astuce: "Cherchez le nom-chef : c'est lui qui commande le genre et le nombre.",
    },
    {
      id: "acc-pp-etre",
      titre: "Participe passé employé avec « être »",
      resume: "Il s'accorde avec le sujet.",
      explication:
        "<p>Avec l'auxiliaire <strong>être</strong>, le participe passé s'accorde <strong>en genre et en nombre avec le sujet</strong>.</p><p>Cela concerne les verbes de mouvement/état (aller, venir, partir, rester…) et la voix passive.</p>",
      exemples: [
        { ok: true, texte: "Elle est <em>partie</em>. Ils sont <em>venus</em>." },
        { ok: true, texte: "Les fleurs sont <em>fanées</em>." },
        { ok: false, texte: "Elles sont <em>arrivé</em>", correction: "Elles sont arrivées" },
      ],
      astuce: "Auxiliaire être → je regarde le sujet.",
    },
    {
      id: "acc-pp-avoir",
      titre: "Participe passé employé avec « avoir »",
      resume: "Il s'accorde avec le COD, seulement s'il est placé avant le verbe.",
      explication:
        "<p>Avec <strong>avoir</strong>, le participe passé <strong>ne s'accorde jamais avec le sujet</strong>. Il s'accorde avec le <strong>complément d'objet direct (COD)</strong> uniquement lorsque celui-ci est placé <strong>avant</strong> le verbe.</p><p>Si le COD est placé après (ou absent), pas d'accord.</p>",
      exemples: [
        { ok: true, texte: "J'ai <em>mangé</em> les pommes. (COD après → invariable)" },
        { ok: true, texte: "Les pommes que j'ai <em>mangées</em>. (COD « que » avant → accord)" },
        { ok: false, texte: "La lettre que j'ai <em>écrit</em>", correction: "La lettre que j'ai écrite" },
      ],
      astuce: "Posez la question « quoi ? » après le verbe. Si la réponse est déjà passée avant, on accorde.",
    },
    {
      id: "acc-pp-pronominaux",
      titre: "Participe passé des verbes pronominaux",
      resume: "Cas délicat : accord avec le COD, pas toujours avec le sujet.",
      explication:
        "<p>Les verbes pronominaux se conjuguent avec <strong>être</strong>, mais l'accord suit en réalité la règle du <strong>COD placé avant</strong>.</p><p>On accorde avec le sujet quand le pronom réfléchi est COD ; on n'accorde pas quand il est COI ou quand un autre COD suit.</p>",
      exemples: [
        { ok: true, texte: "Elle s'est <em>lavée</em>. (se = COD)" },
        { ok: true, texte: "Elle s'est <em>lavé</em> les mains. (COD « les mains » après)" },
        { ok: true, texte: "Ils se sont <em>parlé</em>. (se = COI : parler à quelqu'un)" },
      ],
      astuce: "« se laver les mains » : le vrai COD est « les mains », placé après → pas d'accord.",
    },
    {
      id: "acc-tout",
      titre: "L'accord de « tout »",
      resume: "Variable comme adjectif/pronom, invariable comme adverbe.",
      explication:
        "<p><strong>Adjectif</strong> (devant un nom) : <em>tout, toute, tous, toutes</em> — il s'accorde.</p><p><strong>Adverbe</strong> (= entièrement, devant un adjectif) : <em>tout</em> reste invariable… sauf devant un adjectif féminin commençant par une consonne ou un h aspiré (euphonie).</p>",
      exemples: [
        { ok: true, texte: "<em>Tous</em> les élèves, <em>toutes</em> les classes." },
        { ok: true, texte: "Elles sont <em>tout</em> étonnées. (adverbe, devant voyelle)" },
        { ok: true, texte: "Elles sont <em>toutes</em> honteuses. (h aspiré → accord)" },
      ],
      astuce: "Remplacez par « entièrement » : si ça marche, c'est l'adverbe (souvent invariable).",
    },
    {
      id: "acc-leur",
      titre: "« leur » : pronom invariable ou déterminant variable",
      resume: "Devant un verbe → invariable. Devant un nom → s'accorde.",
      explication:
        "<p><strong>Pronom personnel</strong> (= à eux, devant un verbe) : <em>leur</em> est toujours <strong>invariable</strong>.</p><p><strong>Déterminant possessif</strong> (devant un nom) : <em>leur / leurs</em> s'accorde avec le nom possédé.</p>",
      exemples: [
        { ok: true, texte: "Je <em>leur</em> parle. (pronom → invariable)" },
        { ok: true, texte: "<em>Leurs</em> enfants, <em>leur</em> maison. (déterminant → accord)" },
        { ok: false, texte: "Je <em>leurs</em> ai dit", correction: "Je leur ai dit" },
      ],
      astuce: "Si « leur » est juste devant un verbe, il ne prend jamais de s.",
    },
    {
      id: "acc-couleurs",
      titre: "L'accord des adjectifs de couleur",
      resume: "Accord simple, sauf noms employés comme couleurs et couleurs composées.",
      explication:
        "<p>Un adjectif de couleur simple <strong>s'accorde</strong>.</p><p>Restent <strong>invariables</strong> : les noms employés comme adjectifs de couleur (orange, marron, or…) et les couleurs <strong>composées</strong> (bleu clair, vert pomme).</p>",
      exemples: [
        { ok: true, texte: "des yeux <em>bleus</em>, des robes <em>vertes</em>" },
        { ok: true, texte: "des chaussures <em>marron</em>, des rideaux <em>orange</em>" },
        { ok: true, texte: "des yeux <em>bleu clair</em>, des tissus <em>vert pomme</em>" },
      ],
      astuce: "Exceptions qui s'accordent quand même : rose, mauve, pourpre, fauve, écarlate.",
    },
    {
      id: "acc-demi",
      titre: "« demi » et « nu »",
      resume: "Invariables placés avant le nom (trait d'union).",
      explication:
        "<p><em>Demi</em> et <em>nu</em> placés <strong>avant</strong> le nom sont invariables et liés par un trait d'union. Placés <strong>après</strong>, ils s'accordent (demi en genre seulement).</p>",
      exemples: [
        { ok: true, texte: "une <em>demi</em>-heure ; aller <em>nu</em>-pieds" },
        { ok: true, texte: "deux heures et <em>demie</em> ; les pieds <em>nus</em>" },
        { ok: false, texte: "une <em>demie</em>-journée", correction: "une demi-journée" },
      ],
      astuce: "Avant le nom = figé et invariable ; après le nom = ça s'accorde.",
    },
    {
      id: "acc-verbe-sujet",
      titre: "Accord du verbe avec le sujet",
      resume: "Attention aux sujets collectifs et aux écrans entre sujet et verbe.",
      explication:
        "<p>Le verbe s'accorde avec son sujet. Avec un <strong>nom collectif + complément</strong> (« la plupart des », « une foule de »), l'accord se fait souvent avec le complément (le sens).</p><p>Ne vous laissez pas piéger par un mot inséré entre le sujet et le verbe.</p>",
      exemples: [
        { ok: true, texte: "La plupart des gens <em>pensent</em>…" },
        { ok: true, texte: "Le panier de fruits <em>était</em> renversé. (sujet = panier)" },
        { ok: false, texte: "Les enfants, hier, <em>est</em> parti", correction: "Les enfants… sont partis" },
      ],
      astuce: "Isolez le vrai sujet en posant « qui est-ce qui ? » devant le verbe.",
    },
    {
      id: "acc-vingt-cent",
      titre: "« vingt », « cent » et « mille »",
      resume: "vingt et cent prennent un s multipliés et non suivis ; mille est invariable.",
      explication:
        "<p><em>Vingt</em> et <em>cent</em> prennent un <strong>s</strong> quand ils sont <strong>multipliés</strong> et <strong>terminent</strong> le nombre. <em>Mille</em> (adjectif numéral) est toujours <strong>invariable</strong>.</p>",
      exemples: [
        { ok: true, texte: "quatre-<em>vingts</em> ; trois <em>cents</em>" },
        { ok: true, texte: "quatre-<em>vingt</em>-deux ; trois <em>cent</em> six (suivis → pas de s)" },
        { ok: true, texte: "deux <em>mille</em> ans (mille invariable)" },
      ],
      astuce: "Multiplié ET en fin de nombre → s. Sinon, pas de s.",
    },
    {
      id: "acc-meme",
      titre: "L'accord de « même »",
      resume: "Adjectif, il s'accorde ; adverbe (= aussi), il est invariable.",
      explication:
        "<p><strong>Adjectif</strong> (il marque l'identité ou renforce un nom/pronom) : <em>même</em> s'accorde en nombre.</p><p><strong>Adverbe</strong> (au sens de « aussi, y compris ») : <em>même</em> est <strong>invariable</strong>.</p><p>Après un pronom personnel, il s'accorde et se lie par un trait d'union : eux-mêmes.</p>",
      exemples: [
        { ok: true, texte: "Ils ont fait les <em>mêmes</em> erreurs. (adjectif → accord)" },
        { ok: true, texte: "<em>Même</em> les experts se trompent. (adverbe → invariable)" },
        { ok: true, texte: "Elles l'ont réparé elles-<em>mêmes</em>." },
      ],
      astuce: "Si « même » signifie « aussi / y compris », il reste invariable.",
    },
    {
      id: "acc-possible",
      titre: "L'accord de « possible »",
      resume: "Invariable après « le plus / le moins… possible ».",
      explication:
        "<p><em>Possible</em> s'accorde normalement comme un adjectif. Mais après un <strong>superlatif</strong> (« le plus, le moins… possible ») portant sur une quantité, il reste <strong>invariable</strong> (il se rapporte au tour impersonnel « qu'il est possible »).</p>",
      exemples: [
        { ok: true, texte: "Envisageons toutes les solutions <em>possibles</em>. (accord)" },
        { ok: true, texte: "Réunissez le plus de documents <em>possible</em>. (invariable)" },
        { ok: false, texte: "le moins d'erreurs <em>possibles</em>", correction: "le moins d'erreurs possible" },
      ],
      astuce: "Avec « le plus/le moins de … possible » → toujours invariable.",
    },
    {
      id: "acc-sujets-ou-ni",
      titre: "Accord du verbe avec « ou » / « ni »",
      resume: "Selon le sens : action partagée → pluriel ; exclusion → singulier possible.",
      explication:
        "<p>Quand deux sujets sont reliés par <strong>ou</strong> ou <strong>ni</strong>, le verbe se met au <strong>pluriel</strong> si l'action peut concerner les deux, au <strong>singulier</strong> si elle en exclut un.</p>",
      exemples: [
        { ok: true, texte: "Ni la fatigue ni la peur ne l'<em>arrêtèrent</em>. (les deux → pluriel)" },
        { ok: true, texte: "Pierre ou Paul sera <em>élu</em> président. (un seul → singulier)" },
      ],
      astuce: "Un seul des deux peut-il agir ? → singulier. Les deux ensemble ? → pluriel.",
    },
    {
      id: "acc-adj-composes",
      titre: "L'accord des adjectifs composés",
      resume: "Deux adjectifs → les deux s'accordent ; un élément invariable reste invariable.",
      explication:
        "<p>Si les deux éléments sont des <strong>adjectifs</strong>, tous deux s'accordent (des enfants <em>sourds-muets</em>).</p><p>Si le premier élément est un <strong>adverbe</strong> ou joue un rôle invariable (mi-, demi-, nouveau- au sens de « nouvellement »), il reste <strong>invariable</strong> (des <em>nouveau-nés</em>, des personnes <em>haut placées</em>).</p>",
      exemples: [
        { ok: true, texte: "Des enfants <em>sourds-muets</em>. (deux adjectifs → accord)" },
        { ok: true, texte: "Des <em>nouveau-nés</em>. (nouveau = nouvellement → invariable)" },
        { ok: false, texte: "des <em>nouveaux-nés</em>", correction: "des nouveau-nés" },
      ],
      astuce: "Le premier élément équivaut-il à un adverbe ? Alors il ne s'accorde pas.",
    },
    {
      id: "acc-ci-joint",
      titre: "L'accord de « ci-joint », « ci-inclus »",
      resume: "Invariable en tête de phrase ou devant un nom sans déterminant ; accord après le nom.",
      explication:
        "<p><strong>Invariable</strong> (valeur adverbiale) : en tête de phrase, ou devant un nom sans déterminant.</p><p><strong>Accord obligatoire</strong> quand il suit le nom.</p><p><strong>Au choix</strong> dans le corps de la phrase devant un nom précédé d'un déterminant.</p>",
      exemples: [
        { ok: true, texte: "<em>Ci-joint</em> les documents demandés. (en tête → invariable)" },
        { ok: true, texte: "Les factures <em>ci-jointes</em>. (après le nom → accord)" },
        { ok: true, texte: "Vous trouverez ci-joint <em>ou</em> ci-jointes deux copies. (au choix)" },
      ],
      astuce: "En tête = invariable ; après le nom = accord.",
    },
    {
      id: "acc-pp-infinitif",
      titre: "Participe passé suivi d'un infinitif",
      resume: "Accord si le COD placé avant fait l'action de l'infinitif.",
      explication:
        "<p>Le participe passé suivi d'un infinitif s'accorde avec le <strong>COD placé avant</strong> uniquement si ce COD <strong>fait l'action</strong> exprimée par l'infinitif.</p><p>Le participe passé de <strong>« faire »</strong> suivi d'un infinitif reste toujours <strong>invariable</strong>.</p>",
      exemples: [
        { ok: true, texte: "Les choristes que j'ai <em>entendus</em> chanter. (ils chantent → accord)" },
        { ok: true, texte: "Les chansons que j'ai <em>entendu</em> chanter. (elles ne chantent pas → invariable)" },
        { ok: true, texte: "Elle s'est <em>fait</em> couper les cheveux. (« fait » + infinitif → invariable)" },
      ],
      astuce: "Le COD fait-il l'action de l'infinitif ? Oui → accord ; non → invariable.",
    },
    {
      id: "acc-pluriel-noms",
      titre: "Le pluriel des noms",
      resume: "En général +s, mais de nombreuses exceptions (-x, -aux).",
      explication:
        "<p>Règle générale : on ajoute un <strong>-s</strong> (un chat → des chats).</p><p>Noms en <strong>-s, -x, -z</strong> : invariables (une voix → des voix). Noms en <strong>-au, -eau, -eu</strong> : <strong>-x</strong> (un tuyau → des tuyaux, un jeu → des jeux). Noms en <strong>-al</strong> : <strong>-aux</strong> (un cheval → des chevaux). Noms en <strong>-ail</strong> : en général <strong>+s</strong> (des détails).</p>",
      exemples: [
        { ok: true, texte: "un tableau → des <em>tableaux</em> ; un journal → des <em>journaux</em>" },
        { ok: true, texte: "une souris → des <em>souris</em> (invariable)" },
        { ok: false, texte: "des <em>chevals</em>", correction: "des chevaux" },
      ],
      astuce: "Les 7 « bijoux » en -x : bijou, caillou, chou, genou, hibou, joujou, pou.",
    },
    {
      id: "acc-noms-composes",
      titre: "Le pluriel des noms composés",
      resume: "Seuls les noms et les adjectifs s'accordent ; verbes, adverbes et prépositions restent invariables.",
      explication:
        "<p>Dans un nom composé, on ne met au pluriel que les <strong>noms</strong> et les <strong>adjectifs</strong> ; les <strong>verbes, adverbes et prépositions</strong> restent invariables. On raisonne selon le <strong>sens</strong>.</p>",
      exemples: [
        { ok: true, texte: "un chou-fleur → des <em>choux-fleurs</em> (nom + nom)" },
        { ok: true, texte: "un coffre-fort → des <em>coffres-forts</em> (nom + adjectif)" },
        { ok: true, texte: "un tire-bouchon → des <em>tire-bouchons</em> (verbe invariable + nom)" },
      ],
      astuce: "« un porte-monnaie → des porte-monnaie » : on porte de la monnaie (invariable).",
    },
    {
      id: "acc-tel",
      titre: "L'accord de « tel » et « tel que »",
      resume: "« tel » s'accorde avec le nom qui suit ; « tel que » avec le nom qui précède.",
      explication:
        "<p><strong>Tel</strong> (sans « que ») s'accorde avec le nom qui le <strong>suit</strong> (le terme de comparaison).</p><p><strong>Tel que</strong> s'accorde avec le nom qui le <strong>précède</strong> (son antécédent).</p>",
      exemples: [
        { ok: true, texte: "Tel père, tel fils." },
        { ok: true, texte: "Des bêtes <em>telles que</em> le tigre. (telles ← bêtes, qui précède)" },
        { ok: true, texte: "Elle bondit, <em>telle</em> une gazelle. (telle ← gazelle, qui suit)" },
      ],
      astuce: "« tel quel » s'accorde avec le nom concerné : je les rends tels quels.",
    },
    {
      id: "acc-participe-present",
      titre: "Participe présent ou adjectif verbal ?",
      resume: "Le participe présent est invariable ; l'adjectif verbal s'accorde.",
      explication:
        "<p>La forme en <strong>-ant</strong> est <strong>invariable</strong> quand c'est un <strong>participe présent</strong> (forme verbale, souvent suivie d'un complément) : « des enfants <em>obéissant</em> à leurs parents ».</p><p>Elle <strong>s'accorde</strong> quand c'est un <strong>adjectif verbal</strong> (elle exprime une qualité) : « des enfants <em>obéissants</em> ».</p>",
      exemples: [
        { ok: true, texte: "Des travaux <em>exigeant</em> de la minutie. (participe → invariable)" },
        { ok: true, texte: "Des travaux <em>exigeants</em>. (adjectif → accord)" },
        { ok: true, texte: "Orthographe parfois différente : fatig<em>a</em>nt (adj.) / fatig<em>ua</em>nt (participe)." },
      ],
      astuce: "Test : si on peut mettre au féminin, c'est l'adjectif (il s'accorde).",
    },
    {
      id: "acc-aucun-nul",
      titre: "L'accord de « aucun » et « nul »",
      resume: "Généralement au singulier ; pluriel seulement devant un nom sans singulier.",
      explication:
        "<p><em>Aucun, aucune, nul, nulle</em> s'emploient normalement au <strong>singulier</strong> (aucun élève, nulle trace).</p><p>Ils se mettent au <strong>pluriel</strong> uniquement devant un nom qui n'a pas de singulier (aucuns frais, nulles funérailles).</p>",
      exemples: [
        { ok: true, texte: "<em>Aucun</em> bruit ne troublait la nuit." },
        { ok: true, texte: "Il n'a engagé <em>aucuns</em> frais. (« frais » toujours pluriel)" },
        { ok: false, texte: "<em>aucuns</em> élèves", correction: "aucun élève" },
      ],
      astuce: "Par défaut, singulier. Pluriel réservé aux noms toujours pluriels (frais, funérailles…).",
    },
    {
      id: "acc-avoir-lair",
      titre: "L'accord après « avoir l'air »",
      resume: "En général, l'adjectif s'accorde avec le sujet.",
      explication:
        "<p>Le plus souvent, l'adjectif qui suit <strong>avoir l'air</strong> s'accorde avec le <strong>sujet</strong> (« avoir l'air » = sembler) : « Ces suggestions ont l'air <em>intéressantes</em>. »</p><p>Si le sujet est une <strong>personne</strong>, on peut aussi accorder avec <strong>« air »</strong> (masculin singulier) pour insister sur l'expression du visage : « Elle a l'air <em>gentille</em> » ou « Elle a l'air <em>gentil</em> », les deux sont admis.</p>",
      exemples: [
        { ok: true, texte: "La salade a l'air <em>bonne</em>. (sujet « salade »)" },
        { ok: true, texte: "Elle a l'air <em>content</em> / <em>contente</em>. (les deux acceptés)" },
      ],
      astuce: "Pour une chose, accordez toujours avec le sujet. Pour une personne, les deux accords sont possibles.",
    },
    {
      id: "acc-adj-adverbe",
      titre: "Les adjectifs employés comme adverbes",
      resume: "Invariables quand ils modifient un verbe (chanter faux, coûter cher).",
      explication:
        "<p>Certains adjectifs, placés juste après un verbe, jouent en réalité le rôle d'un <strong>adverbe</strong> : ils précisent alors le verbe et restent <strong>invariables</strong>.</p><p>Expressions figées courantes : <em>chanter faux, parler bas/haut, sentir bon/mauvais, coûter cher, peser lourd, voir clair, tenir bon, travailler dur, filer doux, voler bas/haut</em>.</p>",
      exemples: [
        { ok: true, texte: "Ces fleurs sentent <em>bon</em>. (invariable, modifie « sentent »)" },
        { ok: true, texte: "Ce sont de <em>bonnes</em> fleurs. (ici, adjectif : accord normal)" },
        { ok: true, texte: "Ces voitures coûtent <em>cher</em>. / Ces voitures sont <em>chères</em>." },
      ],
      astuce: "Si le mot modifie le verbe (et non un nom), il reste invariable.",
    },
  ];

  LMJ.data.conjugaisonRegles = [
    {
      id: "conj-er-ou-e",
      titre: "-er ou -é ? (infinitif ou participe passé)",
      resume: "Remplacez le verbe par « mordre / mordu ».",
      explication:
        "<p>Les terminaisons <em>-er</em> (infinitif) et <em>-é</em> (participe passé) se prononcent pareil. Pour choisir, remplacez le verbe du 1er groupe par un verbe du 3e groupe comme <strong>mordre</strong> :</p><p>Si « <strong>mordre</strong> » convient → infinitif <em>-er</em>. Si « <strong>mordu</strong> » convient → participe passé <em>-é</em>.</p>",
      exemples: [
        { ok: true, texte: "Je vais <em>manger</em>. (→ je vais mordre)" },
        { ok: true, texte: "J'ai <em>mangé</em>. (→ j'ai mordu)" },
        { ok: false, texte: "Il a <em>manger</em>", correction: "Il a mangé (→ il a mordu)" },
      ],
      astuce: "Après une préposition (à, de, pour, sans…), c'est toujours l'infinitif -er.",
    },
    {
      id: "conj-rai-rais",
      titre: "Futur (-rai) ou conditionnel (-rais) ?",
      resume: "Passez à une autre personne pour entendre la différence.",
      explication:
        "<p>À la 1re personne, <em>-rai</em> (futur) et <em>-rais</em> (conditionnel) se ressemblent. Astuce : remplacez « je » par « <strong>il</strong> ».</p><p>Si l'on obtient <em>-ra</em> → <strong>futur</strong> (je -rai). Si l'on obtient <em>-rait</em> → <strong>conditionnel</strong> (je -rais).</p>",
      exemples: [
        { ok: true, texte: "Demain, je <em>partirai</em>. (il partira → futur)" },
        { ok: true, texte: "Je <em>partirais</em> si je pouvais. (il partirait → conditionnel)" },
      ],
      astuce: "Certitude à venir = futur. Hypothèse, politesse = conditionnel.",
    },
    {
      id: "conj-imperatif-s",
      titre: "Impératif : le piège du « s »",
      resume: "Pas de s à la 2e personne des verbes en -er… sauf devant en/y.",
      explication:
        "<p>À l'impératif, les verbes du 1er groupe (et « aller ») ne prennent <strong>pas de s</strong> à la 2e personne du singulier.</p><p>On rajoute un <strong>s</strong> (euphonique) uniquement devant les pronoms <em>en</em> et <em>y</em>, pour la liaison.</p>",
      exemples: [
        { ok: true, texte: "<em>Mange</em> ta soupe ! <em>Va</em> jouer !" },
        { ok: true, texte: "<em>Manges-en</em> ! <em>Vas-y</em> !" },
        { ok: false, texte: "<em>Manges</em> ta soupe", correction: "Mange ta soupe" },
      ],
      astuce: "Les verbes des 2e/3e groupes gardent le s : finis, prends, viens.",
    },
    {
      id: "conj-present-er",
      titre: "Présent des verbes en -er : les terminaisons",
      resume: "-e, -es, -e, -ons, -ez, -ent.",
      explication:
        "<p>Au présent, les verbes du 1er groupe se terminent par <strong>-e, -es, -e, -ons, -ez, -ent</strong>. Attention : le <em>-ent</em> de la 3e personne du pluriel ne se prononce pas.</p>",
      exemples: [
        { ok: true, texte: "je parl<em>e</em>, tu parl<em>es</em>, ils parl<em>ent</em>" },
        { ok: false, texte: "ils <em>mangent</em> se prononce comme… « ils mange »", correction: "orthographe : mangent" },
      ],
      astuce: "Ne confondez pas « il mange » (présent) et « ils mangent » : écoutez le sujet.",
    },
    {
      id: "conj-imparfait-passe-simple",
      titre: "Imparfait ou passé simple ?",
      resume: "Décor et durée = imparfait ; action ponctuelle = passé simple.",
      explication:
        "<p>L'<strong>imparfait</strong> pose le décor, l'habitude, la description, l'action qui dure. Le <strong>passé simple</strong> (récit littéraire) exprime une action <strong>ponctuelle</strong>, achevée, qui fait avancer l'histoire.</p>",
      exemples: [
        { ok: true, texte: "Il <em>faisait</em> nuit (décor) quand l'orage <em>éclata</em> (action)." },
        { ok: true, texte: "Chaque été, nous <em>allions</em> à la mer. (habitude → imparfait)" },
      ],
      astuce: "À l'oral et dans un texte courant, le passé simple est remplacé par le passé composé.",
    },
    {
      id: "conj-subjonctif",
      titre: "Quand employer le subjonctif ?",
      resume: "Après l'expression d'un souhait, d'un doute, d'une nécessité.",
      explication:
        "<p>Le subjonctif exprime une action <strong>envisagée</strong> (non réalisée) : volonté, souhait, doute, obligation, émotion. Il suit souvent « <em>que</em> » après des verbes comme <em>vouloir que, falloir que, douter que, avoir peur que</em>.</p>",
      exemples: [
        { ok: true, texte: "Il faut que tu <em>viennes</em>." },
        { ok: true, texte: "Je veux qu'il <em>fasse</em> beau." },
        { ok: false, texte: "Il faut que tu <em>viens</em>", correction: "Il faut que tu viennes" },
      ],
      astuce: "« Bien que », « pour que », « jusqu'à ce que », « à moins que » → subjonctif.",
    },
    {
      id: "conj-t-euphonique",
      titre: "Le « t » euphonique (a-t-il ?)",
      resume: "On intercale -t- entre deux voyelles dans l'interrogation.",
      explication:
        "<p>À la 3e personne, lorsque le verbe se termine par une <strong>voyelle</strong> (e, a) juste devant <em>il, elle, on</em>, on ajoute un <strong>-t-</strong> entre traits d'union pour la liaison.</p><p>Inutile si le verbe finit déjà par <strong>t</strong> ou <strong>d</strong> (vient-il, prend-elle).</p>",
      exemples: [
        { ok: true, texte: "Viendra-<em>t</em>-il ? Que mange-<em>t</em>-on ? Y a-<em>t</em>-il quelqu'un ?" },
        { ok: true, texte: "Vient-il ? Prend-elle ? (pas de -t-)" },
        { ok: false, texte: "Va-il ?", correction: "Va-t-il ?" },
      ],
      astuce: "Deux voyelles se rencontrent → on glisse un -t- : « va-t-il ».",
    },
    {
      id: "conj-trois-groupes",
      titre: "Les trois groupes de verbes",
      resume: "1er : -er ; 2e : -ir (…issant) ; 3e : tous les autres.",
      explication:
        "<p><strong>1er groupe</strong> : verbes en <em>-er</em> (sauf « aller »).</p><p><strong>2e groupe</strong> : verbes en <em>-ir</em> dont le participe présent est en <em>-issant</em> (finir → finissant).</p><p><strong>3e groupe</strong> : tous les autres verbes, dits irréguliers (aller, les verbes en -ir sans -issant comme partir, les verbes en -oir et en -re).</p>",
      exemples: [
        { ok: true, texte: "chanter, aimer, parler → 1er groupe" },
        { ok: true, texte: "finir, choisir, grandir → 2e groupe" },
        { ok: true, texte: "aller, partir, prendre, voir → 3e groupe" },
      ],
      astuce: "Pour le 2e groupe, vérifiez le participe présent : « -issant ».",
    },
    {
      id: "conj-imparfait-terminaisons",
      titre: "Les terminaisons de l'imparfait",
      resume: "-ais, -ais, -ait, -ions, -iez, -aient (pour tous les verbes).",
      explication:
        "<p>À l'imparfait, <strong>tous</strong> les verbes prennent les mêmes terminaisons : <strong>-ais, -ais, -ait, -ions, -iez, -aient</strong>.</p><p>On les ajoute au radical de la 1re personne du pluriel du présent (nous chant<em>ons</em> → je chant<em>ais</em>).</p>",
      exemples: [
        { ok: true, texte: "je chantais, nous finissions, ils prenaient" },
        { ok: true, texte: "nous mangeons → je mangeais" },
        { ok: false, texte: "il <em>croiyait</em>", correction: "il croyait" },
      ],
      astuce: "Seul « être » a un radical particulier : j'ét<em>ais</em>.",
    },
    {
      id: "conj-passe-compose",
      titre: "La formation du passé composé",
      resume: "Auxiliaire (avoir ou être) au présent + participe passé.",
      explication:
        "<p>Le passé composé se forme avec l'<strong>auxiliaire « avoir » ou « être » au présent</strong>, suivi du <strong>participe passé</strong> du verbe.</p><p>Avec <strong>être</strong>, le participe s'accorde avec le sujet ; avec <strong>avoir</strong>, il s'accorde avec le COD placé avant.</p>",
      exemples: [
        { ok: true, texte: "J'<em>ai mangé</em>. Nous <em>avons fini</em>." },
        { ok: true, texte: "Elle <em>est partie</em>. Ils <em>sont venus</em>." },
      ],
      astuce: "Auxiliaire au présent → passé composé ; à l'imparfait → plus-que-parfait.",
    },
    {
      id: "conj-futur-terminaisons",
      titre: "Les terminaisons du futur simple",
      resume: "-rai, -ras, -ra, -rons, -rez, -ront (pour tous les verbes).",
      explication:
        "<p>Au futur simple, tous les verbes prennent les mêmes terminaisons : <strong>-rai, -ras, -ra, -rons, -rez, -ront</strong>.</p><p>Pour les 1er et 2e groupes, on les ajoute à l'<strong>infinitif</strong> (chanter → je chanterai ; finir → je finirai).</p>",
      exemples: [
        { ok: true, texte: "je chanterai, tu finiras, ils chanteront" },
        { ok: false, texte: "je <em>mangerais</em> demain", correction: "je mangerai demain (futur, sans s)" },
      ],
      astuce: "Attention à ne pas confondre avec le conditionnel (-rais).",
    },
  ];
})();
