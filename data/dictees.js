/* =====================================================================
   Le Mot Juste — Textes de dictée
   Schéma : { id, niveau: "facile"|"intermediaire"|"expert",
              titre, texte, source? }
   ===================================================================== */
(function () {
  "use strict";
  const G = typeof window !== "undefined" ? window : globalThis;
  const LMJ = (G.LMJ = G.LMJ || {});
  LMJ.data = LMJ.data || {};

  LMJ.data.dictees = [
    /* ---------- FACILE ---------- */
    {
      id: "f1", niveau: "facile", titre: "Le petit déjeuner",
      texte: "Chaque matin, je bois un café et je mange deux tartines. Le soleil entre par la fenêtre. Mon chat dort sur le canapé. La journée commence bien.",
    },
    {
      id: "f2", niveau: "facile", titre: "Au parc",
      texte: "Les enfants jouent dans le parc. Ils courent, ils rient et ils sautent. Une dame promène son chien. Le ciel est bleu et l'air est doux.",
    },
    {
      id: "f3", niveau: "facile", titre: "La cuisine",
      texte: "Ce soir, nous préparons une soupe de légumes. Je coupe les carottes et les pommes de terre. L'eau bout dans la casserole. Bientôt, toute la maison sent bon.",
    },
    {
      id: "f4", niveau: "facile", titre: "À l'école",
      texte: "Le matin, les élèves entrent dans la classe. La maîtresse écrit la date au tableau. Nous ouvrons nos cahiers et nous écoutons. La leçon peut commencer.",
    },

    /* ---------- INTERMÉDIAIRE ---------- */
    {
      id: "i1", niveau: "intermediaire", titre: "La promenade",
      texte: "Hier après-midi, nous sommes allés nous promener en forêt. Les feuilles que le vent avait arrachées formaient un tapis doré. Ma sœur, fatiguée, s'est assise sur un tronc. Nous avons écouté le chant des oiseaux avant de rentrer.",
    },
    {
      id: "i2", niveau: "intermediaire", titre: "La lettre",
      texte: "La lettre qu'elle m'avait envoyée était pleine de tendresse. Je l'ai lue plusieurs fois, puis je l'ai rangée dans un tiroir. Les mots qu'elle avait choisis me touchaient profondément. Jamais je ne les oublierai.",
    },
    {
      id: "i3", niveau: "intermediaire", titre: "Le marché",
      texte: "Tous les samedis, ma grand-mère se rendait au marché. Elle achetait des fruits mûrs, des fromages affinés et quelques fleurs. Les marchands, qu'elle connaissait bien, la saluaient chaleureusement. Elle rentrait ensuite, les paniers remplis.",
    },
    {
      id: "i4", niveau: "intermediaire", titre: "L'orage",
      texte: "Le ciel s'était couvert de nuages menaçants. Soudain, un éclair déchira l'obscurité et le tonnerre gronda. Les passants, surpris, se réfugièrent sous les porches. La pluie, violente, ruisselait sur les pavés.",
    },

    /* ---------- EXPERT ---------- */
    {
      id: "e1", niveau: "expert", titre: "Persévérance",
      texte: "Quels que soient les obstacles que nous ayons rencontrés, il eût fallu les affronter avec sérénité. Les efforts qu'elle s'était imposés portèrent enfin leurs fruits. Bien qu'il fût tard, nous poursuivîmes notre discussion jusqu'à ce que l'aube parût.",
    },
    {
      id: "e2", niveau: "expert", titre: "Le voyageur",
      texte: "Le voyageur, exténué par les lieues qu'il avait parcourues, s'assit à l'ombre d'un chêne séculaire. Les souvenirs qu'il avait crus enfouis resurgirent soudain. Il se rappela les promesses qu'il n'avait pu tenir, et une mélancolie diffuse l'envahit.",
    },
    {
      id: "e3", niveau: "expert", titre: "Le Corbeau et le Renard",
      source: "Jean de La Fontaine",
      texte: "Maître Corbeau, sur un arbre perché, tenait en son bec un fromage. Maître Renard, par l'odeur alléché, lui tint à peu près ce langage : Hé ! bonjour, Monsieur du Corbeau. Que vous êtes joli ! que vous me semblez beau !",
    },
    {
      id: "e4", niveau: "expert", titre: "Du côté de chez Swann",
      source: "Marcel Proust",
      texte: "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n'avais pas le temps de me dire : Je m'endors.",
    },
  ];

  LMJ.data.dicteeNiveaux = [
    { id: "facile", nom: "Facile", desc: "Phrases courtes, vocabulaire courant." },
    { id: "intermediaire", nom: "Intermédiaire", desc: "Temps du passé, accords, pièges." },
    { id: "expert", nom: "Expert", desc: "Subjonctif, passé simple, textes littéraires." },
  ];
})();
