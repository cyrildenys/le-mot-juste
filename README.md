# Le Mot Juste

Application mobile (PWA) pour apprendre et maîtriser le français — **100 % hors-ligne**, installable sur téléphone sans passer par un store.

## Les trois onglets

1. **Les règles** — référentiel navigable + recherche transverse :
   - Les accords (adjectif, participe passé avec être/avoir/pronominaux, tout, leur, couleurs, nombres…)
   - Conjugaison : un **conjugueur** couvrant tous les verbes des 1er/2e groupes (avec variantes -cer, -ger, -yer, -eler/-eter, é→è, e muet→è) et une cinquantaine d'irréguliers essentiels, à tous les temps et modes — plus les règles d'emploi des temps.
   - Confusions fréquentes (a/à, ces/ses/c'est/s'est, quel/qu'elle, quand/quant…)
   - Mauvais usages (pléonasmes, barbarismes, fautes de construction)
   - Notions de grammaire (nature/fonction, COD/COI, propositions, voix…)
   - Vocabulaire : nuances entre mots proches (amener/apporter, éminent/imminent…)
2. **Le mot du jour** — un mot rare et soutenu chaque jour (tirage déterministe par date), avec définition, registre, étymologie, exemples et synonymes. Prononciation vocale, favoris, historique, exploration aléatoire.
3. **Dictée** — textes classés **facile → intermédiaire → expert**, lus par la voix française du système (phrase par phrase, vitesse réglable). Saisie puis **correction mot-à-mot** (distance d'édition), score sur 20 et surlignage des fautes.

## Architecture (sans build, sans dépendance)

```
index.html            coquille + ordre de chargement
manifest.webmanifest  installabilité PWA
service-worker.js     précache → hors-ligne
css/styles.css        design system (thème clair + sombre)
js/
  core.js             namespace, utilitaires, stockage local, synthèse vocale
  conjugueur.js       moteur de conjugaison
  view-regles.js      onglet Les règles + conjugueur (UI)
  view-motdujour.js   onglet Mot du jour
  view-dictee.js      onglet Dictée + moteur de correction
  app.js              navigation par onglets, bouton retour, amorçage
data/*.js             tout le contenu (règles, mots, verbes, dictées…)
icons/                icônes PWA (SVG + PNG)
tools/bundle.js       assemble tout en un seul fichier HTML autonome
```

Aucun framework : du JavaScript natif. Les données sont chargées via de simples
scripts qui peuplent l'objet global `LMJ` — ça fonctionne aussi bien depuis un
serveur que depuis un `file://` (bundle autonome).

## Lancer en local

```bash
cd ~/le-mot-juste
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

Ou, sans serveur : ouvrir directement **`le-mot-juste-autonome.html`** (généré
par `node tools/bundle.js`).

## Enrichir le contenu

Tout est dans `data/`. Ajouter un mot : une entrée dans `data/mots.js`. Un verbe
irrégulier : une entrée dans `data/verbes.js` (parties principales). Une dictée :
une entrée dans `data/dictees.js`. Après modification des assets, incrémenter
`CACHE` dans `service-worker.js` pour forcer la mise à jour hors-ligne.
