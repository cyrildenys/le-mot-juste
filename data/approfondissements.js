/* =====================================================================
   Le Mot Juste — Approfondissements (« Pour aller plus loin »)
   Contenu détaillé affiché sur la page cours d'une fiche.
   Clé = id de la règle. Valeur = HTML (contenu scolaire standard).
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};

  LMJ.data.approf = {
    /* ---------- ACCORDS ---------- */
    "acc-adjectif":
      "<p><strong>Former le féminin :</strong> en général on ajoute <em>-e</em> (grand → grande). Cas particuliers : <em>-er → -ère</em> (léger → légère), <em>-eux → -euse</em> (heureux → heureuse), <em>-f → -ve</em> (neuf → neuve), <em>-c → -che / -que</em> (blanc → blanche, public → publique) ; parfois la consonne double (bon → bonne, gras → grasse).</p><p><strong>Former le pluriel :</strong> on ajoute <em>-s</em> ; les adjectifs en <em>-s</em> ou <em>-x</em> ne changent pas (un gros mur → de gros murs). <em>-eau → -eaux</em> (beau → beaux) ; <em>-al → -aux</em> (national → nationaux), sauf <em>banal, fatal, natal, naval</em> → -als.</p><p>L'accord vaut même si l'adjectif est éloigné du nom : « Ces fleurs, cueillies ce matin, sont <em>fraîches</em>. »</p>",
    "acc-pp-etre":
      "<p>Sont concernés : les verbes qui se conjuguent avec être (aller, venir, partir, arriver, rester, devenir, naître, mourir…), la <strong>voix passive</strong> (« la porte est <em>ouverte</em> ») et les <strong>verbes pronominaux</strong> (voir la fiche dédiée).</p><p><strong>Méthode :</strong> mettez au féminin ou au pluriel pour entendre l'accord — « ils sont <em>venus</em> », « elles sont <em>venues</em> ».</p>",
    "acc-pp-avoir":
      "<p>Pour trouver le COD, posez <strong>« qui ? »</strong> ou <strong>« quoi ? »</strong> après le verbe. S'il répond et qu'il est <strong>placé avant</strong> le verbe (souvent « que », « l' », « les », « combien de… »), on accorde.</p><p>Le pronom <strong>« en » ne commande pas l'accord</strong> : « Des pommes ? J'en ai <em>mangé</em>. »</p><p>Pas de COD (verbe intransitif) ou COD placé après → participe invariable.</p>",
    "acc-pp-pronominaux":
      "<p>On applique en réalité la règle du <strong>COD placé avant</strong>, comme avec « avoir ».</p><ul><li><strong>Accord</strong> quand le pronom réfléchi est COD : « Elle s'est <em>lavée</em>. »</li><li><strong>Pas d'accord</strong> si un autre COD suit : « Elle s'est <em>lavé</em> les mains. »</li><li><strong>Pas d'accord</strong> si le pronom est COI (se parler, se plaire, se nuire, se succéder…) : « Ils se sont <em>parlé</em>. »</li></ul><p>Les verbes <strong>essentiellement pronominaux</strong> (s'enfuir, se souvenir, s'évanouir…) s'accordent toujours avec le sujet : « Elles se sont <em>enfuies</em>. »</p>",
    "acc-tout":
      "<ul><li><strong>Déterminant / adjectif</strong> (devant un nom ou un pronom) : varie — tout, toute, tous, toutes.</li><li><strong>Pronom</strong> : « Ils sont <em>tous</em> venus » (le s se prononce).</li><li><strong>Adverbe</strong> (= entièrement, devant un adjectif) : invariable, <em>sauf</em> devant un adjectif féminin commençant par une consonne ou un h aspiré (« toute honteuse », « toutes petites »).</li></ul>",
    "acc-leur":
      "<p>Repère infaillible : « leur » <strong>juste devant un verbe</strong> = pronom personnel (= à eux / à elles) → toujours invariable. Partout ailleurs, devant un nom, c'est le déterminant possessif, qui s'accorde avec le nom possédé (leur / leurs).</p><p>On met « leurs » quand chacun peut en posséder plusieurs : « Ils ont rangé <em>leurs</em> affaires. »</p>",
    "acc-couleurs":
      "<p><strong>S'accordent :</strong> les adjectifs de couleur simples (bleu, vert, rouge…).</p><p><strong>Invariables :</strong> les <em>noms</em> employés comme couleurs (orange, marron, olive, crème, turquoise, or, argent…) et les couleurs <em>composées</em> (bleu-vert, vert clair, jaune citron).</p><p><strong>Exceptions</strong> (noms devenus de vrais adjectifs, qui s'accordent) : rose, mauve, pourpre, fauve, écarlate, incarnat, vermeil.</p>",
    "acc-demi":
      "<p><em>Demi</em>, <em>semi</em>, <em>mi</em>, <em>nu</em> placés <strong>avant</strong> le nom sont invariables et reliés par un trait d'union (une demi-heure, nu-pieds, la mi-août).</p><p>Placés <strong>après</strong> : <em>demi</em> s'accorde en genre seulement (deux heures et demie, midi et demi) ; <em>nu</em> s'accorde en genre et en nombre (les pieds nus).</p>",
    "acc-verbe-sujet":
      "<ul><li><strong>Nom collectif + complément</strong> : accord selon le sens — « La foule <em>applaudissait</em> » / « Une foule de gens <em>sont</em> venus ».</li><li>« <strong>La plupart</strong> / beaucoup / peu / trop de… » + nom pluriel → verbe au pluriel.</li><li>« <strong>C'est moi qui</strong>… » : le verbe s'accorde avec le pronom repris (« qui <em>suis</em> », « qui <em>es</em> »).</li><li>Ne pas se laisser piéger par un mot intercalé entre le sujet et le verbe.</li></ul>",
    "acc-vingt-cent":
      "<p><em>Vingt</em> et <em>cent</em> prennent un <em>-s</em> seulement s'ils sont <strong>multipliés</strong> ET <strong>non suivis</strong> d'un autre nombre : quatre-vingt<strong>s</strong>, trois cent<strong>s</strong> ; mais quatre-vingt-un, trois cent dix.</p><p><em>Mille</em> (adjectif numéral) est toujours invariable. En revanche les noms <em>millier, million, milliard</em> s'accordent (des millions).</p><p>Depuis 1990, on peut relier tous les éléments par des traits d'union (vingt-et-un, cent-trois).</p>",
    "acc-meme":
      "<ul><li><strong>Adjectif</strong> (identité, insistance) : varie — « les mêmes causes », « les dieux eux-mêmes ».</li><li><strong>Adverbe</strong> (= aussi, y compris) : invariable — « Même les enfants comprennent. »</li><li>Après un nom au pluriel, il est adjectif et s'accorde : « les paroles mêmes qu'il a prononcées ».</li></ul>",
    "acc-possible":
      "<p>« Possible » s'accorde comme un adjectif ordinaire : « toutes les solutions <em>possibles</em> ».</p><p>Il reste <strong>invariable</strong> quand il accompagne un superlatif (le plus, le moins, le meilleur…) et se rapporte à un « il » impersonnel sous-entendu : « le moins d'erreurs <em>possible</em> » (= qu'il est possible).</p>",
    "acc-sujets-ou-ni":
      "<ul><li>Sujets reliés par <em>ou</em> / <em>ni</em> : verbe au <strong>pluriel</strong> si l'action peut concerner les deux (« Ni la fatigue ni la peur ne l'<em>arrêtèrent</em> »).</li><li>Verbe au <strong>singulier</strong> si le « ou » est exclusif (« Pierre ou Paul <em>sera</em> élu »).</li><li>Reliés par <em>et</em> : toujours le pluriel.</li></ul>",
    "acc-adj-composes":
      "<p>Chaque élément qui est <strong>adjectif</strong> s'accorde ; l'élément qui a une valeur d'<strong>adverbe</strong> reste invariable.</p><ul><li>Deux adjectifs : des enfants <em>sourds-muets</em>, des paroles <em>aigres-douces</em>.</li><li>Adverbe + adjectif : des <em>nouveau-nés</em> (nouvellement nés), des personnes <em>haut placées</em>, l'<em>avant-dernière</em> page.</li></ul>",
    "acc-ci-joint":
      "<p>D'après la Banque de dépannage linguistique :</p><ul><li><strong>Invariable</strong> en tête de phrase (« Ci-joint la copie ») ou devant un nom sans déterminant (« Vous trouverez ci-joint copie du contrat »).</li><li><strong>Accord obligatoire</strong> après le nom (« les pièces ci-jointes »).</li><li><strong>Au choix</strong> devant un nom précédé d'un déterminant (« ci-joint » ou « ci-jointes les deux copies »).</li></ul>",
    "acc-pp-infinitif":
      "<p>Le participe passé suivi d'un infinitif s'accorde avec le COD antéposé <strong>seulement si ce COD fait l'action</strong> de l'infinitif :</p><ul><li>« les cantatrices que j'ai <em>entendues</em> chanter » (elles chantent → accord) ;</li><li>« les airs que j'ai <em>entendu</em> chanter » (les airs sont chantés → invariable).</li></ul><p>Le participe <strong>fait</strong> + infinitif est <strong>toujours invariable</strong> (« Elle s'est <em>fait</em> couper les cheveux »). Depuis 1990, <strong>laissé</strong> + infinitif l'est aussi (« Elle s'est <em>laissé</em> convaincre »).</p>",

    "acc-pluriel-noms":
      "<p><strong>Noms en -au, -eau, -eu → -x</strong> (des tuyaux, des cadeaux, des feux), sauf <em>landau, sarrau</em> (→ -aus) et <em>bleu, pneu, émeu</em> (→ -eus).</p><p><strong>Noms en -ou → -s</strong>, sauf sept qui prennent -x : <em>bijou, caillou, chou, genou, hibou, joujou, pou</em>.</p><p><strong>Noms en -al → -aux</strong> (chevaux, journaux), sauf <em>bal, carnaval, chacal, festival, récital, régal</em> (→ -als).</p><p><strong>Noms en -ail → -s</strong> (des détails, des rails), sauf sept qui font -aux : <em>bail, corail, émail, soupirail, travail, vantail, vitrail</em>.</p>",
    "acc-noms-composes":
      "<p>On met au pluriel <strong>uniquement les noms et les adjectifs</strong> ; verbes, adverbes et prépositions restent invariables. On raisonne selon le sens.</p><ul><li><strong>Nom + nom / nom + adjectif</strong> : les deux s'accordent — des choux-fleurs, des coffres-forts, des grands-pères.</li><li><strong>Verbe + nom</strong> : le verbe est invariable ; le nom s'accorde ou non selon le sens — des tire-bouchons, mais un/des porte-monnaie (on porte de la monnaie).</li><li><strong>Mot invariable + nom</strong> : seul le nom peut s'accorder — des arrière-boutiques, des haut-parleurs (« haut » = adverbe, invariable).</li></ul>",
    "acc-tel":
      "<p><strong>Tel</strong> (comparaison, sans « que ») s'accorde avec le nom qui <strong>suit</strong> : « Ils fondirent <em>tels</em> des aigles » ; « <em>Telle</em> une reine, elle avança ».</p><p><strong>Tel que</strong> s'accorde avec le nom <strong>antécédent</strong> qui précède : « des fauves <em>tels que</em> le tigre ».</p><p><strong>Tel quel</strong> (= sans changement) s'accorde avec le nom auquel il se rapporte : « Je rends les documents <em>tels quels</em>. »</p>",
    "acc-participe-present":
      "<p><strong>Test :</strong> mettez la forme au féminin. Si c'est possible, c'est un <strong>adjectif verbal</strong> (il s'accorde) ; sinon, c'est un <strong>participe présent</strong> (invariable). Le participe accepte souvent un complément ou la négation.</p><p><strong>Orthographes différentes</strong> (adjectif / participe) : fatigant / fatiguant, précédent / précédant, différent / différant, négligent / négligeant, convaincant / convainquant, provocant / provoquant, navigant / naviguant, adhérent / adhérant, influent / influant.</p>",
    "acc-aucun-nul":
      "<p><em>Aucun(e)</em> et <em>nul(le)</em> se mettent au <strong>pluriel</strong> uniquement devant un nom qui n'a pas de singulier : <em>aucuns frais, aucunes funérailles, nulles fiançailles</em>.</p><p>« Nul » est aussi un adjectif qualificatif variable au sens de « sans valeur » (des résultats <em>nuls</em>) et un pronom (« <em>nul</em> n'est parfait »).</p>",
    "acc-avoir-lair":
      "<p>Trois cas, selon les grammairiens (Le Robert, BDL) :</p><ul><li><strong>Sujet-chose</strong> : accord toujours avec le sujet — « la pièce a l'air <em>propre</em> ».</li><li><strong>Sujet-personne</strong> : accord au choix, avec le sujet ou avec « air » (masc. sing.) — « elle a l'air <em>sérieuse</em> » ou « elle a l'air <em>sérieux</em> ».</li><li><strong>Adjectif avec complément</strong> se rapportant à « air » : accord <strong>obligatoire</strong> avec « air » — « elle avait l'air <em>inquiet</em> et troublé des gens préoccupés ».</li></ul>",
    "acc-adj-adverbe":
      "<p>Le test : l'adjectif modifie-t-il le <strong>verbe</strong> (invariable, valeur d'adverbe) ou un <strong>nom</strong> (variable, vrai adjectif) ?</p><p>Comparez : « Ces voitures <em>coûtent cher</em> » (adverbe, invariable) vs « Ces voitures sont <em>chères</em> » (adjectif attribut, accordé). Autres cas : <em>haut</em> (parler haut / des personnalités haut placées), <em>bas</em> (voler bas), <em>dur</em> (travailler dur), <em>juste</em> (chanter juste).</p>",

    /* ---------- CONJUGAISON ---------- */
    "conj-er-ou-e":
      "<p>Le test du 3e groupe (mordre / mordu) tranche partout, notamment après une préposition (à, de, pour, sans…) où l'infinitif est obligatoire.</p><p>Ne pas confondre non plus avec la 2e personne du pluriel en <em>-ez</em> (« vous mang<em>ez</em> »), imposée par le sujet « vous ».</p>",
    "conj-rai-rais":
      "<p>Le <strong>futur</strong> exprime une action certaine à venir ; le <strong>conditionnel</strong> exprime une hypothèse, un souhait ou une demande polie (« je <em>voudrais</em> »).</p><p>Après « si » de condition, jamais de <em>-rais</em> : « si j'avais su, je serais venu » (et non « si j'aurais »).</p>",
    "conj-imperatif-s":
      "<p>Pas de <em>-s</em> à la 2e personne pour les verbes du 1er groupe et pour <em>aller, ouvrir, offrir, cueillir, savoir</em> (mange, va, ouvre, sache).</p><p>On ajoute un <em>-s</em> de liaison devant <em>en</em> et <em>y</em> : « penses-y », « manges-en », « vas-y ».</p><p>Les 2e / 3e groupes gardent le <em>-s</em> : finis, prends, viens, fais.</p>",
    "conj-present-er":
      "<p>Terminaisons : <strong>-e, -es, -e, -ons, -ez, -ent</strong> (le <em>-ent</em> ne se prononce pas).</p><p>Variations orthographiques régulières : <em>-cer</em> → plaçons ; <em>-ger</em> → mangeons ; <em>-yer</em> → j'emploie ; <em>-eler / -eter</em> → j'appelle / j'achète. Le conjugueur de l'application les applique automatiquement.</p>",
    "conj-imparfait-passe-simple":
      "<p>L'<strong>imparfait</strong> décrit, installe le décor, exprime l'habitude ou la durée ; le <strong>passé simple</strong> exprime une action brève, soudaine, qui fait avancer le récit.</p><p>Ils coexistent souvent : « Il <em>dormait</em> (décor) quand le téléphone <em>sonna</em> (événement). »</p><p>À l'oral et dans un texte courant, le passé simple cède la place au passé composé.</p>",
    "conj-subjonctif":
      "<p>Le subjonctif présente l'action comme <strong>envisagée</strong> (souhaitée, redoutée, incertaine), non comme un fait réel.</p><p>Déclencheurs fréquents : <em>vouloir / falloir / craindre que</em> ; les conjonctions <em>bien que, pour que, avant que, jusqu'à ce que, à moins que, quoique, afin que</em> ; une principale négative ou interrogative (« je ne crois pas qu'il <em>vienne</em> »).</p>",
    "conj-t-euphonique":
      "<p>On intercale <em>-t-</em> devant <em>il, elle, on</em> uniquement quand le verbe se termine par <strong>-e</strong> ou <strong>-a</strong> : aime-t-il, viendra-t-elle, y a-t-il. Pas de <em>-t-</em> si le verbe finit déjà par <em>t</em> ou <em>d</em> (dit-il, prend-elle, vend-on).</p><p>À distinguer du <em>t'</em> élidé de « te » : « Je t'aime » n'a rien à voir avec « aime-t-il ».</p>",
    "conj-trois-groupes":
      "<ul><li><strong>1er groupe</strong> : ~90 % des verbes, en <em>-er</em> (réguliers), sauf « aller ».</li><li><strong>2e groupe</strong> : en <em>-ir</em>, participe présent en <em>-issant</em> (finir, choisir…), environ 300 verbes.</li><li><strong>3e groupe</strong> : verbes irréguliers — « aller », les autres <em>-ir</em> (partir, venir), les <em>-oir</em> (voir, devoir) et les <em>-re</em> (prendre, faire). C'est un groupe fermé : on n'en crée plus.</li></ul>",
    "conj-imparfait-terminaisons":
      "<p>Pour <strong>tous</strong> les verbes : <em>-ais, -ais, -ait, -ions, -iez, -aient</em>, ajoutées au radical du « nous » présent (nous finiss-ons → je finiss-ais).</p><p>Attention aux verbes en <em>-ier, -yer, -ller, -gner</em> : le <em>i</em> de la terminaison s'ajoute au radical — « nous criions », « vous travailliez », « que nous voyions ».</p><p>Seul « être » a un radical à part : ét- (j'étais).</p>",
    "conj-passe-compose":
      "<p>Formation : <strong>auxiliaire au présent + participe passé</strong>.</p><ul><li><strong>Être</strong> : verbes de mouvement / changement d'état (aller, venir, partir, arriver, rester, naître, mourir, devenir…) et tous les pronominaux ; le participe s'accorde avec le sujet.</li><li><strong>Avoir</strong> : la grande majorité des autres ; le participe s'accorde avec le COD placé avant.</li></ul><p>Auxiliaire à l'imparfait → plus-que-parfait (j'avais mangé).</p>",
    "conj-futur-terminaisons":
      "<p>Pour tous les verbes : <em>-rai, -ras, -ra, -rons, -rez, -ront</em>. Pour les 1er et 2e groupes, on part de l'infinitif (chanter → je chanterai ; finir → je finirai).</p><p>Beaucoup de verbes du 3e groupe ont un radical de futur particulier : aller → j'<em>irai</em>, voir → je <em>verrai</em>, venir → je <em>viendrai</em>, pouvoir → je <em>pourrai</em>, faire → je <em>ferai</em>.</p>",

    /* ---------- GRAMMAIRE ---------- */
    "gr-nature-fonction":
      "<p>Les <strong>natures</strong> (classes) : nom, déterminant, adjectif, pronom, verbe, adverbe, préposition, conjonction, interjection.</p><p>Les <strong>fonctions</strong> se définissent par rapport au verbe (sujet, COD, COI, CC, attribut) ou au nom (épithète, complément du nom, apposition). Un mot garde sa nature mais peut changer de fonction selon la phrase.</p>",
    "gr-sujet":
      "<p>Le sujet peut être un nom, un pronom, un groupe nominal, un infinitif (« <em>Mentir</em> est vilain ») ou une proposition. Il peut être <strong>inversé</strong> (« Que dit-<em>il</em> ? ») ou séparé du verbe. Plusieurs sujets entraînent l'accord au pluriel.</p>",
    "gr-cod-coi":
      "<p>Le COD se remplace par <em>le, la, les</em> ; le COI par <em>lui, leur, en, y</em>. On les distingue à la préposition : COD (aucune), COI (à, de).</p><p>Le <strong>COS</strong> (complément d'objet second) est un deuxième complément, souvent le destinataire : « donner qqch <u>à qqn</u> ».</p>",
    "gr-cc":
      "<p>Les compléments circonstanciels précisent : temps, lieu, manière, moyen, cause, but, conséquence, condition, comparaison… Ils sont en général <strong>déplaçables</strong> et <strong>supprimables</strong>, ce qui les distingue du COD.</p>",
    "gr-epithete-attribut":
      "<p>L'épithète peut être <strong>liée</strong> (contre le nom) ou <strong>détachée</strong> (par une virgule). L'attribut du sujet passe par un <strong>verbe d'état</strong> (être, paraître, sembler, devenir, rester, avoir l'air…). Il existe aussi l'attribut du COD : « Je le trouve <em>intelligent</em>. »</p>",
    "gr-propositions":
      "<p>Il y a autant de propositions que de verbes conjugués. Une <strong>indépendante</strong> se suffit ; une <strong>principale</strong> commande une <strong>subordonnée</strong>. Les subordonnées se rattachent par un pronom relatif (relative), par une conjonction (conjonctive) ou sont interrogatives indirectes.</p>",
    "gr-relative":
      "<p>La relative complète un nom, son <strong>antécédent</strong>. Le pronom relatif varie selon sa fonction : <em>qui</em> (sujet), <em>que</em> (COD), <em>dont</em> (complément avec « de »), <em>où</em> (lieu / temps), <em>lequel, auquel, duquel</em> (après préposition).</p>",
    "gr-voix-passive":
      "<p>Seuls les verbes transitifs directs (à COD) se mettent au passif. Le COD devient sujet, le sujet devient <strong>complément d'agent</strong> (par / de). Le passif se forme avec <strong>être + participe passé</strong>, à tous les temps (il est / était / sera aimé).</p>",
    "gr-determinants":
      "<p>Familles : articles (défini le/la/les, indéfini un/une/des, partitif du/de la), possessifs (mon, ta, leur…), démonstratifs (ce, cet, cette, ces), indéfinis (chaque, plusieurs, aucun…), numéraux (deux, trois…), interrogatifs / exclamatifs (quel…). Le déterminant s'accorde avec le nom.</p>",
    "gr-types-phrases":
      "<p>Quatre <strong>types</strong> (un seul par phrase) : déclaratif, interrogatif, exclamatif, impératif. S'y ajoutent des <strong>formes</strong> qui se cumulent : affirmative / négative, active / passive, neutre / emphatique (mise en relief : « C'est lui <em>qui</em>… »), personnelle / impersonnelle.</p>",
    "gr-complement-agent":
      "<p>Il n'existe qu'à la voix passive et désigne le véritable auteur de l'action. Introduit le plus souvent par <strong>par</strong>, parfois par <strong>de</strong> (verbes de sentiment ou de description : « aimé <em>de</em> tous », « couvert <em>de</em> neige »). Il peut être absent (« La maison a été vendue »).</p>",
    "gr-apposition":
      "<p>L'apposition désigne autrement le nom (ou le pronom) qu'elle accompagne. Le plus souvent <strong>détachée</strong> par des virgules (« Paris, <em>capitale de la France</em> »), parfois <strong>liée</strong> (« le mois <em>de mai</em> », « mon ami <em>Paul</em> »). Elle est mobile et supprimable.</p>",
    "gr-conjonctions":
      "<p><strong>Coordination</strong> (mais, ou, et, donc, or, ni, car) : relient des éléments de même fonction. <strong>Subordination</strong> (que, quand, comme, si, lorsque, puisque, quoique, afin que…) : introduisent une subordonnée. Beaucoup sont des <strong>locutions</strong> : parce que, bien que, dès que.</p>",
    "gr-pronoms-personnels":
      "<p>Ils varient selon la personne et la fonction : sujets (je, tu, il…), COD (me, te, le, la, les…), COI (me, te, lui, leur…), réfléchis (me, te, se…), et les pronoms adverbiaux <em>en</em> (= de cela) et <em>y</em> (= à cela / là). Les formes toniques (moi, toi, lui, eux…) servent à insister.</p>",
    "gr-adverbe":
      "<p>Invariable. Catégories : manière (bien, vite, lentement), quantité / intensité (peu, très, beaucoup, assez), temps (hier, souvent), lieu (ici, ailleurs), affirmation / négation / doute (oui, ne… pas, peut-être), interrogation (quand, où, comment). Beaucoup d'adverbes de manière se forment sur l'adjectif au féminin + <em>-ment</em> (douce → doucement).</p>",
    "gr-prepositions":
      "<p>Prépositions simples : à, de, dans, en, par, pour, sans, sous, sur, avec, chez, vers, contre, entre, parmi… Locutions prépositives : à côté de, près de, grâce à, afin de, au lieu de… Elles introduisent un complément (du verbe, du nom ou de l'adjectif) et sont invariables.</p>",
    "gr-complement-du-nom":
      "<p>Il précise le sens d'un nom et est le plus souvent introduit par une préposition (de, à, en, pour, sans…). Il peut indiquer la matière (une bague <em>en or</em>), la possession (le livre <em>de Marie</em>), l'usage (une salle <em>de sport</em>) ou le contenu (une tasse <em>de thé</em>).</p>",
    "gr-degres-adjectif":
      "<p><strong>Comparatif</strong> : supériorité (plus… que), infériorité (moins… que), égalité (aussi… que). <strong>Superlatif</strong> : relatif (le / la / les plus…, le moins…) ou absolu (très, fort, extrêmement…).</p><p>Formes irrégulières : bon → meilleur / le meilleur ; mauvais → pire ; petit → moindre ; bien → mieux.</p>",
    "conj-futur-proche-passe-recent":
      "<p>Ces périphrases verbales sont très employées à l'oral et à l'écrit courant, en alternative aux temps simples.</p><p>Le futur proche insiste sur l'imminence (« le train va partir ») ; le passé récent insiste sur la fraîcheur de l'action (« il vient de partir »). On peut les combiner avec « être en train de » pour le présent progressif (« il est en train de partir »), une tournure similaire mais non temporelle.</p>",
    "conj-concordance-des-temps":
      "<p>Tableau de correspondance (principale au passé) : présent → imparfait ; passé composé → plus-que-parfait ; futur simple → conditionnel présent ; futur antérieur → conditionnel passé.</p><p>Si la principale est au présent ou au futur, aucun changement n'est nécessaire dans la subordonnée.</p>",
    "conj-valeurs-conditionnel":
      "<p>Le conditionnel n'est pas un temps du futur : c'est un mode à part entière, qui présente l'action comme dépendante d'une condition (réelle, hypothétique, ou seulement implicite comme dans la politesse).</p><p>On le trouve aussi dans l'expression du souhait ou du regret irréel : « J'aimerais tant le revoir » ; « On aurait dit qu'il pleuvait » (comparaison irréelle).</p>",
    "acc-genre-des-noms":
      "<p>D'autres noms au genre parfois hésitant : un exode, un obélisque, un ovule (masculin, souvent confondu), une steppe, une ecchymose, un incendie, un pétale, un hémisphère.</p><p>Pour les mots composés « amour, délice, orgue », l'usage littéraire (féminin pluriel) reste minoritaire aujourd'hui : le masculin pluriel est largement accepté dans la langue courante, y compris par l'Académie française qui n'y voit plus une faute.</p>",
  };
})();
